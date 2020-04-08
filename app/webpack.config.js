const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        editor: './jsbuild/fyp-app/fyp-app.js',
        splash: './jsbuild/splash/splash.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
        publicPath: '/'
    },
    plugins: [
        new CopyPlugin([
            { from: '*.html', to: path.resolve(__dirname, 'dist/')},
            { from: 'node_modules/codemirror/**/*.css', to: path.resolve(__dirname, 'dist')},
            { from: "manifest.json", to: path.resolve(__dirname, 'dist/manifest.json') },
            { from: "favicon.ico", to: path.resolve(__dirname, 'dist/favicon.ico') },
            {
                from: "node_modules/@webcomponents/webcomponentsjs/",
                to: path.resolve(__dirname, "dist/node_modules/@webcomponents/webcomponentsjs/")
            },
            { from: "assets/", to: path.resolve(__dirname, "dist/assets") }
        ]),
    ]
};