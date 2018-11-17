import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import App from './App';
import Navigation from './Navigation';
import * as BooksAPI from './BooksAPI'; // mocked
import { diffByKey as ArrayDiffByKey } from './utils/ArrayUtils';
import { TShelfKey } from './types';

describe('App', () => {

	beforeEach(() => {
		jest.resetModules();
		BooksAPI.__resetBooks();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});


	it('triggers componentDidMount and fetchAllBooks when mounted', () => {
		const componentDidMount = jest.spyOn(App.prototype, 'componentDidMount');
		const fetchAllBooks = jest.spyOn(App.prototype, 'fetchAllBooks');
		shallow(<App />);
		expect(componentDidMount).toHaveBeenCalledTimes(1);
		expect(fetchAllBooks).toHaveBeenCalledTimes(1);
	});


	it('renders without crashing', () => {
		const div = document.createElement('div');
		let component;
		ReactDOM.render(
			<MemoryRouter>
				<App ref={c => component = c} />
			</MemoryRouter>, div,
			async () => {
				await component.async.fetchAllBooks;
				ReactDOM.unmountComponentAtNode(div);
			});
	});


	it('renders correctly', () => {
		const tree = renderer.create(
			<MemoryRouter>
				<App />
			</MemoryRouter>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should contain Navigation as a child', () => {
		const wrapper = mount(
			<MemoryRouter>
				<App />
			</MemoryRouter>);
		expect(wrapper.find(Navigation)).toBeTruthy();
	});


	describe('state behaviour', () => {

		it('fetches the books correctly and stores them as state', async () => {
			const expected = {
				books: await BooksAPI.getAll()
			};
			const wrapper = shallow(<App />);
			const component = wrapper.instance();
			await component.async.fetchAllBooks;

			const diffArr = ArrayDiffByKey('id', expected.books, wrapper.state().booksInShelves);
			expect(diffArr).toHaveLength(0);
		});


		it('properly removes a book and updates the state accordingly', async () => {
			const wrapper = shallow(<App />);
			const component = wrapper.instance();
			await component.async.fetchAllBooks;
			const initialBooksInShelves = wrapper.state().booksInShelves;

			const book = initialBooksInShelves[0]; // will remove the first book
			await component.updateBookShelf(book, TShelfKey.NONE);
			const booksInShelves = wrapper.state().booksInShelves;

			expect.assertions(3);
			{
				// 1. One book has ben removed
				expect(booksInShelves).toHaveLength(initialBooksInShelves.length - 1);

				// 2. The expected book has been removed
				const diffArr = ArrayDiffByKey('id', booksInShelves, initialBooksInShelves);
				const removedBook = diffArr[0];
				const expected = {
					id: book.id
				};
				expect(removedBook).toEqual(expect.objectContaining(expected));
			}
			{
				// 3. The removed book is now stored as NOT associated with any shelf
				const removedBook = await BooksAPI.get(book.id);
				const expected = {
					id: book.id,
					shelf: TShelfKey.NONE
				};
				expect(removedBook).toEqual(expect.objectContaining(expected));
			}
		});


		it('properly adds a new book and updates the state accordingly', async () => {
			const wrapper = shallow(<App />);
			const component = wrapper.instance();
			await component.async.fetchAllBooks;
			const initialBooksInShelves = wrapper.state().booksInShelves;

			// A new book is added
			const expected = {
				id: '1OJ8EhvuPXAC',
				shelf: TShelfKey.WANT_TO_READ // Moving from NONE
			};
			const book = await BooksAPI.get(expected.id);
			await component.updateBookShelf(book, expected.shelf);
			const booksInShelves = wrapper.state().booksInShelves;

			expect.assertions(3);
			{
				// 1. One book has ben added
				expect(booksInShelves).toHaveLength(initialBooksInShelves.length + 1);

				// 2. The expected book has been added
				const diffArr = ArrayDiffByKey('id', booksInShelves, initialBooksInShelves);
				const addedBook = diffArr[0];
				expect(addedBook).toEqual(expect.objectContaining(expected));
			}
			{
				// 3. The added book is now stored as expected
				const addedBook = await BooksAPI.get(expected.id);
				expect(addedBook).toEqual(expect.objectContaining(expected));
			}
		});


		it('properly moves a book to a different shelf and updates the state accordingly', async () => {
			const wrapper = shallow(<App />);
			const component = wrapper.instance();
			await component.async.fetchAllBooks;
			const initialBooksInShelves = wrapper.state().booksInShelves;

			// A book needs to move to a different shelf
			const expected = {
				id: 'nggnmAEACAAJ',
				shelf: TShelfKey.READ // moving from CURRENTLY_READING
			};
			const book = await BooksAPI.get(expected.id);
			await component.updateBookShelf(book, expected.shelf);
			const booksInShelves = wrapper.state().booksInShelves;

			expect.assertions(2);
			{
				// 1. No book has been added or removed
				expect(booksInShelves).toHaveLength(initialBooksInShelves.length);
			}
			{
				// 2. The expected book has been moved
				const movedBook = await BooksAPI.get(expected.id);
				expect(movedBook).toEqual(expect.objectContaining(expected));
			}
		});

	});


	it('retrieves the correct shelf associated with a given book', async () => {
		const wrapper = shallow(<App />);
		const component = wrapper.instance();
		await component.async.fetchAllBooks;

		const expectedArr = [
			{ id:'nggnmAEACAAJ', shelf:TShelfKey.CURRENTLY_READING },
			{ id:'evuwdDLfAyYC', shelf:TShelfKey.WANT_TO_READ },
			{ id:'jAUODAAAQBAJ', shelf:TShelfKey.READ },
			{ id:'tXrPCgAAQBAJ', shelf:TShelfKey.NONE }
		];

		expect.assertions(8);

		const promises = expectedArr.map( expected => {
			return new Promise( async resolve => {
				{
					// 1. The shelf retrieved with getBookShelf matches the expected one
					const shelf = component.getBookShelf(expected.id);
					expect(shelf).toBe(expected.shelf);
				}
				{
					// 2. Double checking that the stored book contains the expected shelf
					const book = await BooksAPI.get(expected.id);
					expect(book).toEqual(expect.objectContaining(expected));
				}
				resolve();
			});
		});

		await Promise.all(promises);
	});
});

