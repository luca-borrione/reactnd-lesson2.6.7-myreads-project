import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Book from './Book';
import * as BooksAPI from './BooksAPI'; // mocked
import { TShelfKey } from './types';

describe('Book', () => {

	let book;

	const updateBookShelf = () => {};

	beforeEach( async () => {
		if (!book) {
			book = await BooksAPI.get('nggnmAEACAAJ');
		}
	});

	it('renders without crashing', () => {
		const props = {
			book,
			updateBookShelf
		};
		const div = document.createElement('div');
		ReactDOM.render(<Book {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const props = {
			book,
			updateBookShelf
		};
		const tree = TestRenderer
			.create(<Book {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it('should contain BookShelfChanger as a child', () => {
		const props = {
			book,
			updateBookShelf
		};
		const wrapper = mount(<Book {...props} />);
		expect(wrapper.find('BookShelfChanger')).toHaveLength(1);
	});


	describe('props behaviour', () => {

		it('passes the prop updateBookShelf method as it is to the BookShelfChanger child', () => {
			const props = {
				book,
				updateBookShelf: jest.fn()
			};
			const shelf = TShelfKey.WANT_TO_READ;
			const wrapper = mount(<Book {...props} />);
			wrapper.find('BookShelfChanger').instance().props.updateBookShelf(book, shelf);
			expect(props.updateBookShelf).toHaveBeenCalledTimes(1);
			expect(props.updateBookShelf).toHaveBeenCalledWith(book, shelf);
		});

	});

});
