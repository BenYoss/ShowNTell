const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  watch: true,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(gif|svg|jpg|png)$/,
      loader: 'file-loader',
    }],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
};
