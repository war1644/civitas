/**
 * Main Game UI object.
 * 
 * @param {Object} core
 * @license GPLv3
 * @class civitas.objects.ui
 * @returns {civitas.objects.ui}
 */
civitas.objects.ui = function (core) {

	/**
	 * Array containing the list of all open panels.
	 *
	 * @type {Array}
	 * @private
	 */
	this.panels = [];

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.ui}
	 * @param {Object} core
	 */
	this.__init = function (core) {
		this._core = core;
		return this;
	};

	/**
	 * Show the application loading indicator.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.show_loader = function() {
		$('.loading').show().tipsy({
			gravity: 'e'
		});
		return this;
	};

	/**
	 * Hide the application loading indicator.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.hide_loader = function() {
		$('.loading').hide();
		return this;
	};

	/**
	 * Build the main DOM UI of the game.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.build_main = function() {
		let _t = '';
		let clicked = false;
		let clickY, clickX;
		let out = '<section class="ui">' +
					'<header>' +
						'<div class="resource-panel"></div>' +
						'<div class="top-panel">' +
							'<span title="City level" class="tips citylevel"></span>&nbsp;&nbsp;&nbsp;' +
							'<span title="City Council" class="tips cityavatar"></span>&nbsp;&nbsp;&nbsp;' +
							'<span class="cityname"></span>' +
						'</div>' +
					'</header>' +
					'<aside></aside>' +
					'<div class="viewport">' +
						'<section class="game"></section>' +
					'</div>' +
					'<footer>' +
						'<a href="#" data-action="panel" data-panel="buildings" class="tips" title="Buildings"></a>' +
						'<a href="#" data-action="panel" data-panel="storage" class="tips" title="Storage Space"></a>' +
						'<a href="#" data-action="panel" data-panel="trades" class="tips" title="Trades"></a>' +
						'<a href="#" data-action="panel" data-panel="council" class="tips" title="City Council"></a>' +
						'<a href="#" data-action="panel" data-panel="ranks" class="tips" title="Ranks"></a>' +
						'<a href="#" data-action="panel" data-panel="world" class="tips" title="World Map"></a>' +
						'<a href="#" data-action="panel" data-panel="debug" class="tips" title="Debug"></a>' +
						'<a href="#" data-action="panel" data-panel="help" class="tips" title="Help"></a>' +
					'</footer>' +
				'</section>' +
				'<audio id="music" loop>' +
					'<source src="music/track1.mp3" type="audio/mpeg">' +
				'</audio>' +
				'<div title="Game is doing stuff in the background." class="loading"></div>';
		$('body').empty().append(out);
		for (let item in civitas.RESOURCES) {
			if (civitas.RESOURCES[item].toolbar === true) {
				_t += '<div class="resource ' + item + '">' +
					'<span class="amount">0</span>' +
					'<img title="' + civitas.RESOURCES[item].name + '" class="tips small" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + item + '.png" />' +
				'</div>';
			}
		}
		$('.resource-panel').append(_t);
		$('.game').on({
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
			$('.viewport').scrollTop($('.viewport').scrollTop() + (clickY - event.pageY));
			$('.viewport').scrollLeft($('.viewport').scrollLeft() + (clickX - event.pageX));
			clickY = event.pageY;
			clickX = event.pageX;
		};
		return this;
	};

	/**
	 * Create an item tooltip.
	 *
	 * @public
	 * @param {Object} item
	 * @returns {String}
	 */
	this.item_tooltip = function(item) {
		let out = '<h4 style="color: ' + civitas.ITEM_QUALITY_COLORS[item.quality] + '">' + item.name + '</h4>';
		if (item.flavour) {
			out += '<span class="flavour">"' + item.flavour + '"</span>' + ' <br />';
		}
		out += 'Slot: ' + civitas.ITEM_SLOTS_LIST[item.slot] + ' <br />';
		if (item.type === civitas.ITEM_TYPE_WEAPON) {
			out += 'Damage: <span class="red">' + item.stats.damageMin + '-' + item.stats.damageMax + '</span><br />Speed: ' + item.stats.speed + '<br />';
		} else {
			out += 'Armor: ' + item.stats.armor + '<br />';
		}
		if (item.stats.strength) {
			out += 'Strength: <span class="green">+' + item.stats.strength + '</span><br />';
		}
		if (item.stats.stamina) {
			out += 'Stamina: <span class="green">+' + item.stats.stamina + '</span><br />';
		}
		if (item.stats.agility) {
			out += 'Agility: <span class="green">+' + item.stats.agility + '</span><br />';
		}
		if (item.stats.intellect) {
			out += 'Intellect: <span class="green">+' + item.stats.intellect + '</span><br />';
		}
		if (item.stats.spirit) {
			out += 'Spirit: <span class="green">+' + item.stats.spirit + '</span><br />';
		}
		out += 'Type: <span style="color: ' + civitas.ITEM_QUALITY_COLORS[item.quality] + '">' + civitas.ITEM_QUALITY_LIST[item.quality] + '</span>';
		return out;
	};

	/**
	 * Build the About section of the UI.
	 *
	 * @public
	 * @returns {String}
	 */
	this.window_about_section = function() {
		let out = '<a href="#" class="do-about button">About</a>' +
					'<div class="about-game">' +
						'<a class="github" target="_blank" href="https://github.com/sizeofcat/civitas"><img class="tips" title="Visit the project page on GitHub" src="' + civitas.ASSETS_URL + '/images/ui/github.png" /></a>' +
						'<p>Civitas is written by <a target="_blank" href="https://sizeof.cat">sizeof(cat)</a>.</p>' +
						'<p>Big thanks to:</p>' +
						'<ul>' +
							'<li><a target="_blank" href="https://soundcloud.com/shantifax">Shantifax</a> for the music (Glandula Pinealis).</li>' +
							'<li><a target="_blank" href="http://bluebyte.com">Blue Byte</a> for Anno 1404.</li>' +
						'</ul>' +
					'</div>';
		return out;
	};

	/**
	 * Generate a generic panel template.
	 *
	 * @public
	 * @param {String} title
	 * @returns {String}
	 */
	this.generic_panel_template = function(title) {
		if (typeof title === 'undefined') {
			title = '';
		}
		let out = '<div id="panel-{ID}" class="panel">' +
					'<header>' + title +
						'<a class="tips close" title="Close"></a>' +
					'</header>' +
					'<section></section>' +
				'</div>';
		return out;
	};

	/**
	 * Generate a building panel template.
	 *
	 * @public
	 * @param {String} title
	 * @returns {String}
	 */
	this.building_panel_template = function(title) {
		if (typeof title === 'undefined') {
			title = '';
		}
		let out = '<div id="panel-{ID}" class="panel">' +
					'<header>' + title +
						'<a class="tips close" title="Close"></a>' +
					'</header>' +
					'<section></section>' +
					'<footer>' +
						'<a class="tips demolish" title="Demolish this building" href="#"></a>' +
						'<a class="tips pause start" href="#"></a>' +
						'<a class="tips upgrade" title="Upgrade building" href="#"></a>' +
						'<a class="tips downgrade" title="Downgrade building" href="#"></a>' +
					'</footer>' +
				'</div>';
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} params
	 * @param {Number} level
	 * @returns {String}
	 */
	this.building_panel = function (params, level) {
		if (typeof params.levels === 'undefined') {
			params.levels = 1;
		}
		let building_image = params.handle;
		if (params.handle.slice(0, 5) === 'house') {
			building_image = params.handle.slice(0, 5);
		}
		let image = (typeof params.visible_upgrades === 'undefined' || params.visible_upgrades === false) ? building_image: building_image + params.level;
		let out = '<div class="column">' +
					'<img class="building" src="' + civitas.ASSETS_URL + 'images/assets/buildings/' + image + '.png" />' +
				'</div>' +
				'<div class="column">' +
					'<p>' + params.description + '</p>' +
					'<dl>' +
						this.level_panel(params.level, level, params.levels) +
						this.cost_panel(params.cost, level, params.levels) +
						this.materials_panel(params.materials) +
						this.production_panel(params.production, level) +
						this.requires_panel(params.requires) +
						this.chance_panel(params.chance, level) +
						this.tax_panel(params.tax, level) +
						this.storage_panel(params.storage, level) +
					'</dl>' +
				'</div>'; 
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {String} section
	 * @param {String} contents
	 * @returns {String}
	 */
	this.normal_panel = function (section, contents) {
		let out = '<fieldset>' +
					'<legend>' + section + '</legend>' +
					contents +
				'</fieldset>';
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Number} level
	 * @param {Number} new_level
	 * @param {Number} max_level
	 * @returns {String}
	 */
	this.level_panel = function (level, new_level, max_level) {
		let out = '<dt>Level</dt>' +
				'<dd>' +
					'<span title="Current building level" class="tips">' + new_level + '</span> / <span title="Maximum building level achievable through upgrades" class="tips">' + max_level + '</span>' +
				'</dd>';
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} conts
	 * @param {Number} level
	 * @param {Number} levels
	 * @returns {String}
	 */
	this.cost_panel = function (costs, level, levels) {
		let out = '';
		if (typeof costs !== 'undefined') {
			out += '<dt>Cost</dt>';
			for (let item in costs) {
				out += '<dd>' + civitas.utils.nice_numbers(costs[item]) + this.resource_small_img(item) + (typeof levels !== 'undefined' && level < levels ? ' / ' + civitas.utils.nice_numbers(costs[item] * (level + 1)) + this.resource_small_img(item) : '') + '</dd>';
			}
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Number} value
	 * @param {String} progress_type
	 * @param {Boolean} show_value
	 * @returns {String}
	 */
	this.progress = function(value, progress_type, show_value) {
		if (typeof progress_type === 'undefined') {
			progress_type = 'small';
		}
		let _e = '';
		if (value < 10) {
			_e = ' ubad';
		} else if (value >= 10 && value < 30) {
			_e = ' vbad';
		} else if (value >= 30 && value < 40) {
			_e = ' bad';
		} else if (value >= 40 && value < 60) {
			_e = ' good';
		} else if (value >= 60 && value < 90) {
			_e = ' vgood';
		} else if (value >= 90) {
			_e = ' ugood';
		}
		return '<div class="progress ' + progress_type + '">' +
				'<div class="bar' + _e + '" style="width:' + value + '%">' +
					'<p>' + (typeof show_value !== 'undefined' ? show_value : value) + '</p>' +
				'</div>' +
			'</div>';
	};

	/**
	 * 
	 *
	 * @public
	 * @param {String} name
	 * @returns {String}
	 */
	this.navy_img = function (name) {
		return '<img class="tips small" title="' + civitas.SHIPS[name].name + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + name.toLowerCase().replace(/ /g,"_") + '.png" />';
	};

	/**
	 * 
	 *
	 * @public
	 * @param {String} name
	 * @returns {String}
	 */
	this.army_img = function (name) {
		return '<img class="tips small" title="' + civitas.SOLDIERS[name].name + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + name.toLowerCase().replace(/ /g,"_") + '.png" />';
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} army
	 * @param {Boolean} no_margin
	 * @returns {String}
	 */
	this.army_list = function (army, no_margin) {
		let out2 = '<p>There are no soldiers in this army.</p>';
		let out = '<dl' + ((typeof no_margin !== 'undefined' && no_margin === true) ? ' class="nomg"' : '') + '>';
		let total = 0;
		for (let soldier in army) {
			if (army[soldier] > 0) {
				out += '<dt>' + army[soldier] + '</dt>' + '<dd>' + this.army_img(soldier) + '</dd>';
				total += army[soldier];
			}
		}
		out += '<dt>' + total + '</dt>' +
				'<dd>Total</dd>' +
			'</dl>';
		if (total > 0) {
			return out;
		} else {
			return out2;
		}
	};

	/**
	 * Check if a window exists and is opened.
	 * 
	 * @param {String} id
	 * @returns {Boolean}
	 */
	this.window_exists = function (id) {
		if ($(id).length == 0) {
			return false;
		}
		return true;
	};

	/**
	 * Check if a panel exists and is opened.
	 * 
	 * @param {String} id
	 * @returns {Boolean}
	 */
	this.panel_exists = function (id) {
		if ($(id).length == 0) {
			return false;
		}
		return true;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {String} text
	 * @param {String} title
	 * @param {String} handle
	 * @param {String} class_name
	 * @param {Boolean} disabled
	 * @returns {String}
	 */
	this.panel_btn = function (text, title, handle, class_name, disabled) {
		return '<a title="' + title + '" data-handle="' + handle + '" class="tips ' + class_name + (disabled === true ? ' disabled' : '') + '" href="#">' + text + '</a></td>';
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} trades
	 * @param {String} mode
	 * @returns {String}
	 */
	this.trades_list = function (trades, mode) {
		mode = (typeof mode === 'undefined' || mode === 'imports') ? 'imports' : 'exports';
		let out = '';
		if (trades !== null) {
			let trade = trades[mode];
			for (let item in trade) {
				if (trade[item] > 0) {
					out += this.resource_storage_small_el(item, trade[item]);
				}
			}
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} army
	 * @param {Boolean} no_margin
	 * @returns {String}
	 */
	this.navy_list = function (army, no_margin) {
		let out2 = '<p>There are no ships in this navy.</p>';
		let out = '<dl' + ((typeof no_margin !== 'undefined' && no_margin === true) ? ' class="nomg"' : '') + '>';
		let total = 0;
		for (let ship in army) {
			if (army[ship] > 0) {
				out += '<dt>' + army[ship] + '</dt>' + '<dd>' + this.navy_img(ship) + '</dd>';
				total += army[ship];
			}
		}
		out += '<dt>' + total + '</dt>' +
				'<dd>Total</dd>' +
			'</dl>';
		if (total > 0) {
			return out;
		} else {
			return out2;
		}
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} params
	 * @returns {String}
	 */
	this.building_element = function (params) {
		let building_image = params.type;
		let description = '<br /><span class="smalldesc">' + params.data.description + '</span>';
		if (params.type.slice(0, 5) === 'house') {
			building_image = params.type.slice(0, 5);
		}
		let image = (typeof params.data.visible_upgrades === 'undefined' || params.data.visible_upgrades === false) ? building_image : building_image + params.data.level;
		return '<div data-type="' + params.type + '" data-level="' + params.data.level + '" ' + 'style="background-image:url(' + civitas.ASSETS_URL + 'images/assets/buildings/' + image + '.png);left:' + params.data.position.x + 'px;top:' + params.data.position.y + 'px" title=\'' + params.data.name + '\' ' + 'id="building-' + params.data.handle + '"' + 'class="tips building' + (params.data.large === true ? ' large' : '') + '"></div>';
	};

	/**
	 * 
	 *
	 * @public
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {String}
	 */
	this.resource_storage_small_el = function (resource, amount) {
		return '<div class="tips storage-item small" title="' + civitas.utils.get_resource_name(resource) + '"><img class="small" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + resource + '.png" /><span class="amount">' + amount + '</span></div>';
	};

	/**
	 * 
	 *
	 * @public
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {String}
	 */
	this.resource_storage_el = function (resource, amount) {
		return '<div class="storage-item" data-resource="' + resource + '"><span class="title">' + civitas.utils.get_resource_name(resource) + '</span><img src="' + civitas.ASSETS_URL + 'images/assets/resources/' +  resource + '.png" /><span class="amount">' + amount + '</span></div>';
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Array} data
	 * @returns {String}
	 */
	this.tabs = function (data) {
		let out = '<div class="tabs">' +
				'<ul>';
		for (let i = 0; i < data.length; i++) {
			out += '<li><a href="#tab-' + data[i].toLowerCase().replace(/ /g, "-") + '">' + data[i].capitalize() + '</a></li>';
		}
		out += '</ul>';
		for (let i = 0; i < data.length; i++) {
			out += '<div id="tab-' + data[i].toLowerCase().replace(/ /g, "-") + '"></div>';
		}
		out += '</div>';
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object| Array} materials
	 * @returns {String}
	 */
	this.materials_panel = function (materials) {
		let out = '';
		if (typeof materials !== 'undefined') {
			out += '<dt>Uses</dt>';
			if (Array.isArray(materials)) {
				for (let i = 0; i < materials.length; i++) {
					for (let y in materials[i]) {
						out += '<dd>' + materials[i][y] + this.resource_small_img(y) + '</dd>';
					}
				}
			} else {
				for (let item in materials) {
					out += '<dd>' + materials[item] + this.resource_small_img(item) + '</dd>';
				}
			}
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} materials
	 * @param {Number} level
	 * @returns {String}
	 */
	this.chance_panel = function (materials, level) {
		let out = '';
		if (typeof materials !== 'undefined') {
			out += '<dt>Extra materials</dt>';
			for (let item in materials) {
				out += '<dd>' + (level * materials[item]).toFixed(4) * 100 + '%' + this.resource_small_img(item) + '</dd>';
			}
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} materials
	 * @param {Number} level
	 * @returns {String}
	 */
	this.production_panel = function (materials, level) {
		let out = '';
		if (typeof materials !== 'undefined') {
			out += '<dt>Produces</dt>';
			for (let item in materials) {
				out += '<dd>' + (level * materials[item]) + this.resource_small_img(item) + '</dd>';
			}
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Object} requires
	 * @returns {String}
	 */
	this.requires_panel = function (requires) {
		let out = '';
		if (typeof requires.buildings !== 'undefined' || typeof requires.settlement_level !== 'undefined') {
			out += '<dt>Requires</dt>';
			out += '<dd>';
			if (typeof requires.buildings !== 'undefined') {
				for (let item in requires.buildings) {
					let b = this.core().get_building_config_data(item);
					out += b.name + ' level ' + requires.buildings[item] + '<br />'
				}
			}
			if (typeof requires.research !== 'undefined') {
				let r = civitas.TECHNOLOGIES[civitas.TECHNOLOGIES.findIndexByHandle(requires.research)];
				out += 'Research: ' + r.name + '<br />';
			}
			if (typeof requires.settlement_level !== 'undefined') {
				out += 'Setlement: level ' + requires.settlement_level;
			}
			out += '</dd>';
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Number} tax
	 * @param {Number} level
	 * @returns {String}
	 */
	this.tax_panel = function (tax, level) {
		let out = '';
		if (typeof tax !== 'undefined') {
			out += '<dt>Tax</dt>';
			out += '<dd>' + (level * tax) + this.resource_small_img('coins') + '</dd>';
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {Number} storage
	 * @param {Number} level
	 * @returns {String}
	 */
	this.storage_panel = function (storage, level) {
		let out = '';
		if (typeof storage !== 'undefined') {
			out += '<dt>Storage</dt>' +
				'<dd>' +
					(level * storage) + '<img alt="Storage space" class="tips small" title="Storage Space" src="' + civitas.ASSETS_URL + 'images/assets/resources/storage.png" />' +
				'</dd>';
		}
		return out;
	};

	/**
	 * 
	 *
	 * @public
	 * @param {String} resource
	 * @returns {String}
	 */
	this.resource_small_img = function (resource) {
		return '<img alt="' + civitas.utils.get_resource_name(resource) + '" class="tips small" title="' + civitas.utils.get_resource_name(resource) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + resource + '.png" />';
	};

	/**
	 * Return a pointer to the game core.
	 * 
	 * @public
	 * @returns {civitas.game}
	 */
	this.core = function() {
		return this._core;
	};

	/**
	 * Perform a normal notification in the game.
	 * 
	 * @public
	 * @param {String} message
	 * @param {String} title
	 * @param {Number} timeout
	 * @returns {civitas.objects.ui}
	 */
	this.notify = function (message, title, timeout, mode) {
		this._notify({
			title: (typeof title !== 'undefined') ? title : 'City Council',
			content: message,
			timeout: typeof timeout !== 'undefined' ? timeout : 15000,
			mode: typeof mode !== 'undefined' ? mode : civitas.NOTIFY_NORMAL
		});
		this.log('game', message);
		return this;
	};

	/**
	 * Internal function for performing an UI notification.
	 * 
	 * @param {Object} settings
	 * @returns {civitas.objects.ui}
	 * @private
	 */
	this._notify = function (settings) {
		let container, notty, hide, image, right, left, inner, _container;
		let notty_type = 'normal';
		settings = $.extend({
			title: undefined,
			content: undefined,
			timeout: 15000,
			img: undefined,
			mode: civitas.NOTIFY_NORMAL
		}, settings);
		if (settings.mode === civitas.NOTIFY_ACHIEVEMENT) {
			_container = 'achievements-notifications';
		} else {
			_container = 'notifications';
		}
		container = $('.' + _container);
		if (!container.length) {
			container = $("<div>", {
				'class': _container
			}).appendTo(document.body);
		}
		$('.achievements-notifications').css({
			left: ($(window).width() / 2) - (container.width() / 2)
		});
		notty = $('<div>');
		notty.addClass('notty');
		hide = $("<div>", {
			click: function () {
				$(this).parent().delay(300).queue(function () {
					$(this).clearQueue();
					$(this).remove();
				});
			},
			touchstart: function () {
				$(this).parent().delay(300).queue(function () {
					$(this).clearQueue();
					$(this).remove();
				});
			}
		});
		hide.addClass('hide');
		if (settings.mode === civitas.NOTIFY_ERROR) {
			notty_type = 'error';
		} else if (settings.mode === civitas.NOTIFY_RESEARCH) {
			notty_type = 'research';
		} else if (settings.mode === civitas.NOTIFY_EVENT) {
			notty_type = 'event';
		} else if (settings.mode === civitas.NOTIFY_ACHIEVEMENT) {
			notty_type = 'achievement';
		} else if (settings.mode === civitas.NOTIFY_RELIGION) {
			notty_type = 'religion';
		} else if (settings.mode === civitas.NOTIFY_WAR) {
			notty_type = 'war';
		}
		notty.addClass(notty_type);
		settings.img = civitas.ASSETS_URL + 'images/assets/ui/icon_' + notty_type + '.png';
		image = $('<div>', {
			style: "background: url('" + settings.img + "')"
		});
		image.addClass('img');
		left = $("<div class='left'>");
		right = $("<div class='right'>");
		inner = $('<div>', {
			html: '<h2>' + settings.title + '</h2>' + settings.content
		});
		inner.addClass("inner");
		inner.appendTo(right);
		image.appendTo(left);
		left.appendTo(notty);
		right.appendTo(notty);
		hide.appendTo(notty);
		if (settings.mode !== civitas.NOTIFY_ACHIEVEMENT) {
			let timestamp = Number(new Date());
			let timeHTML = $('<div>', {
				html: civitas.utils.time_since(timestamp) + ' ago'
			});
			timeHTML.addClass('time-ago').attr('title', timestamp);
			timeHTML.appendTo(right);
			setInterval(function () {
				$('.time-ago').each(function () {
					let timing = $(this).attr('title');
					if (timing) {
						$(this).html(civitas.utils.time_since(timing) + ' ago');
					}
				});
			}, 4000);
		}
		notty.hover(function () {
			hide.show();
		}, function () {
			hide.hide();
		});
		notty.prependTo(container);
		notty.show();
		if (settings.timeout) {
			setTimeout(function () {
				notty.delay(300).queue(function () {
					$(this).clearQueue();
					$(this).remove();
				});
			}, settings.timeout);
		}
		return this;
	};

	/**
	 * Perform an error notification in the game.
	 * 
	 * @public
	 * @param {String} message
	 * @param {String} title
	 * @param {Boolean} no_console
	 * @returns {civitas.objects.ui}
	 */
	this.error = function (message, title, no_console) {
		this._notify({
			title: (typeof title !== 'undefined') ? title : 'City Council',
			mode: civitas.NOTIFY_ERROR,
			content: message
		});
		if (typeof no_console === 'undefined' || no_console === false) {
			this.log('game', message, true);
		}
		return this;
	};

	/**
	 * Resize the UI.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.resize = function() {
		const window_width = parseInt($(window).width());
		const window_height = parseInt($(window).height());
		const header_height = parseInt($('.ui > header').height());
		const sidebar_width = parseInt($('.ui > aside').width());
		const footer_width = parseInt($('.ui > footer').width());
		$('.ui > footer').css({
			left: (window_width / 2) - (footer_width / 2)
		});
		$('.ui > .viewport').width(window_width - sidebar_width);
		$('.ui > .viewport').height(window_height - header_height);
		return this;
	};

	/**
	 * Log data to the console.
	 * 
	 * @public
	 * @param {String} namespace
	 * @param {String} message
	 * @param {Boolean} error
	 * @returns {civitas.objects.ui}
	 */
	this.log = function (namespace, message, error) {
		if ($('#panel-debug .console p').length > civitas.MAX_CONSOLE_LINES) {
			$('#panel-debug .console').empty();
		}
		$('#panel-debug .console').prepend('<p><span class="date">' + civitas.utils.get_now() + '</span><span class="namespace game-' + namespace + '">' + namespace.toUpperCase() + '</span>' + (error === true ? '<span class="error">ERROR</span>' : '') + '<span' + (error === true ? ' class="error-message"' : ' class="log-message"') + '>' + message + '</span></p>');
		return this;
	};

	/**
	 * Open a UI panel.
	 *
	 * @public
	 * @param {Object} panel_data
	 * @param {Object} extra_data
	 * @param {Boolean} sidebar
	 * @returns {civitas.controls.panel}
	 */
	this.open_panel = function(panel_data, extra_data, sidebar) {
		panel_data.core = this.core();
		if (typeof extra_data !== 'undefined') {
			panel_data.data = extra_data;
		}
		if (typeof sidebar !== 'undefined') {
			panel_data.data.sidebar = sidebar;
		}
		const panel = new civitas.controls.panel(panel_data);
		this.panels.push(panel);
		return panel;
	};

	/**
	 * Open a UI window.
	 *
	 * @public
	 * @param {Object} window_data
	 * @param {Object} extra_data
	 * @returns {civitas.controls.window}
	 */
	this.open_window = function(window_data, extra_data) {
		window_data.core = this.core();
		if (typeof extra_data !== 'undefined') {
			window_data.data = extra_data;
		}
		return new civitas.controls.window(window_data);
	};

	/**
	 * Open a modal window (usually to ask for confirmations).
	 *
	 * @public
	 * @param {Function} callback
	 * @param {String} text
	 * @param {String} title
	 * @returns {civitas.objects.ui}
	 */
	this.open_modal = function(callback, text, title) {
		const modal = new civitas.controls.modal({
			core: this.core()
		});
		modal.alert({
			title: typeof title !== 'undefined' ? title : 'City Council',
			text: text,
			on_click: callback
		});
		return this;
	};

	/**
	 * Refresh all the UI information after a property change.
	 * 
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.refresh_ui = function () {
		const settlement = this.core().get_settlement();
		if (typeof settlement !== 'undefined') {
			$('.citylevel').html(settlement.level());
			if (settlement.fame() >= this.core().level_to_fame(settlement.level())) {
				this.core().level_up();
			}
		}
		return this;
	};

	/**
	 * Calculate and return the total and free storage space in the main settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.check_storage = function () {
		const storage = this.core().get_settlement().storage();
		if (storage.occupied >= storage.all) {
			this.error('You ran out of storage space and all goods produced will be lost. Upgrade your warehouse or marketplace.', 'No storage space');
		} else if ((storage.all - storage.occupied) < 100) {
			this.error('You will soon run out of storage space and all goods produced will be lost. Upgrade your warehouse or marketplace.', 'Storage nearly full');
		}
		return storage;
	};

	/**
	 * Refresh the UI and panels.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.refresh = function() {
		this.refresh_panels();
		this.refresh_toolbar();
		this.refresh_ui();
		$('.tipsy').remove();
		$('.tips').tipsy({
			gravity: $.fn.tipsy.autoNS,
			html: true
		});
		return this;
	};

	/**
	 * Get the panels open in the game.
	 * 
	 * @public
	 * @returns {Array}
	 */
	this.get_panels = function() {
		return this.panels;
	};

	/**
	 * Refresh the resources toolbar.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.refresh_toolbar = function() {
		const settlement = this.core().get_settlement();
		if (typeof settlement !== 'undefined') {
			const resources = settlement.get_resources();
			for (let item in civitas.RESOURCES) {
				if (civitas.RESOURCES[item].toolbar === true) {
					if (typeof resources[item] !== 'undefined') {
						if (resources[item] === 0) {
							$('.resource-panel .resource.' + item).hide();
						} else {
							$('.resource-panel .resource.' + item).show();
						}
						$('.resource-panel .resource.' + item + ' span').html(resources[item]);
					}
				}
			}
		}
		return this;
	};

	/**
	 * Return the UI panel specified by its id.
	 *
	 * @public
	 * @param {String} id
	 * @returns {civitas.controls.panel|Boolean}
	 */
	this.get_panel = function(id) {
		const panels = this.get_panels();
		for (let i = 0; i < panels.length; i++) {
			if (typeof panels[i] !== 'undefined') {
				if (panels[i].id === id) {
					return panels[i];
				}
			}
		}
		return false;
	};

	/**
	 * Close the UI panel specified by its id.
	 *
	 * @public
	 * @param {String} id
	 * @returns {Boolean}
	 */
	this.close_panel = function(id) {
		const panels = this.get_panels();
		for (let i = 0; i < panels.length; i++) {
			if (typeof panels[i] !== 'undefined') {
				if (panels[i].id === id) {
					panels.splice(i, 1);
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Force refresh of the UI panels open.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.refresh_panels = function() {
		const panels = this.get_panels();
		for (let i = 0; i < panels.length; i++) {
			if (typeof panels[i] !== 'undefined') {
				panels[i].on_refresh();
			}
		}
		return this;
	};

	/**
	 * Get the middle of a hex cell.
	 *
	 * @public
	 * @param {Number} row
	 * @param {Number} column
	 * @returns {Number}
	 */
	this.get_cell_middle = function(row, column) {
		let height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		let center = {
			x: Math.round(civitas.WORLD_HEX_SIZE), 
			y: Math.round(height)
		};
		return center;
	};

	/**
	 * Scroll the world map to the specified location.
	 *
	 * @param {Object} location
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.worldmap_scrollto = function(location) {
		const coords = this.get_cell_middle_coords(location.y, location.x);
		$('.worldmap').scrollTop(coords.y - (700 / 2));
		$('.worldmap').scrollLeft(coords.x - (1164 / 2));
		return this;
	};

	/**
	 * Scroll the city map to the specified building location.
	 *
	 * @param {Object} building
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.citymap_scrollto_building = function(building) {
		const location = building.position();
		const view_width = parseInt($('.ui > .viewport').width());
		const view_height = parseInt($('.ui > .viewport').height());
		$('.viewport').scrollTop(location.y - ((view_height - 260) / 2));
		$('.viewport').scrollLeft(location.x - ((view_width - 260) / 2));
		return this;
	};

	/**
	 * Get the middle coordonates of a hex cell.
	 *
	 * @public
	 * @param {Number} row
	 * @param {Number} column
	 * @returns {Object}
	 */
	this.get_cell_middle_coords = function(row, column) {
		const height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		return {
			x: Math.round((1.5 * column) * civitas.WORLD_HEX_SIZE),
			y: Math.round(height * (row * 2 + (column % 2)))
		}
	};

	/**
	 * Get a random HSL color.
	 *
	 * @public
	 * @returns {String}
	 */
	this.get_random_color = function() {
		let color = (Math.random() * 250) + 1;
		let colors = Math.random() * 255;
		return "hsl(" + (color * (360 / colors) % 360) + ", 50%, 50%)";
	};

	// Fire up the constructor
	return this.__init(core);
};
