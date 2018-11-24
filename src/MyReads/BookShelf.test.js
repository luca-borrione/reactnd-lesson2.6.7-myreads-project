import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import BookShelf from './BookShelf';
import * as BooksAPI from '../BooksAPI'; // mocked
import { TShelfKey } from '../shared/types';
import { ERROR } from '../shared/constants';

describe('BookShelf', () => {

	let book;
	let allBooks;

	const updateBookShelf = () => {};

	beforeEach( async () => {
		if (!book) {
			book = await BooksAPI.get('nggnmAEACAAJ');
		}
		if (!allBooks) {
			allBooks = await BooksAPI.getAll();
		}
	});


	it('renders without crashing', () => {
		const props = {
			books: [book],
			updateBookShelf
		};
		const div = document.createElement('div');
		ReactDOM.render(<BookShelf {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const props = {
			books: [book],
			updateBookShelf
		};
		const tree = TestRenderer
			.create(<BookShelf {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it('expects books containing the same shelf', async () => {
		const props = {
			books: allBooks.filter( ({ shelf }) => shelf === TShelfKey.WANT_TO_READ),
			updateBookShelf
		};

		const fn = () => shallow(<BookShelf {...props} />);
		expect(fn).not.toThrowError();
	});


	it('throws an error if it receives books containing different shelves', async () => {
		const props = {
			books: allBooks.filter( ({ shelf }) =>
				shelf === TShelfKey.WANT_TO_READ ||
				shelf === TShelfKey.CURRENTLY_READING),
			updateBookShelf
		};

		const fn = () => shallow(<BookShelf {...props} />);
		expect(fn).toThrowError(ERROR.BOOKS_IN_MULTI_SHELVES);
	});

	it('should contain BooksGrid as a child', () => {
		const props = {
			books: [book],
			updateBookShelf
		};
		const wrapper = mount(<BookShelf {...props} />);
		expect(wrapper.find('BooksGrid')).toHaveLength(1);
	});


	describe('props behaviour', () => {

		it('passes the prop updateBookShelf method as it is to the BooksGrid child', () => {
			const props = {
				books: [book],
				updateBookShelf: jest.fn()
			};
			const shelf = TShelfKey.WANT_TO_READ;

			const wrapper = mount(<BookShelf {...props} />);

			wrapper.find('BooksGrid').instance().props.updateBookShelf(book, shelf);
			expect(props.updateBookShelf).toHaveBeenCalledTimes(1);
			expect(props.updateBookShelf).toHaveBeenCalledWith(book, shelf);
		});

	});
});
