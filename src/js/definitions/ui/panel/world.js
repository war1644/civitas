/**
 * World panel data.
 *
 * @type {Object}
 */
civitas.PANEL_WORLD = {
	template: civitas.ui.generic_panel_template('World Map'),
	id: 'world',
	on_show: function(params) {
		var self = this;
		var core = this.core();
		var settlement = core.get_settlement();
		var settlements = core.get_settlements();
		var world = core.world();
		var colors = world.colors();
		var props = world.properties();
		var world_data = world.data();
		$(this.handle + ' section').append('<div class="worldmap"></div>');
		civitas.ui.svg_create_worldmap(props.cell_size, colors);
		for (var row = 0; row < civitas.WORLD_SIZE_HEIGHT; row++) {
			for (var column = 0; column < civitas.WORLD_SIZE_WIDTH; column++) {
				var terrain = world_data[row][column].t;
				var suid = world_data[row][column].s;
				civitas.ui.svg_create_group(terrain, row, column, props);
				civitas.ui.svg_create_cell(row, column, colors[terrain], props);
				if (props.beautify === true) {
					civitas.ui.svg_apply_terrain(row, column, terrain);
				}
				if (suid !== null && typeof settlements[suid] !== 'undefined') {
					civitas.ui.svg_add_settlement_image(row, column, settlements[suid], settlement);
				}
			}
		}
		var clicked = false;
		var clickY, clickX;
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
		var update_scroll_pos = function (event) {
			$('.worldmap').scrollTop($('.worldmap').scrollTop() + (clickY - event.pageY));
			$('.worldmap').scrollLeft($('.worldmap').scrollLeft() + (clickX - event.pageX));
			clickY = event.pageY;
			clickX = event.pageX;
		};
		$(this.handle).on('click', '.settlement', function () {
			var _settlement_name = $(this).data('name');
			if (_settlement_name === settlement.name()) {
				core.open_panel(civitas.PANEL_COUNCIL);
			} else {
				core.open_panel(civitas.PANEL_SETTLEMENT, core.get_settlement(_settlement_name));
			}
			return false;
		}).on('click', '.troop', function () {
			var _action_id = parseInt($(this).data('id'));
			if (core._queue[_action_id].mode === civitas.ACTION_CAMPAIGN) {
				core.open_panel(civitas.PANEL_CAMPAIGN, core._queue[_action_id]);
			}
			return false;
		});
		for (var i = 0; i < core.get_num_settlements(); i++) {
			if (typeof settlements[i] !== 'undefined') {
				var pos = settlements[i].get_location();
				var color = settlements[i].color();
				civitas.utils.get_cell_neighbours(pos.x, pos.y, color, settlements[i].get_type());
			}
		}
		//civitas.ui.svg_link_cells({x: 21, y: 25}, {x: 24, y: 32}, props);
	},
	on_refresh: function() {
		var self = this;
		var core = this.core();
		var settlement = core.get_settlement();
		var settlements = core.get_settlements();
		var queue_actions = core.queue();
		var class_name = '';
		$('.troop').remove();
		for (var i = 0; i < queue_actions.length; i++) {
			var action = queue_actions[i];
			var source = action.source;
			var destination = action.destination;
			var distance_in_days = civitas.utils.get_distance_in_days(source, destination);
			if (action.mode === civitas.ACTION_DIPLOMACY) {
				distance_in_days = distance_in_days / 2;
			}
			var title = '';
			var troop_type = 'troop';
			var _source = core.get_settlement(source.id);
			var _destination = core.get_settlement(destination.id)
			var x = source.x + Math.floor(((destination.x - source.x) / distance_in_days) * action.passed);
			var y = source.y - Math.floor(((source.y - destination.y) / distance_in_days) * action.passed);
			var prev_x = source.x + Math.floor(((destination.x - source.x) / distance_in_days) * (action.passed - 1));
			var prev_y = source.y - Math.floor(((source.y - destination.y) / distance_in_days) * (action.passed - 1));
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
