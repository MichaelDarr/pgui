import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { postgres } from 'renderer/client';
import { connectionIDState } from 'renderer/state/postgres/connection';
import { schemaState } from 'renderer/state/postgres/schema';
import { tableState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';

export const TableData: FC<SectionProps> = props => {
    const connectionID = useRecoilValue(connectionIDState);
    const schema = useRecoilValue(schemaState);
    const table = useRecoilValue(tableState);

    if (connectionID === null || schema === null || table === null) {
        return null;
    }

    const getData = () => {
        const query = postgres.newTableQuery({
            connectionid: connectionID,
            schema,
            table: table.name,
        });
        query.onMessage('metadata', metadata => {
            console.log({ src: 'tabledata', metadata });
        });
        query.onMessage('row', row => {
            console.log({ src: 'tabledata', row });
        });

        query.requestRows(5, {
            callback: err => {
                console.log({ src: 'tabledata', err });
            },
            requestMetadata: false,
        })
    }

    return (
        <section {...props}>
            Data for {table.name}
            <button onClick={getData}>GET DATA</button>
        </section>
    );
};
