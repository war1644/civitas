/**
 * Main Game event object.
 * 
 * @param {Object} params
 * @license GPL-3.0-or-later
 * @class event
 * @returns {event}
 */
class event {

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {event}
	 * @param {Object} params
	 */
	constructor (params) {
		this._core = params.core;
		this.name = params.name;
		this.chance = (typeof params.chance !== 'undefined') ? params.chance : 0.001;
		this.description = params.description;
		this.raise = typeof params.raise !== 'undefined' ? params.raise : null;
		this.lower = typeof params.lower !== 'undefined' ? params.lower : null;
		this.destroy = typeof params.destroy !== 'undefined' ? params.destroy : null;
		this.build = typeof params.build !== 'undefined' ? params.build : null;
		this.process();
		return this;
	}

	/**
	 * Process the event data.
	 * 
	 * @public
	 * @returns {event}
	 */
	process () {
		const core = this.core();
		const random_s_id = game.get_random(1, core.settlements.length);
		const with_settlement = core.get_settlement(random_s_id);
		const settlement = core.get_settlement();
		let description = '';
		if (with_settlement !== false) {
			description = this.description.replace(/SETTLEMENT/g, with_settlement.name());
			if (this.raise !== null) {
				for (let item in this.raise) {
					if (item === 'influence') {
						settlement.raise_influence(with_settlement.id(), this.raise[item]);
					} else {
						if (settlement.has_storage_space_for(item, this.raise[item])) {
							settlement.add_to_storage(item, this.raise[item]);
						}
					}
					let replace = new RegExp(item.toUpperCase(), 'g');
					description = description.replace(replace, this.raise[item]);
				}
			}
			if (this.lower !== null) {
				for (let item in this.lower) {
					if (item === 'influence') {
						settlement.lower_influence(with_settlement.id(), this.lower[item]);
					} else {
						settlement.remove_resource(item, this.lower[item]);
					}
					let replace = new RegExp(item.toUpperCase(), 'g');
					description = description.replace(replace, this.lower[item]);
				}
			}
		}
		if (this.destroy !== null) {
			let buildings = settlement.get_buildings();
			const building = game.get_random(1, buildings.length);
			const _building = buildings[building];
			if (typeof _building !== 'undefined') {
				const name = _building.name;
				buildings[building].demolish();
				let replace = new RegExp('BUILDING', 'g');
				description = description.replace(replace, name);
			}
		}
		if (this.build !== null) {
			//const buildings = settlement.get_buildings();
			// Todo
			let replace = new RegExp('BUILDING', 'g');
			description = description.replace(replace, name);
		}
		if (settlement.is_player()) {
			core.ui().notify(description, 'Event: ' + this.name, false, game.NOTIFY_EVENT);
		}
		core.ui().log('event', this.name);
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
