import { FC, useState } from 'react';

import { Socketeer } from './components/Socketeer';
import { BackendSocketContext } from './hooks/useBackendSocket';

export const App: FC = () => {
    const [socket, setSocket] = useState<string|null>(null);

    window.electron.ipcRenderer.once('set-socket', arg => {
        if (typeof arg === 'string') {
            setSocket(arg);
        } else {
            console.warn(`bad socket set arg: ${String(arg)}`);
        }
    });

    return (
        <BackendSocketContext.Provider value={{ socket }}>
            <Socketeer />
        </BackendSocketContext.Provider>
    );
};
