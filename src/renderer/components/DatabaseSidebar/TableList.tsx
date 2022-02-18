import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { Paragraph } from 'renderer/components/Text';
import { tablesState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';

export const TableList: FC<SectionProps> = props => {
    const tables = useRecoilValue(tablesState);

    if (tables.size === 0) {
        return (
            <Paragraph {...props}>
                No tables in schema
            </Paragraph>
        );
    }

    return (
        <section {...props}>
            {[...tables.keys()].map(tableName => (
                <Paragraph key={tableName} style={{ display: 'block' }}>
                    {tableName}
                </Paragraph>
            ))}
        </section>
    );
};
