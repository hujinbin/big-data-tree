var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // entry: './src/main.js',
    mode: NODE_ENV,
    entry: NODE_ENV === 'development' ? './src/main.js' : './src/index.js',
    output: {
        path: path.resolve(__dirname, './lib'),
        publicPath: '/lib/',
        filename: 'big-data-tree.min.js',
        library: 'big-data-tree',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new VueLoaderPlugin(),
         // extract css into its own file
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(ttf|woff|eot|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts',
                        name: '[name].[ext]',
                    }
                }]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax',
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': [
                            'style-loader',
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader',
                        ],
                        'sass': [
                            'style-loader',
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax',
                        ]
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
        ],
    },
}

if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ])
} else {
    module.exports.devtool = '#source-map'
}