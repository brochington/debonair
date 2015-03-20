var webpack = require("webpack");

var modulesExcludedFromBabelCompilation = [
    "babel",
    "babel-core",
    "babel-loader",
    "react",
    "webpack",
    "react",
    "react-hot-loader",
    "webpack-dev-server"
];

module.exports = {
    entry: [
        "./src/main"
    ],
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js',
        publicPath: '/build/',
        library: "debonair",
        libraryTarget: "umd"

    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        "lodash": "lodash"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules.*(babel.*|babel-core.*|babel-loader.*|react.*|webpack.*|react.*|react-hot-loader.*|webpack-dev-server)/
        }]
    }
}
