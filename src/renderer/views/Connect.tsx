import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { ConnectionSidebar } from '../components/ConnectionSidebar';
import { CredentialsForm } from '../components/CredentialsForm';
import { Grid, GridItem } from '../components/Grid';
import { activeConnectionState } from '../state/postgres/connection'
import { SectionProps } from '../types';

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
                style={{ backgroundColor: '#E8E8E8' }}
            >
                <ConnectionSidebar/>
            </GridItem>
            <GridItem
                area={area.credentialsForm}
                alignSelf='center'
                justifySelf='center'
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <CredentialsForm style={{ maxWidth: '30rem' }} />
            </GridItem>
        </Grid>
    )
}
