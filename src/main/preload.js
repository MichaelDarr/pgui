/* eslint @typescript-eslint/no-var-requires: off, no-undef: off, @typescript-eslint/no-unsafe-argument: off */
/* eslint @typescript-eslint/no-unsafe-call: off, @typescript-eslint/no-unsafe-member-access: off, @typescript-eslint/no-unsafe-return: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off */

const { contextBridge } = require('electron');
const { credentials } = require('@grpc/grpc-js');

const PostgresProto = require('../protos/postgres/postgres_pb');
const { PostgresServiceClient } = require('../protos/postgres/postgres_grpc_pb');

let client = null;

const createClient = () => {
    if (client === null) {
        client = new PostgresServiceClient(
            'unix:///tmp/pgui1.sock',
            credentials.createInsecure(),
        );
    }
    return Object.keys(
        Reflect.getPrototypeOf(client)??{}
    ).concat([
        'waitForReady',
    ]).reduce((acc, name) => ({
        ...acc,
        [name]: (...args) => {
            if (name === 'connect') {
                const arg = new PostgresProto.ConnectRequest();
                console.log({ src: 'preload inner', arg })
                arg.setPort(1234);
                arg.setHost('helloThere');
                console.log({ src: 'preload sending', arg, argOne: args[1] });
                client[name](arg, (err, value) => {
                    console.log({ err, value });
                    const myUUID = value.getConnectionid()
                    console.log({ src: 'preload sent', myUUID });
                });
            } else {
                console.log({ src: 'preload', args })
                return client[name](...args)
            }
        },
    }), {});
}

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: {
            ...PostgresProto,
            client: createClient,
        }
    }
});
