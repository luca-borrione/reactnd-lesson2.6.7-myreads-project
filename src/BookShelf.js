
import React from 'react'
import BooksGrid from './BooksGrid'
import { getShelfTitle } from './utils/BooksUtils'
import PropTypes from 'prop-types'
import { TBook } from './types'


class BookShelf extends React.Component {

	static propTypes = {
		books:  PropTypes.arrayOf(
					PropTypes.shape(TBook).isRequired
				).isRequired,
		shelf: PropTypes.string.isRequired,
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired
	};

	render() {
		const { books, shelf, shelves } = this.props;

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{getShelfTitle(shelf)}</h2>
				<div className="bookshelf-books">
					<BooksGrid
						books={books.filter( book => book.shelf === shelf )}
						shelf={shelf}
						shelves={shelves} />
				</div>
			</div>
		);
	}

}


export default BookShelf
