import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import {
    BoolValue,
    BytesValue,
    DoubleValue,
    FloatValue,
    Int32Value,
    Int64Value,
    UInt32Value,
    UInt64Value,
    StringValue,
} from "google-protobuf/google/protobuf/wrappers_pb";

import {
    GetTableRequest,
    GetTableResponse,
    QueryResultStream,
} from 'protos/postgres/postgres_pb';

import { newListeners } from './listeners';
import { genInitializeRequest, genQueryRequest } from './requestGenerators';
import { TableQueryError, TableQueryCreator, Value } from './types';
import { getPostgresClient } from '../postgres';

const notNull = <T>(val: T|null): val is T => (
    val !== null
);

export const newTableQuery: TableQueryCreator = (options) => {

    /* Define function-scoped variables.
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    const client = getPostgresClient();
    const stream = client.getTable();

    /* Set up error log.
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    const errors: TableQueryError[] = [];

    const logError = (stage: string, error: Error|string|unknown) => {
        if (error instanceof Error) {
            errors.push({ stage, error });
        } else {
            errors.push({ stage, error: new Error(String(error)) })
        }
    };

    /* Handle stream events.
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    const listeners = newListeners();

    stream.on('data', message => {
        const errorStage = 'receive data';

        if (!(message instanceof GetTableResponse)) {
            logError(errorStage, `unknown message type (${typeof message})`);
            return;
        }

        const result = message.getResult();
        if (!result) {
            logError(errorStage, `no result in message`);
            return;
        }

        switch (result.getDataCase()) {
            case QueryResultStream.DataCase.METADATA: {
                const metadata = result.getMetadata();
                if (metadata) {
                    listeners.emit('metadata', metadata.toObject());
                } else {
                    logError(errorStage, `metadata message data missing`);
                }
                return;
            }
            case QueryResultStream.DataCase.ROW: {
                const row = result.getRow();
                if (row) {
                    const values = row.getValuesList().map<Value|null>(value => {
                        /* eslint-disable @typescript-eslint/unbound-method */
                        switch(value.getTypeName()) {
                            case 'google.protobuf.BoolValue': {
                                const unpacked = value.unpack(
                                    BoolValue.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'bool',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            case 'google.protobuf.BytesValue': {
                                const unpacked = value.unpack(
                                    BytesValue.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'bytes',
                                        value: unpacked.getValue_asB64(),
                                    };
                                }
                            }
                            case 'google.protobuf.DoubleValue': {
                                const unpacked = value.unpack(
                                    DoubleValue.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'double',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            case 'google.protobuf.FloatValue': {
                                const unpacked = value.unpack(
                                    FloatValue.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'float',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            case 'google.protobuf.Int32Value': {
                                const unpacked = value.unpack(
                                    Int32Value.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'int32',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            case 'google.protobuf.Int64Value': {
                                const unpacked = value.unpack(
                                    Int64Value.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'int64',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            case 'google.protobuf.Empty': {
                                return {
                                    type: 'empty',
                                    value: undefined,
                                };
                            }
                            case 'google.protobuf.StringValue': {
                                const unpacked = value.unpack(
                                    StringValue.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'string',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            case 'google.protobuf.Timestamp': {
                                const unpacked = value.unpack(
                                    Timestamp.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'timestamp',
                                        value: unpacked.toDate(),
                                    };
                                }
                            }
                            case 'google.protobuf.UInt32Value': {
                                const unpacked = value.unpack(
                                    UInt32Value.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'uint32',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            case 'google.protobuf.UInt64Value': {
                                const unpacked = value.unpack(
                                    UInt64Value.deserializeBinary,
                                    value.getTypeName()
                                );
                                if (unpacked === null) {
                                    return null;
                                } else {
                                    return {
                                        type: 'uint64',
                                        value: unpacked.getValue(),
                                    };
                                }
                            }
                            default:
                                return null;
                        }
                        /* eslint-enable @typescript-eslint/unbound-method */
                    });
                    const validValues = values.filter(notNull);
                    if (values.length !== validValues.length) {
                        logError(errorStage, `failed to unpack ${values.length-validValues.length} values`);
                    } else {
                        listeners.emit('row', validValues);
                    }
                } else {
                    logError(errorStage, `row message data missing`);
                }
                return;
            }
            case QueryResultStream.DataCase.DATA_NOT_SET: {
                logError(errorStage, `message result data not set`);
                return;
            }
        }
    });

    stream.on('end', () => {
        listeners.emit('end', undefined);
    })

    /* Write to the stream.
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    let streamIsInitialized = false;
    const ensureStreamIsInitialized = () => new Promise<void>((res, rej) => {
        if (streamIsInitialized) {
            res();
            return;
        }

        const request = genInitializeRequest(options);
        stream.write(request, (err: unknown) => {
            if (err) {
                logError('send initialization data', err);
                rej(err);
            } else {
                streamIsInitialized = true;
                res();
            }
        })
    });

    // writeToStream writes the passed message to the stream after ensuring stream initialization.
    // The passed callback is called after the initialization fails or the request finishes.
    const writeToStream = (
        request: GetTableRequest,
        callback?: (err: unknown) => void
    ) => {
        const errorStage = `write ${typeof request} to stream`;

        ensureStreamIsInitialized().then(() => {
            stream.write(request, (err: unknown) => {
                if (callback) {
                    callback(err);
                }
                if (err) {
                    logError(errorStage, err);
                }
            });
        }).catch(err => {
            if (callback) {
                callback(err);
            }
            logError(errorStage, err);
        });
    };

    /* Construct the returned `TableQuery` object.
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    return {
        close: () => {
            stream.end();
        },
        errors,
        on: (type, listener) => {
            const addedMessage = listeners.add(type, listener);
            return addedMessage;
        },
        requestRows: (rowCount, options = {}) => {
            const { callback, requestMetadata } = options;
            const request = genQueryRequest({
                metadata: requestMetadata === true,
                rows: rowCount,
            });
            writeToStream(request, callback);
        },
    };
};
