import { contextBridge } from 'electron';

import { postgresTarget } from './postgres';
import { store } from './redux';

contextBridge.exposeInMainWorld('electron', {
    proto: {
        postgres: postgresTarget,
    },
    store,
});
