package server

import (
	"context"
	"fmt"

	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
	"github.com/jackc/pgx/v4"
)

// PostgresServer is an authentication GRPC server.
type PostgresServer struct {
	proto.UnimplementedPostgresServiceServer
}

// Connect connects to a postgres database.
func (s *PostgresServer) Connect(context.Context, *proto.ConnectRequest) (*proto.ConnectResponse, error) {
	res := &proto.ConnectResponse{
		ConnectionID: "d61a7dcf-dc4f-4931-b099-953e0ef43361",
	}
	return res, nil
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

// TestConnection tests if some credentials can connect to a postgres database.
func (s *PostgresServer) TestConnection(ctx context.Context, req *proto.TestConnectionRequest) (*proto.TestConnectionResponse, error) {
	connString := credentialConnectionString(req.Credentials)
	_, err := pgx.Connect(ctx, connString)
	res := &proto.TestConnectionResponse{
		Success: err == nil,
	}
	return res, nil
}
