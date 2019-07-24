/**
 * Main Game API object.
 * 
 * @param {Object} params
 * @license GPL-3.0-or-later
 * @class api
 * @returns {api}
 */
class api {

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {api}
	 * @param {Object} params
	 */
	constructor (params) {
		this._core = params.core;
		return this;
	}

	/**
	 * Sign in a visitor using the specified data.
	 * 
	 * @param {Object} data
	 * @returns {api}
	 */
	login (data) {
		return this.request({
			url: 'login',
			data
		});
	}

	/**
	 * Sign out the currently logged in user.
	 * 
	 * @returns {api}
	 */
	logout () {
		return this.request({
			url: 'logout'
		});
	}

	/**
	 * Get information about the application and API version.
	 *
	 * @returns {api}
	 */
	api_version () {
		return this.request({
			url: 'version'
		});
	}

	/**
	 * Get information about the currently logged in user's city.
	 *
	 * @returns {api}
	 */
	city_info () {
		return this.request({
			url: 'city'
		});
	}

	/**
	 * Perform a heartbeat request and get data about it.
	 *
	 * @returns {api}
	 */
	heartbeat () {
		return this.request({
			url: 'heartbeat'
		});
	}

	/**
	 * Register a visitor using the specified data.
	 * 
	 * @param {Object} data
	 * @returns {api}
	 */
	register (data) {
		return this.request({
			url: 'register',
			data
		});
	}

	/**
	 * Export the specified data to the API endpoint.
	 * 
	 * @param {Object} data
	 * @returns {api}
	 */
	do_export (data) {
		return this.request({
			url: 'export',
			data
		});
	}

	/**
	 * Import the specified data from the API endpoint.
	 * 
	 * @param {Object} data
	 * @returns {api}
	 */
	do_import (data) {
		return this.request({
			url: 'import',
			data
		});
	}

	/**
	 * Internal function for performing an API AJAX request.
	 * 
	 * @param {Object} data
	 * @returns {api}
	 */
	_request (data) {
		$.ajax({
			type: (typeof data.requestType !== 'undefined') ? data.requestType : 'POST',
			dataType: typeof data.dataType !== 'undefined' ? data.dataType : 'jsonp',
			xhrFields: {
				withCredentials: (typeof data.auth === 'undefined' || data.auth === true) ? 
					true : false
			},
			crossDomain: true,
			data: data.data,
			url: game.API_URL + data.url,
			async: (typeof data.async === 'undefined' || data.async === true) ? true : false,
			success: data.success instanceof Function ? data.success : function () {
				// TODO
			},
			error: data.error instanceof Function ? data.error : function () {
				// TODO
			}
		});
		return this;
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
