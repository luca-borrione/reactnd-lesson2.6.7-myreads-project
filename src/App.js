
import React from 'react'
import { Route } from 'react-router-dom'
import PropsRoute from './PropsRoute'
import BooksList from './BooksList'
import Search from './Search';
import * as BooksAPI from './BooksAPI'
import './App.css'


class App extends React.Component {

	static AVAILABLE_SHELVES = Object.freeze({
		currentlyReading: 'Currently Reading',
		wantToRead: 'Want to Read',
		read: 'Read'
	});

	constructor(props) {
		super(props);
		this.updateBook = this.updateBook.bind(this);
		this.getBook = this.getBook.bind(this);
	}

	state = {
		booksInShelves: []
	};

	componentDidMount() {

		BooksAPI.getAll()
			.then( booksInShelves => {
				console.log('booksInShelves', booksInShelves);
				this.setState({
					booksInShelves
				});
			});

	}

	updateBook(bookID, shelf) {
		const { books } = this.state.books;

		const bookIndex = books.findIndex( book => book.id === bookID );

		const nextBooks = [...books];
		nextBooks[bookIndex].shelf = shelf;

		this.setState({
			books: nextBooks
		});
	}

	getBook(bookID) {
		return this.state.books.find( book => book.id === bookID );
	}

	render() {
		const { booksInShelves } = this.state;
		const availableShelves = this.constructor.AVAILABLE_SHELVES;

		return (
			<div>
				<PropsRoute exact path='/' component={BooksList}
					availableShelves={availableShelves}
					booksInShelves={booksInShelves}
					updateBook={this.updateBook} />

				<PropsRoute path='/search' component={Search}
					availableShelves={availableShelves} />
			</div>
		);
	}

}

export default App
