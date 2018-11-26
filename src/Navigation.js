import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import PropsRoute from './PropsRoute';
import MyReads from './MyReads/MyReads';
import SearchPage from './Search/SearchPage';
import NotFoundPage from './NotFoundPage';
import { TBook } from './shared/types';

/**
 * @module
 * @name Navigation
 * @description
 * Switches the navigation of the app to:
 * - [MyReads]{@link module:MyReads} when the browser location path is exactly '/'
 * - [SearchPage]{@link module:SearchPage} when the browser location path contains '/search'
 * - [NotFoundPage]{@link module:NotFoundPage} when the browser location contains an unexpected path
 */
const Navigation = (props) => {
  const { booksInShelves, getBookShelf, updateBookShelf } = props;

  return (
    <Switch>
      <PropsRoute
        exact
        path="/"
        component={MyReads}
        booksInShelves={booksInShelves}
        updateBookShelf={updateBookShelf}
      />

      <PropsRoute
        path="/search"
        component={SearchPage}
        getBookShelf={getBookShelf}
        updateBookShelf={updateBookShelf}
      />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

/**
 * @memberof module:Navigation
 * @description Intended types of the props passed to the component
 * @property {Array.<TBook>} booksInShelves - see [booksInShelves]{@link module:App~state}
 * @property {function} getBookShelf - see [getBookShelf]{@link module:App~getBookShelf}
 * @property {function} updateBookShelf - see [updateBookShelf]{@link module:App~updateBookShelf}
 */
Navigation.propTypes = {
  booksInShelves: PropTypes.arrayOf(
    PropTypes.shape(TBook).isRequired,
  ).isRequired,
  getBookShelf: PropTypes.func.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Navigation;
