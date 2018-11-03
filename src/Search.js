
import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash.debounce'

/**
 * @class Search
 * @extends React.Component
 * @classdesc
 * - Shows a textfield in which the user can type keywords to search books.<br>
 * - Lists the books resulting from the search undernit the textfield.
 * @hideconstructor
 */
class Search extends React.Component {

	static SEARCH_LIMIT = 20;
	static DEBOUNCING_TIME = 250; // milliseconds


	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {function} propTypes.getBookShelf
	 * 	Method of the [App]{@link App#getBookShelf} component for retrieving the shelf key
	 * 	associated with a book by book id.
	 * @property {function} propTypes.updateBookShelf
	 * 	Method of the App]{@link App#updateBookShelf} component for updating the list
	 * 	of books in the shelves
	 * @static
	 */
	static propTypes = {
		getBookShelf: PropTypes.func.isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};


	constructor(props) {
		super(props);
		const { DEBOUNCING_TIME } = this.constructor;

		this.onSearchTyping = this.onSearchTyping.bind(this);
		this.search = debounce(this.search, DEBOUNCING_TIME);
	}


	/**
	 * @property {Object} state
	 * @property {TBook[]} state.books - List of books resulting from the search
	 * @property {string} state.searchedValue - Search keywords typed by the user in the textfield
	 * @private
	 */
	state = {
		books: [],
		searchedValue: ''
	};


	/**
	 * @description
	 * Will clear the books list by emptying the books array in the state
	 * @returns {void}
	 */
	clearBooksGrid() {
		this.setState({
			books: []
		});
	}


	/**
	 * @description
	 * Performs a search to find books matching the query string typed by the user.
	 * If no books are found, or in case of search error, the books list will be cleared.
	 * If books are returned by the search, then they will be listed undernit the search textfield.
	 * @param {string} query
	 * @returns {void}
	 */
	search(query) {
		const { getBookShelf } = this.props;
		const { SEARCH_LIMIT } = this.constructor;

		BooksAPI.search(query, SEARCH_LIMIT)
			.then( books => {
				if (!books || books.error) {
					this.clearBooksGrid();
				} else {
					this.setState({
						books:	books.map( book => {
									// The book literal objects returned by the search do not contain the shelf property,
									// so we need to define it by ourselves. If a book is already stored in the App,
									// then we retrieve its associated shelf id, otherwise we set it to NONE.
									book.shelf = getBookShelf(book.id);
									return book;
								})
					});
				}
			});
	}


	/**
	 * Updates the internal state according to the keywords typed by the user,<br>
	 * then it clears the books list if the textfield is empty,<br>
	 * otherwise it performs a search based on the typed keywords.
	 * @param {SyntheticEvent} event
	 * @returns {void}
	 */
	onSearchTyping(event) {
		this.setState({
			searchedValue: event.target.value
		}, () => {

			this.state.searchedValue === ''
				? this.clearBooksGrid()
				: this.search(this.state.searchedValue);

		});
	}


	/**
	 * @description
 	 * - Shows a textfield in which the user can type keywords to search books.<br>
 	 * - Lists the books resulting from the search undernit the textfield by rendering
	 * the [BooksGrid]{@link BooksGrid} component
	 * @returns {ReactElement}
	 */
	render() {
		const { books, searchedValue } = this.state;
		const { updateBookShelf } = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author"
							value={searchedValue}
							onChange={this.onSearchTyping} />

					</div>
				</div>
				<div className="search-books-results">

					<BooksGrid
						books={books}
						updateBookShelf={updateBookShelf}  />

				</div>
			</div>
		);
	}
}

export default Search;