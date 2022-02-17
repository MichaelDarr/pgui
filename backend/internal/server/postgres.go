package server

import (
	"context"

	"github.com/MichaelDarr/pgui/backend/internal/config"
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
)

// PostgresServer is an authentication GRPC server.
type PostgresServer struct {
	proto.UnimplementedPostgresServiceServer
	connections
}

// GetConnections gets all saved connections in a user's configuration.
func (s *PostgresServer) GetConnections(context.Context, *proto.GetConnectionsRequest) (*proto.GetConnectionsResponse, error) {
	cfg, err := config.GetConfig()
	if err != nil {
		return nil, err
	}
	res := &proto.GetConnectionsResponse{
		Connections: cfg.ProtoConnections(),
	}
	return res, nil
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
	res := &proto.SaveConnectionResponse{
		Connection: req.Connection,
	}
	return res, nil
}

// TestConnection tests if some credentials can connect to a postgres database.
func (s *PostgresServer) TestConnection(ctx context.Context, req *proto.TestConnectionRequest) (*proto.TestConnectionResponse, error) {
	_, err := config.NewCredentialsFromProto(req.Credentials).Connect(ctx)
	res := &proto.TestConnectionResponse{
		Success: err == nil,
	}
	return res, nil
}

// GetSchemas gets a list of all schemas within a connection.
func (s *PostgresServer) GetSchemas(ctx context.Context, req *proto.GetSchemasRequest) (*proto.GetSchemasResponse, error) {
	_, err := s.getConnection(req.ConnectionID)
	if err != nil {
		return nil, err
	}
	return nil, nil
}
