/**
 * Main Game Chat object.
 * 
 * @param {Object} params
 * @license GPL-3.0-or-later
 * @class chat
 * @returns {chat}
 */
class chat {

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {chat}
	 * @param {Object} params
	 */
	constructor (params) {
		this._core = params.core;
		// Todo
		return this;
	}

	/**
	 * Send data to the server.
	 *
	 * @public
	 * @returns {chat}
	 * @param {String} message
	 */
	send (message) {
		// Todo
	}

	/**
	 * Get messages from the server.
	 *
	 * @public
	 * @returns {Object}
	 */
	get () {
		// Todo
	}

	/**
	 * Return a pointer to the game core.
	 * 
	 * @public
	 * @returns {game}
	 */
	core () {
		return this._core;
	}
}
