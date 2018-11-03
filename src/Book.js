
import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import { makeTitle, ucWords } from './utils/StringUtils'
import PropTypes from 'prop-types'
import { TBook } from './types'

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


	constructor(props) {
		super(props);
		this.onShelfChange = this.onShelfChange.bind(this);
	}

	/**
	 * @description
	 * Handles the change event of the selection in the [BookShelfChanger](@link BookShelfChanger) component<br>
	 * Triggers the [updateBookShelf]{@link App#updateBookShelf} method of the App component
	 * to update the list of books in the shelves
	 * @param {TShelfKey} shelf - The shelf key associated with the user selection
	 * @return {void}
	 */
	onShelfChange(shelf) {
		const { book, updateBookShelf } = this.props;
		updateBookShelf(book, shelf);
	}

	/**
	 * @description
	 * Shows a preview of the book and displays a selection to change shelf by rendering
	 * the [BookShelfChanger]{@link BookShelfChanger} component
	 * @returns {ReactElement}
	 */
	render() {
		const { book } = this.props;
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
								shelf={book.shelf}
								onShelfChange={this.onShelfChange} />

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
