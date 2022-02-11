import { contextBridge } from 'electron';

import { postgresTarget } from './postgres';
import { atoms } from './recoil';

console.log(atoms);
contextBridge.exposeInMainWorld('electron', {
    atoms,
    proto: {
        postgres: postgresTarget,
    }
});
