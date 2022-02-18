import { FC } from 'react';

import { DatabaseSidebar } from 'renderer/components/DatabaseSidebar';
import { Grid, GridItem } from 'renderer/components/Grid';
import { TableData } from 'renderer/components/TableData';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

const area = {
    databaseSidebar: 'database-sidebar',
    divider: 'divider',
    tableData: 'table-data',
}

const connectContainerTemplate = `
" ${area.databaseSidebar}  ${area.divider}  ${area.tableData} " 1fr
/ 20rem                    2px                1fr               `;

export const DataBrowser: FC<SectionProps> = (props) => {
    return (
        <Grid
            {...props}
            template={connectContainerTemplate}
            fillParent={true}
        >
            <GridItem area={area.databaseSidebar}>
                <DatabaseSidebar style={{ height: '100%' }}/>
            </GridItem>
            <GridItem
                area={area.divider}
                style={{ backgroundColor: palette.lightGray }}
            />
            <GridItem area={area.tableData}>
                <TableData />
            </GridItem>
        </Grid>
    )
};
