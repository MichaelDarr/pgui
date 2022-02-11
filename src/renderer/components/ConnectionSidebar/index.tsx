import { FC, Suspense } from 'react';

import { ConnectionList } from './ConnectionList';
import { Grid, GridItem } from '../Grid';
import { Heading } from '../Text/Heading';
import { SectionProps } from '../../types';

const area = {
    header: 'header',
    list: 'list',
}

const gridTemplate = `
" .     .                .    " 1rem
" .     ${area.header}   .    " auto
" .     .                .    " 1rem
" .     ${area.list}     .    " 1fr
" .     .                .    " 1rem
/ 1rem  1fr      1rem `;

export const ConnectionSidebar: FC<SectionProps> = (props) => {
    return (
        <Grid {...props} template={gridTemplate}>
            <GridItem area={area.header}>
                <Heading size='medium'>Connections</Heading>
            </GridItem>
            <GridItem area={area.header}>
                <Suspense fallback={<p>loading...</p>}>
                    <ConnectionList />
                </Suspense>
            </GridItem>
        </Grid>
    );
};
