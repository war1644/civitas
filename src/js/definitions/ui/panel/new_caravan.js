/**
 * Create a new caravan panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_NEW_CARAVAN = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>Create caravan<a class="tips close" title="Close"></a>' +
			'</header>' +
			'<section></section>' +
			'<div class="toolbar">' +
				'<a class="btn dispatch" href="#">Dispatch</a>' +
			'</div>' +
		'</div>',

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'new-caravan',
	
	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		this.resources = {};
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = params.data;
		let settlements = core.get_settlements();
		let location = my_settlement.location();
		let distance = civitas.utils.get_distance_in_days(location, settlement.location());
		let _t = '<fieldset>' +
			'<legend>Initial costs</legend>' +
			'<dl>';
		for (let item in civitas.CARAVAN_COSTS) {
			let _cost = 0;
			if (item === 'coins') {
				_cost = civitas.CARAVAN_COSTS[item] * distance;
			} else if (item === 'provisions') {
				_cost = Math.ceil((civitas.CARAVAN_COSTS[item] * distance) / 2);
			} else {
				_cost = civitas.CARAVAN_COSTS[item];
			}
			_t += '<dt>' + civitas.utils.nice_numbers(_cost) + '</dt>' +
				'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
		}
		_t += '</dl>' +
		'</fieldset>' +
		'<fieldset>' +
			'<legend>Destination</legend>' +
			'<select class="caravan-destination">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < settlements.length; i++) {
			_t += '<option ' + (settlement && (settlements[i].id() === settlement.id()) ? 'selected ' : '') + 'value="' + settlements[i].id() + '">' + settlements[i].nice_name() + '</option>';
		}
		_t += '</select>' +
		'</fieldset>' +
		'<fieldset class="select-combo">' +
			'<legend>Resources</legend>' +
			'<select class="caravan-resources-select">' +
				'<option value="0">-- select --</option>' +
				'<option value="coins">Coins</option>';
		let resources = my_settlement.get_resources();
		for (let item in resources) {
			if (!civitas.utils.is_virtual_resource(item)) {
				_t += '<option value="' + item + '"> ' + civitas.utils.get_resource_name(item) + '</option>';
			}
		}
		_t += '</select>' +
			'<input title="Add the resources to the list." type="button" class="tips caravan-resources-add" value="+" />' +
			'<input title="Amount of selected resource to add to the caravan." type="number" value="1" class="tips caravan-resources-amount" min="1" max="999" />' +
			'<div class="caravan-resources clearfix"></div>' +
		'</fieldset>';
		$(this.handle + ' section').empty().append(_t);
		this.generate_table_data = function() {
			let _t = '<table class="caravan-resources clearfix">' +
				'<thead>' +
				'<tr>' +
					'<td>Amount</td>' +
					'<td>Resource</td>' +
					'<td></td>' +
				'</tr>' +
				'</thead>' +
				'<tbody>';
			for (let item in this.resources) {
				_t += '<tr>' +
					'<td>' + this.resources[item] + '</td>' +
					'<td>' + civitas.ui.resource_small_img(item) + '</td>' +
					'<td>' +
						'<a title="Remove this resource from the caravan." href="#" data-id="' + item + '" class="tips caravan-resources-delete">-</a>' +
					'</td>' +
				'</tr>';
			}
			_t += '</tbody>' +
			'</table>';
			$(this.handle + ' .caravan-resources').empty().append(_t);
		};
		$(this.handle).on('click', '.caravan-resources-add', function() {
			let amount = parseInt($(self.handle + ' .caravan-resources-amount').val());
			let resource = $(self.handle + ' .caravan-resources-select').val();
			if (resource !== '0') {
				if (typeof self.resources[resource] !== 'undefined' && !my_settlement.has_resource(resource, self.resources[resource] + amount)) {
					core.error(my_settlement.name() + ' doesn`t have enough ' + civitas.utils.get_resource_name(resource) + '.');
					return false;
				} else if (typeof self.resources[resource] === 'undefined' && !my_settlement.has_resource(resource, amount)) {
					core.error(my_settlement.name() + ' doesn`t have enough ' + civitas.utils.get_resource_name(resource) + '.');
					return false;
				}
				if (typeof self.resources[resource] !== 'undefined') {
					self.resources[resource] = self.resources[resource] + amount;
				} else {
					self.resources[resource] = amount;
				}
				self.generate_table_data();
			}
			return false;
		}).on('click', '.caravan-resources-delete', function() {
			let resource = $(this).data('id');
			delete self.resources[resource];
			self.generate_table_data();
			return false;
		}).on('click', '.dispatch', function() {
			if (!my_settlement.can_trade()) {
				core.error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			let destination = parseInt($(self.handle + ' .caravan-destination').val());
			if ((settlement && settlement.id() !== destination) || !settlement) {
				settlement = core.get_settlement(destination);
			}
			if (destination === 0 || !settlement || $.isEmptyObject(self.resources)) {
				core.error('There was an error creating and dispatching the caravan, check the data you entered and try again.');
				return false;
			}
			if (core.add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_CARAVAN, {
				resources: self.resources
			})) {
				core.achievement('donkeylord');
				self.destroy();
			} else {
				core.error('There was an error creating and dispatching the caravan, check the data you entered and try again.');
			}
			return false;
		});
	}
};
