import React from 'react';
import BooksGrid from '../shared/BooksGrid';
import PropTypes from 'prop-types';
import { TBook } from '../shared/types';
import { ERROR, SHELF_TITLE } from '../shared/constants';

/**
 * @module
 * @name BookShelf
 * @extends React.Component
 * @description
 * Prints the shelf title and shows the list of all the books in the shelf
 */
class BookShelf extends React.Component {

	/**
	 * @member
	 * @name propTypes
	 * @description Intended types of the props passed to the component
	 * @property {TBook[]} books - List of all the books in the shelf
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
	 * @name render
	 * @description
	 * - Prints the shelf's title
	 * - Shows the list of books in the shelf by rendering the [BooksGrid]{@link module:BooksGrid} component
	 * @returns {ReactElement}
	 * @throws {Error} if the books passed to the component are contained in multiple shelves an exception will be thrown
	 */
	render() {
		const { books, updateBookShelf } = this.props;

		const shelfKeys = [
			...new Set(books.map( book => book.shelf ))
		];

		if (shelfKeys.length > 1) {
			throw new Error(ERROR.BOOKS_IN_MULTI_SHELVES, shelfKeys);
		}
		const shelfTitle = SHELF_TITLE[shelfKeys[0]];

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<div className="bookshelf-books">

					<BooksGrid
						books={books}
						updateBookShelf={updateBookShelf} />

				</div>
			</div>
		);
	}

}


export default BookShelf;
