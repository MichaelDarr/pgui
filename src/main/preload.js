/* eslint @typescript-eslint/no-var-requires: off, no-undef: off, @typescript-eslint/no-unsafe-argument: off */
/* eslint @typescript-eslint/no-unsafe-call: off, @typescript-eslint/no-unsafe-member-access: off, @typescript-eslint/no-unsafe-return: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off */

const { contextBridge } = require('electron');
const { credentials } = require('@grpc/grpc-js');

const PostgresProto = require('../protos/postgres/postgres_pb');
const { PostgresServiceClient } = require('../protos/postgres/postgres_grpc_pb');

class WrappedPostgresServiceClient extends PostgresServiceClient {
    constructor(options) {
        super(
            '/tmp/pgui1.sock',
            credentials.createInsecure(),
            options,
        )
    }
}

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: {
            ...PostgresProto,
            PostgresServiceClient: WrappedPostgresServiceClient,
        }
    }
});
