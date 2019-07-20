/**
 * Army panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_ARMY = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'army',
		
	/**
	 * Callback function for creating the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = this.core().ui().generic_panel_template();
	},

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let core = this.core();
		let my_settlement = core.get_settlement();
		let army = params.data;
		$(this.handle + ' header').append(army.name);
		let tabs = ['Info'];
		if (my_settlement.num_soldiers(army.army) > 0) {
			tabs.push('Soldiers');
		}
		if (my_settlement.num_ships(army.navy) > 0) {
			tabs.push('Ships');
		}
		$(this.handle + ' section').append(core.ui().tabs(tabs));
		$(this.handle + ' #tab-info').append('<img class="avatar right" src="' + civitas.ASSETS_URL + 'images/assets/emblems/' + ((typeof army.icon !== 'undefined') ? army.icon : '22') + '.png" />' + '<p>' + army.description + '</p>');
		if (my_settlement.num_soldiers(army.army) > 0) {
			$(this.handle + ' #tab-soldiers').append(core.ui().army_list(army.army));
		}
		if (my_settlement.num_ships(army.navy) > 0) {
			$(this.handle + ' #tab-ships').append(core.ui().navy_list(army.navy));
		}
	}
};
