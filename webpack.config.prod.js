const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'production',
    entry: { 
       main: path.resolve(__dirname,'./src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './prod'),
        filename: '[name].[hash-8].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), 
             filename: 'index.html', 
    }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
               use: "html-loader",
           },
        {
            test: /\.(sass|css|scss)$/i,
            use: ["style-loader", "css-loader","postcss-loader",
                { loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                        "autoprefixer",
                        "postcss-preset-env",
                        "postcss-deadcss",
                         ],
                        }, 
                    },
                },
            ],
        },
        
        {
            test:/\.(?:ico|gif|png|jpeg|jpg)$/,
            type: 'asset/resource',
            generator:{
                filename:'images/[name]-[hash:5][ext]',
            }
        },
        {
            test:/\.(woff(2)?|eot|ttf|otf|svg)$/,
            type: 'asset/resource',
            generator:{
                filename:'fonts/[name]-[hash:5][ext]',
            }
        },
        ]
    },
  }