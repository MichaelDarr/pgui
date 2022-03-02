package config

import (
	"context"
	"fmt"

	"github.com/MichaelDarr/pgui/backend/internal/pg"
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
)

type Credentials struct {
	Host     string
	Port     int32
	User     string
	DB       string
	Password string
}

// NewCredentialsFromProto generates Credentials from protobuf credentials.
func NewCredentialsFromProto(credentials *proto.Credentials) Credentials {
	return Credentials{
		Host:     credentials.Host,
		Port:     credentials.Port,
		User:     credentials.User,
		DB:       credentials.Db,
		Password: credentials.Password,
	}
}

// Connect returns a pgx connection pool.
func (c Credentials) Connect(ctx context.Context) (pg.Pool, error) {
	return pg.Connect(ctx, c.ConnectionString())
}

// ConnectionString returns a postgres connection string.
func (c Credentials) ConnectionString() string {
	return fmt.Sprintf(
		"host=%v port=%v user=%v password=%v dbname=%v",
		c.Host,
		c.Port,
		c.User,
		c.Password,
		c.DB,
	)
}

// Proto formats credentials as a protobuf message.
func (c Credentials) Proto() *proto.Credentials {
	return &proto.Credentials{
		Host:     c.Host,
		Port:     c.Port,
		User:     c.User,
		Db:       c.DB,
		Password: c.Password,
	}
}
