import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Book from './Book';
import BookShelfChanger from './BookShelfChanger';
import * as BooksAPI from './BooksAPI'; // mocked
import { TShelfKey } from './types';

describe('Book', () => {

	let props = {
		book: null,
		updateBookShelf: () => {}
	};

	beforeEach( async () => {
		if (!props.book) {
			props.book = await BooksAPI.get('nggnmAEACAAJ');
		}
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Book {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = renderer.create(<Book {...props} />).toJSON();
		expect(tree).toMatchSnapshot();
	});


	it('should contain BookShelfChanger as a child', () => {
		const wrapper = mount(<Book {...props} />);
		expect(wrapper.find(BookShelfChanger)).toBeTruthy();
	});


	describe('props', () => {

		it('passes the prop updateBookShelf method to the BookShelfChanger child as it is', () => {
			props = {
				...props,
				updateBookShelf: jest.fn()
			};
			const book = props.book;
			const shelf = TShelfKey.WANT_TO_READ;
			const wrapper = mount(<Book {...props} />);
			wrapper.find(BookShelfChanger).instance().props.updateBookShelf(book, shelf);
			expect(props.updateBookShelf).toHaveBeenCalledTimes(1);
			expect(props.updateBookShelf).toHaveBeenCalledWith(book, shelf);
		});

	});

});
