package server

import (
	"context"

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

// GetSchemas gets a list of all schemas within a connection.
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
