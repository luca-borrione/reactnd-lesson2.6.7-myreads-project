
import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {

	static propTypes = {
		availableShelves: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.moveBookToShelf = this.moveBookToShelf.bind(this);
	}

	state = {
		books: [],
		value: ''
	};

	onChange(event) {
		this.setState({
			value: event.target.value
		}, () => {
			BooksAPI.search(this.state.value, 20)
				.then( books => {
					console.log('>> ** searched', books);
					if (books.error) {
						books = books.items;
					}
					this.setState({
						books
					});
				});
		});
	}

	moveBookToShelf(book, shelf) {
		console.log('>> moving: ', book, shelf);
	}

	render() {
		const { books, value } = this.state;
		const { availableShelves } = this.props;

		console.log('>> BOOKS', books);

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
					{/*
						NOTES: The search from BooksAPI is limited to a particular set of search terms.
						You can find these search terms here:
						https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

						However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
						you don't find a specific author or title. Every search is limited by search terms.
					*/}
					<input type="text" placeholder="Search by title or author"
						value={value}
						onChange={this.onChange} />

					</div>
				</div>
				<div className="search-books-results">

					<BooksGrid
						books={books}
						availableShelves={availableShelves}
						moveBookToShelf={this.moveBookToShelf}  />

				</div>
			</div>
		);
	}
}

export default Search;