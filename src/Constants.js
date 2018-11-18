/** @module Constants */

import { TShelfKey } from './types';



/**
 * @typedef {Object} TShelfTitle
 * @property {TShelfKey} TShelfKey.CURRENTLY_READING - Currently Reading
 * @property {TShelfKey} TShelfKey.WANT_TO_READ - Want to Read
 * @property {TShelfKey} TShelfKey.READ - Read
 * @property {TShelfKey} TShelfKey.NONE - None
 */
/**
 * @type {TShelfTitle}
 * @constant
 */
export const SHELF_TITLE = Object.freeze({
	[TShelfKey.CURRENTLY_READING]: 'Currently Reading',
	[TShelfKey.WANT_TO_READ]: 'Want to Read',
	[TShelfKey.READ]: 'Read',
	[TShelfKey.NONE]: 'None',
});

export const ERROR = {
	BOOKS_IN_MULTI_SHELVES: 'the books passed are contained in multiple shelves',
	UNEXPECTED_STATUS: 'unexpected status'
};
