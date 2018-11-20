import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import { TBook } from './types';
import { diff as ArrayDiff } from './utils/ArrayUtils';

/**
 * @class BooksGrid
 * @extends React.Component
 * @classdesc
 * Prints a list of books
 * @hideconstructor
 */
class BooksGrid extends React.Component {

	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {TBook[]} propTypes.books - List of the books to show
	 * @property {function} propTypes.updateBookShelf
	 * 	Method of the [App]{@link App#updateBookShelf} component for updating the list of books
	 * 	in the shelves
	 * @static
	 */
	static propTypes = {
		books:	PropTypes.arrayOf(
			PropTypes.shape(TBook).isRequired
		).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};

	state = {
		books: []
	};

	// The shelf key coming from the props becomes stored internally as state
	static getDerivedStateFromProps(nextProps, prevState) {
		if (ArrayDiff(prevState.books, nextProps.books).length > 0) {
			return {
				books: nextProps.books
			};
		}
		return null;
	}


	shouldComponentUpdate(nextProps, nextState) {
		return ArrayDiff(this.state.books, nextState.books).length > 0;
	}

	/**
	 * @description
	 * Shows the given list of books by rendering the [Book]{@link Book} component
	 * @returns {ReactElement}
	 */
	render() {
		const { books } = this.state;
		const { updateBookShelf } = this.props;
		return (
			<ol className="books-grid">
				{books.map( (book, index) => (

					<Book key={index}
						book={book}
						updateBookShelf={updateBookShelf} />

				))}
			</ol>
		);
	}
}


export default BooksGrid;
