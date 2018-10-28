import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import { makeTitle, ucWords } from './utils/StringUtils'

class Book extends React.Component {

	render() {

		const { book } = this.props;

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{
							width: 128,
							height: 193,
							backgroundImage: 'url('+ book.imageLinks.thumbnail +')'
						}}></div>
						<div className="book-shelf-changer">
							<BookShelfChanger />
						</div>
					</div>
					<div className="book-title">{makeTitle(book.title)}</div>
					<div className="book-authors">
						{book.authors.map( (author, index) => (
							<span className="author" key={index}>{ucWords(author)}</span>
						))}
					</div>
				</div>
			</li>
		);
	}
}

export default Book;
