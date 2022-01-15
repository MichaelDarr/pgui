package server

import (
	"context"
	"fmt"

	"github.com/MichaelDarr/pgui/backend/internal/config"
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
	"github.com/google/uuid"
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

// SaveConnection saves connection information to a user's configuration.
func (s *PostgresServer) SaveConnection(ctx context.Context, req *proto.SaveConnectionRequest) (*proto.SaveConnectionResponse, error) {
	cfg, err := config.GetConfig()
	if err != nil {
		return nil, err
	}
	connectionID := uuid.New().String()
	newConnection := config.Connection{
		ID:       connectionID,
		Name:     req.Name,
		Host:     req.Credentials.Host,
		Port:     req.Credentials.Port,
		User:     req.Credentials.User,
		DB:       req.Credentials.Db,
		Password: req.Credentials.Password,
	}
	if err = cfg.AddConnection(newConnection); err != nil {
		return nil, err
	}
	res := &proto.SaveConnectionResponse{
		ConnectionID: connectionID,
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
