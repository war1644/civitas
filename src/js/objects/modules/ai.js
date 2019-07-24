/**
 * Main Game AI (Artificial Intelligence) object.
 * 
 * @param {Object} params
 * @license GPL-3.0-or-later
 * @class ai
 * @returns {ai}
 */
class ai {

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {ai}
	 * @param {Object} params
	 */
	constructor (params) {
		this._core = params.core;
		this.type = params.type;
		// Todo
		return this;
	}

	/**
	 * Perform the actual data processing for this AI.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	process () {
		// Todo
		return true;
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
