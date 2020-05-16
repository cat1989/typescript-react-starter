const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProdution = process.env.NODE_ENV == 'production'

const config = {
    entry: {
        main: path.resolve(__dirname, './src')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js'
    },
    resolve: {
        extensions: [
            '.tsx', '.js'
        ],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    isProdution ? miniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, './public/styles/global.scss')
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProdution ? 'assets/fonts/[contenthash:8].[ext]' : '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            esModule: false,
                            name: isProdution ? 'assets/images/[contenthash:8].[ext]' : '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.tsx$/,
                use: isProdution ? [
                    'awesome-typescript-loader',
                    'eslint-loader'
                ] : [
                    'awesome-typescript-loader',
                    'eslint-loader',
                    'source-map-loader'
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProdution,
                removeComments: isProdution
            }
        })
    ]
}

if (isProdution) {
    config.mode = 'production'
    config.output.filename = 'scripts/[contenthash:8].js'
    config.output.chunkFilename = 'scripts/[contenthash:8].js'
    // config.output.publicPath = 'http://localhost'
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
    config.plugins.push(
        new CleanWebpackPlugin()
    )
    config.plugins.push(
        new miniCssExtractPlugin({
            filename: 'styles/[contenthash:8].css',
            chunkFilename: 'styles/[contenthash:8].css'
        })
    )
}
else {
    config.devtool = 'source-map'
    config.devServer = {
        host: '0.0.0.0',
        port: 3000,
        hot: true
    }
}

module.exports = config