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

console.log(modulesExcludedFromBabelCompilation.map(function(val){
                return __dirname + "/node_modules/" + val;
            }));

module.exports = {
    entry: [
        "webpack-dev-server/client?http:localhost:3000",
        "webpack/hot/only-dev-server",
        "./src/main"
    ],
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{ 
            test: /\.jsx?$/, 
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules.*(babel.*|babel-core.*|babel-loader.*|react.*|webpack.*|react.*|react-hot-loader.*|webpack-dev-server)/
        }]
    }
}


// exclude: new RegExp("node_modules.*(" + modulesExcludedFromBabelCompilation.join(".*|") + ")"),