import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

import { postgres } from 'renderer/client';
import { GetSchemaTablesRequest, Table } from 'protos/postgres/postgres_pb';

import { connectionIDState } from './connection';
import { schemaState } from './schema';

interface TableParam {
    connectionID: string;
    schema: string;
}

const tablesQuery = selectorFamily<Map<string, Table.AsObject>, Readonly<TableParam>>({
    key: 'PostgresTables',
    get: ({ connectionID, schema }) => () => new Promise((res, rej) => {
        const req = new GetSchemaTablesRequest();
        req.setConnectionid(connectionID);
        req.setSchema(schema);
        postgres.getSchemaTables(req, (err, value) => {
            if (err !== null) {
                rej(err);
            } else if (typeof value === 'undefined') {
                rej(new Error('value undefined in response without error'))
            } else {
                res(new Map(value.getTablesList().map(table => [
                    table.getName(),
                    table.toObject(),
                ])));
            }
        });
    }),
});

export const tablesState = selector<Map<string, Table.AsObject>>({
    key: 'PostgresTables',
    get: ({ get }) => {
        const connectionID = get(connectionIDState);
        const schema = get(schemaState);
        if (connectionID === null || schema === null) {
            return new Map();
        }
        return get(tablesQuery({ connectionID, schema }));
    },
});


const userSelectedTableState = atom<Table.AsObject|null>({
    key: 'PostgresUserSelectedTable',
    default: null,
});

export const tableState = selector<Table.AsObject|null>({
    key: 'PostgresTable',
    get: ({ get }) => {
        const tables = get(tablesState);
        const userSelectedTable = get(userSelectedTableState);
        if (userSelectedTable !== null && tables.has(userSelectedTable.name)) {
            return userSelectedTable;
        }
        return null;
    },
    set: ({ get, set }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const tables = get(tablesState);
            if (newValue === null || tables.has(newValue.name)) {
                set(userSelectedTableState, newValue);
            }
        }
    },
});
