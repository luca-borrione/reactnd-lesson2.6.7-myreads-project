import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import BooksList from '../BooksList';
import Search from '../Search';
import NotFoundPage from '../NotFoundPage';
import { mount, shallow } from 'enzyme';
import App from '../App';
import * as BooksAPI from '../BooksAPI';
import MockBooksAPI from '../__mocks__/BooksAPI';
import { diffByKey as ArrayDiffByKey } from '../utils/ArrayUtils';
import { TShelfKey } from '../types';

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

describe('App', () => {

	beforeEach(() => {
		jest.resetModules();
		MockBooksAPI.resetBooks();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});


	it('renders without crashing', () => {
		jest.spyOn(App.prototype, 'fetchAllBooks')
			.mockImplementation(() => []);

		const div = document.createElement('div');
		ReactDOM.render(
			<MemoryRouter>
				<App />
			</MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	// it('triggers componentDidMount and fetchAllBooks when mounted', () => {
	// 	const componentDidMount = jest.spyOn(App.prototype, 'componentDidMount');
	// 	const fetchAllBooks = jest.spyOn(App.prototype, 'fetchAllBooks');
	// 	shallow(<App />);
	// 	expect(componentDidMount).toHaveBeenCalledTimes(1);
	// 	expect(fetchAllBooks).toHaveBeenCalledTimes(1);
	// });


	// it('fetches the books correctly and stores them as state', async () => {

	// 	jest.spyOn(BooksAPI, 'getAll')
	// 		.mockImplementation(MockBooksAPI.getAll);

	// 	const allBooks = await BooksAPI.getAll();
	// 	const wrapper = shallow(<App />);
	// 	const fetchedBooks = await wrapper.instance().fetchAllBooks();

	// 	expect.assertions(2);
	// 	{
	// 		// 1. It fetches the books as expected
	// 		const diffArr = ArrayDiffByKey('id', allBooks, fetchedBooks);
	// 		expect(diffArr.length).toBe(0);
	// 	}
	// 	{
	// 		// 2. It stores them as state
	// 		const diffArr = ArrayDiffByKey('id', allBooks, wrapper.state().booksInShelves);
	// 		expect(diffArr.length).toBe(0);
	// 	}
	// });



	// it('properly removes a book and updates the state accordingly', async () => {

	// 	jest.spyOn(BooksAPI, 'getAll')
	// 		.mockImplementation(MockBooksAPI.getAll);

	// 	jest.spyOn(BooksAPI, 'update')
	// 		.mockImplementation(MockBooksAPI.update);

	// 	jest.spyOn(BooksAPI, 'get')
	// 		.mockImplementation(MockBooksAPI.get);


	// 	const allBooks = await BooksAPI.getAll();
	// 	const wrapper = shallow(<App />);

	// 	const book = allBooks[0];
	// 	const updatedBooks = await wrapper.instance().updateBookShelf(book, TShelfKey.NONE);


	// 	expect.assertions(4);
	// 	{
	// 		// 1. One book has ben removed
	// 		const diffArr = ArrayDiffByKey('id', allBooks, updatedBooks);
	// 		expect(diffArr.length).toBe(1);

	// 		// 2. The book removed contains the expected id
	// 		const expected = {id: book.id};
	// 		expect(diffArr[0]).toEqual(expect.objectContaining(expected));
	// 	}
	// 	{
	// 		// 3. The retrieved book contains the expected shelf
	// 		const removedBook = await BooksAPI.get(book.id);
	// 		const expected = {
	// 			id: book.id,
	// 			shelf: TShelfKey.NONE
	// 		};
	// 		expect(removedBook).toEqual(expect.objectContaining(expected));
	// 	}
	// 	{
	// 		// 4. The state is updated accordingly
	// 		const diffArr = ArrayDiffByKey('id', updatedBooks, wrapper.state().booksInShelves);
	// 		expect(diffArr.length).toBe(0);
	// 	}
	// });



	// it('properly adds a new book and updates the state accordingly', async () => {

	// 	jest.spyOn(BooksAPI, 'getAll')
	// 		.mockImplementation(MockBooksAPI.getAll);

	// 	jest.spyOn(BooksAPI, 'update')
	// 		.mockImplementation(MockBooksAPI.update);

	// 	jest.spyOn(BooksAPI, 'get')
	// 		.mockImplementation(MockBooksAPI.get);


	// 	const allBooks = await BooksAPI.getAll();
	// 	const wrapper = shallow(<App />);

	// 	// Defining the expected result: the book needs to move to a different shelf
	// 	const expected = {
	// 		id: '1OJ8EhvuPXAC',
	// 		shelf: TShelfKey.WANT_TO_READ // Moving from NONE
	// 	};
	// 	const book = await BooksAPI.get(expected.id);

	// 	const updatedBooks = await wrapper.instance().updateBookShelf(book, expected.shelf);

	// 	expect.assertions(4);
	// 	{
	// 		// 1. One book has ben added
	// 		const diffArr = ArrayDiffByKey('id', allBooks, updatedBooks);
	// 		expect(diffArr.length).toBe(1);

	// 		// 2. The book added contains the expected id
	// 		expect(diffArr[0]).toEqual(expect.objectContaining(expected));
	// 	}
	// 	{
	// 		// 3. The retrieved book contains the expected shelf
	// 		const removedBook = await BooksAPI.get(expected.id);
	// 		expect(removedBook).toEqual(expect.objectContaining(expected));
	// 	}
	// 	{
	// 		// 4. The state is updated accordingly
	// 		const diffArr = ArrayDiffByKey('id', updatedBooks, wrapper.state().booksInShelves);
	// 		expect(diffArr.length).toBe(0);
	// 	}
	// });



	// it('properly moves a book to a different shelf and updates the state accordingly', async () => {

	// 	jest.spyOn(BooksAPI, 'getAll')
	// 		.mockImplementation(MockBooksAPI.getAll);

	// 	jest.spyOn(BooksAPI, 'update')
	// 		.mockImplementation(MockBooksAPI.update);

	// 	jest.spyOn(BooksAPI, 'get')
	// 		.mockImplementation(MockBooksAPI.get);


	// 	const allBooks = await BooksAPI.getAll();
	// 	const wrapper = shallow(<App />);

	// 	// Defining the expected result: the book needs to move to a different shelf
	// 	const expected = {
	// 		id: 'nggnmAEACAAJ',
	// 		shelf: TShelfKey.READ // moving from CURRENTLY_READING
	// 	};
	// 	const book = await BooksAPI.get(expected.id);

	// 	const updatedBooks = await wrapper.instance().updateBookShelf(book, expected.shelf);

	// 	expect.assertions(3);
	// 	{
	// 		// 1. No book has been added or removed
	// 		const diffArr = ArrayDiffByKey('id', allBooks, updatedBooks);
	// 		expect(diffArr.length).toBe(0);
	// 	}
	// 	{
	// 		// 2. The retrieved book contains the expected shelf
	// 		const movedBook = await BooksAPI.get(expected.id);
	// 		expect(movedBook).toEqual(expect.objectContaining(expected));
	// 	}
	// 	{
	// 		// 3. The state is updated accordingly
	// 		const diffArr = ArrayDiffByKey('id', updatedBooks, wrapper.state().booksInShelves);
	// 		expect(diffArr.length).toBe(0);
	// 	}
	// });



	// it('retrieves the correct shelf associated with a given book', async () => {

	// 	jest.spyOn(BooksAPI, 'get')
	// 		.mockImplementation(MockBooksAPI.get);

	// 	const wrapper = shallow(<App />);
	// 	await wrapper.instance().fetchAllBooks();


	// 	const expectedArr = [
	// 		{ id:'nggnmAEACAAJ', shelf:TShelfKey.CURRENTLY_READING },
	// 		{ id:'evuwdDLfAyYC', shelf:TShelfKey.WANT_TO_READ },
	// 		{ id:'jAUODAAAQBAJ', shelf:TShelfKey.READ },
	// 		{ id:'tXrPCgAAQBAJ', shelf:TShelfKey.NONE }
	// 	];

	// 	expect.assertions(8);

	// 	const processArray = async (arr, fn) => {
	// 		const promises = arr.map(fn);
	// 		await Promise.all(promises);
	// 	};

	// 	await processArray(expectedArr, expected => {
	// 		return	new Promise( async resolve => {
	// 			{
	// 				// 1. The shelf retrieved with getBookShelf matches the expected one
	// 				const shelf = wrapper.instance().getBookShelf(expected.id);
	// 				expect(shelf).toBe(expected.shelf);
	// 			}
	// 			{
	// 				// 2. The retrieved book contains the expected shelf
	// 				const book = await BooksAPI.get(expected.id);
	// 				expect(book).toEqual(expect.objectContaining(expected));
	// 			}
	// 			resolve();
	// 		});
	// 	});
	// });



	// it('redirects to 404 invalid paths', () => {
	// 	const wrapper = mount(
	// 		<MemoryRouter initialEntries={[ '/random' ]}>
	// 			<App/>
	// 		</MemoryRouter>
	// 	);
	// 	expect(wrapper.find(BooksList)).toHaveLength(0);
	// 	expect(wrapper.find(Search)).toHaveLength(0);
	// 	expect(wrapper.find(NotFoundPage)).toHaveLength(1);
	// });


	// it("routes to BooksList when path is '/'", () => {
	// 	const wrapper = mount(
	// 		<MemoryRouter initialEntries={[ '/' ]}>
	// 			<App/>
	// 		</MemoryRouter>
	// 	);
	// 	expect(wrapper.find(BooksList)).toHaveLength(1);
	// 	expect(wrapper.find(Search)).toHaveLength(0);
	// 	expect(wrapper.find(NotFoundPage)).toHaveLength(0);
	// });



	// it("routes to Search when path is '/search'", () => {
	// 	const wrapper = mount(
	// 		<MemoryRouter initialEntries={[ '/search' ]}>
	// 			<App/>
	// 		</MemoryRouter>
	// 	);
	// 	expect(wrapper.find(BooksList)).toHaveLength(0);
	// 	expect(wrapper.find(Search)).toHaveLength(1);
	// 	expect(wrapper.find(NotFoundPage)).toHaveLength(0);
	// });

});

