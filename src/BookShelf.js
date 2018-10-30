
import React from 'react'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'
import { TBook } from './types'


class BookShelf extends React.Component {

	static propTypes = {
		books:	PropTypes.arrayOf(
					PropTypes.shape({
						...TBook,
						shelf: PropTypes.string.isRequired
					}),
				).isRequired,
		shelfTitle: PropTypes.string.isRequired,
		availableShelves: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
		updateShelf: PropTypes.func.isRequired
	};

	render() {
		const { books, shelfTitle, availableShelves, updateShelf } = this.props;

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<div className="bookshelf-books">

					<BooksGrid
						books={books}
						availableShelves={availableShelves}
						moveBookToShelf={updateShelf} />

				</div>
			</div>
		);
	}

}


export default BookShelf
