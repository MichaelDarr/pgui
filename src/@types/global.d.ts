export {}

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                once: (channel: string, callback: (data: unknown) => void) => void;
            }
        }
    }
}
