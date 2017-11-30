var webpack = require('webpack');

module.exports = {
  entry : './src/index.js',
  output : {
    path : __dirname + '/public/',
    filename : 'bundle.js'
  },

  module : {
    loaders : [
      {
        test : /\.js$/,
        loaders : ['babel?' + JSON.stringify({
          cacheDiectory : true,
          presets : ['es2015', 'react']
        })],
        exclude : /node_modules/,
      }
    ]
  }
};
