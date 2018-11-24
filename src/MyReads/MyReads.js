import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import { TBook } from '../shared/types';
import { SHELF_TITLE } from '../shared/constants';

 /**
 * @module
 * @name MyReads
 * @extends React.Component
 * @description
 * Displays the 'MyReads' title and shows all the books listed by shelf name.
 */
export default class MyReads extends React.Component {

	/**
	 * @member
	 * @name propTypes
	 * @description Intended types of the props passed to the component
	 * @property {TBook[]} booksInShelves - see [booksInShelves]{@link module:App~state}
	 * @property {function} updateBookShelf - see [updateBookShelf]{@link module:App~updateBookShelf}
	 * @static
	 */
	static propTypes = {
		booksInShelves:	PropTypes.arrayOf(
			PropTypes.shape(TBook).isRequired
		).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};


	/**
	 * @method
	 * @name render
	 * @description
	 * - Iterates the available [SHELF_TITLE]{@link module:constants.SHELF_TITLE}
	 * to list the books in a shelf by rendering the [BookShelf]{@link module:BookShelf} component
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
					})}
				</div>
				<div className="open-search">
					<Link to='/search' id="goto-search">Add a book</Link>
				</div>
			</div>
		);
	}

}
