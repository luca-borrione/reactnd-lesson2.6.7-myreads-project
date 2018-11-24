import React from 'react';
import PropTypes from 'prop-types';
import { SHELF_TITLE } from './constants';
import { TBook } from './types';


/**
 * @module
 * @name BookShelfChanger
 * @extends React.Component
 * @description
 * Shows a selection that allows the user to change the shelf of the book
 */
class BookShelfChanger extends React.Component {

	/**
	 * @member
	 * @name STATUS
	 * @description Collection of possible status
	 * @property {string} BUSY - The user selectd a different shelf for this book and the App is busy changing the shelf remotely
	 * @property {string} READY - Either the component received the current shelf in the props or it successfully changed it remotely
	 * @static
	 */
	static STATUS = {
		BUSY: 'STATUS.BUSY',
		READY: 'STATUS.READY'
	};
	/**
	 * @member
	 * @name propTypes
	 * @description Intended types of the props passed to the component
	 * @property {TBook} book - The book the changer is associated with
	 * @property {function} updateBookShelf - see [updateBookShelf]{@link module:App~updateBookShelf}
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
	 * @member
	 * @name state
	 * @property {TShelfKey} selectedValue - the current selected shelf key
	 * @property {STATUS} status - one of the possible [STATUS]{@link module:BookShelfChanger.STATUS}
	 * @private
	 */
	state = {
		selectedValue: '',
		status: ''
	};


	// The shelf key coming from the props becomes stored internally as state
	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.selectedValue === '') {
			return {
				selectedValue: nextProps.book.shelf,
				status: BookShelfChanger.STATUS.READY
			};
		}
		return null;
	}


	/**
	 * @method
	 * @description
	 * Handles the change event of the user selection.
	 * Firstly it updates the internal state, then it triggers the
	 * [updateBookShelf]{@link module:App~updateBookShelf} method of the App component
	 * to update the list of books in the shelves
	 * @param {SyntheticEvent} event
	 * @returns {void}
	 * @private
	 */
	onSelectChange(event) {
		const { STATUS } = this.constructor;
		const { book, updateBookShelf } = this.props;

		this.setState({
			selectedValue: event.target.value,
			status: STATUS.BUSY
		}, async () => {
			await updateBookShelf(book, this.state.selectedValue);

			// - Moving shelf in MySearch will cause the book to unmount,
			// in this case the new shelf will be passed throught the props.
			// - Moving shelf in the SearchPage won't cause the book to be umounted,
			// but the changer won't be renderer again either, so we need
			// to set change the status to trigger a re-render.
			// We need to check if the component is mounted to prevent triggering
			// an error in the console
			if (this._isMounted) {
				this.setState({
					status: STATUS.READY
				});
			}
		});
	}


	componentDidMount() {
		this._isMounted = true;
	}


	componentWillUnmount() {
		this._isMounted = false;
	}


	/**
	 * @method
	 * @name render
	 * @description
	 * Creates the selection containing all the available shelves.
	 * @returns {ReactElement}
	 * @private
	 */
	render() {
		const { STATUS } = this.constructor;
		const { status } = this.state;

		return (
			<div className="book-shelf-changer">
				{status === STATUS.BUSY && (
					<div id="loading"></div>
				)}
				<select value={this.state.selectedValue} onChange={this.onSelectChange}>
					<option value="move" disabled>Move to...</option>
					{Object.entries(SHELF_TITLE).map( ([ shelfKey, shelfTitle ], index) => (
						<option key={index} value={shelfKey}>{shelfTitle}</option>
					))}
				</select>
			</div>
		);
	}
}


export default BookShelfChanger;
