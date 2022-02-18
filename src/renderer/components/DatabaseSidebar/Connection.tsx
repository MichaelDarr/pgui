import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { ConnectionItem } from 'renderer/components/ConnectionSidebar/ConnectionItem';
import { Grid, GridItem } from 'renderer/components/Grid';
import { connectionState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';

const area = {
    connection: 'connection',
};

const gridTemplate = `
" ${area.connection} " auto
/ 1fr                `;

export const Connection: FC<SectionProps> = props => {
    const connection = useRecoilValue(connectionState);

    if (connection === null) {
        return null;
    }

    return (
        <Grid
            {...props}
            template={gridTemplate}
        >
            <GridItem area={area.connection}>
                <ConnectionItem connection={connection} disabled />
            </GridItem>
        </Grid>
    );
};
