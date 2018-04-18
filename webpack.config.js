const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DotenvWebpack = require('./webpack/util/env_webpack');
const stylus_plugin = require('poststylus');

const cssLoaderConfig = require('./webpack/css-loader-config');

const dev = process.env.NODE_ENV !== 'production';

const extractCSSPlugin = new ExtractTextPlugin({
  filename: 'static/style.css'
});

const stylusLoader = cssLoaderConfig({}, extractCSSPlugin, {
  cssModules: true,
  dev,
  isServer: false,
  loaders: ['stylus-loader?paths=app/common']
});

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: [
      'app',
      'node_modules',
      `${__dirname}/node_modules`
    ],
    alias: {
      common: `${__dirname}/app/common`,
      common_imports: `${__dirname}/app/common/common_imports`,
      components: `${__dirname}/app/components`,
      config: `${__dirname}/app/config`,
      globalStyles: `${__dirname}/app/common/global_styles/base/index.styl`,
      pages: `${__dirname}/app/pages`,
      reducers: `${__dirname}/app/reducers`,
      services: `${__dirname}/app/services`,
      test: `${__dirname}/test`,
      util: `${__dirname}/app/util`,
      testUtils: `${__dirname}/test/utils`,
    }
  },

  module: {
    rules: []
      .concat(
        {
          test: /\.css$/,
          loader: 'isomorphic-style-loader!css-loader'
        },

        {
          test: /\.scss$/,
          loader: 'isomorphic-style-loader!css-loader!sass-loader'
        },

        {
          test: /\.styl$/,
          use: [
            'isomorphic-style-loader',
            'css-loader',
            {
              loader: 'stylus-loader',
              options: {
                use: [stylus_plugin()],
              },
            },
          ],
        },
        /*
        {
          test: /\.styl$/,
          use: stylusLoader
        },

        */
        {
          test: /\.(js|jsx)?$/,
          exclude: [/node_modules/, /.+\.config.js/],
          use: {
            loader: 'babel-loader',
          },
        },
        {
          // handle woff web-fonts,
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          // handle other supported web-fonts
          test: /\.(otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        {
          test: /\.(gif|png|jpg|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: url => {
                  return `${url}`;
                },
                publicPath: url => {
                  return `_next/webpack/${url}`;
                }
              }
            }
          ]
        },
      )
  },
  plugins: [
    DotenvWebpack(),
    extractCSSPlugin,
  ],
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: '#inline-cheap-module-source-map'
};
