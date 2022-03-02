import {
    GetTableRequest,
    GetTableResponse,
} from 'protos/postgres/postgres_pb';

import { newListeners } from './listeners';
import { TableQueryError, TableQueryCreator } from './types';
import { getPostgresClient } from '../postgres';

export const newTableQuery: TableQueryCreator = ({
    connectionID,
    schema,
    table,
}) => {

    /* Errors
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    const errors: TableQueryError[] = [];

    const logError = (stage: string, error: Error|string|unknown) => {
        if (error instanceof Error) {
            errors.push({ stage, error });
        } else {
            errors.push({ stage, error: new Error(String(error)) })
        }
    }

    /* Stream reading & writing
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    const client = getPostgresClient();
    const stream = client.getTable();

    const sendInitializationQuery = () => {
        const errorStage = 'send initialization data';
        const initialize = new GetTableRequest.InitializeQuery();
        initialize.setConnectionid(connectionID);
        initialize.setSchema(schema);
        initialize.setTable(table);

        const request = new GetTableRequest();
        request.setInitialize(initialize);

        stream.write(request, (err: unknown) => {
            logError(errorStage, err);
        })
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

    /* Stream initialization
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    sendInitializationQuery();

    return {
        errors,
        onMessage: listeners.add,
    };
};
