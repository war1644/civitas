/**
 * Settlement panel data.
 *
 * @type {Object}
 */
civitas.PANEL_SETTLEMENT = {
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>' +
				'<a class="tips close" title="Close"></a>' +
			'</header>' +
			'<section></section>' +
			'<footer>' +
				'<a class="tips attack" title="Attack this settlement." href="#"></a>' +
				'<a class="tips caravan" title="Send a caravan to this settlement." href="#"></a>' +
				'<a class="tips spy" title="Send a spy to this settlement." href="#"></a>' +
				'<a class="tips alliance" title="Propose an alliance to this settlement." href="#"></a>' +
				'<a class="tips pact" title="Propose a pact to this settlement." href="#"></a>' +
				'<a class="tips ceasefire" title="Propose a cease fire to this settlement." href="#"></a>' +
				'<a class="tips join" title="Ask this settlement to join your city." href="#"></a>' +
				'<a class="tips war" title="Declare war to this settlement." href="#"></a>' +
			'</footer>' +
		'</div>',
	params_data: null,
	id: 'settlement',
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = params.data;
		this.params_data = params;
		let trades = settlement.get_trades();
		$(this.handle + ' header').append(settlement.name());
		let tabs = [];
		if (settlement.is_urban()) {
			tabs.push('Info');
			if (my_settlement.can_diplomacy()) {
				tabs.push('Army');
				if (settlement.waterside() === true) {
					tabs.push('Navy');
				}
			}
			tabs.push('Resources', 'Imports', 'Exports');
		} else {
			tabs.push('Info');
			if (my_settlement.can_diplomacy() || settlement.is_camp()) {
				tabs.push('Army');
				if (settlement.waterside() === true) {
					tabs.push('Navy');
				}
			}
			tabs.push('Resources');
		}
		$(this.handle + ' section').append(civitas.ui.tabs(tabs));
		$(this.handle).on('click', '.alliance', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to propose an alliance to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_ALLIANCE, {})) {
							core.error('There was an error proposing an alliance to this settlement, check the data you entered and try again.');
							return false;
						}
						core.achievement('pacifist');
					}
				},
				'Are you sure you want to propose an alliance to this settlement?'
			);
			return false;
		}).on('click', '.join', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to ask other settlements to join your city.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_JOIN, {})) {
							core.error('There was an error proposing this settlement to join your city, check the data you entered and try again.');
							return false;
						}
						core.achievement('rulethemall');
					}
				},
				'Are you sure you want to propose this this settlement to join you?'
			);
			return false;
		}).on('click', '.pact', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to propose a pact to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_PACT, {})) {
							core.error('There was an error proposing a pact to this settlement, check the data you entered and try again.');
							return false;
						}
						core.achievement('friendly');
					}
				},
				'Are you sure you want to propose a pact to this settlement?'
			);
			return false;
		}).on('click', '.ceasefire', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to propose a cease fire to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_CEASE_FIRE, {})) {
							core.error('There was an error proposing a cease fire to this settlement, check the data you entered and try again.');
							return false;
						}
					}
				},
				'Are you sure you want to propose a cease fire to this settlement?'
			);
			return false;
		}).on('click', '.war', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to declare war to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						my_settlement.diplomacy(settlement.id(), civitas.DIPLOMACY_WAR);
					}
				},
				'Are you sure you want to declare war to this settlement?<br /><br />You will lose all influence over ' + settlement.name() + ' and the settlement might retaliate back!'
			);
			return false;
		}).on('click', '.caravan', function () {
			if (!my_settlement.can_trade()) {
				core.error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			core.open_panel(civitas.PANEL_NEW_CARAVAN, settlement);
			return false;
		}).on('click', '.spy', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to send spies to other settlements.');
				return false;
			}
			core.open_panel(civitas.PANEL_NEW_SPY, settlement);
			return false;
		}).on('click', '.attack', function () {
			if (!my_settlement.can_recruit_soldiers()) {
				core.error('You will need to construct a Military Camp before being able to attack other settlements.');
				return false;
			}
			core.open_panel(civitas.PANEL_NEW_ARMY, settlement);
			return false;
		});
	},
	on_refresh: function() {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = this.params_data.data;
		let trades = settlement.get_trades();
		let _status = my_settlement.get_diplomacy_status(settlement.id());
		let sett_type_text = '';
		let location = my_settlement.location();
		if (settlement.is_city()) {
			sett_type_text = 'City';
		} else if (settlement.is_metropolis()) {
			sett_type_text = 'Metropolis';
		} else if (settlement.is_village()) {
			sett_type_text = 'Village';
		} else if (settlement.is_camp()) {
			sett_type_text = 'Raider Camp';
		}
		$(this.handle + ' #tab-info').empty().append('' +
			'<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' +
			settlement.ruler().avatar + '.png" />' +
			'<dl>' +
				'<dt>' + settlement.ruler().title + '</dt><dd>' + settlement.ruler().name + '</dd>' +
				'<dt>Settlement Type</dt>' +
				'<dd>' + sett_type_text + '</dd>' +
				'<dt>Climate</dt>' +
				'<dd>' + settlement.climate().name + '</dd>' +
				(my_settlement.can_diplomacy() ?
				'<dt>Personality</dt>' +
				'<dd>' + settlement.personality().name + '</dd>'
				: '') +
				'<dt>Nationality</dt>' +
				'<dd>' + settlement.nationality().name + '</dd>' +
				(my_settlement.can_diplomacy() && (settlement.is_urban()) ? 
				'<dt>Level</dt>' +
				'<dd>' + settlement.level() + '</dd>' +
				'<dt>Prestige</dt>' +
				'<dd>' + civitas.ui.progress((settlement.prestige() * 100) / civitas.MAX_PRESTIGE_VALUE, 'small', settlement.prestige()) + '</dd>'
				: '') + 
				'<dt>Population</dt>' +
				'<dd>' + civitas.utils.nice_numbers(settlement.population()) + '</dd>' +
				(my_settlement.can_diplomacy() ?
				'<dt>Coins</dt>' +
				'<dd>' + civitas.utils.nice_numbers(settlement.coins()) + '</dd>' +
				'<dt>Religion</dt>' +
				'<dd>' + settlement.religion().name + '</dd>' +
				'<dt>Influence</dt>' +
				'<dd>' + civitas.ui.progress(my_settlement.get_influence_with_settlement(settlement.id()), 'small') + '</dd>' +
				'<dt>Diplomatic Status</dt>' +
				'<dd>' + my_settlement.get_diplomacy_status(settlement.id()).name + '</dd>'
				: '') + 
				'<dt>Distance</dt>' +
				'<dd>' + civitas.utils.get_distance(location, settlement.location()) + ' miles (' + civitas.utils.get_distance_in_days(location, settlement.location()) + ' days)</dd>' +
			'</dl>');
		if (my_settlement.can_diplomacy() || settlement.is_camp()) {
			$(this.handle + ' #tab-army').empty().append(civitas.ui.army_list(settlement.get_army()));
			if (settlement.waterside() === true) {
				$(this.handle + ' #tab-navy').empty().append(civitas.ui.navy_list(settlement.get_navy()));
			}
		}
		if (settlement.is_urban()) {
			$(this.handle + ' #tab-imports').empty().append('<p>Below are the goods this city will be buying this year.</p>' + civitas.ui.trades_list(trades, 'imports'));
			$(this.handle + ' #tab-exports').empty().append('<p>Below are the goods this city will be selling this year.</p>' + civitas.ui.trades_list(trades, 'exports'));
		}
		let out = '';
		let _out = '<p>This settlement has the the following resources:</p>';
		for (let item in settlement.get_resources()) {
			if (!civitas.utils.is_virtual_resource(item)) {
				if (settlement.resources[item] > 0) {
					out += civitas.ui.resource_storage_small_el(item, settlement.resources[item]);
				}
			}
		}
		if (out !== '') {
			_out += out;
		} else {
			_out = '<p>This settlement has no resources.</p>';
		}
		$(this.handle + ' #tab-resources').empty().append(_out);
		if (_status.id === civitas.DIPLOMACY_VASSAL) {
			$(this.handle + ' footer .attack').css('display','none');
		} else {
			$(this.handle + ' footer .attack').css('display', 'inline-block');
		}
		if (my_settlement.can_diplomacy()) {
			if (settlement.is_camp()) {
				$(this.handle + ' footer .caravan, ' + this.handle + ' footer .spy').hide();
			} else {
				$(this.handle + ' footer .caravan, ' + this.handle + ' footer .spy').css('display', 'inline-block');
			}
			if (_status.id === civitas.DIPLOMACY_PACT && (settlement.is_urban())) {
				$(this.handle + ' footer .alliance').css('display', 'inline-block');
			} else if (!settlement.is_camp()) {
				$(this.handle + ' footer .alliance').css('display','none');
			}
			if ((_status.id === civitas.DIPLOMACY_TRUCE || _status.id === civitas.DIPLOMACY_CEASE_FIRE) && !settlement.is_camp()) {
				$(this.handle + ' footer .pact').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .pact').css('display','none');
			}
			if (_status.id === civitas.DIPLOMACY_WAR && !settlement.is_camp()) {
				$(this.handle + ' footer .ceasefire').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .ceasefire').css('display','none');
			}
			if ((_status.id !== civitas.DIPLOMACY_WAR && _status.id !== civitas.DIPLOMACY_VASSAL) && !settlement.is_camp()) {
				$(this.handle + ' footer .war').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .war').css('display','none');
			}
			if ((_status.id === civitas.DIPLOMACY_PACT && settlement.is_village()) && !settlement.is_camp()) {
				$(this.handle + ' footer .join').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .join').css('display','none');
			}
		}
	}
};
