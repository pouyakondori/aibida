const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// For developer-specific configs
const PersonalConfig = require('./personal-config')

module.exports = env => {
    return merge(common, {
        mode: 'development',

        plugins: [
            new webpack.DefinePlugin({
                AIBIDIA_API_BASE_URL: PersonalConfig.apiUrl,
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                title: 'Homework (DEV)',
                chunksSortMode: 'none',
            }),
        ],

        devtool: '#eval-source-map',

        devServer: {
            historyApiFallback: true,
            noInfo: true,
            overlay: true,
        },

        output: {
            path: path.resolve(__dirname, './build'),
            filename: 'dist/build.js',
        },
    })
}
