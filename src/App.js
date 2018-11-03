
import React from 'react'
import PropsRoute from './PropsRoute'
import BooksList from './BooksList'
import Search from './Search';
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
	 * Retrieves the list of all the books currently in a shelf from remote
	 * @returns {void}
	 * @private
	 */
	fetchAllBooks() {
		BooksAPI.getAll()
			.then( booksInShelves => {
				this.setState({
					booksInShelves
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
	updateBookShelf(book, shelf) {

		BooksAPI.update(book, shelf)
			.then( nextBookIDsInShelves => {
				const { booksInShelves } = this.state;

				if (shelf === TShelfKey.NONE) {
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


	/**
	 * @description
	 * Updates the internal state so that an existing given book is removed
	 * from the [booksInShelves]{@link App#state} collection.
	 * @link {state.booksInShelves}
	 * @param {TBook} book - The book the user selected
	 * @returns {void}
	 * @private
	 */
	removeBook(book) {
		this.setState( ({ booksInShelves }) => ({
			booksInShelves: booksInShelves.filter( ({ id }) => id !== book.id )
		}));
	}


	/**
	 * @description
	 * Updates the internal state so that a new given book
	 * is added to the [booksInShelves]{@link App#state} collection
	 * as associated to a given shelf
	 * @param {TBook} book - The book the user selected
	 * @param {TShelfKey} shelf - The shelf key the user selected
	 * @returns {void}
	 * @private
	 */
	addBookToShelf(book, shelf) {
		const { booksInShelves } = this.state;
		const nextBooksInShelves = [...booksInShelves, book];
		book.shelf = shelf;

		this.setState({
			booksInShelves: nextBooksInShelves
		});
	}


	/**
	 * @description
	 * Updates the internal state so that a given book
	 * already present in the [booksInShelves]{@link App#state} collection
	 * is moved to a new shelf
	 * @param {TBook} book - The book the user selected
	 * @param {TShelfKey} shelf - The shelf key the user selected
	 * @returns {void}
	 * @private
	 */
	moveBookToShelf(book, shelf) {
		const { booksInShelves } = this.state;
		const nextBooksInShelves = [...booksInShelves];
		book.shelf = shelf;

		this.setState({
			booksInShelves: nextBooksInShelves
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
		const shelf = booksInShelves.find( ({id}) => id === bookID );
		return shelf || TShelfKey.NONE;
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
