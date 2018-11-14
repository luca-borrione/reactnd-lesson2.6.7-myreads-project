import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash.debounce'

/**
 * @class BooksGrid
 * @extends React.Component
 * @classdesc
 * Prints a list of books
 * @hideconstructor
 */
class SearchBar extends React.Component {

	static SEARCH_LIMIT = 20;
	static DEBOUNCING_TIME = 250; // milliseconds

	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {TBook[]} propTypes.books - List of the books to show
	 * @property {function} propTypes.updateBookShelf
	 * 	Method of the [App]{@link App#updateBookShelf} component for updating the list of books
	 * 	in the shelves
	 * @static
	 */
	static propTypes = {
		showResult: PropTypes.func.isRequired
	};

	state = {
		keywords: ''
	};

	async = {
		onTyping: null
	};

	constructor(props) {
		super(props);
		const { DEBOUNCING_TIME } = this.constructor;

		this.onTyping = this.onTyping.bind(this);
		this.search = debounce(this.search, DEBOUNCING_TIME);
	}

	/**
	 * @description
	 * Performs a search to find books matching the query string typed by the user.
	 * If no books are found, or in case of search error, the books list will be cleared.
	 * If books are returned by the search, then they will be listed undernit the search textfield.
	 * @param {string} query
	 * @returns {void}
	 */
	async search(query, resolve, reject) {
		const { SEARCH_LIMIT } = this.constructor;
		const { getBookShelf } = this.props;

		let books;

		if (query === '') {
			books = [];
			return resolve ? resolve(books) : books;
		}

		try {

			const fetchedBooks = await BooksAPI.search(query, SEARCH_LIMIT);
			if (!fetchedBooks || fetchedBooks.error) {
				books = [];
			} else {
				books = fetchedBooks.map( book => {
					// The book literal objects returned by the real search do not contain the shelf property,
					// so we need to define it by ourselves.
					// The ones returned by the mock search alredy contain it, so we will skip this in that case.
					if (!book.shelf) {
						book.shelf = getBookShelf(book.id);
					}
					return book;
				});
			}

			return resolve ? resolve(books) : books;

		} catch (error) {

			if (reject) {
				reject(error);
			} else {
				throw new Error(error);
			}
		}
	}

	fetchBooks(keywords) {
		return new Promise( async (resolve, reject) => {
				this.search(keywords, resolve, reject);
			}).then( async books => {
				books.status = 'ready';
				return books;
			}).catch( error => {
				console.error('ERROR: ', error);
				const books = [];
				books.status = 'error';
				return books;
			});
	}

	/**
	 * Updates the internal state according to the keywords typed by the user,<br>
	 * then it clears the books list if the textfield is empty,<br>
	 * otherwise it performs a search based on the typed keywords.
	 * @param {SyntheticEvent} event
	 * @returns {void}
	 */
	onTyping(event) {
		const keywords = event.target.value;
		this.async.onTyping = new Promise( async resolve => {
			await this.setState({ keywords });
			const books = await this.fetchBooks(keywords);
			await this.props.showResult(books);
			resolve(books);
		});
	}


	shouldComponentUpdate(nextProps, nextState) {
		return this.state.keywords !== nextState.keywords;
	}

	/**
	 * @description
	 * Shows the given list of books by rendering the [Book]{@link Book} component
	 * @returns {ReactElement}
	 */
	render() {
		const { keywords } = this.state;
		console.log('>> BAR RENDERED <<', keywords);
		return (
			<div className="search-books-input-wrapper">
				<input type="text" placeholder="Search by title or author"
					value={keywords}
					onChange={this.onTyping} />
			</div>
		);
	}
}


export default SearchBar;
