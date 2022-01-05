import { ipcRenderer } from 'electron';
import { ChannelCredentials, credentials } from '@grpc/grpc-js';

const getServerSocket = (): string => {
    const response: unknown = ipcRenderer.sendSync('get-server-socket');
    if (typeof response === 'string') {
        return response;
    }
    throw new Error(`bad response to server socket request: ${String(response)}`);
};

export const getServerAddress = (): string => {
    return `unix://${getServerSocket()}`;
}

export const getCredentials = (): ChannelCredentials => {
    return credentials.createInsecure();
}
