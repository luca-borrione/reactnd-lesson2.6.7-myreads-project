import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import { makeTitle, ucwords } from '../utils/StringUtils';
import PropTypes from 'prop-types';
import { TBook } from './types';


/**
 * @module
 * @name Book
 * @extends React.Component
 * @description Displays the book's preview
 */
class Book extends React.Component {

	/**
	 * @member
	 * @name propTypes
	 * @description Intended types of the props passed to the component
	 * @property {TBook} book - The book to show
	 * @property {function} updateBookShelf - see [updateBookShelf]{@link module:App~updateBookShelf}
	 * @static
	 */
	static propTypes = {
		book: PropTypes.shape(TBook).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};


	/**
	 * @method
	 * @name render
	 * @description
	 * Shows a preview of the book and displays a selection to change shelf by rendering
	 * the [BookShelfChanger]{@link module:BookShelfChanger} component
	 * @returns {ReactElement}
	 * @private
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

						<BookShelfChanger
							key={`${book.id}-changer`}
							book={book}
							updateBookShelf={updateBookShelf} />

					</div>
					<div className="book-title">{makeTitle(book.title)}</div>
					<div className="book-authors">
						{(book.authors || []).map( (author, index) => (
							<span className="author" key={index}>{ucwords(author)}</span>
						))}
					</div>
				</div>
			</li>
		);
	}
}


export default Book;
