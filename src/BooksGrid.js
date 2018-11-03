
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import { TBook } from './types'

/**
 * @class BooksGrid
 * @extends React.Component
 * @classdesc
 * Prints a list of books
 * @hideconstructor
 */
class BooksGrid extends React.Component {

	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {TBook[]} propTypes.books - List of the books to show
	 * @property {function} propTypes.updateBookShelf
	 * 	Method of the [App]{@link App#updateBookShelf} component for updating the list of books
	 * 	in the shelves
	 * @static
	 */
	static propTypes = {
		books:	PropTypes.arrayOf(
					PropTypes.shape(TBook).isRequired
				).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};

	/**
	 * @description
	 * Shows the given list of books by rendering the [Book]{@link Book} component
	 * @returns {ReactElement}
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


export default BooksGrid
