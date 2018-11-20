import {
	makeTitle,
	ucfirst,
	ucwords
} from './StringUtils';

describe('StringUtils', () => {
	describe('ucwords', () => {
		it('uppercases the first character of each word in a string', () => {
			const text = 'heLLO WorLD';

			const result = ucwords(text);
			const expected = 'Hello World';
			expect(result).toBe(expected);
		});
	});


	describe('ucfirst', () => {
		it('uppercases the first character of the first word of a given string.', () => {
			const text = 'heLLO WorLD';

			const result = ucfirst(text);
			const expected = 'Hello world';
			expect(result).toBe(expected);
		});
	});


	describe('makeTitle', () => {
		it('uppercases the first character of every word of a given string, '+
			'except if considered noise words, such as prepositions.\n'+
			'The first word of the string and the first word after a column are always capitalisd.', () => {

			const text = 'the complete guide: the new and the old';

			const result = makeTitle(text);
			const expected = 'The Complete Guide: The New and the Old';
			expect(result).toBe(expected);
		});
	});
});