package server

import (
	"context"
	"fmt"

	"github.com/MichaelDarr/pgui/backend/internal/config"
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
	"github.com/jackc/pgx/v4"
)

// PostgresServer is an authentication GRPC server.
type PostgresServer struct {
	proto.UnimplementedPostgresServiceServer
}

// credentialConnectionString returns a postgres connection string.
func credentialConnectionString(credentials *proto.Credentials) string {
	return fmt.Sprintf(
		"host=%v port=%v user=%v password=%v dbname=%v",
		credentials.Host,
		credentials.Port,
		credentials.User,
		credentials.Password,
		credentials.Db,
	)
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
	newConnection := config.Connection{
		ID:       req.Connection.Id,
		Name:     req.Connection.Name,
		Color:    req.Connection.Color,
		Host:     req.Connection.Credentials.Host,
		Port:     req.Connection.Credentials.Port,
		User:     req.Connection.Credentials.User,
		DB:       req.Connection.Credentials.Db,
		Password: req.Connection.Credentials.Password,
	}
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
	connString := credentialConnectionString(req.Credentials)
	_, err := pgx.Connect(ctx, connString)
	res := &proto.TestConnectionResponse{
		Success: err == nil,
	}
	return res, nil
}
