import { PostgresService } from '../preload/types';
import { atoms } from '../preload/recoil';

export interface ElectronAPI {
    atoms: typeof atoms;
    proto: ProtoAPI;
}

export interface ProtoAPI {
    postgres: PostgresService;
}

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
