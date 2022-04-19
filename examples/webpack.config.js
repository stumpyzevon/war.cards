const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  return {
    entry: {
      index: './src/index.js',
    },
    devtool: env.production ? false : 'inline-source-map',
    devServer: {
      static: './dist',
      client: {
        overlay: {
          warnings: false,
          errors: true,
        },
      },
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['.js', '.jsx'],
      }),
      new HtmlWebpackPlugin({
        title: 'Example Roster Viewer',
      }),
      new CleanWebpackPlugin(),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    mode: env.production ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
