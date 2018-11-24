import { TShelfKey } from './types';

/**
 * @module
 * @name constants
 * @description
 * Provides a set of constants to be used in different components.
 */


/**
 * @member
 * @description
 * Dictionary of shelf labels
 * see [TShelfKey]{@link module:types.TShelfKey}
 * @type {Object.<TShelfKey, string>}
 * @property {TShelfKey} CURRENTLY_READING - Currently Reading
 * @property {TShelfKey} WANT_TO_READ - Want to Read
 * @property {TShelfKey} READ - Read
 * @property {TShelfKey} NONE - None
 * @constant
 */
export const SHELF_TITLE = Object.freeze({
	[TShelfKey.CURRENTLY_READING]: 'Currently Reading',
	[TShelfKey.WANT_TO_READ]: 'Want to Read',
	[TShelfKey.READ]: 'Read',
	[TShelfKey.NONE]: 'None',
});

export const ERROR = {
	BOOKS_API_FAILED: 'unexpected result from BooksAPI',
	BOOKS_IN_MULTI_SHELVES: 'the books passed are contained in multiple shelves',
	UNEXPECTED_STATUS: 'unexpected status'
};
