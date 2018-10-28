
/**
 * @namespace StringUtils
 * @description
 * Provides a set of string utility functions, each of which can also be imported individually.
 */

 const StringUtils = {};


 /**
  * @memberof StringUtils
  * @function ucWords
  * @description
  * Uppercases the first character of every word of a given string.<br>
  * All the other characters are lowercased by default.
  * @param {string} str
  * @returns {string}
  *
  * @example
  * // returns: Hello World
  * const str = ucWords('heLLO WorLD');
  */
export const ucWords = StringUtils.ucWords = str =>
	str.toLowerCase().replace(/\b\S/g, char => char.toUpperCase());


/**
 * @memberof StringUtils
 * @function ucFirst
 * @description
 * Uppercases the first character of the first word of a given string.<br>
 * All the other characers are lowercased by default.
 * @param {string} str
 * @returns {string}
 *
 * @example
 * // returns: Hello world
 * const str = ucFirst('heLLO WorLD');
 */
export const ucFirst = StringUtils.ucFirst = str =>
	str.toLowerCase().replace(/\S/, char => char.toUpperCase());


/**
 * @memberof StringUtils
 * @function makeTitle
 * @description
 * Uppercases the first character of every word of a given string,
 * except if considered noise words, such as prepositions,
 * which are kept lowercased.<br>
 * All the other characers are lowercased by default.<br>
 * <br>
 * It also makes sure to capitalise:
 * - the first word of the string
 * - the first word after a column
 * even if they are considered noise.
 * @param {string} str
 * @returns {string}
 *
 * @example
 * // returns: The Complete Guide: The New and the Old
 * const title = makeTitle('the complete guide: the new and the old');
 */
export const makeTitle = StringUtils.makeTitle = str => {

	const noiseWords = [
		'a','abaft','aboard','about','above','absent','across','afore','after','against','along','alongside','amid',
		'amidst','among','amongst','an','and','anenst','apropos','apud','around','as','aside','astride','at','athwart','atop',
		'barring','before','behind','below','beneath','beside','besides','between','beyond','but','by','circa',
		'concerning','despite','down','during','except','excluding','failing','following','for','forenenst','from',
		'given','in','including','inside','into','like','mid','midst','minus','modulo','near','next','notwithstanding',
		'o','of','off','on','onto','opposite','or','out','outside','over','pace','past','per','plus','pro','qua','regarding',
		'round','s','sans','save','since','so','than','the','through','thru','throughout','thruout','till','times','to','toward',
		'towards','under','underneath','unlike','until','unto','up','upon','versus','vs','via','vice','vis','with','within',
		'without','worth','this'
	];

	return str
			.replace(/\w+/ig, word => {
				const lcWord = word.toLowerCase();
				return noiseWords.includes(lcWord)
					? lcWord			// noise words are kept lowercased
					: ucFirst(word);	// not noise words are capitalised

			})
			// the first word of the string and the first word after a column are capitalised
			.replace(/(^\S|:\s*\S)/g, char => char.toUpperCase());

};

export default StringUtils
