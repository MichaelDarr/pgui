import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { tablesState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

import { TableItem } from './TableItem';
import { TableNoItems } from './TableNoItems';

export const TableList: FC<SectionProps> = ({
    style,
    ...props
}) => {
    const tables = useRecoilValue(tablesState);

    if (tables.size === 0) {
        return (
            <TableNoItems {...props}/>
        );
    }

    const sortedTables = [...tables.values()].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return (
        <section
            {...props}
            style={{
                ...style,
                alignItems: 'stretch',
                backgroundColor: palette.white,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {sortedTables.map(table => (
                <TableItem
                    key={table.name}
                    table={table}
                />
            ))}
        </section>
    );
};
