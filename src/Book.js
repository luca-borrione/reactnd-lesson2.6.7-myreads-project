
import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import * as BooksAPI from './BooksAPI'
import { makeTitle, ucWords } from './utils/StringUtils'
import PropTypes from 'prop-types'


class Book extends React.Component {

	static propTypes = {
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
		updateShelf: PropTypes.func.isRequired
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
			console.log('Book ID from props: '+nextProps.id);
			return { id: nextProps.id};
		}
		return null;
	}

	componentDidMount() {
		console.log('>> BOOK did mount will fetch: ', this.state.id);
		BooksAPI.get(this.state.id)
			.then( book => {
				this.setState(() => ({
					authors: book.authors,
					id: book.id,
					shelf: book.shelf,
					thumbnail: book.imageLinks.thumbnail,
					title: book.title
				}), () => {
					console.log('>> BOOK DONE: ',this.state); // TODO: remove this
				});
			});

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
