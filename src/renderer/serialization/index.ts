import { Table } from 'leyden';

import { SerializeCell } from './cell';
import { SerializeText } from './text';

export interface Serialize {
    Cell: SerializeCell;
    Text: SerializeText;

    emptyTable: (columns: number) => Table;
}

export const Serialize: Serialize = {
    Cell: SerializeCell,
    Text: SerializeText,

    /**
     * Create an empty table with a single row of placeholder cells.
     */

    emptyTable(columns) {
            return Table.new(
                columns,
                Array.from({ length: columns }, Serialize.Cell.Placeholder),
            );
    },
};
