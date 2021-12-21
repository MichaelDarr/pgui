import { build, BuildOptions, BuildResult } from 'esbuild';
import { copyFile, mkdirSync } from 'fs';
import { join } from 'path';

const ROOT_DIR = join(__dirname, '../');

const ASSET_DIR = join(ROOT_DIR, 'assets');
const DIST_DIR = join(ROOT_DIR, 'dist');
const SRC_DIR = join(ROOT_DIR, 'src');

interface Target {
    package: string;
    entrypoint: string;
    outfile: string;
    assets?: string[];
}

const RENDERER: Target = {
    package: 'renderer',
    entrypoint: 'index.tsx',
    outfile: 'renderer.js',
    assets: ['index.html'],
};

const MAIN: Target = {
    package: 'main',
    outfile: 'main.js',
    entrypoint: 'main.ts',
};

const PRELOAD: Target = {
    package: 'main',
    outfile: 'preload.js',
    entrypoint: 'preload.ts',
};

/* eslint-disable no-console */
const Console = {
    error: console.error,
    log: console.log,
    warn: console.warn,
};
/* eslint-enable no-console */

const bundle = async (target: Target, watch: boolean): Promise<BuildResult> => {
    const outDir = join(DIST_DIR, target.package);
    mkdirSync(outDir, { recursive: true });

    const entrypoint = join(SRC_DIR, target.package, target.entrypoint);
    const outfile = join(DIST_DIR, target.package, target.outfile);

    if (target.assets) {
        await Promise.all(target.assets.map(asset => new Promise<void>((res, rej) => {
            const assetSrc = join(ASSET_DIR, asset);
            const assetDest = join(outDir, asset);
            copyFile(assetSrc, assetDest, err => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            });
        })));
    }

    const buildOptions: BuildOptions = {
        bundle: true,
        entryPoints: [entrypoint],
        outfile,
        sourcemap: 'inline',
        platform: 'node',
    };
    if (watch) {
        buildOptions.watch = {
            onRebuild: err => {
                if (err) {
                    Console.error('WATCH REBUILD FAILED: ', err);
                } else {
                    Console.log('WATCH REBUILD SUCCEEDED');
                }
            },
        };
    }
    return build(buildOptions);
};

void (async () => {
    await Promise.all([
        bundle(MAIN, false),
        bundle(PRELOAD, false),
        bundle(RENDERER, false),
    ]);
})();
