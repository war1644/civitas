/**
 * World panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_WORLD = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'world',
	
	/**
	 * Callback function for creating the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = this.core().ui().generic_panel_template('World Map');
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
		let places = core.places();
		let world = core.world();
		let colors = world.colors();
		let color;
		let props = world.properties();
		let settings = core.get_settings();
		let world_data = world.data();
		$(this.handle + ' section').append('<div class="worldmap"></div>');
		core.world().draw();
		for (let i = 0; i < settlements.length; i++) {
			let image = 'village';
			let color = settlements[i].color();
			let name = settlements[i].name();
			let location = settlements[i].location();
			let coords = core.ui().get_cell_middle_coords(location.y, location.x);
			if (typeof settlement !== 'undefined' && name === settlement.name()) {
				image = 'settlement';
			} else {
				if (settlements[i].is_metropolis()) {
					image = 'metropolis' + settlements[i].icon();
				} else if (settlements[i].is_city()) {
					image = 'city' + settlements[i].icon();
				} else if (settlements[i].is_village()) {
					image = 'village' + settlements[i].icon();
				} else if (settlements[i].is_camp()) {
					image = 'camp';
				}
			}
			$('.worldmap').append('<img data-x="' + location.x + '" data-y="' + location.y + '" title="' + settlements[i].nice_name() + '" style="left:' + (coords.x + 3) + 'px;top:' + coords.y + 'px" data-name="' + name + '" src="' + civitas.ASSETS_URL + 'images/assets/ui/world/' + image + '.png' + '" class="tips settlement" />');
		}
		//if (core.has_research('archeology')) {
			for (let i = 0; i < places.length; i++) {
				let location = places[i].location();
				let coords = core.ui().get_cell_middle_coords(location.y, location.x);
				$('.worldmap').append('<img data-x="' + location.x + '" data-y="' + location.y + '" title="Special Place" style="left:' + (coords.x + 3) + 'px;top:' + coords.y + 'px" data-id="' + places[i].id() + '" src="' + civitas.ASSETS_URL + 'images/assets/ui/world/place.png' + '" class="tips place" />');
			}
		//}
		let clicked = false;
		let clickY, clickX;
		$('.worldmap').on({
			mousemove: function (event) {
				clicked && update_scroll_pos(event);
			},
			mousedown: function (event) {
				clicked = true;
				clickY = event.pageY;
				clickX = event.pageX;
				$('html').css('cursor', 'grab');
			},
			mouseup: function () {
				clicked = false;
				$('html').css('cursor', 'auto');
			}
		});
		let update_scroll_pos = function (event) {
			$('.worldmap').scrollTop($('.worldmap').scrollTop() + (clickY - event.pageY));
			$('.worldmap').scrollLeft($('.worldmap').scrollLeft() + (clickX - event.pageX));
			clickY = event.pageY;
			clickX = event.pageX;
		};
		$(this.handle).on('click', '.settlement', function () {
			let _settlement_name = $(this).data('name');
			if (_settlement_name === settlement.name()) {
				core.ui().open_panel(civitas.PANEL_COUNCIL);
			} else {
				core.ui().open_panel(civitas.PANEL_SETTLEMENT, core.get_settlement(_settlement_name));
			}
			return false;
		}).on('click', '.place', function () {
			let place_id = parseInt($(this).data('id'));
			core.ui().open_panel(civitas.PANEL_PLACE, core.get_place(place_id));
			return false;
		}).on('click', '.troop', function () {
			let _action_id = parseInt($(this).data('id'));
			if (core._queue[_action_id].mode === civitas.ACTION_CAMPAIGN) {
				core.ui().open_panel(civitas.PANEL_CAMPAIGN, core._queue[_action_id]);
			}
			return false;
		});
		core.ui().worldmap_scrollto(settlement.location());
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
		let settlement = core.get_settlement();
		let settlements = core.get_settlements();
		let queue_actions = core.queue();
		let class_name = '';
		$('.troop').remove();
		for (let i = 0; i < queue_actions.length; i++) {
			let action = queue_actions[i];
			let source = action.source;
			let destination = action.destination;
			let distance_in_days = core.world().get_distance_in_days(source, destination);
			if (action.mode === civitas.ACTION_DIPLOMACY) {
				distance_in_days = distance_in_days / 2;
			}
			let title = '';
			let troop_type = 'troop';
			let _source = core.get_settlement(source.id);
			let _destination = core.get_settlement(destination.id)
			let x = source.x + Math.floor(((destination.x - source.x) / distance_in_days) * action.passed);
			let y = source.y - Math.floor(((source.y - destination.y) / distance_in_days) * action.passed);
			let prev_x = source.x + Math.floor(((destination.x - source.x) / distance_in_days) * (action.passed - 1));
			let prev_y = source.y - Math.floor(((source.y - destination.y) / distance_in_days) * (action.passed - 1));
			if (action.mode === civitas.ACTION_CAMPAIGN) {
				if (action.type === civitas.CAMPAIGN_CARAVAN) {
					troop_type = 'troop_caravan';
					title = 'Caravan from ' + _source.name() + ' sent to ' + _destination.name() + '.';
				} else if (action.type === civitas.CAMPAIGN_SCOUT) {
					troop_type = 'troop_scout';
					title = 'Scout from ' + _source.name() + ' going to a specific place.';
				} else if (action.type === civitas.CAMPAIGN_SPY) {
					troop_type = 'troop_spy';
					title = 'Spy from ' + _source.name() + ' sneaking into ' + _destination.name() + '.';
				} else if (action.type === civitas.CAMPAIGN_ARMY_RETURN) {
					troop_type = 'troop_return';
					title = _destination.name() + ' army returning from ' + _source.name() + '.';
				} else {
					troop_type = 'troop_attack';
					title = _source.name() + ' army marching to ' + _destination.name() + '.';
				}
			} else if (action.mode === civitas.ACTION_DIPLOMACY) {
				troop_type = 'troop_diplomatic';
				title = 'Diplomatic mission from ' + _source.name() + ' to ' + _destination.name() + '.';
			}
			let coords = core.ui().get_cell_middle_coords(y, x);
			$('.worldmap').append('<img data-name="' + troop_type + '" data-x="' + x + '" data-y="' + y + '" title="' + title + '" style="left:' + (coords.x + 3) + 'px;top:' + coords.y + 'px" data-id="' + i + '" src="' + civitas.ASSETS_URL + 'images/assets/ui/world/' + troop_type + '.png' + '" class="tips troop" />');
		}
	}
};
