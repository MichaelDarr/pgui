import { ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import { getCredentials, getServerAddress } from './server';
import { Deserializer, PostgresService, PostgresServiceRPCName } from './types';
import { wrapClientUnaryCall } from './rpc';
import { ConnectRequest } from '../protos/postgres/postgres_pb';
import { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';

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

const createPostgresTargetMethod = <T extends PostgresServiceRPCName>(
    postgresKey: T,
    deserializer: Deserializer<Parameters<PostgresServiceClient[T]>[0]>,
): (argument: Uint8Array, callback: requestCallback<Uint8Array>) => ClientUnaryCall => {
    return (argument, callback) => {
        return wrapClientUnaryCall(
            getPostgresClient()[postgresKey](
                deserializer.deserializeBinary(argument),
                (err, value) => {
                    callback(err, value?.serializeBinary());
                }
            )
        );
    };
}

export const postgresTarget: PostgresService = {
    connect: createPostgresTargetMethod('connect', ConnectRequest),
};
