import { PostgresService } from '../preload/types';

export interface ElectronAPI {
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
