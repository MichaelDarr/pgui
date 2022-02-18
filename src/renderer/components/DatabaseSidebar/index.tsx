import { FC, Suspense } from 'react';

import { Grid, GridItem } from 'renderer/components/Grid';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

import { Connection } from './Connection';
import { SchemaSelector } from './SchemaSelector';
import { TableList } from './TableList';

const area = {
    bottomDivider: 'bottom-divider',
    connection: 'connection',
    schema: 'schema',
    tables: 'tables',
    topDivider: 'top-divider',
};

const gridTemplate = `
" ${area.connection}     ${area.connection}     ${area.connection}    " auto
" ${area.topDivider}     ${area.topDivider}     ${area.topDivider}    " 2px
" ${area.tables}         ${area.tables}         ${area.tables}        " 1fr
" ${area.bottomDivider}  ${area.bottomDivider}  ${area.bottomDivider} " 2px
" .                      .                      .                     " 0.5rem
" .                      ${area.schema}         .                     " auto
" .                      .                      .                     " 0.5rem
/ 0.5rem                 1fr                    0.5rem                `;

export const DatabaseSidebar: FC<SectionProps> = props => {
    return (
        <Grid {...props} template={gridTemplate}>
            <GridItem area={area.connection}>
                <Suspense fallback={<p>loading...</p>}>
                    <Connection />
                </Suspense>
            </GridItem>
            <GridItem
                area={area.topDivider}
                style={{ backgroundColor: palette.lightGray }}
            />
            <GridItem
                area={area.tables}
                style={{
                    overflowY: 'scroll',
                }}
            >
                <Suspense fallback={<p>loading...</p>}>
                    <TableList />
                </Suspense>
            </GridItem>
            <GridItem
                area={area.bottomDivider}
                style={{ backgroundColor: palette.lightGray }}
            />
            <GridItem area={area.schema}>
                <Suspense fallback={<p>loading...</p>}>
                    <SchemaSelector />
                </Suspense>
            </GridItem>
        </Grid>
    );
};
