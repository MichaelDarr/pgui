import {
    GetTableRequest,
    GetTableResponse,
    QueryRequestStream,
} from 'protos/postgres/postgres_pb';

import { newListeners } from './listeners';
import { TableQuery, TableQueryError, TableQueryCreator } from './types';
import { getPostgresClient } from '../postgres';

export const newTableQuery: TableQueryCreator = ({
    connectionID,
    schema,
    table,
}) => {

    /* Function-scoped variables
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    const client = getPostgresClient();
    const stream = client.getTable();

    /* Errors
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    const errors: TableQueryError[] = [];

    const logError = (stage: string, error: Error|string|unknown) => {
        if (error instanceof Error) {
            errors.push({ stage, error });
        } else {
            errors.push({ stage, error: new Error(String(error)) })
        }
    };

    /* Stream events
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

        if (result.hasRow()) {
            const row = result.getRow();
            if (row) {
                listeners.emit('row', row.toObject());
                return;
            }
        } else if (result.hasMetadata()) {
            const metadata = result.getMetadata();
            if (metadata) {
                listeners.emit('metadata', metadata.toObject());
                return;
            }
        }

        logError(errorStage, `message result has no data`);
    });

    /* Stream reading & writing
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    let streamIsInitialized = false;

    const ensureStreamIsInitialized = (): Promise<void> => {
        const errorStage = 'send initialization data';

        if (streamIsInitialized) {
            return Promise.resolve();
        }

        const initialize = new GetTableRequest.InitializeQuery();
        initialize.setConnectionid(connectionID);
        initialize.setSchema(schema);
        initialize.setTable(table);

        const request = new GetTableRequest();
        request.setInitialize(initialize);

        return new Promise<void>((res, rej) => {
            stream.write(request, (err: unknown) => {
                if (err) {
                    logError(errorStage, err);
                    rej(err);
                } else {
                    streamIsInitialized = true;
                    res();
                }
            })
        });
    };

    const requestRows: TableQuery['requestRows'] = (rowCount, options = {}) => {
        const errorStage = 'request rows';

        const { callback, requestMetadata } = options;

        const queryRequest = new QueryRequestStream();
        queryRequest.setMetadata(requestMetadata === true);
        queryRequest.setRows(rowCount);

        const request = new GetTableRequest();
        request.setQuery(queryRequest);

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
            logError(errorStage, err);
        });
    };

    return {
        errors,
        onMessage: listeners.add,
        requestRows,
    };
};
