import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import * as BooksAPI from '../BooksAPI';

/**
 * @module
 * @name SearchBar
 * @extends React.Component
 * @description
 * Shows an input type field with whih the user can perform a search for new books.
 */
class SearchBar extends React.Component {
  /**
   * @member
   * @name SEARCH_LIMIT
   * @description the search is limited to this amount of elements
   * @constant {number}
   * @default 20
   * @static
   * @private
   */
  static SEARCH_LIMIT = 20;


  /**
   * @member
   * @name DEBOUNCING_TIME
   * @description only one search allowed within the frame of this amount milliseconds
   * @constant {number}
   * @default 250
   * @static
   * @private
   */
  static DEBOUNCING_TIME = 250; // milliseconds


  /**
   * @member
   * @name BOOKS_STATUS
   * @description Collection of possible status of the books retrieved by a search
   * @property {string} READY - The search has been performed successfully
   * @property {string} ERROR - An error occurred while performing the search
   * @static
   * @private
   */
  static BOOKS_STATUS = {
    READY: 'BOOKS_STATUS.READY',
    ERROR: 'BOOKS_STATUS.ERROR',
  };


  /**
   * @name propTypes
   * @description Intended types of the props passed to the component
   * @property {function} showResult - see [showResult]{@link module:SearchPage~showResult}
   * @static
   */
  static propTypes = {
    showResult: PropTypes.func.isRequired,
  };


  /**
   * @name state
   * @property {string} query - search query typed by the user in the search bar
   * @static
   * @private
   */
  state = {
    query: '',
  };


  /**
   * @member
   * @name async
   * @description
   * Collection of promises useful when making unit tests.
   * @property {Promise} onTyping - waiting for the books to be fetched
   *                                when the user types in the search bar
   */
  async = {
    onTyping: null,
  };

  constructor(props) {
    super(props);
    const { DEBOUNCING_TIME } = this.constructor;

    this.onTyping = this.onTyping.bind(this);
    this.search = debounce(this.search, DEBOUNCING_TIME);
  }

  /**
   * @method
   * @name shouldComponentUpdate
   * @param {Object} nextProps - ignored
   * @param {state} nextState - refers to [state]{@link module:SearchBar~sstate}
   * @returns {boolean} - false if the query hasn't changed
   * @private
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { query } = this.state;
    return query !== nextState.query;
  }

  /**
   * @method
   * @name onTyping
   * @description
   * Updates the internal state according to the query typed by the user,
   * then it clears the books list if the textfield is empty,
   * otherwise it performs a search based on the typed query.
   * @param {SyntheticEvent} event
   * @returns {void}
   * @private
   */
  onTyping(event) {
    const query = event.target.value;
    const { showResult } = this.props;
    this.async.onTyping = new Promise(async (resolve) => {
      await this.setState({ query });
      const books = await this.fetchBooks(query);
      await showResult(books);
      resolve(books);
    });
  }

  /**
   * @method
   * @name search
   * @description
   * Promise executor that performs a search to find books matching
   * the query string typed by the user.
   * If no books are found, or if the search completes with an error,
   * then an empty array is returned so that the list under the searchbar is cleared.
   * The promise is rejected if an exception is triggered while performng the search.
   * @param {string} query - query string typed by the user
   * @param {function} [resolve] - optional callback triggered when the promise is fullfilled
   * @param {function} [reject] - optional callback triggered when the promise
   * @returns {TBook[]}
   * @private
   */
  async search(query, resolve, reject) {
    const { SEARCH_LIMIT } = this.constructor;
    const { getBookShelf } = this.props;

    let books;

    if (query === '') {
      books = [];
      return resolve(books);
    }

    try {
      const fetchedBooks = await BooksAPI.search(query, SEARCH_LIMIT);
      if (!fetchedBooks || fetchedBooks.error) {
        books = [];
      } else {
        books = fetchedBooks.map((book) => {
          // The book literal objects returned by the api search
          // don't contain the shelf property, so we need to define it by ourselves.
          // The ones returned by the mock api search alredy contain it instead.
          const shelf = book.shelf || getBookShelf(book.id);
          return { ...book, shelf };
        });
      }
      return resolve(books);
    } catch (error) {
      return reject(error);
    }
  }


  /**
   * @method
   * @name fetchBooks
   * @description
   * Fetches the books according to the query string typed by the user,
   * triggering the search itself and then applying to the books array
   * an internal status READY if the search completes correctly
   * or an internal statue ERROR if an something went wrong.
   * @param {string} query - query string typed by the user
   * @return {Promise.<TBook[]>}
   * @private
   */
  fetchBooks(query) {
    const { BOOKS_STATUS } = this.constructor;
    return new Promise((resolve, reject) => {
      this.search(query, resolve, reject);
    }).then((found) => {
      const books = [...found];
      books.status = BOOKS_STATUS.READY;
      return books;
    }).catch((error) => {
      if (/testing/.test(error.message) === false) {
        console.error('ERROR: ', error); // eslint-disable-line no-console
      }
      const books = [];
      books.status = BOOKS_STATUS.ERROR;
      return books;
    });
  }


  /**
   * @method
   * @name render
   * @description
   * Displays an input textfield where the user can type keywords to search for books
   * @returns {ReactElement}
   * @private
   */
  render() {
    const { query } = this.state;
    return (
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={this.onTyping}
        />
      </div>
    );
  }
}

export default SearchBar;
