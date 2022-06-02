const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { IgnorePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
    entry: ['./src/main.js'],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {},
                    // other vue-loader options go here
                },
            },
            // this will apply to both plain .scss files
            // AND <style lang="scss"> blocks in vue files
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.ts$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)(\?v=[0-9\.]+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'dist/[name].[ext]?[hash]',
                },
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?v=[0-9\.]+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'dist/[name].[ext]?[hash]',
                    outputPath: './',
                    publicPath: '../',
                },
            },
        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            src: path.resolve(__dirname, './src'),
            lib: path.resolve(__dirname, './src/lib'),
            misc: path.resolve(__dirname, './src/misc'),
            assets: path.resolve(__dirname, './src/assets'),
            components: path.resolve(__dirname, './src/components'),
            views: path.resolve(__dirname, './src/views'),
            store: path.resolve(__dirname, './src/store'),
            types: path.resolve(__dirname, './src/types'),
            '@': path.resolve('src'),
        },
        extensions: ['*', '.ts', '.js', '.vue', '.json'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: devMode ? '[name].css' : 'dist/[id].[contenthash:8].css',
            chunkFilename: devMode
                ? '[id].css'
                : 'dist/[id].[contenthash:8].css',
        }),
    ],
    stats: {
        children: false,
    },
}
