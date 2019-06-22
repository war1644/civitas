/**
 * Academy panel data.
 *
 * @type {Object}
 */
civitas.PANEL_ACADEMY = {
	template: civitas.ui.building_panel_template(),
	id: 'academy',
	on_show: function(params) {
		var _t = '';
		var self = this;
		var core = this.core();
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Research',
			'Technologies'
		]));
		_t += '<div class="column-left">' +
			'</div>' +
			'<div class="column-right">' +
			'</div>';
		$(this.handle + ' #tab-technologies').empty().append(_t);
		_t = '';
		for (var i = 0; i < civitas.RESEARCH.length; i++) {
			_t += '<div data-technology="' + civitas.RESEARCH[i].handle + '" class="technology"><img src="' + civitas.ASSETS_URL + 'images/assets/research/' + civitas.RESEARCH[i].handle + '.png" /></div>';
		}
		$(this.handle + ' .column-left').empty().append(_t);
		$(this.handle).on('click', '.technology', function() {
			$(self.handle + ' .technology').removeClass('selected');
			$(this).addClass('selected');
			var technology_name = $(this).data('technology');
			var technology = civitas.RESEARCH[civitas.RESEARCH.findIndexM(technology_name)];
			if (technology !== false) {
				_t = '<h2>' + technology.name + '</h2>' +
				'<p>' + technology.description + '</p>' +
				'<dl>' +
					'<dt>Duration</dt>' +
					'<dd>' + technology.duration + ' days</dd>' +
					'<dt>Cost</dt>';
				for (var y in technology.cost) {
					_t += '<dd>' + civitas.utils.nice_numbers(technology.cost[y]) + ' <img class="small tips" title="' + civitas.utils.get_resource_name(y) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + y + '.png" /></dd>';
				}
				_t += '<div class="toolbar"></div>';
				$(self.handle + ' .column-right').empty().append(_t);
				var _i = core.has_research(technology.handle);
				if (_i === false) {
					$(self.handle + ' .toolbar').empty().append('<a href="#" class="btn do-research" data-technology="' + technology.handle + '">Research</a>');
				} else {
					$(self.handle + ' .toolbar').empty().append('You already researched this technology.');
				}
			}
			return false;
		}).on('click', '.do-research', function() {
			var technology_name = $(this).data('technology');
			var technology = civitas.RESEARCH[civitas.RESEARCH.findIndexM(technology_name)];
			if (technology !== false) {
				if (core.get_settlement().has_resources(technology.cost)) {
					core.do_research(technology_name);
					$(self.handle + ' .toolbar').empty();
				} else {
					core.error('You don`t have enough resources to research this technology.');
				}
			}
			return false;
		});
	},
	on_refresh: function() {
		var core = this.core();
		var settlement = core.get_settlement();
		var research = settlement.research();
		var technologies = core.research();
		var building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' #tab-info').empty().append(civitas.ui.building_panel(this.params_data, building.get_level()));
			$(this.handle + ' #tab-research').empty().append('' +
				'<div class="section">' + civitas.ui.progress((research * 100) / civitas.MAX_RESEARCH_VALUE, 'large', research) + '</div>');
		} else {
			this.destroy();
		}
		for (var f = 0; f < technologies.length; f++) {
			if (typeof technologies[f] !== 'undefined') {
				$(this.handle + ' .technology[data-technology=' + technologies[f].handle + ']').addClass('has');
			}
		}
	}
};
