/**
 * Buildings panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_BUILDINGS = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'buildings',
	
	/**
	 * Callback function for creating the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = this.core().ui().generic_panel_template('City Buildings');
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
		let resources = settlement.get_resources();
		let el = this.handle;
		let _t = '<div class="left buildings">';
		let available_buildings = civitas['SETTLEMENT_BUILDINGS_' + settlement.climate().name.toUpperCase()];
		_t += '<div class="tabs">' +
				'<ul>';
		for (let category in civitas.BUILDINGS_CATEGORIES) {
			_t += '<li><a href="#tab-' + category.toLowerCase() + '">' + category + '</a></li>';
		}
		_t += '</ul>';
		for (let category in civitas.BUILDINGS_CATEGORIES) {
			_t += '<div id="tab-' + category.toLowerCase() + '" class="bldg-tabs">';
			for (let i = 0; i < civitas.BUILDINGS_CATEGORIES[category].length; i++) {
				let building = civitas.BUILDINGS_CATEGORIES[category][i];
				if ($.inArray(building, available_buildings) !== -1) {
					let building_data = core.get_building_config_data(building);
					if (building_data) {
						let _i = settlement.is_building_built(building_data.handle);
						let building_image = building_data.handle;
						if (building_data.handle.slice(0, 5) === 'house') {
							building_image = building_data.handle.slice(0, 5);
						}
						let _image = (typeof building_data.visible_upgrades === 'undefined' || building_data.visible_upgrades === false) ? building_image : building_image + building_data.level;
						_t += '<div data-handle="' + building_data.handle + '" class="building-item' + ((_i === true) ? ' disabled' : '') + '">' +
								'<span class="title">' + building_data.name + '</span>' +
								'<img class="building" src="' + civitas.ASSETS_URL + 'images/assets/buildings/' + _image + '.png" />' +
							'</div>';
					}
				}
			}
			_t += '</div>';
		}
		_t += '</div>' +
			'</div>' +
			'<div class="buildings-info right">' +
				'<div class="b-desc"></div>' +
				'<div class="column-small">' +
					'<fieldset class="levels">' +
						'<legend>Levels</legend>' +
						'<div class="b-levels"></div>' +
					'</fieldset>' +
					'<fieldset>' +
						'<legend>Cost</legend>' +
						'<div class="b-cost"></div>' +
					'</fieldset>' +
					'<fieldset>' +
						'<legend>Requirements</legend>' +
						'<div class="b-req"></div>' +
					'</fieldset>' +
				'</div>' +
				'<div class="column-small">' +
					'<fieldset class="materials">' +
						'<legend>Materials</legend>' +
						'<div class="b-mats"></div>' +
					'</fieldset>' +
					'<fieldset class="production">' +
						'<legend>Production</legend>' +
						'<div class="b-prod"></div>' +
					'</fieldset>' +
					'<fieldset class="extra">' +
						'<legend>Extra materials</legend>' +
						'<div class="b-chance"></div>' +
					'</fieldset>' +
					'<fieldset class="storage">' +
						'<legend>Storage</legend>' +
						'<div class="b-store"></div>' +
					'</fieldset>' +
					'<fieldset class="taxes">' +
						'<legend>Taxes</legend>' +
						'<div class="b-tax"></div>' +
					'</fieldset>' +
				'</div>' +
				'<div class="toolbar"></div>' +
			'</div>';
		$(el + ' section').append(_t);
		$(el).on('click', '.building-item', function () {
			$(el).addClass('expanded');
			$(el + ' .building-item').removeClass('active');
			$(this).addClass('active');
			$(el + ' .b-chance, ' + el + ' .b-tax, ' + el + ' .b-store, ' + el + ' .b-req, ' + el + ' .b-cost, ' + el + ' .b-name, ' + el + ' .b-desc, ' + el + ' .b-mats, ' + el + ' .b-prod, ' + el + ' .toolbar').empty();
			let handle = $(this).data('handle');
			let building = core.get_building_config_data(handle);
			if (building) {
				$(el + ' header span').empty().html('City Buildings - ' + building.name);
				$(el + ' .b-desc').html(building.description);
				let _z = '<dl class="nomg">';
				for (let y in building.cost) {
					_z += '<dt>' + civitas.utils.nice_numbers(building.cost[y]) + '</dt>' +
						'<dd><img class="small tips" title="' + civitas.utils.get_resource_name(y) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + y + '.png" /></dd>';
				}
				_z += '</dl>';
				$(el + ' .b-cost').append(_z);
				if (typeof building.levels !== 'undefined') {
					$(el + ' .b-levels').empty().append('<dl class="nomg">' +
						'<dt>Upgrades</dt>' +
							'<dd>' + building.levels + '</dd>' +
					'</dl>');
					$('fieldset.levels').show();
				} else {
					$('fieldset.levels').hide();
				}
				if (typeof building.requires !== 'undefined') {
					_z = '<dl class="nomg">';
					if (typeof building.requires.buildings !== 'undefined') {
						for (let item in building.requires.buildings) {
							_z += '<dt>Building</dt>' +
								'<dd>' + core.get_building_config_data(item).name + ' (' + building.requires.buildings[item] + ')</dd>';
						}
					}
					if (typeof building.requires.research !== 'undefined') {
						_z += '<dt>Research</dt>' +
							'<dd>' + core.get_research_config_data(building.requires.research).name + '</dd>';
					}
					_z += '<dt>City level</dt>' +
						'<dd>' + building.requires.settlement_level + '</dd>' +
					'</dl>';
					$(el + ' .b-req').append(_z);
				}
				if (typeof building.chance !== 'undefined') {
					_z = '<dl class="nomg">';
					for (let chance in building.chance) {
						_z += '<dt>' + building.chance[chance] * 100 + '%</dt>' +
							'<dd><img class="small tips" title="' + civitas.utils.get_resource_name(chance) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + chance + '.png" /></dd>';
					}
					_z += '</dl>';
					$(el + ' .b-chance').append(_z);
					$('fieldset.extra').show();
				} else {
					$('fieldset.extra').hide();
				}
				if (building.is_production === true) {
					if (typeof building.production !== 'undefined') {
						_z = '<dl class="nomg">';
						for (let y in building.production) {
							_z += '<dt>' + building.production[y] + '</dt>' +
								'<dd><img class="small tips" title="' + civitas.utils.get_resource_name(y) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + y + '.png" /></dd>';
						}
						_z += '</dl>';
						$(el + ' .b-prod').append(_z);
						$('fieldset.production').show();
					} else {
						$('fieldset.production').hide();
					}
					if (typeof building.materials !== 'undefined') {
						_z = '<dl class="nomg">';
						if (Array.isArray(building.materials)) {
							for (let i = 0; i < building.materials.length; i++) {
								for (let y in building.materials[i]) {
									_z += '<dt>' + building.materials[i][y] + '</dt>' +
										'<dd><img class="small tips" title="' + civitas.utils.get_resource_name(y) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + y + '.png" /></dd>';
								}
							}
						} else {
							for (let y in building.materials) {
								_z += '<dt>' + building.materials[y] + '</dt>' +
									'<dd><img class="small tips" title="' + civitas.utils.get_resource_name(y) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + y + '.png" /></dd>';
							}
						}
						_z += '</dl>';
						$(el + ' .b-mats').append(_z);
						$('fieldset.materials').show();
					} else {
						$('fieldset.materials').hide();
					}
				} else {
					$('fieldset.production, fieldset.materials').hide();
				}
				if (building.is_housing === true) {
					if (typeof building.materials !== 'undefined') {
						_z = '<dl class="nomg">';
						for (let y in building.materials) {
							_z += '<dt>' + building.materials[y] + '</dt>' +
								'<dd><img class="small tips" title="' + civitas.utils.get_resource_name(y) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + y + '.png" /></dd>';
						}
						_z += '</dl>';
						$(el + ' .b-mats').append(_z);
						$('fieldset.materials').show();
					}
					if (typeof building.tax !== 'undefined') {
						_z = '<dl class="nomg">' +
								'<dt>Tax</dt>' +
								'<dd>' + building.tax + '<img class="small tips" title="Coins" src="' + civitas.ASSETS_URL + 'images/assets/resources/coins.png" /></dd>' +
							'</dl>';
						$(el + ' .b-tax').append(_z);
						$('fieldset.taxes').show();
					}
				} else {
					$('fieldset.taxes').hide();
				}
				if (typeof building.storage !== 'undefined') {
					$('fieldset.taxes, fieldset.materials').hide();
					_z = '<dl class="nomg">' +
							'<dt>' + building.storage + '</dt>' +
							'<dd><img class="small tips" title="Storage Space" src="' + civitas.ASSETS_URL + 'images/assets/resources/storage.png" /></dd>' +
						'</dl>';
					$(el + ' .b-store').append(_z);
					$('fieldset.storage').show();
				} else {
					$('fieldset.storage').hide();
				}
				let _i = settlement.is_building_built(building.handle);
				if (_i !== true) {
					$(el + ' .toolbar').append('<a href="#" class="btn build" data-handle="' + building.handle + '">Build</a>');
				} else {
					$(el + ' .toolbar').append('You already constructed this building.');
				}
				$(el + ' .right').show();
			}
			return false;
		}).on('click', '.btn.build', function () {
			let handle = $(this).data('handle');
			if (settlement.build(handle) !== false) {
				$(el + ' .building-item[data-handle=' + handle + ']').addClass('disabled');
				$(el + ' .toolbar').empty().append('You already constructed this building.');
			}
			return false;
		});
	}
};
