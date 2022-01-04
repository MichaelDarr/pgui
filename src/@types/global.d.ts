import { PostgresServiceClientTarget } from './protobridge';

export interface ElectronAPI {
    proto: ProtoAPI;
}

export interface ProtoAPI {
    postgres: PostgresServiceClientTarget;
}

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
