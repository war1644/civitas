/**
 * Building panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_BUILDING = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'building',
	
	/**
	 * Callback function for creating the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = this.core().ui().building_panel_template();
	},

	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let core = this.core();
		let building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' section').empty().append(core.ui().building_panel(this.params_data, building.get_level()));
		} else {
			this.destroy();
		}
	}
};
