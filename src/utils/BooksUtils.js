
import { makeTitle } from './StringUtils'

export const getShelves = books => {
	return [
		...new Set(books.map( book => book.shelf ))
	];
};

export const getShelfTitle = shelf => {
	let title;

	switch (shelf) {

		case 'currentlyReading':
			title = 'currently reading';
			break;

		case 'wantToRead':
			title = 'want to read';
			break;

		case 'read':
			title = 'read';
			break;

		default:
			throw new Error('unexpected shelf id: '+shelf);

	}

	return makeTitle(title);
};

export const getBooksInShelf = (books, shelf) => {
	return books.filter( book => book.shelf === shelf );
}