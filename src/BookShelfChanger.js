
import React from 'react'
import PropTypes from 'prop-types'
import { getShelfTitle } from './utils/BooksUtils'
import { makeTitle } from './utils/StringUtils'

class BookShelfChanger extends React.Component {

	static propTypes = {
		shelf: PropTypes.string,
		availableShelves: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
		onShelfChange: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.selectionChanged = this.selectionChanged.bind(this);
	}

	state = {
		selectedValue: ''
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.selectedValue === '') {
			return {
				selectedValue: nextProps.shelf || 'none'
			};
		}
		return null;
	}

	selectionChanged(event) {
		this.setState({
			selectedValue: event.target.value
		}, () => {
			this.props.onShelfChange(this.state.selectedValue);
		});
	}

	render() {
		const { availableShelves } = this.props;

		return (
			<select value={this.state.selectedValue} onChange={this.selectionChanged}>
				<option value="move" disabled>Move to...</option>
				{Object.entries(availableShelves).map( ([ shelfID, shelfTitle ], index) => (
					<option key={index}
						value={shelfID}>{shelfTitle}</option>
				))}
				<option value="none">None</option>
			</select>
		);
	}
}


export default BookShelfChanger
