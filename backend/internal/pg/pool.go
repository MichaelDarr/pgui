package pg

import (
	"context"

	"github.com/jackc/pgtype"
	pgtypeuuid "github.com/jackc/pgtype/ext/gofrs-uuid"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
)

// Pool is a pgx connection pool.
type Pool struct {
	*pgxpool.Pool
}

// Connect creates and configures a new pgx connection pool.
func Connect(ctx context.Context, connString string) (Pool, error) {
	dbconfig, err := pgxpool.ParseConfig(connString)
	if err != nil {
		return Pool{}, err
	}
	dbconfig.AfterConnect = func(ctx context.Context, conn *pgx.Conn) error {
		conn.ConnInfo().RegisterDataType(pgtype.DataType{
			Value: &pgtypeuuid.UUID{},
			Name:  "uuid",
			OID:   pgtype.UUIDOID,
		})
		return nil
	}
	pool, err := pgxpool.ConnectConfig(ctx, dbconfig)
	return Pool{pool}, err
}

// Acquire returns a connection from the Pool
func (p Pool) Acquire(ctx context.Context) (Conn, error) {
	conn, err := p.Pool.Acquire(ctx)
	return Conn{conn}, err
}
