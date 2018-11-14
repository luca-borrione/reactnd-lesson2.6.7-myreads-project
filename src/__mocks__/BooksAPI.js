import * as data from './allBooks.json'
import { TShelfKey } from '../types'

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
	console.log('==> there getAll');
	const booksInShelves = getBooksInShelves();

	return new Promise( resolve => {
		const delay = getDelay();
		console.log('delay: '+delay);

		setTimeout(() => {
			resolve(booksInShelves);
		}, delay);

	});
};

export const get = bookId => {
	console.log('==> there get');
	const book = allBooks.find( ({ id }) => id === bookId );

	return new Promise( resolve => {
		const delay = getDelay();
		console.log('delay: '+delay);

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
	console.log('==> there update');
	const existingBook = allBooks.find( ({ id }) => id === book.id );
	existingBook.shelf = shelf;

	const booksInShelves = getBooksInShelves();

	return new Promise( resolve => {
		const delay = getDelay();
		console.log('delay: '+delay);

		setTimeout(() => {
			resolve(formatUpdatedBooks(booksInShelves));
		}, delay);

	});

};

export const search = (query, maxResults) => {
	console.log('==> there search');
	const re = new RegExp(`^${query}`, 'i');
	const result = allBooks.filter( ({ title, authors }) => {
		return re.test(title);
	})
	.slice(0, maxResults);

	return new Promise( resolve => {
		const delay = getDelay();
		console.log('delay: '+delay);

		setTimeout(() => {
			resolve(result);
		}, delay);

	});

	// console.log(result);
	// existingBook.shelf = shelf;

	// const booksInShelves = getBooksInShelves();

	// return new Promise( resolve => {
	// 	const delay = getDelay();
	// 	console.log('delay: '+delay);

	// 	setTimeout(() => {
	// 		resolve(formatUpdatedBooks(booksInShelves));
	// 	}, delay);

	// });

};


export const search1 = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)

