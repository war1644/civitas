/**
 * Embassy panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_EMBASSY = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'embassy',

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
		let settlements = core.get_settlements();
		let status = settlement.status();
		let building = core.get_settlement().get_building(this.params_data.handle);
		let level = building.get_level();
		$(this.handle + ' section').append(core.ui().tabs([
			'Info',
			'Diplomacy',
			'Espionage'
		]));
		$(this.handle + ' #tab-diplomacy').empty().append('<div class="settlements-list"></div>');
		$(this.handle).on('click', '.view', function () {
			let _settlement_id = parseInt($(this).data('id'));
			let _settlement = core.get_settlement(_settlement_id);
			if (_settlement) {
				core.ui().open_panel(civitas.PANEL_SETTLEMENT, _settlement);
			}
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
		let settlements = core.get_settlements();
		let status = settlement.status();
		let building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			let level = building.get_level();
			$(this.handle + ' #tab-info').empty().append(core.ui().building_panel(this.params_data, level));
			$(this.handle + ' #tab-espionage').empty().append(
				'<h2>Espionage points</h2>' +
				'<div class="section">' + 
					core.ui().progress((settlement.espionage() * 100) / civitas.MAX_ESPIONAGE_VALUE, 'large', settlement.espionage() + ' / ' + civitas.MAX_ESPIONAGE_VALUE) + 
				'</div>'
			);
			let _t = '<table class="normal">' +
				'<thead>' +
				'<tr>' +
					'<td>Settlement</td>' +
					'<td>Ruler</td>' +
					'<td>Influence</td>' +
					'<td>Religion</td>' +
					'<td>Status</td>' +
					'<td>Personality</td>' +
				'</tr>' +
				'</thead>';
			for (let i = 1; i < settlements.length; i++) {
				let _status = settlement.get_diplomacy_status(settlements[i].id());
				_t += '<tr>' +
						'<td>' +
							'<p>' + settlements[i].name() + '</p> ' +
						'</td>' +
						'<td class="icon">' +
							'<a data-id="' + settlements[i].id() + '" title="View info about this settlement." class="tips view" href="#">' +
								'<img class="avatar small" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + settlements[i].ruler().avatar + '.png" />' +
							'</a>' +
						'</td>' +
						'<td>' +
							'<div data-id="' + settlements[i].id() + '" >' + core.ui().progress(status[settlements[i].id()].influence, 'small') + '</div>' +
						'</td>' +
						'<td>' +
							'<p>' + settlements[i].religion().name + '</p>' +
						'</td>' +
						'<td>' +
							'<p>' + settlement.get_diplomacy_status(settlements[i].id()).name + '</p>' +
						'</td>' +
						'<td>' +
							'<p>' + settlements[i].personality().name + '</p>' +
						'</td>' +
					'</tr>';
			}
			_t += '<tfoot>' +
				'<tr>' +
					'<td>Settlement</td>' +
					'<td>Ruler</td>' +
					'<td>Influence</td>' +
					'<td>Religion</td>' +
					'<td>Status</td>' +
					'<td>Personality</td>' +
				'</tr>' +
				'</tfoot>' +
				'</table>';
			$(this.handle + ' .settlements-list').empty().append(_t);
		} else {
			this.destroy();
		}
	}
};
