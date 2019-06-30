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
	 * Pointer to the game UI object.
	 *
	 * @private
	 * @type {civitas.objects.ui}
	 */
	this._ui = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.game}
	 */
	this.__init = function () {
		this._ui = new civitas.objects.ui(this);
		const ui = this.ui();
		ui.build_main();
		this._setup_audio();
		$(window).bind('resize', function() {
			ui.resize();
		});
		$('.ui').on('click', '.cityavatar', function () {
			ui.open_panel(civitas.PANEL_COUNCIL);
			return false;
		}).on('click', 'a[data-action=panel]', function () {
			let panel = $(this).data('panel').toUpperCase();
			if (typeof civitas['PANEL_' + panel] !== 'undefined') {
				ui.open_panel(civitas['PANEL_' + panel]);
			}
			return false;
		}).on('click', 'a[data-action=window]', function () {
			let _window = $(this).data('window').toUpperCase();
			if (typeof civitas['WINDOW_' + _window] !== 'undefined') {
				ui.open_window(civitas['WINDOW_' + _window]);
			}
			return false;
		});
		ui.resize();
		if (!this.has_storage_data()) {
			ui.open_window(civitas.WINDOW_SIGNUP);
		} else {
			if (civitas.ENCRYPTION === true) {
				ui.open_window(civitas.WINDOW_SIGNIN);
			} else {
				this.load_game_data();
			}
		}
		return this;
	};

	/* =================================== Storage =================================== */

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
		const salt = CryptoJS.lib.WordArray.random(128 / 8);
		const key = CryptoJS.PBKDF2(this.encryption.key, salt, {
			keySize: this.encryption.key_size / 32,
			iterations: this.encryption.iterations
		});
		const iv = CryptoJS.lib.WordArray.random(128 / 8);
		const encrypted = CryptoJS.AES.encrypt(data, key, { 
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
		const salt = CryptoJS.enc.Hex.parse(data.substr(0, 32));
		const iv = CryptoJS.enc.Hex.parse(data.substr(32, 32))
		const encrypted = data.substring(64);
		const key = CryptoJS.PBKDF2(this.encryption.key, salt, {
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
		const settlement = this.get_settlement();
		const settlements_list = [];
		for (let i = 0; i < this.settlements.length; i++) {
			if (typeof this.settlements[i] !== 'undefined') {
				settlements_list.push(this.settlements[i].export());
			}
		}
		const data = {
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
		const hash = CryptoJS.SHA512(JSON.stringify(data));
		if (to_local_storage === true) {
			const new_data = {
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
	
	/* =================================== Date / Time =================================== */

	/**
	 * Method that gets called each 'day'.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._do_daily = function () {
		this._date.day++;
		this.ui().log('world', this.format_date());
		this._process_settlements();
		this._check_for_events();
		this._queue_advance();
		this._date.day_of_month++;
		if (this._date.day_of_month > 30) {
			this._do_monthly();
		}
		if (this._date.day >= 361) {
			this._do_yearly();
			this._date.day = 1;
			this._date.month = 1;
		}
		this.ui().check_storage();
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
	 * Method that gets called each 'year'.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._do_yearly = function () {
		this.get_settlement().release_mercenaries();
		this.ui().notify('At the end of the year, mercenaries from your city have been released.');
		this._refresh_influence();
		this._date.year++;
		this.ui().log('game', 'New year!');
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

	/* =================================== Achivements =================================== */

	/**
	 * Get achievement data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.get_achievement_config_data = function (handle) {
		if (typeof handle === 'string') {
			return civitas.ACHIEVEMENTS[civitas.ACHIEVEMENTS.findIndexByHandle(handle)];
		}
		return false;
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
		const settlement = this.get_settlement();
		for (let i = 0; i < civitas.ACHIEVEMENTS.length; i++) {
			achievement = civitas.ACHIEVEMENTS[i];
			id = achievement.handle;
			if (!this.has_achievement(id)) {
				for (let cond_item in achievement.conditions) {
					condition = achievement.conditions[cond_item];
					if (cond_item === 'settlement_level') {
						if (settlement.level() === condition) {
							this.do_achievement(id);
						}
					}
					if (cond_item === 'soldiers') {
						let army = settlement.num_soldiers();
						if (army >= condition) {
							this.do_achievement(id);
						}
					}
					if (cond_item === 'ships') {
						let navy = settlement.num_ships();
						if (navy >= condition) {
							this.do_achievement(id);
						}
					}
					if (cond_item === 'population') {
						if (settlement.population() >= condition) {
							this.do_achievement(id);
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
							this.do_achievement(id);
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
							this.do_achievement(id);
						}
					}
					if (cond_item === 'storage') {
						if (condition === 0) {
							let storage = settlement.storage();
							if (storage.occupied >= storage.all) {
								this.do_achievement(id);
							}
						}
					}
					if (cond_item === 'achievements') {
						if (condition === this._achievements.length) {
							this.do_achievement(id);
						}
					}
					if (cond_item === 'mercenary') {
						let merc = settlement.mercenary();
						if (merc.length >= condition) {
							this.do_achievement(id);
						}
					}
					if (cond_item === 'religion') {
						let religion = settlement.religion();
						if (religion.name === condition.capitalize()) {
							this.do_achievement(id);
						}
					}
				}
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
	this.do_achievement = function (handle) {
		if (!this.has_achievement(handle)) {
			const achievement = this.get_achievement_config_data(handle);
			if (achievement) {
				this._achievements.push({
					handle: handle,
					date: + new Date()
				});
				this._achievement_points += achievement.points;
				this.ui().notify(achievement.description, 'Achievement Completed', false, civitas.NOTIFY_ACHIEVEMENT);
				this.save_and_refresh();
			}
		}
		return this;
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

	/* =================================== Research =================================== */

	/**
	 * Get research data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.get_research_config_data = function (handle) {
		if (typeof handle === 'string') {
			return civitas.TECHNOLOGIES[civitas.TECHNOLOGIES.findIndexByHandle(handle)];
		}
		return false;
	};

	/**
	 * Perform a research and trigger a notification in the game.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {civitas.game}
	 */
	this.do_research = function (handle) {
		if (!this.has_research(handle)) {
			const research = this.get_research_config_data(handle);
			if (research !== false) {
				this._research.push({
					handle: handle
				});
				this.ui().notify(research.description, 'Research: ' + research.name, false, civitas.NOTIFY_RESEARCH);
				this.save_and_refresh();
			}
		}
		return this;
	};

	/**
	 * Check if the player is already researching a technology.
	 *
	 * @public
	 * @returns {Object|Boolean}
	 */
	this.has_research_in_queue = function() {
		for (let i = 0; i < this._queue.length; i++) {
			if (this._queue[i].mode === civitas.ACTION_RESEARCH) {
				return this._queue[i];
			}
		}
		return false;
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

	/* =================================== Queue =================================== */

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
				return this._queue[i];
			}
		}
		return false;
	};

	/**
	 * Advance the game queue.
	 *
	 * @private
	 * @returns {civitas.game}
	 */
	this._queue_advance = function() {
		for (let i = 0; i < this._queue.length; i++) {
			if (this._queue[i].passed === this._queue[i].duration - 1) {
				this.queue_process_action(i);
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
	this.queue_process_action = function(id) {
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
					this.queue_remove_action(id);
					return false;
				}
				if (action.type === civitas.CAMPAIGN_SPY && !settlement.can_diplomacy()) {
					this.queue_remove_action(id);
					return false;
				}
				if (action.type === civitas.CAMPAIGN_CARAVAN && !settlement.can_trade()) {
					this.queue_remove_action(id);
					return false;
				}
			}
			switch (action.type) {
				case civitas.CAMPAIGN_ARMY:
					this.ui().notify('The army sent from ' + settlement.name() + ' to ' + destination_settlement.name() + ' ' + action.duration + ' days ago reached its destination.');
					if (!this.ui().get_panel('battle')) {
						this.ui().open_window(civitas.WINDOW_BATTLE, {
							source: action,
							destination: destination_settlement
						});
					}
					break;
				case civitas.CAMPAIGN_ARMY_RETURN:
					this.ui().notify('The army sent from ' + destination_settlement.name() + ' to ' + settlement.name() + ' ' + (action.duration * 2) + ' days ago reached its home town.');
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
										this.ui().notify('The spy you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and managed to convince the settlement council to change the religion to ' + religion.name + '.');
									} else if (action.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(action.source.id);
										settlement.religion(action.data.religio);
										let religion = settlement.religion();
										this.ui().notify('The spy sent from ' + destination_settlement.name() + ' ' + action.duration + ' days ago to our city reached its destination and managed to convince your city council to change the religion to ' + religion.name + '.');
									}
									failed = false;
								}
								break;
							case civitas.SPY_MISSION_INFLUENCE:
								if (random <= Math.ceil(action.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									if (action.source.id === settlement.id()) {
										settlement.raise_influence(action.destination.id, amount);
										this.ui().notify('The spy you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and increased your influence over this settlement.');
									} else if (action.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(action.source.id);
										// TODO
										// destination_settlement.raise_influence(action.destination.id, amount);
										this.ui().notify('The spy sent from ' + destination_settlement.name() + ' ' + action.duration + ' days ago to our city reached its destination and lowered your influence over this settlement.');
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
										this.ui().notify('The spy you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and incited the population to revolt, therefore lowering the prestige of the city.');
									} else if (action.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(action.source.id);
										settlement.lower_prestige(amount);
										this.ui().notify('The spy sent from ' + destination_settlement.name() + ' ' + action.duration + ' days ago to our city reached its destination and incited our population to revolt, therefore lowering the prestige of our city.');
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
						this.ui().notify('The caravan sent from ' + settlement.name() + ' to ' + destination_settlement.name() + action.duration + ' days ago reached its destination.');
					}
					break;
			}
			/*
			if (failed === true) {
				if (action.destination.id === this.get_settlement().id()) {
					destination_settlement = this.get_settlement(action.source.id);
					this.ui().notify('The ' + class_name + ' sent by ' + destination_settlement.name() + ' ' + action.duration + ' days ago reached its destination.');
				} else {
					this.ui().notify('The ' + class_name + ' you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination.');
				}
			}
			*/
		} else if (action.mode === civitas.ACTION_DIPLOMACY) {
			if (settlement.is_player() && !settlement.can_diplomacy()) {
				this.queue_remove_action(id);
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
					this.ui().notify('The proposal you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' was accepted.');
				}
			}
		} else if (action.mode === civitas.ACTION_RESEARCH) {
			if (settlement.is_player() && !settlement.can_research()) {
				this.queue_remove_action(id);
				return false;
			}
			this.do_research(action.data.handle);
		}
		this.queue_remove_action(id);
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
	this.queue_add = function(source_settlement, destination_settlement, mode, type, data) {
		let duration;
		let d_loc;
		let s_loc = source_settlement.location();
		if (destination_settlement !== null) {
			d_loc = destination_settlement.location();
			duration = this.world().get_distance_in_days(s_loc, d_loc);
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
				this.ui().notify('An army was sent from ' +  source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			} else if (type === civitas.CAMPAIGN_ARMY_RETURN) {
				this.ui().notify('The army sent from ' + destination_settlement.name() + ' to ' + source_settlement.name() + ' ' + duration + ' days ago finished its campaign and will be returning home with the spoils of war.');
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
				this.ui().notify('A spy was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
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
				this.ui().notify('A caravan was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			}
		} else if (mode === civitas.ACTION_DIPLOMACY) {
			duration = Math.ceil(duration / 2);
			if (source_settlement.id() === this.get_settlement().id()) {
				this.ui().notify('A diplomacy proposal was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			}
		} else if (mode === civitas.ACTION_RESEARCH) {
			// Todo
			this.ui().notify('Your city`s Academy started researching ' + data.name + ' and will finish it in ' + duration + ' days.');
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
	this.queue_remove_action = function(id) {
		const panel = this.ui().get_panel('campaign');
		if (panel) {
			panel.destroy();
		}
		this._queue.splice(id, 1);
		return this;
	};

	/* =================================== Others =================================== */

	/**
	 * Process each of the settlements in the world.
	 * 
	 * @private
	 * @param {String} name
	 * @returns {civitas.settlement|Boolean}
	 */
	this._process_settlements = function() {
		const settlements = this.get_settlements();
		let buildings;
		for (let i = 0; i < settlements.length; i++) {
			if (typeof settlements[i] !== 'undefined') {
				if (!settlements[i].is_player()) {
					if (settlements[i].ai() !== null) {
						if (settlements[i].ai().process()) {
							// Todo
							this.ui().log('ai', 'Processed AI with id `' + i + '` for the ' + settlements[i].nice_name());
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
		const settlements = this.get_settlements();
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
	this._load_player_settlement = function (data) {
		const player_s_data = data.settlements[0];
		if (player_s_data) {
			player_s_data.core = this;
			const new_settlement = new civitas.objects.settlement(player_s_data);
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
		const army = {};
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
		const navy = {};
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
		const resources = {};
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
				resources.fame = civitas.MIN_FAME_VALUE;
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
		const keys = Object.keys(civitas.RESOURCES);
		const resource = keys[keys.length * Math.random() << 0];
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
		const resources = this.generate_random_resources(true, s_type);
		if (s_type === civitas.CITY) {
			level = civitas.utils.get_random(10, 30);
		} else if (s_type === civitas.METROPOLIS) {
			level = civitas.utils.get_random(30, civitas.MAX_SETTLEMENT_LEVEL);
		} else if (s_type === civitas.VILLAGE) {
			level = civitas.utils.get_random(1, 5);
		} else {
			level = 1;
		}
		const settlement = {
			icon: civitas.utils.get_random(1, civitas.MAX_SETTLEMENT_ICONS),
			type: s_type,
			player: false,
			name: civitas.utils.get_random_unique(civitas.SETTLEMENT_NAMES),
			religion: s_type === civitas.CAMP ? civitas.RELIGION_NONE : this.get_random_religion(),
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
	this._create_player_settlement = function (name, cityname, nation, climate, avatar) {
		const difficulty = this.difficulty();
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
		const difficulty = this.difficulty();
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
		const data = this.generate_random_settlement_data(s_type);
		this.add_settlement(data);
		return this;
	};

	/**
	 * Level up the user settlement.
	 *
	 * @public
	 * @return {civitas.game}
	 */
	this.level_up = function() {
		const settlement = this.get_settlement();
		settlement.level_up();
		this.ui().refresh().notify('Your settlement is now level ' + settlement.level() + '.');
	};

	/**
	 * Return a pointer to the game UI object.
	 *
	 * @public
	 * @returns {civitas.objects.ui}
	 */
	this.ui = function() {
		return this._ui;
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
		this.ui().refresh();
		$('#tab-blackmarket > .contents > table > tbody').empty();
		if (t_coins > 0) {
			this.ui().notify(this.get_settlement().name() + ' received <strong>' + t_coins + '</strong> ' + civitas.utils.get_resource_name('coins') + ' from the Black Market for selling goods.', 'Black Market');
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
		const ui = this.ui();
		let seconds = 1;
		this._setup_neighbours(data);
		$('header .cityname').html(this.get_settlement().name());
		$('header .cityavatar').css({
			'background-image': 'url(' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + this.get_settlement().ruler().avatar + '.png)'
		});
		ui.refresh();
		setInterval(function () {
			if (!self.is_paused() && seconds === civitas.SECONDS_TO_DAY) {
				self._do_daily();
				seconds = 1;
			} else if (!self.is_paused()) {
				seconds++;
			}
		}, 1000);
		$(document).keyup(function(event) {
			if (event.keyCode == 27 && !ui.window_exists('#window-options')) {
				ui.show_loader();
				ui.open_window(civitas.WINDOW_OPTIONS);
			}
		});
		ui.hide_loader();
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
		this.ui().show_loader();
		if (civitas.ENCRYPTION === true) {
			this.encryption.key = password;
		}
		this.properties.difficulty = parseInt(difficulty);
		this._world = new civitas.objects.world({
			core: this,
			roughness: civitas.INITIAL_SEED[difficulty - 1].roughness
		});
		this._create_player_settlement(name, s_name, nation, climate, avatar);
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
		const ui = this.ui();
		let data = null;
		let game_data;
		let hash;
		if (civitas.ENCRYPTION === true) {
			this.encryption.key = password;
		}
		game_data = this.get_storage_data();
		hash = CryptoJS.SHA512(JSON.stringify(game_data.data));
		if (typeof game_data.hash === 'undefined') {
			ui.open_window(civitas.WINDOW_ERROR, {
				error: 'Missing game signature.',
				code: '0x01'
			});
			return false;
		}
		if (hash.toString(CryptoJS.enc.Hex) !== game_data.hash) {
			ui.open_window(civitas.WINDOW_ERROR, {
				error: 'Invalid game signature.',
				code: '0x02'
			});
			return false;
		}
		if (game_data) {
			ui.show_loader();
			this._world = new civitas.objects.world({
				core: this
			});
			let temp_game_data = this.import(game_data.data);
			if (temp_game_data !== false) {
				data = this._load_player_settlement(temp_game_data);
				if (data !== false) {
					this._setup_game(data);
					return true;
				} else {
					ui.open_window(civitas.WINDOW_ERROR, {
					error: 'Unable to process game data.',
					code: '0x05'
				});
				return false;
				}
			} else {
				ui.open_window(civitas.WINDOW_ERROR, {
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
			this.ui().log('game', 'Game is paused.');
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
			this.ui().log('game', 'Game is resumed.');
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
	 * Get building data from the main configuration array.
	 * 
	 * @public
	 * @param {String|Number} handle
	 * @returns {Object|Boolean}
	 */
	this.get_building_config_data = function (handle) {
		if (typeof handle === 'string') {
			return civitas.BUILDINGS[civitas.BUILDINGS.findIndexByHandle(handle)];
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
		const random = Math.random().toFixed(5);
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
	 * Refresh the UI and save game.
	 *
	 * @public
	 * @returns {civitas.game}
	 */
	this.save_and_refresh = function() {
		this.check_achievements();
		this.save();
		this.ui().refresh();
		return this;
	};

	/**
	 * Refresh the world trades.
	 * 
	 * @public
	 * @returns {civitas.game}
	 */
	this.refresh_trades = function() {
		const settlements = this.get_settlements();
		for (let i = 0; i < settlements.length; i++) {
			if (typeof settlements[i] !== 'undefined') {
				if (settlements[i].is_urban() && !settlements[i].is_player()) {
					settlements[i].reset_trades();
				}
			}
		}
		this.ui().notify('World Market trades have been refreshed, settlements are looking to make new purchases and sales.', 'World Market');
		return this;
	};

	/**
	 * Refresh the influence of each of the cities in the world.
	 * 
	 * @private
	 * @returns {civitas.game}
	 */
	this._refresh_influence = function() {
		const settlements = this.get_settlements();
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
	 * Get hero data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.get_hero_config_data = function (handle) {
		if (typeof handle === 'string') {
			return civitas.HEROES[civitas.HEROES.findIndexByHandle(handle)];
		}
		return false;
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
	 * Method to calculate exponential fame required for the specified level.
	 *
	 * @public
	 * @param {Number} level
	 * @returns {Number}
	 */
	this.level_to_fame = function (level) {
		const base_fame = 100;
		let exp = 0.2;
		if (level <= 5) {
			exp = 1.2;
		} else if (level > 5 && level <= 10) {
			exp = 0.6;
		} else if (level > 10 && level <= 15) {
			exp = 0.5;
		} else if (level > 15 && level <= 20) {
			exp = 0.3;
		} else if (level > 20 && level <= 25) {
			exp = 0.3;
		} else if (level > 25 && level <= 30) {
			exp = 0.2;
		} else if (level > 30 && level <= 35) {
			exp = 0.24;
		} else if (level > 35 && level <= 40) {
			exp = 0.4;
		} else if (level > 40 && level <= 45) {
			exp = 0.5;
		} else if (level > 45 && level <= 50) {
			exp = 0.6;
		}
		if (level === 1) {
			return base_fame;
		} else {
			let prev = this.level_to_fame(level - 1);
			return Math.floor(prev + prev * exp);
		}
	};

	// Fire up the constructor
	return this.__init();
};
