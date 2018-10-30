
import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import { makeTitle, ucWords } from './utils/StringUtils'
import PropTypes from 'prop-types'


class Book extends React.Component {

	static propTypes = {
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
		updateShelf: PropTypes.func.isRequired,
		getBook: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.onShelfChange = this.onShelfChange.bind(this);
	}

	state = {
		authors: [],
		id: '',
		shelf: '',
		thumbnail: '',
		title: ''
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.id !== prevState.id) {
			const book = nextProps.getBook(nextProps.id);
			return {
				authors: book.authors,
				id: book.id,
				shelf: book.shelf,
				thumbnail: book.imageLinks.thumbnail,
				title: book.title
			};
		}
		return null;
	}

	onShelfChange(shelf) {
		const { id, updateShelf } = this.props;
		updateShelf(id, shelf);
	}

	render() {
		const { shelves } = this.props;
		const {
			authors,
			shelf,
			thumbnail,
			title
		} = this.state;

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{
							width: 128,
							height: 193,
							backgroundImage: 'url('+ thumbnail +')'
						}}></div>
						<div className="book-shelf-changer">

							<BookShelfChanger
								shelf={shelf}
								shelves={shelves}
								onShelfChange={this.onShelfChange} />

						</div>
					</div>
					<div className="book-title">{makeTitle(title)}</div>
					<div className="book-authors">
						{authors.map( (author, index) => (
							<span className="author" key={index}>{ucWords(author)}</span>
						))}
					</div>
				</div>
			</li>
		);
	}
}


export default Book;
