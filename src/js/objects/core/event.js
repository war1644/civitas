/**
 * Main Game event object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.event
 * @returns {civitas.objects.event}
 */
civitas.objects.event = function (params) {

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Name of the event.
	 *
	 * @private
	 * @type {String}
	 */
	this._name = null;

	/**
	 * Event's chance to occur.
	 *
	 * @private
	 * @type {Number}
	 */
	this._chance = 0;

	/**
	 * Event's effect.
	 *
	 * @private
	 * @type {Number}
	 */
	this._effect = null;

	/**
	 * Description of the event.
	 *
	 * @private
	 * @type {String}
	 */
	this._description = null;

	/**
	 * Event data for lowering stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._lower = null;

	/**
	 * Event data for raising stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._raise = null;

	/**
	 * Event data for destroying stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._destroy = null;

	/**
	 * Event data for building stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._build = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.event}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		this._name = params.name;
		this._chance = (typeof params.chance !== 'undefined') ? params.chance : 0.001;
		this._description = params.description;
		this._raise = typeof params.raise !== 'undefined' ? params.raise : null;
		this._lower = typeof params.lower !== 'undefined' ? params.lower : null;
		this._destroy = typeof params.destroy !== 'undefined' ? params.destroy : null;
		this._build = typeof params.build !== 'undefined' ? params.build : null;
		this.process();
		return this;
	};

	/**
	 * Process the event data.
	 * 
	 * @public
	 * @returns {civitas.objects.event}
	 */
	this.process = function () {
		const core = this.core();
		const random_s_id = civitas.utils.get_random(1, core.settlements.length);
		const with_settlement = core.get_settlement(random_s_id);
		const settlement = core.get_settlement();
		let description = '';
		if (with_settlement !== false) {
			description = this._description.replace(/SETTLEMENT/g, with_settlement.name());
			if (this._raise !== null) {
				for (let item in this._raise) {
					if (item === 'influence') {
						settlement.raise_influence(with_settlement.id(), this._raise[item]);
					} else {
						if (settlement.has_storage_space_for(item, this._raise[item])) {
							settlement.add_to_storage(item, this._raise[item]);
						}
					}
					let replace = new RegExp(item.toUpperCase(), 'g');
					description = description.replace(replace, this._raise[item]);
				}
			}
			if (this._lower !== null) {
				for (let item in this._lower) {
					if (item === 'influence') {
						settlement.lower_influence(with_settlement.id(), this._lower[item]);
					} else {
						settlement.remove_resource(item, this._lower[item]);
					}
					let replace = new RegExp(item.toUpperCase(), 'g');
					description = description.replace(replace, this._lower[item]);
				}
			}
		}
		if (this._destroy !== null) {
			let buildings = settlement.get_buildings();
			const building = civitas.utils.get_random(1, buildings.length);
			const _building = buildings[building];
			if (typeof _building !== 'undefined') {
				const name = _building.get_name();
				buildings[building].demolish();
				let replace = new RegExp('BUILDING', 'g');
				description = description.replace(replace, name);
			}
		}
		if (this._build !== null) {
			const buildings = settlement.get_buildings();
			// Todo
			let replace = new RegExp('BUILDING', 'g');
			description = description.replace(replace, name);
		}
		if (settlement.is_player()) {
			core.ui().notify(description, 'Event: ' + this._name, false, civitas.NOTIFY_EVENT);
		}
		core.ui().log('event', this._name);
		return this;
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

	// Fire up the constructor
	return this.__init(params);
};
