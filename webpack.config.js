const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  return {
    entry: './src/index.tsx',
    devtool: 'source-map',
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ],
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    devServer: {
      static: './dist'
    }
  }
}
