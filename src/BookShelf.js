
import React from 'react'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'
import { TBook } from './types'


class BookShelf extends React.Component {

	static propTypes = {
		books:	PropTypes.arrayOf(
					PropTypes.shape(TBook).isRequired
				).isRequired,
		shelfTitle: PropTypes.string.isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};

	render() {
		const { books, shelfTitle, updateBookShelf } = this.props;

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<div className="bookshelf-books">

					<BooksGrid
						books={books}
						updateBookShelf={updateBookShelf} />

				</div>
			</div>
		);
	}

}


export default BookShelf
