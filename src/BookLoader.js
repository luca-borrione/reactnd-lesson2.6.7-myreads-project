import React from 'react';

const BookLoader = () => {
	console.log('>> BookLoader RENDERED');
	return (
		<div className="book-loader">
			<div className="book-page"></div>
			<div className="book-page"></div>
			<div className="book-page"></div>
		</div>
	);

};

export default BookLoader;
