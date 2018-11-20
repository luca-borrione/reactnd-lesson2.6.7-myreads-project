import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import MyReads from './MyReads';
import * as BooksAPI from './BooksAPI'; // mocked
import { TShelfKey } from './types';

describe('MyReads', () => {

	let book;
	const updateBookShelf = () => {};

	const withRouter = Component => (
		<MemoryRouter>
			{Component}
		</MemoryRouter>
	);

	beforeEach( async () => {
		if (!book) {
			book = await BooksAPI.get('nggnmAEACAAJ');
		}
	});

	it('renders without crashing', () => {
		const props = {
			booksInShelves: [book],
			updateBookShelf
		};
		const div = document.createElement('div');
		ReactDOM.render(
			withRouter(<MyReads {...props} />), div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const props = {
			booksInShelves: [book],
			updateBookShelf
		};
		const tree = TestRenderer.create(
			withRouter(<MyReads {...props} />)
		).toJSON();

		expect(tree).toMatchSnapshot();
	});


	it('should contain BooksList as a child', () => {
		const props = {
			booksInShelves: [book],
			updateBookShelf
		};

		const wrapper = mount(
			withRouter(<MyReads {...props} />)
		);

		expect(wrapper.find('BooksList')).toHaveLength(1);
	});


	describe('props behaviour', () => {

		it('passes the prop updateBookShelf method as it is to the BooksList child', () => {
			const props = {
				booksInShelves: [book],
				updateBookShelf: jest.fn()
			};
			const shelf = TShelfKey.WANT_TO_READ;

			const wrapper = mount(
				withRouter(<MyReads {...props} />)
			);

			wrapper.find('BooksList').instance().props.updateBookShelf(book, shelf);
			expect(props.updateBookShelf).toHaveBeenCalledTimes(1);
			expect(props.updateBookShelf).toHaveBeenCalledWith(book, shelf);
		});

	});
});
