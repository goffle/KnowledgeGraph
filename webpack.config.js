const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = require('yargs').argv.env; // use --env with webpack 2

const version = require("./package.json").version;
const libraryName = 'knowledgegraph';

let plugins = [new webpack.DefinePlugin({ __VERSION__: JSON.stringify(version), })];
let outputFile;

if (env === 'build') {
    console.log("Build")
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}


const config = {
    entry: {
        main: './src/index.js'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: "/assets/",
        filename: outputFile,
        library: libraryName,
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: plugins,
};

module.exports = config;

