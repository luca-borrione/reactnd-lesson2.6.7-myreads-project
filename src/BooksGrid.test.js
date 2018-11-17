import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import BooksGrid from './BooksGrid';

describe('BooksGrid', () => {

	let books = [];
	const updateBookShelf = () => {};


	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BooksGrid
				books={books}
				updateBookShelf={updateBookShelf} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = renderer.create(
			<BooksGrid
				books={books}
				updateBookShelf={updateBookShelf} />
		)
		.toJSON();

		expect(tree).toMatchSnapshot();
	});

});
