/**
 * Game jailer (enforcing security) object.
 * 
 * @param {Object} params
 * @license GPL-3.0-or-later
 * @class jailer
 * @returns {jailer}
 */
class jailer {

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {jailer}
	 * @param {Object} params
	 */
	constructor (params) {
		this._core = params.core;
		return this;
	}

	/**
	 * Perform an actual security audit.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	check () {
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
