
const path = require('path')
const webpack = require('webpack')


const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    // devServer: {
    //     static: {
    //       directory: path.join(__dirname, 'dist'),
    //     },
    //     compress: true,
    //     hot: false,
    //     port: 9000,
    // },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.js$/
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                  // Disables attributes processing
                  sources: false,
                },
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        // new UglifyJsPlugin({
        //     test: /\.js($|\?)/i
        // }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    target: 'web'
}