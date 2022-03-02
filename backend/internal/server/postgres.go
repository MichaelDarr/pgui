package server

import (
	"context"
	"errors"
	"fmt"
	"io"

	"github.com/jackc/pgproto3/v2"

	"github.com/MichaelDarr/pgui/backend/internal/config"
	"github.com/MichaelDarr/pgui/backend/internal/pg"
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
)

// PostgresServer is an authentication GRPC server.
type PostgresServer struct {
	proto.UnimplementedPostgresServiceServer
	connPools map[string]pg.Pool
}

// newPostgresServer creates a PostgresServer.
func newPostgresServer() *PostgresServer {
	return &PostgresServer{
		connPools: make(map[string]pg.Pool),
	}
}

// getPool gets a connection pool, creating it if not present.
func (s *PostgresServer) getPool(connID string) (pg.Pool, error) {
	for id, connPool := range s.connPools {
		if id == connID {
			return connPool, nil
		}
	}
	pool, err := config.Connect(context.Background(), connID)
	if err != nil {
		return pg.Pool{}, err
	}
	s.connPools[connID] = pool
	return pool, nil
}

// withConn runs the passed function with a connection to the database specified by `connID`.
// The connection is automatically released back to the pool after the passed function resolves.
func (s *PostgresServer) withConn(ctx context.Context, connID string, connFunc func(conn pg.Conn) error) error {
	pool, err := s.getPool(connID)
	if err != nil {
		return err
	}
	conn, err := pool.Acquire(ctx)
	if err != nil {
		return err
	}
	defer conn.Release()
	return connFunc(conn)
}

// DeleteConnection removes connection information from a user's configuration.
func (s *PostgresServer) DeleteConnection(ctx context.Context, req *proto.DeleteConnectionRequest) (*proto.DeleteConnectionResponse, error) {
	cfg, err := config.GetConfig()
	if err == nil {
		err = cfg.DeleteConnection(req.ConnectionID)
	}
	return &proto.DeleteConnectionResponse{}, err
}

// GetConnections gets all saved connections in a user's configuration.
func (s *PostgresServer) GetConnections(context.Context, *proto.GetConnectionsRequest) (*proto.GetConnectionsResponse, error) {
	cfg, err := config.GetConfig()
	if err != nil {
		return nil, err
	}
	return &proto.GetConnectionsResponse{
		Connections: cfg.ProtoConnections(),
	}, nil
}

// GetSchemas gets all schemas within a connection.
func (s *PostgresServer) GetSchemas(ctx context.Context, req *proto.GetSchemasRequest) (*proto.GetSchemasResponse, error) {
	response := &proto.GetSchemasResponse{}
	err := s.withConn(ctx, req.ConnectionID, func(conn pg.Conn) error {
		schemas, err := conn.Schemas(ctx)
		if err == nil {
			response.Schemas = schemas
		}
		return err
	})
	return response, err
}

// GetTables gets a slice of all tables within a schema.
func (s *PostgresServer) GetSchemaTables(ctx context.Context, req *proto.GetSchemaTablesRequest) (*proto.GetSchemaTablesResponse, error) {
	response := &proto.GetSchemaTablesResponse{}
	err := s.withConn(ctx, req.ConnectionID, func(conn pg.Conn) error {
		tables, err := conn.SchemaTables(ctx, req.Schema)
		if err == nil {
			response.Tables = tables.Proto()
		}
		return err
	})
	return response, err
}

// GetTable queries for table data.
func (s *PostgresServer) GetTable(stream proto.PostgresService_GetTableServer) error {
	// Indicates that there is no more table data to stream (nil) or an error has occured (non-nil)
	finished := make(chan error)
	// Messages to be streamed
	outbound := make(chan *proto.GetTableResponse, 100)
	// Messages to be read
	incoming := make(chan *proto.GetTableRequest, 100)
	// Total number of table rows read from the database
	var rowsRead int64

	// Send a metadata message over the stream
	sendMetadata := func(fieldDescriptions []pgproto3.FieldDescription) {
		fields := make([]*proto.Field, len(fieldDescriptions))
		for i, fieldDescription := range fieldDescriptions {
			fields[i] = &proto.Field{
				Name:     string(fieldDescription.Name),
				TableOID: fieldDescription.TableOID,
			}
		}
		outbound <- &proto.GetTableResponse{
			Result: &proto.QueryResultStream{
				Data: &proto.QueryResultStream_Metadata{
					Metadata: &proto.QueryResultStream_MetadataResult{
						Fields:   fields,
						RowsRead: rowsRead,
					},
				},
			},
		}
	}

	// Read messages into the incoming channel
	go func() {
		for {
			in, err := stream.Recv()
			if err == io.EOF {
				finished <- nil
			} else if err != nil {
				finished <- err
			} else {
				incoming <- in
			}
		}
	}()

	// Stream data to client
	go func() {
		in := <-incoming
		init := in.GetInitialize()
		if init == nil {
			finished <- errors.New("first message to `GetTable` must be `initialize`")
			return
		}

		err := s.withConn(stream.Context(), init.ConnectionID, func(conn pg.Conn) error {
			rows, err := conn.Query(
				stream.Context(),
				fmt.Sprintf(`SELECT * FROM %s.%s`, init.Schema, init.Table),
			)
			if err != nil {
				return err
			}

			// Send metadata before reading any rows.
			sendMetadata(rows.FieldDescriptions())

			// TODO => Read table data

			return nil
		})
		if err != nil {
			finished <- err
		}
	}()

	for {
		select {
		// Stream outbound messages
		case message := <-outbound:
			if err := stream.Send(message); err != nil {
				return err
			}
		// No more data to stream or error encountered
		case err := <-finished:
			return err
		}
	}
}

// SaveConnection saves connection information to a user's configuration.
func (s *PostgresServer) SaveConnection(ctx context.Context, req *proto.SaveConnectionRequest) (*proto.SaveConnectionResponse, error) {
	cfg, err := config.GetConfig()
	if err != nil {
		return nil, err
	}
	newConnection := config.NewConnectionFromProto(req.Connection)
	if err = cfg.AddConnection(newConnection); err != nil {
		return nil, err
	}
	return &proto.SaveConnectionResponse{
		Connection: req.Connection,
	}, nil
}

// TestConnection tests if some credentials can connect to a postgres database.
func (s *PostgresServer) TestConnection(ctx context.Context, req *proto.TestConnectionRequest) (*proto.TestConnectionResponse, error) {
	_, err := config.NewCredentialsFromProto(req.Credentials).Connect(ctx)
	return &proto.TestConnectionResponse{
		Success: err == nil,
	}, nil
}
