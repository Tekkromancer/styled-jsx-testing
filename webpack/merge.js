const _ = require('lodash');

const { mergeResolve } = require('./mergeResolve');

const mergeRules = (config, webpack) => {
  config.module.rules = config.module.rules.concat(webpack.module.rules);
  // config.module.rules = webpack.module.rules;
};

const mergePlugins = (config, webpack) => {
  config.plugins = _.uniq(config.plugins.concat(webpack.plugins));
};

module.exports = {
  mergePlugins,
  mergeResolve,
  mergeRules,
};
