
import React from 'react'
import PropTypes from 'prop-types'
import { getShelfTitle } from './utils/BooksUtils'
import { makeTitle } from './utils/StringUtils'

class BookShelfChanger extends React.Component {

	static propTypes = {
		shelf: PropTypes.string.isRequired,
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired
	};

	constructor(props) {
		super(props);
		this.selectionChanged = this.selectionChanged.bind(this);
	}

	state = {
		selectedValue: null
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		// if (nextProps.shelf !== prevState.selectedValue) {
		if (!prevState.selectedValue) {
			console.log('from props: '+nextProps.shelf);
			return { selectedValue: nextProps.shelf};
		}
		return null;
	}

	selectionChanged(event) {
		console.log(event.target.value);
		this.setState({
			selectedValue: event.target.value
		}, () => {
			console.log(this.state.selectedValue);
		});
	}

	render() {
		const { shelves } = this.props;

		return (
			<select value={this.state.selectedValue} onChange={this.selectionChanged}>
				<option value="move" disabled>Move to...</option>
				{shelves.map( (shelf, index) => (
					<option key={index}
						value={shelf}>{makeTitle(getShelfTitle(shelf))}</option>
				))}
				<option value="none">None</option>
			</select>
		);
	}
}


export default BookShelfChanger
