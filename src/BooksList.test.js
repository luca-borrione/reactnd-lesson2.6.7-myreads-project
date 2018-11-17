import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import BooksList from './BooksList';
import { shallow } from 'enzyme';

describe('BooksList', () => {

	const booksInShelves = [];
	const updateBookShelf = () => {};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<MemoryRouter>
				<BooksList
					booksInShelves={booksInShelves}
					updateBookShelf={updateBookShelf} />
			</MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = renderer.create(
			<MemoryRouter>
				<BooksList
					booksInShelves={booksInShelves}
					updateBookShelf={updateBookShelf} />
			</MemoryRouter>
		)
		.toJSON();

		expect(tree).toMatchSnapshot();
	});


	it("includes a link to '/search'", () => {
		const wrapper = shallow(
			<BooksList
				booksInShelves={booksInShelves}
				updateBookShelf={updateBookShelf} />
		);

		const link = wrapper.find('Link');
		expect(link.prop('to')).toBe('/search');
	});
});
