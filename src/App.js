
import React from 'react'
import { Route } from 'react-router-dom'
import PropsRoute from './PropsRoute'
import BooksList from './BooksList'
import Search from './Search';
import * as BooksAPI from './BooksAPI'
import './App.css'


class App extends React.Component {

	constructor(props) {
		super(props);
		this.updateBook = this.updateBook.bind(this);
		this.getBook = this.getBook.bind(this);
	}

	state = {
		books: []
	};

	componentDidMount() {

		BooksAPI.getAll()
			.then( books => {
				this.setState({
					books
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
		const { books } = this.state;

		return (
			<div>
				<PropsRoute exact path='/' component={BooksList}
					books={books}
					updateBook={this.updateBook}
					getBook={this.getBook} />

				<Route path='/search' component={Search} />
			</div>
		);
	}

}

export default App
