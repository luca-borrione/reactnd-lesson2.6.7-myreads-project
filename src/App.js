import React from 'react';
import Navigation from './Navigation';
import BookLoader from './BookLoader';
import PanelError from './PanelError';
import * as BooksAPI from './BooksAPI';
import { TShelfKey } from './shared/types';
import './App.css';
import { ERROR } from './shared/constants';

/**
 * @module
 * @name App
 * @extends React.Component
 * @description
 * When first loaded it automatically fetches all the books in the shelves
 * and it stores them internally as a state.<br>
 * This becomes the source of truth across the different sections of the app.
 */
class App extends React.Component {

	/**
	 * @member
	 * @name STATUS
	 * @description Collection of possible status
	 * @property {string} INITIAL - The app is loading
	 * @property {string} BUSY - The app is remotely updating the books in the shelves
	 * @property {string} READY - Either all the books has been fetched initially
	 * 								or the books has been remotely updated
	 * @property {string} ERROR - An error occurred when tryng to fetch the books or to update them
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
	 * @name state
	 * @property {STATUS} status - one of the possible [STATUS]{@link module:App.STATUS}
	 * @property {TBook[]} booksInShelves - List of all the books present in all the shelves
	 * @private
	 */
	state = {
		status: this.constructor.STATUS.INITIAL,
		booksInShelves: null
	};


	/**
	 * @member
	 * @name async
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
	 * @name fetchAllBooks
	 * @description
	 * Asynchronously retrieves the list of all the books currently in a shelf from remote,
	 * then it stores them internally in the [state]{@link module:App~state} as booksInShelves collection.
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
	 * @method
	 * @name updateBookShelf
	 * @description
	 * Updates the remote list of books in the shelves,
	 * then it changes the internal [booksInShelves]{@link module:App~state} collection in the state accordingly.
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
	 * @method
	 * @name getBookShelf
	 * @description
	 * Retrieves the current shelf associated with a book, based on a given book id.
	 * If the book is not present in the [booksInShelves]{@link module:App~state} collection
	 * the shelf will be NONE.
	 * @param {string} bookID - The book id as described in [TBook.id]{@link module:types.TBook}
	 * @returns {TShelfKey}
	 */
	getBookShelf(bookID) {
		const { booksInShelves } = this.state;
		const book = booksInShelves.find( ({id}) => id === bookID );
		return book ? book.shelf : TShelfKey.NONE;
	}


	/**
	 * @method
	 * @name shouldComponentUpdate
	 * @param {Object} nextProps - ignored as the module does not expect props
	 * @param {state} nextState - refers to [state]{@link module:App~state}
	 * @returns {boolean} - false if status is STATUS.BUSY
	 * @private
	 */
	shouldComponentUpdate(nextProps, nextState) {
		const { STATUS } = this.constructor;
		return nextState.status !== STATUS.BUSY;
	}


	/**
	 * @method
	 * @name render
	 * @description
	 * Renders
	 * - [BookLoader]{@link module:BookLoader} when the status is STATUS.INITIAL
	 * - [Navigation]{@link module:Navigation} when the status is STATUS.READY
	 * - [PanelError]{@link module:PanelError} when the status is STATUS.ERROR
	 * @throws Error for an unexpected status
	 * @returns {ReactElement}
	 * @private
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
