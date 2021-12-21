package main

import (
	"os"

	"github.com/MichaelDarr/pgui/backend/internal/server"
)

func main() {
	socketAddress := os.Args[1]
	if socketAddress == "" {
		socketAddress = "/tmp/pgui.sock"
	}

	grpcServer := server.NewGRPC()
	go grpcServer.Serve(socketAddress)

	select {}
}
