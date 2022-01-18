import { CSSProperties, FC } from 'react';

import { Connect } from './views/Connect';

const appContainerStyle: CSSProperties = {
    height: '100vh',
    width: '100vw',
    margin: '0',
    padding: '0',
}

export const App: FC = () => {
    return (
        <div style={appContainerStyle}>
            <Connect />
        </div>
    );
};
