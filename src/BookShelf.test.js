import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'; // mocked
import { TShelfKey } from './types';
import { ERROR } from './Constants';

describe('BookShelf', () => {

	beforeEach(() => {
		BooksAPI.__resetBooks();
	});


	let books = [];
	const updateBookShelf = () => {};


	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BookShelf
				books={books}
				updateBookShelf={updateBookShelf} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = renderer.create(
			<BookShelf
				books={books}
				updateBookShelf={updateBookShelf} />
		)
		.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it('expects books containing the same shelf', async () => {
		const allBooks = await BooksAPI.getAll();

		books = allBooks.filter( ({ shelf }) =>
					shelf === TShelfKey.WANT_TO_READ);

		const fn = () => {
			shallow(
				<BookShelf
					books={books}
					updateBookShelf={updateBookShelf} />
			);
		};

		expect(fn).not.toThrowError();
	});

	it('throws an error if it receives books containing different shelves', async () => {
		const allBooks = await BooksAPI.getAll();

		books = allBooks
					.filter( ({ shelf }) =>
						shelf === TShelfKey.WANT_TO_READ || shelf === TShelfKey.CURRENTLY_READING );

		const fn = () => {
			shallow(
				<BookShelf
					books={books}
					updateBookShelf={updateBookShelf} />
			);
		};

		expect(fn).toThrowError(ERROR.BOOKS_IN_MULTI_SHELVES);
	});
});
