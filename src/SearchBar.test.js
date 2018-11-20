import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import * as BooksAPI from './BooksAPI'; // mocked
import SearchBar from './SearchBar';
import { mount, shallow } from 'enzyme';
import debounce from 'lodash.debounce';

describe('SearchBar', () => {

	const getBookShelf = () => {};
	const showResult = () => {};
	const props = {
		getBookShelf,
		showResult
	};


	afterEach(() => {
		jest.clearAllMocks();
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


	it('contains a debounced search method', () => {
		const api = jest.spyOn(BooksAPI, 'search');
		const wrapper = shallow(
			<SearchBar {...props} />
		);
		const component = wrapper.instance();

		const query = 't';
		component.search(query);
		expect(debounce).toHaveBeenCalledTimes(1);
		expect(api).toHaveBeenCalledTimes(1);

		api.mockRestore();
	});


	it("fetches books when typing keywords in the search field and will pass them to prop showResult", async () => {
		const props = {
			getBookShelf,
			showResult: jest.fn()
		};
		const query = 't';
		const showResult = jest.fn();

		const mounted = mount(
			<SearchBar {...props} />
		);
		const component = mounted.instance();

		const input = mounted.find('input');
		input.simulate('change', {
			target: { value : query}
		});
		const books = await component.async.onTyping;

		expect(component.state.keywords).toBe(query);
		expect(books).toHaveLength(5);
		expect(props.showResult).toHaveBeenCalledTimes(1);
		expect(props.showResult).toHaveBeenCalledWith(books);
	});
});
