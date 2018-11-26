import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotFoundPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });


  it('renders correctly', () => {
    const tree = TestRenderer
      .create(<NotFoundPage />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
