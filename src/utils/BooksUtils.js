
/**
 * @namespace BooksUtils
 * @description
 * Provides a set of utility functions that helps dealing
 * with the literal book objects handled in the BooksAPI
 * in a consistent way across the app.
 */

import { makeTitle } from './StringUtils'

const BooksUtils = {};


/**
 * @memberof BooksUtils
 * @function getShelves
 * @description
 * Returns a list of unique shelf ids as they are stored
 * in a given list of book objects fetched using the BooksAPI
 * @param {Object[]} books - a list of literal book objects
 * @param {string} books[].shelf - the shelf id as it comes from the BooksAPI
 * @returns {Array.<string>} - list of unique shelf ids
 *
 * @example
 * const books = [{shelf: 'currentlyReading'},
 * 				  {shelf: 'currentlyReading'},
 * 				  {shelf: 'wantToRead'},
 * 				  {shelf: 'wantToRead'},
 * 				  {shelf: 'wantToRead'}];
 *
 * // returns: ['currentlyReading', 'wantToRead']
 * const shelves = getShelves(books);
 */
export const getShelves = BooksUtils.getShelves = books => {
	return [
		...new Set(books.map( book => book.shelf ))
	];
};


/**
 * @memberof BooksUtils
 * @function getShelfTitle
 * @description
 * Returns the title of a shelf, lowercasing the noise words
 * and capitalising the non noise words, based on the shelf id
 * as it appears in the book literal objects fetched using the BooksAPI
 * @param {string} shelf - the shelf id
 * @returns {string} - the shelf title with the expected text cases
 * @throws {Error} - throws an exception if an unexpected shelf id has been passed
 *
 * @example
 * // returns: Want to Read
 * const title = getShelfTitle('wantToRead');
 */
export const getShelfTitle = BooksUtils.getShelfTitle = shelf => {
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


export default BooksUtils