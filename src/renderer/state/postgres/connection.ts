import { atom, selector } from 'recoil';

import {
    Connection,
    GetConnectionsRequest,
} from 'protos/postgres/postgres_pb';
import { postgres } from 'renderer/client';

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
                res(value.getConnectionsList().map(connection => connection.toObject()));
            }
        });
    }),
});

export const connectionIDState = atom<string|null>({
    key: 'PostgresActiveConnection',
    default: null,
});

export const connectionState = selector<Connection.AsObject|null>({
    key: 'PostgresActiveConnectionState',
    get: ({ get }) => {
        const connectionID = get(connectionIDState);
        if (connectionID === null) {
            return null;
        }
        const connections = get(connectionsState);
        const connection = connections.find(({ id }) => id === connectionID);
        if (typeof connection === 'undefined') {
            return null;
        }
        return connection;
    }
});
