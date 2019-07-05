/**
 * Create a new scout panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_NEW_SCOUT = {
	
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '<div id="panel-{ID}" class="panel">' +
				'<header>Create scout' +
					'<a class="tips close" title="Close"></a>' +
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
	id: 'new-scout',

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
		let place = params.data;
		let location = my_settlement.location();
		let distance = core.world().get_distance_in_days(location, place.location());
		let _t = '<fieldset>' +
			'<legend>Initial costs</legend>' +
			'<dl>';
		for (let item in civitas.SCOUT_COSTS) {
			let _cost = 0;
			if (item === 'coins') {
				_cost = civitas.SCOUT_COSTS[item] * distance;
			} else if (item === 'provisions') {
				_cost = Math.ceil((civitas.SCOUT_COSTS[item] * distance) / 4);
			} else {
				_cost = civitas.SCOUT_COSTS[item];
			}
			_t += '<dt>' + civitas.utils.nice_numbers(_cost) + '</dt>' +
				'<dd>' + core.ui().resource_small_img(item) + '</dd>';
		}
		_t += '</dl>' +
		'</fieldset>' +
		'<fieldset>' +
			'<legend>Destination</legend>' +
			'<input type="hidden" class="scout-destination" value="' + place.id() + '" />' +
		'</fieldset>';
		$(this.handle + ' section').empty().append(_t);
		$(this.handle).on('click', '.dispatch', function() {
			if (!my_settlement.can_diplomacy()) {
				core.ui().error('You will need to construct an Embassy before being able to send scouts to other settlements.');
				return false;
			}
			let destination = parseInt($(self.handle + ' .scout-destination').val());
			let data = {
				// Todo
			};
			if (core.queue_add(my_settlement, place, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_SCOUT, data)) {
				self.destroy();
			} else {
				core.ui().error('There was an error creating and dispatching the scout, check the data you entered and try again.');
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
		// Todo
	}
};
