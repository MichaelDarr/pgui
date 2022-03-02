interface Field {
    name: string;
    tableOID: number;
}

type Inbound = {
    'metadata': {
        fields: Field[];
        rowsRead: number;
    }
    'row': {
        values: unknown[];
    }
}

export type OnMessage = <T extends keyof Inbound>(
    type: T,
    callback: (message: Inbound[T]) => void,
) => void;

export interface TableQueryError {
    stage: 'initialization';
    message?: string;
}

export type TableQueryCreator = (options: {
    connectionID: string;
    schema: string;
    table: string;
}) => {
    error: TableQueryError|null;
    onMessage: OnMessage;
};
