package pg

import (
	"context"
	"regexp"

	"github.com/jackc/pgx/v4/pgxpool"
)

// Conn is a pgx connection.
type Conn struct {
	*pgxpool.Conn
}

// Schemas gets all schemas.
func (c Conn) Schemas(ctx context.Context) (schemas []string, err error) {
	rows, err := c.Query(ctx, `
        SELECT nspname
        FROM pg_catalog.pg_namespace
    `)
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

// SchemaTables gets all tables within a schema.
func (c Conn) SchemaTables(ctx context.Context, schema string) (tables Tables, err error) {
	rows, err := c.Query(ctx, `
        SELECT
            schemaname,
            tablename,
            tableowner,
            hasindexes,
            hasrules,
            hastriggers,
            rowsecurity
        FROM pg_catalog.pg_tables
        WHERE schemaname=$1
    `, schema)
	if err == nil {
		for rows.Next() {
			var table Table
			if err = rows.Scan(
				&table.Schema,
				&table.Name,
				&table.Owner,
				&table.HasIndexes,
				&table.HasRules,
				&table.HasTriggers,
				&table.HasRowSecurityEnabled,
			); err != nil {
				return
			}
			tables = append(tables, table)
		}
		err = rows.Err()
	}
	return
}
