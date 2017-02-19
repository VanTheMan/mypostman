module.exports = {
  entry: {
      main: './index.js'
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'] 
        }
      },
      {
          test: /\.css$/,
          loader: 'css-loader'
      }, {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader'
      }, {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
      }
    ]
  },
  target: "electron"  
}