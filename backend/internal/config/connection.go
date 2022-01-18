package config

import proto "github.com/MichaelDarr/pgui/backend/protos/postgres"

type Connection struct {
	ID       string
	Name     string
	Color    string
	Host     string
	Port     int32
	User     string
	DB       string
	Password string
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
