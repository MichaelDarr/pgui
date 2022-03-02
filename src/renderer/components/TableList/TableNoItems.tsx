import { useRecoilValue } from 'recoil';
import { FC } from 'react';

import { Grid, GridItem } from 'renderer/components/Grid';
import { Paragraph } from 'renderer/components/Text';
import { schemaState } from 'renderer/state/postgres/schema';
import { SectionProps } from 'renderer/types';

const area = {
    noItems: 'no-items',
};

const gridTemplate = `
" .        .                .       " 0.5rem
" .        ${area.noItems}  .       " 0.9rem
" .        .                .       " 0.5rem
/ 0.75rem  1fr              0.25rem `;

export const TableNoItems: FC<SectionProps> = props => {
    const schema = useRecoilValue(schemaState);

    const message = schema === null
        ? 'No schema selected'
        : `No tables in ${schema}`;

    return (
        <Grid {...props} template={gridTemplate}>
            <GridItem area={area.noItems}>
                <Paragraph>
                    {message}
                </Paragraph>
            </GridItem>
        </Grid>
    );
};
