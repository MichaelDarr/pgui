import type { Client, ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

import { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';

export interface Deserializer<T> {
    deserializeBinary: (bytes: Uint8Array) => T;
}

// A function exposed by `exposeInMainWorld` to forward RPCs
export type RPCForwarder = (argument: Uint8Array, callback: requestCallback<Uint8Array>) => ClientUnaryCall;

// A type helper which extracts RPC names from autogenerated service clients
export type ServiceRPCName<T> = {
    [P in keyof T]: T[P] extends unknown
        ? P extends keyof Client
            ? never
            : P
        : never;
}[keyof T];

export type PostgresServiceRPCName = ServiceRPCName<PostgresServiceClient>;
export type PostgresServiceRPCRequest<T extends PostgresServiceRPCName> = Parameters<PostgresServiceClient[T]>[0];
export type PostgresServiceRPCResponse<T extends PostgresServiceRPCName> = NonNullable<Parameters<Parameters<PostgresServiceClient[T]>[3]>[1]>;
export type PostgresService = Record<PostgresServiceRPCName, RPCForwarder>;
