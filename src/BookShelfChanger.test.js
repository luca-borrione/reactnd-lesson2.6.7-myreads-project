import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import BookShelfChanger from './BookShelfChanger';
import * as BooksAPI from './BooksAPI'; // mocked
import { TShelfKey } from './types';

describe('BookShelfChanger', () => {

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
		ReactDOM.render(<BookShelfChanger {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const props = {
			book,
			updateBookShelf
		};
		const tree = TestRenderer
			.create(<BookShelfChanger {...props} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});


	describe('state behaviour', () => {

		it('changes the selectedValue state when a new shelf is selected and triggers the prop updateBookShelf method', () => {
			const props = {
				book,
				updateBookShelf: jest.fn()
			};

			const initialShelf = book.shelf;
			const shelf = TShelfKey.WANT_TO_READ;

			const wrapper = mount(<BookShelfChanger {...props} />);
			const component = wrapper.instance();
			expect(component.state.selectedValue).toBe(initialShelf);

			const select = wrapper.find('select');
			select.simulate('change', {
				target: { value : shelf}
			});
			expect(component.state.selectedValue).toBe(shelf);

			expect(props.updateBookShelf).toHaveBeenCalledTimes(1);
			expect(props.updateBookShelf).toHaveBeenCalledWith(props.book, shelf);
		});

	});

});
