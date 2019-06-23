/**
 * Campaign panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_CAMPAIGN = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template(),

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
			$(this.handle + ' section').append(civitas.ui.tabs(['Info', 'Army', 'Navy']));
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			$(this.handle + ' section').append(civitas.ui.tabs(['Info', 'Resources']));
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			$(this.handle + ' section').append(civitas.ui.tabs(['Info', 'Spy']));
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			$(this.handle + ' section').append(civitas.ui.tabs(['Info', 'Army', 'Navy', 'Resources']));
		}
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
		let distance = civitas.utils.get_distance(campaign.source, campaign.destination);
		let action = '';
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			action = 'Attacking';
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			action = 'Returning';
		} else {
			action = 'Going to';
		}
		$(this.handle + ' #tab-info').empty().append('' +
			'<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? destination.ruler().avatar : source.ruler().avatar) + '.png" />' +
			'<dl>' +
				'<dt>Sent By</dt><dd>' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? destination.name() : source.name()) + '</dd>' +
				'<dt>Destination</dt><dd>' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? source.name() : destination.name()) + '</dd>' +
				'<dt>Action</dt><dd>' + action + '</dd>' +
				'<dt>Distance</dt><dd>' + distance + ' miles (' + campaign.duration + ' days)</dd>' +
				'<dt>Remaining</dt><dd>' + (10 * (campaign.duration - campaign.passed)) + ' miles (' + (campaign.duration - campaign.passed) + ' days)</dd>' +
			'</dl>');
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			$(this.handle + ' #tab-army').empty().append(civitas.ui.army_list(campaign.data.army));
			$(this.handle + ' #tab-navy').empty().append(civitas.ui.navy_list(campaign.data.navy));
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			if (typeof campaign.data.resources !== 'undefined' && !$.isEmptyObject(campaign.data.resources)) {
				out = '<p>This caravan has the the following resources:</p>' +
					'<dl>';
				for (let item in campaign.data.resources) {
					if (campaign.data.resources[item] > 0) {
						out += '<dt>' + campaign.data.resources[item] + '</dt>' +
							'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
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
				'<dd>' + campaign.data.espionage + ' ' + civitas.ui.resource_small_img('espionage') + '</dd>' +
				'<dt>Success chance</dt>' +
				'<dd>' + Math.ceil(campaign.data.espionage / 100) + '%</dd>' +
			'</dl>';
			$(this.handle + ' #tab-spy').empty().append(out);
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			$(this.handle + ' #tab-army').empty().append(civitas.ui.army_list(campaign.data.army));
			$(this.handle + ' #tab-navy').empty().append(civitas.ui.navy_list(campaign.data.navy));
			if (typeof campaign.data.resources !== 'undefined' && !$.isEmptyObject(campaign.data.resources)) {
				out = '<p>This army is bringing back to its home city the following spoils of war:</p>' +
					'<dl>';
				for (let item in campaign.data.resources) {
					if (campaign.data.resources[item] > 0) {
						out += '<dt>' + campaign.data.resources[item] + '</dt>' +
							'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
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
