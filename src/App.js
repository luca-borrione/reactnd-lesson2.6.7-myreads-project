import React from 'react';
import Navigation from './Navigation';
import BookLoader from './BookLoader';
import PanelError from './PanelError';
import * as BooksAPI from './BooksAPI';
import { TShelfKey } from './types';
import './App.css';
import { ERROR } from './Constants';

/**
 * @class App
 * @extends React.Component
 * @classdesc
 * When first loaded it automatically fetches all the books in the shelves
 * and it stores them internally as a state.<br>
 * This becomes the source of truth across the different sections of the app.
 * @hideconstructor
 */
class App extends React.Component {

	/**
	 * @enum Status
	 * @description
	 * Collection of possible status
	 * @property {string} INITIAL - STATUS.INITIAL
	 * @property {string} BUSY - STATUS.BUSY
	 * @property {string} READY - STATUS.READY
	 * @property {string} ERROR - STATUS.ERROR
	 * @static
	 */
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
	 * @member
	 * @description
	 * Component state
	 * @property {Status} status
	 * @property {TBook[]} state.booksInShelves - List of all the books present in all the shelves
	 * @private
	 */
	state = {
		status: this.constructor.STATUS.INITIAL,
		booksInShelves: null
	};


	/**
	 * @member
	 * @description
	 * Collection of promises useful when making unit tests.
	 * @property {Promise} fetchAllBooks - waiting for the books in the shelves to be fetched
	 */
	async = {
		fetchAllBooks: null
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
	fetchAllBooks() {
		return this.async.fetchAllBooks = new Promise( async resolve => {
			const { STATUS } = this.constructor;
			let booksInShelves = [];

			try {
				booksInShelves = await BooksAPI.getAll();

				// NOTE: uncomment to test the initial loader animation
				// await new Promise(resolve => {
				// 	setTimeout(()=>{ resolve(); }, 10000);
				// });

				await this.setState({
					status: STATUS.READY,
					booksInShelves
				});

			} catch (error) {
				console.error(error); // NOTE: this is intentional
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
	 * @returns {TBook[]} booksInShelves
	 */
	async updateBookShelf(book, shelf) {
		const { STATUS } = this.constructor;
		const { booksInShelves: currBooksInShelves} = this.state;

		let booksInShelves = [];
		let status = STATUS.BUSY;

		await this.setState({ status });

		try {
			const bookIdsInShelves = await BooksAPI.update(book, shelf);

			switch (shelf) {
				// Removing a book
				case TShelfKey.NONE:
					// Checking that the API actually worked
					const updated = await BooksAPI.get(book.id);
					if (updated.shelf !== shelf) {
						throw new Error(`${ERROR.BOOKS_API_FAILED}: update(${book.id}, ${shelf})`);
					}

					booksInShelves = currBooksInShelves.filter( ({ id }) => id !== book.id );
					break;

				default:
					// Checking that the API actually worked
					if (!bookIdsInShelves[shelf].find( id => id === book.id)) {
						throw new Error(`${ERROR.BOOKS_API_FAILED}: update(${book.id}, ${shelf})`);
					}

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
					break;
			}

			status = STATUS.READY;

		} catch (error) {
			console.error(error);
			status = STATUS.ERROR;
		}

		await this.setState({ status, booksInShelves });

		return booksInShelves;
	}


	/**
	 * @description
	 * Retrieves the current shelf associated with a book, based on a given book id.
	 * If the book is not present in the [booksInShelves]{@link App#state} collection
	 * the shelf will be NONE.
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
		return nextState.status !== STATUS.BUSY;
	}

	/**
	 * @description
	 * Renders
	 * - [BookLoader]{@link BookLoader} when the status is INITIAL
	 * - [Navigation]{@link Navigation} when the status is READY
	 * - [PanelError]{@link PanelError} when the status is ERROR
	 * @throws Error for an unexpected status
	 * @returns {ReactElement}
	 */
	render() {
		const { STATUS } = this.constructor;
		const { booksInShelves, status } = this.state;

		switch (status) {
			case STATUS.INITIAL:
				return <BookLoader />;

			case STATUS.ERROR:
				return <PanelError />;

			case STATUS.READY:
				return <Navigation
							booksInShelves={booksInShelves}
							getBookShelf={this.getBookShelf}
							updateBookShelf={this.updateBookShelf} />;

			default:
				throw new Error(ERROR.UNEXPECTED_STATUS, status);
		}
	}

}

export default App;
