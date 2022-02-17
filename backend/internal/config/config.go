package config

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"github.com/BurntSushi/toml"
	"github.com/MichaelDarr/pgui/backend/internal/pg"
	proto "github.com/MichaelDarr/pgui/backend/protos/postgres"
)

// configPath provides paths to the user's configuration.
type configPath struct {
	dirPath string
}

// newConfigPath returns a new configPath.
func newConfigPath() (*configPath, error) {
	userConfigDir, err := os.UserConfigDir()
	if err != nil {
		return nil, err
	}
	dirPath := filepath.Join(userConfigDir, "pgui")
	return &configPath{dirPath}, nil
}

// Dir returns the path to the user's configuration directory.
func (cp configPath) Dir() string {
	return cp.dirPath
}

// File returns the path to the user's configuration file.
func (cp configPath) File() string {
	return filepath.Join(cp.dirPath, "config.toml")
}

// Config is a user's configuration.
type Config struct {
	Connection []Connection
}

// GetConfig gets the user's configuration.
func GetConfig() (*Config, error) {
	path, err := newConfigPath()
	if err != nil {
		return nil, err
	}
	if _, err := os.Stat(path.File()); err != nil {
		if !errors.Is(err, os.ErrNotExist) {
			return nil, fmt.Errorf("error reading config file: %w", err)
		}
		return &Config{}, nil
	}
	var config Config
	_, err = toml.DecodeFile(path.File(), &config)
	return &config, err
}

// Connect returns a pgx connection.
func Connect(ctx context.Context, connectionID string) (pg.Conn, error) {
	config, err := GetConfig()
	if err != nil {
		return pg.Conn{}, err
	}
	return config.Connect(ctx, connectionID)
}

// AddConnection writes a new connection into the configuration file.
func (config *Config) AddConnection(connection Connection) error {
	config.Connection = append(config.Connection, connection)
	return config.write()
}

// Connect returns a pgx connection.
func (config *Config) Connect(ctx context.Context, connectionID string) (pg.Conn, error) {
	connection, err := config.GetConnection(connectionID)
	if err != nil {
		return pg.Conn{}, err
	}
	return connection.Connect(ctx)
}

// GetConnection retrieves a connection in the configuration by ID.
func (config *Config) GetConnection(connectionID string) (Connection, error) {
	for _, connection := range config.Connection {
		if connection.ID == connectionID {
			return connection, nil
		}
	}
	return Connection{}, fmt.Errorf("connection id not found: %v", connectionID)
}

// ProtoConnections gets all connections configured as protobuf messages.
func (config *Config) ProtoConnections() []*proto.Connection {
	connections := make([]*proto.Connection, len(config.Connection))
	for i, connection := range config.Connection {
		connections[i] = connection.Proto()
	}
	return connections
}

// write saves the configuration to disk.
func (config *Config) write() error {
	path, err := newConfigPath()
	if err != nil {
		return err
	}
	configDirInfo, err := os.Stat(path.Dir())
	if errors.Is(err, os.ErrNotExist) {
		if err = os.Mkdir(path.Dir(), 0755); err != nil {
			return err
		}
	} else if !configDirInfo.IsDir() {
		return fmt.Errorf(`bad config directory type (%v)`, configDirInfo.Mode())
	}
	file, err := os.Create(path.File())
	if err != nil {
		return err
	}
	defer func() {
		file.Close()
	}()
	return toml.NewEncoder(file).Encode(config)
}
