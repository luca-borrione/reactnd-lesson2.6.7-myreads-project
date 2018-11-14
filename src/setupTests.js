import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn()
};

global.React = React;
global.localStorage = localStorageMock;

jest.mock('./BooksAPI');
jest.mock('lodash.debounce', () => jest.fn(fn => fn));

export default undefined;