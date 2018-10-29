
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BooksGrid extends React.Component {

	static propTypes = {
		bookIDs: PropTypes.arrayOf(
					 PropTypes.string.isRequired
				 ).isRequired,
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
		updateShelf: PropTypes.func.isRequired
	};

	render() {
		const { bookIDs, shelves, updateShelf } = this.props;

		return (
			<ol className="books-grid">
				{bookIDs.map( (bookID, index) => (

					<Book key={index}
						id={bookID}
						shelves={shelves}
						updateShelf={updateShelf} />

				))}
			</ol>
		);
	}
}


export default BooksGrid
