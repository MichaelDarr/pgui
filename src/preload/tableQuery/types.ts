import {
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

interface TableQueryOptions {
    connectionID: string;
    schema: string;
    table: string;
}

interface TableQuery {
    errors: TableQueryError[];
    onMessage: <T extends MessageType>(
        type: T,
        callback: (message: MessageMap[T]) => void,
    ) => AddedListener;
}

export type TableQueryCreator = (options: TableQueryOptions) => TableQuery;
