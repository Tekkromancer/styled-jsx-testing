const path = require('path');

const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssLoaderConfig = require('./webpack/css-loader-config');

const isCoverage = process.env.NODE_ENV === 'coverage';
const dev = process.env.NODE_ENV !== 'production';

// console.log('dev', dev);

const extractCSSPlugin = new ExtractTextPlugin({
  filename: 'static/style.css'
});

// if (!extractCSSPlugin.options.disable) {
//   extractCSSPlugin.options.disable = dev;
// }

const stylusLoader = cssLoaderConfig({}, extractCSSPlugin, {
  cssModules: true,
  dev,
  isServer: false,
  loaders: ['stylus-loader?paths=common']
});

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: [
      'client',
      'node_modules'
    ],
    alias: {
      common_imports: `${__dirname}/client/common/common_imports`,
      components: `${__dirname}/client/components`,
      images: `${__dirname}/client/assets/images`,
    }
  },

  module: {
    rules: [].concat(
      {
        test: /bootstrap.*\.css$/,
        loader: 'isomorphic-style-loader!css-loader',
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /bootstrap.*\.css$/],
        loader: 'isomorphic-style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1!postcss-loader',
        // loader: 'isomorphic-style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1!postcss-loader',
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        // loaders: ['style-loader', 'css-loader'],
        loaders: ['isomorphic-style-loader', 'css-loader'],
      },
      { // this works, but does not bundle
        test: /\.styl$/,
        use: stylusLoader
      },
      // {
      //   test: /\.styl$/,
      //   loader: 'isomorphic-style-loader!css-loader!stylus-loader'
      // },
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
                console.log('outputPath :: url', url);
                return `${url}`;
              },
              publicPath: url => {
                console.log('publicPath :: url', url);
                return `/_next/webpack/${url}`;
              },
            }
          }
        ]
      },
      isCoverage ? {
        test: /\.(js|ts)/,
        include: path.resolve('/'), // instrument only testing sources with Istanbul, after ts-loader runs
        loader: 'istanbul-instrumenter-loader'
      } : [],
      {
        test: /\.(js|jsx)?$/,
        exclude: [/node_modules/, /.+\.config.js/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    )
  },
  plugins: [
    extractCSSPlugin,
  ],
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: '#inline-cheap-module-source-map'
};


/*
const config = {
  devtool: 'source-map',
  name: 'server',
  cache: true,
  target: 'node',
  externals: [
    [Function]
  ],
  context: '/Users/tekkromancer/Projects/RepairClinic_ssr/client',
  entry: [Function: entry],
  output: {
    path: '/Users/tekkromancer/Projects/RepairClinic_ssr/client/.next/dist',
    filename: '[name]',
    libraryTarget: 'commonjs2',
    chunkFilename: '[name]-[chunkhash].js',
    strictModuleExceptionHandling: true,
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: [
      '.js', '.jsx', '.json'
    ],
    modules: [
      '/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/next/node_modules', 'node_modules'
    ],
    alias: {
      next: '/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/next',
      react: 'react/cjs/react.development.js',
      'react-dom': 'react-dom/cjs/react-dom.development.js'
    }
  },
  resolveLoader: {
    modules: ['/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/next/node_modules', 'node_modules', '/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/next/dist/server/build/loaders']
  },
  module: {
    rules: [
      [Object]
    ]
  },
  plugins: [
    IgnorePlugin {
      resourceRegExp : /(precomputed)/,
      contextRegExp: /node_modules.+(elliptic)/,
      checkIgnore: [Function: bound checkIgnore]
    },
    NoEmitOnErrorsPlugin {},
    NamedModulesPlugin {
      options : {}
    },
    UnlinkFilePlugin {
      prevAssets : {}
    },
    CaseSensitivePathsPlugin {
      options : {},
      pathCache: {},
      fsOperations: 0,
      primed: false
    },
    LoaderOptionsPlugin {
      options : [Object]
    }, {
      apply: [Function: apply]
    },
    DefinePlugin {
      definitions : [Object]
    },
    NextJsSsrImportPlugin {
      dir : '/Users/tekkromancer/Projects/RepairClinic_ssr/client',
      dist: '.next'
    }
  ]
}
*/
