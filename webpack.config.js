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
      }
    ]
  },
  target: "electron"  
}