import React from 'react';
import PropTypes from 'prop-types';
import { SHELF_TITLE } from './Constants';
import { TBook } from './types';

/**
 * @class BookShelfChanger
 * @extends React.Component
 * @classdesc
 * Shows a selection to change the shelf of the book
 * @hideconstructor
 */
class BookShelfChanger extends React.Component {

	/**
	 * @property {Object} propTypes - Intended types passed to the component
	 * @property {TShelfKey} shelf - The shelf key currently associated with the book
	 * @property {function} propTypes.onShelfChange - method of the parent [Book]{@link Book} component which handles a new shelf value
	 * @static
	 */
	static propTypes = {
		book: PropTypes.shape(TBook).isRequired,
		updateBookShelf: PropTypes.func.isRequired
	};


	constructor(props) {
		super(props);
		this.onSelectChange = this.onSelectChange.bind(this);
	}


	/**
	 * @property {Object} state
	 * @property {TShelfKey} state.selectedValue - Shelf key associated with the current selection
	 * @private
	 */
	state = {
		selectedValue: ''
	};


	// The shelf key coming from the props becomes stored internally as state
	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.selectedValue === '') {
			return {
				selectedValue: nextProps.book.shelf
			};
		}
		return null;
	}


	/**
	 * @description
	 * Handles the change event of the user selection.<br>
	 * Firstly it updates the internal state, then it triggers the
	 * [updateBookShelf]{@link App#updateBookShelf} method of the App component
	 * to update the list of books in the shelves
	 * @param {SyntheticEvent} event
	 * @returns {void}
	 */
	onSelectChange(event) {
		const { book, updateBookShelf } = this.props;

		this.setState({
			selectedValue: event.target.value
		}, () => {
			updateBookShelf(book, this.state.selectedValue);
		});
	}


	/**
	 * @description
	 * Creates the selection containing all the available shelves.
	 * @returns {ReactElement}
	 */
	render() {
		return (
			<select value={this.state.selectedValue} onChange={this.onSelectChange}>
				<option value="move" disabled>Move to...</option>
				{Object.entries(SHELF_TITLE).map( ([ shelfKey, shelfTitle ], index) => (
					<option key={index} value={shelfKey}>{shelfTitle}</option>
				))}
			</select>
		);
	}
}


export default BookShelfChanger;
