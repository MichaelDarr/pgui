import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { tableState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';

export const TableData: FC<SectionProps> = props => {
    const table = useRecoilValue(tableState);

    if (table === null) {
        return null;
    }

    return (
        <section {...props}>
            Data for {table.name}
        </section>
    );
};
