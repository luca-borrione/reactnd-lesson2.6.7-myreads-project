
import React from 'react'
import PropTypes from 'prop-types'
import { AVAILABLE_SHELVES, NO_SHELF } from './Constants'

class BookShelfChanger extends React.Component {

	static propTypes = {
		shelf: PropTypes.string,
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
				selectedValue: nextProps.shelf || NO_SHELF
			};
		}
		return null;
	}

	selectionChanged(event) {
		const { onShelfChange } = this.props;

		this.setState({
			selectedValue: event.target.value
		}, () => {
			onShelfChange(this.state.selectedValue);
		});
	}

	render() {
		return (
			<select value={this.state.selectedValue} onChange={this.selectionChanged}>
				<option value="move" disabled>Move to...</option>
				{Object.entries(AVAILABLE_SHELVES).map( ([ shelfID, shelfTitle ], index) => (
					<option key={index}
						value={shelfID}>{shelfTitle}</option>
				))}
				<option value="none">None</option>
			</select>
		);
	}
}


export default BookShelfChanger
