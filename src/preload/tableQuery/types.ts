import type {
    GetTableRequest,
    QueryResultStream,
} from 'protos/postgres/postgres_pb';

/* Stream messages
 ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

type MessageMap = {
    'metadata': QueryResultStream.MetadataResult.AsObject,
    'row': QueryResultStream.RowResult.AsObject,
    'end': void,
}

export type MessageType = keyof MessageMap;
export type Message<T extends MessageType> = MessageMap[T];

/* Listeners
 ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

export interface AddedListener {
    remove: () => void;
}

export type Listener<T extends MessageType> = Message<T> extends infer U
    ? U extends void
        ? () => void
        : (message: U) => void
    : never;

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
    error: Error;
    stage: string;
}

export interface TableQuery {
    close: () => void;
    errors: TableQueryError[];
    on: <T extends MessageType>(
        type: T,
        callback: Listener<T>,
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
