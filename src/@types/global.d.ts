import { PostgresService } from '../preload/types';
import { store } from '../preload/redux';

export interface ElectronAPI {
    proto: ProtoAPI;
    store: typeof store;
}

export interface ProtoAPI {
    postgres: PostgresService;
}

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
