import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import PanelError from './PanelError';

describe('PanelError', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<PanelError />, div);
		ReactDOM.unmountComponentAtNode(div);
	});


	it('renders correctly', () => {
		const tree = TestRenderer
			.create(<PanelError />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});

});
