
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import { TBook } from './types'


class BooksGrid extends React.Component {

	static propTypes = {
		books:	PropTypes.arrayOf(
					PropTypes.shape(TBook).isRequired
				).isRequired,
		moveBookToShelf: PropTypes.func.isRequired,
		availableShelves: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
	};

	render() {
		const { books, moveBookToShelf, availableShelves } = this.props;

		return (
			<ol className="books-grid">
				{books.map( (book, index) => (

					<Book key={index}
						book={book}
						availableShelves={availableShelves}
						moveBookToShelf={moveBookToShelf} />

				))}
			</ol>
		);
	}
}


export default BooksGrid
