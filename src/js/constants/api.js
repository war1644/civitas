/**
 * Game API version to connect to.
 *
 * @constant
 * @type {String}
 * @default
 */
game.API_VERSION = '0.3';

/**
 * URL of the main Game API entry point.
 * 
 * @constant
 * @default
 * @type {String}
 */
game.API_ENTRY_POINT = 'https://civitas-api.test/api/';

/**
 * Main Game API entry point + the API version
 *
 * @constant
 * @type {String}
 */
game.API_URL = game.API_ENTRY_POINT + game.API_VERSION + '/';
