
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropsRoute from './PropsRoute'
import BooksList from './BooksList'
import Search from './Search';
import NotFoundPage from './NotFoundPage'
import * as BooksAPI from './BooksAPI'
import { TShelfKey } from './types'
import './App.css'

/**
 * @class App
 * @extends React.Component
 * @classdesc
 * Keeps the source of truth of all the books contained in the shelves.<br>
 * Defines the routes of the application.
 * @hideconstructor
 */
class App extends React.Component {

	constructor(props) {
		super(props);
		this.updateBookShelf = this.updateBookShelf.bind(this);
		this.getBookShelf = this.getBookShelf.bind(this);
	}


	/**
	 * @property {Object} state
	 * @property {TBook[]} state.booksInShelves - List of all the books present in all the shelves
	 * @private
	 */
	state = {
		booksInShelves: []
	};


	componentDidMount() {
		this.fetchAllBooks();
	}


	/**
	 * @method
	 * @description
	 * Asynchronously retrieves the list of all the books currently in a shelf from remote,
	 * then it stores them internally in the [state]{@link App#state} as booksInShelves collection.
	 * @returns {Promise}
	 * @private
	 */
	async fetchAllBooks() {
		const booksInShelves = await BooksAPI.getAll();

		return new Promise( resolve => {
			this.setState({
				booksInShelves
			}, () => {
				resolve(booksInShelves);
			});
		});
	}


	/**
	 * @description
	 * Updates the remote list of books in the shelves,
	 * then it changes the internal [booksInShelves]{@link App#state}  collection in the state accordingly.
	 * @param {TBook} book - The book the user selected
	 * @param {TShelfKey} shelf - The shelf key the user selected
	 * @returns {void}
	 */
	async updateBookShelf(book, shelf) {
		await BooksAPI.update(book, shelf);

		const { booksInShelves } = this.state;
		let nextBooksInShelves;

		if (shelf === TShelfKey.NONE) {
			// Removing book
			nextBooksInShelves = booksInShelves.filter( ({ id }) => id !== book.id );
		} else {
			const bookIndex = booksInShelves.findIndex( ({ id }) => id === book.id );

			if (bookIndex === -1) {
				// Adding a new book
				book.shelf = shelf;
				nextBooksInShelves = [...booksInShelves, book];
			} else {
				// Moving an existing book to a new shelf
				booksInShelves[bookIndex].shelf = shelf;
				nextBooksInShelves = booksInShelves;
			}
		}

		return new Promise( resolve => {
			this.setState({
				booksInShelves: nextBooksInShelves
			}, () => {
				resolve(nextBooksInShelves);
			});
		});
	}


	/**
	 * @description
	 * Retrieves the current shelf associated with a book, based on a given book id.
	 * If the book is not present in the [booksInShelves]{@link App#state} collection
	 * then the shelf is NONE.
	 * @param {string} bookID - The book id as described in [TBook.id]{@link TBook}
	 * @returns {TShelfKey}
	 */
	getBookShelf(bookID) {
		const { booksInShelves } = this.state;
		const book = booksInShelves.find( ({id}) => id === bookID );
		return book ? book.shelf : TShelfKey.NONE;
	}


	/**
	 * @description
	 * Renders
	 * - [BooksList]{@link BooksList} when the browser path is '/'
	 * - [Search]{@link Search} when the browser path is '/search'
	 * @returns {ReactElement}
	 */
	render() {
		const { booksInShelves } = this.state;

		return (
			<Switch>
				<PropsRoute exact path='/' component={BooksList}
					booksInShelves={booksInShelves}
					updateBookShelf={this.updateBookShelf} />

				<PropsRoute path='/search' component={Search}
					getBookShelf={this.getBookShelf}
					updateBookShelf={this.updateBookShelf} />

				<Route component={NotFoundPage} />
			</Switch>
		);
	}

}

export default App
