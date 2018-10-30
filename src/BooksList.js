
import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { TBook } from './types';


class BooksList extends React.Component {

	static propTypes = {
		booksInShelves:	PropTypes.arrayOf(
							PropTypes.shape({
								...TBook,
								shelf: PropTypes.string.isRequired
			 		 		}),
						).isRequired,
		updateBook: PropTypes.func.isRequired,
		availableShelves: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
	};

	constructor(props) {
		super(props);
		this.updateShelf = this.updateShelf.bind(this);
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

	getBooksInShelf(shelf) {
		return this.props.booksInShelves.map( book => book.shelf === shelf );
	}

	render() {
		const { availableShelves, getBook } = this.props;

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{Object.entries(availableShelves).map( ([ shelfID, shelfTitle ], index) => {
						const booksInShelf = this.props.booksInShelves.filter( book => book.shelf === shelfID );

						return (
							<BookShelf key={index}
								shelfTitle={shelfTitle}
								availableShelves={availableShelves}
								books={booksInShelf}
								updateShelf={this.updateShelf} />

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
