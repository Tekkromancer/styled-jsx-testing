import Promise from 'bluebird';
import chai from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import register from 'ignore-styles';

import chaiMatchPattern from 'chai-match-pattern';
import chaiSubset from 'chai-subset';

chai.use(chaiSubset);
chai.use(chaiMatchPattern);
chai.should();
chai.use(sinonChai);

chai.use(require('dirty-chai'));
chai.use(require('chai-match-pattern'));
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-enzyme'));

global.regeneratorRuntime = require('regenerator-runtime');

global.Promise = Promise;
global.expect = chai.expect;
global.nock = nock;
global.sinon = sinon;
global.nock = nock;
global._ = chaiMatchPattern.getLodashModule();


process.env.NODE_ENV = 'test';

// Ignore styles
register(['.css', '.styl', '.png', '.svg']);
