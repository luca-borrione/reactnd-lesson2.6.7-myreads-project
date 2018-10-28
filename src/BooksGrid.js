import React from 'react'
import Book from './Book'

class BooksGrid extends React.Component {

	render() {

		const { books } = this.props;

		return (
			<ol className="books-grid">
				{books.map( (book, index) => (
					<Book key={index} />
				))}
			</ol>
		);
	}
}

export default BooksGrid;
