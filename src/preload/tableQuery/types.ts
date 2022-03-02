import {
    GetTableRequest,
    QueryResultStream,
} from 'protos/postgres/postgres_pb';

/* Stream messages
 ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

type MessageMap = {
    'metadata': QueryResultStream.MetadataResult.AsObject,
    'row': QueryResultStream.RowResult.AsObject,
}

export type MessageType = keyof MessageMap;
export type Message<T extends MessageType> = MessageMap[T];

/* Listeners
 ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

export interface AddedListener {
    remove: () => void;
}

export type Listener<T extends MessageType> = (message: Message<T>) => void;

export interface Listeners {
    add: <T extends MessageType>(
        type: T,
        listener: Listener<T>
    ) => AddedListener;
    emit: <T extends MessageType>(
        type: T,
        message: Message<T>
    ) => void;
    remove: <T extends MessageType>(
        type: T,
        listener: Listener<T>
    ) => void;
}

/* Table query
 ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

export interface TableQueryError {
    stage: string;
    error: Error;
}

interface TableQuery {
    errors: TableQueryError[];
    onMessage: <T extends MessageType>(
        type: T,
        callback: (message: MessageMap[T]) => void,
    ) => AddedListener;
    requestRows: (
        rowCount: number,
        options?: {
            callback?: (err: unknown) => void,
            requestMetadata?: boolean,
        }
    ) => void;
}

export type TableQueryCreator = (options: GetTableRequest.InitializeQuery.AsObject) => TableQuery;
