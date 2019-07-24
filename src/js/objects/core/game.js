/**
 * Main Game core object, responsible with the game events.
 * 
 * @license GPL-3.0-or-later
 * @class game
 * @returns {game}
 */
class game {

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {game}
	 */
	constructor () {
		let self = this;
		this._places = [];
		this.settlements = [];
		this._queue = [];
		this._achievements = [];
		this._research = [];
		this._achievement_points = 0;
		this._auctioneer = {};
		this._black_market = {};
		this._date = {
			day: 1,
			month: 1,
			year: 1,
			day_of_month: 1
		};
		this.settings = {
			worldmap_beautify: game.WORLD_BEAUTIFY,
			worldmap_grid: game.WORLD_GRID,
			music: false
		};
		this.encryption = {
			key: null,
			key_size: 256,
			iv_size: 128,
			iterations: 100,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		};
		this.properties = {
			difficulty: game.DIFFICULTY_EASY,
			mode: game.MODE_SINGLEPLAYER,
			paused: false
		};
		this._ui = new ui(this);
		this._ui.build_main();
		this._setup_audio();
		$(window).bind('resize', function() {
			self._ui.resize();
		});
		$('.ui').on('click', '.cityavatar', function () {
			self._ui.open_panel('council');
			return false;
		}).on('click', 'a[data-action=panel]', function () {
			let _panel = $(this).data('panel').toLowerCase();
			self._ui.open_panel(_panel);
			return false;
		}).on('click', 'a[data-action=window]', function () {
			let _window = $(this).data('window').toLowerCase();
			self._ui.open_window(_window);
			return false;
		});
		this._ui.resize();
		if (!this.has_storage_data()) {
			this._ui.open_window('signup');
		} else {
			if (game.ENCRYPTION === true) {
				this._ui.open_window('signin');
			} else {
				this.load_game_data();
			}
		}
		return this;
	}

	/* =================================== Storage =================================== */

	/**
	 * Reset (empty) game storage data.
	 * 
	 * @param {String} key
	 * @public
	 * @returns {game}
	 */
	reset_storage_data (key) {
		if (typeof key === 'undefined') {
			key = 'live';
		}
		localStorage.removeItem(game.STORAGE_KEY + '.' + key);
		return this;
	}

	/**
	 * Encrypt data using AES encryption.
	 *
	 * @public
	 * @param {String} data
	 * @returns {String}
	 */
	encrypt (data) {
		const salt = CryptoJS.lib.WordArray.random(128 / 8);
		const key = CryptoJS.PBKDF2(this.encryption.key, salt, {
			keySize: this.encryption.key_size / 32,
			iterations: this.encryption.iterations
		});
		const iv = CryptoJS.lib.WordArray.random(128 / 8);
		const encrypted = CryptoJS.AES.encrypt(data, key, { 
			iv,
			padding: this.encryption.padding,
			mode: this.encryption.mode
		});
		return salt.toString() + iv.toString() + encrypted.toString();
	}

