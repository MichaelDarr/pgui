import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { Paragraph } from 'renderer/components/Text';
import { selectedSchemaState } from 'renderer/state/postgres/schema';
import { SectionProps } from 'renderer/types';

export const TableList: FC<SectionProps> = props => {
    const selectedSchema = useRecoilValue(selectedSchemaState);

    if (selectedSchema === null) {
        return (
            <Paragraph {...props}>
                No schema selected
            </Paragraph>
        );
    }

    return (
        <section {...props}>
            Tables in {selectedSchema}
        </section>
    );
};
