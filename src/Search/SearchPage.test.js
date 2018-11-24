import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import SearchPage from './SearchPage';
import SearchBar from './SearchBar';
import * as BooksAPI from '../BooksAPI'; // mocked

describe('SearchPage', () => {

	const { BOOKS_STATUS } = SearchBar;
	const getBookShelf = () => {};
	const updateBookShelf = () => {};
	const props = {
		getBookShelf,
		updateBookShelf
	};
	const withRouter = Component => (
		<MemoryRouter>
			{Component}
		</MemoryRouter>
	);

	let books;

	beforeEach( async () => {
		if (!books) {
			books = await BooksAPI.search('t');
		}
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			withRouter(<SearchPage {...props} />), div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = TestRenderer.create(
			withRouter(<SearchPage {...props} />)
		).toJSON();

		expect(tree).toMatchSnapshot();
	});


	it("includes a link to '/'", () => {
		const wrapper = shallow(<SearchPage {...props} />);
		const link = wrapper.find('Link');
		expect(link.prop('to')).toBe('/');
	});


	it('should contain SearchBar as a child', () => {
		const wrapper = mount(
			withRouter(<SearchPage {...props} />)
		);

		expect(wrapper.find('SearchBar')).toHaveLength(1);
	});


	it('should contain BooksGrid as a child when the books are correctly retrieved by a search', async () => {
		const wrapper = shallow(<SearchPage {...props} />);

		books.status = BOOKS_STATUS.READY;

		await wrapper.instance().showResult(books);
		expect(wrapper.find('PanelError')).toHaveLength(0);
		expect(wrapper.find('BooksGrid')).toHaveLength(1);
	});


	it('should contain PanelError as a child when an error occurs while retrieving the books within a search', async () => {
		const wrapper = shallow(<SearchPage {...props} />);

		books.status = BOOKS_STATUS.ERROR;

		await wrapper.instance().showResult(books);
		expect(wrapper.find('PanelError')).toHaveLength(1);
		expect(wrapper.find('BooksGrid')).toHaveLength(0);
	});
});
