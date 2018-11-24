import * as data from './allBooks.json'
import { TShelfKey } from '../shared/types'

const DELAY = 10;

const getDelay = () => DELAY * (Math.floor(Math.random() * 10) + 1); // random between 1 - 10

export const MOCKED = true;

let allBooks;
export const __resetBooks = () => {
	allBooks = JSON.parse(JSON.stringify(data.books)); // cloning
};
__resetBooks();

const getBooksInShelves = () =>
	allBooks.filter( ({ shelf }) => shelf !== TShelfKey.NONE );


export const getAll = () => {
	const booksInShelves = getBooksInShelves();
	return new Promise( resolve => {
		const delay = getDelay();
		setTimeout(() => {
			resolve(booksInShelves);
		}, delay);
	});
};

export const get = bookId => {
	const book = allBooks.find( ({ id }) => id === bookId );
	return new Promise( resolve => {
		const delay = getDelay();
		setTimeout(() => {
			resolve(book);
		}, delay);
	});
};

const formatUpdatedBooks = (books) => {
	const fBooks = {};

	Object.keys(TShelfKey).forEach( key => {
		const shelfKey = TShelfKey[key];
		if (shelfKey !== TShelfKey.NONE) {
			fBooks[shelfKey] = books
							.filter( ({ shelf }) => shelf === shelfKey )
							.map( book => book.id );
		}
	});

	return fBooks
};

export const update = (book, shelf) => {
	const existingBook = allBooks.find( ({ id }) => id === book.id );
	existingBook.shelf = shelf;
	const booksInShelves = getBooksInShelves();
	return new Promise( resolve => {
		const delay = getDelay();
		setTimeout(() => {
			resolve(formatUpdatedBooks(booksInShelves));
		}, delay);
	});
};

export const search = (query, maxResults) => {
	const re = new RegExp(`^${query}`, 'i');
	const result = allBooks.filter( ({ title, authors }) => {
		return re.test(title);
	})
	.slice(0, maxResults);

	return new Promise( resolve => {
		const delay = getDelay();
		setTimeout(() => {
			resolve(result);
		}, delay);
	});
};

