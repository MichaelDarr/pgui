import { FC } from 'react';

import { ConnectionSidebar } from '../components/ConnectionSidebar';
import { CredentialsForm } from '../components/CredentialsForm';
import { Grid, GridItem } from '../components/Grid';
import { SectionProps } from '../types';

const area = {
    connectionsSidebar: 'connections-sidebar',
    credentialsForm: 'credentials-form',
}

const connectContainerTemplate = `
" ${area.connectionsSidebar}  ${area.credentialsForm} " 1fr
/ 20rem                       1fr                     `;

export const Connect: FC<SectionProps> = (props) => {
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
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <CredentialsForm/>
            </GridItem>
        </Grid>
    )
}
