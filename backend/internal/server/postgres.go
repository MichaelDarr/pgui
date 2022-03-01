package server

import (
	"context"
	"errors"

	"github.com/MichaelDarr/pgui/backend/internal/config"
	"github.com/MichaelDarr/pgui/backend/internal/pg"
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
)

// PostgresServer is an authentication GRPC server.
type PostgresServer struct {
	proto.UnimplementedPostgresServiceServer
	conns map[string]pg.Conn
}

// newPostgresServer creates a PostgresServer.
func newPostgresServer() *PostgresServer {
	return &PostgresServer{
		conns: make(map[string]pg.Conn),
	}
}

// getConn gets a connection, creating it if not present.
func (s *PostgresServer) getConn(connID string) (pg.Conn, error) {
	for id, connection := range s.conns {
		if id == connID {
			return connection, nil
		}
	}
	conn, err := config.Connect(context.Background(), connID)
	if err != nil {
		return pg.Conn{}, err
	}
	s.conns[connID] = conn
	return conn, nil
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
	conn, err := s.getConn(req.ConnectionID)
	if err != nil {
		return nil, err
	}
	schemas, err := conn.Schemas(ctx)
	if err != nil {
		return nil, err
	}
	return &proto.GetSchemasResponse{
		Schemas: schemas,
	}, nil
}

// GetTables gets a slice of all tables within a schema.
func (s *PostgresServer) GetSchemaTables(ctx context.Context, req *proto.GetSchemaTablesRequest) (*proto.GetSchemaTablesResponse, error) {
	conn, err := s.getConn(req.ConnectionID)
	if err != nil {
		return nil, err
	}
	tables, err := conn.SchemaTables(ctx, req.Schema)
	if err != nil {
		return nil, err
	}
	return &proto.GetSchemaTablesResponse{
		Tables: tables.Proto(),
	}, nil
}

// GetTable queries for table data.
func (s *PostgresServer) GetTable(stream proto.PostgresService_GetTableServer) error {
	in, err := stream.Recv()
	if err != nil {
		return err
	}
	init := in.GetInitialize()
	if init == nil {
		return errors.New("first message to `GetTable` must be `initialize`")
	}
	conn, err := s.getConn(init.ConnectionID)
	if err != nil {
		return err
	}
	rows, err := conn.Query(stream.Context(), `SELECT * FROM $1.$2`, init.Schema, init.Table)
	if err != nil {
		return err
	}

	var rowsRead int64

	sendFieldDescriptions := func() error {
		fieldDescriptions := rows.FieldDescriptions()
		fields := make([]*proto.Field, len(fieldDescriptions))
		for i, fieldDescription := range fieldDescriptions {
			fields[i] = &proto.Field{
				Name:     string(fieldDescription.Name),
				TableOID: fieldDescription.TableOID,
			}
		}
		return stream.Send(&proto.GetTableResponse{
			Result: &proto.QueryResultStream{
				Data: &proto.QueryResultStream_Metadata{
					Metadata: &proto.QueryResultStream_MetadataResult{
						Fields:   fields,
						RowsRead: rowsRead,
					},
				},
			},
		})
	}

	// Send field descriptions upon query initialization (before reading any rows).
	if err = sendFieldDescriptions(); err != nil {
		return err
	}

	// TODO => Read table data

	// Close stream
	return nil
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
