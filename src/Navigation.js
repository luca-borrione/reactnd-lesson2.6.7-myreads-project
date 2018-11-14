import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import PropsRoute from './PropsRoute';
import BooksList from './BooksList';
import SearchPage from './SearchPage';
import NotFoundPage from './NotFoundPage';
import { TBook } from './types';


const Navigation = props => {

	const { booksInShelves, getBookShelf, updateBookShelf} = props;

	return (
		<Switch>
			<PropsRoute exact path='/' component={BooksList}
				booksInShelves={booksInShelves}
				updateBookShelf={updateBookShelf} />

			<PropsRoute path='/search' component={SearchPage}
				getBookShelf={getBookShelf}
				updateBookShelf={updateBookShelf} />

			<Route component={NotFoundPage} />
		</Switch>
	);

};

Navigation.propTypes = {
	booksInShelves:	PropTypes.arrayOf(
		PropTypes.shape(TBook).isRequired
	).isRequired,
	getBookShelf: PropTypes.func.isRequired,
	updateBookShelf: PropTypes.func.isRequired
};

export default Navigation;
