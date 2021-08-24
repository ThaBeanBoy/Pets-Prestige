const path = require('path');

module.exports = {
  entry: './src/todo.js',
  output: {
    filename: 'todo.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      // Loads scss files
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },

      // Loads css files
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      // Loads fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  mode: 'development',
};
