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
		let army = params.data;
		$(this.handle + ' header').append(army.name);
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Soldiers',
			'Ships'
		]));
		$(this.handle + ' #tab-info').append('<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/emblems/' + ((typeof army.icon !== 'undefined') ? army.icon : '22') + '.png" />' + '<p>' + army.description + '</p>');
		$(this.handle + ' #tab-soldiers').append(civitas.ui.army_list(army.army));
		$(this.handle + ' #tab-ships').append(civitas.ui.navy_list(army.navy));
	}
};
