/**
 * List of the possible ruler personality types.
 * 
 * @constant
 * @default
 * @type {Array}
 */
game.PERSONALITIES = [
    'none',
    'balanced',
    'diplomat',
    'warlord'
];

/**
 * Balanced type, the ruler weights in all the possibilities before deciding
 * whether to go to war or let diplomacy win.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.PERSONALITY_BALANCED = 1;

/**
 * The ruler will always consider diplomacy before going to war.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.PERSONALITY_DIPLOMAT = 2;

/**
 * If you upset this ruler, he will go to war and give you hell.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.PERSONALITY_WARLORD = 3;
