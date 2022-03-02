import { ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import {
    DeleteConnectionRequest,
    GetConnectionsRequest,
    GetSchemasRequest,
    GetSchemaTablesRequest,
    SaveConnectionRequest,
    TestConnectionRequest,
} from 'protos/postgres/postgres_pb';
import { PostgresServiceClient } from 'protos/postgres/postgres_grpc_pb';

import { wrapClientUnaryCall } from './rpc';
import { getCredentials, getServerAddress } from './server';
import { newTableQuery } from './tableQuery';
import { Deserializer, PostgresService, PostgresServiceUnaryName } from './types';

let postgresClient: PostgresServiceClient|null = null;
export const getPostgresClient = (): PostgresServiceClient => {
    if (postgresClient === null) {
        postgresClient = new PostgresServiceClient(
            getServerAddress(),
            getCredentials(),
        );
    }
    return postgresClient;
};

const createPostgresTargetMethod = <T extends PostgresServiceUnaryName>(
    postgresKey: T,
    deserializer: Deserializer<Parameters<PostgresServiceClient[T]>[0]>,
): (argument: Uint8Array, callback: requestCallback<Uint8Array>) => ClientUnaryCall => {
    return (argument, callback) => {
        /* eslint-disable */
        return wrapClientUnaryCall(
            // @ts-ignore
            getPostgresClient()[postgresKey](
                deserializer.deserializeBinary(argument),
                // @ts-ignore
                (err, value) => {
                    callback(err, value?.serializeBinary());
                }
            )
        );
        /* eslint-enable */
    };
}

export const postgresTarget: PostgresService = {
    newTableQuery,
    deleteConnection: createPostgresTargetMethod('deleteConnection', DeleteConnectionRequest),
    getConnections: createPostgresTargetMethod('getConnections', GetConnectionsRequest),
    getSchemas: createPostgresTargetMethod('getSchemas', GetSchemasRequest),
    getSchemaTables: createPostgresTargetMethod('getSchemaTables', GetSchemaTablesRequest),
    saveConnection: createPostgresTargetMethod('saveConnection', SaveConnectionRequest),
    testConnection: createPostgresTargetMethod('testConnection', TestConnectionRequest),
};
