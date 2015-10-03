var webpack = require('webpack');

module.exports = {
  entry: ['webpack/hot/dev-server','./src/js/main.js'],
  output: {
    path: __dirname + '/build/',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel?stage=0']
      },
      { test: /\.json$/, loaders: ['json']}
    ]
  }
}
