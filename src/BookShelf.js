import React from 'react'
import BooksGrid from './BooksGrid';
import { ucWords } from './utils/StringUtils'

class BookShelf extends React.Component {

	render() {

		const { title, books } = this.props;

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{ucWords(title)}</h2>
				<div className="bookshelf-books">
					<BooksGrid books={books}/>
				</div>
			</div>
		);
	}
}

export default BookShelf;
