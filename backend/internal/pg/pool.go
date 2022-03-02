package pg

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
)

// Pool is a pgx connection pool.
type Pool struct {
	*pgxpool.Pool
}

// Connect creates a new pgx connection
func Connect(ctx context.Context, connString string) (Pool, error) {
	pool, err := pgxpool.Connect(ctx, connString)
	return Pool{pool}, err
}

// Acquire returns a connection from the Pool
func (p Pool) Acquire(ctx context.Context) (Conn, error) {
	conn, err := p.Pool.Acquire(ctx)
	return Conn{conn}, err
}
