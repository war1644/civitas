/**
 * Army panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_ARMY = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template(),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'army',
	
	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
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
		$(this.handle + ' section').append(civitas.ui.tabs(tabs));
		$(this.handle + ' #tab-info').append('<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/emblems/' + ((typeof army.icon !== 'undefined') ? army.icon : '22') + '.png" />' + '<p>' + army.description + '</p>');
		if (my_settlement.num_soldiers(army.army) > 0) {
			$(this.handle + ' #tab-soldiers').append(civitas.ui.army_list(army.army));
		}
		if (my_settlement.num_ships(army.navy) > 0) {
			$(this.handle + ' #tab-ships').append(civitas.ui.navy_list(army.navy));
		}
	}
};
