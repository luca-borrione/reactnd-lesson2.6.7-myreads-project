
import * as data from './allBooks.json'
import { TShelfKey } from '../types'

const DELAY = 250;

const BooksAPI = {};

let allBooks;
export const resetBooks = BooksAPI.resetBooks = () => {
	allBooks = JSON.parse(JSON.stringify(data.books)); // cloning
}
resetBooks();


const getBooksInShelves = () =>
	allBooks.filter( ({ shelf }) => shelf !== TShelfKey.NONE );


export const getAll = BooksAPI.getAll = () => {
	console.log('==> there');
	const booksInShelves = getBooksInShelves();

	return new Promise( resolve => {

		setTimeout(() => {
			resolve(booksInShelves);
		}, DELAY);

	});
};

export const get = BooksAPI.get = bookId => {
	const book = allBooks.find( ({ id }) => id === bookId );

	return new Promise( resolve => {

		setTimeout(() => {
			resolve(book);
		}, DELAY);

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

export const update = BooksAPI.update = (book, shelf) => {
	const existingBook = allBooks.find( ({ id }) => id === book.id );
	existingBook.shelf = shelf;

	const booksInShelves = getBooksInShelves();

	return new Promise( resolve => {

		setTimeout(() => {
			resolve(formatUpdatedBooks(booksInShelves));
		}, DELAY);

	});

};


export default BooksAPI
