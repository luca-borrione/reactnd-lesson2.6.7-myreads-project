import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import BookLoader from './BookLoader';

describe('BookLoader', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BookLoader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });


  it('renders correctly', () => {
    const tree = TestRenderer
      .create(<BookLoader />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
