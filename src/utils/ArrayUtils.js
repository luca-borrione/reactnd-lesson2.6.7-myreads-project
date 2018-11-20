/**
 * @module ArrayUtils
 * @description
 * Provides a set of array utility functions.
 */


/**
 * @function diff
 * @description
 * Retrieves the symmetric difference between arrays.
 * @param {...Array} arrays - the arrays to compare
 * @returns {Array} - the symmetric difference between the given arrays
 * @example
 * const a = ['a', 'd', 'e'];
 * const b = ['a', 'b', 'c', 'd'];
 * diff(a, b); // (3) ["e", "b", "c"]
 */
export const diff = (...arrays) => {
	return [].concat(...arrays.map( (arr, i) => {
		const others = arrays.slice(0);
		others.splice(i, 1);
		const unique = [...new Set([].concat(...others))];
		return arr.filter(x => !unique.includes(x));
	}));
};


/**
 * @function diffByKey
 * @description
 * Retrieves the symmetric difference between arrays of objects
 * by comparing a key in common between the objects.
 * @param {string} key - the key in common between the objects to use in the comparison
 * @param {...Array} arrays - the arrays to compare
 * @returns {Array} - the symmetric difference between the given arrays
 * @example
 * const a = [{k:1}, {k:2}, {k:3}];
 * const b = [{k:1}, {k:4}, {k:5}, {k:6}];
 * const c = [{k:3}, {k:5}, {k:7}];
 * diffByKey('k', a, b, c); // (4) [{k:2}, {k:4}, {k:6}, {k:7}]
 */
export const diffByKey = (key, ...arrays) => {
	return [].concat(...arrays.map( (arr, i) => {
		const others = arrays.slice(0);
		others.splice(i, 1);
		const unique = [...new Set([].concat(...others))];
		return arr.filter( x =>
			!unique.some(y => x[key] === y[key])
		);
	}));
}