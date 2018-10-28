export const ucWords = str =>
	str.toLowerCase().replace(/\b\S/g, t => t.toUpperCase());

export const ucFirst = str =>
	str.toLowerCase().replace(/\S/, t => t.toUpperCase());

export const makeTitle = str => {

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
					? lcWord
					: ucFirst(word);

			})
			.replace(/(^\S|:\s*\S)/g, (match, p) => p.toUpperCase());

};
