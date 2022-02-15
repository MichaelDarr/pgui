/**
 * Build config for electron preloader
 */

import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';

checkNodeEnv('production');
deleteSourceMaps();

const devtoolsConfig = process.env.DEBUG_PROD === 'true'
    ? { devtool: 'source-map' }
    : {};

export default merge(baseConfig, {
    ...devtoolsConfig,

    mode: 'production',

    target: 'electron-renderer',

    entry: [
        path.join(webpackPaths.srcPreloadPath, 'index.ts'),
    ],

    output: {
        path: webpackPaths.assetsPath,
        filename: 'preload.js',
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },

    resolve: {
        modules: [
            webpackPaths.srcMainPath,
        ],
        extensions: ['.tsx', '.ts'],
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
        }),
    ],
});
