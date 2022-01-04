import { contextBridge } from 'electron';
import { ChannelCredentials, credentials } from "@grpc/grpc-js";

import type { PostgresServiceClientTarget } from '../@types/protobridge';
import { ConnectRequest } from "../protos/postgres/postgres_pb";
import { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';

const getClientAddress = (): string => {
    return 'unix:///tmp/pgui1.sock';
}

const getClientCredentials = (): ChannelCredentials => {
    return credentials.createInsecure();
}

let postgresClient: PostgresServiceClient|null = null;
const getPostgresClient = (): PostgresServiceClient => {
    if (postgresClient === null) {
        postgresClient = new PostgresServiceClient(
            getClientAddress(),
            getClientCredentials(),
        );
    }
    return postgresClient;
}

const postgresTarget: PostgresServiceClientTarget = {
    connect: (argument, callback) => getPostgresClient().connect(
        ConnectRequest.deserializeBinary(argument),
        (err, value) => {
            callback(err, value?.serializeBinary());
        }
    )
};

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: postgresTarget,
    }
});
