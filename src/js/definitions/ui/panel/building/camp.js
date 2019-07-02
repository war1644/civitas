/**
 * Barracks panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_BARRACKS = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'barracks',

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
			'Army'
		]));
		let _t = '<div class="army-list"></div>' +
				'<div class="army-recruiter">';
		for (let item in civitas.SOLDIERS) {
			_t += '<fieldset>' +
					'<legend>' + civitas.SOLDIERS[item].name + '</legend>' +
					'<div class="cost">' +
						'<dl class="nomg">';
			for (let res in civitas.SOLDIERS[item].cost) {
				_t += '<dt>' + civitas.utils.nice_numbers(civitas.SOLDIERS[item].cost[res]) + '</dt><dd>' + core.ui().resource_small_img(res) + '</dd>';
			}
			_t += '</dl>' +
					'</div>' +
					'<div class="info">' +
						'<dl class="nomg">' +
							'<dt>Attack</dt><dd>' + civitas.SOLDIERS[item].attack + '</dd>' +
							'<dt>Defense</dt><dd>' + civitas.SOLDIERS[item].defense + '</dd>' +
						'</dl>' +
					'</div>' +
					'<img data-handle="' + item + '" title="Recruit ' + civitas.SOLDIERS[item].name + '" class="tips recruit-soldier" src="' + civitas.ASSETS_URL + 'images/assets/army/' + item.toLowerCase() + '.png" />' +
				'</fieldset>';
		}
		_t += '</div>';
		$(this.handle + ' #tab-army').empty().append(_t);
		$(this.handle).on('click', '.recruit-soldier', function () {
			let soldier = $(this).data('handle');
			let costs = civitas.SOLDIERS[soldier].cost;
			if (settlement.has_resources(costs)) {
				if (settlement.remove_resources(costs)) {
					if (settlement.recruit_soldier(soldier)) {
						core.ui().notify('A new ' + civitas.SOLDIERS[soldier].name + ' has been recruited.');
						self.on_refresh();
						return false;
					}
				}
			}
			core.ui().error('You don`t have enough resources to recruit a ' + civitas.SOLDIERS[soldier].name + '.');
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
			$(this.handle + ' .army-list').empty().append('<fieldset>' +
					'<legend>Current Army</legend>' + core.ui().army_list(settlement.get_army(), true) +
				'</fieldset>');
		} else {
			this.destroy();
		}
	}
};
