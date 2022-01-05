import { contextBridge, ipcRenderer } from 'electron';
import {
    ChannelCredentials,
    Client,
    ClientUnaryCall,
    credentials,
    requestCallback,
} from '@grpc/grpc-js';
import { InterceptingCallInterface } from '@grpc/grpc-js/build/src/client-interceptors';

import { ConnectRequest } from '../protos/postgres/postgres_pb';
import { PostgresServiceClient } from '../protos/postgres/postgres_grpc_pb';

// Wrap `InterceptingCallInterface` functionality for safe transport over IPC
const wrapInterceptingCallInterface = (call: InterceptingCallInterface): InterceptingCallInterface => {
    return {
        cancelWithStatus: (status, details) => call.cancelWithStatus(status, details),
        getPeer: () => call.getPeer(),
        start: (metadata, listener) => call.start(metadata, listener),
        sendMessageWithContext: (context, message) => call.sendMessageWithContext(context, message),
        sendMessage: message => call.sendMessage(message),
        startRead: () => call.startRead(),
        halfClose: () => call.halfClose(),
        setCredentials: credentials => call.setCredentials(credentials),
    };
};

/**
 * Wrap `ClientUnaryCall` functionality for safe transport over IPC.
 *
 * Wrapping with `addedListener` options indicates that the function returning the call added a
 * listener. Calling `off` or `removeListener` on the returned value will ignore the passed params
 * and remove the added call. This enables the removal of specific listeners across IPC, where
 * functional referential equality is lost.
 *
 * In the renderer, this code *fails to remove the listener* due to lost referential equality:
 * ```ts
 * const unaryCall = postgres.connect(arg, (err, value) => ...);
 * const statusListener = (statusObject: ClientUnaryCall) => ...;
 * unaryCall.addListener('status', statusListener);
 * unaryCall.removeListener('status', statusListener);
 * ```
 *
 * With this wrapper, the listener can be successfully removed in the following manner:
 * ```ts
 * const initialUnaryCall = postgres.connect(arg, (err, value) => ...);
 * const statusListener = (statusObject: ClientUnaryCall) => ...;
 * const addListenerUnaryCall = initialUnaryCall.addListener('status', statusListener);
 * addListenerUnaryCall.removeListener('status', statusListener);
 *  ```
 */
const wrapClientUnaryCall = (
    call: ClientUnaryCall,
    options: {
        addedListener?: {
            eventName: Parameters<ClientUnaryCall['removeListener']>[0],
            listener: Parameters<ClientUnaryCall['removeListener']>[1],
        },
    } = {}
): ClientUnaryCall => {
    return {
        call: call.call&&wrapInterceptingCallInterface(call.call),
        cancel: () => call.cancel(),
        getPeer: () => call.getPeer(),
        addListener: (eventName, listener) => wrapClientUnaryCall(
            call.addListener(eventName, listener),
            { addedListener: { eventName, listener }}
        ),
        emit: (eventName, ...args) => call.emit(eventName, ...args),
        on: (eventName, listener) => wrapClientUnaryCall(
            call.on(eventName, listener),
            { addedListener: { eventName, listener }}
        ),
        once: (eventName, listener) => wrapClientUnaryCall(
            call.once(eventName, listener),
            { addedListener: { eventName, listener }}
        ),
        prependListener: (eventName, listener) => wrapClientUnaryCall(
            call.prependListener(eventName, listener),
            { addedListener: { eventName, listener }}
        ),
        prependOnceListener: (eventName, listener) => wrapClientUnaryCall(
            call.prependOnceListener(eventName, listener),
            { addedListener: { eventName, listener }}
        ),
        removeListener: (eventName, listener) => {
            let rawCall: ClientUnaryCall;
            if (options.addedListener) {
                rawCall = call.removeListener(options.addedListener.eventName, options.addedListener.listener);
            } else {
                rawCall = call.removeListener(eventName, listener);
            }
            return wrapClientUnaryCall(rawCall);
        },
        off: (eventName, listener) => {
            let rawCall: ClientUnaryCall;
            if (options.addedListener) {
                rawCall = call.off(options.addedListener.eventName, options.addedListener.listener);
            } else {
                rawCall = call.off(eventName, listener);
            }
            return wrapClientUnaryCall(rawCall);
        },
        removeAllListeners: event => wrapClientUnaryCall(
            call.removeAllListeners(event)
        ),
        setMaxListeners: n => wrapClientUnaryCall(
            call.setMaxListeners(n)
        ),
        getMaxListeners: () => call.getMaxListeners(),
        listeners: eventName => call.listeners(eventName),
        rawListeners: eventName => call.rawListeners(eventName),
        listenerCount: eventName => call.listenerCount(eventName),
        eventNames: () => call.eventNames(),
    };
};

const getServerSocket = (): string => {
    const response: unknown = ipcRenderer.sendSync('get-server-socket');
    if (typeof response === 'string') {
        return response;
    }
    throw new Error(`bad response to server socket request: ${String(response)}`);
};

const getClientAddress = (): string => {
    return `unix://${getServerSocket()}`;
}

const getClientCredentials = (): ChannelCredentials => {
    return credentials.createInsecure();
}

interface Deserializer<T> {
    deserializeBinary: (bytes: Uint8Array) => T;
}

// A function exposed by `exposeInMainWorld` to forward RPCs
type RPCForwarder = (argument: Uint8Array, callback: requestCallback<Uint8Array>) => ClientUnaryCall;

// A type helper which extracts RPC names from autogenerated service clients
type ServiceRPCName<T> = {
    [P in keyof T]: T[P] extends unknown
        ? P extends keyof Client
            ? never
            : P
        : never;
}[keyof T];

/* Postgres Service
 ********************************************************/
export type PostgresServiceRPCName = ServiceRPCName<PostgresServiceClient>;
export type PostgresServiceRPCRequest<T extends PostgresServiceRPCName> = Parameters<PostgresServiceClient[T]>[0];
export type PostgresServiceRPCResponse<T extends PostgresServiceRPCName> = NonNullable<Parameters<Parameters<PostgresServiceClient[T]>[3]>[1]>;
export type PostgresService = Record<PostgresServiceRPCName, RPCForwarder>;

let postgresClient: PostgresServiceClient|null = null;
const getPostgresClient = (): PostgresServiceClient => {
    if (postgresClient === null) {
        postgresClient = new PostgresServiceClient(
            getClientAddress(),
            getClientCredentials(),
        );
    }
    return postgresClient;
};

const createPostgresTargetMethod = <T extends PostgresServiceRPCName>(
    postgresKey: T,
    deserializer: Deserializer<Parameters<PostgresServiceClient[T]>[0]>,
): (argument: Uint8Array, callback: requestCallback<Uint8Array>) => ClientUnaryCall => {
    return (argument, callback) => {
        return wrapClientUnaryCall(
            getPostgresClient()[postgresKey](
                deserializer.deserializeBinary(argument),
                (err, value) => {
                    callback(err, value?.serializeBinary());
                }
            )
        );
    };
}

const postgresTarget: PostgresService = {
    connect: createPostgresTargetMethod('connect', ConnectRequest),
};

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: postgresTarget,
    }
});
