import { contextBridge } from 'electron';

import { postgresTarget } from './postgres';

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: postgresTarget,
    }
});
