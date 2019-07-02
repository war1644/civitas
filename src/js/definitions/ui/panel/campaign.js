/**
 * Campaign panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_CAMPAIGN = {

	params_data: null,

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'campaign',

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
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let campaign = params.data;
		let class_name = '';
		let tabs = ['Info'];
		this.params_data = params;
		if (campaign.type === civitas.CAMPAIGN_ARMY || campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			class_name = 'army';
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			class_name = 'caravan';
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			class_name = 'spy';
		}
		$(this.handle + ' header').append(class_name.capitalize() + ' mission');
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				tabs.push('Soldiers');
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				tabs.push('Ships');
			}
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			tabs.push('Resources');
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			tabs.push('Spy');
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				tabs.push('Soldiers');
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				tabs.push('Ships');
			}
			tabs.push('Resources');
		}
		$(this.handle + ' section').append(core.ui().tabs(tabs));
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let campaign = this.params_data.data;
		let out = '';
		let source = core.get_settlement(campaign.source.id);
		let destination = core.get_settlement(campaign.destination.id);
		let distance = core.world().get_distance(campaign.source, campaign.destination);
		let mission_type;
		let action = '';
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			mission_type = 'Army';
			action = 'Attacking';
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			mission_type = 'Army';
			action = 'Returning';
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			mission_type = 'Spy';
			action = 'Sneaking in';
		} else if (campaign.type === civitas.CAMPAIGN_SCOUT) {
			mission_type = 'Scout';
			action = 'Scouting';
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			mission_type = 'Caravan';
			action = 'Going to';
		} else {
			mission_type = 'Misc';
			action = 'Going to';
		}
		$(this.handle + ' #tab-info').empty().append('' +
			'<img class="avatar right" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? destination.ruler().avatar : source.ruler().avatar) + '.png" />' +
			'<dl>' +
				'<dt>Type</dt>' +
				'<dd>' + mission_type + '</dd>' +
				'<dt>Sent By</dt>' +
				'<dd>' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? destination.name() : source.name()) + '</dd>' +
				'<dt>Destination</dt>' +
				'<dd>' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? source.name() : destination.name()) + '</dd>' +
				'<dt>Action</dt>' +
				'<dd>' + action + '</dd>' +
				'<dt>Distance</dt>' +
				'<dd>' + distance + ' miles (' + campaign.duration + ' days)</dd>' +
				'<dt>Remaining</dt>' +
				'<dd>' + (10 * (campaign.duration - campaign.passed)) + ' miles (' + (campaign.duration - campaign.passed) + ' days)</dd>' +
			'</dl>');
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				$(this.handle + ' #tab-soldiers').empty().append(core.ui().army_list(campaign.data.army));
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				$(this.handle + ' #tab-ships').empty().append(core.ui().navy_list(campaign.data.navy));
			}
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			if (typeof campaign.data.resources !== 'undefined' && !$.isEmptyObject(campaign.data.resources)) {
				out = '<p>This caravan has the the following resources:</p>' +
					'<dl>';
				for (let item in campaign.data.resources) {
					if (campaign.data.resources[item] > 0) {
						out += '<dt>' + campaign.data.resources[item] + '</dt>' +
							'<dd>' + core.ui().resource_small_img(item) + '</dd>';
					}
				}
				out += '</dl>';
			} else {
				out = '<p>This is an empty caravan with no resources.</p>';
			}
			$(this.handle + ' #tab-resources').empty().append(out);
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			out = '<dl>' +
				'<dt>Mission</dt>' +
				'<dd>' + civitas.SPY_MISSIONS[campaign.data.mission].capitalize() + '</dd>' +
				(campaign.data.mission === civitas.SPY_MISSION_RELIGION ? '<dt>Religion</dt>' +
				'<dd>' + civitas.RELIGIONS[campaign.data.religion].capitalize() + '</dd>' : '') +
				'<dt>Espionage</dt>' +
				'<dd>' + campaign.data.espionage + ' ' + core.ui().resource_small_img('espionage') + '</dd>' +
				'<dt>Success chance</dt>' +
				'<dd>' + Math.ceil(campaign.data.espionage / 100) + '%</dd>' +
			'</dl>';
			$(this.handle + ' #tab-spy').empty().append(out);
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				$(this.handle + ' #tab-soldiers').empty().append(core.ui().army_list(campaign.data.army));
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				$(this.handle + ' #tab-ships').empty().append(core.ui().navy_list(campaign.data.navy));
			}
			if (typeof campaign.data.resources !== 'undefined' && !$.isEmptyObject(campaign.data.resources)) {
				out = '<p>This army is bringing back to its home city the following spoils of war:</p>' +
					'<dl>';
				for (let item in campaign.data.resources) {
					if (campaign.data.resources[item] > 0) {
						out += '<dt>' + campaign.data.resources[item] + '</dt>' +
							'<dd>' + core.ui().resource_small_img(item) + '</dd>';
					}
				}
				out += '</dl>';
			} else {
				out = '<p>This army is returning with no spoils of war.</p>';
			}
			$(this.handle + ' #tab-resources').empty().append(out);
		}
	}
};
