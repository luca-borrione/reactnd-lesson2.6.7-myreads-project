import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import PanelError from '../PanelError';
import BooksGrid from '../shared/BooksGrid';
import PropTypes from 'prop-types';

/**
 * @module
 * @name SearchPage
 * @extends React.Component
 * @description
 * Contains the component [SearchBar]{@link module:SearchBar} to perform a search
 * for new books and a Link to navigate back to the [MyReads]{@link module:MyReads} component.
 * If an error has been triggered during the search, it will show the component
 * [PanelError]{@link module:PanelError}, otherwise it will order the books retrieved
 * by the search using the [BooksGrid]{@link module:BooksGrid} component.
 */
class SearchPage extends React.Component {

	/**
	 * @member
	 * @name propTypes
	 * @description Intended types of the props passed to the component
	 * @property {TBook[]} getBookShelf - see [getBookShelf]{@link module:App~getBookShelf}
	 * @property {function} updateBookShelf - see [updateBookShelf]{@link module:App~updateBookShelf}
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
	 * @member
	 * @name state
	 * @property {TBook[]} books - List of the books retrieved by the search
	 * @private
	 */
	state = {
		books: []
	};


	/**
	 * @method
	 * @name showResult
	 * @description Shows the books retrieved by a search
	 * @param {TBook[]} books
	 */
	async showResult(books) {
		await this.setState({ books });
	}


	/**
	 * @method
	 * @name render
	 * @description
	 * Renders
	 * - A Link to navigate back to the [MyReads]{@link module:MyReads} component
	 * - The [SearchBar]{@link module:SearchBar} to perform a search for new books
	 * - The [PanelError]{@link module:PanelError} if an error has been triggered
	 * during the search, or the [BooksGrid]{@link module:BooksGrid} component otherwise.
	 * @returns {ReactElement}
	 * @private
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
