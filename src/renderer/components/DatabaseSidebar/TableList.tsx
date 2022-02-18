import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { Paragraph } from 'renderer/components/Text';
import { tablesState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';

import { TableItem } from './TableItem';

export const TableList: FC<SectionProps> = ({
    style,
    ...props
}) => {
    const tables = useRecoilValue(tablesState);

    if (tables.size === 0) {
        return (
            <Paragraph {...props}>
                No tables in schema
            </Paragraph>
        );
    }

    return (
        <section
            {...props}
            style={{
                ...style,
                alignItems: 'stretch',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {[...tables.values()].map(table => (
                <TableItem
                    key={table.name}
                    table={table}
                />
            ))}
        </section>
    );
};
