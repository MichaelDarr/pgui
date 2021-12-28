/* eslint @typescript-eslint/no-var-requires: off, no-undef: off, @typescript-eslint/no-unsafe-argument: off */
/* eslint @typescript-eslint/no-unsafe-call: off, @typescript-eslint/no-unsafe-member-access: off, @typescript-eslint/no-unsafe-return: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off */

const { contextBridge } = require('electron');
const { credentials } = require('@grpc/grpc-js');

const PostgresProto = require('../protos/postgres/postgres_pb');
const { PostgresServiceClient } = require('../protos/postgres/postgres_grpc_pb');

const createClient = (options) => {
    const client = new PostgresServiceClient(
        'unix:///tmp/pgui1.sock',
        credentials.createInsecure(),
        options
    );
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds()+5);
    client.waitForReady(deadline, err => {
        if (err) {
            throw err;
        }
        const arg = new PostgresProto.ConnectRequest();
        arg.setPort(1234);
        arg.setHost('helloThere');
        client.connect(arg, (err, value) => {
            if (err) {
                throw err;
            } else if (!value) {
                throw new Error('no value returned from call')
            }
            const connectionID = value.getConnectionid()
            console.log({ connectionID });
        });
    });
    return client;
}

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: {
            ...PostgresProto,
            createClient,
        }
    }
});
