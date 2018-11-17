import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import { makeTitle, ucWords } from './utils/StringUtils';
import PropTypes from 'prop-types';
import { TBook } from './types';

/**
 * @class Book
 * @extends React.Component
 * @classdesc
 * Prints the preview of a book
 * @hideconstructor
 */
class Book extends React.Component {

	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {TBook} propTypes.book - Book literal object to show
	 * @property {function} propTypes.updateBookShelf - Method of the [App]{@link App#updateBookShelf} component for updating the list of books in the shelves
	 * @static
	 */
	static propTypes = {
		book: PropTypes.shape(TBook).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};


	/**
	 * @description
	 * Shows a preview of the book and displays a selection to change shelf by rendering
	 * the [BookShelfChanger]{@link BookShelfChanger} component
	 * @returns {ReactElement}
	 */
	render() {
		const { book, updateBookShelf } = this.props;
		let thumbnail = 'https://books.google.co.uk/googlebooks/images/no_cover_thumb.gif';
		if (book.imageLinks && book.imageLinks.thumbnail) {
			thumbnail = book.imageLinks.thumbnail;
		}

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{
							width: 128,
							height: 193,
							backgroundSize: 'cover',
							backgroundImage: 'url('+ thumbnail +')'
						}}></div>
						<div className="book-shelf-changer">

							<BookShelfChanger
								key={`${book.id}-changer`}
								book={book}
								updateBookShelf={updateBookShelf} />

						</div>
					</div>
					<div className="book-title">{makeTitle(book.title)}</div>
					<div className="book-authors">
						{(book.authors || []).map( (author, index) => (
							<span className="author" key={index}>{ucWords(author)}</span>
						))}
					</div>
				</div>
			</li>
		);
	}
}


export default Book;
