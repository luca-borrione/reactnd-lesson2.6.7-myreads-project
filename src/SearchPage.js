import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import PanelError from './PanelError';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

/**
 * @class SearchPage
 * @extends React.Component
 * @classdesc
 * Allows the user to perform a search for new books
 * @hideconstructor
 */
class SearchPage extends React.Component {

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
		this.showResult = this.showResult.bind(this);
	}

	/**
	 * @property {Object} state
	 * @property {TBook[]} state.books - List of books resulting from the search
	 * @property {string} state.searchedValue - SearchPage keywords typed by the user in the textfield
	 * @private
	 */
	state = {
		books: []
	};


	async showResult(books) {
		await this.setState({ books });
	}


	/**
	 * @description
 	 * - Shows a textfield in which the user can type keywords to search books.<br>
 	 * - Lists the books resulting from the search undernit the textfield by rendering
	 * the [BooksGrid]{@link BooksGrid} component
	 * @returns {ReactElement}
	 */
	render() {
		const { BOOKS_STATUS } = SearchBar;
		const { books } = this.state;
		const { getBookShelf, updateBookShelf } = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' id="goto-home" className="close-search">Close</Link>
					<SearchBar
						getBookShelf={getBookShelf}
						showResult={this.showResult} />
				</div>

				{books.status === BOOKS_STATUS.ERROR
					? (
						<PanelError />
					)
					: (
						<div className="search-books-results">
							<BooksGrid
								books={books}
								updateBookShelf={updateBookShelf}  />
						</div>
					)}
			</div>
		);
	}
}

export default SearchPage;
