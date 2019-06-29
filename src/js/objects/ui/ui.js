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
			'<dd><span title="Current building level" class="tips">' + new_level + '</span> / <span title="Maximum building level achievable through upgrades" class="tips">' + max_level + '</span> </dd>';
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
			out += '<dt>Storage</dt>';
			out += '<dd>' + (level * storage) + '<img alt="Storage space" class="tips small" title="Storage Space" src="' + civitas.ASSETS_URL + 'images/assets/resources/storage.png" /></dd>';
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
		const window_width = $(window).width();
		const window_height = $(window).height();
		const header_height = $('.ui > header').height();
		const sidebar_width = $('.ui > aside').width();
		const footer_width = $('.ui > footer').width();
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
			if (settlement.fame() >= civitas.LEVELS[settlement.level()]) {
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

	this.svg_add_settlement_image = function(row, column, settlement, player_settlement) {
		let image = 'village';
		let color = settlement.color();
		let name = settlement.name();
		if (typeof player_settlement !== 'undefined' && name === player_settlement.name()) {
			image = 'settlement';
		} else {
			if (settlement.is_metropolis()) {
				image = 'metropolis' + settlement.icon();
			} else if (settlement.is_city()) {
				image = 'city' + settlement.icon();
			} else if (settlement.is_village()) {
				image = 'village' + settlement.icon();
			} else if (settlement.is_camp()) {
				image = 'camp';
			}
		}
		$(document.createElementNS('http://www.w3.org/2000/svg', 'image'))
			.attr({
				'id': 'w-s-i' + row + '-' + column,
				'xlink:href': '',
				'height': 42,
				'width': 42,
				'x': "2px",
				'y': "0",
				'class': 'settlement',
				'data-name': name
				//'title': settlement.nice_name()
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		document.getElementById('w-s-i' + row + '-' + column)
			.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', civitas.ASSETS_URL + 'images/assets/ui/world/' + image + '.png');
		if (!settlement.is_camp()) {
			$(document.createElementNS('http://www.w3.org/2000/svg', 'text'))
				.attr({
					x: name.length * 2,
					y: 1
				})
				.css({
					'text-anchor': 'middle',
					'font-size': (typeof player_settlement !== 'undefined' && name === player_settlement.name()) ? '12px' : '10px'
				})
				.text(name)
				.appendTo('.s-c-g-' + row + '-' + column);
		}
	};

	this.svg_add_mountain = function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M10.6,24.6l-7.1-5.5c5.4-3,9.5-7.4,13.3-12.3c1.5,1.6,2.9,3.3,4.5,4.8c1,1,2.2,2,3.3,2.8c0.5,0.3,1.2,0.3,1.8,0.5c0.2,1,0,1.6-0.7,1.8c-0.2,0.1-0.5,0.1-0.6,0c-1-0.6-2.1-1.1-3-1.9c-1.6-1.4-3.1-3-4.6-4.6c-0.1-0.1-0.2-0.2-0.5-0.4c-0.7,2.7-0.6,5.4-1.8,7.9S12.5,22.4,10.6,24.6z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M23.2,18.6l7,7.9l-1.2,1L24,21.9l-0.3,0c-0.5,4.3-2.5,8-4.4,11.9L8.2,29.1c1.7-1,3.3-2,4.9-2.9c1.4-0.8,2.8-1.7,4.2-2.4c2.1-1,3.7-2.6,5.2-4.2C22.7,19.3,22.9,19,23.2,18.6z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M33,25.4c-1.7-0.2-3.1-0.7-4.2-2.2c-0.5-0.8-1.3-1.4-1.9-2.1c-0.7-0.8-0.6-2.3,0.3-2.9c1.5-1.1,3.1-2.2,3.9-4c0.6-1.3,1.1-2.6,1.6-4c0.2-0.5,0.4-0.9,0.6-1.3c2.4,6,7.2,10,11.4,14.6l-1.2,1.1c-0.9-0.9-1.9-1.8-2.8-2.7c-0.8-0.7-1.5-1.5-2.3-2.1c-1.8-1.4-3.2-3.3-4-5.4c-0.1-0.2-0.2-0.4-0.3-0.5c-0.1-0.1-0.2-0.2-0.4-0.3c-0.3,1.2-0.8,2.3-0.9,3.4c-0.1,2.4,0.1,4.8,0.1,7.2C33,24.6,33,25,33,25.4z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M27.6,33.3c1.6-0.7,3.2-1.2,3.9-3l3,3.2l-0.8,0.8l-2.1-1.9l-2.1,3.3L27.6,33.3z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_add_hill = function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M13.2,26.2L8,21.6c1.8-0.5,3.4-1,5-1.4c1.4-0.3,2.8-0.8,4-1.7c0.7-0.5,1.6-0.9,2.3-1.5c0.9-0.7,1.8-0.7,2.8-0.5c2.4,0.3,4.5,1.6,6.7,2.4c2.6,1,5.1,2.1,7.6,3.2c0.7,0.3,1.3,0.5,2,0.6c0.6,0.1,1,0.4,1.2,1c0.1,0.3,0.2,0.6,0.3,0.9c-1.6-0.1-3.1,0.2-4.7-0.4c-3.9-1.5-7.8-2.9-11.7-4.3c-0.9-0.3-1.8-0.3-2.7-0.4c-0.2,0-0.4,0.2-0.6,0.4c-2.2,1.9-4.4,3.8-6.5,5.7C13.6,25.9,13.4,26,13.2,26.2z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M38,32.5c-1.9,0-3.7,0-5.5,0c-0.2,0-0.4-0.1-0.5-0.2c-2.3-1.1-4.6-2.2-6.9-3.3c-0.9-0.4-1.8-0.5-2.7,0.3c-1.9,1.7-3.8,3.3-5.7,5c-0.3,0.3-0.5,0.3-0.9,0.1c-1.5-1-3-1.9-4.4-2.9c-0.1-0.1-0.2-0.2-0.4-0.3c1.2-0.2,2.4-0.5,3.5-0.6c0.9-0.1,1.7-0.4,2.4-0.9c1.8-1.3,3.6-2.5,5.4-3.7c0.3-0.2,0.7-0.2,1-0.2c2,0.1,3.8,1.2,5.6,1.9c2.8,1.2,5.5,2.6,8.5,3.3c0.2,0,0.4,0.3,0.5,0.5C37.8,31.7,37.9,32.1,38,32.5z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M15,16.7l-4.6-4.6c0.7-0.2,1.5-0.5,2.3-0.7c2.3-0.6,4.6-1.4,6.5-2.8c1.5-1,3.1-1.3,4.8-1.1c0.3,0,0.5,0.1,0.8,0.3c1.9,1,3.8,2,5.7,3.1c1.3,0.8,2.7,1.1,4.2,1.2c0.4,0,0.9,0,1.2,0.2c0.4,0.3,0.7,0.8,1.1,1.2l-0.1,0.2c-0.6,0-1.2-0.1-1.8,0c-2.3,0.3-4.4-0.3-6.3-1.5c-1.4-0.9-2.9-1.5-4.2-2.3c-0.8-0.4-1.5-0.2-2.2-0.1c-0.1,0-0.2,0.1-0.2,0.1c-1.7,0.6-2.9,1.7-4,3.2C17,14.4,16,15.5,15,16.7z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_add_desert = function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M39.5,18.7h-1c-0.6-2.1-2.3-2.8-4.1-3.3c-3-0.7-5.8-0.6-8.6,0.7C25,16.5,24.3,17,24,17.8c1,0.8,2.1,0.3,3.2,0.2c3.5-0.2,6.9,0.2,10,1.9c1.6,0.8,2.9,1.9,3.3,3.8c0,0.3,0.1,0.6,0.1,0.9h-1c-0.5-2.1-2.2-2.8-4.1-3.2c-2.9-0.8-5.8-0.6-8.5,0.6c-0.2,0.1-0.3,0.2-0.5,0.2c-0.2,0.1-0.3,0.2-0.5,0.4c3,1.1,6.2,2,6.8,6h-1.1c-0.4-1.9-2-2.7-3.7-3.2c-2.7-0.8-5.6-0.7-8.3,0.3c-1.4,0.5-2.5,1.3-2.8,2.9H8.9c-0.2-1.8,0.9-3.3,3.9-5h-7c-0.1-1,0.2-1.9,0.8-2.7c1.3-1.7,3-2.6,5-3.1c1.3-0.4,2.7-0.5,4.1-0.8c0.2,0,0.5-0.1,0.6-0.3c1.2-2,3-3,5.1-3.6c4.9-1.6,9.8-1.5,14.5,0.7c1.1,0.5,2.1,1.4,3,2.3C39.3,16.7,39.6,17.6,39.5,18.7z M19.8,19.8c-2.3,0.4-4.8,0.6-6.2,3.3c1.3-0.3,2.4-0.6,3.4-0.9c0.2-0.1,0.3-0.1,0.4-0.3C18.3,21.3,19,20.5,19.8,19.8L19.8,19.8z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_add_grass = function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M33.1,13.7l0.8,8l1.4-0.1v-7l0.3,0c0.1,0.7,0.3,1.5,0.4,2.2c0.1,1.3,0.1,2.7,0.2,4c0,0.2,0.4,0.5,0.5,0.7c0.2-0.3,0.5-0.5,0.5-0.8c0-1.4,0-2.9,0-4.3c0-0.3,0-0.6,0.1-0.9l0.3,0c0.1,0.4,0.1,0.7,0.2,1c0.1,1.5,0.2,3,0.4,4.6c0,0.2,0.3,0.4,0.5,0.6c0.1-0.2,0.3-0.4,0.3-0.6c0-1.2,0-2.5,0.2-3.8c0.1,0.3,0.3,0.5,0.3,0.8c0.1,0.8,0.2,1.5,0.2,2.3c0,0.8,0.3,1.5,1.4,1.4l0.2-3l0.3,0c0.1,0.5,0.2,1.1,0.3,1.6c0.2,1.7,0.4,1.8,2.1,1.7c0.4,0,0.7,0,1.1,0c-7.2,0.8-14.4,0.7-21.7,0.4l0-0.3h3.6v-3.6l0.4,0l0.6,3.3l0.3,0v-4.4l0.3,0l0.7,4.5h0.3v-6l0.3,0c0.2,1.8,0.4,3.7,0.6,5.5c0,0.3,0.3,0.5,0.5,0.7c0.2-0.3,0.4-0.5,0.4-0.8c0-2.4-0.1-4.9-0.1-7.3c0-0.2,0.1-0.5,0.2-0.6c0.1,0.9,0.3,1.9,0.4,2.8c0.2,1.7,0.3,3.5,0.5,5.2c0,0.2,0.2,0.3,0.4,0.5c0.1-0.2,0.4-0.4,0.4-0.5c0-0.6-0.1-1.2-0.1-1.9c0-1.8,0-3.5,0-5.3c0-0.1,0.1-0.3,0.1-0.4L33.1,13.7z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M26.4,30.1c0,0.5,0,1,0,1.4c0,1.4,0,2.8,0,4.1c0,0.2,0.3,0.4,0.4,0.6c0.1-0.2,0.4-0.4,0.4-0.6c0.2-1.2,0.3-2.5,0.5-3.7l0.2,0c0,0.5,0.1,1.1,0.1,1.6c0,0.6-0.1,1.3,0,1.9c0.1,0.4,0.4,0.6,0.7,0.8c0.5,0.1,0.6-0.3,0.7-0.8c0.1-0.7,0.2-1.5,0.4-2.2h0.3c0,0.6,0.1,1.3,0.1,1.9c-0.1,0.8-0.1,1.5,1.1,1.3c0.8-0.1,1.7,0.1,2.5,0.2c-7.2,0.8-14.4,0.6-21.7,0.1c0.2,0,0.3-0.1,0.5-0.1c0.5,0,1.1,0.1,1.6,0c0.7,0,1.1-0.4,1.1-1.1c0-0.7,0.1-1.4,0.2-2.1c0-0.1,0.1-0.3,0.2-0.4l0.3,0v3.4h0.3c1-1.4,0.4-3.1,0.8-4.6h0.2v4.4l0.4,0l0.7-6.1l0.3,0c0,1.3,0,2.5,0,3.8c0,0.6,0,1.2,0,1.8c0,0.2,0.3,0.5,0.4,0.7c0.2-0.2,0.6-0.4,0.6-0.7c0.2-1.4,0.2-2.8,0.3-4.2c0.1-1.2,0.2-2.5,0.4-3.7l0.2,0c0,0.9,0,1.7,0,2.6c0,1.7-0.1,3.4-0.1,5.2c0,0.3,0.2,0.5,0.3,0.8c0.2-0.3,0.5-0.5,0.5-0.8c0.2-2.3,0.4-4.5,0.6-6.8c0-0.3,0.2-0.5,0.4-0.6c0,0.9,0,1.9,0,2.8c0,1.5-0.1,3.1-0.1,4.6c0,0.2,0.3,0.7,0.4,0.7c0.4-0.1,0.9-0.2,1-0.5c0.2-0.3,0.1-0.8,0.1-1.2c0.2-1.8,0.4-3.6,0.7-5.4c0.5,2.3,0,4.6,0.1,6.8c0.7,0.2,1,0,1-0.8c0.1-1.5,0.3-3.1,0.5-4.6c0-0.2,0.1-0.4,0.1-0.7L26.4,30.1z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M17.6,12.5c1.4,0.1,1.4,0.1,1.5-1.2c0.2-1.9,0.4-3.8,0.7-5.7c0.5,2.2,0,4.4,0.1,6.6c0.7,0.2,1,0.1,1-0.7c0.1-1.5,0.3-2.9,0.4-4.4c0-0.2,0.1-0.5,0.1-0.7l0.3,0c0,0.4,0,0.9,0,1.3c0,1.4,0,2.7,0,4.1c0,0.2,0.3,0.4,0.4,0.6c0.1-0.2,0.4-0.4,0.4-0.7c0.2-1.1,0.3-2.3,0.6-3.5c0.1,0.2,0.1,0.5,0.2,0.8c0,0.7,0,1.5-0.1,2.2c0,1.1,0.1,1.2,1.3,1.1c0.1-0.5,0.2-1,0.3-1.5c0.1-0.4,0.2-0.9,0.3-1.3l0.4,0c0,0.7,0.1,1.4,0,2.1c-0.1,0.6,0.2,0.9,0.7,0.9c0.6,0,1.2,0.1,1.8,0.1c0.2,0,0.5,0,0.7,0.1c-7.2,0.8-14.4,0.7-21.7,0.4l0-0.2c0.3,0,0.6,0,1,0c2.2,0.2,2.4-0.1,2.7-2.2c0.1-0.4,0.1-0.9,0.2-1.3h0.3c0,0.5,0.1,1,0.1,1.6c0,0.5,0,1,0.1,1.5c1.2-1.3,0.4-2.9,1.1-4.3l0.2,4.2l0.2,0l0.7-5.9l0.3,0c0,1.7,0,3.4,0,5.1c0,0.4-0.2,0.9,0.5,0.9c0.7,0,0.6-0.5,0.6-0.9c0.2-2.3,0.4-4.7,0.6-7c0-0.2,0.1-0.4,0.3-0.5c0,0.9,0,1.7,0,2.6c0,1.6,0,3.3,0,4.9c0,0.3,0.2,0.6,0.4,0.8c0.2-0.3,0.4-0.5,0.4-0.8c0.2-2.2,0.4-4.3,0.6-6.5c0-0.3,0.2-0.5,0.4-0.6L17.6,12.5L17.6,12.5z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_add_plains = function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M24.53,39.05a1.93,1.93,0,0,1-.33,0L21.93,39c0.09-.78.16-1.52,0.26-2.26s-0.14-.94-0.87-0.91c-1.64.06-3.29,0-4.94,0h-0.9a21.05,21.05,0,0,1,.59-2.48A22.84,22.84,0,0,1,17.26,31l-1.86-.12c0-1.52,0-3,0-4.44a0.57,0.57,0,0,0-.58-0.63c-0.91-.21-1.82-0.42-2.71-0.69A3.8,3.8,0,0,1,11,24.49c-0.8-.57-0.92-1-0.6-2.17-0.23-.07-0.46-0.12-0.69-0.2a10.11,10.11,0,0,1-1.13-.43A2,2,0,0,1,7.28,20a1.93,1.93,0,0,1,1.28-1.73c0.39-.21.81-0.37,1.29-0.58l-0.48-.53a2.49,2.49,0,0,1,0-3.72,4.61,4.61,0,0,1,2.79-1.23,1.9,1.9,0,0,0,1-.45,5.91,5.91,0,0,1,7.35-.32,3.67,3.67,0,0,1,1.31,3.09,7,7,0,0,0,.74-2.17,2.5,2.5,0,0,1,1-2,1.31,1.31,0,0,0,.59-1.73,0.91,0.91,0,0,1,.18-0.69c1-1.52,2-3,3.08-4.62C28.84,4.78,30.24,6.1,30.77,8c0.13,0.48.4,0.92,0.52,1.41s0,0.76,0,1.14a1.86,1.86,0,0,0,.34.87c0.53,0.63,1.45.94,1.53,2a1.17,1.17,0,0,0,.61.32,15.89,15.89,0,0,1,2.45.91,2.73,2.73,0,0,1,1.4,2.82,1,1,0,0,0,.4.64,12.62,12.62,0,0,1,2.12,1.76,3.25,3.25,0,0,1-.86,4.57c-0.34.26-.71,0.47-1.06,0.7,0.69,1.31.5,2.1-.88,2.68a16.76,16.76,0,0,1-3.5.92,0.67,0.67,0,0,0-.72.79c0,1.36,0,2.72,0,4.14H31.46c0-1.41,0-2.79,0-4.17a0.65,0.65,0,0,0-.72-0.8,17.53,17.53,0,0,1-1.81-.33c-0.32.81,0.94,1.9-.52,2.52a13.68,13.68,0,0,1,1.52,2.2,14.37,14.37,0,0,1,.62,2.67c-0.38,0-.65,0-0.91,0H24.85c-0.87,0-.9,0-0.75.92S24.38,38.25,24.53,39.05Zm8.53-14.51c-0.71,1.18-.45,2.08.78,2.45a4.31,4.31,0,0,0,2,.08c1.42-.29,1.78-1.31,1-2.52a0.56,0.56,0,0,1,0-.2c0.26-.09.55-0.18,0.82-0.28a2.64,2.64,0,0,0,1.77-2.49,2.69,2.69,0,0,0-1.81-2.39A2.65,2.65,0,0,0,37,19c-0.46,0-.6-0.2-0.46-0.69a2.22,2.22,0,0,0-1.17-2.73,2.38,2.38,0,0,0-2.87.67,2.18,2.18,0,0,0,.17,2.9,2.31,2.31,0,0,1,.15.24C30.82,21.65,30.84,22.1,33.06,24.54ZM17,21.45c-0.61,1-.63,1.43-0.06,2a2.59,2.59,0,0,0,2.23.72,0.66,0.66,0,0,0,.6-1,1.77,1.77,0,0,1,0-.87,14.87,14.87,0,0,1,.44-1.58c0.28-.88.55-1.77,0.89-2.63,0.24-.6.58-1.16,0.85-1.69a0.7,0.7,0,0,0-.1-0.15l-0.2-.1c-0.68-.3-1.36-0.48-1-1.59a2.09,2.09,0,0,0-1.44-2.39,2.46,2.46,0,0,0-2.85.83,2.17,2.17,0,0,0,.08,2.73c0.1,0.14.2,0.28,0.29,0.41C14.74,18.58,14.76,19,17,21.45Zm8.29,1.88a8.7,8.7,0,0,0-.83-1.22,3.58,3.58,0,0,0-.9-0.51,3.48,3.48,0,0,0-.21.86c0,2.65.16,5.31,0.09,8A9.79,9.79,0,0,0,23.84,33a2.14,2.14,0,0,0,2.48,2,20,20,0,0,1,2.57.16,5.71,5.71,0,0,0-3.53-5.18l0.17-.2h2.33a8.1,8.1,0,0,0-.39-0.85c-0.62-1-.79-2.36-2.18-2.75a0.35,0.35,0,0,1-.18-0.23c-0.19-.78-0.37-1.56-0.55-2.36ZM28,6.21l-0.15.09c0.13,2.93.25,5.85,0.39,8.78,0,0.49.48,0.61,0.93,0.27l2.29-1.69a2.2,2.2,0,0,0-1.26-1.6,1,1,0,0,1-.55-0.46c-0.22-.74-0.37-1.51-0.54-2.29l0.76-.24ZM17.18,28.43l0.32,0.09c0.21-.75.45-1.49,0.62-2.25a0.62,0.62,0,0,0-.44-0.4,0.63,0.63,0,0,0-.48.39C17.15,27,17.18,27.7,17.18,28.43Z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_add_swamp = function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M22.33,2.5c0.91-.81,1-0.78,1.5.23a1.26,1.26,0,0,0,1.95.41A1.64,1.64,0,0,1,28.17,3a4.23,4.23,0,0,0,1.52.49A17.93,17.93,0,0,1,32,3.77a6.28,6.28,0,0,1,1.35,1c1.19,0.81,1.18,2,1,3.13l-1.48.36-1-1.84c-0.82,1.49-.64,2.32.58,3a2.55,2.55,0,0,0,2.23.47,0.92,0.92,0,0,1,.79.2A23,23,0,0,1,37.23,12c0.65,0.79.48,2.95-.38,4L35.49,14.2a0.91,0.91,0,0,0-.88,1.09,8.59,8.59,0,0,1,0,1.67,3.86,3.86,0,0,1-.5,1l-0.36-.1c0-.83,0-1.66,0-2.49a2.18,2.18,0,0,0-.1-1,2.69,2.69,0,0,0-.88-0.6,2.7,2.7,0,0,0-.27.76c0,0.88,0,1.76,0,2.64,0,1.63,0,1.68-1.77,1.93-0.21-.7,0-1.8-1.27-1.71-0.37,1,.1,2.24-0.83,3l-0.39,0c0-1,0-1.95,0-2.91a2.5,2.5,0,0,0-.82-2c-0.53-.53-1-0.76-1.52-0.1a0.79,0.79,0,0,1-.3.13l-0.26-.13c0.16-.37.33-0.74,0.47-1.11a2,2,0,0,0,.32-1.07A1.48,1.48,0,0,0,25,12.51a48.68,48.68,0,0,0-5.53.7A3,3,0,0,0,16.88,16a2.05,2.05,0,0,0,1.56,1.84,21.8,21.8,0,0,1,2.23.6c1.6,0.54,1.86,2,2.1,3.35a8.54,8.54,0,0,1,0,1.47c-1.41,0-1.65-.25-1.67-1.54a3.11,3.11,0,0,0-1.88-2.12,1,1,0,0,0-.72.29A1.47,1.47,0,0,0,18.77,21a2.24,2.24,0,0,1,1,2l-1.6.53c-0.2-.87-0.38-1.66-0.57-2.44-0.26-1.08-.53-1.25-1.87-1.15a5.2,5.2,0,0,1,.7,3.79,2.21,2.21,0,0,1-.45.58l-0.74-2.93c-1.23.84-.42,2-0.84,2.95a0.75,0.75,0,0,1-.81-0.79c-0.07-.93-0.5-1.88.32-2.74a0.94,0.94,0,0,0-.22-0.86,1.33,1.33,0,0,0-1.52.82c-0.05.64,0,1.3-.06,1.93a1,1,0,0,1-.52.68c-0.5.14-.54-0.29-0.53-0.66,0-.58.08-1.17,0.08-1.75A2.76,2.76,0,0,0,11,20.26l-0.34,0a15.53,15.53,0,0,0-.47,1.94c-0.16,1.33-.21,1.39-1.78,1,0.41-1.47.82-2.94,1.24-4.41a1,1,0,0,1,1.14-.71c2.44,0,2.56,0,3.16-2.35a5.63,5.63,0,0,1,2.75-3.61A1.29,1.29,0,0,0,17.08,10a7.61,7.61,0,0,0-1.39-1.44,1,1,0,0,0-1.61.69,1.76,1.76,0,0,1-.43.84,4,4,0,0,0-.26-1,3.54,3.54,0,0,0-.69-0.7,2.38,2.38,0,0,0-.52.79,7.38,7.38,0,0,0,0,1.67,0.8,0.8,0,0,1-.84,1c0-.3,0-0.57-0.06-0.85a1.16,1.16,0,0,0-.07-0.59c-1.33-.66-0.53-2-0.94-2.94a4.57,4.57,0,0,1-.17-1.2,1.36,1.36,0,0,1,.53-1.54,2.72,2.72,0,0,0,.61-0.9c0.28-.47.53-0.94,1.21-0.49,0.4,0.26.77,0.16,0.78-.4,0-.9.64-0.85,1.23-0.8,1.13,0.09,2.26.24,3.39,0.33a2.85,2.85,0,0,0,2-.53A3.25,3.25,0,0,1,21.67,2,2,2,0,0,1,22.33,2.5ZM20.55,7l-0.3-.13a3.52,3.52,0,0,0-.58,1,0.89,0.89,0,0,1-.84.92,0.77,0.77,0,0,0-.37.62,1.75,1.75,0,0,0,.31,1,3.62,3.62,0,0,0,1.92-.17A12.74,12.74,0,0,0,22.61,8.7,1.48,1.48,0,0,0,23,7a2.05,2.05,0,0,0-.6-0.65,3.93,3.93,0,0,0-.39.76c-0.16.6-.27,1.22-0.4,1.83l-0.37,0Zm2.21,3.75c1.14,0.29,2.81-.23,3.17-1a1.56,1.56,0,0,0-.16-1.17A2.63,2.63,0,0,0,24.89,8ZM17.64,8c0.25-1.39-.1-2.08-1.09-2.2a2.82,2.82,0,0,0-1,.28A2.49,2.49,0,0,0,16,7.15,9.07,9.07,0,0,0,17.64,8Z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M20.8,30c0.2,2.14.39,4.28,0.59,6.42,0.11,1.16.12,1.16,1.46,0.86V31l0.26,0c0.11,0.65.26,1.29,0.31,1.95,0.09,1.22.09,2.44,0.2,3.66a0.88,0.88,0,0,0,.51.64c0.51,0.12.54-.3,0.54-0.69,0-1.61,0-3.21,0-4.82l0.25,0C25,32.13,25,32.55,25.07,33c0.12,1.32.22,2.63,0.37,3.95a1.5,1.5,0,0,0,.45.55,1.71,1.71,0,0,0,.31-0.58,27.2,27.2,0,0,1,.33-3.31c0.07,0.43.15,0.87,0.19,1.3s0,0.94.07,1.41a1.1,1.1,0,0,0,1.35,1.24l0.26-2.82,0.21,0c0.09,0.56.19,1.12,0.26,1.68,0.16,1.25.26,1.35,1.55,1.38,0.4,0,.81,0,1.21,0a105.11,105.11,0,0,1-19.83.11h3L15,34.46h0.17l0.55,3.25c1-1.51.31-3,.58-4.34L17,37.55H17.3V31.88l0.16,0c0.2,1.69.4,3.39,0.59,5.08,0,0.38.06,0.81,0.57,0.67A0.93,0.93,0,0,0,19,36.91c0-2.43,0-4.86,0-7.52,0.11,1.15.2,2.08,0.3,3,0.17,1.59.35,3.17,0.55,4.75a1.12,1.12,0,0,0,.42.39,1.16,1.16,0,0,0,.35-0.46c0-.75-0.06-1.5-0.06-2.24,0-1.59,0-3.19,0-4.78Z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M35.06,22q0,2.8,0,5.59c0,0.36-.22.81,0.4,0.88s0.72-.3.76-0.81c0.12-1.43.26-2.86,0.41-4.28A0.89,0.89,0,0,1,37,22.73c0,0.44-.06.87-0.06,1.31,0,1.31,0,2.63,0,3.94a1.75,1.75,0,0,0,.39.66A1.91,1.91,0,0,0,37.83,28c0.2-1.11.32-2.23,0.63-3.37,0,1,0,2,0,3,0,0.6.11,1.11,0.83,1a0.93,0.93,0,0,0,.65-0.55c0.2-.71.28-1.45,0.41-2.17l0.26,0c0,0.71,0,1.42,0,2.13a0.59,0.59,0,0,0,.62.75c0.78,0,1.57.11,2.38,0.17a121.48,121.48,0,0,1-20.91.17C23.47,29.09,24.25,29,25,29s0.86-.4.9-1c0.06-.8.16-1.59,0.24-2.39h0.31v3.08h0.34c1.1-1.23.35-2.85,0.9-4.23l0.2,4.21h0.33l0.64-5.63,0.21,0c0,1.66,0,3.33,0,5,0,0.41,0,.87.53,0.76a1,1,0,0,0,.61-0.74c0.23-2.33.39-4.66,0.58-7,0-.22.07-0.44,0.16-0.91,0,1.27,0,2.28,0,3.28,0,1.6,0,3.2,0,4.8a1.16,1.16,0,0,0,.42.44,1.55,1.55,0,0,0,.5-0.58c0.11-1.2.12-2.4,0.23-3.6a25.7,25.7,0,0,1,.57-3.6c0,2.22,0,4.44,0,6.66,0,0.41-.35,1,0.46,1.07a0.89,0.89,0,0,0,1.13-.95c0.14-1.91.41-3.82,0.63-5.72h0.1Z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_add_jungle = function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M22.46,17.67l-1.17-.41a3,3,0,0,0,.09,2.45,5.7,5.7,0,0,1-1.08,6.79,6.79,6.79,0,0,0-1.7-4.19,14.23,14.23,0,0,0-2.37-1.91c-0.71-.46-0.92-0.29-0.92.59q0,7.69,0,15.39c0,0.29,0,.58,0,0.92H13.26L14.66,21l-0.22-.06a8.13,8.13,0,0,0-1.57,4.21c-0.22,1.54-.29,3.11-0.43,4.68A1.39,1.39,0,0,1,10.57,29a8.25,8.25,0,0,1,.05-8.25c0.12-.21.26-0.4,0.4-0.62-1.23-.08-2.17.65-5.51,4.28L4.4,23.74c0.52-1.1,1-2.19,1.55-3.25a1.62,1.62,0,0,0,.27-1.17c-0.35-1.89,1.17-3.7,3.36-4.13a3.13,3.13,0,0,1,1.12-.14A1.11,1.11,0,0,0,12.12,14a2.59,2.59,0,0,1,.26-0.59,5.91,5.91,0,0,0,1-3.44c-0.15-2.15,2.12-3.9,4.71-4.15a6.55,6.55,0,0,1,4.92,1.4,6.79,6.79,0,0,1,8-1.4c1.35,0.7,1.89,1.8,1.4,2.85a0.74,0.74,0,0,1-.16.14,6.12,6.12,0,0,0-3.91-.52,6.07,6.07,0,0,0,.5.42,6.59,6.59,0,0,1,2.89,6.87,0.84,0.84,0,0,0,.58,1.21,6.08,6.08,0,0,1,1,.62c1.36-2.1,5.26-2.3,7.26-.93a1.65,1.65,0,0,1,.71,2.32,5.1,5.1,0,0,0-3.49-.44A5.61,5.61,0,0,1,41,23.44a5.66,5.66,0,0,1-1.69,4.25c-0.1-.54-0.16-1-0.28-1.46a7.08,7.08,0,0,0-3.64-4.62c-1-.52-1.12-0.42-1.11.64q0,7.61,0,15.22c0,0.29,0,.59,0,0.94H32.22l1.39-16.33-0.28,0c-1.76,2.71-1.81,5.81-1.85,8.93a1.68,1.68,0,0,1-2-.89,8.32,8.32,0,0,1,.11-8.25c0.11-.2.24-0.4,0.36-0.6L29.84,21a10.41,10.41,0,0,0-2.06,1.11C26.76,23,25.89,24,24.94,25c-0.23.23-.5,0.42-0.84,0.71v6.07H21.66l1.65-19.22a4.44,4.44,0,0,0-1.51,2.62,1,1,0,0,0,.37.57A1.55,1.55,0,0,1,22.46,17.67Zm6.6-1.44a7.87,7.87,0,0,0-4.26-4.38c-0.61-.17-0.75.12-0.75,0.67,0,3.27,0,6.53,0,9.8a3.2,3.2,0,0,0,.08.43c0.52-.94,1.26-1.57,1-2.71A2.53,2.53,0,0,1,26,17.77,5.16,5.16,0,0,1,29.07,16.23Zm-10-4.75a10,10,0,0,0-5.49,4.21l0.92,0.63A3.67,3.67,0,0,1,17,14.68a1.23,1.23,0,0,0,.74-0.38C18.19,13.4,18.61,12.45,19.08,11.48Z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_create_group = function(terrain, row, column) {
		let height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		let t_x = Math.round((1.5 * column) * civitas.WORLD_HEX_SIZE);
		let t_y = Math.round(height * (row * 2 + (column % 2)));
		$(document.createElementNS('http://www.w3.org/2000/svg', 'g'))
			.attr({
				'class': 's-c-g-' + row + '-' + column,
				'transform': 'translate(' + t_x + ', ' + t_y + ')',
			})
			.appendTo('.svg-grid');
	};

	this.svg_map_element = function(row, column, prev_row, prev_column, element_type, id, title) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'image'))
			.attr({
				'id': 'w-t-i' + row + '-' + column,
				'xlink:href': '',
				'height': 42,
				'width': 42,
				'x': "2px",
				'y': "2px",
				'class': 'troop',
				'data-name': element_type,
				'data-id': id
				//'title': title
			})
			.appendTo('.s-c-g-' + row + '-' + column);
		document.getElementById('w-t-i' + row + '-' + column)
			.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', civitas.ASSETS_URL + 'images/assets/ui/world/' + element_type + '.png');
	};

	/*
	this.svg_link_cells = function(source, destination) {
		let _source = this.get_cell_middle_coords(source.x, source.y);
		let _destination = this.get_cell_middle_coords(destination.x, destination.y);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'line'))
			.attr({
				'x1': _source.x,
				'y1': _source.y,
				'x2': _destination.x,
				'y2': _destination.y
			})
			.css({
				'stroke': '#ff0000',
				'stroke-width': 2
			})
			.appendTo('.svg-grid');
	}
	*/

	this.svg_create_cell = function(row, column, color, show_grid) {
		let height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		let center = this.get_cell_middle(row, column);
		$(document.createElementNS('http://www.w3.org/2000/svg', 'polygon'))
			.attr({
				points: [
					civitas.utils.to_point(center, -1 * civitas.WORLD_HEX_SIZE / 2, -1 * height),
					civitas.utils.to_point(center, civitas.WORLD_HEX_SIZE / 2, -1 * height),
					civitas.utils.to_point(center, civitas.WORLD_HEX_SIZE, 0),
					civitas.utils.to_point(center, civitas.WORLD_HEX_SIZE / 2, height),
					civitas.utils.to_point(center, -1 * civitas.WORLD_HEX_SIZE / 2, height),
					civitas.utils.to_point(center, -1 * civitas.WORLD_HEX_SIZE, 0)
				].join(' '),
				'class': 'svg-cell'
			})
			.css({
				fill: color,
				stroke: '#000',
				'stroke-width': (show_grid === true) ? 0.1 : 0
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	};

	this.svg_create_worldmap = function(cell_size, colors) {
		let height = Math.sqrt(3) / 2 * cell_size;
		$(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
			.attr({
				'xmlns': 'http://www.w3.org/2000/svg',
				'xmlns:xlink': 'http://www.w3.org/1999/xlink',
				'class': 'svg-grid'
			})
			.appendTo('.worldmap')
			.css({
				width: (1.5 * civitas.WORLD_SIZE_WIDTH  +  0.5) * cell_size,
				height: (2 * civitas.WORLD_SIZE_HEIGHT  +  1) * height,
				'background-color': colors.X.bg
			});
	};

	this.svg_apply_terrain = function(row, column, color, terrain) {
		if (terrain === 'M') {
			this.svg_add_mountain(row, column, color);
		} else if (terrain === 'H') {
			this.svg_add_hill(row, column, color);
		} else if (terrain === 'D') {
			this.svg_add_desert(row, column, color);
		} else if (terrain === 'G') {
			this.svg_add_grass(row, column, color);
		} else if (terrain === 'P') {
			this.svg_add_plains(row, column, color);
		} else if (terrain === 'J') {
			this.svg_add_jungle(row, column, color);
		} else if (terrain === 'W') {
			this.svg_add_swamp(row, column, color);
		}
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
