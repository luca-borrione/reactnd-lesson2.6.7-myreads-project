export const ucwords = str =>
	str
		.toLowerCase()
		.replace(/\b\S/g, t => t.toUpperCase());