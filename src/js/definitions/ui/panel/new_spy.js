/**
 * Create a new spy panel data.
 *
 * @type {Object}
 */
civitas.PANEL_NEW_SPY = {
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>Create spy' +
				'<a class="tips close" title="Close"></a>' +
			'</header>' +
			'<section></section>' +
			'<div class="toolbar">' +
				'<a class="btn dispatch" href="#">Dispatch</a>' +
			'</div>' +
		'</div>',
	id: 'new-spy',
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = params.data;
		let settlements = core.get_settlements();
		let espionage = my_settlement.espionage();
		let location = my_settlement.location();
		let distance = civitas.utils.get_distance_in_days(location, settlement.location());
		let _t = '<fieldset>' +
			'<legend>Initial costs</legend>' +
			'<dl>';
		for (let item in civitas.SPY_COSTS) {
			let _cost = 0;
			if (item === 'coins') {
				_cost = civitas.SPY_COSTS[item] * distance;
			} else if (item === 'provisions') {
				_cost = Math.ceil((civitas.SPY_COSTS[item] * distance) / 2);
			} else {
				_cost = civitas.SPY_COSTS[item];
			}
			_t += '<dt>' + civitas.utils.nice_numbers(_cost) + '</dt>' +
				'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
		}
		_t += '</dl>' +
		'</fieldset>' +
		'<fieldset>' +
			'<legend>Destination</legend>' +
			'<select class="espionage-destination">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < settlements.length; i++) {
			_t += '<option ' + (settlement && (settlements[i].id() === settlement.id()) ? 'selected ' : '') + 'value="' + settlements[i].id() + '">' + settlements[i].nice_name() + '</option>';
		}
		_t += '</select>' +
		'</fieldset>' +
		'<fieldset class="range-combo">' +
			'<legend>Espionage</legend>' +
			'<input type="range" value="' + espionage + '" min="1" max="' + espionage + '" class="espionage-range" />' +
			'<input type="text" readonly value="' + espionage + '" class="espionage-value tips" title="Total espionage assigned to this spy." />' +
			'<input type="text" readonly value="' + Math.ceil(espionage / 100) + '%" class="espionage-chance tips" title="Chance of mission success." />' +
		'</fieldset>' +
		'<fieldset>' +
			'<legend>Mission</legend>' +
			'<select class="espionage-mission">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < civitas.SPY_MISSIONS.length; i++) {
			_t += '<option value="' + i + '">' + civitas.SPY_MISSIONS[i].capitalize() + '</option>';
		}
		_t += '</select>' +
		'</fieldset>' +
		'<fieldset class="espionage-rel">' +
			'<legend>Religion' + (settlement ? ' (currently ' + settlement.religion().name + ')': '') + '</legend>' +
			'<select class="espionage-religion">';
		for (let i = 0; i < civitas.RELIGIONS.length; i++) {
			_t += '<option value="' + i + '">' + civitas.RELIGIONS[i].capitalize() + (i === my_settlement.religion().id ? ' (your religion)' : '') + '</option>';
		}
		_t += '</select>' +
			'<p><strong>Note!</strong> Attempting to change a settlement`s religion uses up all your accumulated faith.</p>' +
		'</fieldset>';
		$(this.handle + ' section').empty().append(_t);
		$(this.handle).on('change', '.espionage-range', function() {
			let value = parseInt($(this).val());
			$(self.handle + ' .espionage-value').val(value);
			$(self.handle + ' .espionage-chance').val(Math.ceil(value / 100) + '%');
		}).on('change', '.espionage-mission', function() {
			let value = parseInt($(this).val());
			if (value === civitas.SPY_MISSION_RELIGION) {
				$(self.handle + ' .espionage-rel').show();
			} else {
				$(self.handle + ' .espionage-rel').hide();
			}
		}).on('click', '.dispatch', function() {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to send spies to other settlements.');
				return false;
			}
			let _espionage = parseInt($(self.handle + ' .espionage-value').val());
			let destination = parseInt($(self.handle + ' .espionage-destination').val());
			let mission = parseInt($(self.handle + ' .espionage-mission').val());
			if ((settlement && settlement.id() !== destination) || !settlement) {
				settlement = core.get_settlement(destination);
			}
			if (destination === 0 || _espionage > espionage || !settlement || mission <= 0) {
				core.error('There was an error creating and dispatching the spy, check the data you entered and try again.');
				return false;
			}
			let data = {
				espionage: _espionage,
				mission: mission
			};
			if (mission === civitas.SPY_MISSION_RELIGION) {
				let _religion = parseInt($(self.handle + ' .espionage-religion').val());
				data.religion = _religion;
			}
			if (core.add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_SPY, data)) {
				core.achievement('jamesbond');
				self.destroy();
			} else {
				core.error('There was an error creating and dispatching the spy, check the data you entered and try again.');
			}
			return false;
		});
	},
	on_refresh: function() {
		let core = this.core();
		let my_settlement = core.get_settlement();
		let espionage = my_settlement.espionage();
		$(this.handle + ' .espionage-range').attr('max', espionage);
	}
};
