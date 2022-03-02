import {
    GetTableRequest,
    GetTableResponse,
    QueryResultStream,
} from 'protos/postgres/postgres_pb';

import { newListeners } from './listeners';
import { genInitializeRequest, genQueryRequest } from './requestGenerators';
import { TableQueryError, TableQueryCreator } from './types';
import { getPostgresClient } from '../postgres';

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
                    listeners.emit('row', row.toObject());
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
