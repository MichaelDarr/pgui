package pg

import proto "github.com/MichaelDarr/pgui/backend/protos/postgres"

// Table is a postgres table.
type Table struct {
	HasIndexes            bool
	HasRowSecurityEnabled bool
	HasRules              bool
	HasTriggers           bool
	Name                  string
	Owner                 string
	Schema                string
}

// Tables is a slice of postgres tables.
type Tables []Table

// Proto formats a table as a protobuf message.
func (t Table) Proto() *proto.Table {
	return &proto.Table{
		Name:                  t.Name,
		Schema:                t.Schema,
		Owner:                 t.Owner,
		HasIndexes:            t.HasIndexes,
		HasRules:              t.HasRules,
		HasTriggers:           t.HasTriggers,
		HasRowSecurityEnabled: t.HasRowSecurityEnabled,
	}
}

// Proto formats tables as a protobuf messages.
func (t Tables) Proto() []*proto.Table {
	tables := make([]*proto.Table, len(t))
	for i, table := range t {
		tables[i] = table.Proto()
	}
	return tables
}
