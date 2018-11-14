import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import * as BooksAPI from './BooksAPI'; // mocked
import SearchBar from './SearchBar';
import { mount, shallow } from 'enzyme';
import debounce from 'lodash.debounce';

describe('SearchBar', () => {

	beforeEach(() => {
		jest.resetModules();
		BooksAPI.__resetBooks();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	const getBookShelf = () => {};
	const showResult = () => {};


	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<SearchBar
				getBookShelf={getBookShelf}
				showResult={showResult} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = renderer.create(
			<SearchBar
				getBookShelf={getBookShelf}
				showResult={showResult} />,
		)
		.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it('contains a debounced search method', () => {
		const api = jest.spyOn(BooksAPI, 'search');
		const wrapper = shallow(
			<SearchBar
				getBookShelf={getBookShelf}
				showResult={showResult} />
		);
		const component = wrapper.instance();

		const query = 't';
		component.search(query);
		expect(debounce).toHaveBeenCalledTimes(1);
		expect(api).toHaveBeenCalledTimes(1);
	});


	it("fetches books when typing keywords in the search field and will pass them to prop showResult", async () => {
		const query = 't';
		const showResult = jest.fn();

		const mounted = mount(
			<SearchBar
				getBookShelf={getBookShelf}
				showResult={showResult} />
		);
		const component = mounted.instance();

		const input = mounted.find('input');
		input.simulate('change', {
			target: { value : query}
		});
		const books = await component.async.onTyping;

		expect(component.state.keywords).toBe(query);
		expect(showResult).toHaveBeenCalledTimes(1);
		expect(books).toHaveLength(5);
		expect(showResult).toHaveBeenCalledWith(books);
	});
});
