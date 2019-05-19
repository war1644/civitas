/**
 * Process each of the settlements in the world.
 * 
 * @private
 * @param {String} name
 * @returns {civitas.settlement|Boolean}
 */
civitas.game.prototype._process_settlements = function() {
	var settlements = this.get_settlements();
	for (var i = 0; i < settlements.length; i++) {
		if (typeof settlements[i] !== 'undefined' && settlements[i].is_city()) {
			if (i > 1) {
				if (settlements[i].ai().process()) {
					//console.log('AI for ' + settlements[i].name() + ' processed!');
				}
			}
			// For now, process just the player settlement.
			// TODO
			if (i === 0) {
				var buildings = settlements[i].get_buildings();
				for (var x = 0; x < buildings.length; x++) {
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
 * @param {String} name
 * @returns {civitas.settlement|Boolean}
 */
civitas.game.prototype.get_settlement = function (name) {
	var settlements = this.get_settlements();
	if (typeof name === 'undefined') {
		return settlements[0];
	}
	if (typeof name === 'string') {
		for (var i = 0; i < settlements.length; i++) {
			if (settlements[i].name() === name) {
				return settlements[i];
			}
		}
	} else if (typeof name === 'number') {
		for (var i = 0; i < settlements.length; i++) {
			if (settlements[i].id() === name) {
				return settlements[i];
			}
		}
	}
	return false;
};

/**
 * Load the player settlement from localStorage data.
 * 
 * @private
 * @param {Object} data
 * @returns {Object|Boolean}
 */
civitas.game.prototype._load_settlement = function (data) {
	var player_settlement_data = data.settlements[0];
	var new_settlement;
	if (player_settlement_data) {
		player_settlement_data.core = this;
		new_settlement = new civitas.objects.settlement(player_settlement_data);
		this.settlements.push(new_settlement);
		new_settlement._create_buildings(player_settlement_data.buildings);
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
civitas.game.prototype.get_num_settlements = function () {
	return this.settlements.length;
};

/**
 * Get the list of all the settlements in game.
 * 
 * @public
 * @returns {Array}
 */
civitas.game.prototype.get_settlements = function () {
	return this.settlements;
};

/**
 * Create all the other settlements in the world.
 * 
 * @public
 * @param {Number} settlement_type
 * @returns {Object}
 */
civitas.game.prototype.get_point_outside_area = function(settlement_type) {
	var distance = settlement_type === civitas.CITY ? civitas.CITY_AREA : civitas.VILLAGE_AREA;
	var new_location = civitas.utils.get_random_world_location();
	var settlement_location;
	var settlements = this.get_settlements();
	for (var i = 0; i < settlements.length; i++) {
		if (typeof settlements[i] !== 'undefined') {
			settlement_location = settlements[i].get_location();
			if (civitas.utils.get_distance(settlement_location, new_location) < distance) {
				return this.get_point_outside_area(settlement_type);
			}
		}
	}
	return new_location;
};

/**
 * Generate random army soldiers.
 * 
 * @public
 * @param {Number} settlement_type
 * @returns {Object}
 */
civitas.game.prototype.generate_random_army = function(settlement_type) {
	var army = {};
	for (var item in civitas.SOLDIERS) {
		if (settlement_type === civitas.CITY) {
			army[item] = civitas.utils.get_random(0, 20);
		} else {
			army[item] = civitas.utils.get_random(0, 5);
		}
	}
	if (settlement_type === civitas.VILLAGE) {
		army.cannon = 0;
		army.heavycannon = 0;
		army.catapult = 0;
	}
	return army;
};

/**
 * Generate random navy ships.
 * 
 * @public
 * @param {Number} settlement_type
 * @returns {Object}
 */
civitas.game.prototype.generate_random_navy = function(settlement_type) {
	var navy = {};
	for (var item in civitas.SHIPS) {
		if (settlement_type === civitas.CITY) {
			navy[item] = civitas.utils.get_random(0, 10);
		} else {
			navy[item] = civitas.utils.get_random(0, 2);
		}
	}
	return navy;
};

/**
 * Generate random resources and trades.
 * 
 * @public
 * @param {Boolean} full
 * @param {Number} settlement_type
 * @returns {Object}
 */
civitas.game.prototype.generate_random_resources = function(full, settlement) {
	var resources = {};
	var num_resources;
	if (full === true) {
		if (settlement === civitas.CITY) {
			resources.coins = civitas.utils.get_random(10000, 1000000);
			resources.fame = civitas.utils.get_random(50000, 100000);
			resources.prestige = civitas.utils.get_random(1, civitas.MAX_PRESTIGE_VALUE);
			resources.espionage = civitas.utils.get_random(1, civitas.MAX_ESPIONAGE_VALUE);
			resources.research = civitas.utils.get_random(1, civitas.MAX_RESEARCH_VALUE);
			resources.faith = civitas.utils.get_random(1, civitas.MAX_FAITH_VALUE);
		} else {
			resources.coins = civitas.utils.get_random(100, 20000);
			resources.fame = civitas.utils.get_random(1, 50000);
			resources.prestige = civitas.utils.get_random(1, 100);
			resources.espionage = civitas.utils.get_random(1, 2);
			resources.research = civitas.utils.get_random(1, 2);
			resources.faith = civitas.utils.get_random(1, civitas.MAX_FAITH_VALUE);
		}
	}
	var trades = {
		imports: {},
		exports: {}
	};
	if (settlement === civitas.CITY) {
		num_resources = civitas.utils.get_random(5, 30);
	} else {
		num_resources = civitas.utils.get_random(2, 10);
	}
	var res_num = 0;
	for (var item in civitas.RESOURCES) {
		if ($.inArray(item, civitas.NON_RESOURCES) === -1) {
			res_num++;
			resources[item] = civitas.utils.get_random(10, 500);
			if (settlement === civitas.CITY) {
				if (resources[item] > 450) {
					trades.exports[item] = civitas.IMPORTANCE_VITAL;
				} else if (resources[item] > 300 && resources[item] <= 450) {
					trades.exports[item] = civitas.IMPORTANCE_HIGH;
				} else if (resources[item] > 150 && resources[item] <= 250) {
					trades.exports[item] = civitas.IMPORTANCE_MEDIUM;
				}
			}
		}
		if (res_num >= num_resources) {
			break;
		}
	}
	if (settlement === civitas.CITY) {
		num_resources = civitas.utils.get_random(5, 10);
		res_num = 0;
		for (var item in civitas.RESOURCES) {
			if ($.inArray(item, civitas.NON_RESOURCES) === -1) {
				res_num++;
				trades.imports[item] = civitas.utils.get_random(civitas.IMPORTANCE_LOW, civitas.IMPORTANCE_VITAL);
			}
			if (res_num >= num_resources) {
				break;
			}
		}
	}
	return {
		resources: resources,
		trades: trades
	};
};

/**
 * Generate random settlement data.
 * 
 * @public
 * @param {Number} settlement_type
 * @returns {Object}
 */
civitas.game.prototype.generate_random_settlement_data = function(settlement_type) {
	if (typeof settlement_type === 'undefined') {
		settlement_type = civitas.utils.get_random(0, 1);
	}
	var resources = this.generate_random_resources(true, settlement_type);
	var settlement = {
		icon: civitas.utils.get_random(2, 7),
		type: settlement_type,
		player: false,
		name: civitas.utils.get_random_unique(civitas.SETTLEMENT_NAMES),
		climate: civitas.utils.get_random(1, civitas.CLIMATES.length - 1),
		religion: civitas.utils.get_random(1, civitas.RELIGIONS.length - 1),
		nationality: civitas.utils.get_random(1, civitas.NATIONS.length - 1),
		level: settlement_type === civitas.CITY ?
			civitas.utils.get_random(1, civitas.MAX_SETTLEMENT_LEVEL) :
			civitas.utils.get_random(1, 5),
		resources: resources.resources,
		army: this.generate_random_army(),
		navy: this.generate_random_navy()
	}
	if (settlement_type === civitas.CITY) {
		settlement.trades = resources.trades;
	}
	return settlement;
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
civitas.game.prototype._create_settlement = function (name, cityname, nation, climate, avatar) {
	var difficulty = this.difficulty();
	this.add_settlement({
		name: cityname,
		climate: climate,
		avatar: avatar,
		nationality: nation,
		location: civitas['SETTLEMENT_LOCATION_' + civitas.CLIMATES[climate].toUpperCase()],
		army: civitas.START_ARMY[difficulty - 1].army,
		navy: civitas.START_ARMY[difficulty - 1].navy,
		core: this
	}, 0, {
		name: name,
		avatar: avatar
	});
	this.get_settlement()._create_buildings(civitas.START_BUILDINGS);
	return this;
};

/**
 * Add a settlement into the world.
 * 
 * @public
 * @param {Object} settlement_data
 * @param {Number} id
 * @param {Object} player_data
 * @returns {civitas.game}
 */
civitas.game.prototype.add_settlement = function(settlement_data, id, player_data) {
	var new_settlement;
	var ruler;
	var climate;
	var climate_buildings;
	var player = false;
	if (typeof id === 'undefined') {
		id = this.get_num_settlements() + 1;
	}
	if (typeof player_data !== 'undefined') {
		player = true;
	}
	if (player === false) {
		settlement_data.type = typeof settlement_data.type === 'undefined' ||
			settlement_data.type === civitas.CITY ? civitas.CITY : civitas.VILLAGE;
		if (settlement_data.type === civitas.VILLAGE) {
			ruler = {
				title: 'Mayor',
				avatar: 40,
				personality: civitas.PERSONALITY_DIPLOMAT,
				name: civitas.utils.get_random_unique(civitas.NAMES)
			};
		} else {
			ruler = civitas.utils.get_random_unique(civitas.RULERS);
		}
	} else {
		id = 0;
		ruler = {
			name: player_data.name,
			title: '',
			avatar: player_data.avatar,
			personality: civitas.PERSONALITY_BALANCED
		}
	}
	new_settlement = new civitas.objects.settlement({
		core: this,
		properties: {
			id: id,
			type: typeof settlement_data.type !== 'undefined' ? settlement_data.type : civitas.CITY,
			name: typeof settlement_data.name !== 'undefined' ? settlement_data.name : civitas.utils.get_random_unique(civitas.SETTLEMENT_NAMES),
			player: player,
			level: typeof settlement_data.level !== 'undefined' ? settlement_data.level : 1,
			religion: typeof settlement_data.religion !== 'undefined' ? settlement_data.religion : civitas.RELIGION_CHRISTIANITY,
			climate: typeof settlement_data.climate !== 'undefined' ?
				settlement_data.climate : civitas.CLIMATE_TEMPERATE,
			ruler: ruler,
			nationality: settlement_data.nationality,
			icon: settlement_data.type === civitas.CITY &&
				typeof settlement_data.icon !== 'undefined' ? settlement_data.icon : 1
		},
		resources: typeof settlement_data.resources !== 'undefined' ? settlement_data.resources : {},
		army: typeof settlement_data.army !== 'undefined' ? settlement_data.army : {},
		navy: typeof settlement_data.navy !== 'undefined' ? settlement_data.navy : {},
		trades: typeof settlement_data.trades !== 'undefined' ? settlement_data.trades : {},
		location: this.get_point_outside_area(settlement_data.type)
	});
	if (player === false) {
		if (settlement_data.type === civitas.CITY) {
			climate = new_settlement.climate();
			climate_buildings = 'SETTLEMENT_BUILDINGS_' + climate.name.toUpperCase();
			new_settlement._create_buildings(civitas[climate_buildings], true);
		}
		this.get_settlement().status(id, {
			influence: 50,
			status: civitas.DIPLOMACY_TRUCE
		});
	}
	this.settlements.push(new_settlement);
	return this;
};

/**
 * Remove a settlement from the world
 * 
 * @public
 * @param {Number} id
 * @returns {civitas.game}
 */
civitas.game.prototype.disband_city = function(id) {
	// TODO
	this.settlements.splice(id, 1);
	return this;
};

/**
 * Create all the other settlements in the world.
 * 
 * @private
 * @param {Object} data
 * @returns {civitas.game}
 */
civitas.game.prototype._setup_neighbours = function (data) {
	var new_settlement;
	var settlement_data;
	var climate;
	var climate_buildings;
	if (data !== null) {
		for (var i = 1; i < data.settlements.length; i++) {
			settlement_data = data.settlements[i];
			settlement_data.core = this;
			new_settlement = new civitas.objects.settlement(settlement_data);
			climate = new_settlement.climate();
			climate_buildings = 'SETTLEMENT_BUILDINGS_' + climate.name.toUpperCase();
			new_settlement._create_buildings(civitas[climate_buildings], true);
			this.settlements.push(new_settlement);
		}
	} else {
		for (var i = 0; i < civitas.MAX_INITIAL_SETTLEMENTS; i++) {
			this.add_random_settlement();
		}
	}
	return this;
};

/**
 * Add a random settlement into the world.
 * 
 * @public
 * @returns {civitas.game}
 */
civitas.game.prototype.add_random_settlement = function() {
	this.add_settlement(this.generate_random_settlement_data());
	return this;
};
