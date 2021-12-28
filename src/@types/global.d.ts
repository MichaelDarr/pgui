import type { ClientOptions } from '@grpc/grpc-js';

import type PostgresGrpcProto from '../protos/postgres/postgres_grpc_pb';
import type PostgresProto from '../protos/postgres/postgres_pb';

export class PostgresServiceClient extends PostgresGrpcProto.PostgresServiceClient {
    constructor(options?: ClientOptions);
}

export interface ElectronAPI {
    proto: ProtoAPI;
}

export interface ProtoAPI {
    postgres: ProtoPostgresAPI;
}

export type ProtoPostgresAPI = typeof PostgresProto & {
    PostgresServiceClient: typeof PostgresServiceClient;
};

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
