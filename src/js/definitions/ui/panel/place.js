/**
 * Place panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_PLACE = {
	
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '<div id="panel-{ID}" class="panel">' +
				'<header>' +
					'<a class="tips close" title="Close"></a>' +
				'</header>' +
				'<section></section>' +
				'<footer>' +
				'</footer>' +
			'</div>',

	/**
	 * Extra parameters passed to the panel.
	 *
	 * @type {Object}
	 */
	params_data: null,

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'place',

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
		let location = my_settlement.location();
		let place = params.data;
		this.params_data = params;
		$(this.handle + ' header').append('Place');
		let tabs = ['Info'];
		if (place.is_scouted()) {
			labs.push('Resources', 'Construction');
		}
		$(this.handle + ' section').append(core.ui().tabs(tabs));
		let claimed_by = place.is_claimed();
		let claimed_by_settlement = core.get_settlement(claimed_by);
		$(this.handle + ' #tab-info').empty().append(
			'<img class="avatar right" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar999.png" />' +
			'<dl>' +
				(place.is_scouted() || (claimed_by !== false && claimed_by_settlement.id() === my_settlement.id()) ?
				'<dt>Name</dt>' +
				'<dd>none given</dd>' +
				'<dt>Claimed by</dt>' +
				'<dd>' + (claimed_by !== false ? '<span data-id="' + claimed_by_settlement.id() + '" title="View info about this settlement" class="tips view">' + claimed_by_settlement.name() + '</span>' : 'nobody') + '</dd>'
				: '') +
				'<dt>Time to build</dt>' +
				'<dd>' + civitas.PLACE_TIME_TO_BUILD + ' days</dd>' +
				'<dt>Distance</dt>' +
				'<dd>' + core.world().get_distance(location, place.location()) + ' miles (' + core.world().get_distance_in_days(location, place.location()) + ' days)</dd>' +
			'</dl>'
		);
		if (place.is_scouted()) {
			$(this.handle + ' #tab-resources').empty().append(
				'<p>Stage 2: Gather the resources below and use caravans to send them to this place.</p>' +
				'<p><strong>Note!</strong> If the place is not claimed by anybody, do not send resources or they will be lost.</p>' +
				'<div class="required">' +
					'<p>This place has no required resources.</p>' +
				'</div>'
			);
			$(this.handle + ' #tab-construction').empty().append(
				'<p>Stage 3: Once the required resources have been stored you can start building the world wonder on this place. It will take a dozen of years to build it (around 20) and other settlements might attack so make sure you have an army to guard it.</p>'
			);
			if (claimed_by !== false && claimed_by === my_settlement.id()) {
				$(this.handle + ' footer').empty().append('<a class="tips unclaim" title="Remove your settlement`s claim of this place." href="#"></a>');
			} else if (claimed_by === false) {
				$(this.handle + ' footer').empty().append('<a class="tips claim" title="Claim this place for your settlement." href="#"></a>');
			}
		} else {
			$(this.handle + ' footer').empty().append('<a class="tips scout" title="Send a scout to this place." href="#"></a>');
		}
		$(this.handle).on('click', '.claim', function () {
			if (!my_settlement.can_diplomacy() || !my_settlement.can_research()) {
				core.ui().error('You will need to construct an Embassy and Academy before being able to claim world places.');
				return false;
			}
			core.ui().open_modal(
				function(button) {
					if (button === 'yes') {
						if (!place.claim(my_settlement)) {
							core.ui().error('There was an error claiming this world place, check the data you entered and try again.');
							return false;
						} else {
							self.destroy();
						}
					}
				},
				'Are you sure you want to claim this world place?'
			);
			return false;
		}).on('click', '.unclaim', function () {
			if (!my_settlement.can_diplomacy() || !my_settlement.can_research()) {
				core.ui().error('You will need to construct an Embassy and Academy before being able to unclaim world places.');
				return false;
			}
			core.ui().open_modal(
				function(button) {
					if (button === 'yes') {
						if (!place.unclaim(my_settlement)) {
							core.ui().error('There was an error unclaiming this world place, check the data you entered and try again.');
							return false;
						} else {
							self.destroy();
						}
					}
				},
				'Are you sure you want to unclaim this world place?'
			);
			return false;
		}).on('click', '.view', function () {
			let _settlement_id = parseInt($(this).data('id'));
			let _settlement = core.get_settlement(_settlement_id);
			if (_settlement) {
				if (_settlement.id() === my_settlement.id()) {
					core.ui().open_panel(civitas.PANEL_COUNCIL);
				} else {
					core.ui().open_panel(civitas.PANEL_SETTLEMENT, _settlement);
				}
			}
			return false;
		}).on('click', '.scout', function () {
			if (!my_settlement.can_diplomacy()) {
				core.ui().error('You will need to construct an Embassy before being able to send scouts to other places.');
				return false;
			}
			core.ui().open_panel(civitas.PANEL_NEW_SCOUT, place);
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
		let self = this;
		let core = this.core();
		let place = this.params_data.data;
		if (place.is_scouted()) {
			let out = '';
			for (let item in place.resources().required) {
				if (!civitas.utils.is_virtual_resource(item)) {
					if (place._resources.required[item] > 0) {
						out += core.ui().resource_storage_small_el(item, place._resources.required[item]);
					}
				}
			}
			if (out !== '') {
				$(this.handle + ' #tab-resources .required').empty().append(out);
			}
		}
	}
};
