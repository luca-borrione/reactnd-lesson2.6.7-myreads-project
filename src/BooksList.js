
import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import { getShelves, getBooksInShelf } from './utils/BooksUtils'
import PropTypes from 'prop-types'
import { TBook } from './types'


class BooksList extends React.Component {

	static propTypes = {
		books:  PropTypes.arrayOf(
					PropTypes.shape(TBook).isRequired
				).isRequired
	};

	render() {
		const { books } = this.props;

		const shelves = getShelves(books);

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{shelves.map( (shelf, index) => {
						const booksInShelf = getBooksInShelf(books, shelf);
						return (
							<BookShelf key={index}
								shelf={shelf}
								shelves={shelves}
								books={booksInShelf} />
						)})}
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		);
	}

}


export default BooksList
