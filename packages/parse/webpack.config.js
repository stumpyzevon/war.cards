const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  return {
    entry: {
      index: './src/index.js',
    },
    mode: env.production ? 'production' : 'development',
    plugins: [
      new ESLintPlugin({
        extensions: ['.js'],
      }),
      new CleanWebpackPlugin(),
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'parse',
        type: 'umd',
      },
    },
  };
};
