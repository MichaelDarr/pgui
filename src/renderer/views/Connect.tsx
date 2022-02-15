import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { ConnectionSidebar } from 'renderer/components/ConnectionSidebar';
import { CredentialsForm } from 'renderer/components/CredentialsForm';
import { Grid, GridItem } from 'renderer/components/Grid';
import { activeConnectionState } from 'renderer/state/postgres/connection'
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

const area = {
    connectionsSidebar: 'connections-sidebar',
    credentialsForm: 'credentials-form',
    divider: 'divider',
}

const connectContainerTemplate = `
" ${area.connectionsSidebar}  ${area.divider}  .    .                        . " 3rem
" ${area.connectionsSidebar}  ${area.divider}  .    ${area.credentialsForm}  . " auto
" ${area.connectionsSidebar}  ${area.divider}  .    .                        . " 1fr
/ 20rem                       2px              1fr  auto                     1fr  `;

export const Connect: FC<SectionProps> = (props) => {
    const activeConnection = useRecoilValue(activeConnectionState);

    if (activeConnection !== null) {
        return <h1>Connection saved and activated: {activeConnection.name}</h1>
    }

    return (
        <Grid
            {...props}
            template={connectContainerTemplate}
            fillParent={true}
        >
            <GridItem area={area.connectionsSidebar}>
                <ConnectionSidebar/>
            </GridItem>
            <GridItem
                area={area.divider}
                style={{ backgroundColor: palette.lightGray }}
            ></GridItem>
            <GridItem
                area={area.credentialsForm}
                justifySelf='center'
            >
                <CredentialsForm style={{ maxWidth: '30rem' }} />
            </GridItem>
        </Grid>
    )
}
