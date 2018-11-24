import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import { TBook } from './types';
import { diff as ArrayDiff} from '../utils/ArrayUtils';

/**
 * @module
 * @name BooksGrid
 * @extends React.Component
 * @description
 * Prints a list of books.
 * This module is used both in MyReads to show the books for each shelf,
 * and in the SearchPage to show the books retrieved by a search.
 */
class BooksGrid extends React.Component {

	/**
	 * @member
	 * @name propTypes
	 * @description Intended types of the props passed to the component
	 * @property {TBook[]} books - List of the books to show
	 * @property {function} updateBookShelf - see [updateBookShelf]{@link module:App~updateBookShelf}
	 * @static
	 */
	static propTypes = {
		books: PropTypes.arrayOf(
			PropTypes.shape(TBook).isRequired
		).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};

	/**
	 * @method
	 * @name shouldComponentUpdate
	 * @param {Object} nextProps - ignored as the module does not expect props
	 * @param {TBook[]} nextProps.books - foo
	 * @returns {boolean} - false if the books to show don't change
	 * @private
	 */
	shouldComponentUpdate(nextProps) {
		return ArrayDiff(this.props.books, nextProps.books).length > 0;
	}


	/**
	 * @method
	 * @name render
	 * @description
	 * Renders the [Book]{@link module:Book} component for each book in the given books list
	 * @returns {ReactElement}
	 * @private
	 */
	render() {
		const { books, updateBookShelf } = this.props;
		return (
			<ol className="books-grid">
				{books.map( (book, index) => (

					<Book key={index}
						book={book}
						updateBookShelf={updateBookShelf} />

				))}
			</ol>
		);
	}
}


export default BooksGrid;
