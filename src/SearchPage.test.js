import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI'; // mocked

describe('SearchPage', () => {

	const getBookShelf = () => {};
	const updateBookShelf = () => {};

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
		const props = {
			getBookShelf,
			updateBookShelf
		};
		const div = document.createElement('div');
		ReactDOM.render(
			withRouter(<SearchPage {...props} />), div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const props = {
			getBookShelf,
			updateBookShelf
		};
		const tree = renderer.create(
			withRouter(<SearchPage {...props} />)
		).toJSON();

		expect(tree).toMatchSnapshot();
	});


	it("includes a link to '/'", () => {
		const props = {
			getBookShelf,
			updateBookShelf
		};
		const wrapper = shallow(<SearchPage {...props} />);
		const link = wrapper.find('Link');
		expect(link.prop('to')).toBe('/');
	});


	it('should contain SearchBar as a child', () => {
		const props = {
			getBookShelf,
			updateBookShelf
		};

		const wrapper = mount(
			withRouter(<SearchPage {...props} />)
		);

		expect(wrapper.find('SearchBar')).toHaveLength(1);
	});
});
