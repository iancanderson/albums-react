import { expect } from 'chai';
import React from 'react/addons';
import jsdom from 'jsdom';

global.React = React;
global.TestUtils = React.addons.TestUtils;
global.expect = expect;

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
