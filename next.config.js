const { mergeResolve, mergeRules, mergePlugins } = require('./webpack/merge');

module.exports = {
  webpack: (config, options) => {
    const webpackConfig = require('./webpack.config');
    mergeResolve(config, webpackConfig);
    mergeRules(config, webpackConfig);
    mergePlugins(config, webpackConfig);

    return config;
  },
  distDir: './.next'
};
