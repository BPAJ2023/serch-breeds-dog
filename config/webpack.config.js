const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "./js/[contenthash:6]-[name].js",
        path: path.resolve(__dirname, "../build")
    },
    devServer: {
        open: true,
        port: 5005,
        static: {
            directory: path.join(__dirname, '../build'),
        },
        compress: true,
        hot: true
    },
    module: {
        rules: [
            { test: /\.txt$/ , use: "raw-loader" },
            { 
                test: /\[.scss|.sass|.css]$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ] 
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                    name: './image/[contenthash:6][name].[ext]',
                    }
                }
                ]
                
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "DOG BREEDS",
            template: path.resolve(__dirname, "../", "src", "templates", "template.html"),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[contenthash:6]-[name].css'
        })
    ]
}