const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyle = new ExtractTextPlugin({ filename: '[hash]build.css' });

const pathToClean = [
    'dist'
];

const cleanOptions = {
    root:     path.join(__dirname, '../'),
    verbose:  true,
    dry:      false
};

module.exports = {
    devtool: 'source-map',
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[hash]build.js'
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [['es2015'], ['react'], ['stage-1']],
                    plugins: ['transform-decorators-legacy'],
                }
            },
            {
                test: /\.scss?$/,
                loader: extractStyle.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathToClean, cleanOptions),
        extractStyle,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../tpl/index.html')
        })
    ]
};