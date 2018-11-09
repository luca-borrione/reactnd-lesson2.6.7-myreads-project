
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import MockBooksAPI from '../__mocks__/BooksAPI';
import Navigation from '../Navigation';
import BooksList from '../BooksList';
import Search from '../Search';
import NotFoundPage from '../NotFoundPage';
import { mount, render, shallow } from 'enzyme';

describe('Search', () => {

	beforeEach(() => {
		jest.resetModules();
		MockBooksAPI.resetBooks();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});


	// it('renders without crashing', () => {
	// 	const getBookShelf = () => {};
	// 	const updateBookShelf = () => {};

	// 	const div = document.createElement('div');
	// 	ReactDOM.render(
	// 		<MemoryRouter>
	// 			<Search
	// 				getBookShelf={getBookShelf}
	// 				updateBookShelf={updateBookShelf} />
	// 		</MemoryRouter>, div);

	// 	ReactDOM.unmountComponentAtNode(div);
	// });


	// it("renders correctly", () => {
	// 	const getBookShelf = () => {};
	// 	const updateBookShelf = () => {};

	// 	const tree = renderer.create(
	// 		<MemoryRouter>
	// 			<Search
	// 				getBookShelf={getBookShelf}
	// 				updateBookShelf={updateBookShelf} />
	// 		</MemoryRouter>
	// 	)
	// 	.toJSON();

	// 	expect(tree).toMatchSnapshot();
	// });


	// it('includes link to the App root', () => {
	// 	const getBookShelf = () => {};
	// 	const updateBookShelf = () => {};

	// 	const wrapper = shallow(
	// 		<Search
	// 			getBookShelf={getBookShelf}
	// 			updateBookShelf={updateBookShelf} />
	// 	);

	// 	const link = wrapper.find('Link')
	// 	expect(link.prop('to')).toBe('/');

	// 	link.simulate('click');
	// });

	// it("includes link to '/'", () => {
	// 	const getBookShelf = () => {};
	// 	const updateBookShelf = () => {};

	// 	jest.mock('react-router-dom', () => ({
	// 		Link: 'Link',
	// 		Route: ({ children, path }) => children({ match: path === '/' })
	// 	}));

	// 	const wrapper = shallow(
	// 		<Search
	// 			getBookShelf={getBookShelf}
	// 			updateBookShelf={updateBookShelf} />
	// 	);

	// 	const link = wrapper.find('Link');

	// 	expect.assertions(2);

	// 	// 1. The Link leads to '/'
	// 	expect(link.prop('to')).toBe('/');

	// 	// 2. When clicked the Search component will be replaced
	// 	link.simulate('click');
	// 	expect(wrapper.find(Search)).toHaveLength(0);
	// });


	it("includes link to '/'", () => {
		const booksInShelves = [];
		const getBookShelf = () => {};
		const updateBookShelf = () => {};

		const wrapper = mount(
			<BrowserRouter>
				<div>
					<Navigation
						booksInShelves={booksInShelves}
						getBookShelf={getBookShelf}
						updateBookShelf={updateBookShelf} />
				</div>
			</BrowserRouter>
		);

		// console.log(wrapper.find('BooksList'));
		const link = wrapper.find("back-home");
		// const link = wrapper.find('Link');
		console.log('>>', link.prop('to'));

		// expect.assertions(2);

		// // 1. The Link leads to '/'
		// expect(link.prop('to')).toBe('/');

		// // 2. When clicked the Search component will be replaced
		// link.simulate('click');
		// expect(wrapper.find('Search')).toHaveLength(0);
		expect(wrapper.find(BooksList)).toHaveLength(1);
		expect(wrapper.find(Search)).toHaveLength(0);
		expect(wrapper.find(NotFoundPage)).toHaveLength(0);

		link.simulate('click');
		// Simulate.click(div.querySelector("#back-home"), {
		// 	button: 0
		//   });
		expect(wrapper.find(BooksList)).toHaveLength(0);
		expect(wrapper.find(Search)).toHaveLength(1);
		expect(wrapper.find(NotFoundPage)).toHaveLength(0);
	});



});
