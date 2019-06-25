/**
 * World panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_WORLD = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('World Map'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'world',

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
		let world = core.world();
		let colors = world.colors();
		let color;
		let props = world.properties();
		let settings = core.get_settings();
		let world_data = world.data();
		$(this.handle + ' section').append('<div class="worldmap"></div>');
		civitas.ui.svg_create_worldmap(civitas.WORLD_HEX_SIZE, colors);
		for (let row = 0; row < civitas.WORLD_SIZE_HEIGHT; row++) {
			for (let column = 0; column < civitas.WORLD_SIZE_WIDTH; column++) {
				let terrain = world_data[row][column].t;
				color = colors[terrain].bg;
				civitas.ui.svg_create_group(terrain, row, column);
				if (world_data[row][column].l === true) {
					let lid = world_data[row][column].lid;
					if (lid !== null) {
						if (typeof settlements[lid] !== 'undefined') {
							color = settlements[lid].color();
						}
					}
				}
				civitas.ui.svg_create_cell(row, column, color, settings.worldmap_grid);
				if (settings.worldmap_beautify === true) {
					civitas.ui.svg_apply_terrain(row, column, colors[terrain].fg, terrain);
				}
			}
		}
		for (let row = 0; row < civitas.WORLD_SIZE_HEIGHT; row++) {
			for (let column = 0; column < civitas.WORLD_SIZE_WIDTH; column++) {
				let suid = world_data[row][column].s;
				if (suid !== null && typeof settlements[suid] !== 'undefined') {
					civitas.ui.svg_add_settlement_image(row, column, settlements[suid], settlement);
				}
			}
		}
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
				core.open_panel(civitas.PANEL_COUNCIL);
			} else {
				core.open_panel(civitas.PANEL_SETTLEMENT, core.get_settlement(_settlement_name));
			}
			return false;
		}).on('click', '.troop', function () {
			let _action_id = parseInt($(this).data('id'));
			if (core._queue[_action_id].mode === civitas.ACTION_CAMPAIGN) {
				core.open_panel(civitas.PANEL_CAMPAIGN, core._queue[_action_id]);
			}
			return false;
		});
		/*
		civitas.ui.svg_link_cells({x: 21, y: 25}, {x: 24, y: 32});
		*/
		civitas.ui.worldmap_scrollto(settlement.location());
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
			let distance_in_days = civitas.utils.get_distance_in_days(source, destination);
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
			civitas.ui.svg_map_element(y, x, prev_y, prev_x, troop_type, i, title);
		}
	}
};
