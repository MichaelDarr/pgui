package server

import (
	"context"

	"github.com/MichaelDarr/pgui/backend/internal/config"
	"github.com/jackc/pgx/v4"
)

// connections contains pgx connections.
type connections struct {
	connections map[string]*pgx.Conn
}

// Get gets a connection, creating it if not present.
func (c connections) getConnection(connectionID string) (*pgx.Conn, error) {
	for id, connection := range c.connections {
		if id == connectionID {
			return connection, nil
		}
	}
	configConnection, err := config.GetConnection(connectionID)
	if err != nil {
		return nil, err
	}
	connection, err := configConnection.Connect(context.Background())
	if err != nil {
		return nil, err
	}
	c.connections[connectionID] = connection
	return connection, nil
}
