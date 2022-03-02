import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import type { TableQuery } from 'preload/tableQuery/types';
import { postgres } from 'renderer/client';
import { connectionIDState } from 'renderer/state/postgres/connection';
import { schemaState } from 'renderer/state/postgres/schema';
import { tableState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';

export const TableData: FC<SectionProps> = props => {
    const [query, setQuery] = useState<TableQuery|null>(null);

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
                console.log({ src: 'tabledata', metadata });
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

        return () => {
            listeners.forEach(listener => listener.remove());
            if (newQuery !== null) {
                newQuery.close();
                newQuery = null;
                setQuery(null);
            }
        }
    }, [connectionID, schema, table]);

    return (
        <section {...props}>
            {table !== null && <>Data for {table.name}</>}
            {query !== null && <button onClick={() => query.requestRows(5)}>GET MORE ROWS</button>}
        </section>
    );
};
