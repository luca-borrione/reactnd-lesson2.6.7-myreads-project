
import ReactDOM from 'react-dom';
import React from "react";
import { Route, MemoryRouter } from "react-router-dom";
import Navigation from '../Navigation'
import ReactTestUtils from 'react-dom/test-utils';
import BooksList from "../BooksList";
import Search from "../Search";
import NotFoundPage from "../NotFoundPage";

describe('Navigation', () => {

	const renderSubject = Subject => {
		const booksInShelves = [];
		const getBookShelf = () => {};
		const updateBookShelf = () => {};

		return (
			<Subject
				booksInShelves={booksInShelves}
				getBookShelf={getBookShelf}
				updateBookShelf={updateBookShelf} />
		);
	};



	const renderTestSequence = ({
		initialEntries,
		initialIndex,
		subject: Subject,
		steps
	}) => {

		const div = document.createElement("div");


		class Assert extends React.Component {
			componentDidMount() {
				this.assert();
			}

			componentDidUpdate() {
				this.assert();
			}

			assert() {
				const nextStep = steps.shift();
				if (nextStep) {
					nextStep({ ...this.props, div });
				} else {
					ReactDOM.unmountComponentAtNode(div);
				}
			}

			render() {
				return this.props.children;
			}
		}


		class Test extends React.Component {
			render() {
				return (
					<MemoryRouter
						initialIndex={initialIndex}
						initialEntries={initialEntries} >

						<Route
							render={props => (
								<Assert {...props}>
									{renderSubject(Subject)}
								</Assert>
							)} />

					</MemoryRouter>
				);
			}
		}

		ReactDOM.render(<Test />, div);
	};



	const getRenderedHTML = Subject => {
		const div = document.createElement("div");

		ReactDOM.render(
			<MemoryRouter>
				{renderSubject(Subject)}
			</MemoryRouter>, div);

		return div.innerHTML;
	};



	const extended = (() => {
		const innerHTML = {
			BooksList: getRenderedHTML(BooksList),
			Search: getRenderedHTML(Search),
			NotFoundPage: getRenderedHTML(NotFoundPage),
		};

		return {
			toBeRenderedAs(div, ComponentName) {
				const pass = div.innerHTML === innerHTML[ComponentName];
				if (pass) {
					return {
						message: () =>
							`expected not to rendered as ${ComponentName}`,
						pass: true,
					};
				} else {
					return {
						message: () =>
							`expected to rendered as ${ComponentName}`,
						pass: false,
					};
				}
			}
		};
	})();
	expect.extend(extended);



	it("navigates around", done => {

		expect.assertions(8);

		renderTestSequence({

			initialEntries: [ '/' ],

			// tell it the subject you're testing
			subject: Navigation,

			// and the steps to execute each time the location changes
			steps: [

				// home page
				({ location, div }) => {

					expect(location.pathname).toBe('/');
					expect(div).toBeRenderedAs('BooksList');

					const node = div.querySelector("#goto-search");
					ReactTestUtils.Simulate.click(node, {
						button: 0
					});
				},

				// search page
				({ location, div }) => {

					expect(location.pathname).toBe('/search');
					expect(div).toBeRenderedAs('Search');

					const node = div.querySelector("#goto-home");
					ReactTestUtils.Simulate.click(node, {
						button: 0
					});
				},

				// back to home page
				({ history, location, div }) => {

					expect(location.pathname).toBe('/');
					expect(div).toBeRenderedAs('BooksList');

					history.push("/random");
				},

				// 404 error page
				({ location, div }) => {

					expect(location.pathname).toBe('/random');
					expect(div).toBeRenderedAs('NotFoundPage');

					done();
				}
			]
		});
	});

});
