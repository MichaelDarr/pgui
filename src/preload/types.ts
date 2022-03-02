import type { Client, ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import { TableQueryCreator } from './tableQuery/types';
import { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';

export type PostgresServiceNonUnaryName =
    | 'getTable';

export type PostgresServiceNonUnary = {
    'newTableQuery': TableQueryCreator;
};

export interface Deserializer<T> {
    deserializeBinary: (bytes: Uint8Array) => T;
}

// Functions exposed by `exposeInMainWorld` to forward RPCs
export type UnaryForwarder = (argument: Uint8Array, callback: requestCallback<Uint8Array>) => ClientUnaryCall;

// A type helper which extracts RPC names from autogenerated service clients
export type ServiceRPCName<T> = {
    [P in keyof T]: T[P] extends unknown
        ? P extends PostgresServiceNonUnaryName
            ? never
            : P extends keyof Client
                ? never
                : P
            : never;
}[keyof T];

export type PostgresServiceUnaryName = ServiceRPCName<PostgresServiceClient>;
export type PostgresServiceUnaryRequest<T extends PostgresServiceUnaryName> = Parameters<PostgresServiceClient[T]>[0];
export type PostgresServiceUnaryResponse<T extends PostgresServiceUnaryName> = NonNullable<Parameters<Parameters<PostgresServiceClient[T]>[3]>[1]>;

export type PostgresService =
    & Record<PostgresServiceUnaryName, UnaryForwarder>
    & PostgresServiceNonUnary;
