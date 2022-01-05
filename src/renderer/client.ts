import type { ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import type {
    PostgresServiceRPCName,
    PostgresServiceRPCRequest,
    PostgresServiceRPCResponse,
} from '../main/preload';
import { ConnectResponse } from '../protos/postgres/postgres_pb';

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
        (err, value) => callback(err, value&&deserializer.deserializeBinary(value))
    );
}

export const postgres: PostgresService = {
    connect: createPostgresSourceMethod('connect', ConnectResponse),
}
