/* eslint filenames/match-exported: 0 */
const Dotenv = require('dotenv');

const origConfig = Dotenv.config;

Dotenv.config = (...args) => {
  const configResult = origConfig.apply(Dotenv, args);
  if (configResult.error) {
    throw configResult.error;
  }
  return configResult;
};

module.exports = Dotenv;
