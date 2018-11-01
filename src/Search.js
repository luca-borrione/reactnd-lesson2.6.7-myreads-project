
import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {

	static propTypes = {
		updateBookShelf: PropTypes.func.isRequired,
		getShelf: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	state = {
		books: [],
		searchedValue: ''
	};

	onSearchChange(event) {
		this.setState({
			searchedValue: event.target.value
		}, () => {
			BooksAPI.search(this.state.searchedValue, 20)
				.then( books => {
					if (!books || books.error) {
						books = [];
					}
					this.setState({
						books: books.map( book => {
							book.shelf = this.props.getShelf(book.id);
							return book;
						})
					});
				});
		});
	}

	render() {
		const { books, searchedValue } = this.state;
		const { updateBookShelf } = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author"
							value={searchedValue}
							onChange={this.onSearchChange} />

					</div>
				</div>
				<div className="search-books-results">

					<BooksGrid
						books={books}
						updateBookShelf={updateBookShelf}  />

				</div>
			</div>
		);
	}
}

export default Search;