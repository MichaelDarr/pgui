import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

import {
    Connection,
    Credentials,
    GetConnectionsRequest,
    TestConnectionRequest,
} from 'protos/postgres/postgres_pb';
import { postgres } from 'renderer/client';
import { TestResult } from 'renderer/types';

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

export const connectionQuery = selectorFamily<Connection.AsObject|null, string>({
    key: 'PostgresConnectionQuery',
    get: connectionID => ({ get }) => {
        const connection = get(connectionsState).get(connectionID)
        if (!connection) {
            return null;
        }
        return connection;
    },
});

export const connectionCredentialsQuery = selectorFamily<Credentials|null, string>({
    key: 'PostgresConnectionCredentialsQuery',
    get: connectionID => ({ get }) => {
        const connection = get(connectionQuery(connectionID));
        if (connection === null) {
            return null;
        }
        const { credentials } = connection;
        if (typeof credentials === 'undefined') {
            return null;
        }
        const { db, host, port, user, password } = credentials;
        const protoCredentials = new Credentials();
        protoCredentials.setDb(db);
        protoCredentials.setHost(host);
        protoCredentials.setPort(port);
        protoCredentials.setUser(user);
        protoCredentials.setPassword(password);
        return protoCredentials;
    },
});

export const connectionTestQuery = selectorFamily<TestResult, string>({
    key: 'PostgresConnectionTestQuery',
    get: connectionID => ({ get }) => new Promise<TestResult>(res => {
        const credentials = get(connectionCredentialsQuery(connectionID));
        if (credentials === null) {
            res({ success: false, message: 'connection not found' });
            return;
        }
        const req = new TestConnectionRequest();
        req.setCredentials(credentials);
        postgres.testConnection(req, (err, value) => {
            if (err) {
                res({ success: false, message: String(err) });
            } else if (!value) {
                res({ success: false, message: String('no response from driver') });
            } else {
                res({ success: value.getSuccess() });
            }
        });
    }),
});

export const connectionIDState = atom<string|null>({
    key: 'PostgresConnectionID',
    default: null,
});

export const connectionState = selector<Connection.AsObject|null>({
    key: 'PostgresConnectionState',
    get: ({ get }) => {
        const connectionID = get(connectionIDState);
        if (connectionID === null) {
            return null;
        }
        return get(connectionQuery(connectionID));
    },
    set: ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            return;
        }
        if (newValue === null) {
            set(connectionIDState, null);
        } else if (get(connectionQuery(newValue.id)) !== null) {
            set(connectionIDState, newValue.id)
        }
    }
});
