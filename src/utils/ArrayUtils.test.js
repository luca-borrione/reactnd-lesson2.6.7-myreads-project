import {
	diff,
	diffByKey
} from './ArrayUtils';

describe('ArrayUtils', () => {
	describe('diff', () => {
		it('retrieves the symmetric difference between arrays.', () => {
			const a = ['a', 'd', 'e'];
			const b = ['a', 'b', 'c', 'd'];

			const result = diff(a, b);
			const expected = ['e', 'b', 'c'];
			expect(result).toEqual(expected);
		});
	});


	describe('diffByKey', () => {
		it('retrieves the symmetric difference between arrays of objects '+
			'by comparing a key in common between the objects', () => {

 			const a = [{k:1}, {k:2}, {k:3}];
 			const b = [{k:1}, {k:4}, {k:5}, {k:6}];
			const c = [{k:3}, {k:5}, {k:7}];

			const result = diffByKey('k', a, b, c);
			const expected = [{k:2}, {k:4}, {k:6}, {k:7}];
			expect(result).toEqual(expected);
		});
	});
});