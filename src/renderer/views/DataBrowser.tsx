import { FC, Suspense } from 'react';

import { Connection } from 'renderer/components/Connection';
import { Grid, GridItem } from 'renderer/components/Grid';
import { PostgresIcon } from 'renderer/components/Icons/PostgresIcon';
import { SchemaSelector } from 'renderer/components/SchemaSelector';
import { TableData } from 'renderer/components/TableData';
import { TableList } from 'renderer/components/TableList';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

const area = {
    connection: 'connection',
    data: 'data',
    schema: 'schema',
    tables: 'tables',
    topbar: 'topbar',
};

const gridTemplate = `
" ${area.connection}  .    ${area.topbar} " auto
" .                   .    .              " 2px
" ${area.tables}      .    ${area.data}   " 1fr
" .                   .    ${area.data}   " 2px
" ${area.schema}      .    ${area.data}   " auto
/ 20rem               2px  1fr            `;

export const DataBrowser: FC<SectionProps> = ({
    style,
    ...props
}) => {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <Grid
                {...props}
                style={{
                    backgroundColor: palette.gray,
                    ...style,
                }}
                template={gridTemplate}
                fillParent={true}
            >
                <GridItem
                    area={area.topbar}
                    style={{
                        alignItems: 'center',
                        backgroundColor: palette.white,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingRight: '0.5rem',
                    }}
                >
                    <PostgresIcon
                        height='2rem'
                        width='2rem'
                    />
                </GridItem>
                <GridItem area={area.connection}>
                    <Connection />
                </GridItem>
                <GridItem
                    area={area.tables}
                    style={{
                        overflowY: 'scroll',
                    }}
                >
                    <TableList />
                </GridItem>
                <GridItem area={area.schema}>
                    <SchemaSelector />
                </GridItem>
                <GridItem
                    area={area.data}
                    style={{
                        overflow: 'auto',
                    }}
                >
                    <TableData />
                </GridItem>
            </Grid>
        </Suspense>
    )
};
