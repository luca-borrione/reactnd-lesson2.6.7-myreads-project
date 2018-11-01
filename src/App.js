
import React from 'react'
import PropsRoute from './PropsRoute'
import BooksList from './BooksList'
import Search from './Search';
import * as BooksAPI from './BooksAPI'
import { NO_SHELF } from './Constants'
import './App.css'


class App extends React.Component {

	constructor(props) {
		super(props);
		this.updateBookShelf = this.updateBookShelf.bind(this);
		this.getBookShelf = this.getBookShelf.bind(this);
	}

	state = {
		booksInShelves: []
	};

	componentDidMount() {

		BooksAPI.getAll()
			.then( booksInShelves => {
				this.setState({
					booksInShelves
				});
			});

	}

	updateBookShelf(book, shelf) {

		BooksAPI.update(book, shelf)
			.then( nextBookIDsInShelves => {
				const { booksInShelves } = this.state;

				if (shelf === NO_SHELF) {
					this.removeBook(book);
				} else {
					const bookIndex = booksInShelves.findIndex( ({ id }) => id === book.id );

					if (bookIndex === -1) {
						this.addBookToShelf(book, shelf);
					} else {
						this.moveBookToShelf(booksInShelves[bookIndex], shelf);
					}
				}
			});

	}

	removeBook(book) {
		// Remove existing book
		this.setState( ({ booksInShelves }) => ({
			booksInShelves: booksInShelves.filter( ({ id }) => id !== book.id )
		}));
	}

	addBookToShelf(book, shelf) {
		const { booksInShelves } = this.state;
		const nextBooksInShelves = [...booksInShelves, book];
		book.shelf = shelf;

		this.setState({
			booksInShelves: nextBooksInShelves
		});
	}

	moveBookToShelf(book, shelf) {
		const { booksInShelves } = this.state;
		// Move existing book to a different shelf
		const nextBooksInShelves = [...booksInShelves];
		book.shelf = shelf;

		this.setState({
			booksInShelves: nextBooksInShelves
		});
	}

	getBookShelf(bookID) {
		const { booksInShelves } = this.state;
		const shelf = booksInShelves.find( ({id}) => id === bookID );
		return shelf || NO_SHELF;
	}

	render() {
		const { booksInShelves } = this.state;

		return (
			<div>
				<PropsRoute exact path='/' component={BooksList}
					booksInShelves={booksInShelves}
					updateBookShelf={this.updateBookShelf} />

				<PropsRoute path='/search' component={Search}
					getBookShelf={this.getBookShelf}
					updateBookShelf={this.updateBookShelf} />
			</div>
		);
	}

}

export default App
