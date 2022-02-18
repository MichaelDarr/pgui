import { FC } from 'react';

import { Grid, GridItem } from 'renderer/components/Grid';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

import { SchemaSelector } from './SchemaSelector';
import { TableList } from './TableList';

const area = {
    tables: 'tables',
    divider: 'divider',
    schema: 'schema',
};

const gridTemplate = `
" ${area.tables}   ${area.tables}   ${area.tables}  " 1fr
" ${area.divider}  ${area.divider}  ${area.divider} " 2px
" .                .                .               " 0.5rem
" .                ${area.schema}   .               " auto
" .                .                .               " 0.5rem
/ 0.5rem           1fr              0.5rem          `;

export const DatabaseSidebar: FC<SectionProps> = props => {
    return (
        <Grid {...props} template={gridTemplate}>
        <GridItem area={area.tables}>
            <TableList />
        </GridItem>
            <GridItem
                area={area.divider}
                style={{ backgroundColor: palette.lightGray }}
            />
            <GridItem area={area.schema}>
                <SchemaSelector />
            </GridItem>
        </Grid>
    );
};
