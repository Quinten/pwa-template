'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./package');

module.exports = (env, argv) => {

    const devMode = argv.mode !== 'production';

    let webpackConfig = {

        entry: './src/index.js',

        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: './',
            filename: 'index.js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/, // not really sur about this
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                ...config,
                template: 'src/index.html'
            }),
            new FaviconsWebpackPlugin({
                logo: './src/icon.svg',
                mode: 'webapp',
                devMode: 'webapp',
                prefix: '',
                favicons: {
                    path: '',
                    background: '#ffffff',
                    theme_color: '#ffffff',
                    appName: config.shortName,
                    appShortName: config.shortName,
                    appDescription: config.description,
                    developerName: config.author,
                    developerURL: config.homepage,
                    orientation: 'any',
                    scope: './',
                    start_url: './',
                    version: config.version,
                    icons: {
                        android: true,
                        coast: false,
                        yandex: false,
                        firefox: false,
                        windows: true,
                        appleIcon: true,
                        appleStartup: false,
                        favicons: true
                    }
                }
            })
        ],

        devServer: {
            contentBase: "./public",
            host: "0.0.0.0",
            port: 3000
        }
    }

    if (!devMode) {

        webpackConfig.optimization = {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ]
        }
    }

    return webpackConfig;
};
