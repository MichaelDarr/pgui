import { atom, selector } from 'recoil';

import { getCredentials, getServerAddress } from './server';
import {
    Connection,
    GetConnectionRequest,
} from '../protos/postgres/postgres_pb';
import { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';

const postgresClient = new PostgresServiceClient(
    getServerAddress(),
    getCredentials(),
);

const selectedConnectionID = atom<string|null>({
    key: 'selectedConnectionID',
    default: null,
});

const connections = selector<Connection.AsObject[]>({
    key: 'configIDs',
    get: () => {
        return new Promise((res, rej) => {
            const connectionRequest = new GetConnectionRequest();
            postgresClient.getConnections(connectionRequest, (err, value) => {
                if (err) {
                    rej(err);
                } else if (typeof value === 'undefined') {
                    throw 'error not null but value not defined';
                } else {
                    const connections = value.getConnectionsList();
                    res(connections.map(connection => connection.toObject()));
                }
            });
        })
    }
});

const selectedConnection = selector<Connection.AsObject|null>({
    key: 'selectedConnection',
    get: ({ get }) => {
        const selectedID = get(selectedConnectionID);
        if (selectedID === null) {
            return null;
        }
        const selectedConnection = get(connections).find(connection => {
            connection.id === selectedID;
        });
        if (typeof selectedConnection === 'undefined') {
            return null;
        }
        return selectedConnection;
    }
});

export const atoms = {
    connections,
    selectedConnection,
};
