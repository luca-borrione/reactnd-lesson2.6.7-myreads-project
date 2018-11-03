
import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import PropTypes from 'prop-types'
import { TBook } from './types';
import { SHELF_TITLE } from './Constants'

/**
 * @class BooksList
 * @extends React.Component
 * @classdesc
 * Shows all the books listed by shelf title.
 * @hideconstructor
 */
class BooksList extends React.Component {

	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {TBook[]} propTypes.booksInShelves
	 * 	List of all the books in the shelves, stored in the App state [booksInShelves]{@link App#state}
	 * @property {function} propTypes.updateBookShelf
	 * 	Method of the [App]{@link App#updateBookShelf} component for updating the list
	 * 	of books in the shelves
	 * @static
	 */
	static propTypes = {
		booksInShelves:	PropTypes.arrayOf(
							PropTypes.shape(TBook).isRequired
						).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};


	/**
	 * @description
	 * - Iterates the available [shelf titles]{@link Constants.SHELF_TITLE}
	 * to list the books in a shelf by rendering the [BookShelf]{@link BookShelf} component
	 * - Add the plus icon to add new books
	 * @returns {ReactElement}
	 */
	render() {
		const { booksInShelves, updateBookShelf } = this.props;

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{Object.keys(SHELF_TITLE).map( (shelfKey, index) => {
						const booksInShelf = booksInShelves.filter( ({ shelf }) => shelf === shelfKey );
						if (booksInShelf.length > 0) {
							return (

								<BookShelf key={index}
									books={booksInShelf}
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
