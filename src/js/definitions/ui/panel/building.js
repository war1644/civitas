/**
 * Building panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_BUILDING = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.building_panel_template(),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'building',
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let building = this.core().get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' section').empty().append(civitas.ui.building_panel(this.params_data, building.get_level()));
		} else {
			this.destroy();
		}
	}
};
