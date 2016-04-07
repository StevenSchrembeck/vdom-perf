var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
      vDomPerf: './src/index.js'
  },
  output: {
    path: './build',
    filename: "[name].js"
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          Mustache: "mustache"
    }),
],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.mustache$/,
        loader: 'raw'
      }
    ]
  }
};
