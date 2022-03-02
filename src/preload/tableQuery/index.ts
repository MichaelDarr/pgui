import {
    GetTableRequest,
} from 'protos/postgres/postgres_pb';

import {
    OnMessage,
    TableQueryError,
    TableQueryCreator,
} from './types';
import { getPostgresClient } from '../postgres';

export const newTableQuery: TableQueryCreator = ({
    connectionID,
    schema,
    table,
}) => {
    /* Function-scoped variables
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    let error: TableQueryError|null = null;
    const client = getPostgresClient();
    const stream = client.getTable();

    /* Stream reading & writing
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    const sendInitializationQuery = () => {
        const initialize = new GetTableRequest.InitializeQuery();
        initialize.setConnectionid(connectionID);
        initialize.setSchema(schema);
        initialize.setTable(table);

        const request = new GetTableRequest();
        request.setInitialize(initialize);

        stream.write(request, (err: unknown) => {
            error = {
                stage: 'initialization',
                message: String(err),
            }
        })
    };

    /* Stream event management
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    stream.on('data', message => {
        console.log({ message: JSON.stringify(message) });
    });

    /* Exposed functions
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    const onMessage: OnMessage = (type, callback) => {
        console.log({ type, callback });
    };

    /* Stream initialization
     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    sendInitializationQuery();

    return { error, onMessage };
};
