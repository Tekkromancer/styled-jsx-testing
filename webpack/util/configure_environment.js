const path = require('path');
const fs = require('fs');
const Dotenv = require('./dotenv_wrap');

const configureEnvironment = () => {
  if (fs.existsSync(path.join(__dirname, '../../.env'))) {
    Dotenv.config();
  }
  return Dotenv.config({ path: path.join(__dirname, '../../.default.env') });
};

module.exports = configureEnvironment;
