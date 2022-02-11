import { PostgresService } from '../preload/types';

export interface ElectronAPI {
    proto: ProtoAPI;
}

export interface ProtoAPI {
    postgres: PostgresService;
}

interface DocumentFontFaceSet extends FontFaceSet {
    add: (font: FontFace) => DocumentFontFaceSet;
}

declare global {
    interface Document {
        fonts: DocumentFontFaceSet;
    }
    interface Window {
        electron: ElectronAPI;
    }
}
