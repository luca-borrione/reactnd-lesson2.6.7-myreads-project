
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import { TBook } from './types'

class BooksGrid extends React.Component {

	static propTypes = {
		books:  PropTypes.arrayOf(
					PropTypes.shape(TBook).isRequired
				).isRequired,
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired
	};

	render() {
		const { books, shelves } = this.props;

		return (
			<ol className="books-grid">
				{books.map( (book, index) => (
					<Book
						key={index}
						authors={book.authors}
						shelf={book.shelf}
						shelves={shelves}
						thumbnail={book.thumbnail}
						title={book.title} />
				))}
			</ol>
		);
	}
}


export default BooksGrid
