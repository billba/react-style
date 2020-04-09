const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'scripts/bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8000
  },
};