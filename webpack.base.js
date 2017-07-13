const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function () {
  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: path.resolve(__dirname, 'src/app/main.ts')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },

    cache: true,
    watchOptions: {
      poll: 250
    },

    module: {
      noParse: [
        /(node_modules|~)\/(jquery)\//gi
      ],
      loaders: [
        { test: /\.(ts|tsx?)$/, loader: 'happypack/loader?id=ts', exclude: /node_modules/ },
        { test: /\.js$/, loader: 'happypack/loader?id=js', exclude: /node_modules/ },
        { test: /\.html$/, loader: "raw-loader" },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'url-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: "file-loader" }
      ]
    },
    plugins: [
      new HappyPack(
        { id: 'ts', threads: 2, loaders: ['ts-loader?happyPackMode=true'] },
        { id: 'js', threads: 2, loaders: ['babel-loader?presets[]=es2015&cacheDirectory=true'] }
      ),
      new ForkTsCheckerWebpackPlugin({
        watch: ['.']
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new CopyWebpackPlugin([{
        copyUnmodified: true,
        from: './*.html'
      }]),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve(__dirname, 'src'),
        {}
      )
    ],
    stats: { colors: true },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    }
  }
}
