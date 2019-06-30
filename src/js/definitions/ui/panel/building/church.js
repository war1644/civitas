/**
 * Church panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_CHURCH = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'church',

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
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let settlement = core.get_settlement();
		$(this.handle + ' section').append(core.ui().tabs([
			'Info',
			'Religion'
		]));
		$(this.handle).on('click', '.religion', function() {
			let id = parseInt($(this).data('id'));
			core.ui().open_modal(
				function(button) {
					if (button === 'yes') {
						settlement.change_religion(id);
					}
				},
				'Are you sure you want to switch religions? You will lose all your city`s faith!'
			);
			return false;
		});
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let core = this.core();
		let settlement = core.get_settlement();
		let building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' #tab-info').empty().append(core.ui().building_panel(this.params_data, building.get_level()));
			let _t = '<div class="section">' + core.ui().progress((settlement.faith() * 100) / civitas.MAX_FAITH_VALUE, 'large', settlement.faith() + ' / ' + civitas.MAX_FAITH_VALUE) + '</div>' +
				'<p>Changing your settlement`s religion requires <strong>' + civitas.MAX_FAITH_VALUE + '</strong> faith, each religion gives you access to different heroes in your Tavern and gives you a boost to the influence with the cities sharing the same religion.</p>' +
				'<div class="religion-list">';
			for (let i = 0; i < civitas.RELIGIONS.length; i++) {
				_t += '<div data-handle="' + civitas.RELIGIONS[i] + '" data-id="' + i + '" class="religion' + (settlement.religion().id === i ? ' selected' : '') + '"><span>' + civitas.RELIGIONS[i].capitalize() + '</span></div>';
			}
			_t += '</div>';
			$(this.handle + ' #tab-religion').empty().append(_t);
		} else {
			this.destroy();
		}
	}
};
