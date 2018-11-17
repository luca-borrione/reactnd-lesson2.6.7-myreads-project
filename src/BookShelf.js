import React from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';
import { TBook } from './types';
import { ERROR, SHELF_TITLE } from './Constants';

/**
 * @class BookShelf
 * @extends React.Component
 * @classdesc
 * Prints the shelf title and shows the list of all the books in the shelf
 * @hideconstructor
 */
class BookShelf extends React.Component {

	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {TBook[]} propTypes.books - List of all the books in the shelf
	 * @property {function} propTypes.updateBookShelf
	 * 	Method of the [App]{@link App#updateBookShelf} component for updating the list of books
	 * 	in the shelves
	 * @static
	 */
	static propTypes = {
		books: PropTypes.arrayOf(
			PropTypes.shape(TBook).isRequired
		).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};


	/**
	 * @description
	 * - Prints the shelf's title
	 * - Shows the list of books in the shelf by rendering the [BooksGrid]{@link BooksGrid} component
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
