
import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import { makeTitle, ucWords } from './utils/StringUtils'
import PropTypes from 'prop-types'
import { TBook } from './types'


class Book extends React.Component {

	static propTypes = {
		...TBook,
		shelves: PropTypes.arrayOf(PropTypes.string).isRequired
	};

	render() {
		const {
			authors,
			shelf,
			shelves,
			thumbnail,
			title
		} = this.props;

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
							<BookShelfChanger shelf={shelf} shelves={shelves} />
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
