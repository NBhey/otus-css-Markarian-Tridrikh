const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    ],
    module: {
        rules: [
        {
            test: /\.(sass|css|scss)$/i,
            use: ["style-loader", "css-loader",
                { loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                        "postcss-deadcss",
                         ],
                        }, 
                    },
                },
            ],

        },
        {
             test: /\.html$/,
            use: "html-loader",
        },
        {
            test:/\.(?:ico|gif|png|jpeg|jpg)$/,
            use: [
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                    },
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: [0.65, 0.90],
                      speed: 4
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    webp: {
                      quality: 75
                    }
                  }
                },
              ],
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