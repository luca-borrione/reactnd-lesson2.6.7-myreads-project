
import PropTypes from 'prop-types'

/**
 * @typedef {Object} TBook
 * @description
 * Custom type to define a book internally.
 * It's filled with properties coming from the
 * book literal object fetched using the BooksAPI
 * @property {string[]} [authors] - List of the authors names
 * @property {string} id - The book unique id
 * @property {string} shelf - The shelf unique name
 * @property {string} [thumbnail] - URL for the cover preview image
 * @property {string} title - The book's title
 */

export const TBook = Object.freeze({
	authors: PropTypes.arrayOf(PropTypes.string.isRequired),
	id: PropTypes.string.isRequired,
	shelf: PropTypes.string.isRequired,
	thumbnail: PropTypes.string,
	title: PropTypes.string.isRequired
});

/**
 * @enum TShelfKey
 * @description
 * Collection of shelves keys as they are coming from remote
 * as value of the shelf property of the book literal object
 * when fetching all the books
 * @property {string} CURRENTLY_READING - currentlyReading
 * @property {string} WANT_TO_READ - wantToRead
 * @property {string} RED - read
 * @property {string} NONE - none
 */
export const TShelfKey = Object.freeze({
	CURRENTLY_READING: 'currentlyReading',
	WANT_TO_READ: 'wantToRead',
	READ: 'read',
	NONE: 'none'
});
