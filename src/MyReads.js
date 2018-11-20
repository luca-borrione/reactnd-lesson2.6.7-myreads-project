import React from 'react';
import PropTypes from 'prop-types'
import { TBook } from './types';
import BooksList from './BooksList';

/**
 * @class MyReads
 * @extends React.Component
 * @classdesc
 * Displays the 'MyReads' title and then either it shows a loader while fetching the books list
 * or it just shows the books list if fetched.
 * @hideconstructor
 */
class MyReads extends React.Component {

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

				<BooksList
					booksInShelves={booksInShelves}
					updateBookShelf={updateBookShelf} />

			</div>
		);
	}

}

export default MyReads;
