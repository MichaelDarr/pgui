package server

import (
	"context"

	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
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
