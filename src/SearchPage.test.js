import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import SearchPage from './SearchPage';
import { shallow } from 'enzyme';

describe('SearchPage', () => {

	// beforeEach(() => {
	// 	jest.resetModules();
	// });

	// afterEach(() => {
	// 	jest.clearAllMocks();
	// 	jest.restoreAllMocks();
	// });

	const getBookShelf = () => {};
	const updateBookShelf = () => {};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<MemoryRouter>
				<SearchPage
					getBookShelf={getBookShelf}
					updateBookShelf={updateBookShelf} />
			</MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = renderer.create(
			<MemoryRouter>
				<SearchPage
					getBookShelf={getBookShelf}
					updateBookShelf={updateBookShelf} />
			</MemoryRouter>
		)
		.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it("includes link to '/'", () => {
		const wrapper = shallow(
			<SearchPage
				getBookShelf={getBookShelf}
				updateBookShelf={updateBookShelf} />
		);

		const link = wrapper.find('Link');
		expect(link.prop('to')).toBe('/');
	});
});
