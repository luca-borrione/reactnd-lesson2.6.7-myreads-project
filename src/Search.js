
import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash.debounce'

class Search extends React.Component {

	static propTypes = {
		updateBookShelf: PropTypes.func.isRequired,
		getBookShelf: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.onSearchTyping = this.onSearchTyping.bind(this);
		this.search = debounce(this.search, 250);
	}

	state = {
		books: [],
		searchedValue: ''
	};

	resetSearch() {
		this.setState({
			books: []
		});
	}

	search(query) {
		const { getBookShelf } = this.props;
		if (query === '') {
			this.resetSearch();
		} else {
			BooksAPI.search(query, 20)
				.then( books => {
					if (!books || books.error) {
						this.resetSearch();
					} else {
						this.setState({
							books:	books.map( book => {
										book.shelf = getBookShelf(book.id);
										return book;
									})
						});
					}
				});
		}
	}

	onSearchTyping(event) {
		this.setState({
			searchedValue: event.target.value
		}, () => {
			this.search(this.state.searchedValue);
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
							onChange={this.onSearchTyping} />

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