import type { ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import type {
    PostgresServiceUnaryName,
    PostgresServiceUnaryRequest,
    PostgresServiceUnaryResponse,
} from '../preload/types';
import {
    DeleteConnectionResponse,
    GetConnectionsResponse,
    GetSchemasResponse,
    GetSchemaTablesResponse,
    SaveConnectionResponse,
    TestConnectionResponse,
} from '../protos/postgres/postgres_pb';

interface Deserializer<T> {
    deserializeBinary: (bytes: Uint8Array) => T;
}

interface Serializable {
    serializeBinary: () => Uint8Array;
}

export type PostgresService = {
    [T in PostgresServiceUnaryName]: (
        argument: PostgresServiceUnaryRequest<T>,
        callback: requestCallback<PostgresServiceUnaryResponse<T>>
    ) => ClientUnaryCall;
};

function createPostgresSourceMethod <T extends Serializable, K>(
    postgresKey: PostgresServiceUnaryName,
    deserializer: Deserializer<K>,
): (argument: T, callback: requestCallback<K>) => ClientUnaryCall {
    return (argument, callback) => window.electron.proto.postgres[postgresKey](
        argument.serializeBinary(),
        (err, value) => {
            return callback(err, value&&deserializer.deserializeBinary(value))
        },
    );
}

export const postgres: PostgresService = {
    deleteConnection: createPostgresSourceMethod('deleteConnection', DeleteConnectionResponse),
    getConnections: createPostgresSourceMethod('getConnections', GetConnectionsResponse),
    getSchemas: createPostgresSourceMethod('getSchemas', GetSchemasResponse),
    getSchemaTables: createPostgresSourceMethod('getSchemaTables', GetSchemaTablesResponse),
    saveConnection: createPostgresSourceMethod('saveConnection', SaveConnectionResponse),
    testConnection: createPostgresSourceMethod('testConnection', TestConnectionResponse),
}
