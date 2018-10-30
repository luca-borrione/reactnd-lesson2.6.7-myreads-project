
import PropTypes from 'prop-types'

/**
 * @typedef {Object} TBook
 * @description
 * Custom type to define a book internally.
 * It's filled with properties coming from the
 * book literal object fetched using the BooksAPI
 * @property {string[]} [authors] - List of the authors names
 * @property {string} id - The book unique id
 * @property {string} [shelf] - The shelf unique name
 * @property {string} [thumbnail] - URL for the cover preview image
 * @property {string} title - The book's title
 */

export const TBook = {
	authors: PropTypes.arrayOf(PropTypes.string.isRequired),
	id: PropTypes.string.isRequired,
	shelf: PropTypes.string,
	thumbnail: PropTypes.string,
	title: PropTypes.string.isRequired
};

