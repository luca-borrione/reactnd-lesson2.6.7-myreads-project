
import { TShelfKey } from './types'

/**
 * @namespace Constants
 */

const Constants = {};


/**
 * @typedef {Object} TShelfTitle
 * @property {TShelfKey} TShelfKey.CURRENTLY_READING - Currently Reading
 * @property {TShelfKey} TShelfKey.WANT_TO_READ - Want to Read
 * @property {TShelfKey} TShelfKey.READ - Read
 * @property {TShelfKey} TShelfKey.NONE - None
 */
/**
 * @memberof Constants
 * @name SHELF_TITLE
 * @type {TShelfTitle}
 * @constant
 */
export const SHELF_TITLE = Constants.SHELF_TITLE = Object.freeze({
	[TShelfKey.CURRENTLY_READING]: 'Currently Reading',
	[TShelfKey.WANT_TO_READ]: 'Want to Read',
	[TShelfKey.READ]: 'Read',
	[TShelfKey.NONE]: 'None',
});


export default Constants
