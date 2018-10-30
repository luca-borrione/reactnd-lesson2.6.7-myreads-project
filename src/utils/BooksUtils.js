
import { makeTitle } from './StringUtils'
import App from '../App'

/**
 * @namespace BooksUtils
 * @description
 * Provides a set of utility functions that helps dealing
 * with the literal book objects handled in the BooksAPI
 * in a consistent way across the app.
 */

const BooksUtils = {};


/**
 * @memberof BooksUtils
 * @function getShelfTitle
 * @description
 * Returns the title of a shelf, lowercasing the noise words
 * and capitalising the non noise words, based on the shelf id
 * as it appears in the book literal objects fetched using the BooksAPI
 * @param {string} shelf - The shelf unique name
 * @returns {string} The shelf title with the expected text cases
 * @throws {Error} Throws an exception if an unexpected shelf id has been passed
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
