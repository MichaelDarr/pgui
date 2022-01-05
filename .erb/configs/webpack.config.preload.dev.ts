/**
 * Build config for electron preloader
 */

import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

export default merge(baseConfig, {
    devtool: 'inline-source-map',

    mode: 'development',

    watch: true,

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

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
    ],
});
