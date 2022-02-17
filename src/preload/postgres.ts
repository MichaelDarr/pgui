import { ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import {
    GetConnectionsRequest,
    GetSchemasRequest,
    SaveConnectionRequest,
    TestConnectionRequest,
} from 'protos/postgres/postgres_pb';
import { PostgresServiceClient } from 'protos/postgres/postgres_grpc_pb';

import { wrapClientUnaryCall } from './rpc';
import { getCredentials, getServerAddress } from './server';
import { Deserializer, PostgresService, PostgresServiceRPCName } from './types';

let postgresClient: PostgresServiceClient|null = null;
const getPostgresClient = (): PostgresServiceClient => {
    if (postgresClient === null) {
        postgresClient = new PostgresServiceClient(
            getServerAddress(),
            getCredentials(),
        );
    }
    return postgresClient;
};

export type Distribute<T> =
    T extends T
        ? T
        : never;

const createPostgresTargetMethod = <T extends PostgresServiceRPCName>(
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
    getConnections: createPostgresTargetMethod('getConnections', GetConnectionsRequest),
    getSchemas: createPostgresTargetMethod('getSchemas', GetSchemasRequest),
    saveConnection: createPostgresTargetMethod('saveConnection', SaveConnectionRequest),
    testConnection: createPostgresTargetMethod('testConnection', TestConnectionRequest),
};
