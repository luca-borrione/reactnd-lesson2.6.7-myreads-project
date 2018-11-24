import React from 'react';

/**
 * @module
 * @name BookLoader
 * @description
 * Shows a flipping book as loader animation.
 */
const BookLoader = () => {
	return (
		<div className="book-loader">
			<div className="book-page"></div>
			<div className="book-page"></div>
			<div className="book-page"></div>
		</div>
	);
};

export default BookLoader;
