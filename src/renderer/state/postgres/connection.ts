import { atom, DefaultValue, selector } from 'recoil';

import {
    Connection,
    GetConnectionsRequest,
} from 'protos/postgres/postgres_pb';
import { postgres } from 'renderer/client';

export const connectionsState = selector<Map<string, Connection.AsObject>>({
    key: 'PostgresConnections',
    get: () => new Promise((res, rej) => {
        const req = new GetConnectionsRequest();
        postgres.getConnections(req, (err, value) => {
            if (err !== null) {
                rej(err);
            } else if (typeof value === 'undefined') {
                rej(new Error('value undefined in response without error'))
            } else {
                res(new Map(value.getConnectionsList().map(connection => [
                    connection.getId(),
                    connection.toObject(),
                ])));
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
        const connection = get(connectionsState).get(connectionID);
        if (!connection) {
            return null;
        }
        return connection;
    },
    set: ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            return;
        }
        if (newValue === null) {
            set(connectionIDState, null);
        } else if (get(connectionsState).has(newValue.id)) {
            set(connectionIDState, newValue.id)
        }
    }
});
