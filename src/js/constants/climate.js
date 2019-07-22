/**
 * List of the possible climate types.
 * 
 * @constant
 * @default
 * @type {Array}
 */
game.CLIMATES = [
	'none',
	'temperate',
	'tropical',
	'arid',
	'polar'
];

/**
 * Temperate climate, all balanced.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.CLIMATE_TEMPERATE = 1;

/**
 * Tropical climate, favoring farms and exotic goods.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.CLIMATE_TROPICAL = 2;

/**
 * Arid climate, favoring ore mines.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.CLIMATE_ARID = 3;

/**
 * Polar climate, very extreme.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.CLIMATE_POLAR = 4;
