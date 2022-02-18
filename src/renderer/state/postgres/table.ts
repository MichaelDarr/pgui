import { selector, selectorFamily } from 'recoil';

import { postgres } from 'renderer/client';
import { GetSchemaTablesRequest, Table } from 'protos/postgres/postgres_pb';

import { connectionIDState } from './connection';
import { schemaState } from './schema';

interface TableParam {
    connectionID: string;
    schema: string;
}

const tablesQuery = selectorFamily<Map<string, Table.AsObject>, Readonly<TableParam>>({
    key: 'PostgresAllTables',
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
