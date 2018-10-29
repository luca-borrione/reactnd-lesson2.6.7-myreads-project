
import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import PropTypes from 'prop-types'


class BooksList extends React.Component {

	static propTypes = {
		booksInShelf: PropTypes.objectOf(
						  PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
					  ).isRequired,

		updateShelf: PropTypes.func.isRequired
	};

	render() {
		const { booksInShelf, updateShelf } = this.props;

		const shelves = Object.keys(booksInShelf);

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
							bookIDs={booksInShelf[shelf]}
							updateShelf={updateShelf} />

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
