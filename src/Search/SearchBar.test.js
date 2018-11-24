import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import * as BooksAPI from '../BooksAPI'; // mocked
import SearchBar from './SearchBar';
import { mount, shallow } from 'enzyme';
import debounce from 'lodash.debounce';

describe('SearchBar', () => {
	const { BOOKS_STATUS } = SearchBar;
	const getBookShelf = () => {};
	const showResult = () => {};
	const props = {
		getBookShelf,
		showResult
	};


	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});


	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<SearchBar {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = TestRenderer
			.create(<SearchBar {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it('contains a debounced search method', async () => {
		const apiSearch = jest.spyOn(BooksAPI, 'search');
		const wrapper = shallow(
			<SearchBar {...props} />
		);
		const component = wrapper.instance();
		const componentSearch = jest.spyOn(component, 'search');

		const query = 't';
		await component.fetchBooks(query);
		expect(componentSearch).toHaveBeenCalledTimes(1);
		expect(debounce).toHaveBeenCalledTimes(1);
		expect(apiSearch).toHaveBeenCalledTimes(1);
	});


	it('performs a search correctly', async () => {
		const query = 't';
		const resolve = jest.fn();
		const reject = jest.fn();
		const wrapper = shallow(
			<SearchBar {...props} />
		);
		const component = wrapper.instance();
		await component.search(query, resolve, reject);

		expect(resolve).toHaveBeenCalledTimes(1);
		const books = resolve.mock.calls[0][0]; // first argument of the first call
		expect(books).toHaveLength(5);
		expect(reject).toHaveBeenCalledTimes(0);
	});



	it('handles correctly exceptions thrown while performing a search', async () => {
		const errorText = 'testing BOOKS_STATUS.ERROR';
		jest.spyOn(BooksAPI, 'search')
		.mockImplementation(() => {
			throw new Error(errorText);
		});
		const query = 't';
		const resolve = jest.fn();
		const reject = jest.fn();
		const wrapper = shallow(
			<SearchBar {...props} />
		);
		const component = wrapper.instance();
		await component.search(query, resolve, reject);

		expect(reject).toHaveBeenCalledTimes(1);
		const error = reject.mock.calls[0][0]; // first argument of the first call
		expect(error.message).toBe(errorText);
		expect(resolve).toHaveBeenCalledTimes(0);
	});



	it('marks the fetched books with status READY if the search resolved correctly and passes them to prop showResult', async () => {
		const props = {
			getBookShelf,
			showResult: jest.fn()
		};
		const query = 't';

		const mounted = mount(
			<SearchBar {...props} />
		);
		const component = mounted.instance();

		const input = mounted.find('input');
		input.simulate('change', {
			target: { value : query}
		});
		const books = await component.async.onTyping;

		expect(component.state.query).toBe(query);
		expect(books).toHaveLength(5);
		expect(books.status).toBe(BOOKS_STATUS.READY);
		expect(props.showResult).toHaveBeenCalledTimes(1);
		expect(props.showResult).toHaveBeenCalledWith(books);
	});


	it('marks the fetched books with status ERROR if the search has been rejected and passes them to prop showResult', async () => {
		jest
			.spyOn(SearchBar.prototype, 'search')
			.mockImplementation((query, resolve, reject) => {
				setTimeout(() => {
					reject('testing BOOKS_STATUS.ERROR');
				}, 50);
			});

		const props = {
			getBookShelf,
			showResult: jest.fn()
		};
		const query = 't';

		const mounted = mount(
			<SearchBar {...props} />
		);
		const component = mounted.instance();

		const input = mounted.find('input');
		input.simulate('change', {
			target: { value : query}
		});
		const books = await component.async.onTyping;

		expect(component.state.query).toBe(query);
		expect(books).toHaveLength(0);
		expect(books.status).toBe(BOOKS_STATUS.ERROR);
		expect(props.showResult).toHaveBeenCalledTimes(1);
		expect(props.showResult).toHaveBeenCalledWith(books);
	});
});
