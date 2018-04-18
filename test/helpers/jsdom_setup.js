import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const { JSDOM } = require('jsdom');
// import { JSDOM } from 'jsdom';


Enzyme.configure({ adapter: new Adapter() });

const exposedProperties = ['window', 'navigator', 'document'];
global.window = new JSDOM('').window;
global.document = window.document;
Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = window[property];
  }
});
global.navigator = {
  userAgent: 'node.js',
};

// sdg - stub matchMedia
// istanbul ignore next
window.matchMedia = window.matchMedia || (() => { return { matches: false, addListener: () => {}, removeListener: () => {}, }; });

// sdg - set test mode
process.env.TEST_MODE = true;
global.SSR_ONLY = true;

// import React from 'react'; // eslint-disable-line
// import { shallow, mount, render } from 'enzyme'; // eslint-disable-line

const React = require('react'); // eslint-disable-line
const { shallow, mount, render } = require('enzyme'); // eslint-disable-line

global.React = React;

global.shallow = shallow;
global.mount = mount;
global.render = render;
