import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Route, MemoryRouter } from 'react-router-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Navigation from './Navigation';
import MyReads from './MyReads/MyReads';
import SearchPage from './Search/SearchPage';
import NotFoundPage from './NotFoundPage';

/* eslint-disable react/no-multi-comp */
describe('Navigation', () => {
  const renderSubject = (Subject) => {
    const booksInShelves = [];
    const getBookShelf = () => {};
    const updateBookShelf = () => {};

    return (
      <Subject
        booksInShelves={booksInShelves}
        getBookShelf={getBookShelf}
        updateBookShelf={updateBookShelf}
      />
    );
  };


  const renderTestSequence = ({
    initialEntries,
    initialIndex,
    subject: Subject,
    steps,
  }) => {
    const div = document.createElement('div');


    class Assert extends React.Component {
      static propTypes = {
        children: PropTypes.shape({}).isRequired,
      };

      componentDidMount() {
        this.assert();
      }

      componentDidUpdate() {
        this.assert();
      }

      assert() {
        const nextStep = steps.shift();
        if (nextStep) {
          nextStep({ ...this.props, div });
        } else {
          ReactDOM.unmountComponentAtNode(div);
        }
      }

      render() {
        const { children } = this.props;
        return children;
      }
    }


    class Test extends React.Component {
      render() {
        return (
          <MemoryRouter
            initialIndex={initialIndex}
            initialEntries={initialEntries}
          >

            <Route
              render={props => (
                <Assert {...props}>
                  {renderSubject(Subject)}
                </Assert>
              )}
            />

          </MemoryRouter>
        );
      }
    }

    ReactDOM.render(<Test />, div);
  };


  const getRenderedHTML = (Subject) => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        {renderSubject(Subject)}
      </MemoryRouter>, div,
    );

    return div.innerHTML;
  };


  const extended = (() => {
    const innerHTML = {
      MyReads: getRenderedHTML(MyReads),
      SearchPage: getRenderedHTML(SearchPage),
      NotFoundPage: getRenderedHTML(NotFoundPage),
    };

    return {
      toBeRenderedAs(div, ComponentName) {
        const pass = div.innerHTML === innerHTML[ComponentName];
        if (pass) {
          return {
            message: () => `expected not to rendered as ${ComponentName}`,
            pass: true,
          };
        }
        return {
          message: () => `expected to rendered as ${ComponentName}`,
          pass: false,
        };
      },
    };
  })();
  expect.extend(extended);


  it('navigates around', (done) => {
    renderTestSequence({

      initialEntries: ['/'],

      // tell it the subject you're testing
      subject: Navigation,

      // and the steps to execute each time the location changes
      steps: [

        // home page
        ({ location, div }) => {
          expect(location.pathname).toBe('/');
          expect(div).toBeRenderedAs('MyReads');

          const node = div.querySelector('#goto-search');
          ReactTestUtils.Simulate.click(node, {
            button: 0,
          });
        },

        // search page
        ({ location, div }) => {
          expect(location.pathname).toBe('/search');
          expect(div).toBeRenderedAs('SearchPage');

          const node = div.querySelector('#goto-home');
          ReactTestUtils.Simulate.click(node, {
            button: 0,
          });
        },

        // back to home page
        ({ history, location, div }) => {
          expect(location.pathname).toBe('/');
          expect(div).toBeRenderedAs('MyReads');

          history.push('/random');
        },

        // 404 error page
        ({ location, div }) => {
          expect(location.pathname).toBe('/random');
          expect(div).toBeRenderedAs('NotFoundPage');

          done();
        },
      ],
    });
  });
});
/* eslint-enable react/no-multi-comp */
