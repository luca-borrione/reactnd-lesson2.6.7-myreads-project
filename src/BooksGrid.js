
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import { TBook } from './types'


class BooksGrid extends React.Component {

	static propTypes = {
		books:	PropTypes.arrayOf(
					PropTypes.shape(TBook).isRequired
				).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};

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