	/**
	 * Decrypt data using AES encryption.
	 *
	 * @public
	 * @param {String} data
	 * @returns {String}
	 */
	decrypt (data) {
		const salt = CryptoJS.enc.Hex.parse(data.substr(0, 32));
		const iv = CryptoJS.enc.Hex.parse(data.substr(32, 32));
		const encrypted = data.substring(64);
		const key = CryptoJS.PBKDF2(this.encryption.key, salt, {
			keySize: this.encryption.key_size / 32,
			iterations: this.encryption.iterations
		});
		let decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
			iv, 
			padding: this.encryption.padding,
			mode: this.encryption.mode
		});
		try {
			decrypted = decrypted.toString(CryptoJS.enc.Utf8);
		} catch (err) {
			return false;
		}
		return decrypted;
	}

	/**
	 * Set game storage data.
	 * 
	 * @param {String} key
	 * @param {String|Number} value
	 * @param {Boolean} as_text
	 * @public
	 * @returns {game}
	 */
	set_storage_data (key, value, as_text) {
		let data;
		if (as_text === true) {
			data = JSON.stringify(value);
		} else {
			data = value;
		}
		if (game.ENCRYPTION === true) {
			localStorage.setItem(game.STORAGE_KEY + '.' + key, this.encrypt(data));
		} else {
			localStorage.setItem(game.STORAGE_KEY + '.' + key, data);
		}
		return this;
	}

	/**
	 * Retrieve game storage data.
	 * 
	 * @param {String} key
	 * @param {Boolean} as_text
	 * @public
	 * @returns {String|Number}
	 */
	get_storage_data (key, as_text) {
		let decrypted;
		if (typeof key === 'undefined') {
			key = 'live';
		}
		if (this.has_storage_data(key)) {
			if (game.ENCRYPTION === true) {
				decrypted = this.decrypt(localStorage.getItem(game.STORAGE_KEY + '.' + key));
			} else {
				decrypted = localStorage.getItem(game.STORAGE_KEY + '.' + key);	
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
	}

	/**
	 * Check if there is any stored data.
	 *
	 * @param {String} key
	 * @public
	 * @returns {Boolean}
	 */
	has_storage_data (key) {
		if (typeof key === 'undefined') {
			key = 'live';
		}
		if (localStorage.getItem(game.STORAGE_KEY + '.' + key) !== null) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Import game data.
	 *
	 * @public
	 * @param {Object} data
	 * @returns {Object}
	 */
	import (data) {
		if (data === false) {
			return false;
		}
		this.difficulty(data.difficulty);
		this.queue(data.queue);
		this.research(data.research);
		this.achievements(data.achievements);
		this.world().seeds = data.seeds;
		this.achievement_points(data.achievement_points);
		this.date(data.date);
		this.black_market(data.black_market);
		this.auctioneer(data.auctioneer);
		this.set_settings(data.settings);
		return data;
	}

	/**
	 * Export game data.
	 *
	 * @public
	 * @param {Boolean} to_local_storage
	 * @returns {Object}
	 */
	export (to_local_storage) {
		const settlements_list = [];
		const places_list = [];
		for (let i = 0; i < this.settlements.length; i++) {
			if (typeof this.settlements[i] !== 'undefined') {
				settlements_list.push(this.settlements[i].export());
			}
		}
		for (let i = 0; i < this._places.length; i++) {
			if (typeof this._places[i] !== 'undefined') {
				places_list.push(this._places[i].export());
			}
		}
		const data = {
			settlements: settlements_list,
			places: places_list,
			difficulty: this.difficulty(),
			seeds: this.world().seeds,
			achievements: this.achievements(),
			research: this.research(),
			achievement_points: this.achievement_points(),
			black_market: this.black_market(),
			auctioneer: this.auctioneer(),
			date: this.date(),
			queue: this.queue(),
			settings: this.get_settings(),
			info: {
				version: game.VERSION
			}
		};
		const hash = CryptoJS.SHA512(JSON.stringify(data));
		if (to_local_storage === true) {
			const new_data = {
				date: Number(new Date()),
				data,
				hash: hash.toString(CryptoJS.enc.Hex)
			}
			this.set_storage_data('live', new_data, true);
			return new_data;
		}
		return data;
	}

	/**
	 * Save the game data.
	 * 
	 * @public
	 * @returns {game}
	 */
	save () {
		this.export(true);
		return this;
	}
	
	/* =================================== Date / Time =================================== */

	/**
	 * Method that gets called each 'day'.
	 * 
	 * @private
	 * @returns {game}
	 */
	_do_daily () {
		this._date.day++;
		this.ui().log('world', this.format_date());
		this._process_settlements();
		this._check_for_events();
		this._queue_advance();
		this.auctioneer_process();
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
	}

	/**
	 * Method that gets called each 'month'.
	 * 
	 * @private
	 * @returns {game}
	 */
	_do_monthly () {
		this._date.day_of_month = 1;
		this._date.month++;
		if (this._date.month === 3 || this._date.month === 6 || this._date.month === 9 || this._date.month === 12) {
			this._do_quarterly();
		}
		if (this._date.month === 6 || this._date.month === 12) {
			this._do_biannually();
		}
		//this.auctioneer_process();
		this.black_market_reset();
		return this;
	}

	/**
	 * Method that gets called twice per year.
	 * 
	 * @private
	 * @returns {game}
	 */
	_do_biannually () {
		this.refresh_trades();
		return this;
	}

	/**
	 * Method that gets called four times every year.
	 * 
	 * @private
	 * @returns {game}
	 */
	_do_quarterly () {
		return this;
	}

	/**
	 * Method that gets called each 'year'.
	 * 
	 * @private
	 * @returns {game}
	 */
	_do_yearly () {
		this.get_settlement().release_mercenaries();
		this.ui().notify('At the end of the year, mercenaries from your city have been released.');
		this._refresh_influence();
		this._date.year++;
		this.ui().log('game', 'New year!');
		return this;
	}

	/**
	 * Return the game date in a more manageable form.
	 * 
	 * @public
	 * @returns {String}
	 */
	format_date () {
		return 'day ' + this._date.day_of_month + ', month ' + this._date.month + ', year ' + this._date.year;
	}

	/**
	 * Return if the current season is spring.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	is_spring () {
		if (this._date.month >= 3 && this._date.month < 6) {
			return true;
		}
		return false;
	}

	/**
	 * Return if the current season is summer.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	is_summer () {
		if (this._date.month >= 6 && this._date.month < 9) {
			return true;
		}
		return false;
	}

	/**
	 * Get/set the current game date.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	date (value) {
		if (typeof value !== 'undefined') {
			this._date = value;
		}
		return this._date;
	}

	/**
	 * Return if the current season is autumn.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	is_autumn () {
		if (this._date.month >= 9 && this._date.month < 12) {
			return true;
		}
		return false;
	}

	/**
	 * Return if the current season is winter.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	is_winter () {
		if (this._date.month >= 12 || this._date.month < 3) {
			return true;
		}
		return false;
	}

	/**
	 * Get the current season.
	 *
	 * @public
	 * @returns {Object}
	 */
	season () {
		let _season = {
			// Todo
		};
		if (this.is_spring()) {
			_season.id = game.SEASON_SPRING;
			_season.name = game.SEASONS[game.SEASON_SPRING].capitalize();
		} else if (this.is_summer()) {
			_season.id = game.SEASON_SUMMER;
			_season.name = game.SEASONS[game.SEASON_SUMMER].capitalize();
		} else if (this.is_autumn()) {
			_season.id = game.SEASON_AUTUMN;
			_season.name = game.SEASONS[game.SEASON_AUTUMN].capitalize();
		} else if (this.is_winter()) {
			_season.id = game.SEASON_WINTER;
			_season.name = game.SEASONS[game.SEASON_WINTER].capitalize();
		}
		return _season;
	}

	/* =================================== Auctioneer =================================== */

	/**
	 * Reset the Auctioneer goods.
	 * 
	 * @public
	 * @returns {game}
	 */
	auctioneer_reset () {
		this._auctioneer = {};
		this.ui().refresh();
		return this;
	}

	/**
	 * Remove the specified item from the Auctioneer data.
	 *
	 * @public
	 * @param {String} item
	 * @returns {game}
	 */
	auctioneer_delete (item) {
		let auctions = this.auctioneer();
		delete auctions[item];
		return this;
	}

	/**
	 * Assign the auctioneer to check for the requested goods.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	auctioneer_process () {
		let settlements = this.get_settlements();
		let player_settlement = this.get_settlement();
		let auctions = this.auctioneer();
		let trades;
		let amount;
		if (!player_settlement.can_trade()) {
			this._auctioneer = {};
			return false;
		}
		for (let item in auctions) {
			if (auctions[item].amount > 0) {
				for (let i = 0; i < settlements.length; i++) {
					if (!settlements[i].is_player()) {
						if (settlements[i].is_urban()) {
							trades = settlements[i].get_trades();
							if (trades === null) {
								break;
							}
							if (typeof trades.exports === 'undefined') {
								break;
							}
							for (let trade in trades.exports) {
								if (trades.exports[trade] > 0) {
									if (trade === item) {
										if (auctions[item].amount >= trades.exports[trade]) {
											amount = trades.exports[trade];
										} else if (auctions[item].amount < trades.exports[trade]) {
											amount = auctions[item].amount;
										} else {
											amount = 0;
										}
										/*
										if ((auctions[item].amount >= trades.exports[trade]) && (auctions[item].amount - trades.exports[trade] > 0)) {
											amount = trades.exports[trade];
										} else if (auctions[item].amount < trades.exports[trade]) {
											amount = auctions[item].amount;
										} else {
											amount = 0;
										}
										*/
										console.log(settlements[i].name() + ' is selling ' + trades.exports[item] + ' ' + item + ' and we need ' + amount);
										if (auctions[item].amount - amount >= 0) {
											player_settlement.buy_from_settlement(settlements[i], item, amount, true);
											auctions[item].amount = auctions[item].amount - amount;
											if (auctions[item].amount <= 0) {
												this.auctioneer_delete(item);
											}
										}
									}
								}
							}
						}
					}
				}
			} else {
				this.auctioneer_delete(item);
			}
		}
		return true;
	}

	/**
	 * Get/set the Auctioneer goods list.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	auctioneer (value) {
		if (typeof value !== 'undefined') {
			this._auctioneer = value;
		}
		return this._auctioneer;
	}

	/**
	 * Use the Auctioneer to search for and buy the specified goods.
	 * 
	 * @public
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {Object|Boolean}
	 */
	auctioneer_add (resource, amount) {
		let settlement = this.get_settlement();
		if (settlement.can_trade()) {
			let discount = Math.ceil(Math.ceil((game.RESOURCES[resource].price * game.TRADES_ADDITION) / 100) + Math.ceil((game.RESOURCES[resource].price * game.AUCTIONEER_DISCOUNT) / 100));
			const price = game.calc_price_plus_discount(amount, resource, discount);
			if (typeof this._auctioneer[resource] !== 'undefined') {
				const old = this._auctioneer[resource];
				this._auctioneer[resource] = {
					resource,
					amount: old.amount + amount,
					price: old.price + price
				};
			} else {
				this._auctioneer[resource] = {
					resource,
					amount,
					price
				};
			}
			this.ui().refresh();
			this.ui().notify(settlement.name() + ' placed an order for ' + amount + ' ' + game.get_resource_name(resource) + ' on the Auctioneer.', 'Auctioneer');
			return {
				buyer: settlement.name(),
				amount,
				goods: game.get_resource_name(resource),
				price,
				discount
			};
		}
		return false;
	}

	/* =================================== Black Market =================================== */

	/**
	 * Remove the specified item from the Black Market data.
	 *
	 * @public
	 * @param {String} item
	 * @returns {game}
	 */
	black_market_delete (item) {
		let goods = this.black_market();
		delete goods[item];
		return this;
	}

	/**
	 * List the specified goods onto the Black Market.
	 * 
	 * @public
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {Object|Boolean}
	 */
	black_market_add (resource, amount) {
		let settlement = this.get_settlement();
		if (!game.resource_exists(resource)) {
			return false;
		}
		if (!settlement.has_resource(resource, amount)) {
			this.ui().error(this.name() + ' doesn`t have enough resources of this type.');
			return false;
		}
		if (settlement.remove_resource(resource, amount)) {
			const discount = Math.ceil((game.RESOURCES[resource].price * game.BLACK_MARKET_DISCOUNT) / 100);
			const price = game.calc_price_minus_discount(amount, resource, discount);
			if (typeof this._black_market[resource] !== 'undefined') {
				const old = this._black_market[resource];
				this._black_market[resource] = {
					resource,
					amount: old.amount + amount,
					price: old.price + price
				};
			} else {
				this._black_market[resource] = {
					resource,
					amount,
					price
				};
			}
			this.ui().refresh();
			this.ui().notify(settlement.name() + ' placed ' + amount + ' ' + game.get_resource_name(resource) + ' on the Black Market and will receive ' + price + ' ' + game.get_resource_name('coins') + ' next month.', 'Black Market');
			return {
				seller: settlement.name(),
				amount,
				goods: game.get_resource_name(resource),
				price,
				discount
			};
		}
		return false;
	}

	/**
	 * Reset the Black Market goods.
	 * 
	 * @public
	 * @returns {Number}
	 */
	black_market_reset () {
		let t_coins = 0;
		for (let item in this._black_market) {
			this.get_settlement().inc_coins(this._black_market[item].price);
			t_coins += this._black_market[item].price;
		}
		this._black_market = {};
		this.ui().refresh();
		$('#tab-blackmarket > .contents > table > tbody').empty();
		if (t_coins > 0) {
			this.ui().notify(this.get_settlement().name() + ' received <strong>' + t_coins + '</strong> ' + game.get_resource_name('coins') + ' from the Black Market for selling goods.', 'Black Market');
		}
		return t_coins;
	}

	/**
	 * Return the Black Market goods list.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	black_market (value) {
		if (typeof value !== 'undefined') {
			this._black_market = value;
		}
		return this._black_market;
	}

	/* =================================== Achivements =================================== */

	/**
	 * Get achievement data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	get_achievement_config_data (handle) {
		if (typeof handle === 'string') {
			return game.ACHIEVEMENTS[game.ACHIEVEMENTS.findIndexByHandle(handle)];
		}
		return false;
	}

	/**
	 * Set/get the achievements.
	 *
	 * @public
	 * @returns {Array}
	 */
	achievements (value) {
		if (typeof value !== 'undefined') {
			this._achievements = value;
		}
		return this._achievements;
	}

	/**
	 * Set/get the achievement points.
	 *
	 * @public
	 * @returns {Number}
	 */
	achievement_points (value) {
		if (typeof value !== 'undefined') {
			this._achievement_points = value;
		}
		return this._achievement_points;
	}

	/**
	 * Check for any achievements completion.
	 *
	 * @public
	 * @returns {game}
	 */
	achievements_process () {
		let condition;
		let good = false;
		let achievement;
		let id;
		const settlement = this.get_settlement();
		if (settlement.is_player()) {
			for (let i = 0; i < game.ACHIEVEMENTS.length; i++) {
				achievement = game.ACHIEVEMENTS[i];
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
		}
		return this;
	}

	/**
	 * Trigger an achievement notification in the game.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {game}
	 */
	do_achievement (handle) {
		if (!this.has_achievement(handle)) {
			const achievement = this.get_achievement_config_data(handle);
			if (achievement) {
				this._achievements.push({
					handle,
					date: + new Date()
				});
				this._achievement_points += achievement.points;
				this.ui().notify(achievement.description, 'Achievement Completed', false, game.NOTIFY_ACHIEVEMENT);
				this.save_and_refresh();
			}
		}
		return this;
	}

	/**
	 * Check if the current player has the achievement specified by its handle.
	 *
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	has_achievement (handle) {
		for (let i = 0; i < this._achievements.length; i++) {
			if (typeof this._achievements[i] !== 'undefined') {
				if (this._achievements[i].handle === handle) {
					return this._achievements[i];
				}
			}
		}
		return false;
	}

	/* =================================== Research =================================== */

	/**
	 * Get research data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	get_research_config_data (handle) {
		if (typeof handle === 'string') {
			return game.TECHNOLOGIES[game.TECHNOLOGIES.findIndexByHandle(handle)];
		}
		return false;
	}

	/**
	 * Perform a research and trigger a notification in the game.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {game}
	 */
	do_research (handle) {
		if (!this.has_research(handle)) {
			const research = this.get_research_config_data(handle);
			if (research !== false) {
				this._research.push({
					handle
				});
				this.ui().notify(research.description, 'Research: ' + research.name, false, game.NOTIFY_RESEARCH);
				this.save_and_refresh();
			}
		}
		return this;
	}

	/**
	 * Check if the player is already researching a technology.
	 *
	 * @public
	 * @returns {Object|Boolean}
	 */
	has_research_in_queue () {
		for (let i = 0; i < this._queue.length; i++) {
			if (this._queue[i].mode === game.ACTION_RESEARCH) {
				return this._queue[i];
			}
		}
		return false;
	}

	/**
	 * Check if the current player has the research specified by its handle.
	 *
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	has_research (handle) {
		for (let i = 0; i < this._research.length; i++) {
			if (typeof this._research[i] !== 'undefined') {
				if (this._research[i].handle === handle) {
					return this._research[i];
				}
			}
		}
		return false;
	}

	/**
	 * Set/get the research.
	 *
	 * @public
	 * @returns {Array}
	 */
	research (value) {
		if (typeof value !== 'undefined') {
			this._research = value;
		}
		return this._research;
	}

	/* =================================== Queue =================================== */

	/**
	 * Set/get the game queue.
	 *
	 * @public
	 * @returns {Array}
	 */
	queue (value) {
		if (typeof value !== 'undefined') {
			this._queue = value;
		}
		return this._queue;
	}

	/**
	 * Check if something is in the action queue.
	 *
	 * @public
	 * @param {String} handle
	 * @returns {Boolean}
	 */
	in_queue (handle) {
		for (let i = 0; i < this._queue.length; i++) {
			if (this._queue[i].data.handle === handle) {
				return this._queue[i];
			}
		}
		return false;
	}

	/**
	 * Advance the game queue.
	 *
	 * @private
	 * @returns {game}
	 */
	_queue_advance () {
		for (let i = 0; i < this._queue.length; i++) {
			if (this._queue[i].passed === this._queue[i].duration - 1) {
				this.queue_process_action(i);
			} else {
				this._queue[i].passed++;
			}
		}
		return this;
	}

	/**
	 * Process an action from the game queue.
	 *
	 * @public
	 * @param {Number} id
	 * @returns {game}
	 */
	queue_process_action (id) {
		let action = this._queue[id];
		let failed = true;
		let destination_settlement;
		let settlement = this.get_settlement(action.source.id);
		if (action.type === game.CAMPAIGN_SCOUT) {
			destination_settlement = this.get_place(action.destination.id);
			if (!destination_settlement) {
				this.queue_remove_action(id);
				return false;
			}
		} else {
			if (typeof action.destination !== 'undefined') {
				destination_settlement = this.get_settlement(action.destination.id);
				if (!destination_settlement) {
					this.queue_remove_action(id);
					return false;
				}
			}
		}
		if (action.mode === game.ACTION_CAMPAIGN) {
			let random = Math.ceil(Math.random() * 100);
			let amount = Math.floor(action.data.espionage / 100);
			if (settlement.is_player()) {
				if (action.type === game.CAMPAIGN_ARMY && !settlement.can_recruit_soldiers()) {
					this.queue_remove_action(id);
					return false;
				}
				if (action.type === game.CAMPAIGN_SPY && !settlement.can_diplomacy()) {
					this.queue_remove_action(id);
					return false;
				}
				if (action.type === game.CAMPAIGN_SCOUT && !settlement.can_diplomacy()) {
					this.queue_remove_action(id);
					return false;
				}
				if (action.type === game.CAMPAIGN_CARAVAN && !settlement.can_trade()) {
					this.queue_remove_action(id);
					return false;
				}
			}
			switch (action.type) {
				case game.CAMPAIGN_ARMY:
					this.ui().notify('The army sent from ' + settlement.name() + ' to ' + destination_settlement.name() + ' ' + action.duration + ' days ago reached its destination.');
					if (!this.ui().get_panel('battle')) {
						this.ui().open_window('battle', {
							source: action,
							destination: destination_settlement
						});
					}
					break;
				case game.CAMPAIGN_ARMY_RETURN:
					this.ui().notify('The army sent from ' + destination_settlement.name() + ' to ' + settlement.name() + ' ' + (action.duration * 2) + ' days ago reached its home town.');
					destination_settlement.merge_army(action.data.army);
					destination_settlement.merge_navy(action.data.navy);
					destination_settlement.merge_resources(action.data.resources);
					break;
				case game.CAMPAIGN_SPY:
					if (typeof action.data.espionage !== 'undefined') {
						switch (action.data.mission) {
							case game.SPY_MISSION_RELIGION:
								if (random <= Math.ceil(action.data.espionage / game.MAX_ESPIONAGE_SUCESS_RATE)) {
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
							case game.SPY_MISSION_INFLUENCE:
								if (random <= Math.ceil(action.data.espionage / game.MAX_ESPIONAGE_SUCESS_RATE)) {
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
							case game.SPY_MISSION_STEAL_RESOURCES:
								if (random <= Math.ceil(action.data.espionage / game.MAX_ESPIONAGE_SUCESS_RATE)) {
									// TODO
									failed = false;
								}
								break;
							case game.SPY_MISSION_INSTIGATE:
								if (random <= Math.ceil(action.data.espionage / game.MAX_ESPIONAGE_SUCESS_RATE)) {
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
				case game.CAMPAIGN_SCOUT:
					this.ui().notify('The spy you sent ' + action.duration + ' days ago to a specific place in the world reached its destination and scouted the area. You can now claim the place.');
					destination_settlement.scout();
					break;
				case game.CAMPAIGN_CARAVAN:
					let total = 0;
					if (typeof action.data.resources !== 'undefined') {
						for (let item in action.data.resources) {
							if (!game.is_virtual_resource(item)) {
								total += game.calc_price(action.data.resources[item], item);
							} else if (item === 'coins') {
								total += action.data.resources[item];
							}
							destination_settlement.add_to_storage(item, action.data.resources[item]);
						}
						settlement.raise_influence(action.destination.id, game.CARAVAN_INFLUENCE);
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
		} else if (action.mode === game.ACTION_DIPLOMACY) {
			if (settlement.is_player() && !settlement.can_diplomacy()) {
				this.queue_remove_action(id);
				return false;
			}
			switch (action.type) {
				case game.DIPLOMACY_PROPOSE_PACT:
					settlement.diplomacy(destination_settlement, game.DIPLOMACY_PACT);
					//failed = false;
					break;
				case game.DIPLOMACY_PROPOSE_ALLIANCE:
					settlement.diplomacy(destination_settlement, game.DIPLOMACY_ALLIANCE);
					//failed = false;
					break;
				case game.DIPLOMACY_PROPOSE_CEASE_FIRE:
					settlement.diplomacy(destination_settlement, game.DIPLOMACY_CEASE_FIRE);
					//failed = false;
					break;
				case game.DIPLOMACY_PROPOSE_JOIN:
					settlement.diplomacy(destination_settlement, game.DIPLOMACY_VASSAL);
					//failed = false;
					break;
			}
			if (failed === true) {
				if (action.source.id === settlement.id()) {
					this.ui().notify('The proposal you sent ' + action.duration + ' days ago to ' + destination_settlement.name() + ' was accepted.');
				}
			}
		} else if (action.mode === game.ACTION_RESEARCH) {
			if (settlement.is_player() && !settlement.can_research()) {
				this.queue_remove_action(id);
				return false;
			}
			this.do_research(action.data.handle);
		}
		this.queue_remove_action(id);
		return this;
	}

	/**
	 * Add a campaign to the game queue.
	 *
	 * @public
	 * @param {settlement} source_settlement
	 * @param {settlement} destination_settlement
	 * @param {Number} mode
	 * @param {Number} type
	 * @param {Object} data
	 * @returns {Object}
	 */
	queue_add (source_settlement, destination_settlement, mode, type, data) {
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
		if (mode === game.ACTION_CAMPAIGN) {
			if (type === game.CAMPAIGN_ARMY) {
				if (source_settlement.id() === this.get_settlement().id()) {
					if (!source_settlement.can_recruit_soldiers()) {
						return false;
					}
					mission_costs = source_settlement.adjust_campaign_cost(game.ARMY_COSTS, duration);
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
					source_settlement.diplomacy(destination_settlement.id(), game.DIPLOMACY_WAR);
				}
				this.ui().notify('An army was sent from ' +  source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			} else if (type === game.CAMPAIGN_ARMY_RETURN) {
				this.ui().notify('The army sent from ' + destination_settlement.name() + ' to ' + source_settlement.name() + ' ' + duration + ' days ago finished its campaign and will be returning home with the spoils of war.');
			} else if (type === game.CAMPAIGN_SPY) {
				if (source_settlement.id() === this.get_settlement().id()) {
					if (!source_settlement.can_diplomacy()) {
						return false;
					}
					if (data.espionage > source_settlement.espionage()) {
						return false;
					}
					mission_costs = source_settlement.adjust_campaign_cost(game.SPY_COSTS, duration);
					if (!source_settlement.has_resources(mission_costs)) {
						return false;
					}
					if (!source_settlement.remove_resources(mission_costs)) {
						return false;
					}
					source_settlement.lower_espionage(data.espionage);
					if (data.mission === game.SPY_MISSION_RELIGION) {
						source_settlement.reset_faith();
					}
				}
				this.ui().notify('A spy was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			} else if (type === game.CAMPAIGN_SCOUT) {
				if (source_settlement.id() === this.get_settlement().id()) {
					if (!source_settlement.can_diplomacy()) {
						return false;
					}
					mission_costs = source_settlement.adjust_campaign_cost(game.SCOUT_COSTS, duration);
					if (!source_settlement.has_resources(mission_costs)) {
						return false;
					}
					if (!source_settlement.remove_resources(mission_costs)) {
						return false;
					}
				}
				this.ui().notify('A scout was dispatched from ' + source_settlement.name() + ' to a specific place in the world and will reach its destination in ' + duration + ' days.');
			} else if (type === game.CAMPAIGN_CARAVAN) {
				if (source_settlement.id() === this.get_settlement().id()) {
					if (!source_settlement.can_trade()) {
						return false;
					}
					mission_costs = source_settlement.adjust_campaign_cost(game.CARAVAN_COSTS, duration, data.resources);
					if (!source_settlement.has_resources(mission_costs)) {
						return false;
					}
					if (!source_settlement.remove_resources(mission_costs)) {
						return false;
					}
				}
				this.ui().notify('A caravan was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			}
		} else if (mode === game.ACTION_DIPLOMACY) {
			duration = Math.ceil(duration / 2);
			if (source_settlement.id() === this.get_settlement().id()) {
				this.ui().notify('A diplomacy proposal was dispatched from ' + source_settlement.name() + ' to ' + destination_settlement.name() + ' and will reach its destination in ' + duration + ' days.');
			}
		} else if (mode === game.ACTION_RESEARCH) {
			// Todo
			this.ui().notify('Your city`s Academy started researching ' + data.name + ' and will finish it in ' + duration + ' days.');
		}
		action = {
			mode,
			source: {
				x: s_loc.x,
				y: s_loc.y,
				id: source_settlement.id()
			},
			duration,
			passed: 0,
			type,
			data
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
	}

	/**
	 * Remove an action from the game queue.
	 *
	 * @public
	 * @param {Number} id
	 * @returns {game}
	 */
	queue_remove_action (id) {
		const panel = this.ui().get_panel('campaign');
		if (panel) {
			panel.destroy();
		}
		this._queue.splice(id, 1);
		return this;
	}

	/* =================================== Others =================================== */

	/**
	 * Process each of the settlements in the world.
	 * 
	 * @private
	 * @param {String} name
	 * @returns {settlement|Boolean}
	 */
	_process_settlements () {
		const settlements = this.get_settlements();
		let buildings;
		for (let i = 0; i < settlements.length; i++) {
			if (typeof settlements[i] !== 'undefined') {
				if (!settlements[i].is_player()) {
					if (settlements[i].ai !== null) {
						if (settlements[i].ai.process()) {
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
	}

	/**
	 * Get a pointer to a special place (har har).
	 * 
	 * @public
	 * @param {String|Number} name
	 * @returns {place|Boolean}
	 */
	get_place (id) {
		const _places = this.places();
		if (typeof id === 'number') {
			for (let i = 0; i < _places.length; i++) {
				if (typeof _places[i] !== 'undefined') {
					if (_places[i].id() === id) {
						return _places[i];
					}
				}
			}
		}
		return false;
	}

	/**
	 * Get a pointer to the player's settlement.
	 * 
	 * @public
	 * @param {String|Number} name
	 * @returns {settlement|Boolean}
	 */
	get_settlement (name) {
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
	}

	/**
	 * Load the player settlement from specified data.
	 * 
	 * @private
	 * @param {Object} data
	 * @returns {Object|Boolean}
	 */
	_load_player_settlement (data) {
		const player_s_data = data.settlements[0];
		if (player_s_data) {
			player_s_data.core = this;
			const new_settlement = new settlement(player_s_data);
			this.settlements.push(new_settlement);
			new_settlement.setup_initial_buildings(player_s_data.buildings);
			return data;
		}
		return false;
	}

	/**
	 * Get the number of all the settlements in game.
	 * 
	 * @public
	 * @returns {Number}
	 */
	get_num_settlements () {
		return this.settlements.length;
	}

	/**
	 * Get the list of all the settlements in game.
	 * 
	 * @public
	 * @returns {Array}
	 */
	get_settlements () {
		return this.settlements;
	}

	/**
	 * Generate random army soldiers.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {Object}
	 */
	generate_random_army (s_type) {
		const army = {};
		for (let item in game.SOLDIERS) {
			if (s_type === game.CITY) {
				if (item === 'cannon' || item === 'catapult') {
					army[item] = game.get_random(1, 2);
				} else {
					army[item] = game.get_random(5, 10);
				}
			} else if (s_type === game.METROPOLIS) {
				if (item === 'cannon' || item === 'catapult') {
					army[item] = game.get_random(3, 5);
				} else {
					army[item] = game.get_random(20, 30);
				}
			} else if (s_type === game.VILLAGE) {
				if (item === 'cannon' || item === 'catapult') {
					// Todo
				} else {
					army[item] = game.get_random(0, 2);
				}
			} else if (s_type === game.CAMP) {
				if (item === 'cannon' || item === 'catapult') {
					// Todo
				} else {
					army[item] = game.get_random(3, 5);
				}
			}
		}
		return army;
	}

	/**
	 * Generate random navy ships.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {Object}
	 */
	generate_random_navy (s_type) {
		const navy = {};
		for (let item in game.SHIPS) {
			if (s_type === game.CITY) {
				navy[item] = game.get_random(3, 5);
			} else if (s_type === game.METROPOLIS) {
				navy[item] = game.get_random(10, 20);
			} else if (s_type === game.VILLAGE) {
				navy[item] = game.get_random(0, 2);
			} else if (s_type === game.CAMP) {
				navy[item] = 0;
			}
		}
		return navy;
	}

	/**
	 * Generate random resources and trades.
	 * 
	 * @public
	 * @param {Boolean} full
	 * @param {Number} settlement
	 * @returns {Object}
	 */
	generate_random_resources (full, settlement) {
		const resources = {};
		let num_resources;
		let trades = {
			imports: {},
			exports: {}
		};
		let resource;
		if (full === true) {
			if (settlement === game.CITY) {
				resources.coins = game.get_random(10000, 1000000);
				resources.fame = game.get_random(50000, 100000);
				resources.prestige = game.get_random(game.MIN_PRESTIGE_VALUE, game.MAX_PRESTIGE_VALUE);
				resources.espionage = game.get_random(game.MIN_ESPIONAGE_VALUE, game.MAX_ESPIONAGE_VALUE);
				resources.research = game.get_random(game.MIN_RESEARCH_VALUE, game.MAX_RESEARCH_VALUE);
				resources.faith = game.get_random(game.MIN_FAITH_VALUE, game.MAX_FAITH_VALUE);
			} else if (settlement === game.METROPOLIS) {
				resources.coins = game.get_random(100000, 10000000);
				resources.fame = game.get_random(500000, 1000000);
				resources.prestige = game.get_random(5000, game.MAX_PRESTIGE_VALUE);
				resources.espionage = game.get_random(500, game.MAX_ESPIONAGE_VALUE);
				resources.research = game.get_random(500, game.MAX_RESEARCH_VALUE);
				resources.faith = game.get_random(500, game.MAX_FAITH_VALUE);
			} else if (settlement === game.VILLAGE) {
				resources.coins = game.get_random(10000, 30000);
				resources.fame = game.get_random(1, 50000);
				resources.prestige = game.get_random(game.MIN_PRESTIGE_VALUE, 100);
				resources.espionage = game.get_random(game.MIN_ESPIONAGE_VALUE, 2);
				resources.research = game.get_random(game.MIN_RESEARCH_VALUE, 2);
				resources.faith = game.get_random(game.MIN_FAITH_VALUE, game.MAX_FAITH_VALUE);
			} else if (settlement === game.CAMP) {
				resources.coins = game.get_random(1000, 10000);
				resources.fame = game.MIN_FAME_VALUE;
				resources.prestige = game.MIN_PRESTIGE_VALUE;
				resources.espionage = game.MIN_ESPIONAGE_VALUE;
				resources.research = game.MIN_RESEARCH_VALUE;
				resources.faith = game.MIN_FAITH_VALUE;
			}
		}
		if (settlement === game.CITY) {
			num_resources = game.get_random(5, 30);
		} else if (settlement === game.METROPOLIS) {
			num_resources = game.get_random(15, 80);
		} else if (settlement === game.VILLAGE) {
			num_resources = game.get_random(2, 10);
		} else if (settlement === game.CAMP) {
			num_resources = game.get_random(2, 5);
		}
		for (let i = 0; i < num_resources; i++) {
			resource = this.get_random_resource();
			resources[resource] = game.get_random(10, 500);
			if (settlement === game.CITY || settlement === game.METROPOLIS) {
				if (resources[resource] > 450) {
					trades.exports[resource] = game.IMPORTANCE_VITAL;
				} else if (resources[resource] > 300 && resources[resource] <= 450) {
					trades.exports[resource] = game.IMPORTANCE_HIGH;
				} else if (resources[resource] > 150 && resources[resource] <= 250) {
					trades.exports[resource] = game.IMPORTANCE_MEDIUM;
				}
			}
		}
		if (settlement === game.CITY || settlement === game.METROPOLIS) {
			for (let i = 0; i < num_resources; i++) {
				resource= this.get_random_resource();
				trades.imports[resource] = game.get_random(game.IMPORTANCE_LOW, game.IMPORTANCE_VITAL);
			}
		}
		return {
			resources,
			trades
		};
	}

	/**
	 * Get a random resource key.
	 *
	 * @public
	 * @returns {String}
	 */
	get_random_resource () {
		const keys = Object.keys(game.RESOURCES);
		const resource = keys[keys.length * Math.random() << 0];
		if (!game.is_virtual_resource(resource)) {
			return resource;
		} else {
			return this.get_random_resource();
		}
	}

	/**
	 * Generate random settlement data.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {Object}
	 */
	generate_random_settlement_data (s_type) {
		let level;
		if (typeof s_type === 'undefined') {
			s_type = game.get_random(0, game.SETTLEMENTS.length - 1);
		}
		const resources = this.generate_random_resources(true, s_type);
		if (s_type === game.CITY) {
			level = game.get_random(10, 30);
		} else if (s_type === game.METROPOLIS) {
			level = game.get_random(30, game.MAX_SETTLEMENT_LEVEL);
		} else if (s_type === game.VILLAGE) {
			level = game.get_random(1, 5);
		} else {
			level = 1;
		}
		const settlement = {
			icon: game.get_random(1, game.MAX_SETTLEMENT_ICONS),
			type: s_type,
			player: false,
			name: game.get_random_unique(game.SETTLEMENT_NAMES),
			religion: s_type === game.CAMP ? game.RELIGION_NONE : this.get_random_religion(),
			nationality: this.get_random_nationality(),
			level,
			resources: resources.resources,
			army: this.generate_random_army(s_type),
			navy: this.generate_random_navy(s_type)
		};
		if (s_type === game.CITY || s_type === game.METROPOLIS) {
			settlement.trades = resources.trades;
		}
		return settlement;
	}

	/**
	 * Generate a random nationality.
	 *
	 * @public
	 * @returns {Number}
	 */
	get_random_nationality () {
		return game.get_random(1, game.NATIONS.length - 1);
	}

	/**
	 * Generate a random religion.
	 *
	 * @public
	 * @returns {Number}
	 */
	get_random_religion () {
		return game.get_random(1, game.RELIGIONS.length - 1);
	}

	/**
	 * Generate a random personality.
	 *
	 * @public
	 * @returns {Number}
	 */
	get_random_personality () {
		return game.get_random(1, game.PERSONALITIES.length - 1);
	}

	/**
	 * Create the player settlement.
	 * 
	 * @private
	 * @param {String} name
	 * @param {String} cityname
	 * @param {Number} nation
	 * @param {Number} climate
	 * @param {Number} avatar
	 * @returns {game}
	 */
	_create_player_settlement (name, cityname, nation, climate, avatar) {
		const difficulty = this.difficulty();
		this.add_settlement({
			name: cityname,
			climate,
			avatar,
			religion: game.RELIGION_NONE,
			nationality: nation,
			army: game.INITIAL_SEED[difficulty - 1].military.army,
			navy: game.INITIAL_SEED[difficulty - 1].military.navy,
			resources: game.INITIAL_SEED[difficulty - 1].resources,
			core: this
		}, 0, {
			name,
			avatar
		}).setup_initial_buildings(game.INITIAL_SEED[difficulty - 1].buildings);
		return this;
	}

	/**
	 * Add a settlement into the world.
	 * 
	 * @public
	 * @param {Object} s_data
	 * @param {Number} id
	 * @param {Object} p_data
	 * @returns {settlement|Boolean}
	 */
	add_settlement (s_data, id, p_data) {
		if (this.get_num_settlements() <= game.MAX_SETTLEMENTS) {
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
				climate = game.CLIMATE_TEMPERATE;
			}
			if (player === false) {
				location = this.world().get_random_location(this.world().get_terrain_from_climate());
				ruler = {
					title: (s_data.type === game.CAMP) ? 'Warlord' : 'Mayor',
					avatar: game.get_random(1, game.AVATARS),
					personality: (s_data.type === game.CAMP) ? game.PERSONALITY_WARLORD : this.get_random_personality(),
					name: game.get_random_unique(game.NAMES)
				};
			} else {
				location = this.world().get_random_location(this.world().get_terrain_from_climate(climate));
				id = 0;
				ruler = {
					name: p_data.name,
					title: '',
					avatar: p_data.avatar,
					personality: game.PERSONALITY_BALANCED
				};
			}
			new_settlement = new settlement({
				core: this,
				properties: {
					id,
					type: typeof s_data.type !== 'undefined' ? s_data.type : game.CITY,
					name: typeof s_data.name !== 'undefined' ? s_data.name : game.get_random_unique(game.SETTLEMENT_NAMES),
					player,
					level: typeof s_data.level !== 'undefined' ? s_data.level : 1,
					climate,
					religion: typeof s_data.religion !== 'undefined' ? s_data.religion : game.RELIGION_CHRISTIANITY,
					ruler,
					nationality: s_data.nationality,
					icon: typeof s_data.icon !== 'undefined' ? s_data.icon : 1
				},
				resources: typeof s_data.resources !== 'undefined' ? s_data.resources : {},
				army: typeof s_data.army !== 'undefined' ? s_data.army : {},
				navy: typeof s_data.navy !== 'undefined' ? s_data.navy : {},
				trades: typeof s_data.trades !== 'undefined' ? s_data.trades : {},
				location
			});
			if (player === false) {
				this.get_settlement().status(id, {
					influence: (s_data.type === game.CAMP) ? game.MIN_INFLUENCE_VALUE : Math.floor(game.MAX_INFLUENCE_VALUE / 2),
					status: (s_data.type === game.CAMP) ? game.DIPLOMACY_WAR : game.DIPLOMACY_TRUCE
				});
			}
			this.settlements.push(new_settlement);
			return new_settlement;
		} else {
			return false;
		}
	}

	/**
	 * Remove a settlement from the world
	 * 
	 * @public
	 * @param {Number} id
	 * @returns {Boolean}
	 */
	disband_city (id) {
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
	}

	/**
	 * Create all the other settlements in the world.
	 * 
	 * @private
	 * @param {Object} data
	 * @returns {game}
	 */
	_setup_neighbours (data) {
		let new_settlement;
		let new_place;
		let s_data;
		const difficulty = this.difficulty();
		let num;
		let num_places;
		if (data !== null) {
			for (let i = 1; i < data.settlements.length; i++) {
				s_data = data.settlements[i];
				s_data.core = this;
				new_settlement = new settlement(s_data);
				this.settlements.push(new_settlement);
			}
			for (let i = 0; i < data.places.length; i++) {
				s_data = data.places[i];
				s_data.core = this;
				new_place = new place(s_data);
				this._places.push(new_place);
			}
		} else {
			for (let i = 0; i < game.SETTLEMENTS.length; i++) {
				num = game.INITIAL_SEED[difficulty - 1].settlements[i];
				for (let z = 0; z < num; z++) {
					this.add_random_settlement(i);
				}
			}
			num_places = game.INITIAL_SEED[difficulty - 1].places;
			for (let i = 0; i < num_places; i++) {
				this.add_random_place(i);
			}
		}
		return this;
	}

	/**
	 * Add a random settlement into the world.
	 * 
	 * @public
	 * @param {Number} s_type
	 * @returns {game}
	 */
	add_random_settlement (s_type) {
		const data = this.generate_random_settlement_data(s_type);
		this.add_settlement(data);
		return this;
	}

	/**
	 * Add a random place into the world.
	 *
	 * @public
	 * @param {Number} id
	 * @returns {place}
	 */
	add_random_place (id) {
		let location = this.world().get_random_location();
		let _place = new place({
			core: this,
			properties: {
				id,
				sid: null,
				name: null,
				scouted: false
			},
			resources: {
				current: {
					// Todo
				},
				required: this.generate_random_place_resources()
			},
			location
		});
		this._places.push(_place);
		return _place;
	}

	generate_random_place_resources () {
		let resources = {};
		let plusminus;
		for (let item in game.PLACE_RESOURCES_REQ) {
			if (game.is_virtual_resource(item)) {
				resources[item] = game.PLACE_RESOURCES_REQ[item];
			} else {
				plusminus = (game.PLACE_RESOURCES_REQ[item] * 10) / 100;
				resources[item] = game.get_random(game.PLACE_RESOURCES_REQ[item] - plusminus, game.PLACE_RESOURCES_REQ[item] + plusminus);
			}
		}
		return resources;
	}

	/**
	 * Level up the user settlement.
	 *
	 * @public
	 * @return {game}
	 */
	level_up () {
		const settlement = this.get_settlement();
		settlement.level_up();
		this.ui().refresh().notify('Your settlement is now level ' + settlement.level() + '.');
	}

	/**
	 * Return a pointer to the game UI object.
	 *
	 * @public
	 * @returns {ui}
	 */
	ui () {
		return this._ui;
	}

	/**
	 * Get a list of advice from the city council.
	 * 
	 * @public
	 * @returns {Array}
	 */
	advice () {
		const advices = [];
		const settlement = this.get_settlement();
		if (settlement.is_player()) {
			const resources = settlement.get_resources();
			const storage = settlement.storage();
			const army = settlement.num_soldiers();
			const navy = settlement.num_ships();
			const queue = this.queue();
			const buildings = settlement.get_buildings();
			const problem_buildings = [];
			if (army === 0) {
				advices.push('You have no army, this is an open invitation for attack.');
			}
			if (army < 10 && army > 0) {
				advices.push('You have a small army, try to recruit some more soldiers.');
			}
			if (navy === 0) {
				advices.push('You have no navy, this is an open invitation for attack.');
			}
			if (navy < 3 && navy > 0) {
				advices.push('You have a small navy, try to construct some more ships.');
			}
			if (storage.occupied >= storage.all) {
				advices.push('You have no storage space to store your new goods and they will be lost. Sell some goods or build a warehouse.');
			} else if ((storage.all - storage.occupied) < 100) {
				advices.push('You will soon run out of storage space and all goods produced will be lost. Sell some goods or build a warehouse.');
			}
			if (resources.coins < 1000) {
				advices.push('You seem to be losing coins fast, sell some goods or upgrade your houses to get better taxes.');
			}
			if (resources.wood < 100 || resources.stones < 100 || resources.woodplanks < 50) {
				advices.push('You are lacking construction materials, buy some stones, wood planks and/or wood off the World Trade Market.');
			}
			if (resources.prestige < 100) {
				advices.push('Your settlement`s prestige is too low, start doing trades with the other settlements to improve it.');
			}
			if (resources.faith < 100) {
				advices.push('Your settlement`s faith is too low, build a Church or upgrade it to be able to gather faith and choose/switch religions.');
			}
			if (resources.faith === game.MAX_FAITH_VALUE) {
				advices.push('You are at maximum faith, start using it from your settlement`s Church.');
			}
			if (resources.research < 100) {
				advices.push('Your settlement`s research is too low, build an Academy or upgrade it to be able to gather research and use it.');
			}
			if (resources.research === game.MAX_RESEARCH_VALUE) {
				advices.push('You are at maximum research, start using it for settlement researches, from your Academy.');
			}
			if (resources.espionage < 100) {
				advices.push('Your settlement`s espionage is too low, build an Embassy or upgrade it to be able to gather espionage.');
			}
			if (resources.espionage === game.MAX_ESPIONAGE_VALUE) {
				advices.push('You are at maximum espionage, start using it for espionage missiong from your Embassy.');
			}
			if (resources.coins > 100000) {
				advices.push('You have lots of coins, why not invest some in goods?');
			}
			for (let item in resources) {
				if (!game.is_virtual_resource(item)) {
					if (resources[item] > 1000) {
						advices.push('You seem to have a surplus of ' + game.get_resource_name(item) + '. You can sell some or place it on the Black Market and get coins instead.');
					}
				}
			}
			for (let i = 0; i < queue.length; i++) {
				if (queue[i].mode === game.ACTION_CAMPAIGN) {
					if (queue[i].destination.id === settlement.id()) {
						advices.push('There is an army from ' + this.get_settlement(queue[i].source.id).name() + ' marching towards your city!');
					}
					if (queue[i].source.id === settlement.id()) {
						advices.push('Your have an army marching towards ' + this.get_settlement(queue[i].destination.id).name() + '!');
					}
				}
			}
			for (let i = 0; i < buildings.length; i++) {
				if (typeof buildings[i] !== 'undefined') {
					if (buildings[i].has_problems()) {
						problem_buildings.push(buildings[i].name);
					}
				}
			}
			if (problem_buildings.length > 0) {
				advices.push((problem_buildings.length === 1 ? 'One' : 'Several') + ' of your buildings (' + problem_buildings.join(', ') + ') ' + (problem_buildings.length === 1 ? 'is' : 'are') + ' not working due to a shortage of materials. Buy more goods.');
			}
		}
		return advices;
	}
	
	/**
	 * Set game settings.
	 * 
	 * @param {String} key
	 * @param {String|Number} value
	 * @public
	 * @returns {game}
	 */
	set_settings (key, value) {
		if (typeof value === 'undefined') {
			this.settings = key;
		} else {
			this.settings[key] = value;
		}
		return this;
	}

	/**
	 * Retrieve game settings.
	 * 
	 * @param {String} key
	 * @public
	 * @returns {Object}
	 */
	get_settings (key) {
		if (typeof key === 'undefined') {
			return this.settings;
		} else {
			return this.settings[key];
		}
	}

	/**
	 * Internal method for starting up a game.
	 *
	 * @private
	 * @param {Object} data
	 * @returns {game}
	 */
	_setup_game (data) {
		let self = this;
		const ui = this.ui();
		let seconds = 1;
		this._setup_neighbours(data);
		$('header .cityname').html(this.get_settlement().name());
		$('header .cityavatar').css({
			'background-image': 'url(' + game.ASSETS_URL + 'images/assets/avatars/avatar' + this.get_settlement().ruler().avatar + '.png)'
		});
		ui.refresh();
		setInterval(function () {
			if (!self.is_paused() && seconds === game.SECONDS_TO_DAY) {
				self._do_daily();
				seconds = 1;
			} else if (!self.is_paused()) {
				seconds++;
			}
		}, 1000);
		$(document).keyup(function(event) {
			if (event.keyCode === 27 && !ui.window_exists('#window-options')) {
				ui.show_loader();
				ui.open_window('options');
			}
		});
		ui.hide_loader();
		this.save_and_refresh();
		this.ui().citymap_scrollto_building(this.get_settlement().get_building('marketplace'));
		return this;
	}

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
	new_game (name, s_name, nation, climate, avatar, difficulty, password) {
		this.ui().show_loader();
		if (game.ENCRYPTION === true) {
			this.encryption.key = password;
		}
		this.properties.difficulty = parseInt(difficulty, 10);
		this._world = new world({
			core: this
		});
		this._create_player_settlement(name, s_name, nation, climate, avatar);
		this._setup_game(null);
		return true;
	}

	/**
	 * Load a game by decrypting it with the specified password.
	 *
	 * @public
	 * @param {String} password
	 * @returns {Boolean}
	 */
	load_game_data (password) {
		const ui = this.ui();
		let data = null;
		let game_data;
		let hash;
		if (game.ENCRYPTION === true) {
			this.encryption.key = password;
		}
		game_data = this.get_storage_data();
		hash = CryptoJS.SHA512(JSON.stringify(game_data.data));
		if (typeof game_data.hash === 'undefined') {
			ui.open_window('error', {
				error: 'Missing game signature.',
				code: '0x01'
			});
			return false;
		}
		if (hash.toString(CryptoJS.enc.Hex) !== game_data.hash) {
			ui.open_window('error', {
				error: 'Invalid game signature.',
				code: '0x02'
			});
			return false;
		}
		if (game_data) {
			ui.show_loader();
			this._world = new world({
				core: this,
				elevation: game_data.data.seeds.elevation,
				moisture: game_data.data.seeds.moisture
			});
			let temp_game_data = this.import(game_data.data);
			if (temp_game_data !== false) {
				data = this._load_player_settlement(temp_game_data);
				if (data !== false) {
					this._setup_game(data);
					return true;
				} else {
					ui.open_window('error', {
						error: 'Unable to process game data.',
						code: '0x05'
					});
					return false;
				}
			} else {
				ui.open_window('error', {
					error: 'Invalid game data.',
					code: '0x03'
				});
				return false;
			}
		} else {
			return false;
		}
	}

	/**
	 * Pause the game.
	 *
	 * @public
	 * @returns {game}
	 */
	pause () {
		if (this.is_paused() === false) {
			this.properties.paused = true;
			this.ui().log('game', 'Game is paused.');
		}
		return this;
	}

	/**
	 * Resume the game.
	 *
	 * @public
	 * @returns {game}
	 */
	unpause () {
		if (this.is_paused() === true) {
			this.properties.paused = false;
			this.ui().log('game', 'Game is resumed.');
		}
		return this;
	}

	/**
	 * Check if the game is paused.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	is_paused () {
		return this.properties.paused;
	}

	/**
	 * Setup the audio part of the game.
	 * 
	 * @private
	 * @returns {game}
	 */
	_setup_audio () {
		this.music = $('#music').get(0);
		this.music.volume = 0.2;
		if (game.AUTOSTART_MUSIC === true) {
			this.music.play();
		}
		return this;
	}

	/**
	 * Get building data from the main configuration array.
	 * 
	 * @public
	 * @param {String|Number} handle
	 * @returns {Object|Boolean}
	 */
	get_building_config_data (handle) {
		if (typeof handle === 'string') {
			return game.BUILDINGS[game.BUILDINGS.findIndexByHandle(handle)];
		} else if (typeof handle === 'number') {
			return game.BUILDINGS[handle];
		}
		return false;
	}

	/**
	 * Check if any events occured on this day.
	 *
	 * @private
	 * @returns {game}
	 */
	_check_for_events () {
		const random = Math.random().toFixed(5);
		let __event;
		let _event;
		for (let i = 0; i < game.EVENTS.length; i++) {
			_event = game.EVENTS[i];
			if (random <= _event.chance) {
				__event = _event;
				__event.core = this;
				new event(__event);
				return this;
			}
		}
		return this;
	}

	/**
	 * Refresh the UI and save game.
	 *
	 * @public
	 * @returns {game}
	 */
	save_and_refresh () {
		this.achievements_process();
		this.save();
		this.ui().refresh();
		return this;
	}

	places () {
		return this._places;
	}

	/**
	 * Refresh the world trades.
	 * 
	 * @public
	 * @returns {game}
	 */
	refresh_trades () {
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
	}

	/**
	 * Refresh the influence of each of the cities in the world.
	 * 
	 * @private
	 * @returns {game}
	 */
	_refresh_influence () {
		const settlements = this.get_settlements();
		for (let i = 1; i < settlements.length; i++) {
			if (typeof settlements[i] !== 'undefined') {
				if (settlements[i].is_urban()) {
					if (this.get_settlement().religion().id === settlements[i].religion().id) {
						this.get_settlement().raise_influence(settlements[i].id(), game.YEARLY_INFLUENCE_GAIN);
					} else if ((this.get_settlement().get_diplomacy_status(settlements[i].id()) === game.DIPLOMACY_VASSAL) || (this.get_settlement().get_diplomacy_status(settlements[i].id()) === game.DIPLOMACY_ALLIANCE)) {
						this.get_settlement().raise_influence(settlements[i].id());
					} else {
						this.get_settlement().lower_influence(settlements[i].id(), game.YEARLY_INFLUENCE_LOSS);
					}
				} else {
					if (this.get_settlement().religion().id === settlements[i].religion().id) {
						this.get_settlement().raise_influence(settlements[i].id(), game.YEARLY_INFLUENCE_GAIN);
					} else if ((this.get_settlement().get_diplomacy_status(settlements[i].id()) === game.DIPLOMACY_VASSAL) || (this.get_settlement().get_diplomacy_status(settlements[i].id()) === game.DIPLOMACY_ALLIANCE)) {
						this.get_settlement().raise_influence(settlements[i].id());
					}
				}
			}
		}
		return this;
	}

	/**
	 * Return the amount of taxes produced by a building if the required technology is
	 * researched.
	 *
	 * @public
	 * @param {Object} building
	 * @returns {Number}
	 */
	get_tax_modifier (building) {
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
	}

	/**
	 * Return the amount of resources produced by a building if the required technology is
	 * researched.
	 *
	 * @public
	 * @param {Object} building
	 * @returns {Number}
	 */
	get_prod_modifier (building) {
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
	}

	/**
	 * Get the version of the game.
	 * 
	 * @public
	 * @returns {String}
	 */
	version () {
		return game.VERSION;
	}
	
	/**
	 * Get/set the difficulty level of the game.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	difficulty (value) {
		if (typeof value !== 'undefined') {
			this.properties.difficulty = value;
		}
		return this.properties.difficulty;
	}

	/**
	 * Get/set the game mode.
	 *
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	mode (value) {
		if (typeof value !== 'undefined') {
			this.properties.mode = value;
		}
		return this.properties.mode;
	}

	/**
	 * Get hero data from the main configuration array.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	get_hero_config_data (handle) {
		if (typeof handle === 'string') {
			return game.HEROES[game.HEROES.findIndexByHandle(handle)];
		}
		return false;
	}

	/**
	 * Get the world object.
	 *
	 * @public
	 * @returns {world}
	 */
	world () {
		return this._world;
	}

	/**
	 * Method to calculate exponential fame required for the specified level.
	 *
	 * @public
	 * @param {Number} level
	 * @returns {Number}
	 */
	level_to_fame (level) {
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
	}

	/**
	 * Get a list of all buildings available for a settlement if the settlement level and
	 * climate are appropriate.
	 *
	 * @public
	 * @param {settlement} settlement
	 * @returns {Array}
	 */
	get_buildings_for_settlement (settlement) {
		let buildings = [];
		let building;
		for (let i = 0; i < game.BUILDINGS.length; i++) {
			building = game.BUILDINGS[i];
			if ((typeof building.requires.settlement_level !== 'undefined') && (settlement.level() < building.requires.settlement_level)) {
				break;
			}
			if ((typeof building.requires.climate !== 'undefined') && ($.inArray(settlement.climate().id, building.requires.climate) === -1)) {
				break;
			}
			buildings.push(building.handle);
		}
		return buildings;
	}

	static is_virtual_resource (resource) {
		if (typeof game.RESOURCES[resource] !== 'undefined') {
			if (game.RESOURCES[resource].category === 'virtual') {
				return true;
			}
		}
		return false;
	}

	/**
	 * Get the total damage points of a hero, modified by the items
	 * he's using.
	 *
	 * @param {Object} hero
	 * @returns {Object}
	 */
	static get_damage_points (hero) {
		let damage_val = (hero.stats.strength * 2) + hero.stats.agility;
		let damage_min = 0;
		let damage_max = 0;
		for (let i = 0; i < hero.items.length; i++) {
			if (hero.items[i]) {
				if (hero.items[i].stats.strength) {
					damage_val += hero.items[i].stats.strength * 2;
				}
				if (hero.items[i].stats.agility) {
					damage_val += hero.items[i].stats.agility;
				}
			}
		}
		for (let i = 0; i < hero.items.length; i++) {
			if (hero.items[i].type === game.ITEM_TYPE_WEAPON) {
				damage_min += hero.items[i].stats.damageMin + damage_val;
				damage_max += hero.items[i].stats.damageMax + damage_val;
			}
		}
		return {
			value: damage_val,
			min: damage_min !== 0 ? damage_min : 1,
			max: damage_max !== 0 ? damage_max : damage_val
		};
	}

	/**
	 * Get the total mana points of a hero, modified by the items
	 * he's using.
	 *
	 * @param {Object} hero
	 * @returns {Number}
	 */
	static get_mana_points (hero) {
		let mana = hero.stats.intellect * 50 + hero.stats.spirit * 10;
		for (let i = 0; i < hero.items.length; i++) {
			if (hero.items[i]) {
				if (hero.items[i].stats.intellect) {
					mana += hero.items[i].stats.intellect * 50;
				}
				if (hero.items[i].stats.spirit) {
					mana += hero.items[i].stats.spirit * 10;
				}
			}
		}
		return mana;
	}

	/**
	 * Get the total health points of a hero, modified by the items
	 * he's using.
	 *
	 * @param {Object} hero
	 * @returns {Number}
	 */
	static get_health_points (hero) {
		let health = hero.stats.stamina * 30 + hero.stats.strength * 5;
		for (let i = 0; i < hero.items.length; i++) {
			if (hero.items[i]) {
				if (hero.items[i].stats.stamina) {
					health += hero.items[i].stats.stamina * 30;
				}
				if (hero.items[i].stats.strength) {
					health += hero.items[i].stats.strength * 5;
				}
			}
		}
		return health;
	}

	/**
	 * Check if resource exists.
	 *
	 * @param {String} resource
	 * @returns {Boolean}
	 */
	static resource_exists (resource) {
		for (let item in game.RESOURCES) {
			if (item === resource) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Format a timestamp to a more human form (x ago).
	 *
	 * @param {Number} time
	 * @returns {Number}
	 */
	static time_since (time) {
		let time_formats = [
			[
				2, 
				"One second", 
				"1 second from now"
			], [
				60, 
				"seconds", 
				1
			], [
				120, 
				"One minute", 
				"1 minute from now"
			], [
				3600, 
				"minutes", 
				60
			], [
				7200, 
				"One hour", 
				"1 hour from now"
			], [
				86400, 
				"hours", 
				3600
			], [
				172800, 
				"One day", 
				"tomorrow"
			], [
				604800, 
				"days", 
				86400
			], [
				1209600, 
				"One week", 
				"next week"
			], [
				2419200, 
				"weeks", 
				604800
			], [
				4838400, 
				"One month", 
				"next month"
			], [
				29030400, 
				"months", 
				2419200
			], [
				58060800, 
				"One year", 
				"next year"
			], [
				2903040000, 
				"years", 
				29030400
			], [
				5806080000, 
				"One century", 
				"next century"
			], [
				58060800000, 
				"centuries", 
				2903040000
			]
		];
		let seconds = (new Date - time) / 1000;
		let list_choice = 1;
		if (seconds < 0) {
			seconds = Math.abs(seconds);
			list_choice = 1;
		}
		let i = 0, format;
		while (format = time_formats[i++]) {
			if (seconds < format[0]) {
				if (typeof format[2] === "string") {
					return format[list_choice];
				} else {
					return Math.floor(seconds / format[2]) + " " + format[1];
				}
			}
		}
		return time;
	}

	/**
	 * Round the number to nearest 10.
	 *
	 * @param {Number} value
	 * @returns {Number}
	 */
	static get_up_number (value) {
		return Math.floor(value / 10) * 10;
	}

	/**
	 * Return a random number between min and max.
	 *
	 * @param {Number} min
	 * @param {Number} max
	 * @returns {Number}
	 */
	static get_random (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Return a random number based on importance.
	 *
	 * @param {Number} importance
	 * @returns {Number}
	 */
	static get_random_by_importance (importance) {
		return game.get_up_number(
			game.get_random(
				Math.floor(Math.random() * importance) * 10 + 10,
				Math.floor(Math.random() * importance) * 10 + 20
			)
		);
	}

	/**
	 * Return the resource name by handle.
	 *
	 * @param {String} handle
	 * @returns {String}
	 */
	static get_resource_name (handle) {
		return game.RESOURCES[handle].name;
	}

	/**
	 * Calculate the resource price for the specified amount minus the discount.
	 * 
	 * @param {Number} amount
	 * @param {String} resource
	 * @param {Number} discount
	 * @returns {Number}
	 */
	static calc_price_minus_discount (amount, resource, discount) {
		return Math.ceil(Math.ceil(game.RESOURCES[resource].price - discount) * amount);
	}

	/**
	 * Calculate the resource price for the specified amount.
	 * 
	 * @param {Number} amount
	 * @param {String} resource
	 * @returns {Number}
	 */
	static calc_price (amount, resource) {
		return Math.ceil(amount * (game.RESOURCES[resource].price));
	}

	/**
	 * Calculate the resource price for the specified amount plus the discount.
	 * 
	 * @param {Number} amount
	 * @param {String} resource
	 * @param {Number} discount
	 * @returns {Number}
	 */
	static calc_price_plus_discount (amount, resource, discount) {
		return Math.ceil(Math.ceil(game.RESOURCES[resource].price + discount) * amount);
	}

	/**
	 * Format the current time.
	 * 
	 * @returns {String}
	 */
	static get_now () {
		let today = new Date();
		let hh = today.getHours();
		let mm = today.getMinutes();
		let ss = today.getSeconds();
		return hh + ':' + mm + ':' + ss;
	}

	/**
	 * Format a number so that it's more user-friendly.
	 *
	 * @returns {String}
	 */
	static nice_numbers (num) {
		if (num >= 1000000000) {
			return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
		}
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		}
		return num;
	}

	/**
	 * Return a random unique array element.
	 *
	 * @param {Array} from
	 * @returns {String|Number}
	 */
	static get_random_unique (from) {
		let id = game.get_random(0, from.length - 1);
		let element = from[id];
		from.splice(id, 1);
		return element;
	}

	static sanitize_string (string) {
		return string.replace(/[^a-z0-9+]-/gi, '-');
	}
}
