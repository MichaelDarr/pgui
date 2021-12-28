/* eslint @typescript-eslint/no-var-requires: off, no-undef: off, @typescript-eslint/no-unsafe-argument: off */
/* eslint @typescript-eslint/no-unsafe-call: off, @typescript-eslint/no-unsafe-member-access: off, @typescript-eslint/no-unsafe-return: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off */

import { contextBridge } from 'electron';
import { credentials } from '@grpc/grpc-js';

import PostgresProto from '../protos/postgres/postgres_pb';
import { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';

let client: PostgresServiceClient|null = null;

const createClient = () => {
    if (client === null) {
        client = new PostgresServiceClient(
            'unix:///tmp/pgui1.sock',
            credentials.createInsecure(),
        );
    }
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    return Object.keys(
        Reflect.getPrototypeOf(client)??{}
    ).concat([
        'waitForReady',
    ]).reduce<Record<keyof PostgresServiceClient, (...a: any[]) => any>>((acc, name) => ({
        ...acc,
        [name]: (...args: any[]) => {
            if (client === null) {
                return;
            }
            if (name === 'connect') {
                const arg = new PostgresProto.ConnectRequest();
                console.log({ src: 'preload inner', arg })
                arg.setPort(1234);
                arg.setHost('helloThere');
                console.log({ src: 'preload sending', arg, argOne: args[1] });
                client[name](arg, (err, value) => {
                    console.log({ err, value });
                    if (value) {
                        const myUUID = value.getConnectionid()
                        console.log({ src: 'preload sent', myUUID });
                    }
                });
            } else {
                console.log({ src: 'preload', args })
                // @ts-ignore
                return client[name](...args)
            }
        },
    // @ts-ignore
    }), {});
    /* eslint-enable @typescript-eslint/ban-ts-comment */
}

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: {
            ...PostgresProto,
            client: createClient,
        }
    }
});
