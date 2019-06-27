/**
 * Academy panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_ACADEMY = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.building_panel_template(),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'academy',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let _t = '';
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Research',
			'Technologies'
		]));
		_t += '<div class="column-left">' +
			'</div>' +
			'<div class="column-right">' +
				'<h2>Technology Tree</h2>' +
				'<p>Select a technology from the left panel to view information about it.</p>'
			'</div>';
		$(this.handle + ' #tab-technologies').empty().append(_t);
		_t = '';
		for (let i = 0; i < civitas.RESEARCH.length; i++) {
			_t += '<div data-technology="' + civitas.RESEARCH[i].handle + '" class="technology"><img src="' + civitas.ASSETS_URL + 'images/assets/research/' + civitas.RESEARCH[i].handle + '.png" /></div>';
		}
		$(this.handle + ' .column-left').empty().append(_t);
		$(this.handle).on('click', '.technology', function() {
			$(self.handle + ' .technology').removeClass('selected');
			$(this).addClass('selected');
			let technology_name = $(this).data('technology');
			let technology = core.get_research_config_data(technology_name);
			if (technology !== false) {
				_t = '<h2>' + technology.name + '</h2>' +
				'<p>' + technology.description + '</p>' +
				'<dl>' +
					'<dt>Duration</dt>' +
					'<dd>' + technology.duration + ' days</dd>' +
					'<dt>Cost</dt>';
				for (let y in technology.cost) {
					_t += '<dd>' + civitas.utils.nice_numbers(technology.cost[y]) + ' <img class="small tips" title="' + civitas.utils.get_resource_name(y) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + y + '.png" /></dd>';
				}
				_t += '<dt>Effect</dt>';
				for (let y in technology.effect) {
					if (y === 'buildings') {
						for (let b in technology.effect[y]) {
							var _z = core.get_building_config_data(b);
							_t += '<dd>' + _z.name + ' +' + technology.effect[y][b] + '</dd>';
						}
					} else if (y === 'tax') {
						_t += '<dd>+' + technology.effect[y] + civitas.ui.resource_small_img('coins') + ' each house</dd>';
					}
				}
				_t += '<div class="toolbar"></div>';
				$(self.handle + ' .column-right').empty().append(_t);
				if (core.has_research(technology.handle)) {
					$(self.handle + ' .toolbar').empty().append('You already researched this technology.');
				} else if (core.in_queue(technology.handle)) {
					$(self.handle + ' .toolbar').empty().append('You are currently researching this technology.');
				} else {
					$(self.handle + ' .toolbar').empty().append('<a href="#" class="btn do-research" data-technology="' + technology.handle + '">Research</a>');
				}
			}
			return false;
		}).on('click', '.do-research', function() {
			let technology_name = $(this).data('technology');
			let technology = core.get_research_config_data(technology_name);
			if (technology !== false) {
				if (core.get_settlement().has_resources(technology.cost)) {
					if (core.add_to_queue(my_settlement, null, civitas.ACTION_RESEARCH, null, {
						handle: technology.handle,
						name: technology.name,
						duration: technology.duration
					})) {
						$(self.handle + ' .toolbar').empty();
					}
				} else {
					core.error('You don`t have enough resources to research this technology.');
				}
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
		let core = this.core();
		let settlement = core.get_settlement();
		let research = settlement.research();
		let technologies = core.research();
		let building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' #tab-info').empty().append(civitas.ui.building_panel(this.params_data, building.get_level()));
			$(this.handle + ' #tab-research').empty().append('' +
				'<div class="section">' + civitas.ui.progress((research * 100) / civitas.MAX_RESEARCH_VALUE, 'large', research) + '</div>');
		} else {
			this.destroy();
		}
		for (let f = 0; f < technologies.length; f++) {
			if (typeof technologies[f] !== 'undefined') {
				$(this.handle + ' .technology[data-technology=' + technologies[f].handle + ']').addClass('has');
			}
		}
	}
};
