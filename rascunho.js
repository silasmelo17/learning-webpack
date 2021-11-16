
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');



const getFilesInFolder = (root, format = ".js") => fs.readdirSync(root)
    .reduce((acc, file) => {
        const enter = path.resolve(root, file);

        if (file.includes(format))
            return [...acc, enter];

        try {
            return [...acc, ...getFilesInFolder(enter, format)];
        } catch (err) {
            return acc;
        }
    }, [])
    .map( file => file
        .replace(__dirname, '')
    );

const PathToFileObject = (paths, format = ".js") =>
    paths.reduce((acc, root) => ({
        ...acc,
        [root.replace(format, '').replace('/src/', '')]: path.resolve(__dirname, root)
    }), {});



const entriesJS = getFilesInFolder(path.resolve(__dirname, 'src/app'));
const entriesHTML = getFilesInFolder(path.resolve(__dirname, 'src/app'), '.html');



const pluginsPages = entriesHTML.map( file => {
    return new HtmlWebpackPlugin({
        template: `.${file}`,
        filename: file.replace('/src/',''),
        inject: false,
        excludeChunks: []
    });
});


module.exports = {
    entry: {
        ...PathToFileObject(entriesJS),
    },
    plugins: [
        ...pluginsPages,
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    resolve: {
        modules: ['node_modules'],
        alias: {
            path: 'path/path.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    }
}
