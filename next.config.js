const { mergeResolve, mergeRules, mergePlugins } = require('./webpack/merge');

module.exports = {
  webpack: (config, options) => {
    // if (config.name === 'server') {
    //   console.log('config =====');
    //   console.log(config.module.rules[0].use.options);
    //   console.log('------------');
    // }


    const webpackConfig = require('./webpack.config');
    mergeResolve(config, webpackConfig);
    mergeRules(config, webpackConfig);
    mergePlugins(config, webpackConfig);

    // console.log('modules', config.resolve.modules);
    return config;
  },
  // exportPathMap() {
  //   return {
  //     '/': { page: '/' }
  //   };
  // },
  distDir: './.next'
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
  context: '/Users/tekkromancer/Projects/RepairClinic_ssr/app',
  entry: [Function: entry],
  output: {
    path: '/Users/tekkromancer/Projects/RepairClinic_ssr/app/.next/dist',
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
    {
      test: /\.(js|jsx)(\?[^?]*)?$/,
      loader: 'hot-self-accept-loader',
      include:
       [ '/Users/tekkromancer/Projects/RepairClinic_ssr/app/pages',
         '/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/next/pages'
      ]
    },
    { test: /\.+(js|jsx)$/,
      include: [ '/Users/tekkromancer/Projects/RepairClinic_ssr/app' ],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { cacheDirectory: true, presets: [], plugins: [], babelrc: true }
        }
    }
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
      dir : '/Users/tekkromancer/Projects/RepairClinic_ssr/app',
      dist: '.next'
    }
  ]
}
*/
