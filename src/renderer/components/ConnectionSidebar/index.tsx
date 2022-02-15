import { FC, Suspense } from 'react';

import { ConnectionList } from 'renderer/components/ConnectionSidebar/ConnectionList';
import { Grid, GridItem } from 'renderer/components/Grid';
import { Heading } from 'renderer/components/Text/Heading';
import { SectionProps } from '../../types';

const area = {
    header: 'header',
    list: 'list',
};

const gridTemplate = `
" .     .               .    " 1rem
" .     ${area.header}  .    " auto
" .     .               .    " 1rem
" .     ${area.list}    .    " 1fr
" .     .               .    " 1rem
/ 1rem  1fr             1rem `;

export const ConnectionSidebar: FC<SectionProps> = (props) => {
    return (
        <Grid {...props} template={gridTemplate}>
            <GridItem area={area.header}>
                <Heading size='small'>Connections</Heading>
            </GridItem>
            <GridItem area={area.list}>
                <Suspense fallback={<p>loading...</p>}>
                    <ConnectionList />
                </Suspense>
            </GridItem>
        </Grid>
    );
};
