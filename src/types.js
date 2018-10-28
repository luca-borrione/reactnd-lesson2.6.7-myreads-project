import PropTypes from 'prop-types'

export const TBook = {
	authors: PropTypes.arrayOf(PropTypes.string).isRequired,
	shelf: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};
