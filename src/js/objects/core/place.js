/**
 * Main Game place object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.place
 * @returns {civitas.objects.place}
 */
civitas.objects.place = function(params) {
	
	/**
	 * Settlement properties.
	 *
	 * @private
	 * @type {Object}
	 */
	this._properties = {
		id: null,
		sid: null,
		scouted: false,
		name: null
	};

	/**
	 * The current and needed resources of this place.
	 *
	 * @private
	 * @type {Object}
	 */
	this._resources = {
		current: {
			// Todo
		},
		required: {
			// Todo
		}
	};

	/**
	 * Location of the place.
	 *
	 * @private
	 * @type {Object}
	 */
	this._location = {
		x: 0,
		y: 0
	};

	/**
	 * Pointer to the game core.
	 * 
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.place}
	 * @param {Object} params
	 */
	this.__init = function(params) {
		this._core = params.core;
		this._properties.id = params.properties.id;
		this._properties.sid = params.properties.sid;
		this._properties.scouted = params.properties.scouted;
		this._properties.name = params.properties.name;
		this._location = params.location;
		this._resources = params.resources;
		this.core().world().add_place(this);
		return this;
	};

	/**
	 * Get/set the resources of the place.
	 *
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	this.resources = function(value) {
		if (typeof value !== 'undefined') {
			this._resources = value;
		}
		return this._resources;
	};

	/**
	 * Get/set the location of the place.
	 *
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	this.location = function(value) {
		if (typeof value !== 'undefined') {
			this._location = value;
		}
		return this._location;
	};

	/**
	 * Get/set the id of this place.
	 *
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.id = function(value) {
		if (typeof value !== 'undefined') {
			this._properties.id = id;
		}
		return this._properties.id;
	};

	this.is_claimed = function() {
		if (this._properties.sid === null) {
			return false;
		} else {
			return this._properties.sid;
		}
	};

	this.is_scouted = function() {
		return this._properties.scouted;
	};

	this.scout = function() {
		this._properties.scouted = true;
	};

	this.claim = function(settlement) {
		if (this._properties.sid === null) {
			this._properties.sid = settlement.id();
			return true;
		}
		return false;
	};

	this.unclaim = function(settlement) {
		if (settlement.id() === this._properties.sid) {
			this._properties.sid = null;
			return true;
		}
		return false;
	};

	/**
	 * Get/set the name of this place.
	 * 
	 * @public
	 * @param {String} value
	 * @returns {String}
	 */
	this.name = function(value) {
		if (typeof value !== 'undefined') {
			this._properties.name = value;
		}
		return this._properties.name;
	};
	/**
	 * Return a pointer to the game core.
	 * 
	 * @public
	 * @returns {civitas.game}
	 */
	this.core = function() {
		return this._core;
	};

	/**
	 * Get the settlement properties.
	 *
	 * @public
	 * @returns {Object}
	 */
	this.properties = function() {
		return this._properties;
	};

	/**
	 * Export place data.
	 *
	 * @returns {Object}
	 * @public
	 */
	this.export = function() {
		const data = {
			properties: this.properties(),
			location: this.location(),
			resources: this.resources()
		};
		return data;
	};

	// Fire up the constructor
	return this.__init(params);
};
