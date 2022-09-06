const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './js/index.js',
    indexBlog: './js/indexBlog.js',
  },
  output: {
    filename: `js/[name].js?v=[hash]`,
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    hot: true,
    static: {
      directory: './dist',
      watch: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './index.html',
      filename: './index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({ 
      template: './html/blog.html',
      filename: './html/blog.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './img',
        to: './img'
      },
      {
        from: './db',
        to: './db'
      }],
    }),
    new MiniCssExtractPlugin({
      filename: `css/style.css?h=[hash]`,
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
/*         loader: "file-loader",
        options: {
          name: '[name].[ext]'
        } */
      },
    /*   {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: `./js/postcss.config.js`
              }
            }
          },
        ]
      } */
    ]
  }
};