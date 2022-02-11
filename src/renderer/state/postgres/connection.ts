import { atom, selector } from 'recoil';

import { postgres } from '../../client';
import {
    Connection,
    GetConnectionsRequest,
} from '../../../protos/postgres/postgres_pb';

export const connectionsState = selector<Connection.AsObject[]>({
    key: 'PostgresConnections',
    get: () => new Promise((res, rej) => {
        const req = new GetConnectionsRequest();
        postgres.getConnections(req, (err, value) => {
            if (err !== null) {
                rej(err);
            } else if (typeof value === 'undefined') {
                rej(new Error('value undefined in response without error'))
            } else {
                const result = value.getConnectionsList().map(connection => connection.toObject());
                res(result);
            }
        });
    })
});

export const activeConnectionIDState = atom<string|null>({
    key: 'PostgresActiveConnection',
    default: null,
});

export const activeConnectionState = selector<Connection.AsObject|null>({
    key: 'PostgresActiveConnectionState',
    get: ({ get }) => {
        const activeConnectionID = get(activeConnectionIDState);
        if (activeConnectionID === null) {
            return null;
        }
        const connections = get(connectionsState);
        const connection = connections.find(({ id }) => id === activeConnectionID);
        if (typeof connection === 'undefined') {
            return null;
        }
        return connection;
    }
});
