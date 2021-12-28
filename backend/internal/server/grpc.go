package server

import (
	"net"
	"os"

	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
	"google.golang.org/grpc"
)

// GRPC is the a GRPC server.
type GRPC struct {
	grpcServer     *grpc.Server
	postgresServer *PostgresServer
}

// NewGRPC creates an auth grpc server.
func NewGRPC() *GRPC {
	grpcServer := grpc.NewServer()
	postgresServer := &PostgresServer{}
	proto.RegisterPostgresServiceServer(grpcServer, postgresServer)

	return &GRPC{
		grpcServer,
		postgresServer,
	}
}

// GracefulStop stops the server gracefully.
func (g GRPC) GracefulStop() {
	g.grpcServer.GracefulStop()
}

// Serve accepts incoming connections.
func (g GRPC) Serve(socketAddress string) error {
	if err := os.RemoveAll(socketAddress); err != nil {
		return err
	}
	lis, err := net.Listen("unix", socketAddress)
	if err != nil {
		return err
	}
	return g.grpcServer.Serve(lis)
}

// Stop stops the server immediately.
func (g GRPC) Stop() {
	g.grpcServer.Stop()
}
