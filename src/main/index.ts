import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ChildProcess, execFile } from 'child_process';
import { createWriteStream } from 'fs';
import path from 'path';
import { app, BrowserWindow, ipcMain, session } from 'electron';
import debug from 'electron-debug';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import sourceMapSupport from 'source-map-support';

import { MenuBuilder } from './menu';
import { findOpenSocket } from './socket';
import { resolveHtmlPath } from './util';

/* eslint-disable no-console */
const Console = {
    error: console.error,
    log: console.log,
    warn: console.warn,
};
/* eslint-enable no-console */

let mainWindow: BrowserWindow|null = null;
let serverProcess: ChildProcess|null = null;
let serverSocket: string|null = null;

const findInitialServerSocket = new Promise<string>((res, rej) => {
    findOpenSocket().then(foundSocket => {
        serverSocket = foundSocket;
        res(foundSocket);
    }).catch(rej);
})

if (process.env.NODE_ENV === 'production') {
    sourceMapSupport.install();
}

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
    debug();
}

// Returns a promise resolving to an array of the names of installed extensions
const installDevExtensions = (): Promise<string[]> => {
    const devExtensions: {
        reference: Parameters<typeof installExtension>[0];
        options?: Parameters<typeof installExtension>[1];
    }[] = [{
        reference: REACT_DEVELOPER_TOOLS,
        options: {
            loadExtensionOptions: {
                allowFileAccess: true,
            },
        },
    }];

    return Promise.all(devExtensions.map(({ reference, options }) => new Promise<string>((res, rej) => {
        installExtension(reference, options).then(name => {
            res(name);
        }).catch(rej);
    })));
};

const getAssetsDirPath = (): string => {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'assets');
    }
    return path.join(__dirname, '../../assets');
}

const getAssetPath = (filename: string): string => {
    const assetsDirPath = getAssetsDirPath();
    return path.join(assetsDirPath, filename);
}

const getBinaryPath = (filename: string): string => {
    const assetsDirPath = getAssetsDirPath();
    return path.join(assetsDirPath, 'bin', filename);
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: getAssetPath('preload.js'),
        },
    });

    void mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();
};

const createBackendProcess = () => {
    if (serverSocket === null) {
        throw Error('server socket must be set before creating backend process')
    }
    const backendBinary = getBinaryPath('backend');
    serverProcess = execFile(backendBinary, [serverSocket]);
    if (serverProcess === null) {
        throw new Error('Failed to start server process');
    }
    if (isDevelopment) {
        const logStream = createWriteStream('backend.log', { flags: 'a' });
        serverProcess.stderr?.pipe(logStream);
        serverProcess.stdout?.pipe(logStream);
    }
}

ipcMain.on('get-server-socket', event => {
    if (serverSocket === null) {
        event.returnValue = new Error('server socket value not set');
    } else {
        event.returnValue = serverSocket;
    }
});

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(async () => {
    // Set a strict content security policy
    // https://www.electronjs.org/docs/latest/tutorial/security#7-define-a-content-security-policy
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': [`default-src 'self'`]
            }
        });
    });

    if (isDevelopment) {
        installDevExtensions().then(extensions => {
            if (extensions.length > 0) {
                Console.log(`installed extensions: ${extensions.join(', ')}`);
            } else {
                Console.log('no extensions installed');
            }
        }).catch(err => Console.warn(`failed to install extensions: ${String(err)}`));
    }

    // do not create window or backend until an open server socket is found
    await findInitialServerSocket;

    void createWindow();
    createBackendProcess();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            void createWindow();
        }
    });
}).catch(Console.warn);

app.on('before-quit', () => {
    if (serverProcess) {
        serverProcess.kill('SIGINT');
        serverProcess = null;
    }
});
