import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import BooksGrid from './BooksGrid';
import * as BooksAPI from '../BooksAPI'; // mocked
import { TShelfKey } from './types';

describe('BooksGrid', () => {

	let book;

	const updateBookShelf = () => {};

	beforeEach( async () => {
		if (!book) {
			book = await BooksAPI.get('nggnmAEACAAJ');
		}
	});


	it('renders without crashing', () => {
		const props = {
			books: [book],
			updateBookShelf
		};
		const div = document.createElement('div');
		ReactDOM.render(<BooksGrid {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const props = {
			books: [book],
			updateBookShelf
		};
		const tree = TestRenderer
			.create(<BooksGrid {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it('should contain Book as a child', () => {
		const props = {
			books: [book],
			updateBookShelf
		};
		const wrapper = mount(<BooksGrid {...props} />);
		expect(wrapper.find('Book')).toHaveLength(1);
	});


	describe('props behaviour', () => {

		it('passes the prop updateBookShelf method as it is to the Book child', () => {
			const props = {
				books: [book],
				updateBookShelf: jest.fn()
			};
			const shelf = TShelfKey.WANT_TO_READ;

			const wrapper = mount(<BooksGrid {...props} />);

			wrapper.find('Book').instance().props.updateBookShelf(book, shelf);
			expect(props.updateBookShelf).toHaveBeenCalledTimes(1);
			expect(props.updateBookShelf).toHaveBeenCalledWith(book, shelf);
		});

	});

});
