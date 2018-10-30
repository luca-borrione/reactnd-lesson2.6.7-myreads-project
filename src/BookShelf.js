
import React from 'react'
import BooksGrid from './BooksGrid'
import { getShelfTitle } from './utils/BooksUtils'
import PropTypes from 'prop-types'


class BookShelf extends React.Component {

	static propTypes = {
		bookIDs:  PropTypes.arrayOf(
					PropTypes.string.isRequired
				).isRequired,
		shelf: PropTypes.string.isRequired,
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
		updateShelf: PropTypes.func.isRequired,
		getBook: PropTypes.func.isRequired
	};

	render() {
		const { bookIDs, shelf, shelves, updateShelf, getBook } = this.props;

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{getShelfTitle(shelf)}</h2>
				<div className="bookshelf-books">
					<BooksGrid
						bookIDs={bookIDs}
						shelf={shelf}
						shelves={shelves}
						updateShelf={updateShelf}
						getBook={getBook} />
				</div>
			</div>
		);
	}

}


export default BookShelf
