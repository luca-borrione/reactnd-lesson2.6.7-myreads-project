import React from 'react';
import Navigation from './Navigation';
import * as BooksAPI from './BooksAPI';
import { TShelfKey } from './types';
import './App.css';

/**
 * @class App
 * @extends React.Component
 * @classdesc
 * Keeps the source of truth of all the books contained in the shelves.<br>
 * Defines the routes of the application.
 * @hideconstructor
 */
class App extends React.Component {

	static STATUS = {
		INITIAL: 'STATUS.INITIAL',
		BUSY: 'STATUS.BUSY',
		READY: 'STATUS.READY',
		ERROR: 'STATUS.ERROR'
	};

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
		status: this.constructor.STATUS.INITIAL,
		booksInShelves: []
	};


	async = {
		fetchAllBooks: null
	};


	componentDidMount() {
		this.fetchAllBooks();
		// this.async.mounting = new Promise( async resolve => {
		// 	await this.fetchAllBooks();
		// 	resolve();
		// });
	}


	/**
	 * @method
	 * @description
	 * Asynchronously retrieves the list of all the books currently in a shelf from remote,
	 * then it stores them internally in the [state]{@link App#state} as booksInShelves collection.
	 * @returns {Promise}
	 * @private
	 */
	fetchAllBooks() {
		console.log('||| 2');
		return this.async.fetchAllBooks = new Promise( async resolve => {
			const { STATUS } = this.constructor;
			let booksInShelves = [];

			await this.setState({
				status: STATUS.BUSY,
				booksInShelves
			});

			try {
				booksInShelves = await BooksAPI.getAll();
				await this.setState({
					status: STATUS.READY,
					booksInShelves
				});

			} catch (error) {
				console.error(error);
				await this.setState({
					status: STATUS.ERROR,
					booksInShelves
				});
			}

			resolve(booksInShelves);
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
		const { STATUS } = this.constructor;
		let booksInShelves = [];

		await this.setState({
			status: STATUS.BUSY
		});

		try {
			await BooksAPI.update(book, shelf);

			const { booksInShelves: currBooksInShelves} = this.state;

			if (shelf === TShelfKey.NONE) {
				// Removing book
				booksInShelves = currBooksInShelves.filter( ({ id }) => id !== book.id );
			} else {
				const bookIndex = currBooksInShelves.findIndex( ({ id }) => id === book.id );

				if (bookIndex === -1) {
					// Adding a new book
					book.shelf = shelf;
					booksInShelves = [...currBooksInShelves, book];
				} else {
					// Moving an existing book to a new shelf
					currBooksInShelves[bookIndex].shelf = shelf;
					booksInShelves = currBooksInShelves;
				}
			}


			// await new Promise(resolve => {
			// 	setTimeout(()=>{ console.log('TIMEOUT'); resolve(); }, 10000);
			// });

			await this.setState({
				status: STATUS.READy,
				booksInShelves
			});

		} catch (error) {
			console.error(error);
			await this.setState({
				status: STATUS.ERROR,
				booksInShelves
			});
		}

		return booksInShelves;
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

	shouldComponentUpdate(nextProps, nextState) {
		const { STATUS } = this.constructor;
		return nextState.status !== STATUS.INITIAL;
	}

	/**
	 * @description
	 * Renders
	 * - [BooksList]{@link BooksList} when the browser path is '/'
	 * - [SearchPage]{@link SearchPage} when the browser path is '/search'
	 * @returns {ReactElement}
	 */
	render() {
		const { STATUS } = this.constructor;
		const { booksInShelves, status } = this.state;

		console.log('>> APP RENDERED <<', status);

		if (status === STATUS.ERROR) {

			return (
				<div className="panel-error">Something went wrong. Please try again later.</div>
			);

		} else {

			return (
				<Navigation
					booksInShelves={booksInShelves}
					getBookShelf={this.getBookShelf}
					updateBookShelf={this.updateBookShelf} />
			);

		}
	}

}

export default App;
