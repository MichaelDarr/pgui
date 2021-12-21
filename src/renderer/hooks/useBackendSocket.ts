import { createContext, useContext } from 'react';

export interface BackendSocketContext {
    socket: string|null;
}

export const BackendSocketContext = createContext<BackendSocketContext>({
    socket: null,
});

export const useBackendSocket = (): BackendSocketContext => {
    return useContext(BackendSocketContext);
};
