import { CSSProperties, FC } from 'react';

import { ConnectionList } from '../components/ConnectionList';
import { CredentialsForm } from '../components/CredentialsForm';

const connectContainerGrid = `
" connections  credentials-form " 1fr
/ 20rem        1fr              `;

const connectContainerStyle: CSSProperties = {
    gridTemplate: connectContainerGrid,
    display: 'grid',
    height: '100%',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'stretch',
};

const connectionsStyle: CSSProperties = {
    gridArea: 'connections',
};

const credentialsFormStyle: CSSProperties = {
    gridArea: 'credentials-form',
};

export const Connect: FC = () => {
    return (
        <div style={connectContainerStyle}>
            <ConnectionList style={connectionsStyle}/>
            <CredentialsForm style={credentialsFormStyle} />
        </div>
    )
}
