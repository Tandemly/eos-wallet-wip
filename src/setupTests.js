const fetch = require('jest-fetch-mock')
const requestAnimationFrame = require('raf/polyfill');
require("jest-localstorage-mock");

const Enzyme  = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });


global.window = {};
global.fetch = fetch;
global.window.requestAnimationFrame =
global.requestAnimationFrame = requestAnimationFrame;