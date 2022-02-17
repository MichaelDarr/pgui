package config

import (
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
)

type Connection struct {
	Credentials
	ID    string
	Name  string
	Color string
}

// NewConnectionFromProto generates a Connection a protobuf connection.
func NewConnectionFromProto(connection *proto.Connection) Connection {
	return Connection{
		Credentials: NewCredentialsFromProto(connection.Credentials),
		ID:          connection.Id,
		Name:        connection.Name,
		Color:       connection.Color,
	}
}

// GetConnection gets the information of a single connection from the configuation.
func GetConnection(connectionID string) (Connection, error) {
	cfg, err := GetConfig()
	if err != nil {
		return Connection{}, err
	}
	return cfg.GetConnection(connectionID)
}

// Proto gets a connections configured as a protobuf message.
func (c Connection) Proto() *proto.Connection {
	return &proto.Connection{
		Credentials: &proto.Credentials{
			Host:     c.Host,
			Port:     c.Port,
			User:     c.User,
			Db:       c.DB,
			Password: c.Password,
		},
		Id:    c.ID,
		Name:  c.Name,
		Color: c.Color,
	}
}
