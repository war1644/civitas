/**
 * Main Game core object, responsible with the game events.
 * 
 * @class civitas.game
 * @license GPLv3
 * @returns {civitas.game}
 */
civitas.game = function () {

	/**
	 * List of all the settlements in the game.
	 * 
	 * @type {Array}
	 * @private
	 */
	this.settlements = [];

	/**
	 * Game actions queue.
	 *
	 * @private
	 * @type {Array}
	 */
	this._queue = [];

	/**
	 * List of currently completed achievements.
	 *
	 * @private
	 * @type {Array}
	 */
	this._achievements = [];

	/**
	 * List of currently completed researches.
	 *
	 * @private
	 * @type {Array}
	 */
	this._research = [];

	/**
	 * Total number of achievement points
	 *
	 * @private
	 * @type {Number}
	 */
	this._achievement_points = 0;

	/**
	 * Pointer to the audio subsystem component.
	 * 
	 * @private
	 * @type {Object}
	 */
	this.music = null;

	/**
	 * Current game date.
	 *
	 * @private
	 * @type {Object}
	 */
	this._date = {
		day: 1,
		month: 1,
		year: 1,
		day_of_month: 1
	};

	/**
	 * Black Market data.
	 * 
	 * @public
	 * @type {Object}
	 */
	this.black_market = {};

	/**
	 * Game settings
	 * 
	 * @type {Object}
	 * @private
	 */
	this.settings = {
		worldmap_beautify: civitas.WORLD_BEAUTIFY,
		worldmap_grid: civitas.WORLD_GRID,
		music: false
	};

	/**
	 * World map data.
	 *
	 * @type {civitas.objects.world}
	 * @private
	 */
	this._world = null;

	/**
	 * Encryption data, for now it's safe (famous last words) since we're only doing local storage.
	 *
	 * @private
	 * @type {Object}
	 */
	this.encryption = {
		key: null,
		key_size: 256,
		iv_size: 128,
		iterations: 100,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	};

	/**
	 * Game properties.
	 *
	 * @private
	 * @type {Object}
	 */
	this.properties = {
		difficulty: civitas.DIFFICULTY_EASY,
		mode: civitas.MODE_SINGLEPLAYER,
		paused: false
	};

	/**
	 * Array containing the list of all open panels.
	 *
	 * @type {Array}
	 * @private
	 */
	this.panels = [];

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.game}
	 */
	this.__init = function () {
		let self = this;
		civitas.ui.build_main();
		this._setup_audio();
		$(window).bind('resize', function() {
			self._resize();
		});
		$('.ui').on('click', '.cityavatar', function () {
			self.open_panel(civitas.PANEL_COUNCIL);
			return false;
		}).on('click', 'a[data-action=panel]', function () {
			let panel = $(this).data('panel').toUpperCase();
			if (typeof civitas['PANEL_' + panel] !== 'undefined') {
				self.open_panel(civitas['PANEL_' + panel]);
			}
			return false;
		}).on('click', 'a[data-action=window]', function () {
			let _window = $(this).data('window').toUpperCase();
			if (typeof civitas['WINDOW_' + _window] !== 'undefined') {
				self.open_window(civitas['WINDOW_' + _window]);
			}
			return false;
		});
		this._resize();
		if (!this.has_storage_data()) {
			this.open_window(civitas.WINDOW_SIGNUP);
		} else {
			if (civitas.ENCRYPTION === true) {
				this.open_window(civitas.WINDOW_SIGNIN);
			} else {
				this.load_game_data();
			}
		}
		return this;
	};

	/**
	 * Set game settings.
	 * 
	 * @param {String} key
	 * @param {String|Number} value
	 * @public
	 * @returns {civitas.game}
	 */
	this.set_settings = function (key, value) {
		if (typeof value === 'undefined') {
			this.settings = key;
		} else {
			this.settings[key] = value;
		}
		return this;
	};

	/**
	 * Retrieve game settings.
	 * 
	 * @param {String} key
	 * @public
	 * @returns {Object}
	 */
	this.get_settings = function (key) {
		if (typeof key === 'undefined') {
			return this.settings;
		} else {
			return this.settings[key];
		}
	};

	/**
	 * Reset the Black Market goods.
	 * 
	 * @public
	 * @returns {Number}
	 */
	this.reset_black_market = function () {
		let t_coins = 0;
		for (let item in this.black_market) {
			this.get_settlement().inc_coins(this.black_market[item].price);
			t_coins += this.black_market[item].price;
		}
		this.black_market = {};
		this.refresh();
		$('#tab-blackmarket > .contents > table > tbody').empty();
		if (t_coins > 0) {
			this.notify(this.get_settlement().name() + ' received <strong>' + t_coins + '</strong> ' + civitas.utils.get_resource_name('coins') + ' from the Black Market for selling goods.', 'Black Market');
		}
		return t_coins;
	};

	/**
	 * Return the Black Market goods list.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_black_market = function () {
		return this.black_market;
	};

	/**
	 * Set the Black Market goods list to the specified value.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {civitas.game}
	 */
	this.set_black_market = function (value) {
		if (typeof value !== 'undefined') {
			this.black_market = value;
		} else {
			this.black_market = {};
		}
		return this;
	};

	/**
	 * Internal method for starting up a game.
	 *
	 * @private
	 * @param {Object} data
	 * @returns {civitas.game}
	 */
	this._setup_game = function(data) {
		let self = this;
		let seconds = 1;
		this._setup_neighbours(data);
		$('header .cityname').html(this.get_settlement().name());
		$('header .cityavatar').css({
			'background-image': 'url(' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + this.get_settlement().ruler().avatar + '.png)'
		});
		this.refresh();
		setInterval(function () {
			if (!self.is_paused() && seconds === civitas.SECONDS_TO_DAY) {
				self._do_daily();
				seconds = 1;
			} else if (!self.is_paused()) {
				seconds++;
			}
		}, 1000);
		$(document).keyup(function(event) {
			if (event.keyCode == 27 && !civitas.ui.window_exists('#window-options')) {
				civitas.ui.show_loader();
				self.open_window(civitas.WINDOW_OPTIONS);
			}
		});
		civitas.ui.hide_loader();
		this.save_and_refresh();
		return this;
	};

	/**
	 * Start a new game.
	 *
	 * @public
	 * @param {String} name
	 * @param {String} s_name
	 * @param {Number} nation
	 * @param {Number} climate
	 * @param {Number} avatar
	 * @param {Number} difficulty
	 * @param {String} password
	 * @returns {Boolean}
	 */
	this.new_game = function(name, s_name, nation, climate, avatar, difficulty, password) {
		let data = null;
		civitas.ui.show_loader();
		if (civitas.ENCRYPTION === true) {
			this.encryption.key = password;
		}
		this.properties.difficulty = parseInt(difficulty);
		this._world = new civitas.objects.world({
			core: this,
			roughness: civitas.INITIAL_SEED[difficulty - 1].roughness
		});
		this._create_settlement(name, s_name, nation, climate, avatar);
		this._setup_game(null);
		return true;
	};

	/**
	 * Load a game by decrypting it with the specified password.
	 *
	 * @public
	 * @param {String} password
	 * @returns {Boolean}
	 */
	this.load_game_data = function(password) {
		let data = null;
		let game_data;
		let hash;
		if (civitas.ENCRYPTION === true) {
			this.encryption.key = password;
		}
		game_data = this.get_storage_data();
		hash = CryptoJS.SHA512(JSON.stringify(game_data.data));
		if (typeof game_data.hash === 'undefined') {
			this.open_window(civitas.WINDOW_ERROR, {
				error: 'Missing game signature.',
				code: '0x01'
			});
			return false;
		}
		if (hash.toString(CryptoJS.enc.Hex) !== game_data.hash) {
			this.open_window(civitas.WINDOW_ERROR, {
				error: 'Invalid game signature.',
				code: '0x02'
			});
			return false;
		}
		if (game_data) {
			civitas.ui.show_loader();
			this._world = new civitas.objects.world({
				core: this
			});
			let temp_game_data = this.import(game_data.data);
			if (temp_game_data !== false) {
				data = this._load_settlement(temp_game_data);
				if (data !== false) {
					this._setup_game(data);
					return true;
				} else {
					this.open_window(civitas.WINDOW_ERROR, {
					error: 'Unable to process game data.',
					code: '0x05'
				});
				return false;
				}
			} else {
				this.open_window(civitas.WINDOW_ERROR, {
					error: 'Invalid game data.',
					code: '0x03'
				});
				return false;
			}
		} else {
			return false;
		}
	};

	/**
	 * Pause the game.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.pause = function() {
		if (this.is_paused() === false) {
			this.properties.paused = true;
			this.log('game', 'Game is paused.');
		}
		return this;
	};

	/**
	 * Resume the game.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.unpause = function() {
		if (this.is_paused() === true) {
			this.properties.paused = false;
			this.log('game', 'Game is resumed.');
		}
		return this;
	};

	/**
	 * Check if the game is paused.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.is_paused = function() {
		return this.properties.paused;
	};

	/**
	 * Setup the audio part of the game.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._setup_audio = function () {
		this.music = $('#music').get(0);
		this.music.volume = 0.2;
		if (civitas.AUTOSTART_MUSIC === true) {
			this.music.play();
		}
		return this;
	};

	/**
	 * Get research data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.get_research_config_data = function (handle) {
		if (typeof handle === 'string') {
			return civitas.RESEARCH[civitas.RESEARCH.findIndexM(handle)];
		}
		return false;
	};

	/**
	 * Get achievement data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.get_achievement_config_data = function (handle) {
		if (typeof handle === 'string') {
			return civitas.ACHIEVEMENTS[civitas.ACHIEVEMENTS.findIndexM(handle)];
		}
		return false;
	};

	/**
	 * Get building data from the main configuration array.
	 * 
	 * @public
	 * @param {String|Number} handle
	 * @returns {Object|Boolean}
	 */
	this.get_building_config_data = function (handle) {
		if (typeof handle === 'string') {
			return civitas.BUILDINGS[civitas.BUILDINGS.findIndexM(handle)];
		} else if (typeof handle === 'number') {
			return civitas.BUILDINGS[handle];
		}
		return false;
	};

	/**
	 * Check if any events occured on this day.
	 *
	 * @private
	 * @returns {civitas.game}
	 */
	this._check_for_events = function() {
		let random = Math.random().toFixed(5);
		let event;
		let _event;
		for (let i = 0; i < civitas.EVENTS.length; i++) {
			_event = civitas.EVENTS[i];
			if (random <= _event.chance) {
				event = _event;
				event.core = this;
				new civitas.objects.event(event);
				return this;
			}
		}
		return this;
	};

	/**
	 * Method that gets called each 'day'.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._do_daily = function () {
		this._date.day++;
		this.log('world', this.format_date());
		this._process_settlements();
		this._check_for_events();
		this.calc_storage();
		this.advance_queue();
		this._date.day_of_month++;
		if (this._date.day_of_month > 30) {
			this._do_monthly();
		}
		if (this._date.day >= 361) {
			this._do_yearly();
			this._date.day = 1;
			this._date.month = 1;
		}
		this.save_and_refresh();
		return this;
	};

	/**
	 * Method that gets called each 'month'.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._do_monthly = function () {
		this._date.day_of_month = 1;
		this._date.month++;
		if (this._date.month === 3 || this._date.month === 6 || this._date.month === 9 || this._date.month === 12) {
			this._do_quarterly();
		}
		if (this._date.month === 6 || this._date.month === 12) {
			this._do_biannually();
		}
		this.reset_black_market();
		return this;
	};

	/**
	 * Method that gets called twice per year.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._do_biannually = function() {
		this.refresh_trades();
		return this;
	};

	/**
	 * Method that gets called four times every year.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._do_quarterly = function() {
		return this;
	};

	/**
	 * Refresh the UI, panels, check for achievements and save game.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.save_and_refresh = function() {
		this.check_achievements();
		this.save();
		this.refresh();
		return this;
	};

	/**
	 * Refresh the world trades.
	 * 
	 * @public
	 * @returns {civitas.game}
	 */
	this.refresh_trades = function() {
		let settlements = this.get_settlements();
		for (let i = 1; i < settlements.length; i++) {
			if (typeof settlements[i] !== 'undefined') {
				if (settlements[i].is_urban()) {
					settlements[i].reset_trades();
				}
			}
		}
		this.notify('World Market trades have been refreshed, settlements are looking to make new purchases and sales.', 'World Market');
		return this;
	};

	/**
	 * Refresh the influence of each of the cities in the world.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._refresh_influence = function() {
		let settlements = this.get_settlements();
		for (let i = 1; i < settlements.length; i++) {
			if (typeof settlements[i] !== 'undefined') {
				if (settlements[i].is_urban()) {
					if (this.get_settlement().religion().id === settlements[i].religion().id) {
						this.get_settlement().raise_influence(settlements[i].id(), civitas.YEARLY_INFLUENCE_GAIN);
					} else if ((this.get_settlement().get_diplomacy_status(settlements[i].id()) === civitas.DIPLOMACY_VASSAL) || (this.get_settlement().get_diplomacy_status(settlements[i].id()) === civitas.DIPLOMACY_ALLIANCE)) {
						this.get_settlement().raise_influence(settlements[i].id());
					} else {
						this.get_settlement().lower_influence(settlements[i].id(), civitas.YEARLY_INFLUENCE_LOSS);
					}
				} else {
					if (this.get_settlement().religion().id === settlements[i].religion().id) {
						this.get_settlement().raise_influence(settlements[i].id(), civitas.YEARLY_INFLUENCE_GAIN);
					} else if ((this.get_settlement().get_diplomacy_status(settlements[i].id()) === civitas.DIPLOMACY_VASSAL) || (this.get_settlement().get_diplomacy_status(settlements[i].id()) === civitas.DIPLOMACY_ALLIANCE)) {
						this.get_settlement().raise_influence(settlements[i].id());
					}
				}
			}
		}
		return this;
	};

	/**
	 * Method that gets called each 'year'.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._do_yearly = function () {
		this.get_settlement().release_mercenaries();
		this.notify('At the end of the year, mercenaries from your city have been released.');
		this._refresh_influence();
		this._date.year++;
		this.log('game', 'New year!');
		return this;
	};

	/**
	 * Return the game date in a more manageable form.
	 * 
	 * @public
	 * @returns {String}
	 */
	this.format_date = function () {
		return 'day ' + this._date.day_of_month + ', month ' + this._date.month + ', year ' + this._date.year;
	};

	/**
	 * Calculate and return the total and free storage space in the main settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.calc_storage = function () {
		let storage = this.get_settlement().storage();
		if (storage.occupied >= storage.all) {
			this.error('You ran out of storage space and all goods produced will be lost. Upgrade your warehouse or marketplace.', 'No storage space');
		} else if ((storage.all - storage.occupied) < 100) {
			this.error('You will soon run out of storage space and all goods produced will be lost. Upgrade your warehouse or marketplace.', 'Storage nearly full');
		}
		return storage;
	};

	/**
	 * Return the amount of taxes produced by a building if the required technology is
	 * researched.
	 *
	 * @public
	 * @param {Object} building
	 * @returns {Number}
	 */
	this.get_tax_modifier = function(building) {
		let amount = 0;
		for (let i = 0; i < this._research.length; i++) {
			if (typeof this._research[i] !== 'undefined') {
				let technology = this.get_research_config_data(this._research[i].handle);
				if (typeof technology.effect !== 'undefined') {
					for (let y in technology.effect) {
						if (typeof technology.effect[y] !== 'undefined') {
							if (y === 'tax') {
								amount = amount + technology.effect[y];
							}
						}
					}
				}
			}
		}
		return amount;
	};

	/**
	 * Return the amount of resources produced by a building if the required technology is
	 * researched.
	 *
	 * @public
	 * @param {Object} building
	 * @returns {Number}
	 */
	this.get_prod_modifier = function(building) {
		let amount = 0;
		for (let i = 0; i < this._research.length; i++) {
			if (typeof this._research[i] !== 'undefined') {
				let technology = this.get_research_config_data(this._research[i].handle);
				if (typeof technology.effect !== 'undefined') {
					for (let y in technology.effect) {
						if (typeof technology.effect[y] !== 'undefined') {
							if (y === 'buildings') {
								for (let item in technology.effect[y]) {
									if (building.handle === item) {
										amount = amount + technology.effect[y][item];
									}
								}
							}
						}
					}
				}
			}
		}
		return amount;
	};

	/**
	 * Get the version of the game.
	 * 
	 * @public
	 * @returns {String}
	 */
	this.version = function() {
		return civitas.VERSION;
	};
	
	/**
	 * Get/set the difficulty level of the game.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.difficulty = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.difficulty = value;
		}
		return this.properties.difficulty;
	};

	/**
	 * Get/set the game mode.
	 *
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.mode = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.mode = value;
		}
		return this.properties.mode;
	};

	/**
	 * Return if the current season is spring.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	this.is_spring = function() {
		if (this._date.month >= 3 && this._date.month < 6) {
			return true;
		}
		return false;
	};

	/**
	 * Return if the current season is summer.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	this.is_summer = function() {
		if (this._date.month >= 6 && this._date.month < 9) {
			return true;
		}
		return false;
	};

	/**
	 * Get/set the current game date.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	this.date = function(value) {
		if (typeof value !== 'undefined') {
			this._date = value;
		}
		return this._date;
	};

	/**
	 * Return if the current season is autumn.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	this.is_autumn = function() {
		if (this._date.month >= 9 && this._date.month < 12) {
			return true;
		}
		return false;
	};

	/**
	 * Return if the current season is winter.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	this.is_winter = function() {
		if (this._date.month >= 12 || this._date.month < 3) {
			return true;
		}
		return false;
	};

	/**
	 * Check for any achievements completion.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.check_achievements = function() {
		let condition;
		let good = false;
		let achievement;
		let id;
		let settlement = this.get_settlement();
		for (let i = 0; i < civitas.ACHIEVEMENTS.length; i++) {
			achievement = civitas.ACHIEVEMENTS[i];
			id = achievement.handle;
			if (!this.has_achievement(id)) {
				for (let cond_item in achievement.conditions) {
					condition = achievement.conditions[cond_item];
					if (cond_item === 'settlement_level') {
						if (settlement.level() === condition) {
							this.achievement(id);
						}
					}
					if (cond_item === 'soldiers') {
						let army = settlement.num_soldiers();
						if (army >= condition) {
							this.achievement(id);
						}
					}
					if (cond_item === 'ships') {
						let navy = settlement.num_ships();
						if (navy >= condition) {
							this.achievement(id);
						}
					}
					if (cond_item === 'population') {
						if (settlement.population() >= condition) {
							this.achievement(id);
						}
					}
					if (cond_item === 'buildings') {
						for (let item in condition) {
							good = true;
							if (!settlement.is_building_built(item, condition[item])) {
								good = false;
								break;
							}
						}
						if (good === true) {
							this.achievement(id);
						}
					}
					if (cond_item === 'resources') {
						good = true;
						for (let item in condition) {
							let amount = settlement.resources[item];
							if (amount < condition[item]) {
								good = false;
								break;
							}
						}
						if (good === true) {
							this.achievement(id);
						}
					}
					if (cond_item === 'storage') {
						if (condition === 0) {
							let storage = settlement.storage();
							if (storage.occupied >= storage.all) {
								this.achievement(id);
							}
						}
					}
					if (cond_item === 'achievements') {
						if (condition === this._achievements.length) {
							this.achievement(id);
						}
					}
					if (cond_item === 'mercenary') {
						let merc = settlement.mercenary();
						if (merc.length >= condition) {
							this.achievement(id);
						}
					}
					if (cond_item === 'religion') {
						let religion = settlement.religion();
						if (religion.name === condition) {
							this.achievement(id);
						}
					}
				}
			}
		}
		return this;
	};

	/**
	 * Perform a research and trigger a notification in the game.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {civitas.game}
	 */
	this.do_research = function (handle) {
		let research;
		if (!this.has_research(handle)) {
			research = this.get_research_config_data(handle)
			if (research !== false) {
				this.get_settlement().remove_resources(research.cost);
				this._research.push({
					handle: handle
				});
				this._notify({
					title: 'Research: ' + research.name,
					mode: civitas.NOTIFY_RESEARCH,
					content: research.description,
					timeout: false
				});
				this.log('research', 'Research Completed: ' + research.name);
				this.save_and_refresh();
			}
		}
		return this;
	};

	/**
	 * Trigger an achievement notification in the game.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {civitas.game}
	 */
	this.achievement = function (handle) {
		let achievement;
		if (!this.has_achievement(handle)) {
			achievement = this.get_achievement_config_data(handle);
			if (achievement) {
				this._achievements.push({
					handle: handle,
					date: + new Date()
				});
				this._achievement_points += achievement.points;
				this._notify({
					title: 'Achievement Completed',
					mode: civitas.NOTIFY_ACHIEVEMENT,
					content: achievement.description,
					timeout: false
				});
				this.log('achievement', 'Achievement Completed: ' + achievement.description);
				this.save_and_refresh();
			}
		}
		return this;
	};

	/**
	 * Check if the current player has the research specified by its handle.
	 *
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.has_research = function(handle) {
		for (let i = 0; i < this._research.length; i++) {
			if (typeof this._research[i] !== 'undefined') {
				if (this._research[i].handle === handle) {
					return this._research[i];
				}
			}
		}
		return false;
	};

	/**
	 * Check if the current player has the achievement specified by its handle.
	 *
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.has_achievement = function(handle) {
		for (let i = 0; i < this._achievements.length; i++) {
			if (typeof this._achievements[i] !== 'undefined') {
				if (this._achievements[i].handle === handle) {
					return this._achievements[i];
				}
			}
		}
		return false;
	};

	/**
	 * Set/get the research.
	 *
	 * @public
	 * @returns {Array}
	 */
	this.research = function(value) {
		if (typeof value !== 'undefined') {
			this._research = value;
		}
		return this._research;
	};

	/**
	 * Set/get the achievements.
	 *
	 * @public
	 * @returns {Array}
	 */
	this.achievements = function(value) {
		if (typeof value !== 'undefined') {
			this._achievements = value;
		}
		return this._achievements;
	};

	/**
	 * Set/get the achievement points.
	 *
	 * @public
	 * @returns {Number}
	 */
	this.achievement_points = function(value) {
		if (typeof value !== 'undefined') {
			this._achievement_points = value;
		}
		return this._achievement_points;
	};

	/**
	 * Set/get the game queue.
	 *
	 * @public
	 * @returns {Array}
	 */
	this.queue = function(value) {
		if (typeof value !== 'undefined') {
			this._queue = value;
		}
		return this._queue;
	};

	/**
	 * Check if something is in the action queue.
	 *
	 * @public
	 * @param {String} handle
	 * @returns {Boolean}
	 */
	this.in_queue = function(handle) {
		for (let i = 0; i < this._queue.length; i++) {
			if (this._queue[i].data.handle === handle) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Advance the game queue.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.advance_queue = function() {
		for (let i = 0; i < this._queue.length; i++) {
			if (this._queue[i].passed === this._queue[i].duration - 1) {
				this.process_action(i);
			} else {
				this._queue[i].passed++;
			}
		}
		return this;
	};

	/**
	 * Process an action from the game queue.
	 *
	 * @public
	 * @param {Number} id
	 * @returns {civitas.game}
	 */
	this.process_action = function(id) {
		let action = this._queue[id];
		let failed = true;
		let destination_settlement;
		let settlement = this.get_settlement(action.source.id);
		if (typeof action.destination !== 'undefined') {
			destination_settlement = this.get_settlement(action.destination.id);
		}
		if (action.mode === civitas.ACTION_CAMPAIGN) {
			let random = Math.ceil(Math.random() * 100);
			let amount = Math.floor(action.data.espionage / 100);
			if (settlement.is_player()) {
				if (action.type === civitas.CAMPAIGN_ARMY && !settlement.can_recruit_soldiers()) {
					this.remove_action(id);
					return false;
				}
				if (action.type === civitas.CAMPAIGN_SPY && !settlement.can_diplomacy()) {
					this.remove_action(id);
					return false;
				}
				if (action.type === civitas.CAMPAIGN_CARAVAN && !settlement.can_trade()) {
					this.remove_action(id);
					return false;
				}
			}
			switch (action.type) {
				case civitas.CAMPAIGN_ARMY:
					this.notify('The army sent from ' + settlement.name() + ' to ' + destination_settlement.name() + ' ' + action.duration + ' days ago reached its destination.');
					if (!this.get_panel('battle')) {
						this.open_window(civitas.WINDOW_BATTLE, {
							source: action,
							destination: destination_settlement
						});
					}
					break;
				case civitas.CAMPAIGN_ARMY_RETURN:
					this.notify('The army sent from ' + destination_settlement.name() + ' to ' + settlement.name() + ' ' + (action.duration * 2) + ' days ago reached its home town.');
					destination_settlement.merge_army(action.data.army);
					destination_settlement.merge_navy(action.data.navy);
					destination_settlement.merge_resources(action.data.resources);
					break;
				case civitas.CAMPAIGN_SPY:
					if (typeof action.data.espionage !== 'undefined') {
						switch (action.data.mission) {
							case civitas.SPY_MISSION_RELIGION:
								if (random <= Math.ceil(action.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									if (action.source.id === settlement.id()) {
										destination_settlement.religion(action.data.religion);
										let religion = destination_settlement.religion();
										this.notify('The spy you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and managed to convince the settlement council to change the religion to ' + religion.name + '.');
									} else if (action.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(action.source.id);
										settlement.religion(action.data.religio);
										let religion = settlement.religion();
										this.notify('The spy sent from ' + destination_settlement.name() + ' ' + action.duration + ' days ago to our city reached its destination and managed to convince your city council to change the religion to ' + religion.name + '.');
									}
									failed = false;
								}
								break;
							case civitas.SPY_MISSION_INFLUENCE:
								if (random <= Math.ceil(action.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									if (action.source.id === settlement.id()) {
										settlement.raise_influence(action.destination.id, amount);
										this.notify('The spy you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and increased your influence over this settlement.');
									} else if (action.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(action.source.id);
										// TODO
										// destination_settlement.raise_influence(action.destination.id, amount);
										this.notify('The spy sent from ' + destination_settlement.name() + ' ' + action.duration + ' days ago to our city reached its destination and lowered your influence over this settlement.');
									}
									failed = false;
								}
								break;
							case civitas.SPY_MISSION_STEAL_RESOURCES:
								if (random <= Math.ceil(action.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									// TODO
									failed = false;
								}
								break;
							case civitas.SPY_MISSION_INSTIGATE:
								if (random <= Math.ceil(action.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									if (action.source.id === settlement.id()) {
										destination_settlement.lower_prestige(amount);
										this.notify('The spy you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and incited the population to revolt, therefore lowering the prestige of the city.');
									} else if (action.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(action.source.id);
										settlement.lower_prestige(amount);
										this.notify('The spy sent from ' + destination_settlement.name() + ' ' + action.duration + ' days ago to our city reached its destination and incited our population to revolt, therefore lowering the prestige of our city.');
									}
									failed = false;
								}
								break;
						}
					}
					break;
				case civitas.CAMPAIGN_CARAVAN:
					let total = 0;
					if (typeof action.data.resources !== 'undefined') {
						for (let item in action.data.resources) {
							if (!civitas.utils.is_virtual_resource(item)) {
								total += civitas.utils.calc_price(action.data.resources[item], item);
							} else if (item === 'coins') {
								total += action.data.resources[item];
							}
							destination_settlement.add_to_storage(item, action.data.resources[item]);
						}
						settlement.raise_influence(action.destination.id, civitas.CARAVAN_INFLUENCE);
						this.notify('The caravan sent from ' + settlement.name() + ' to ' + destination_settlement.name() + action.duration + ' days ago reached its destination.');
					}
					break;
			}
			/*
			if (failed === true) {
				if (action.destination.id === this.get_settlement().id()) {
					destination_settlement = this.get_settlement(action.source.id);
					this.notify('The ' + class_name + ' sent by ' + destination_settlement.name() + ' ' + action.duration + ' days ago reached its destination.');
				} else {
					this.notify('The ' + class_name + ' you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination.');
				}
			}
			*/
		} else if (action.mode === civitas.ACTION_DIPLOMACY) {
			if (settlement.is_player() && !settlement.can_diplomacy()) {
				this.remove_action(id);
				return false;
			}
			switch (action.type) {
				case civitas.DIPLOMACY_PROPOSE_PACT:
					settlement.diplomacy(destination_settlement, civitas.DIPLOMACY_PACT);
					//failed = false;
					break;
				case civitas.DIPLOMACY_PROPOSE_ALLIANCE:
					settlement.diplomacy(destination_settlement, civitas.DIPLOMACY_ALLIANCE);
					//failed = false;
					break;
				case civitas.DIPLOMACY_PROPOSE_CEASE_FIRE:
					settlement.diplomacy(destination_settlement, civitas.DIPLOMACY_CEASE_FIRE);
					//failed = false;
					break;
				case civitas.DIPLOMACY_PROPOSE_JOIN:
					settlement.diplomacy(destination_settlement, civitas.DIPLOMACY_VASSAL);
					//failed = false;
					break;
			}
			if (failed === true) {
				if (action.source.id === settlement.id()) {
					this.notify('The proposal you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' was accepted.');
				}
			}
		} else if (action.mode === civitas.ACTION_RESEARCH) {
			if (settlement.is_player() && !settlement.can_research()) {
				this.remove_action(id);
				return false;
			}
			this.do_research(action.data.handle);
		}
		this.remove_action(id);
		return this;
	};

	/**
	 * Add a campaign to the game queue.
	 *
	 * @public
	 * @param {civitas.objects.settlement} source_settlement
	 * @param {civitas.objects.settlement} destination_settlement
	 * @param {Number} mode
	 * @param {Number} type
	 * @param {Object} data
	 * @returns {Object}
	 */
	this.add_to_queue = function(source_settlement, destination_settlement, mode, type, data) {
		let duration;
		let d_loc;
		let s_loc = source_settlement.location();
		if (destination_settlement !== null) {
			d_loc = destination_settlement.location();
			duration = civitas.utils.get_distance_in_days(s_loc, d_loc);
		} else {
			d_loc = null;
			duration = data.duration;
		}
		let mission_costs;
		let action;
		if (mode === civitas.ACTION_CAMPAIGN) {
			if (type === civitas.CAMPAIGN_ARMY) {
				if (source_settlement.id() === this.get_settlement().id()) {
					if (!source_settlement.can_recruit_soldiers()) {
						return false;
					}
					mission_costs = source_settlement.adjust_campaign_cost(civitas.ARMY_COSTS, duration);
					if (!source_settlement.has_resources(mission_costs)) {
						return false;
					}
					if (!source_settlement.remove_resources(mission_costs)) {
						return false;
					}
					if (!source_settlement.split_army(data)) {
						return false;
					}
					if (!source_settlement.split_navy(data)) {
						return false;
					}
					if (typeof data.resources === 'undefined') {
						data.resources = {};
					}
					source_settlement.diplomacy(destination_settlement.id(), civitas.DIPLOMACY_WAR);
				}
				this.notify('An army was sent from ' +  source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			} else if (type === civitas.CAMPAIGN_ARMY_RETURN) {
				this.notify('The army sent from ' + destination_settlement.name() + ' to ' + source_settlement.name() + ' ' + duration + ' days ago finished its campaign and will be returning home with the spoils of war.');
			} else if (type === civitas.CAMPAIGN_SPY) {
				if (source_settlement.id() === this.get_settlement().id()) {
					if (!source_settlement.can_diplomacy()) {
						return false;
					}
					if (data.espionage > source_settlement.espionage()) {
						return false;
					}
					mission_costs = source_settlement.adjust_campaign_cost(civitas.SPY_COSTS, duration);
					if (!source_settlement.has_resources(mission_costs)) {
						return false;
					}
					if (!source_settlement.remove_resources(mission_costs)) {
						return false;
					}
					source_settlement.lower_espionage(data.espionage);
					if (data.mission === civitas.SPY_MISSION_RELIGION) {
						source_settlement.reset_faith();
					}
				}
				this.notify('A spy was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			} else if (type === civitas.CAMPAIGN_CARAVAN) {
				if (source_settlement.id() === this.get_settlement().id()) {
					if (!source_settlement.can_trade()) {
						return false;
					}
					mission_costs = source_settlement.adjust_campaign_cost(civitas.CARAVAN_COSTS, duration, data.resources);
					if (!source_settlement.has_resources(mission_costs)) {
						return false;
					}
					if (!source_settlement.remove_resources(mission_costs)) {
						return false;
					}
				}
				this.notify('A caravan was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			}
		} else if (mode === civitas.ACTION_DIPLOMACY) {
			duration = Math.ceil(duration / 2);
			if (source_settlement.id() === this.get_settlement().id()) {
				this.notify('A diplomacy proposal was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			}
		} else if (mode === civitas.ACTION_RESEARCH) {
			// Todo
			this.notify('Your city`s Academy started researching ' + data.name + ' and will finish it in ' + duration + ' days.');
		}
		action = {
			mode: mode,
			source: {
				x: s_loc.x,
				y: s_loc.y,
				id: source_settlement.id()
			},
			duration: duration,
			passed: 0,
			type: type,
			data: data
		};
		if (destination_settlement !== null) {
			action.destination = {
				x: d_loc.x,
				y: d_loc.y,
				id: destination_settlement.id()
			};
		}
		this._queue.push(action);
		this.save_and_refresh();
		return action;
	};

	/**
	 * Remove an action from the game queue.
	 *
	 * @public
	 * @param {Number} id
	 * @returns {civitas.game}
	 */
	this.remove_action = function(id) {
		let panel;
		if (panel = this.get_panel('campaign')) {
			panel.destroy();
		}
		this._queue.splice(id, 1);
		return this;
	};

	/**
	 * Process each of the settlements in the world.
	 * 
	 * @private
	 * @param {String} name
	 * @returns {civitas.settlement|Boolean}
	 */
	this._process_settlements = function() {
		let settlements = this.get_settlements();
		let buildings;
		for (let i = 0; i < settlements.length; i++) {
			if (typeof settlements[i] !== 'undefined') {
				if (!settlements[i].is_player()) {
					if (settlements[i].ai() !== null) {
						if (settlements[i].ai().process()) {
							// Todo
							this.log('ai', 'Processed AI with id `' + i + '` for the ' + settlements[i].nice_name());
						}
					}
				}
				// For now, process just the player settlement.
				// TODO
				if (settlements[i].is_player()) {
					buildings = settlements[i].get_buildings();
					for (let x = 0; x < buildings.length; x++) {
						if (typeof buildings[x] !== 'undefined') {
							buildings[x].process();
						}
					}
				}
			}
		}
	};

	/**
	 * Get a pointer to the player's settlement.
	 * 
	 * @public
	 * @param {String|Number} name
	 * @returns {civitas.settlement|Boolean}
	 */
	this.get_settlement = function (name) {
		let settlements = this.get_settlements();
		if (typeof name === 'undefined') {
			return settlements[0];
		}
		if (typeof name === 'string') {
			for (let i = 0; i < settlements.length; i++) {
				if (typeof settlements[i] !== 'undefined') {
					if (settlements[i].name() === name) {
						return settlements[i];
					}
				}
			}
		} else if (typeof name === 'number') {
			for (let i = 0; i < settlements.length; i++) {
				if (typeof settlements[i] !== 'undefined') {
					if (settlements[i].id() === name) {
						return settlements[i];
					}
				}
			}
		}
		return false;
	};

	/**
	 * Load the player settlement from specified data.
	 * 
	 * @private
	 * @param {Object} data
	 * @returns {Object|Boolean}
	 */
	this._load_settlement = function (data) {
		let player_s_data = data.settlements[0];
		let new_settlement;
		if (player_s_data) {
			player_s_data.core = this;
			new_settlement = new civitas.objects.settlement(player_s_data);
			this.settlements.push(new_settlement);
			new_settlement.setup_initial_buildings(player_s_data.buildings);
			return data;
		}
		return false;
	};

	/**
	 * Get the number of all the settlements in game.
	 * 
	 * @public
	 * @returns {Number}
	 */
	this.get_num_settlements = function () {
		return this.settlements.length;
	};

	/**
	 * Get the list of all the settlements in game.
	 * 
	 * @public
	 * @returns {Array}
	 */
	this.get_settlements = function () {
		return this.settlements;
	};

	/**
	 * Generate random army soldiers.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {Object}
	 */
	this.generate_random_army = function(s_type) {
		let army = {};
		for (let item in civitas.SOLDIERS) {
			if (s_type === civitas.CITY) {
				if (item === 'cannon' || item === 'catapult') {
					army[item] = civitas.utils.get_random(1, 2);
				} else {
					army[item] = civitas.utils.get_random(5, 10);
				}
			} else if (s_type === civitas.METROPOLIS) {
				if (item === 'cannon' || item === 'catapult') {
					army[item] = civitas.utils.get_random(3, 5);
				} else {
					army[item] = civitas.utils.get_random(20, 30);
				}
			} else if (s_type === civitas.VILLAGE) {
				if (item === 'cannon' || item === 'catapult') {
					// Todo
				} else {
					army[item] = civitas.utils.get_random(0, 2);
				}
			} else if (s_type === civitas.CAMP) {
				if (item === 'cannon' || item === 'catapult') {
					// Todo
				} else {
					army[item] = civitas.utils.get_random(3, 5);
				}
			}
		}
		return army;
	};

	/**
	 * Generate random navy ships.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {Object}
	 */
	this.generate_random_navy = function(s_type) {
		let navy = {};
		for (let item in civitas.SHIPS) {
			if (s_type === civitas.CITY) {
				navy[item] = civitas.utils.get_random(3, 5);
			} else if (s_type === civitas.METROPOLIS) {
				navy[item] = civitas.utils.get_random(10, 20);
			} else if (s_type === civitas.VILLAGE) {
				navy[item] = civitas.utils.get_random(0, 2);
			} else if (s_type === civitas.CAMP) {
				navy[item] = 0;
			}
		}
		return navy;
	};

	/**
	 * Generate random resources and trades.
	 * 
	 * @public
	 * @param {Boolean} full
	 * @param {Number} settlement
	 * @returns {Object}
	 */
	this.generate_random_resources = function(full, settlement) {
		let resources = {};
		let num_resources;
		let trades = {
			imports: {},
			exports: {}
		};
		let resource;
		if (full === true) {
			if (settlement === civitas.CITY) {
				resources.coins = civitas.utils.get_random(10000, 1000000);
				resources.fame = civitas.utils.get_random(50000, 100000);
				resources.prestige = civitas.utils.get_random(civitas.MIN_PRESTIGE_VALUE, civitas.MAX_PRESTIGE_VALUE);
				resources.espionage = civitas.utils.get_random(civitas.MIN_ESPIONAGE_VALUE, civitas.MAX_ESPIONAGE_VALUE);
				resources.research = civitas.utils.get_random(civitas.MIN_RESEARCH_VALUE, civitas.MAX_RESEARCH_VALUE);
				resources.faith = civitas.utils.get_random(civitas.MIN_FAITH_VALUE, civitas.MAX_FAITH_VALUE);
			} else if (settlement === civitas.METROPOLIS) {
				resources.coins = civitas.utils.get_random(100000, 10000000);
				resources.fame = civitas.utils.get_random(500000, 1000000);
				resources.prestige = civitas.utils.get_random(5000, civitas.MAX_PRESTIGE_VALUE);
				resources.espionage = civitas.utils.get_random(500, civitas.MAX_ESPIONAGE_VALUE);
				resources.research = civitas.utils.get_random(500, civitas.MAX_RESEARCH_VALUE);
				resources.faith = civitas.utils.get_random(500, civitas.MAX_FAITH_VALUE);
			} else if (settlement === civitas.VILLAGE) {
				resources.coins = civitas.utils.get_random(10000, 30000);
				resources.fame = civitas.utils.get_random(1, 50000);
				resources.prestige = civitas.utils.get_random(civitas.MIN_PRESTIGE_VALUE, 100);
				resources.espionage = civitas.utils.get_random(civitas.MIN_ESPIONAGE_VALUE, 2);
				resources.research = civitas.utils.get_random(civitas.MIN_RESEARCH_VALUE, 2);
				resources.faith = civitas.utils.get_random(civitas.MIN_FAITH_VALUE, civitas.MAX_FAITH_VALUE);
			} else if (settlement === civitas.CAMP) {
				resources.coins = civitas.utils.get_random(1000, 10000);
				resources.fame = 1;
				resources.prestige = civitas.MIN_PRESTIGE_VALUE;
				resources.espionage = civitas.MIN_ESPIONAGE_VALUE;
				resources.research = civitas.MIN_RESEARCH_VALUE;
				resources.faith = civitas.MIN_FAITH_VALUE;
			}
		}
		if (settlement === civitas.CITY) {
			num_resources = civitas.utils.get_random(5, 30);
		} else if (settlement === civitas.METROPOLIS) {
			num_resources = civitas.utils.get_random(15, 80);
		} else if (settlement === civitas.VILLAGE) {
			num_resources = civitas.utils.get_random(2, 10);
		} else if (settlement === civitas.CAMP) {
			num_resources = civitas.utils.get_random(2, 5);
		}
		for (let i = 0; i < num_resources; i++) {
			resource = this.get_random_resource();
			resources[resource] = civitas.utils.get_random(10, 500);
			if (settlement === civitas.CITY || settlement === civitas.METROPOLIS) {
				if (resources[resource] > 450) {
					trades.exports[resource] = civitas.IMPORTANCE_VITAL;
				} else if (resources[resource] > 300 && resources[resource] <= 450) {
					trades.exports[resource] = civitas.IMPORTANCE_HIGH;
				} else if (resources[resource] > 150 && resources[resource] <= 250) {
					trades.exports[resource] = civitas.IMPORTANCE_MEDIUM;
				}
			}
		}
		if (settlement === civitas.CITY || settlement === civitas.METROPOLIS) {
			for (let i = 0; i < num_resources; i++) {
				resource= this.get_random_resource();
				trades.imports[resource] = civitas.utils.get_random(civitas.IMPORTANCE_LOW, civitas.IMPORTANCE_VITAL);
			}
		}
		return {
			resources: resources,
			trades: trades
		};
	};

	/**
	 * Get a random resource key.
	 *
	 * @public
	 * @returns {String}
	 */
	this.get_random_resource = function() {
		let keys = Object.keys(civitas.RESOURCES);
		let resource = keys[keys.length * Math.random() << 0];
		if (!civitas.utils.is_virtual_resource(resource)) {
			return resource;
		} else {
			return this.get_random_resource();
		}
	};

	/**
	 * Generate random settlement data.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {Object}
	 */
	this.generate_random_settlement_data = function(s_type) {
		let level;
		if (typeof s_type === 'undefined') {
			s_type = civitas.utils.get_random(0, civitas.SETTLEMENTS.length - 1);
		}
		let resources = this.generate_random_resources(true, s_type);
		if (s_type === civitas.CITY) {
			level = civitas.utils.get_random(10, civitas.MAX_SETTLEMENT_LEVEL);
		} else if (s_type === civitas.METROPOLIS) {
			level = civitas.utils.get_random(20, civitas.MAX_SETTLEMENT_LEVEL);
		} else if (s_type === civitas.VILLAGE) {
			level = civitas.utils.get_random(1, 5);
		} else {
			level = 1;
		}
		let settlement = {
			icon: civitas.utils.get_random(1, civitas.MAX_SETTLEMENT_ICONS),
			type: s_type,
			player: false,
			name: civitas.utils.get_random_unique(civitas.SETTLEMENT_NAMES),
			religion: this.get_random_religion(),
			nationality: this.get_random_nationality(),
			level: level,
			resources: resources.resources,
			army: this.generate_random_army(s_type),
			navy: this.generate_random_navy(s_type)
		}
		if (s_type === civitas.CITY || s_type === civitas.METROPOLIS) {
			settlement.trades = resources.trades;
		}
		return settlement;
	};

	/**
	 * Generate a random nationality.
	 *
	 * @public
	 * @returns {Number}
	 */
	this.get_random_nationality = function() {
		return civitas.utils.get_random(1, civitas.NATIONS.length - 1);
	};

	/**
	 * Generate a random religion.
	 *
	 * @public
	 * @returns {Number}
	 */
	this.get_random_religion = function() {
		return civitas.utils.get_random(1, civitas.RELIGIONS.length - 1);
	};

	/**
	 * Generate a random personality.
	 *
	 * @public
	 * @returns {Number}
	 */
	this.get_random_personality = function() {
		return civitas.utils.get_random(1, civitas.PERSONALITIES.length - 1);
	};

	/**
	 * Create the player settlement.
	 * 
	 * @private
	 * @param {String} name
	 * @param {String} cityname
	 * @param {Number} nation
	 * @param {Number} climate
	 * @param {Number} avatar
	 * @returns {civitas.game}
	 */
	this._create_settlement = function (name, cityname, nation, climate, avatar) {
		let difficulty = this.difficulty();
		this.add_settlement({
			name: cityname,
			climate: climate,
			avatar: avatar,
			religion: civitas.RELIGION_NONE,
			nationality: nation,
			army: civitas.INITIAL_SEED[difficulty - 1].military.army,
			navy: civitas.INITIAL_SEED[difficulty - 1].military.navy,
			resources: civitas.INITIAL_SEED[difficulty - 1].resources,
			core: this
		}, 0, {
			name: name,
			avatar: avatar
		}).setup_initial_buildings(civitas.INITIAL_SEED[difficulty - 1].buildings);
		return this;
	};

	/**
	 * Add a settlement into the world.
	 * 
	 * @public
	 * @param {Object} s_data
	 * @param {Number} id
	 * @param {Object} p_data
	 * @returns {civitas.objects.settlement|Boolean}
	 */
	this.add_settlement = function(s_data, id, p_data) {
		if (this.get_num_settlements() <= civitas.MAX_SETTLEMENTS) {
			let climate;
			let new_settlement;
			let ruler;
			let location;
			let player = false;
			if (typeof id === 'undefined') {
				id = this.get_num_settlements();
			}
			if (typeof p_data !== 'undefined') {
				player = true;
			}
			if (typeof s_data.climate !== 'undefined') {
				climate = s_data.climate;
			} else {
				climate = civitas.CLIMATE_TEMPERATE;
			}
			if (player === false) {
				location = this.world().get_random_location(this.world().get_terrain_from_climate());
				ruler = {
					title: (s_data.type === civitas.CAMP) ? 'Warlord' : 'Mayor',
					avatar: civitas.utils.get_random(1, civitas.AVATARS),
					personality: (s_data.type === civitas.CAMP) ? civitas.PERSONALITY_WARLORD : this.get_random_personality(),
					name: civitas.utils.get_random_unique(civitas.NAMES)
				};
			} else {
				location = this.world().get_random_location(this.world().get_terrain_from_climate(climate));
				id = 0;
				ruler = {
					name: p_data.name,
					title: '',
					avatar: p_data.avatar,
					personality: civitas.PERSONALITY_BALANCED
				}
			}
			new_settlement = new civitas.objects.settlement({
				core: this,
				properties: {
					id: id,
					type: typeof s_data.type !== 'undefined' ? s_data.type : civitas.CITY,
					name: typeof s_data.name !== 'undefined' ? s_data.name : civitas.utils.get_random_unique(civitas.SETTLEMENT_NAMES),
					player: player,
					level: typeof s_data.level !== 'undefined' ? s_data.level : 1,
					climate: climate,
					religion: typeof s_data.religion !== 'undefined' ? s_data.religion : civitas.RELIGION_CHRISTIANITY,
					ruler: ruler,
					nationality: s_data.nationality,
					icon: typeof s_data.icon !== 'undefined' ? s_data.icon : 1
				},
				resources: typeof s_data.resources !== 'undefined' ? s_data.resources : {},
				army: typeof s_data.army !== 'undefined' ? s_data.army : {},
				navy: typeof s_data.navy !== 'undefined' ? s_data.navy : {},
				trades: typeof s_data.trades !== 'undefined' ? s_data.trades : {},
				location: location
			});
			if (player === false) {
				this.get_settlement().status(id, {
					influence: (s_data.type === civitas.CAMP) ? civitas.MIN_INFLUENCE_VALUE : Math.floor(civitas.MAX_INFLUENCE_VALUE / 2),
					status: (s_data.type === civitas.CAMP) ? civitas.DIPLOMACY_WAR : civitas.DIPLOMACY_TRUCE
				});
			}
			this.settlements.push(new_settlement);
			return new_settlement;
		} else {
			return false;
		}
	};

	/**
	 * Remove a settlement from the world
	 * 
	 * @public
	 * @param {Number} id
	 * @returns {Boolean}
	 */
	this.disband_city = function(id) {
		// TODO
		if (id <= 0) {
			return false;
		}
		if (typeof this.settlements[id] === 'undefined') {
			return false;
		} else {
			this.world().remove_city(this.settlements[id]);
			this.settlements.splice(id, 1);
			return true;
		}
	};

	/**
	 * Create all the other settlements in the world.
	 * 
	 * @private
	 * @param {Object} data
	 * @returns {civitas.game}
	 */
	this._setup_neighbours = function (data) {
		let new_settlement;
		let s_data;
		let difficulty = this.difficulty();
		let num;
		if (data !== null) {
			for (let i = 1; i < data.settlements.length; i++) {
				s_data = data.settlements[i];
				s_data.core = this;
				new_settlement = new civitas.objects.settlement(s_data);
				this.settlements.push(new_settlement);
			}
		} else {
			for (let i = 0; i < civitas.SETTLEMENTS.length; i++) {
				num = civitas.INITIAL_SEED[difficulty - 1].settlements[i];
				for (let z = 0; z < num; z++) {
					this.add_random_settlement(i);
				}
			}
		}
		return this;
	};

	/**
	 * Add a random settlement into the world.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {civitas.game}
	 */
	this.add_random_settlement = function(s_type) {
		let data = this.generate_random_settlement_data(s_type);
		this.add_settlement(data);
		return this;
	};

	/**
	 * Reset (empty) game storage data.
	 * 
	 * @param {String} key
	 * @public
	 * @returns {civitas.game}
	 */
	this.reset_storage_data = function(key) {
		if (typeof key === 'undefined') {
			key = 'live';
		}
		localStorage.removeItem(civitas.STORAGE_KEY + '.' + key);
		return this;
	};

	/**
	 * Encrypt data using AES encryption.
	 *
	 * @public
	 * @param {String} data
	 * @returns {String}
	 */
	this.encrypt = function(data) {
		let salt = CryptoJS.lib.WordArray.random(128 / 8);
		let key = CryptoJS.PBKDF2(this.encryption.key, salt, {
			keySize: this.encryption.key_size / 32,
			iterations: this.encryption.iterations
		});
		let iv = CryptoJS.lib.WordArray.random(128 / 8);
		let encrypted = CryptoJS.AES.encrypt(data, key, { 
			iv: iv,
			padding: this.encryption.padding,
			mode: this.encryption.mode
		});
		return salt.toString() + iv.toString() + encrypted.toString();
	};

	/**
	 * Decrypt data using AES encryption.
	 *
	 * @public
	 * @param {String} data
	 * @returns {String}
	 */
	this.decrypt = function(data) {
		let salt = CryptoJS.enc.Hex.parse(data.substr(0, 32));
		let iv = CryptoJS.enc.Hex.parse(data.substr(32, 32))
		let encrypted = data.substring(64);
		let key = CryptoJS.PBKDF2(this.encryption.key, salt, {
			keySize: this.encryption.key_size / 32,
			iterations: this.encryption.iterations
		});
		let decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
			iv: iv, 
			padding: this.encryption.padding,
			mode: this.encryption.mode
		});
		try {
			decrypted = decrypted.toString(CryptoJS.enc.Utf8);
		} catch (err) {
			return false;
		}
		return decrypted;
	};

	/**
	 * Set game storage data.
	 * 
	 * @param {String} key
	 * @param {String|Number} value
	 * @param {Boolean} as_text
	 * @public
	 * @returns {civitas.game}
	 */
	this.set_storage_data = function (key, value, as_text) {
		let data;
		if (as_text === true) {
			data = JSON.stringify(value);
		} else {
			data = value;
		}
		if (civitas.ENCRYPTION === true) {
			localStorage.setItem(civitas.STORAGE_KEY + '.' + key, this.encrypt(data));
		} else {
			localStorage.setItem(civitas.STORAGE_KEY + '.' + key, data);
		}
		return this;
	};

	/**
	 * Retrieve game storage data.
	 * 
	 * @param {String} key
	 * @param {Boolean} as_text
	 * @public
	 * @returns {String|Number}
	 */
	this.get_storage_data = function (key, as_text) {
		let decrypted;
		if (typeof key === 'undefined') {
			key = 'live';
		}
		if (this.has_storage_data(key)) {
			if (civitas.ENCRYPTION === true) {
				decrypted = this.decrypt(localStorage.getItem(civitas.STORAGE_KEY + '.' + key));
			} else {
				decrypted = localStorage.getItem(civitas.STORAGE_KEY + '.' + key);	
			}
			if (decrypted !== false) {
				if (as_text === true) {
					return decrypted;
				} else {
					return JSON.parse(decrypted);
				}
			}
		}
		return false;
	};

	/**
	 * Check if there is any stored data.
	 *
	 * @param {String} key
	 * @public
	 * @returns {Boolean}
	 */
	this.has_storage_data = function(key) {
		if (typeof key === 'undefined') {
			key = 'live';
		}
		if (localStorage.getItem(civitas.STORAGE_KEY + '.' + key) !== null) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * Import game data.
	 *
	 * @public
	 * @param {Object} data
	 * @returns {Object}
	 */
	this.import = function(data) {
		if (data === false) {
			return false;
		}
		this.difficulty(data.difficulty);
		this.queue(data.queue);
		this.research(data.research);
		this.achievements(data.achievements);
		this.world().data(data.world);
		this.achievement_points(data.achievement_points);
		this.date(data.date);
		this.set_black_market(data.black_market);
		this.set_settings(data.settings);
		return data;
	};

	/**
	 * Export game data.
	 *
	 * @public
	 * @param {Boolean} to_local_storage
	 * @returns {Object}
	 */
	this.export = function(to_local_storage) {
		let settlement = this.get_settlement();
		let settlements_list = [];
		let data;
		let hash;
		for (let i = 0; i < this.settlements.length; i++) {
			if (typeof this.settlements[i] !== 'undefined') {
				settlements_list.push(this.settlements[i].export());
			}
		}
		data = {
			settlements: settlements_list,
			difficulty: this.difficulty(),
			world: this.world().data(),
			achievements: this.achievements(),
			research: this.research(),
			achievement_points: this.achievement_points(),
			black_market: this.get_black_market(),
			date: this.date(),
			queue: this.queue(),
			settings: this.get_settings(),
			info: {
				version: civitas.VERSION
			}
		};
		hash = CryptoJS.SHA512(JSON.stringify(data));
		if (to_local_storage === true) {
			let new_data = {
				date: Number(new Date()),
				data: data,
				hash: hash.toString(CryptoJS.enc.Hex)
			}
			this.set_storage_data('live', new_data, true);
			return new_data;
		}
		return data;
	};

	/**
	 * Save the game data.
	 * 
	 * @public
	 * @returns {civitas.game}
	 */
	this.save = function () {
		this.export(true);
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
		let panels = this.get_panels();
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
		let panels = this.get_panels();
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
	 * Refresh the UI and panels.
	 *
	 * @public
	 * @returns {civitas.game}
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
	 * Refresh the resources toolbar.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.refresh_toolbar = function() {
		let settlement = this.get_settlement();
		if (typeof settlement !== 'undefined') {
			let resources = settlement.get_resources();
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
	 * Level up the user settlement.
	 *
	 * @public
	 * @return {civitas.game}
	 */
	this.level_up = function() {
		let settlement = this.get_settlement();
		settlement.level_up();
		this.refresh_panels();
		$('.citylevel').html(settlement.level());
		this.notify('The city of ' + settlement.name() + ' is now level ' + settlement.level() + '.');
	};

	/**
	 * Refresh all the UI information after a property change.
	 * 
	 * @public
	 * @returns {civitas.game}
	 */
	this.refresh_ui = function () {
		let settlement = this.get_settlement();
		if (typeof settlement !== 'undefined') {
			$('.citylevel').html(settlement.level());
			if (settlement.fame() >= civitas.LEVELS[settlement.level()]) {
				this.level_up();
			}
		}
		return this;
	};

	/**
	 * Force refresh of the UI panels open.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.refresh_panels = function() {
		let panels = this.get_panels();
		for (let i = 0; i < panels.length; i++) {
			if (typeof panels[i] !== 'undefined') {
				panels[i].on_refresh();
			}
		}
		return this;
	};

	/**
	 * Perform a normal notification in the game.
	 * 
	 * @public
	 * @param {String} message
	 * @param {String} title
	 * @param {Number} timeout
	 * @returns {civitas.game}
	 */
	this.notify = function (message, title, timeout) {
		this._notify({
			title: (typeof title !== 'undefined') ? title : 'City Council',
			content: message,
			timeout: typeof timeout !== 'undefined' ? timeout : 15000
		});
		this.log('game', message);
		return this;
	};

	/**
	 * Internal function for performing an UI notification.
	 * 
	 * @param {Object} settings
	 * @returns {civitas.game}
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
	 * @returns {civitas.game}
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
	 * @private
	 * @returns {civitas.game}
	 */
	this._resize = function() {
		let window_width = $(window).width();
		let window_height = $(window).height();
		$('.ui > footer').css({
			left: (window_width / 2) - ($('.ui > footer').width() / 2)
		});
		$('.ui > .viewport').width(window_width - $('.ui > aside').width());
		$('.ui > .viewport').height(window_height - 48);
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
	 * Open a UI panel.
	 *
	 * @public
	 * @param {Object} panel_data
	 * @param {Object} extra_data
	 * @param {Boolean} sidebar
	 * @returns {civitas.controls.panel}
	 */
	this.open_panel = function(panel_data, extra_data, sidebar) {
		panel_data.core = this;
		if (typeof extra_data !== 'undefined') {
			panel_data.data = extra_data;
		}
		if (typeof sidebar !== 'undefined') {
			panel_data.data.sidebar = sidebar;
		}
		let panel = new civitas.controls.panel(panel_data);
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
		window_data.core = this;
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
	 * @returns {civitas.game}
	 */
	this.open_modal = function(callback, text, title) {
		let modal = new civitas.controls.modal({
			core: this
		});
		modal.alert({
			title: typeof title !== 'undefined' ? title : 'City Council',
			text: text,
			on_click: callback
		});
		return this;
	};

	/**
	 * Get the world object.
	 *
	 * @public
	 * @returns {civitas.objects.world}
	 */
	this.world = function() {
		return this._world;
	};

	/**
	 * Log data to the console.
	 * 
	 * @public
	 * @param {String} namespace
	 * @param {String} message
	 * @param {Boolean} error
	 * @returns {civitas.game}
	 */
	this.log = function (namespace, message, error) {
		if ($('#panel-debug .console p').length > civitas.MAX_CONSOLE_LINES) {
			$('#panel-debug .console').empty();
		}
		$('#panel-debug .console').prepend('<p><span class="date">' + civitas.utils.get_now() + '</span><span class="namespace game-' + namespace + '">' + namespace.toUpperCase() + '</span>' + (error === true ? '<span class="error">ERROR</span>' : '') + '<span' + (error === true ? ' class="error-message"' : ' class="log-message"') + '>' + message + '</span></p>');
		return this;
	};

	// Fire up the constructor
	return this.__init();
};

$(document).ready(function () {
	new civitas.game();
});
