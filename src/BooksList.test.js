import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import BooksList from './BooksList';
import * as BooksAPI from './BooksAPI'; // mocked
import { TShelfKey } from './types';

describe('BooksList', () => {

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
			withRouter(<BooksList {...props} />), div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const props = {
			booksInShelves: [book],
			updateBookShelf
		};
		const tree = TestRenderer.create(
			withRouter(<BooksList {...props} />)
		).toJSON();

		expect(tree).toMatchSnapshot();
	});


	it("includes a link to '/search'", () => {
		const props = {
			booksInShelves: [book],
			updateBookShelf
		};
		const wrapper = shallow(
			<BooksList {...props} />
		);

		const link = wrapper.find('Link');
		expect(link.prop('to')).toBe('/search');
	});


	it('should not contain BookShelf as a child if the booksInShelves is empty', () => {
		const props = {
			booksInShelves: [],
			updateBookShelf
		};
		const wrapper = mount(
			withRouter(<BooksList {...props} />)
		);
		expect(wrapper.find('BookShelf')).toHaveLength(0);
	});


	it('should contain BookShelf as a child if the booksInShelves contains at least one book', async () => {
		const props = {
			booksInShelves: [book],
			updateBookShelf
		};
		const wrapper = mount(
			withRouter(<BooksList {...props} />)
		);
		expect(wrapper.find('BookShelf')).toHaveLength(1);
	});


	describe('props behaviour', () => {

		it('passes the prop updateBookShelf method as it is to the BookShelf child', () => {
			const props = {
				booksInShelves: [book],
				updateBookShelf: jest.fn()
			};
			const shelf = TShelfKey.WANT_TO_READ;

			const wrapper = mount(
				withRouter(<BooksList {...props} />)
			);

			wrapper.find('BookShelf').instance().props.updateBookShelf(book, shelf);
			expect(props.updateBookShelf).toHaveBeenCalledTimes(1);
			expect(props.updateBookShelf).toHaveBeenCalledWith(book, shelf);
		});

	});
});
