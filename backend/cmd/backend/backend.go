package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/MichaelDarr/pgui/backend/internal/server"
)

func main() {
	if len(os.Args) <= 1 {
		fmt.Println("backend: port argument required")
		os.Exit(1)
	}
	socketAddress := os.Args[1]

	grpcServer := server.NewGRPC()
	go func() {
		fmt.Printf("listening on socket %v\n", socketAddress)
		if err := grpcServer.Serve(socketAddress); err != nil {
			fmt.Printf("server failure: %v\n", err)
			grpcServer.Stop()
			os.Exit(1)
		}
	}()

	terminationSignals := make(chan os.Signal, 1)
	signal.Notify(terminationSignals, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-terminationSignals
		fmt.Println("server stopping gracefully")
		grpcServer.GracefulStop()
		os.Exit(0)
	}()

	select {}
}
