import type { ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import type {
    PostgresServiceRPCName,
    PostgresServiceRPCRequest,
    PostgresServiceRPCResponse,
} from '../preload/types';
import {
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
    [T in PostgresServiceRPCName]: (
        argument: PostgresServiceRPCRequest<T>,
        callback: requestCallback<PostgresServiceRPCResponse<T>>
    ) => ClientUnaryCall;
};

function createPostgresSourceMethod <T extends Serializable, K>(
    postgresKey: PostgresServiceRPCName,
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
    getConnections: createPostgresSourceMethod('getConnections', GetConnectionsResponse),
    getSchemas: createPostgresSourceMethod('getSchemas', GetSchemasResponse),
    getSchemaTables: createPostgresSourceMethod('getSchemaTables', GetSchemaTablesResponse),
    saveConnection: createPostgresSourceMethod('saveConnection', SaveConnectionResponse),
    testConnection: createPostgresSourceMethod('testConnection', TestConnectionResponse),
}
