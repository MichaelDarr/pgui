import type {
    ClientUnaryCall,
    requestCallback,
} from "@grpc/grpc-js";

import type { ConnectRequest, ConnectResponse } from '../protos/postgres/postgres_pb';

export interface PostgresServiceClientTarget {
    connect(argument: Uint8Array, callback: requestCallback<Uint8Array>): ClientUnaryCall;
}

export interface PostgresServiceClientSource {
    connect(argument: ConnectRequest, callback: requestCallback<ConnectResponse>): ClientUnaryCall;
}
