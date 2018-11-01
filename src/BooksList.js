
import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import PropTypes from 'prop-types'
import { TBook } from './types';
import { AVAILABLE_SHELVES } from './Constants'


class BooksList extends React.Component {

	static propTypes = {
		booksInShelves:	PropTypes.arrayOf(
							PropTypes.shape(TBook).isRequired
						).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};

	render() {
		const { booksInShelves, updateBookShelf } = this.props;

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{Object.entries(AVAILABLE_SHELVES).map( ([ shelfID, shelfTitle ], index) => {
						const booksInShelf = booksInShelves.filter( ({ shelf }) => shelf === shelfID );
						if (booksInShelf.length > 0) {
							return (

								<BookShelf key={index}
									books={booksInShelf}
									shelfTitle={shelfTitle}
									updateBookShelf={updateBookShelf} />

							)
						}
						return null;
					})};
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		);
	}

}


export default BooksList
