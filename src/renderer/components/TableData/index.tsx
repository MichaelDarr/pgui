import { Cell, Table, withLeyden } from 'leyden';
import { Editable, Leyden, withReact } from 'leyden-react';
import { FC, useEffect, useMemo, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { createEditor } from 'slate';


import { Field } from 'protos/postgres/postgres_pb';
import type { TableQuery } from 'preload/tableQuery/types';
import { postgres } from 'renderer/client';
import { connectionIDState } from 'renderer/state/postgres/connection';
import { schemaState } from 'renderer/state/postgres/schema';
import { tableState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

import { headerRenderers } from './headers';

const generateTable = (columns: number): Table => {
    return Table.new(columns, Array.from(
        { length: columns },
        () => Cell.newDefault(Math.floor(Math.random()*100))
    ));
};

const fieldsAreEqual = (a: Field.AsObject, b: Field.AsObject) => {
    return a.name === b.name && a.tableoid === b.tableoid
};

const fieldListsAreEqual = (a: Field.AsObject[], b: Field.AsObject[]) => {
    return (a.length === b.length
        && a.every((field, i) => fieldsAreEqual(field, b[i]))
    );
}

export const tableFieldsState = atom<null|Field.AsObject[]>({
    key: 'TableFields',
    default: null,
});

export const TableData: FC<SectionProps> = ({
    style,
    ...props
}) => {
    const [, setQuery] = useState<TableQuery|null>(null);

    const editor = useMemo(() => (
        withLeyden({
            editor: withReact(
                createEditor()
            ),
        })
    ), []);

    const [tableFields, setTableFields] = useRecoilState(tableFieldsState);
    const [value, setValue] = useState<null|[Table]>(null);
    const connectionID = useRecoilValue(connectionIDState);
    const schema = useRecoilValue(schemaState);
    const table = useRecoilValue(tableState);

    useEffect(() => {
        if (connectionID === null || schema === null || table === null) {
            return;
        }

        let newQuery: TableQuery|null = postgres.newTableQuery({
            connectionid: connectionID,
            schema,
            table: table.name,
        });
        setQuery(newQuery);

        const listeners = [
            newQuery.on('metadata', metadata => {
                if (tableFields === null || !fieldListsAreEqual(tableFields, metadata.fieldsList)) {
                    setTableFields(metadata.fieldsList);
                    setValue([generateTable(metadata.fieldsList.length)]);
                }
            }),
            newQuery.on('row', row => {
                console.log({ src: 'tabledata', row });
            }),
            newQuery.on('end', () => {
                if (newQuery !== null) {
                    newQuery = null;
                    setQuery(null);
                }
            }),
        ];

        // request some initial rows
        newQuery.requestRows(5);

        return () => {
            setValue(null);
            listeners.forEach(listener => listener.remove());
            if (newQuery !== null) {
                newQuery.close();
                newQuery = null;
                setQuery(null);
            }
        }
    }, [connectionID, schema, table]);

    if (value === null) {
        return null;
    }

    return (
        <section
            style={{
                backgroundColor: palette.gray,
                ...style,
            }}
            {...props}
        >
            <Leyden
                editor={editor}
                value={value}
                onChange={setValue}
            >
                <Editable
                    headerRenderers={headerRenderers}
                    tableOptions={{
                        cellGap: 1,
                        stickyColumnHeaders: true,
                    }}
                />
            </Leyden>
        </section>
    );
};
