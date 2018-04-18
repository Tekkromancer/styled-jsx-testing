const _ = require('lodash');
const webpack = require('webpack');
const { clientConfigKeys } = require('./client_config.json');

require('./configure_environment')();

// "defines" allows for additional webpack config variables to be injected other than the
// ".env" values.
module.exports = (defines = {}) => {
  const clientConfig = {};
  clientConfigKeys.forEach((k) => {
    clientConfig[k] = JSON.stringify(process.env[k]);
  });
  return new webpack.DefinePlugin(_.defaultsDeep({}, defines, {
    'process.env': clientConfig
  }));
};
