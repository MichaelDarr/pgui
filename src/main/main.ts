/* eslint global-require: off, no-console: off, @typescript-eslint/no-var-requires: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off, @typescript-eslint/no-unsafe-call: off */
/* eslint @typescript-eslint/no-unsafe-member-access: off, @typescript-eslint/no-unsafe-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ChildProcess, execFile } from 'child_process';
import { createWriteStream } from 'fs';
import path from 'path';
import { app, BrowserWindow } from 'electron';

import { MenuBuilder } from './menu';
import { findOpenSocket } from './socket';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow|null = null;
let serverProcess: ChildProcess|null = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
    require('electron-debug')();
}

const installExtensions = (): Promise<void> => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer.default(
        extensions.map((name) => installer[name]),
        forceDownload
    ).catch(console.log);
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

const createWindow = async (socketName: string) => {
    if (isDevelopment) {
        await installExtensions();
    }
    console.log({ path: path.join(__dirname, 'preload.js') });

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    void mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow?.webContents.send('set-socket', socketName);
    });

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

const createBackendProcess = (socketName: string) => {
    const backendBinary = getBinaryPath('backend');
    serverProcess = execFile(backendBinary, [socketName]);
    if (serverProcess === null) {
        throw new Error('Failed to start server process');
    }
    if (isDevelopment) {
        const logStream = createWriteStream('backend.log', { flags: 'a' });
        serverProcess.stderr?.pipe(logStream);
        serverProcess.stdout?.pipe(logStream);
    }
}

/**
 * Add event listeners
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(async () => {
    const serverSocket = await findOpenSocket();

    void createWindow(serverSocket);
    createBackendProcess(serverSocket);

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            void createWindow(serverSocket);
        }
    });
}).catch(console.log);

app.on('before-quit', () => {
    if (serverProcess) {
        serverProcess.kill('SIGINT');
        serverProcess = null;
    }
});
