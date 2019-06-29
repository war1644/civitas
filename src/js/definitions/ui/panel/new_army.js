/**
 * Create a new army panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_NEW_ARMY = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>Create army<a class="tips close" title="Close"></a></header>' +
			'<section></section>' +
			'<div class="toolbar clearfix">' +
				'<a class="dispatch btn iblock" href="#">Dispatch</a>' +
			'</div>' +
		'</div>',

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'new-army',
	
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
		let settlement = params.data;
		let settlements = core.get_settlements();
		let army = my_settlement.get_army();
		let location = my_settlement.location();
		let distance = core.world().get_distance_in_days(location, settlement.location());
		this.assigned_army = {};
		this.assigned_navy = {};
		for (let item in army) {
			this.assigned_army[item] = army[item];
		}
		if (my_settlement.can_build_ships()) {
			let navy = my_settlement.get_navy();
			for (let item in navy) {
				this.assigned_navy[item] = navy[item];
			}
		}
		let _t = '<div class="column">' +
			'<fieldset>' +
				'<legend>Initial costs</legend>' +
				'<dl>';
		for (let item in civitas.ARMY_COSTS) {
			let _cost = 0;
			if (item === 'coins') {
				_cost = civitas.ARMY_COSTS[item] * distance;
			} else if (item === 'provisions') {
				_cost = Math.ceil((civitas.ARMY_COSTS[item] * distance) / 2);
			} else {
				_cost = civitas.ARMY_COSTS[item];
			}
			_t += '<dt>' + civitas.utils.nice_numbers(_cost) + '</dt>' +
				'<dd>' + core.ui().resource_small_img(item) + '</dd>';
		}
		_t += '</dl>' +
			'</fieldset>';
		if (typeof army !== 'undefined') {
			_t += '<fieldset>' +
				'<legend>Soldiers</legend>';
			for (let item in army) {
				_t += '<div class="army-item">' +
					'<a href="#" data-max="' + army[item] + '" data-soldier="' + item + '" class="army-item-inc">+</a>' +
					'<a href="#" data-max="' + army[item] + '" data-soldier="' + item + '" class="army-item-dec">-</a>' +
					'<img class="tips" title="' + civitas.SOLDIERS[item].name + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + item.toLowerCase().replace(/ /g,"_") + '.png" />' +
					'<span class="amount">' + army[item] + '</span>' +
				'</div>';
			}
			_t += '</fieldset>';
		}
		_t += '<fieldset>' +
			'<legend>Destination</legend>' +
			'<select class="army-destination">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < settlements.length; i++) {
			_t += '<option ' + (settlement && (settlements[i].id() === settlement.id()) ? 'selected ' : '') + 'value="' + settlements[i].id() + '">' + settlements[i].nice_name() + '</option>';
		}
		_t += '</select>' +
			'</fieldset>' +
		'</div>' +
		'<div class="column">';
		if (my_settlement.can_build_ships()) {
			if (typeof navy !== 'undefined') {
				_t += '<fieldset>' +
					'<legend>Ships</legend>';
				for (let item in navy) {
					_t += '<div class="navy-item">' +
							'<a href="#" data-max="' + navy[item] + '" data-ship="' + item + '" class="navy-item-inc">+</a>' +
							'<a href="#" data-max="' + navy[item] + '" data-ship="' + item + '" class="navy-item-dec">-</a>' +
							'<img class="tips" title="' + item + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + item.toLowerCase().replace(/ /g,"_") + '.png" />' +
							'<span class="amount">' + navy[item] + '</span>' +
						'</div>';
				}
				_t += '</fieldset>';
			}
		}
		if (my_settlement.can_recruit_heroes()) {
			let heroes = my_settlement.heroes();
			_t += '<fieldset>' +
				'<legend>Hero</legend>' +
				'<select class="army-hero">';
			if ($.isEmptyObject(heroes)) {
				_t += '<option value="0">-- no heroes available --</option>';
			} else {
				_t += '<option value="0">-- select --</option>';
				for (let item in heroes) {
					_t += '<option value="' + item + '">' + heroes[item] + '</option>';
				}
			}
			_t += '</select>' +
			'</fieldset>';
		} else {
			_t += '<p><strong>Note!</strong> Build a Tavern to be able to recruit powerful heroes and assign them to your armies.</p>';		
		}
		_t += '</div>';
		$(this.handle + ' section').empty().append(_t);
		$(this.handle).on('click', '.navy-item-inc', function() {
			let max = parseInt($(this).data('max'));
			let ship = $(this).data('ship');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current + 1 <= max) {
				self.assigned_navy[ship] = current + 1;
				$(this).parent().children('.amount').html(current + 1);
			}
			return false;
		}).on('click', '.navy-item-dec', function() {
			let max = parseInt($(this).data('max'));
			let ship = $(this).data('ship');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current - 1 >= 0) {
				self.assigned_navy[ship] = current - 1;
				$(this).parent().children('.amount').html(current - 1);
			}
			return false;
		}).on('click', '.army-item-inc', function() {
			let max = parseInt($(this).data('max'));
			let soldier = $(this).data('soldier');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current + 1 <= max) {
				self.assigned_army[soldier] = current + 1;
				$(this).parent().children('.amount').html(current + 1);
			}
			return false;
		}).on('click', '.army-item-dec', function() {
			let max = parseInt($(this).data('max'));
			let soldier = $(this).data('soldier');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current - 1 >= 0) {
				self.assigned_army[soldier] = current - 1;
				$(this).parent().children('.amount').html(current - 1);
			}
			return false;
		}).on('click', '.dispatch', function() {
			if (!my_settlement.can_recruit_soldiers()) {
				core.ui().error('You will need to construct a Military Camp before being able to attack other settlements.');
				return false;
			}
			let destination = parseInt($(self.handle + ' .army-destination').val());
			if ((settlement && settlement.id() !== destination) || !settlement) {
				settlement = core.get_settlement(destination);
			}
			// TODO there is an error here when there is no shipyard to send navy.
			if (destination === 0 || !settlement || (my_settlement.num_soldiers(self.assigned_army) === 0 && my_settlement.num_ships(self.assigned_navy) === 0)) {
				core.ui().error('There was an error creating and dispatching the army, check the data you entered and try again.');
				return false;
			}
			if (core.queue_add(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY, {
				army: self.assigned_army,
				navy: self.assigned_navy
			})) {
				core.do_achievement('sendarmy');
				self.destroy();
			} else {
				core.ui().error('There was an error creating and dispatching the army, check the data you entered and try again.');
			}
			return false;
		});
	}
};
