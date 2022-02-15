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
}

const connectContainerTemplate = `
" ${area.connectionsSidebar}  ${area.credentialsForm} " 1fr
/ 20rem                       1fr                     `;

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
            <GridItem
                area={area.connectionsSidebar}
                style={{ backgroundColor: palette.lightGray }}
            >
                <ConnectionSidebar/>
            </GridItem>
            <GridItem
                area={area.credentialsForm}
                alignSelf='center'
                justifySelf='center'
                style={{ backgroundColor: palette.white }}
            >
                <CredentialsForm style={{ maxWidth: '30rem' }} />
            </GridItem>
        </Grid>
    )
}
