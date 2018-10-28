import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
// import * as BooksAPI from './BooksAPI'

class BooksList extends React.Component {

	getShelfIds(books) {
		return [
			...new Set(books.map( book => book.shelf ))
		];
	}

	getBooksInShelf(books, shelf) {
		return books.filter( book => book.shelf === shelf );
	}

	getShelfTitle(shelf) {
		switch (shelf) {

			case 'currentlyReading':
				return 'currently reading';

			case 'wantToRead':
				return 'want to read';

			case 'read':
				return 'read';

			default:
				throw new Error('unexpected shelf id: '+shelf);

		}
	}

	render() {
		const { books } = this.props;

		const shelves = this.getShelfIds(books);

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{shelves.map( (shelf, index) => {
						const booksInShelf = this.getBooksInShelf(books, shelf);
						return (
							<BookShelf key={index}
								title={this.getShelfTitle(shelf)}
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

export default BooksList;