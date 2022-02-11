import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { getCredentials, getServerAddress } from '../server';
import {
    Connection,
    GetConnectionRequest,
} from '../../protos/postgres/postgres_pb';
import { PostgresServiceClient } from '../../protos/postgres/postgres_grpc_pb';

export interface ConnectionState {
    connections: Connection.AsObject[];
    activeConnectionID: string|null;
}

const initialState: ConnectionState = {
    connections: [],
    activeConnectionID: null,
};

const postgresClient = new PostgresServiceClient(
    getServerAddress(),
    getCredentials(),
);

export const fetchConnections = createAsyncThunk<Connection.AsObject[]>(
    'connection/fetchConnections',
    () => new Promise((res, rej) => {
        console.log('IN FETCH CONNECTIONS 1')
        const connectionRequest = new GetConnectionRequest();
        postgresClient.getConnections(connectionRequest, (err, value) => {
            console.log('IN FETCH CONNECTIONS 2')
            if (err) {
                rej(err);
            } else if (typeof value === 'undefined') {
                rej(new Error('error not null but value not defined'));
            } else {
                const connections = value.getConnectionsList();
                res(connections.map(connection => connection.toObject()));
            }
        });
    }),
);

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setConnectionID: (state, action: PayloadAction<string>) => {
            state.activeConnectionID = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchConnections.pending, (state, action) => {
                console.log('PENDING!');
                console.log({ state, action });
            })
            .addCase(fetchConnections.fulfilled, (state, action) => {
                console.log('FULFILLED!');
                console.log({ state, action });
                state.connections = action.payload;
            })
            .addCase(fetchConnections.rejected, (state, action) => {
                console.log('REJECTED!');
                console.log({ state, action });
            })
    }
});

export const selectConnections = (state: RootState) => (
    state.connection.connections
);

export const selectActiveConnectionID = (state: RootState) => (
    state.connection.activeConnectionID
);

export const selectActiveConnection = createSelector(
    [selectConnections, selectActiveConnectionID],
    (connections, activeConnectionID) => {
        if (activeConnectionID === null) {
            return null;
        }
        const foundConnection = connections.find(connection => connection.id === activeConnectionID);
        if (!foundConnection) {
            return null;
        }
        return foundConnection;
    }
);
