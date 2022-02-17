package pg

import (
	"context"
	"regexp"

	"github.com/jackc/pgx/v4"
)

// Conn is a pgx connection.
type Conn struct {
	*pgx.Conn
}

// Connect creates a new pgx connection
func Connect(ctx context.Context, connString string) (Conn, error) {
	conn, err := pgx.Connect(ctx, connString)
	if err != nil {
		return Conn{}, err
	}
	return Conn{conn}, nil
}

// Schemas gets a list of all available schemas.
func (c Conn) Schemas(ctx context.Context) (schemas []string, err error) {
	rows, err := c.Query(ctx, "SELECT schema_name FROM information_schema.schemata")
	if err == nil {
		internalSchema := regexp.MustCompile(`^pg.*(?:_temp_\d+|_toast)$`)
		for rows.Next() {
			var schema string
			if err = rows.Scan(&schema); err != nil {
				return
			}
			if !internalSchema.MatchString(schema) {
				schemas = append(schemas, schema)
			}
		}
		err = rows.Err()
	}
	return
}
