
import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'


class BooksList extends React.Component {

	static propTypes = {
		books:  PropTypes.arrayOf(
					PropTypes.shape({
						id: PropTypes.string.isRequired,
						shelf: PropTypes.string.isRequired
			 		 }),
				).isRequired,
		updateBook: PropTypes.func.isRequired,
		getBook: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.updateShelf = this.updateShelf.bind(this);
	}

	static getDerivedStateFromProps(nextProps) {
		const books = nextProps.books;
		const bookIDsInShelf = {};

		books.forEach( book => {
			bookIDsInShelf[book.shelf] = [
				...(bookIDsInShelf[book.shelf] || []),
				book.id
			];
		});

		return {
			bookIDsInShelf: bookIDsInShelf
		}
	}

	state = {
		bookIDsInShelf: {}
	}

	updateShelf(bookID, shelf) {
		const { getBook, updateBook } = this.props;
		const book = getBook(bookID);

		BooksAPI.update(book, shelf)
			.then( bookIDsInShelf => {
				this.setState(() => ({
					bookIDsInShelf
				}), () => {
					updateBook(bookID, shelf);
				});
			});

	}

	render() {
		const { bookIDsInShelf } = this.state;
		const { getBook } = this.props;

		const shelves = Object.keys(bookIDsInShelf);

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{shelves.map( (shelf, index) => (

						<BookShelf key={index}
							shelf={shelf}
							shelves={shelves}
							bookIDs={bookIDsInShelf[shelf]}
							updateShelf={this.updateShelf}
							getBook={getBook} />

					))}
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		);
	}

}


export default BooksList
