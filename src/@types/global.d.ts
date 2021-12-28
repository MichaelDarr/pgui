import type { ClientOptions } from '@grpc/grpc-js';

import type { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';
import type PostgresProto from '../protos/postgres/postgres_pb';

export interface ElectronAPI {
    proto: ProtoAPI;
}

export interface ProtoAPI {
    postgres: ProtoPostgresAPI;
}

export type ProtoPostgresAPI = typeof PostgresProto & {
    createClient: (options?: ClientOptions) => PostgresServiceClient;
};

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
