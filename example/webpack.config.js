var webpack = require("webpack");

module.exports = {
    entry: {
        app: [
            "webpack-dev-server/client?http://localhost:3000",
            "webpack/hot/dev-server",
            "./src/main.jsx"
        ]
    },
    output: {
        path: __dirname + "/build/",
        publicPath: "/build/",
        filename: "bundle.js"
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
            loaders: ["react-hot", "babel-loader"],
            exclude: /node_modules.*(babel-core.*|babel-loader.*|react.*|webpack.*|react.*|react-hot-loader.*|webpack-dev-server)/
        }]
    }
}
