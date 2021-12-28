import type { Client } from '@grpc/grpc-js';

import type { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';
import type PostgresProto from '../protos/postgres/postgres_pb';

type MethodsOf<T> = {
    [P in keyof T]: T[P] extends infer U
        ? U extends unknown
            ? never
            : U
        : string;
}[keyof T];

export type PostgresServiceClientMethods = MethodsOf<PostgresServiceClient>;
export type OtherTest = keyof PostgresServiceClient;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ClientMethodKeys<T> = ({
    [P in keyof T]: P extends keyof Omit<Client, 'waitForReady'>
        ? never
        : T[P] extends (...a: any) => any
            ? P
            : never;
})[keyof T];
/* eslint-enable @typescript-eslint/no-explicit-any */

export type ClientMethods<T> = Pick<T, ClientMethodKeys<T>>;

export type ClientProvider<T> = () => ClientMethods<T>;

export interface ElectronAPI {
    proto: ProtoAPI;
}

export interface ProtoAPI {
    postgres: ProtoPostgresAPI;
}

export type ProtoPostgresAPI = typeof PostgresProto & {
    client: ClientProvider<PostgresServiceClient>;
};

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
