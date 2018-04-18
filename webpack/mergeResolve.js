const _ = require('lodash');

const mergeResolve = (config, webpack) => {
  config.resolve.extensions = mergeExtensions(config, webpack);
  config.resolve.modules = mergeModules(config, webpack);
  config.resolve.alias = mergeAlias(config, webpack);
};

const mergeExtensions = (config, webpack) =>
  _.uniq(config.resolve.extensions.concat(webpack.resolve.extensions));

const mergeModules = (config, webpack) =>
  _.uniq(config.resolve.modules.concat(webpack.resolve.modules));

const mergeAlias = (config, webpack) => {
  const configAlias = config.resolve.alias;
  const webpackAlias = webpack.resolve.alias;

  Object.keys(webpackAlias).forEach(key => {
    configAlias[key] = webpackAlias[key];
  });

  return configAlias;
};

module.exports = {
  mergeResolve,
  mergeExtensions,
  mergeModules,
  mergeAlias,
};
