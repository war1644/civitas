/*!
 * Civitas empire-building game.
 *
 * @author sizeof(cat) <sizeofcat AT riseup.net>
 * @version 0.3.0.6252019
 * @license GPLv3
 */ 'use strict';

/**
 * Find index by handle into an array.
 *
 * @function findIndexM
 * @param {String} value
 * @returns {Object|Boolean}
 */
Array.prototype.findIndexM = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].handle === value) {
            return i;
        }
    }
    return false;
};

/**
 * Capitalize first letter of a string.
 *
 * @function capitalize
 * @returns {String}
 */
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * This is the main object of the Civitas game. Everything gets injected into
 * the `civitas` namespace.
 *
 * @mixin civitas
 * @license GPLv3
 * @author sizeof(cat) <sizeofcat@riseup.net>
 * @version 0.3.0
 */
let civitas = {
	objects: {
		// Todo
	},
	controls: {
		// Todo
	},
	modules: {
		// Todo
	}
};

/**
 * Autostart music or not.
 * 
 * @constant
 * @default
 * @type {Boolean}
 */
civitas.AUTOSTART_MUSIC = false;

/**
 * Enable encryption or not.
 * 
 * @constant
 * @default
 * @type {Boolean}
 */
civitas.ENCRYPTION = false;

/**
 * URL to the game assets
 * 
 * @constant
 * @default
 * @type {String}
 */
civitas.ASSETS_URL = './';

/**
 * Amount of influence your settlement loses each year.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.YEARLY_INFLUENCE_LOSS = 2;

/**
 * Amount of influence your settlement gains each year.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.YEARLY_INFLUENCE_GAIN = 2;

/**
 * How many real seconds has a game day.
 *
 * constant
 * @default
 * @type {Number}
 */
civitas.SECONDS_TO_DAY = 10;

/**
 * Number of city ruler avatars available to choose.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.AVATARS = 99;

civitas.TRADES_ADDITION = 10;

civitas.TRADES_DISCOUNT = 20;

/**
 * Max level a settlement can have.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_SETTLEMENT_LEVEL = 45;

/**
 * Getting total city population is city_level * civitas.POPULATION_PER_LEVEL.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.POPULATION_PER_LEVEL = 2300;

/**
 * The black market discount.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.BLACK_MARKET_DISCOUNT = 80;

/**
 * Fame required for each city level.
 * 
 * @constant
 * @default
 * @type {Array}
 */
civitas.LEVELS = [
	0, 100, 500, 1000, 3000,
	6500, 12000, 20000, 30000, 45000,
	60000, 85000, 100000, 140000, 180000,
	220000, 290000, 350000, 400000, 500000,
	610000, 730000, 800000, 930000, 1100000,
	1300000, 1500000, 1800000, 2500000, 3000000, 
	4000000, 5500000, 6500000, 8000000, 9000000, 
	10000000, 12000000, 16000000, 20000000, 50000000,
	60000000, 70000000, 80000000, 90000000, 100000000
];

/**
 * Application version.
 * 
 * @constant
 * @type {String}
 */
civitas.VERSION = '0.3.0.' +
	((new Date()).getMonth() + 1) + '' +
	(new Date()).getDate() + '' + 
	(new Date()).getFullYear();

/**
 * Whether the application is in debug mode.
 * 
 * @default
 * @constant
 * @type {Boolean}
 */
civitas.DEBUG = true;

/**
 * Browser localStorage key to store game data into.
 *
 * @constant
 * @default
 * @type {String}
 */
civitas.STORAGE_KEY = 'civitas';

/**
 * Goods importance, vital means at most 50 stacks of goods will be up
 * for importing or exporting.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.IMPORTANCE_VITAL = 50;

/**
 * Goods importance, high means at most 30 stacks of goods will be up
 * for importing or exporting.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.IMPORTANCE_HIGH = 30;

/**
 * Goods importance, medium means at most 20 stacks of goods will be up
 * for importing or exporting.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.IMPORTANCE_MEDIUM = 20;

/**
 * Goods importance, low means at most 10 stacks of goods will be up
 * for importing or exporting.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.IMPORTANCE_LOW = 10;

/**
 * Difficulty level of the game is easy.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIFFICULTY_EASY = 1;

/**
 * Difficulty level of the game is medium.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIFFICULTY_MEDIUM = 2;

/**
 * Difficulty level of the game is hard.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIFFICULTY_HARD = 3;

/**
 * Difficulty level of the game is hardcore.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIFFICULTY_HARDCORE = 4;

/**
 * When a building is notifying the player it's out of resources (the
 * building, not the player).
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFICATION_MISSING_RESOURCES = 1;

/**
 * When a building is notifying the player its production is paused
 * manually by the player.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFICATION_PRODUCTION_PAUSED = 2;

/**
 * When a building is notifying the player it is missing its requirements.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFICATION_MISSING_REQUIREMENTS = 3;

/**
 * When a building is notifying the player the level of the city is too low.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFICATION_SETTLEMENT_LOW_LEVEL = 4;

/**
 * Game type as single player (campaign, local).
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MODE_SINGLEPLAYER = 0;

/**
 * Game type as multi player (networked).
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MODE_MULTIPLAYER = 1;

/**
 * Diplomacy proposal action.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.ACTION_DIPLOMACY = 0;

/**
 * Campaign action.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.ACTION_CAMPAIGN = 1;

/**
 * Error notification
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFY_ERROR = 0;

/**
 * Achievement notification
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFY_ACHIEVEMENT = 1;

/**
 * Normal notification
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFY_NORMAL = 2;

/**
 * Event notification.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFY_EVENT = 3;

/**
 * Research notification.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFY_RESEARCH = 4;

/**
 * Religion notification.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFY_RELIGION = 5;

/**
 * War notification.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.NOTIFY_WAR = 6;

/**
 * Max numbers of lines to show in the console. Too many will overload the DOM.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_CONSOLE_LINES = 5000;

civitas.INITIAL_SEED = [
	/* Easy difficulty */
	{
		/* Roughness of the world generator */
		roughness: 5,
		/* Number of settlements to build initially */
		settlements: {
			/* Cities */
			0: 8, //5,
			/* Villages */
			1: 5,
			/* Metropolis */
			2: 6, //1,
			/* Raider camps */
			3: 6 //0
		},
		/* Number of soldiers and ships to build initially */
		military: {
			army: {
				militia: 10,
				axeman: 2,
				bowman: 4
			},
			navy: {
				corsair: 2,
				caravel: 1
			}
		},
		resources: {
			coins: 55000,
			fame: 0,
			faith: 1,
			prestige: 1,
			espionage: 1,
			research: 1,
			bread: 300,
			meat: 100,
			stones: 100,
			weapons: 100,
			wheat: 40,
			wood: 100,
			woodplanks: 50,
			tools: 40
		},
		buildings: [
			{
				handle: 'marketplace',
				level: 1
			}, {
				handle: 'lumberjack',
				level: 1
			}, {
				handle: 'stonequarry',
				level: 1
			}, {
				handle: 'house1',
				level: 1
			}, {
				handle: 'house2',
				level: 1
			}
		]
	},
	/* Medium difficulty */
	{
		roughness: 6,
		settlements: {
			0: 5,
			1: 10,
			2: 5,
			3: 3
		},
		military: {
			army: {
				militia: 5,
				axeman: 1,
				bowman: 2
			},
			navy: {
				corsair: 1,
				caravel: 1
			}
		},
		resources: {
			coins: 20000,
			fame: 0,
			faith: 1,
			prestige: 1,
			espionage: 1,
			research: 1,
			bread: 300,
			meat: 100,
			stones: 100,
			weapons: 60,
			wheat: 40,
			wood: 100,
			woodplanks: 30,
			tools: 20
		},
		buildings: [
			{
				handle: 'marketplace',
				level: 1
			}, {
				handle: 'lumberjack',
				level: 1
			}, {
				handle: 'stonequarry',
				level: 1
			}, {
				handle: 'house1',
				level: 1
			}, {
				handle: 'house2',
				level: 1
			}
		]
	},
	/* Hard difficulty */
	{
		roughness: 8,
		settlements: {
			0: 10,
			1: 10,
			2: 6,
			3: 10
		},
		military: {
			army: {
				militia: 3,
				bowman: 2
			},
			navy: {
				corsair: 1
			}
		},
		resources: {
			coins: 10000,
			fame: 0,
			faith: 1,
			prestige: 1,
			espionage: 1,
			research: 1,
			bread: 300,
			meat: 100,
			stones: 70,
			wheat: 40,
			wood: 70,
			woodplanks: 20,
			tools: 10
		},
		buildings: [
			{
				handle: 'marketplace',
				level: 1
			}, {
				handle: 'lumberjack',
				level: 1
			}, {
				handle: 'stonequarry',
				level: 1
			}, {
				handle: 'house1',
				level: 1
			}, {
				handle: 'house2',
				level: 1
			}
		]
	},
	/* Hardcore difficulty */
	{
		roughness: 1,
		settlements: {
			0: 10,
			1: 20,
			2: 20,
			3: 20
		},
		military: {
			army: {},
			navy: {}
		},
		resources: {
			coins: 5000,
			fame: 0,
			faith: 1,
			prestige: 1,
			espionage: 1,
			research: 1,
			bread: 100,
			meat: 50,
			stones: 50,
			wheat: 40,
			wood: 50
		},
		buildings: [
			{
				handle: 'marketplace',
				level: 1
			}, {
				handle: 'lumberjack',
				level: 1
			}, {
				handle: 'stonequarry',
				level: 1
			}, {
				handle: 'house1',
				level: 1
			}, {
				handle: 'house2',
				level: 1
			}
		]
	}
];


civitas.ERA_1 = 1;

civitas.ERA_2 = 2;

civitas.ERA_3 = 3;

civitas.ERA_4 = 4;

/**
 * List of the possible religion types.
 * 
 * @constant
 * @default
 * @type {Array}
 */
civitas.RELIGIONS = [
	'none',
	'christianity',
	'islam',
	'judaism',
	'buddhism',
	'hinduism',
	'confucianism',
	'taoism'
];

/**
 * No religion
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_NONE = 0;

/**
 * Christianity
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_CHRISTIANITY = 1;

/**
 * Islam
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_ISLAM = 2;

/**
 * Judaism
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_JUDAISM = 3;

/**
 * Buddhism
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_BUDDHISM = 4;

/**
 * Hinduism
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_HINDUISM = 5;

/**
 * Confucianism
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_CONFUCIANISM = 6;

/**
 * Taoism
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.RELIGION_TAOISM = 7;

/**
 * The minimum value settlement faith can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MIN_FAITH_VALUE = 1;

/**
 * The maximum value settlement faith can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_FAITH_VALUE = 1000;

/**
 * List of game diplomacy options.
 *
 * @constant
 * @default
 * @type {Array}
 */
civitas.DIPLOMACIES = [
	'truce',
	'war',
	'pact',
	'alliance',
	'cease fire',
	'pact proposed',
	'alliance proposed',
	'cease fire proposed',
	'proposed to join you',
	'vassal'
];

/**
 * The campaign is an army.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.CAMPAIGN_ARMY = 1;

/**
 * The campaign is a caravan.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.CAMPAIGN_CARAVAN = 2;

/**
 * The campaign is a spy.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.CAMPAIGN_SPY = 3;

/**
 * The campaign is an army returning home with spoils of war.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.CAMPAIGN_ARMY_RETURN = 4;

/**
 * Just met, temporary truce, can declare war, can trade.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_TRUCE = 0;

/**
 * At war, no trades possible.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_WAR = 1;

/**
 * In a pact, can declare war, can trade.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_PACT = 2;

/**
 * In an alliance, cannot declare war, can trade with discounts,
 * can share armies.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_ALLIANCE = 3;

/**
 * A cease fire means a temporary peace.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_CEASE_FIRE = 4;

/**
 * Propose pact.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_PROPOSE_PACT = 5;

/**
 * Propose alliance.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_PROPOSE_ALLIANCE = 6;

/**
 * Propose cease fire.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_PROPOSE_CEASE_FIRE = 7;

/**
 * Propose to join your settlement.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_PROPOSE_JOIN = 8;

/**
 * Vassal villages count as part of your empire.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.DIPLOMACY_VASSAL = 9;

/**
 * Influence gained when selling goods to a settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.EXPORT_INFLUENCE = 2;

/**
 * Influence gained when buying goods from a settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.IMPORT_INFLUENCE = 1;

/**
 * Prestige gained when selling goods to a settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.EXPORT_PRESTIGE = 2;

/**
 * Prestige gained when buying goods from a settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.IMPORT_PRESTIGE = 1;

/**
 * The minimum value settlement prestige can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MIN_PRESTIGE_VALUE = 1;

/**
 * The maximum value settlement prestige can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_PRESTIGE_VALUE = 10000;

/**
 * The minimum value settlement research can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MIN_RESEARCH_VALUE = 1;

/**
 * The maximum value settlement research can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_RESEARCH_VALUE = 1000;

/**
 * The minimum value settlement espionage can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MIN_ESPIONAGE_VALUE = 1;

/**
 * The maximum value settlement espionage can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_ESPIONAGE_VALUE = 1000;

/**
 * The success rate of an espionage mission is the espionage points
 * assigned to the mission divided by this value.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_ESPIONAGE_SUCESS_RATE = 100;

/**
 * The minimum value settlement influence can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MIN_INFLUENCE_VALUE = 1;

/**
 * The maximum value settlement influence can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_INFLUENCE_VALUE = 100;

/**
 * List of game diplomacy options.
 *
 * @constant
 * @default
 * @type {Array}
 */
civitas.SPY_MISSIONS = [
	'none',
	'adopt religion',
	'influence settlement',
	'steal resources',
	'instigate turmoil'
];

/**
 * Spy mission to do absolutely nothing in the target city (except
 * maybe get noticed?).
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.SPY_MISSION_NONE = 0;

/**
 * Spy mission to persuade the target city to take the same religion
 * as the spy home city.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.SPY_MISSION_RELIGION = 1;

/**
 * Spy mission to raise the influence of the spy's home city with the
 * target city.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.SPY_MISSION_INFLUENCE = 2;

/**
 * Spy mission to steal resources from the target city.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.SPY_MISSION_STEAL_RESOURCES = 3;

/**
 * Spy mission to instigate turmoil in the target city.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.SPY_MISSION_INSTIGATE = 4;

/**
 * Initial resource costs for sending a caravan.
 *
 * @constant
 * @default
 * @type {Object}
 */
civitas.CARAVAN_COSTS = {
	coins: 1000,
	donkeys: 10,
	wood: 10,
	ropes: 2,
	provisions: 1
}

/**
 * Initial resource costs for sending a spy mission.
 *
 * @constant
 * @default
 * @type {Object}
 */
civitas.SPY_COSTS = {
	coins: 500,
	spyglasses: 1,
	weapons: 1,
	provisions: 1
}

/**
 * Initial resource costs for sending an army.
 *
 * @constant
 * @default
 * @type {Object}
 */
civitas.ARMY_COSTS = {
	coins: 2000,
	provisions: 1
}

/**
 * Amount of influence a settlement gains when sending a caravan
 * to another settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.CARAVAN_INFLUENCE = 5;

/**
 * List of the possible nation types.
 * 
 * @constant
 * @default
 * @type {Array}
 */
civitas.NATIONS = [
	'none',
	'phoenician',
	'carthaginian',
	'greek',
	'egyptian',
	'assyrian',
	'roman',
	'thracian',
	'sudanese',
	'spanish',
	'sumerian',
	'chinese',
	'indian',
	'franks',
	'russian',
	'nigerian',
	'malinese',
	'mongolian',
	'tibetan',
	'persan',
	'khmer',
	'japanese',
	'french'
];

/**
 * Phoenicians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_PHOENICIAN = 1;

/**
 * Carthaginans
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_CARTHAGINIAN = 2;

/**
 * Greeks
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_GREEK = 3;

/**
 * Egyptians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_EGYPTIAN = 4;

/**
 * Assyrians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_ASSYRIAN = 5;

/**
 * Romans
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_ROMAN = 6;

/**
 * Thracians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_THRACIAN = 7;

/**
 * Sudanese
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_SUDANESE = 8;

/**
 * Spanish
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_SPANISH = 9;

/**
 * Sumerians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_SUMERIAN = 10;

/**
 * Chinese
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_CHINESE = 11;

/**
 * Indian
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_INDIAN = 12;

/**
 * Franks
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_FRANKS = 13;

/**
 * Russians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_RUSSIAN = 14;

/**
 * Nigerians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_NIGERIAN = 15;

/**
 * Malinese
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_MALINESE = 16;

/**
 * Mongolians
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_MONGOLIAN = 17;

/**
 * Tibetans
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_TIBETAN = 18;

/**
 * Persans
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_PERSAN = 19;

/**
 * Khmer
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_KHMER = 20;

/**
 * Japanese
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_JAPANESE = 21;

/**
 * French
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.NATION_FRENCH = 22;

/**
 * List of the possible climate types.
 * 
 * @constant
 * @default
 * @type {Array}
 */
civitas.CLIMATES = [
	'none',
	'temperate',
	'tropical',
	'arid',
	'polar'
];

/**
 * Temperate climate, all balanced.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.CLIMATE_TEMPERATE = 1;

/**
 * Tropical climate, favoring farms and exotic goods.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.CLIMATE_TROPICAL = 2;

/**
 * Arid climate, favoring ore mines.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.CLIMATE_ARID = 3;

/**
 * Polar climate, very extreme.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.CLIMATE_POLAR = 4;

/**
 * List of the possible ruler personality types.
 * 
 * @constant
 * @default
 * @type {Array}
 */
civitas.PERSONALITIES = [
    'none',
    'balanced',
    'diplomat',
    'warlord'
];

/**
 * Balanced type, the ruler weights in all the possibilities before deciding
 * whether to go to war or let diplomacy win.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.PERSONALITY_BALANCED = 1;

/**
 * The ruler will always consider diplomacy before going to war.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.PERSONALITY_DIPLOMAT = 2;

/**
 * If you upset this ruler, he will go to war and give you hell.
 * 
 * @constant
 * @default
 * @type {Number}
 */
civitas.PERSONALITY_WARLORD = 3;

/**
 * The attacking side (left) in a battleground.
 *
 * @type {Number}
 * @default
 * @constant
 */
civitas.BATTLEGROUND_ATTACK = 1;

/**
 * The defending side (right) in a battleground.
 *
 * @type {Number}
 * @default
 * @constant
 */
civitas.BATTLEGROUND_DEFENSE = 2;

/**
 * List of soldier types, their attributes and cost.
 * 
 * @type {Object}
 * @constant
 */
civitas.SOLDIERS = {
	militia: {
		name: 'Militia',
		attack: 1,
		defense: 1,
		moves: 1,
		cost: {
			coins: 100,
			bread: 1,
			weapons: 1
		}
	},
	swordsman: {
		name: 'Swordsman',
		attack: 2,
		defense: 2,
		moves: 2,
		cost: {
			coins: 300,
			bread: 1,
			meat: 1,
			weapons: 2
		}
	},
	axeman: {
		name: 'Axeman',
		attack: 3,
		defense: 1,
		moves: 2,
		cost: {
			coins: 400,
			bread: 1,
			meat: 3,
			weapons: 2
		}
	},
	bowman: {
		name: 'Bowman',
		attack: 3,
		defense: 1,
		ranged: 5,
		moves: 3,
		cost: {
			coins: 500,
			bread: 1,
			meat: 3,
			weapons: 4
		}
	},
	pikeman: {
		name: 'Pikeman',
		attack: 2,
		defense: 4,
		moves: 2,
		cost: {
			coins: 700,
			provisions: 1,
			iron: 1,
			weapons: 5,
			armor: 1
		}
	},
	crossbowman: {
		name: 'Crossbowman',
		attack: 5,
		defense: 2,
		moves: 3,
		ranged: 8,
		cost: {
			coins: 1000,
			provisions: 2,
			iron: 1,
			weapons: 7,
			armor: 1
		}
	},
	knight: {
		name: 'Knight',
		attack: 6,
		defense: 6,
		moves: 4,
		cost: {
			coins: 1500,
			provisions: 3,
			iron: 1,
			weapons: 9,
			armor: 4
		}
	},
	legionnaire: {
		name: 'Legionnaire',
		attack: 7,
		defense: 7,
		moves: 2,
		cost: {
			coins: 2500,
			provisions: 6,
			iron: 2,
			weapons: 12,
			armor: 12
		}
	},
	crusader: {
		name: 'Crusader',
		attack: 9,
		defense: 9,
		moves: 4,
		cost: {
			coins: 3000,
			provisions: 8,
			iron: 4,
			weapons: 15,
			armor: 15
		}
	},
	cannon: {
		name: 'Cannon',
		attack: 15,
		defense: 1,
		moves: 0,
		siege: true,
		ranged: 20,
		cost: {
			coins: 25000,
			provisions: 30,
			gunpowder: 30,
			iron: 40,
			steel: 20,
			cannons: 1
		}
	},
	catapult: {
		name: 'Catapult',
		attack: 50,
		defense: 1,
		ranged: 20,
		siege: true,
		moves: 0,
		cost: {
			coins: 100000,
			provisions: 100,
			gunpowder: 150,
			iron: 140,
			catapults: 1
		}
	}
};

/**
 * List of mercenary armies available for hire.
 * 
 * @constant
 * @type {Object}
 */
civitas.MERCENARIES = [{
	name: 'Legio I Adiutrix',
	description: 'Legio prima Adiutrix is a Roman legion.',
	handle: 'legio1',
	icon: 1,
	army: {
		axeman: 300,
		knight: 100,
		crossbowman: 220,
		pikeman: 200,
		legionnaire: 100
	},
	cost: 120000
}, {
	name: 'Legio II Augusta',
	description: 'Legio secunda Augusta is a Roman legion.',
	handle: 'legio2',
	icon: 8,
	army: {
		axeman: 220,
		knight: 100,
		crossbowman: 300,
		pikeman: 100,
		legionnaire: 100
	},
	cost: 130000
}, {
	name: 'Legio III Cyrenaica',
	description: 'Legio tertia Cyrenaica is a Roman legion.',
	handle: 'legio3',
	icon: 15,
	army: {
		axeman: 280,
		crossbowman: 500,
		pikeman: 180,
		legionnaire: 100
	},
	cost: 100000
}, {
	name: 'Legio IV Flavia Felix',
	description: 'Legio quarta Flavia Felix is a Roman legion.',
	handle: 'legio4',
	icon: 9,
	army: {
		militia: 140,
		axeman: 190,
		knight: 90,
		bowman: 20,
		crossbowman: 100,
		pikeman: 180,
		legionnaire: 100
	},
	cost: 190000
}, {
	name: 'Legio V Alaudae',
	description: 'Legio quinta Alaudae is a Roman legion.',
	handle: 'legio5',
	icon: 16,
	army: {
		militia: 100,
		axeman: 200,
		bowman: 190,
		legionnaire: 130
	},
	cost: 110000
}, {
	name: 'Legio VI Victrix',
	description: 'Legio sexta Victrix is a Roman legion.',
	handle: 'legio6',
	icon: 22,
	army: {
		militia: 330,
		axeman: 230,
		knight: 100,
		bowman: 100,
		legionnaire: 100
	},
	cost: 140000
}, {
	name: 'Varangian Guard',
	description: 'The Varangian Guard is an elite unit of the Byzantine Army.',
	handle: 'varangian',
	icon: 18,
	army: {
		militia: 410,
		axeman: 210,
		bowman: 190,
		crossbowman: 100,
		pikeman: 220
	},
	cost: 120000
}, {
	name: 'Magna Societas Catalanorum',
	description: 'The Catalan Company of the East, officially the Magna ' +
		'Societas Catalanorum is a company of mercenaries founded by Roger de ' +
		'Flor.',
	handle: 'catalan',
	icon: 23,
	army: {
		axeman: 310,
		knight: 120,
		bowman: 210,
		pikeman: 310
	},
	cost: 100000
}, {
	name: 'Army of the Western Garden',
	description: 'The Army of the Western Garden is an army established ' +
		'during the reign of Emperor Ling in the Eastern Han Dynasty.',
	handle: 'western',
	icon: 27,
	army: {
		axeman: 290,
		knight: 40,
		bowman: 170,
		pikeman: 300
	},
	cost: 90000
}, {
	name: 'Scholae Palatinae',
	description: 'The Scholae Palatinae are an elite military guard unit, ' +
		'usually ascribed to the Roman Emperor Constantine the Great as a ' +
		'replacement for the equites singulares Augusti, the cavalry arm ' +
		'of the Praetorian Guard.',
	handle: 'scholae',
	icon: 26,
	army: {
		axeman: 10,
		knight: 200,
		bowman: 100,
		pikeman: 210
	},
	cost: 290000
}, {
	name: 'Imperial Guards',
	description: 'The Imperial Guards of the Tang Dynasty, also known as ' +
		'the Forbidden Troops were initially honor guards of the emperor ' +
		'and garrisons of the imperial capitals during the Tang`s dinasty ' +
		'formation in early 7th century.',
	handle: 'forbidden',
	icon: 25,
	army: {
		axeman: 290,
		knight: 80,
		bowman: 100,
		pikeman: 210
	},
	cost: 130000
}, {
	name: 'Navy of the Order of Saint John',
	description: 'The navy of the Order of Saint John, also known as the ' +
		'Maltese Navy, was the first navy of a chivalric order, established ' +
		'in the Middle Ages, around the late 12th century.',
	handle: 'maltesenavy',
	icon: 28,
	navy: {
		corsair: 19,
		caravel: 14,
		warship: 12,
		shipoftheline: 10
	},
	cost: 1500000
}];

/**
 * List of ship types, their attributes and cost.
 * 
 * @type {Object}
 * @constant
 */
civitas.SHIPS = {
	corsair: {
		name: 'Corsair',
		attack: 5,
		defense: 5,
		cost: {
			coins: 1000,
			wood: 200,
			iron: 50,
			provisions: 50,
			ropes: 10,
			cottonfabric: 5,
			cannons: 5,
			gunpowder: 2
		}
	},
	caravel: {
		name: 'Caravel',
		attack: 10,
		defense: 10,
		cost: {
			coins: 3000,
			wood: 400,
			iron: 80,
			provisions: 60,
			ropes: 30,
			cottonfabric: 10,
			cannons: 20,
			gunpowder: 5,
			weapons: 10
		}
	},
	frigatte: {
		name: 'Frigatte',
		attack: 17,
		defense: 8,
		cost: {
			coins: 3000,
			wood: 400,
			iron: 80,
			provisions: 60,
			ropes: 30,
			cottonfabric: 20,
			cannons: 30,
			gunpowder: 10,
			weapons: 10
		}
	},
	galleon: {
		name: 'Galleon',
		attack: 15,
		defense: 15,
		cost: {
			coins: 5000,
			wood: 300,
			woodplanks: 600,
			iron: 150,
			provisions: 100,
			ropes: 80,
			cottonfabric: 30,
			cannons: 20,
			gunpowder: 15,
			weapons: 15
		}
	},
	warship: {
		name: 'Warship',
		attack: 35,
		defense: 30,
		cost: {
			coins: 10000,
			wood: 400,
			woodplanks: 800,
			iron: 500,
			steel: 100,
			provisions: 200,
			ropes: 100,
			cottonfabric: 40,
			cannons: 50,
			weapons: 20,
			gunpowder: 20,
			carpets: 10
		}
	},
	shipoftheline: {
		name: 'Ship of the Line',
		attack: 55,
		defense: 50,
		cost: {
			coins: 15000,
			wood: 500,
			woodplanks: 1000,
			coal: 500,
			iron: 1500,
			steel: 400,
			provisions: 200,
			barrels: 100,
			ropes: 100,
			cottonfabric: 50,
			cannons: 100,
			gunpowder: 30,
			weapons: 50
		}
	}
};


/**
 * List of all game research technologies.
 * 
 * @constant
 * @type {Array}
 */
civitas.RESEARCH = [{
		name: 'Agriculture',
		handle: 'agriculture',
		description: 'The development of agriculture enables the human population to grow many times larger than could be sustained by hunting and gathering.',
		duration: 20,
		cost: {
			research: 500,
			coins: 500000,
			woodplanks: 200,
			wheat: 100,
			tools: 10
		},
		effect: {
		}
	}, {
		name: 'Antibiotics',
		handle: 'antibiotics',
		description: 'An antibiotic is a type of antimicrobial substance active against bacteria and is the most important type of antibacterial agent for fighting bacterial infections.',
		duration: 30,
		cost: {
			research: 500,
			coins: 400000,
			alcohol: 500,
			essentialoil: 500
		},
		effect: {
		}
	}, {
		name: 'Canned Food',
		handle: 'cannedfood',
		description: 'Canning is a method of preserving food in which the food contents are processed and sealed in an airtight container (jars like Mason jars, and steel and tin cans).',
		duration: 50,
		cost: {
			research: 300,
			coins: 200000,
			meals: 100
		},
		effect: {
		}
	}, {
		name: 'Circular Saw',
		handle: 'circularsaw',
		description: 'The circular saw was invented around the end of the 18th century as a rip-saw to convert logs into lumber in sawmills and various claims have been made as to who invented the circular saw.',
		duration: 120,
		cost: {
			research: 300,
			coins: 100000,
			wood: 200,
			woodplanks: 100
		},
		effect: {
		}
	}, {
		name: 'Fertilisers',
		handle: 'fertilisers',
		description: 'A fertiliser is any material of natural or synthetic origin (other than liming materials) that is applied to soils or to plant tissues to supply one or more plant nutrients essential to the growth of plants.',
		duration: 90,
		cost: {
			research: 100,
			coins: 100000
		},
		effect: {
		}
	}, {
		name: 'Light Bulbs',
		handle: 'lightbulbs',
		description: 'The light bulb is the most common form of artificial lighting and is essential to modern society, providing interior lighting for buildings and exterior light for evening and nighttime activities.',
		duration: 3,
		cost: {
			research: 100,
			coins: 100000,
			steel: 200,
			glass: 1000
		},
		effect: {
		}
	}, {
		name: 'Minerals',
		handle: 'minerals',
		description: '',
		duration: 3,
		cost: {
			research: 100,
			coins: 100000,
			steel: 200,
			glass: 1000
		},
		effect: {
		}
	}, {
		name: 'Paved streets',
		handle: 'pavedstreets',
		description: '',
		duration: 3,
		cost: {
			research: 100,
			coins: 100000,
			steel: 200,
			glass: 1000
		},
		effect: {
		}
	}, {
		name: 'Projectiles',
		handle: 'projectiles',
		description: '',
		duration: 3,
		cost: {
			research: 100,
			coins: 100000,
			steel: 200,
			glass: 1000
		},
		effect: {
		}
	}, {
		name: 'Railway',
		handle: 'railway',
		description: '',
		duration: 3,
		cost: {
			research: 100,
			coins: 100000,
			steel: 200,
			glass: 1000
		},
		effect: {
		}
	}, {
		name: 'Sewing machine',
		handle: 'sewingmachine',
		description: '',
		duration: 3,
		cost: {
			research: 100,
			coins: 100000,
			steel: 200,
			glass: 1000
		},
		effect: {
		}
	}
];

/**
 * Buildings native to the tropical climate.
 * 
 * @constant
 * @type {Array}
 */
civitas.SETTLEMENT_BUILDINGS_TROPICAL = [

	/* Municipal */
	'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'militarycamp', 
	'castle', 'shipyard', 'embassy', 'academy', 'tavern', 'tournir',

	/* Housing */
	'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7',
	'house8', 'house9', 'house10', 'house11', 'house12',

	/* Food Production */
	'mill', 'bakery', 'butcher', 'cookhouse', 

	/* Mines */
	'coppermine', 'ironmine', 'saltmine', 'claymine', 'coalmine', 'quartzmine',
	'uraniummine',

	/* Smelters */
	'goldsmelter', 'coppersmelter', 'ironsmelter',

	/* Industry */
	'lumberjack', 'stonequarry', 'trapper', 'tannery', 'furrier', 'armory',
	'coffeeroaster', 'winery', 'pottery', 'carpetmanufacturer',
	'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress',
	'gunpowdermill', 'redsmithsworkshop', 'ropeyard', 'glassworks',
	'silkweaver', 'jeweler', 'toolmaker', 'apiary', 'beehive',
	'barrelcooperage', 'brewery', 'candlemakersworkshop', 'sugarmill',
	'cosmetics', 'weaver', 'clothingfactory', 'provisions', 'carpenter',
	'marzipanworkshop', 'cannonfoundry', 'brickworks', 'cementplant', 

	/* Farms */
	'almondsfarm', 'almondsfield', 'cattlefarm', 'cattlefield', 'coffeefarm',
	'coffeefield', 'grainfarm', 'grainfield', 'datesfarm', 'datesfield',
	'goatfarm', 'goatfield', 'grapesfarm', 'grapesfield', 'cottonfarm',
	'cottonfield', 'pigfarm', 'pigfield', 'sugarfarm', 'sugarfield',
	'indigofarm', 'indigofield', 'tobaccofarm', 'tobaccofield'
];

/**
 * Buildings native to the polar climate.
 * 
 * @constant
 * @type {Array}
 */
civitas.SETTLEMENT_BUILDINGS_POLAR = [

	/* Municipal */
	'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'militarycamp',
	'castle', 'shipyard', 'embassy', 'academy', 'tavern', 'tournir',

	/* Housing */
	'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7',

	/* Food Production */
	'mill', 'bakery', 'butcher', 'cookhouse', 

	/* Mines */
	'coppermine', 'goldmine', 'ironmine', 'claymine', 'coalmine', 'uraniummine',

	/* Smelters */
	'goldsmelter', 'coppersmelter', 'ironsmelter',

	/* Industry */
	'lumberjack', 'stonequarry', 'trapper', 'tannery', 'furrier', 'armory',
	'coffeeroaster', 'winery', 'pottery', 'jeweler', 'toolmaker',
	'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress',
	'gunpowdermill', 'redsmithsworkshop', 'ropeyard', 'glassworks',
	'silkweaver', 'marzipanworkshop', 'apiary', 'beehive', 'barrelcooperage',
	'brewery', 'candlemakersworkshop', 'sugarmill', 'cannonfoundry',
	'cosmetics', 'weaver', 'clothingfactory', 'provisions', 'carpenter', 'brickworks',
	'cementplant'
];

/**
 * Buildings native to the arid climate.
 * 
 * @constant
 * @type {Array}
 */
civitas.SETTLEMENT_BUILDINGS_ARID = [

	/* Municipal */
	'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery',
	'militarycamp', 'castle', 'shipyard', 'embassy', 'academy', 'tavern', 'tournir',

	/* Housing */
	'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7',

	/* Food Production */
	'mill', 'bakery', 'butcher', 'cookhouse', 

	/* Mines */
	'coppermine', 'goldmine', 'ironmine', 'saltmine', 'claymine', 'coalmine',
	'quartzmine', 'uraniummine',

	/* Smelters */
	'goldsmelter', 'coppersmelter', 'ironsmelter',

	/* Industry */
	'lumberjack', 'stonequarry', 'trapper', 'tannery', 'furrier', 'armory',
	'coffeeroaster', 'winery', 'pottery', 'jeweler', 'toolmaker',
	'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress',
	'redsmithsworkshop', 'ropeyard', 'glassworks', 'silkweaver',
	'gunpowdermill', 'apiary', 'beehive', 'barrelcooperage', 'brewery',
	'candlemakersworkshop', 'sugarmill', 'cosmetics', 'weaver',
	'clothingfactory', 'provisions', 'carpenter', 'marzipanworkshop',
	'cannonfoundry', 'brickworks', 'cementplant',

	/* Farms */
	'goatfarm', 'goatfield', 'cattlefarm', 'cattlefield', 'pigfarm',
	'pigfield', 'indigofarm', 'indigofield', 'spicefarm', 'spicefield',
	'datesfarm', 'datesfield', 'tobaccofarm', 'tobaccofield'
];

/**
 * Buildings native to the temperate climate.
 * 
 * @constant
 * @type {Array}
 */
civitas.SETTLEMENT_BUILDINGS_TEMPERATE = [

	/* Municipal */
	'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'militarycamp',
	'castle', 'shipyard', 'embassy', 'academy', 'tavern', 'tournir',

	/* Housing */
	'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7',
	'house8', 'house9', 'house10', 'house11', 'house12',

	/* Food Production */
	'mill', 'bakery', 'butcher',  'cookhouse', 

	/* Mines */
	'coppermine', 'goldmine', 'ironmine', 'saltmine', 'claymine', 'coalmine',
	'uraniummine',

	/* Smelters */
	'goldsmelter', 'coppersmelter', 'ironsmelter',

	/* Industry */
	'lumberjack', 'stonequarry', 'trapper', 'tannery', 'furrier', 'armory',
	'coffeeroaster', 'winery', 'pottery', 'jeweler', 'toolmaker',
	'carpetmanufacturer', 'charcoalburnerhut', 'opticiansworkshop',
	'papermill', 'printingpress', 'gunpowdermill', 'redsmithsworkshop',
	'ropeyard', 'glassworks', 'silkweaver', 'marzipanworkshop', 'apiary',
	'beehive', 'barrelcooperage', 'brewery', 'candlemakersworkshop',
	'sugarmill', 'cosmetics', 'weaver', 'clothingfactory', 'provisions',
	'carpenter', 'catapultworkshop', 'cannonfoundry', 'brickworks', 'cementplant',

	/* Farms */
	'cattlefarm', 'cattlefield', 'grainfarm',
	'grainfield', 'grapesfarm', 'grapesfield', 'rosenursery', 'rosefield',
	'goatfarm', 'goatfield', 'cottonfarm', 'cottonfield', 'pigfarm', 'pigfield',
	'tobaccofarm', 'tobaccofield'
];

/**
 * All the buildings for a city.
 * 
 * @constant
 * @type {Array}
 */
civitas.BUILDINGS_ALL = [
	'marketplace', 'lumberjack', 'militarycamp', 'warehouse', 'mill', 'castle',
	'stonequarry', 'claymine', 'ironmine', 'trapper', 'almondsfarm',
	'almondsfield', 'tavern', 'tournir', 'shipyard', 'pigfarm', 'cattlefarm',
	'pigfield', 'cattlefield', 'house1', 'house2', 'house3', 'house4',
	'house5', 'house6', 'house7', 'datesfarm', 'datesfield', 'house8',
	'house9', 'house10', 'house11', 'house12', 'church', 'bakery', 'butcher',
	'grainfarm', 'grainfield', 'ironsmelter', 'tannery', 'furrier', 'saltmine',
	'coppermine', 'goldmine', 'goldsmelter', 'coppersmelter', 'armory',
	'coffeefarm', 'coffeefield', 'cottonfarm', 'cottonfield', 'sugarfarm',
	'spicefarm', 'spicefield', 'sugarfield', 'silkfarm', 'silkfield',
	'coffeeroaster', 'quartzmine', 'grapesfarm', 'grapesfield', 'winery',
	'carpenter', 'pottery', 'jeweler', 'toolmaker', 'uraniummine',
	'charcoalburnerhut', 'monastery', 'opticiansworkshop', 'papermill',
	'printingpress', 'redsmithsworkshop', 'ropeyard', 'glassworks',
	'provisions', 'silkweaver', 'gunpowdermill', 'goatfarm', 'goatfield',
	'coalmine', 'carpetmanufacturer', 'apiary', 'beehive', 'barrelcooperage',
	'brewery', 'candlemakersworkshop', 'indigofarm', 'indigofield',
	'sugarmill', 'rosenursery', 'rosefield',
	'catapultworkshop', 'cannonfoundry', 'cosmetics', 'tradingpost',
	'clothingfactory', 'weaver', 'embassy',  'academy', 'marzipanworkshop',
	'brickworks', 'tobaccofarm', 'tobaccofield', 'cementplant', 'cookhouse'
];

/**
 * Buildings' categories.
 * 
 * @constant
 * @type {Object}
 */
civitas.BUILDINGS_CATEGORIES = {
	'Municipal': [
		'academy',
		'church',
		'embassy',
		'marketplace',
		'monastery',
		'shipyard',
		'tavern',
		'tournir',
		'tradingpost',
		'warehouse'
	],
	'Housing': [
		'house1',
		'house2',
		'house3',
		'house4',
		'house5',
		'house6',
		'house7',
		'house8',
		'house9',
		'house10',
		'house11',
		'house12'
	],
	'Food': [
		'bakery',
		'butcher',
		'cookhouse',
		'mill'
	],
	'Mines': [
		'claymine',
		'coalmine',
		'coppermine',
		'goldmine',
		'ironmine',
		'quartzmine',
		'saltmine',
		'stonequarry',
		'uraniummine'
	],
	'Farms': [
		'almondsfarm',
		'almondsfield',
		'apiary',
		'beehive',
		'cattlefarm',
		'cattlefield',
		'coffeefarm',
		'coffeefield',
		'cottonfarm',
		'cottonfield',
		'datesfarm',
		'datesfield',
		'goatfarm',
		'goatfield',
		'grainfarm',
		'grainfield',
		'grapesfarm',
		'grapesfield',
		'indigofarm',
		'indigofield',
		'pigfarm',
		'pigfield',
		'rosenursery',
		'rosefield',
		'silkfarm',
		'silkfield',
		'spicefarm',
		'spicefield',
		'sugarfarm',
		'sugarfield',
		'tobaccofarm',
		'tobaccofield'
	],
	'Industry': [
		'barrelcooperage',
		'brewery',
		'brickworks',
		'candlemakersworkshop',
		'carpenter',
		'cementplant',
		'charcoalburnerhut',
		'clothingfactory',
		'coppersmelter',
		'furrier',
		'glassworks',
		'goldsmelter',
		'gunpowdermill',
		'ironsmelter',
		'lumberjack',
		'pottery',
		'ropeyard',
		'trapper',
		'tannery',
		'toolmaker',
		'weaver'
	],
	'Luxury': [
		'carpetmanufacturer',
		'coffeeroaster',
		'jeweler',
		'marzipanworkshop',
		'opticiansworkshop',
		'papermill',
		'cosmetics',
		'printingpress',
		'redsmithsworkshop',
		'silkweaver',
		'sugarmill',
		'winery'
	],
	'Military': [
		'armory',
		'cannonfoundry',
		'castle',
		'catapultworkshop',
		'militarycamp',
		'provisions'
	]
};

/**
 * List of all game buildings.
 * 
 * @constant
 * @type {Array}
 */
civitas.BUILDINGS = [{
		name: 'Marketplace',
		handle: 'marketplace',
		description: 'The Marketplace is the main building of your city and provides a place for the inhabitants of your settlement to gather. It cannot be demolished.',
		storage: 100000,
		is_production: true,
		is_municipal: true,
		levels: 4,
		large: true,
		visible_upgrades: true,
		production: {
			fame: 5
		},
		cost: {
			coins: 100000
		},
		position: {
			x: 660,
			y: 420
		},
		requires: {
			settlement_level: 1
		}
	}, {
		name: 'Warehouse',
		handle: 'warehouse',
		description: 'The Warehouse is a trade building that provides market carts that pick up goods from production buildings. A Warehouse also adds extra storage space for the materials in your city.',
		storage: 100000,
		levels: 10,
		visible_upgrades: true,
		position: {
			x: 1162,
			y: 365
		},
		cost: {
			coins: 150000,
			wood: 500,
			bricks: 30,
			woodplanks: 200,
			stones: 500,
			tools: 50
		},
		requires: {
			settlement_level: 16
		}
	}, {
		name: 'Church',
		handle: 'church',
		description: 'A Church provides a massive fame boost to your settlement by using coins and converting them to fame, as well as providing faith for free. Faith allows you to choose a religion for your settlement.',
		is_municipal: true,
		is_production: true,
		production: {
			fame: 10,
			faith: 1
		},
		materials: {
			coins: 50
		},
		large: true,
		position: {
			x: 900,
			y: 660
		},
		levels: 3,
		cost: {
			coins: 10000,
			wood: 20,
			woodplanks: 20,
			stones: 20,
			tools: 10
		},
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'Trading Post',
		handle: 'tradingpost',
		description: 'The Trading Post gives you the opportunity to trade resources and send caravans to other settlements.',
		is_municipal: true,
		position: {
			x: 1260,
			y: 400
		},
		cost: {
			coins: 15000,
			wood: 40,
			woodplanks: 40,
			stones: 40
		},
		requires: {
			settlement_level: 4
		}
	}, {
		name: 'Academy',
		handle: 'academy',
		description: 'The Academy provides a minor amount of fame each day as well as research for this settlement at the expense of coins.',
		is_municipal: true,
		large: true,
		is_production: true,
		production: {
			fame: 5,
			research: 1
		},
		materials: {
			coins: 100
		},
		position: {
			x: 400,
			y: 420
		},
		levels: 3,
		cost: {
			coins: 100000,
			woodplanks: 1000,
			stones: 1000,
			tools: 20
		},
		requires: {
			settlement_level: 10
		}
	}, {
		name: 'Embassy',
		handle: 'embassy',
		description: 'An Embassy is required to propose pacts, declare war, send spies to other settlements.',
		is_municipal: true,
		is_production: true,
		large: true,
		production: {
			fame: 5,
			espionage: 1
		},
		materials: {
			coins: 50
		},
		position: {
			x: 620,
			y: 280
		},
		levels: 3,
		cost: {
			coins: 100000,
			woodplanks: 100,
			stones: 100,
			tools: 10
		},
		requires: {
			settlement_level: 10
		}
	}, {
		name: 'Provision House',
		handle: 'provisions',
		description: 'The Provision House requires various goods to produce provisions for military units.',
		is_production: true,
		production: {
			provisions: 2
		},
		materials: {
			meals: 1,
			clothes: 1,
			leather: 1,
			pottery: 1,
			ropes: 1
		},
		position: {
			x: 980,
			y: 220
		},
		levels: 3,
		cost: {
			coins: 100000,
			wood: 200,
			stones: 200,
			woodplanks: 100
		},
		requires: {
			settlement_level: 8
		}
	}, {
		name: 'Monastery',
		handle: 'monastery',
		description: 'A Monastery provides fame and faith for your city in exchange for coins.',
		is_municipal: true,
		is_production: true,
		production: {
			fame: 5,
			faith: 2
		},
		materials: {
			coins: 50
		},
		position: {
			x: 1000,
			y: 380
		},
		levels: 3,
		cost: {
			coins: 50000,
			woodplanks: 200,
			stones: 200,
			bricks: 30,
			mosaic: 10,
			tools: 20
		},
		requires: {
			settlement_level: 26,
			buildings: {
				academy: 1
			}
		}
	}, {
		name: 'Tavern',
		handle: 'tavern',
		description: 'The Tavern is the place where heroes of the known (and unknown) world hang around. If you are looking to recruit Achilles, build a Tavern. He might show up.',
		is_municipal: true,
		is_special: true,
		/*
		// TODO
		materials: {
			coins: 20,
			wine: 3,
			beer: 3,
			meat: 2,
			essentialoil: 1
		},*/
		position: {
			x: 240,
			y: 340
		},
		large: true,
		levels: 3,
		cost: {
			coins: 100000,
			woodplanks: 200,
			stones: 200,
			wood: 200,
			wine: 100,
			bricks: 10,
			meat: 100,
			tools: 50
		},
		requires: {
			settlement_level: 16,
			buildings: {
				academy: 2
			}
		}
	}, {
		name: 'Shipyard',
		handle: 'shipyard',
		description: 'The Shipyard helps you expand your settlement overseas by housing your ships and providing you with fish and an ultra-small chance to gather pearls.',
		is_production: true,
		large: true,
		position: {
			x: 1660,
			y: 560
		},
		levels: 5,
		chance: {
			pearls: 0.005
		},
		cost: {
			coins: 200000,
			wood: 200,
			woodplanks: 200,
			stones: 100,
			ropes: 10,
			barrels: 10,
			tools: 20
		},
		production: {
			fish: 3,
			oil: 1
		},
		requires: {
			settlement_level: 10
		}
	}, {
		name: 'Military Camp',
		handle: 'militarycamp',
		description: 'The military camp is your main base of defense and attack. If you plan on going to war, you will need a Military Camp.',
		position: {
			x: 200,
			y: 540
		},
		levels: 3,
		visible_upgrades: true,
		large: true,
		cost: {
			coins: 50000,
			wood: 200,
			woodplanks: 200,
			stones: 160,
			tools: 10
		},
		requires: {
			settlement_level: 8,
			buildings: {
				provisions: 1
			}
		}
	}, {
		name: 'Castle',
		handle: 'castle',
		description: 'The Castle is your main base of operations. It houses your settlement`s soldiers and provides you with prestige and some extra fame.',
		is_production: true,
		is_municipal: true,
		large: true,
		production: {
			fame: 100,
			prestige: 1
		},
		levels: 2,
		position: {
			x: 990,
			y: 60
		},
		materials: {
			coins: 200
		},
		cost: {
			coins: 1000000,
			wood: 500,
			cement: 1000,
			iron: 500,
			woodplanks: 500,
			stones: 500,
			bricks: 500,
			steel: 50,
			tools: 100
		},
		requires: {
			settlement_level: 20,
			buildings: {
				militarycamp: 1
			}
		}
	}, {
		name: 'Lumberjack',
		handle: 'lumberjack',
		description: 'A Lumberjack provides you with wood which you can use for creating additional buildings, resources or sell to other settlements.',
		is_production: true,
		production: {
			wood: 4
		},
		levels: 5,
		position: {
			x: 120,
			y: 760
		},
		cost: {
			coins: 2000,
			stones: 20
		},
		requires: {
			settlement_level: 1
		}
	}, {
		name: 'Carpenter',
		handle: 'carpenter',
		description: 'The Carpenter processes the wood from the Lumberjack into wood planks that are required for more advanced buildings.',
		is_production: true,
		materials: {
			wood: 2
		},
		production: {
			woodplanks: 2
		},
		levels: 5,
		position: {
			x: 160,
			y: 840
		},
		cost: {
			coins: 5000,
			wood: 10,
			stones: 10
		},
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'Stone Quarry',
		handle: 'stonequarry',
		description: 'A Stone Quarry produces stone blocks that are the basis of any buildings you wish to construct.',
		is_production: true,
		production: {
			stones: 1
		},
		position: {
			x: 450,
			y: 200
		},
		levels: 5,
		cost: {
			coins: 2000,
			wood: 20
		},
		chance: {
			mosaic: 0.001,
			limestone: 0.01,
			sand: 0.05
		},
		requires: {
			settlement_level: 1
		}
	}, {
		name: 'Gold Mine',
		handle: 'goldmine',
		description: 'The Gold Mine extracts gold ore from the mountains you own (provided you own some). Gold ore can be smelted later into gold bars.',
		is_production: true,
		production: {
			goldore: 4
		},
		position: {
			x: 350,
			y: 240
		},
		levels: 3,
		chance: {
			gems: 0.0004,
			diamonds: 0.0004
		},
		cost: {
			coins: 10000,
			woodplanks: 20,
			stones: 20
		},
		requires: {
			settlement_level: 6
		}
	}, {
		name: 'Tournir Area',
		handle: 'tournir',
		description: 'The Tournir Area is providing your city with prestige, a chance to train your soldiers and has a chance of giving your city free coins.',
		large: true,
		is_municipal: true,
		is_production: true,
		production: {
			prestige: 1
		},
		position: {
			x: 440,
			y: 700
		},
		chance: {
			coins: 0.1
		},
		cost: {
			coins: 1000000,
			wood: 2000,
			bricks: 300,
			stones: 2000,
			weapons: 100,
			armor: 100,
			tools: 100
		},
		requires: {
			settlement_level: 40,
			buildings: {
				castle: 1,
				academy: 1
			}
		}
	}, {
		name: 'Coal Mine',
		handle: 'coalmine',
		description: 'The Coal Mine extracts coal from the mountains you own (provided you own some).',
		is_production: true,
		production: {
			coal: 4
		},
		position: {
			x: 560,
			y: 170
		},
		levels: 3,
		chance: {
			gems: 0.0001,
			diamonds: 0.0001
		},
		cost: {
			coins: 10000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 7
		}
	}, {
		name: 'Iron Mine',
		handle: 'ironmine',
		description: 'The Iron Mine extracts iron ore from the mountains you own (provided you own some). Iron ore can be smelted later into iron bars.',
		is_production: true,
		production: {
			ironore: 4
		},
		position: {
			x: 680,
			y: 160
		},
		levels: 3,
		chance: {
			gems: 0.0002,
			diamonds: 0.0002
		},
		cost: {
			coins: 10000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'Salt Mine',
		handle: 'saltmine',
		description: 'A Salt Mine extracts salt.',
		is_production: true,
		production: {
			salt: 3
		},
		position: {
			x: 230,
			y: 258
		},
		levels: 5,
		cost: {
			coins: 8000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 5
		}
	}, {
		name: 'Clay Mine',
		handle: 'claymine',
		description: 'The Clay Mine produces clay which is required for higher-level buildings.',
		is_production: true,
		production: {
			clay: 1
		},
		position: {
			x: 800,
			y: 230
		},
		levels: 5,
		cost: {
			coins: 5000,
			wood: 20,
			stones: 20
		},
		chance: {
			limestone: 0.01,
			sand: 0.1
		},
		requires: {
			settlement_level: 2
		}
	}, {
		name: 'Copper Mine',
		handle: 'coppermine',
		description: 'The copper mine extracts copper ore from the mountains you own (provided you own some). Copper ore can be smelted later into copper bars.',
		is_production: true,
		production: {
			copperore: 4
		},
		position: {
			x: 740,
			y: 100
		},
		levels: 3,
		chance: {
			gems: 0.0001,
			diamonds: 0.0002
		},
		cost: {
			coins: 10000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 5
		}
	}, {
		name: 'Flour Mill',
		handle: 'mill',
		description: 'The Flour Mill produces flour from the wheat cultivated by your Grain Farm.',
		is_production: true,
		production: {
			flour: 3
		},
		materials: {
			wheat: 2
		},
		position: {
			x: 1170,
			y: 500
		},
		cost: {
			coins: 10000,
			woodplanks: 20,
			stones: 20
		},
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'Bakery',
		handle: 'bakery',
		description: 'The Bakery creates bread from flour, thus providing your settlers with basic food.',
		is_production: true,
		production: {
			bread: 4
		},
		materials: {
			flour: 2
		},
		position: {
			x: 900,
			y: 300
		},
		levels: 3,
		cost: {
			coins: 15000,
			woodplanks: 30,
			stones: 30
		},
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'Pottery Workshop',
		handle: 'pottery',
		description: 'The Pottery Workshop uses a high-temperature kiln and clay to create pottery for the inhabitants of your settlement.',
		is_production: true,
		production: {
			pottery: 4
		},
		materials: {
			clay: 3
		},
		position: {
			x: 1360,
			y: 680
		},
		levels: 3,
		cost: {
			coins: 30000,
			woodplanks: 30,
			stones: 30,
			clay: 100
		},
		requires: {
			settlement_level: 8
		}
	}, {
		name: 'Gunpowder Mill',
		handle: 'gunpowdermill',
		description: 'A Gunpowder Mill is creating highly useful (and unstable) gunpowder from the sulphur found in your Charcoal Burner`s Hut.',
		is_production: true,
		production: {
			gunpowder: 1
		},
		materials: {
			sulphur: 10
		},
		position: {
			x: 1530,
			y: 800
		},
		levels: 3,
		cost: {
			coins: 30000,
			woodplanks: 30,
			stones: 30,
			bricks: 50,
			clay: 50,
			tools: 20
		},
		requires: {
			settlement_level: 26
		}
	}, {
		name: 'Armory',
		handle: 'armory',
		description: 'The Armory is a major building that produces weapons and armor for your soldiers. If you want to conquer other settlements, you will need to build one and keep it stocked with materials.',
		is_production: true,
		production: {
			weapons: 1,
			armor: 1
		},
		materials: {
			iron: 10,
			wood: 2,
			leather: 8,
			copper: 4
		},
		position: {
			x: 870,
			y: 120
		},
		levels: 3,
		cost: {
			coins: 50000,
			woodplanks: 100,
			stones: 100,
			tools: 20
		},
		requires: {
			settlement_level: 9
		}
	}, {
		name: 'Butcher',
		handle: 'butcher',
		description: 'The Butcher slaughters cattle for meat, providing food that is more nutritious. Hides will be processed further at the Tannery.',
		is_production: true,
		production: {
			meat: 3,
			hides: 2,
			tallow: 1
		},
		materials: [
			{
				pig: 1,
				cattle: 1,
				goat: 1
			}, {
				salt: 1
			}
		],
		position: {
			x: 1082,
			y: 297
		},
		levels: 5,
		cost: {
			coins: 20000,
			woodplanks: 40,
			stones: 40
		},
		requires: {
			settlement_level: 4
		}
	}, {
		name: 'Iron smelter',
		handle: 'ironsmelter',
		description: 'The Iron Smelter (or foundry) smelts iron ore into iron bars using coal, ready to be transformed into weapons.',
		is_production: true,
		production: {
			iron: 4
		},
		materials: {
			ironore: 4,
			coal: 2
		},
		chance: {
			steel: 0.05
		},
		position: {
			x: 1480,
			y: 130
		},
		levels: 5,
		cost: {
			coins: 40000,
			woodplanks: 40,
			stones: 50
		},
		requires: {
			settlement_level: 7
		}
	}, {
		name: 'Copper smelter',
		handle: 'coppersmelter',
		description: 'The Copper Smelter smelts copper ore into copper bars using coal.',
		is_production: true,
		production: {
			copper: 2
		},
		materials: {
			copperore: 4,
			coal: 1
		},
		position: {
			x: 483,
			y: 327
		},
		levels: 3,
		cost: {
			coins: 40000,
			woodplanks: 50,
			stones: 50
		},
		requires: {
			settlement_level: 8
		}
	}, {
		name: 'Gold smelter',
		handle: 'goldsmelter',
		description: 'The Gold Smelter smelts gold ore into gold bars using coal.',
		is_production: true,
		production: {
			gold: 1
		},
		materials: {
			goldore: 4,
			coal: 1
		},
		position: {
			x: 1320,
			y: 120
		},
		levels: 3,
		cost: {
			coins: 40000,
			woodplanks: 55,
			bricks: 5,
			stones: 55
		},
		requires: {
			settlement_level: 12
		}
	}, {
		name: 'Trapper`s Lodge',
		handle: 'trapper',
		description: 'The trapper captures wild animals and gathers their furs.',
		is_production: true,
		production: {
			furs: 2,
			meat: 1
		},
		position: {
			x: 140,
			y: 360
		},
		levels: 3,
		cost: {
			coins: 15000,
			wood: 40,
			stones: 40
		},
		requires: {
			settlement_level: 6
		}
	}, {
		name: 'Furrier`s Workshop',
		handle: 'furrier',
		description: 'The furrier uses furs from the Trapper`s Lodge mixed with salt and processes them into fur coats that will help your settlers during the cold winters.',
		is_production: true,
		production: {
			furcoats: 1
		},
		materials: {
			furs: 2,
			salt: 2
		},
		position: {
			x: 1355,
			y: 496
		},
		levels: 3,
		cost: {
			coins: 15000,
			woodplanks: 30,
			stones: 40
		},
		requires: {
			settlement_level: 9
		}
	}, {
		name: 'Clothing Factory',
		handle: 'clothingfactory',
		description: 'The Clothing Factory produces clothes for your settlement. You don`t want naked citizens, do you?',
		is_production: true,
		production: {
			clothes: 1
		},
		materials: {
			cottonfabric: 2
		},
		position: {
			x: 1400,
			y: 600
		},
		levels: 3,
		cost: {
			coins: 15000,
			wood: 40,
			bricks: 10,
			stones: 40
		},
		requires: {
			settlement_level: 15
		}
	}, {
		name: 'Weaver`s Hut',
		handle: 'weaver',
		description: 'The weaver uses a hefty amount of cotton to produce fabric for clothes.',
		is_production: true,
		production: {
			cottonfabric: 2
		},
		materials: {
			cotton: 4
		},
		position: {
			x: 1600,
			y: 900
		},
		levels: 3,
		cost: {
			coins: 10000,
			wood: 30,
			stones: 30
		},
		requires: {
			settlement_level: 12
		}
	}, {
		name: 'Tannery',
		handle: 'tannery',
		description: 'The Tannery produces leather clothes from processed animal hides.',
		is_production: true,
		production: {
			leather: 3
		},
		materials: {
			hides: 4,
			salt: 1
		},
		levels: 3,
		position: {
			x: 1490,
			y: 552
		},
		cost: {
			coins: 20000,
			wood: 35,
			stones: 40
		},
		requires: {
			settlement_level: 8
		}
	}, {
		name: 'Coffee roaster',
		handle: 'coffeeroaster',
		description: 'The Coffee Roaster uses the coffee beans from your Coffee Farm and processes them into coffee.',
		is_production: true,
		production: {
			coffee: 1
		},
		materials: {
			coffeebeans: 4
		},
		position: {
			x: 1620,
			y: 390
		},
		levels: 3,
		cost: {
			coins: 70000,
			woodplanks: 80,
			stones: 60,
			bricks: 30,
			tools: 20
		},
		requires: {
			settlement_level: 28,
			buildings: {
				tradingpost: 1
			}
		}
	}, {
		name: 'Sugar Mill',
		handle: 'sugarmill',
		description: 'The Sugar Mill processes any sugar cane you have in storage into sugar.',
		is_production: true,
		production: {
			sugar: 1
		},
		materials: {
			sugarcane: 4
		},
		position: {
			x: 1260,
			y: 740
		},
		levels: 3,
		cost: {
			coins: 70000,
			woodplanks: 80,
			stones: 60,
			bricks: 30,
			tools: 10
		},
		requires: {
			settlement_level: 26,
			buildings: {
				tradingpost: 1
			}
		}
	}, {
		name: 'Winery',
		handle: 'winery',
		description: 'The Winery uses the grapes from your Grapes Farm and processes them into wine. You will need to import the bottles from another settlement though.',
		is_production: true,
		production: {
			wine: 2
		},
		materials: [
			{
				barrels: 1,
				bottles: 1
			}, {
				grapes: 4
			}
		],
		chance: {
			alcohol: 0.01
		},
		position: {
			x: 1300,
			y: 860
		},
		levels: 5,
		cost: {
			coins: 50000,
			wood: 50,
			bricks: 10,
			stones: 40,
			tools: 10
		},
		requires: {
			settlement_level: 14
		}
	}, {
		name: 'Optician`s Shop',
		handle: 'opticiansworkshop',
		description: 'The optician uses copper and quartz to create glasses for your settlers.',
		is_production: true,
		production: {
			glasses: 1
		},
		materials: {
			copper: 2,
			glass: 2
		},
		position: {
			x: 1160,
			y: 620
		},
		levels: 3,
		cost: {
			coins: 81000,
			woodplanks: 70,
			stones: 70,
			bricks: 30,
			tools: 10
		},
		requires: {
			settlement_level: 24
		}
	}, {
		name: 'Paper Mill',
		handle: 'papermill',
		description: 'The Paper Mill uses wood to produce paper, which is used together with indigo to produce books at the Printing House.',
		is_production: true,
		production: {
			paper: 2
		},
		materials: {
			wood: 1
		},
		position: {
			x: 1600,
			y: 500
		},
		levels: 3,
		cost: {
			coins: 83000,
			woodplanks: 60,
			stones: 50,
			bricks: 30,
			tools: 10
		},
		requires: {
			settlement_level: 22
		}
	}, {
		name: 'Printing Press',
		handle: 'printingpress',
		description: 'The Printing Press produces books from paper using indigo ink.',
		is_production: true,
		production: {
			books: 1
		},
		materials: {
			paper: 4,
			indigo: 1
		},
		position: {
			x: 1260,
			y: 600
		},
		levels: 3,
		cost: {
			coins: 84000,
			woodplanks: 100,
			stones: 100,
			bricks: 30,
			tools: 10
		},
		requires: {
			settlement_level: 28
		}
	}, {
		name: 'Cosmetics',
		handle: 'cosmetics',
		description: '',
		is_production: true,
		production: {
			perfume: 1,
			soap: 1
		},
		materials: {
			roses: 8,
			tallow: 8,
			honey: 1,
			cocoa: 1,
			alcohol: 1
		},
		position: {
			x: 1480,
			y: 700
		},
		levels: 3,
		cost: {
			coins: 90000,
			woodplanks: 80,
			stones: 40,
			bricks: 20,
			tools: 10
		},
		requires: {
			settlement_level: 30,
			buildings: {
				tradingpost: 1
			}
		}
	}, {
		name: 'Redsmith`s Workshop',
		handle: 'redsmithsworkshop',
		description: 'The Redsmith`s Workshop processes copper and candles into candlesticks.',
		is_production: true,
		production: {
			candlesticks: 1
		},
		materials: {
			copper: 3,
			candles: 2
		},
		position: {
			x: 900,
			y: 180
		},
		levels: 3,
		cost: {
			coins: 75000,
			wood: 70,
			bricks: 30,
			stones: 50,
			tools: 10
		},
		requires: {
			settlement_level: 22
		}
	}, {
		name: 'Ropeyard',
		handle: 'ropeyard',
		description: 'The Ropeyard produces ropes that are needed for your city`s ships.',
		is_production: true,
		production: {
			ropes: 1
		},
		materials: {
			cotton: 2
		},
		position: {
			x: 1680,
			y: 780
		},
		levels: 3,
		cost: {
			coins: 15000,
			wood: 70,
			stones: 60,
			tools: 10
		},
		requires: {
			settlement_level: 10
		}
	}, {
		name: 'Glassworks',
		handle: 'glassworks',
		description: 'The Glassworks processes quartz into glass.',
		is_production: true,
		production: {
			glass: 1
		},
		materials: {
			quartz: 2,
			sand: 3,
			coal: 1
		},
		chance: {
			bottles: 0.2
		},
		position: {
			x: 1740,
			y: 420
		},
		levels: 3,
		cost: {
			coins: 50000,
			wood: 50,
			bricks: 10,
			stones: 80
		},
		requires: {
			settlement_level: 22
		}
	}, {
		name: 'Carpet Manufacturer',
		handle: 'carpetmanufacturer',
		description: 'The Carpet Manufacturer produces carpets.',
		is_production: true,
		production: {
			carpets: 1
		},
		materials: {
			cottonfabric: 4,
			indigo: 2
		},
		position: {
			x: 1380,
			y: 380
		},
		levels: 3,
		cost: {
			coins: 50000,
			wood: 50,
			bricks: 30,
			stones: 80,
			tools: 10
		},
		requires: {
			settlement_level: 26,
			buildings: {
				tradingpost: 1
			}
		}
	}, {
		name: 'Marzipan Workshop',
		handle: 'marzipanworkshop',
		description: 'The Marzipan Workshop uses milk, almonds and sugar from city storage to create delicious marzipan. Your settlers will definitely appreciate it.',
		is_production: true,
		production: {
			marzipan: 1
		},
		materials: {
			almonds: 2,
			sugar: 2,
			milk: 4
		},
		position: {
			x: 1440,
			y: 310
		},
		levels: 3,
		cost: {
			coins: 50000,
			wood: 50,
			bricks: 40,
			stones: 80,
			tools: 10
		},
		requires: {
			settlement_level: 26,
			buildings: {
				tradingpost: 1
			}
		}
	}, {
		name: 'Silk Weaver',
		handle: 'silkweaver',
		description: 'The Silk Weaver requires cotton, gold and silk and produces brocade robes.',
		is_production: true,
		production: {
			robes: 1
		},
		materials: {
			silk: 2,
			cotton: 1,
			gold: 2
		},
		position: {
			x: 1380,
			y: 760
		},
		levels: 3,
		cost: {
			coins: 50000,
			wood: 50,
			bricks: 30,
			stones: 80,
			tools: 10
		},
		requires: {
			settlement_level: 23,
			buildings: {
				tradingpost: 1
			}
		}
	}, {
		name: 'Quartz Mine',
		handle: 'quartzmine',
		description: 'The Quartz Mine provides your city with quartz.',
		is_production: true,
		production: {
			quartz: 2
		},
		position: {
			x: 150,
			y: 280
		},
		levels: 3,
		cost: {
			coins: 40000,
			wood: 50,
			bricks: 30,
			stones: 90
		},
		requires: {
			settlement_level: 16
		}
	}, {
		name: 'Apiary',
		handle: 'apiary',
		description: 'The Apiary produces bees wax for use in candles.',
		is_production: true,
		production: {
			wax: 2,
			honey: 1
		},
		position: {
			x: 1540,
			y: 190
		},
		levels: 3,
		cost: {
			coins: 40000,
			wood: 50,
			bricks: 30,
			stones: 40
		},
		requires: {
			settlement_level: 16
		}
	}, {
		name: 'Bee Hive',
		handle: 'beehive',
		description: 'The Bee Hive is required for an Apiary to produce bees wax.',
		position: {
			x: 1590,
			y: 240
		},
		cost: {
			coins: 2000,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 16
		}
	}, {
		name: 'Barrel Cooperage',
		handle: 'barrelcooperage',
		description: 'The Barrel Cooperage creates barrels from wood and iron.',
		is_production: true,
		production: {
			barrels: 2
		},
		materials: {
			wood: 3,
			iron: 1
		},
		position: {
			x: 1610,
			y: 710
		},
		levels: 3,
		cost: {
			coins: 25000,
			wood: 80,
			stones: 70,
			tools: 10
		},
		requires: {
			settlement_level: 9
		}
	}, {
		name: 'Brewery',
		handle: 'brewery',
		description: 'The Brewery brews beer from wheat. Beer is needed for higher-level hourses or your city`s navy.',
		is_production: true,
		production: {
			beer: 2
		},
		materials: {
			barrels: 1,
			wheat: 2
		},
		position: {
			x: 830,
			y: 760
		},
		chance: {
			alcohol: 0.01
		},
		levels: 3,
		cost: {
			coins: 25000,
			wood: 60,
			stones: 70
		},
		requires: {
			settlement_level: 9
		}
	}, {
		name: 'Candlemaker`s Hut',
		handle: 'candlemakersworkshop',
		description: 'The Candlemaker Hut produces candles for your settlers` houses.',
		is_production: true,
		production: {
			candles: 1
		},
		materials: {
			wax: 2,
			cotton: 1
		},
		position: {
			x: 1380,
			y: 180
		},
		levels: 3,
		cost: {
			coins: 45000,
			woodplanks: 80,
			stones: 60,
			bricks: 20,
			tools: 10
		},
		requires: {
			settlement_level: 20
		}
	}, {
		name: 'Catapult Workshop',
		handle: 'catapultworkshop',
		description: 'The Catapult Workshop builds catapults, which are the ultimate siege weapons.',
		is_production: true,
		production: {
			catapults: 1
		},
		materials: {
			wood: 100,
			steel: 12,
			iron: 20,
			stones: 30,
			coal: 5,
			woodplanks: 40,
			ropes: 10
		},
		position: {
			x: 1180,
			y: 100
		},
		levels: 3,
		cost: {
			coins: 250000,
			woodplanks: 200,
			stones: 300,
			bricks: 30,
			tools: 20
		},
		requires: {
			settlement_level: 20
		}
	}, {
		name: 'Cannon Foundry',
		handle: 'cannonfoundry',
		description: 'The Cannon Foundry is responsable with the manufacture of the city cannons.',
		is_production: true,
		production: {
			cannons: 1
		},
		materials: {
			wood: 70,
			copper: 30,
			iron: 10,
			coal: 20,
			steel: 15,
			woodplanks: 10,
			ropes: 2,
			gunpowder: 6
		},
		position: {
			x: 1250,
			y: 170
		},
		levels: 3,
		cost: {
			coins: 200000,
			woodplanks: 200,
			stones: 300,
			bricks: 30,
			tools: 20
		},
		requires: {
			settlement_level: 18
		}
	}, {
		name: 'Charcoal Burner`s Hut',
		handle: 'charcoalburnerhut',
		description: 'The Charcoal Burner`s Hut burns wood into coal and sulphur, which is needed by all your smelters.',
		is_production: true,
		production: {
			coal: 4,
			sulphur: 1
		},
		materials: {
			wood: 2
		},
		position: {
			x: 1450,
			y: 230
		},
		levels: 3,
		cost: {
			coins: 15000,
			wood: 50,
			stones: 50
		},
		requires: {
			settlement_level: 5
		}
	}, {
		name: 'House',
		handle: 'house1',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 5,
		cost: {
			wood: 10,
			coins: 1000
		},
		materials: {
			bread: 1
		},
		position: {
			x: 800,
			y: 320
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 1
		}
	}, {
		name: 'House',
		handle: 'house2',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 10,
		cost: {
			wood: 10,
			coins: 2000
		},
		materials: {
			bread: 1
		},
		position: {
			x: 840,
			y: 400
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 1
		}
	}, {
		name: 'House',
		handle: 'house3',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 15,
		cost: {
			woodplanks: 10,
			stones: 20,
			coins: 3000
		},
		materials: {
			bread: 1,
			meat: 1
		},
		position: {
			x: 920,
			y: 440
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'House',
		handle: 'house4',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 20,
		cost: {
			woodplanks: 10,
			stones: 20,
			coins: 4000
		},
		materials: {
			bread: 1,
			meat: 1,
			pottery: 1
		},
		position: {
			x: 850,
			y: 500
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 6,
			buildings: {
				church: 1
			}
		}
	}, {
		name: 'House',
		handle: 'house5',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 25,
		cost: {
			woodplanks: 25,
			stones: 35,
			coins: 5000
		},
		materials: {
			fish: 2,
			meat: 2,
			pottery: 1,
			beer: 1
		},
		position: {
			x: 960,
			y: 520
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 10,
			buildings: {
				church: 1
			}
		}
	}, {
		name: 'House',
		handle: 'house6',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 30,
		cost: {
			woodplanks: 30,
			stones: 45,
			bricks: 10,
			coins: 6000
		},
		materials: {
			meals: 1,
			pottery: 1
		},
		position: {
			x: 890,
			y: 600
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 16,
			buildings: {
				church: 2
			}
		}
	}, {
		name: 'House',
		handle: 'house7',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 35,
		cost: {
			woodplanks: 40,
			stones: 80,
			bricks: 15,
			coins: 7000
		},
		materials: {
			meals: 1,
			pottery: 1,
			candlesticks: 1
		},
		position: {
			x: 790,
			y: 640
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 20,
			buildings: {
				academy: 1
			}
		}
	}, {
		name: 'House',
		handle: 'house8',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 40,
		cost: {
			woodplanks: 50,
			stones: 100,
			bricks: 20,
			coins: 8000
		},
		materials: {
			meals: 1,
			milk: 1,
			pottery: 1,
			candlesticks: 1,
			furcoats: 1
		},
		position: {
			x: 690,
			y: 660
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 25,
			buildings: {
				academy: 2
			}
		}
	}, {
		name: 'House',
		handle: 'house9',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 50,
		cost: {
			woodplanks: 100,
			stones: 200,
			bricks: 25,
			coins: 10000
		},
		materials: {
			meals: 1,
			milk: 1,
			pottery: 1,
			candlesticks: 1,
			furcoats: 1,
			perfume: 1,
			soap: 1
		},
		position: {
			x: 770,
			y: 560
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 30,
			buildings: {
				academy: 2
			}
		}
	}, {
		name: 'House',
		handle: 'house10',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 60,
		cost: {
			woodplanks: 100,
			stones: 200,
			bricks: 30,
			coins: 10000
		},
		materials: {
			meals: 2,
			milk: 1,
			pottery: 1,
			candlesticks: 1,
			furcoats: 1,
			perfume: 1,
			soap: 1,
			robes: 1
		},
		position: {
			x: 640,
			y: 580
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 32,
			buildings: {
				church: 2,
				academy: 2
			}
		}
	}, {
		name: 'House',
		handle: 'house11',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 80,
		cost: {
			woodplanks: 100,
			stones: 200,
			bricks: 35,
			coins: 10000
		},
		materials: {
			meals: 2,
			milk: 1,
			pottery: 1,
			candlesticks: 1,
			furcoats: 1,
			perfume: 1,
			robes: 1,
			soap: 1,
			marzipan: 1
		},
		position: {
			x: 560,
			y: 400
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 36,
			buildings: {
				church: 2,
				academy: 2
			}
		}
	}, {
		name: 'House',
		handle: 'house12',
		description: 'Houses provide coins through taxes and space for your settlers.',
		is_housing: true,
		tax: 100,
		cost: {
			woodplanks: 100,
			stones: 200,
			bricks: 40,
			coins: 10000
		},
		materials: {
			meals: 3,
			milk: 1,
			pottery: 2,
			candlesticks: 1,
			furcoats: 1,
			perfume: 1,
			soap: 1,
			robes: 1,
			marzipan: 1,
			glasses: 1,
			jewelery: 1,
			champagne: 1
		},
		position: {
			x: 520,
			y: 600
		},
		levels: 6,
		visible_upgrades: true,
		requires: {
			settlement_level: 40,
			buildings: {
				church: 3,
				academy: 3,
				castle: 1,
				tournir: 1
			}
		}
	}, {
		name: 'Dates farm',
		handle: 'datesfarm',
		is_production: true,
		description: 'The Dates Farm cultivates dates for export.',
		production: {
			dates: 1
		},
		levels: 3,
		position: {
			x: 140,
			y: 440
		},
		cost: {
			coins: 40000,
			wood: 30,
			stones: 30
		},
		requires: {
			settlement_level: 36,
			buildings: {
				datesfield: 1
			}
		}
	}, {
		name: 'Dates field',
		handle: 'datesfield',
		description: 'An Dates Field is required for the Dates Farm to operate.',
		position: {
			x: 200,
			y: 490
		},
		cost: {
			coins: 5000,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 36
		}
	}, {
		name: 'Almonds farm',
		handle: 'almondsfarm',
		is_production: true,
		description: 'The Almonds Farm cultivates almonds for marzipan manufacture or export.',
		production: {
			almonds: 1
		},
		levels: 3,
		position: {
			x: 1100,
			y: 780
		},
		cost: {
			coins: 40000,
			wood: 30,
			stones: 30
		},
		requires: {
			settlement_level: 36,
			buildings: {
				almondsfield: 1
			}
		}
	}, {
		name: 'Almonds field',
		handle: 'almondsfield',
		description: 'An Almonds Field is required for the Almonds Farm to operate.',
		position: {
			x: 1160,
			y: 720
		},
		cost: {
			coins: 5000,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 36
		}
	}, {
		name: 'Cattle Farm',
		handle: 'cattlefarm',
		description: 'A Cattle Farm grows cattle so your settlers can eat food that is more nutritious than bread.',
		is_production: true,
		production: {
			cattle: 1,
			milk: 1
		},
		chance: {
			cheese: 0.01
		},
		levels: 3,
		materials: {
			herbs: 2
		},
		position: {
			x: 900,
			y: 860
		},
		cost: {
			coins: 10000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 3,
			buildings: {
				cattlefield: 1
			}
		}
	}, {
		name: 'Cattle field',
		handle: 'cattlefield',
		description: 'A Cattle Field is required for the Cattle Farm to operate.',
		is_production: true,
		position: {
			x: 830,
			y: 900
		},
		production: {
			herbs: 2
		},
		cost: {
			coins: 1000,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'Pig Farm',
		handle: 'pigfarm',
		description: 'A Pig Farm grows pigs so your settlers can eat food that is more nutritious than bread.',
		is_production: true,
		production: {
			pig: 1
		},
		levels: 3,
		materials: {
			herbs: 2
		},
		position: {
			x: 700,
			y: 800
		},
		cost: {
			coins: 15000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 3,
			buildings: {
				pigfield: 1
			}
		}
	}, {
		name: 'Pig field',
		handle: 'pigfield',
		description: 'A Pig Field is required for the Pig Farm to operate.',
		is_production: true,
		position: {
			x: 760,
			y: 850
		},
		production: {
			herbs: 2
		},
		cost: {
			coins: 1500,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 3
		}
	}, {
		name: 'Goat Farm',
		handle: 'goatfarm',
		description: 'The Goat Farm produces milk for marzipan, meat and hides.',
		is_production: true,
		production: {
			goat: 1,
			milk: 1
		},
		chance: {
			cheese: 0.01
		},
		materials: {
			herbs: 2
		},
		levels: 3,
		position: {
			x: 530,
			y: 940
		},
		cost: {
			coins: 15000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 10,
			buildings: {
				goatfield: 1
			}
		}
	}, {
		name: 'Goat field',
		handle: 'goatfield',
		description: 'A Goat Field is required for the Goat Farm to operate.',
		is_production: true,
		position: {
			x: 580,
			y: 880
		},
		production: {
			herbs: 2
		},
		cost: {
			coins: 1500,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 10
		}
	}, {
		name: 'Grain farm',
		handle: 'grainfarm',
		description: 'A Grain Farm cultivates wheat that will be later transformed into bread, and your settlers will live happily ever after.',
		is_production: true,
		production: {
			wheat: 2,
			herbs: 1
		},
		levels: 3,
		position: {
			x: 1027,
			y: 870
		},
		cost: {
			coins: 10000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 2,
			buildings: {
				grainfield: 1
			}
		}
	}, {
		name: 'Grain field',
		handle: 'grainfield',
		description: 'A Grain Field is required for the Grain Farm to operate.',
		position: {
			x: 1080,
			y: 910
		},
		cost: {
			coins: 1000,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 2
		}
	}, {
		name: 'Grapes farm',
		handle: 'grapesfarm',
		description: 'A Grapes Farm provides your city with grapes for wine.',
		is_production: true,
		production: {
			grapes: 2
		},
		levels: 3,
		position: {
			x: 1260,
			y: 940
		},
		cost: {
			coins: 15000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 16,
			buildings: {
				grapesfield: 1
			}
		}
	}, {
		name: 'Grapes field',
		handle: 'grapesfield',
		description: 'A Grapes Field is required for the Grapes Farm to operate.',
		position: {
			x: 1360,
			y: 920
		},
		cost: {
			coins: 1500,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 16
		}
	}, {
		name: 'Coffee farm',
		handle: 'coffeefarm',
		description: 'A Coffee Farm cultivates coffee beans in your city, ready to be processed into coffee.',
		is_production: true,
		production: {
			coffeebeans: 2,
			herbs: 1
		},
		levels: 3,
		position: {
			x: 1160,
			y: 920
		},
		cost: {
			coins: 60000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 36,
			buildings: {
				coffeefield: 1
			}
		}
	}, {
		name: 'Coffee field',
		handle: 'coffeefield',
		description: 'A Coffee Field is required for the Coffee Farm to operate.',
		position: {
			x: 1200,
			y: 860
		},
		cost: {
			coins: 6000,
			wood: 10,
			clay: 40
		},
		requires: {
			settlement_level: 36
		}
	}, {
		name: 'Cotton farm',
		handle: 'cottonfarm',
		description: 'A Cotton Farm provides your city with cotton.',
		is_production: true,
		production: {
			cotton: 2
		},
		levels: 3,
		position: {
			x: 347,
			y: 698
		},
		cost: {
			coins: 20000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 10,
			buildings: {
				cottonfield: 1
			}
		}
	}, {
		name: 'Cotton field',
		handle: 'cottonfield',
		description: 'A Cotton Field is required for the Cotton Farm to operate.',
		position: {
			x: 298,
			y: 746
		},
		cost: {
			coins: 2000,
			wood: 10,
			clay: 20
		},
		requires: {
			settlement_level: 10
		}
	}, {
		name: 'Silk farm',
		handle: 'silkfarm',
		description: 'A Silk Farm provides your city with silk.',
		is_production: true,
		production: {
			silk: 1
		},
		levels: 3,
		position: {
			x: 600,
			y: 700
		},
		cost: {
			coins: 80000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 28,
			buildings: {
				silkfield: 1
			}
		}
	}, {
		name: 'Silk field',
		handle: 'silkfield',
		description: 'A Silk Field is required for the Silk Farm to operate.',
		position: {
			x: 650,
			y: 750
		},
		cost: {
			coins: 8000,
			wood: 10,
			clay: 100
		},
		requires: {
			settlement_level: 28
		}
	}, {
		name: 'Sugar Cane Farm',
		handle: 'sugarfarm',
		description: 'A Sugar Cane Farm provides your city with sugar cane.',
		is_production: true,
		production: {
			sugarcane: 2,
			herbs: 1
		},
		levels: 3,
		position: {
			x: 410,
			y: 854
		},
		cost: {
			coins: 100000,
			wood: 20,
			stones: 20
		},
		requires: {
			settlement_level: 24,
			buildings: {
				academy: 1,
				sugarfield: 1
			}
		}
	}, {
		name: 'Sugar field',
		handle: 'sugarfield',
		description: 'A Sugar Field is required for the Sugar Farm to operate.',
		position: {
			x: 480,
			y: 880
		},
		cost: {
			coins: 10000,
			wood: 10,
			clay: 100
		},
		requires: {
			settlement_level: 24
		}
	}, {
		name: 'Indigo farm',
		handle: 'indigofarm',
		is_production: true,
		description: 'The Indigo Farm produces indigo that can be turned to ink and used to create books.',
		production: {
			indigo: 1,
			herbs: 1
		},
		levels: 3,
		position: {
			x: 240,
			y: 800
		},
		cost: {
			coins: 200000,
			wood: 30,
			stones: 30,
			clay: 30
		},
		requires: {
			settlement_level: 20,
			buildings: {
				indigofield: 1
			}
		}
	}, {
		name: 'Indigo field',
		handle: 'indigofield',
		description: 'An Indigo Field is required for the Indigo Farm to operate.',
		position: {
			x: 310,
			y: 840
		},
		cost: {
			coins: 10000,
			wood: 10,
			clay: 100
		},
		requires: {
			settlement_level: 20
		}
	}, {
		name: 'Tobacco farm',
		handle: 'tobaccofarm',
		is_production: true,
		description: '',
		production: {
			cigars: 1
		},
		materials: {
			tobacco: 2
		},
		levels: 3,
		position: {
			x: 1500,
			y: 882
		},
		cost: {
			coins: 200000,
			wood: 30,
			stones: 30,
			bricks: 30
		},
		requires: {
			settlement_level: 25,
			buildings: {
				tobaccofield: 1
			}
		}
	}, {
		name: 'Tobacco field',
		handle: 'tobaccofield',
		description: '',
		is_production: true,
		position: {
			x: 1430,
			y: 850
		},
		production: {
			tobacco: 1
		},
		cost: {
			coins: 10000,
			wood: 10,
			clay: 100
		},
		requires: {
			settlement_level: 20
		}
	}, {
		name: 'Rose Farm',
		handle: 'rosenursery',
		is_production: true,
		description: 'The Rose Farm produces roses which are needed to manufacture perfume.',
		production: {
			roses: 1,
			herbs: 1
		},
		levels: 3,
		position: {
			x: 360,
			y: 920
		},
		cost: {
			coins: 20000,
			wood: 50,
			stones: 50,
			clay: 50
		},
		requires: {
			settlement_level: 26,
			buildings: {
				academy: 1,
				rosefield: 1
			}
		}
	}, {
		name: 'Roses field',
		handle: 'rosefield',
		description: 'A Roses Field is required for the Rose Farm to operate.',
		position: {
			x: 270,
			y: 900
		},
		cost: {
			coins: 10000,
			wood: 10,
			clay: 100
		},
		requires: {
			settlement_level: 26
		}
	}, {
		name: 'Spice Farm',
		handle: 'spicefarm',
		is_production: true,
		description: 'The Spice Farm is responsable for the production of spices.',
		production: {
			spices: 1,
			herbs: 1
		},
		levels: 3,
		position: {
			x: 380,
			y: 790
		},
		cost: {
			coins: 200000,
			wood: 60,
			stones: 60,
			clay: 60
		},
		requires: {
			settlement_level: 32,
			buildings: {
				academy: 1,
				spicefield: 1
			}
		}
	}, {
		name: 'Spice field',
		handle: 'spicefield',
		description: 'A Spice Field is required for the Spice Farm to operate.',
		position: {
			x: 430,
			y: 750
		},
		cost: {
			coins: 20000,
			wood: 40,
			clay: 300
		},
		requires: {
			settlement_level: 32
		}
	}, {
		name: 'Toolmaker Workshop',
		handle: 'toolmaker',
		is_production: true,
		description: 'Tools are needed to construct higher-level buildings, and a Toolmaker Workshop will create those for your settlement.',
		production: {
			tools: 2
		},
		materials: {
			wood: 1,
			iron: 1,
			coal: 1,
			copper: 1
		},
		levels: 3,
		position: {
			x: 1640,
			y: 310
		},
		cost: {
			coins: 30000,
			wood: 80,
			stones: 80,
			clay: 60
		},
		requires: {
			settlement_level: 8
		}
	}, {
		name: 'Jeweler',
		handle: 'jeweler',
		is_production: true,
		description: 'The Jeweler processes pearls into jewelery for your settlers (and traders).',
		production: {
			jewelery: 1
		},
		materials: {
			pearls: 10
		},
		levels: 3,
		position: {
			x: 1600,
			y: 900
		},
		cost: {
			coins: 55000,
			wood: 60,
			stones: 60,
			bricks: 60,
			tools: 10
		},
		requires: {
			settlement_level: 20
		}
	}, {
		name: 'Cement Plant',
		handle: 'cementplant',
		is_production: true,
		description: '',
		production: {
			cement: 1
		},
		materials: {
			limestone: 4,
			sand: 5
		},
		levels: 3,
		position: {
			x: 1734,
			y: 330
		},
		cost: {
			coins: 50000,
			wood: 60,
			stones: 60,
			bricks: 60,
			tools: 10
		},
		requires: {
			settlement_level: 20
		}
	}, {
		name: 'Brickworks',
		handle: 'brickworks',
		description: '',
		is_production: true,
		production: {
			bricks: 2
		},
		materials: {
			clay: 3,
			coal: 1
		},
		position: {
			x: 1,
			y: 1
		},
		levels: 5,
		cost: {
			coins: 2000,
			wood: 20,
			stones: 10
		},
		requires: {
			settlement_level: 12,
			buildings: {
				claymine: 1
			}
		}
	}, {
		name: 'Uranium Mine',
		handle: 'uraniummine',
		description: '',
		is_production: true,
		production: {
			uranium: 1
		},
		position: {
			x: 1,
			y: 1
		},
		levels: 3,
		chance: {
			gems: 0.005,
			diamonds: 0.005
		},
		cost: {
			coins: 300000,
			wood: 100,
			stones: 100,
			steel: 100,
			bricks: 100
		},
		requires: {
			settlement_level: 30
		}
	}, {
		name: 'Cookhouse',
		handle: 'cookhouse',
		description: '',
		is_production: true,
		production: {
			meals: 2
		},
		materials: {
			bread: 2,
			meat: 2,
			fish: 2,
			wine: 1
		},
		position: {
			x: 1,
			y: 1
		},
		levels: 3,
		cost: {
			coins: 20000,
			wood: 100,
			stones: 20,
			bricks: 20,
			woodplanks: 10
		},
		requires: {
			settlement_level: 10
		}
	}];

/**
 * Width of the world in hexes.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.WORLD_SIZE_WIDTH = 64;

/**
 * Height of the world in hexes.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.WORLD_SIZE_HEIGHT = 64;

/**
 * Size of a world hex.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.WORLD_HEX_SIZE = 24;

/**
 * Whether to beautify the worldmap terrain.
 *
 * @constant
 * @default
 * @type {Boolean}
 */
civitas.WORLD_BEAUTIFY = true;

/**
 * Whether to display the worldmap grid.
 *
 * @constant
 * @default
 * @type {Boolean}
 */
civitas.WORLD_GRID = true;

/**
 * World generator roughness.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.WORLD_ROUGHNESS = 5;

/**
 * List of settlement types
 *
 * @constant
 * @default
 * @type {Array}
 */
civitas.SETTLEMENTS = [
	'city',
	'village',
	'metropolis',
	'camp'
];

/**
 * City settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.CITY = 0;

/**
 * Village settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.VILLAGE = 1;

/**
 * Metropolis settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.METROPOLIS = 2;

/**
 * Raider camp settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.CAMP = 3;

/**
 * Max number of settlements on a map.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_SETTLEMENTS = 100;

/**
 * Max number of settlement icons.
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.MAX_SETTLEMENT_ICONS = 3;

/**
 * List of possible world settlement names.
 *
 * @constant
 * @type {Array}
 */
civitas.SETTLEMENT_NAMES = [
	'Alexandria',
	'Rome',
	'Carthage',
	'Constantinople',
	'Karakorum',
	'Niniveh',
	'Damascus',
	'Thebes',
	'Men-nefer',
	'Peshawar',
	'Uruk',
	'Abydos',
	'Actium',
	'Tripolis',
	'Troia',
	'Chengdu',
	'Mombasa',
	'Apullum',
	'Byblos',
	'Abu',
	'Pi-Ramesses',
	'Djedu',
	'Kyrene',
	'Athens',
	'Menat Khufu',
	'Niani',
	'Novgorod',
	'Sarmizegetusa',
	'Sigiriya',
	'Selima Oasis',
	'Tournai',
	'Taruga',
	'Amarna',
	'Toledo',
	'Mogadishu',
	'Xinjiang',
	'Yinxu',
	'Bublidrus',
	'Mylyra',
	'Ialezus',
	'Thebeia',
	'Demaphos',
	'Smyrnione',
	'Dimonassa',
	'Cyrarnassus',
	'Posigeneia',
	'Kasmigeneia',
	'Khemdjumunein',
	'Sakpi',
	'Kersatennu',
	'Farsou',
	'Dehsa',
	'Djasumar',
	'Absaitunis',
	'Avsi',
	'Wasvarmeru',
	'Behdju',
	'Galamia',
	'Pekies',
	'VyVyrodari',
	'Viasseto',
	'Messibria',
	'Molfeserta',
	'Quanes',
	'Braga',
	'Seicer',
	'Legara',
	'Albadolid',
	'Getastela',
	'Drepanum',
	'Canusium',
	'Mogontiacum',
	'Leucarum',
	'Pautalia',
	'Scallabis',
	'Chernogan',
	'Yelatrov',
	'Novomoksary',
	'Chistongelsk',
	'Timaryevsk',
	'Naberkuta',
	'Koloyevka',
	'Obnirodvinsk',
	'Beloredimir',
	'Kaspikarino',
	'Troten',
	'Neunsee',
	'Weveltals',
	'Oudenhout',
	'Plailimar',
	'Puciennes',
	'Bernsloh',
	'Geiselkau',
	'Waterlina',
	'Clonkenny',
	'Terbommel',
	'Drachnisse',
	'Werdenthal',
	'Erzell',
	'Arrabona',
	'Ugernum',
	'Bulla Regia',
	'Umbracum',
	'Aquae Armenetiae',
	'Isara',
	'Regium Lepidum',
	'Aquisgranium',
	'Saint Petersburg',
	'Gerasa',
	'Besontio',
	'Rhegium',
	'Argentoratum',
	'Apamea',
	'Hadrianopolis',
	'Byzantium',
	'Ravenna',
	'Carnotum',
	'Podium Aniciense',
	'Beroe Augusta Trajana',
	'Dubris',
	'Avenio',
	'Luentinum',
	'Castra Nicia',
	'Crotona',
	'Concordia Sagittaria',
	'Vibo Valentia',
	'Portus',
	'Faventia',
	'Tchidimbo',
	'Concala',
	'Berlowa',
	'Bagangoua',
	'Bangamo',
	'Bossemlindao',
	'Boti',
	'Bonnamar',
	'Dilobunda',
	'Lupugani',
	'Mimomo',
	'Nkolabo',
	'Mindo',
	'Kindamno',
	'Kanyesisi',
	'Mwinirenje',
	'Tbouleang',
	'Kamphon',
	'Jamya',
	'Yogtar',
	'Ambu',
	'Kubak',
	'Wainlet',
	'Shwebyu',
	'Gaguio',
	'Cartangas',
	'Surakham',
	'Kratai',
	'Sa Pha',
	'My Tinh',
	'Neurau',
	'Hollatrenk',
	'Woluten',
	'Forwerpen',
	'Sarsir',
	'Pérission',
	'Alsfeld',
	'Goldburg',
	'Thurway',
	'Watertowel',
	'Hengeloopen',
	'Alkningen',
	'Mornach',
	'Gorpen',
	'Novoupa',
	'Ozyosinsk',
	'Cheregansk',
	'Sibanovsk',
	'Vserodvinsk',
	'Polelensk',
	'Novokugadan',
	'Belgovgrad',
	'Chelyakala',
	'Tovodsk',
	'Kensato',
	'Kurishiri',
	'Aridakoshi',
	'Pingguan',
	'Zoajiang',
	'Ulaanteeg',
	'Nomsai',
	'Tangye',
	'Chuncheon',
	'Ikju'
];

/**
 * List of possible ruler names for settlements and various other obscure
 * reasons.
 *
 * @type {Array}
 * @constant
 */
civitas.NAMES = [
	'Caesar',
	'Cronus',
	'Dido',
	'Genghis',
	'Khufu',
	'Musa I',
	'Sennacherib',
	'Pepi',
	'Hatshepsut',
	'Clovis',
	'Gilgamesh',
	'Dalai Lama',
	'Ashoka',
	'Charlemagne',
	'Darius',
	'Ivan III',
	'Qin Shi Huang',
	'Ozymandias',
	'Timur',
	'Pol Pot',
	'Napoleon',
	'Hirohito',
	'Ivan Sirko',
	'Peter the Great',
	'Pan',
	'Victor',
	'Lekan',
	'Sheamus',
	'Itumeleng',
	'Varya',
	'Gervas',
	'Stefanija',
	'Meera',
	'Sethunya',
	'Soupi',
	'Vestmar',
	'Numi',
	'Marteinn',
	'Saithor',
	'Haki',
	'Ragnar',
	'Qiao',
	'Zeng',
	'Zhan',
	'Guo',
	'Yan',
	'Zarpiya',
	'Hada',
	'Kikarnahsu',
	'Tarhuntapiya',
	'Karnapaka',
	'Dambi',
	'Silalluhi',
	'Zuwahallati',
	'Sakkummilla',
	'Hapu',
	'Ammalli',
	'Kawiya',
	'Nisasar',
	'Abba',
	'Rishabha',
	'Sena',
	'Kalpana',
	'Nupur',
	'Anu',
	'Parvati',
	'Rani',
	'Chandrama',
	'Dhani',
	'Gallus',
	'Flavius',
	'Decimus',
	'Titus',
	'Papia',
	'Aburia',
	'Volusia',
	'Macrinia',
	'Lucia',
	'Lucretia',
	'Dubov',
	'Filimonov',
	'Mikhail',
	'Larissa',
	'Zenaide',
	'Lenora',
	'Natasha',
	'Muhammet',
	'Haydar',
	'Hizir',
	'Orhan',
	'Huriye',
	'Fehime',
	'Seher',
	'Qadir',
	'Lim',
	'Yami',
	'Veasna',
	'Baadur',
	'Sharar',
	'Yuuta',
	'Hallie',
	'Anson',
	'Davis',
	'Ondina',
	'Zan',
	'Gibs',
	'Soth',
	'Naoki',
	'Hachirou',
	'Irmhild',
	'Thiago',
	'Stefano',
	'Gerardo',
	'Alonso',
	'Mario',
	'Consuela',
	'Graciela',
	'Alicia',
	'Mariangel',
	'Qimmiabruk',
	'Qajak',
	'Akrittok',
	'Kuk`uq',
	'Noahtakmiut',
	'Kinaktok',
	'Iluliaq',
	'Taktuq',
	'Aquutaq',
	'Tulugaq',
	'Uyarak',
	'Onartok',
	'Karpok',
	'Husain',
	'Farhan',
	'Umar',
	'Safiyya',
	'Yanduza',
	'Fatimah',
	'Tasufin',
	'Hammad'
];

/**
 * List of all available in-game events.
 * 
 * @constant
 * @type {Array}
 */
civitas.EVENTS = [{
	name: 'Great earthquake',
	description: 'A great earthquake sweeps across your city destroying the settlement`s BUILDING in the process.',
	chance: 0.00001,
	destroy: true
}, {
	name: 'Royal marriage',
	description: 'A marriage was arranged between a member of your family ' +
		'and the royal family of SETTLEMENT. This raises your influence on ' +
		'SETTLEMENT by INFLUENCE. Good job!',
	chance: 0.0001,
	raise: {
		influence: 10
	}
}, {
	name: 'Raiders attack',
	description: 'A band of raiders attacked the outskirts of your ' +
		'settlement. Repairing the affected buildings costs your settlement ' +
		'COINS coins.',
	chance: 0.0002,
	lower: {
		coins: 1000
	}
}, {
	name: 'Discovery',
	description: 'The engineers in your settlement made a great discovery ' +
		'which made you more famous, thus gaining FAME fame and RESEARCH ' +
		'research.',
	chance: 0.0004,
	raise: {
		fame: 100,
		research: 10
	}
}, {
	name: 'Foreign spy discovered',
	description: 'A spy from SETTLEMENT was found hiding in your ' +
		'settlement, as a reward for finding him you gain ESPIONAGE ' +
		'espionage.',
	chance: 0.002,
	raise: {
		espionage: 10
	}
}, {
	name: 'Your spy uncovered',
	description: 'One of your spies in SETTLEMENT was discovered, ' +
		'SETTLEMENT`s ruler is angry so you lose PRESTIGE prestige.',
	chance: 0.003,
	lower: {
		prestige: 10
	}
}];


/**
 * List of resource categories.
 * 
 * @constant
 * @default
 * @type {Array}
 */
civitas.RESOURCE_CATEGORIES = [
	'food',
	'construction',
	'animals',
	'industry',
	'military',
	'luxury',
	'exotic'
];

/**
 * List of all the resources available in-game.
 * 
 * @constant
 * @type {Object}
 */
civitas.RESOURCES = {
	coins: {
		name: 'Coins',
		category: 'virtual',
		toolbar: true
	},
	fame: {
		name: 'Fame',
		category: 'virtual'
	},
	prestige: {
		name: 'Prestige',
		category: 'virtual',
		toolbar: true
	},
	espionage: {
		name: 'Espionage',
		category: 'virtual'
	},
	research: {
		name: 'Research',
		category: 'virtual'
	},
	faith: {
		name: 'Faith',
		category: 'virtual'
	},
	alcohol: {
		name: 'Alcohol',
		price: 80,
		category: 'industry'
	},
	almonds: {
		name: 'Almonds',
		price: 180,
		category: 'exotic'
	},
	armor: {
		name: 'Armor',
		price: 220,
		category: 'military'
	},
	barrels: {
		name: 'Barrels',
		price: 60,
		category: 'industry'
	},
	beer: {
		name: 'Beer',
		price: 30,
		category: 'industry'
	},
	books: {
		name: 'Books',
		price: 100,
		category: 'luxury'
	},
	bottles: {
		name: 'Bottles',
		price: 10,
		category: 'industry'
	},
	bread: {
		name: 'Bread',
		price: 30,
		category: 'food',
		toolbar: true
	},
	bricks: {
		name: 'Bricks',
		price: 40,
		category: 'construction'
	},
	cement: {
		name: 'Cement',
		price: 100,
		category: 'construction'
	},
	candles: {
		name: 'Candles',
		price: 100,
		category: 'luxury'
	},
	candlesticks: {
		name: 'Candlesticks',
		price: 170,
		category: 'luxury'
	},
	cannons: {
		name: 'Cannons',
		price: 700,
		category: 'military'
	},
	carpets: {
		name: 'Carpets',
		price: 400,
		category: 'luxury'
	},
	catapults: {
		name: 'Catapults',
		price: 1200,
		category: 'military'
	},
	cattle: {
		name: 'Cattle',
		price: 43,
		category: 'animals'
	},
	champagne: {
		name: 'Champagne',
		price: 300,
		imported: true,
		category: 'luxury'
	},
	cheese: {
		name: 'Cheese',
		price: 130,
		category: 'food'
	},
	cigars: {
		name: 'Cigars',
		price: 290,
		category: 'luxury'
	},
	clay: {
		name: 'Clay',
		price: 20,
		category: 'construction',
		toolbar: true
	},
	clothes: {
		name: 'Clothes',
		price: 104,
		category: 'industry'
	},
	coal: {
		name: 'Coal',
		price: 36,
		category: 'industry'
	},
	cocoa: {
		name: 'Cocoa',
		price: 210,
		category: 'exotic'
	},
	coffee: {
		name: 'Coffee',
		price: 300,
		category: 'exotic'
	},
	coffeebeans: {
		name: 'Coffee Beans',
		price: 220,
		category: 'exotic'
	},
	copper: {
		name: 'Copper',
		price: 60,
		category: 'industry',
		toolbar: true
	},
	copperore: {
		name: 'Copper Ore',
		price: 43,
		category: 'industry'
	},
	corn: {
		name: 'Corn',
		price: 50,
		category: 'food'
	},
	cotton: {
		name: 'Cotton',
		price: 146,
		category: 'industry'
	},
	cottonfabric: {
		name: 'Fabric',
		price: 246,
		category: 'industry'
	},
	dates: {
		name: 'Dates',
		price: 160,
		category: 'exotic'
	},
	diamonds: {
		name: 'Diamonds',
		price: 900,
		category: 'luxury'
	},
	donkeys: {
		name: 'Donkeys',
		price: 90,
		imported: true,
		category: 'animals'
	},
	elephants: {
		name: 'Elephants',
		price: 150,
		imported: true,
		category: 'animals'
	},
	essentialoil: {
		name: 'Essential Oil',
		price: 370,
		imported: true,
		category: 'luxury'
	},
	fish: {
		name: 'Fish',
		price: 16,
		category: 'food'
	},
	flour: {
		name: 'Flour',
		price: 40,
		category: 'food'
	},
	furcoats: {
		name: 'Fur coats',
		price: 105,
		category: 'industry'
	},
	furs: {
		name: 'Furs',
		price: 78,
		category: 'industry'
	},
	gems: {
		name: 'Gems',
		price: 460,
		category: 'luxury'
	},
	glass: {
		name: 'Glass',
		price: 86,
		category: 'industry'
	},
	glasses: {
		name: 'Glasses',
		price: 140,
		category: 'luxury'
	},
	goat: {
		name: 'Goat',
		price: 55,
		category: 'animals'
	},
	gold: {
		name: 'Gold',
		price: 260,
		category: 'industry',
		toolbar: true
	},
	goldore: {
		name: 'Gold Ore',
		price: 80,
		category: 'industry'
	},
	grapes: {
		name: 'Grapes',
		price: 35,
		category: 'industry'
	},
	gunpowder: {
		name: 'Gunpowder',
		price: 420,
		category: 'military'
	},
	herbs: {
		name: 'Herbs',
		price: 18,
		category: 'industry'
	},
	hides: {
		name: 'Hides',
		price: 25,
		category: 'industry'
	},
	honey: {
		name: 'Honey',
		price: 180,
		category: 'luxury'
	},
	horses: {
		name: 'Horses',
		price: 100,
		imported: true,
		category: 'animals'
	},
	indigo: {
		name: 'Indigo',
		price: 80,
		category: 'exotic'
	},
	iron: {
		name: 'Iron',
		price: 82,
		category: 'industry',
		toolbar: true
	},
	ironore: {
		name: 'Iron Ore',
		price: 42,
		category: 'industry'
	},
	jewelery: {
		name: 'Jewelery',
		price: 900,
		category: 'luxury'
	},
	leather: {
		name: 'Leather',
		price: 60,
		category: 'industry'
	},
	limestone: {
		name: 'Limestone',
		price: 20,
		category: 'construction'
	},
	lithium: {
		name: 'Lithium',
		price: 260,
		imported: true,
		category: 'exotic'
	},
	marzipan: {
		name: 'Marzipan',
		price: 150,
		category: 'luxury'
	},
	meals: {
		name: 'Meals',
		price: 120,
		category: 'food'
	},
	meat: {
		name: 'Meat',
		price: 30,
		category: 'food',
		toolbar: true
	},
	microchips: {
		name: 'Microchips',
		price: 990,
		imported: true,
		category: 'industry'
	},
	milk: {
		name: 'Milk',
		price: 30,
		category: 'industry'
	},
	mosaic: {
		name: 'Mosaic',
		price: 200,
		category: 'construction'
	},
	oil: {
		name: 'Oil',
		price: 200,
		category: 'industry'
	},
	paper: {
		name: 'Paper',
		price: 70,
		category: 'luxury'
	},
	pearls: {
		name: 'Pearls',
		price: 450,
		category: 'luxury'
	},
	perfume: {
		name: 'Perfume',
		price: 305,
		category: 'luxury'
	},
	pig: {
		name: 'Pig',
		price: 55,
		category: 'animals'
	},
	plastics: {
		name: 'Plastics',
		price: 200,
		imported: true,
		category: 'industry'
	},
	pottery: {
		name: 'Pottery',
		price: 55,
		category: 'industry'
	},
	provisions: {
		name: 'Provisions',
		price: 300,
		category: 'military'
	},
	quartz: {
		name: 'Quartz',
		price: 18,
		category: 'industry'
	},
	robes: {
		name: 'Robes',
		price: 400,
		category: 'luxury'
	},
	ropes: {
		name: 'Ropes',
		price: 42,
		category: 'industry'
	},
	roses: {
		name: 'Roses',
		price: 70,
		category: 'luxury'
	},
	salt: {
		name: 'Salt',
		price: 20,
		category: 'industry',
		toolbar: true
	},
	sand: {
		name: 'Sand',
		price: 10,
		category: 'construction'
	},
	silk: {
		name: 'Silk',
		price: 320,
		category: 'exotic'
	},
	silverore: {
		name: 'Silver Ore',
		price: 120,
		imported: true,
		category: 'luxury'
	},
	silver: {
		name: 'Silver',
		price: 300,
		imported: true,
		category: 'luxury'
	},
	spices: {
		name: 'Spices',
		price: 285,
		category: 'exotic'
	},
	spyglasses: {
		name: 'Spyglasses',
		price: 280,
		imported: true,
		category: 'military'
	},
	soap: {
		name: 'Soap',
		price: 220,
		category: 'luxury'
	},
	statues: {
		name: 'Statues',
		price: 1200,
		imported: true,
		category: 'industry'
	},
	steel: {
		name: 'Steel',
		price: 160,
		imported: true,
		category: 'industry'
	},
	stones: {
		name: 'Stones',
		price: 16,
		category: 'construction',
		toolbar: true
	},
	sugar: {
		name: 'Sugar',
		price: 145,
		category: 'luxury'
	},
	sugarcane: {
		name: 'Sugarcane',
		price: 120,
		category: 'luxury'
	},
	sulphur: {
		name: 'Sulphur',
		price: 180,
		category: 'industry'
	},
	tallow: {
		name: 'Tallow',
		price: 10,
		category: 'industry'
	},
	tobacco: {
		name: 'Tobacco',
		price: 190,
		category: 'exotic'
	},
	tools: {
		name: 'Tools',
		price: 35,
		category: 'construction',
		toolbar: true
	},
	uranium: {
		name: 'Uranium',
		price: 850,
		imported: true,
		category: 'industry'
	},
	wax: {
		name: 'Wax',
		price: 40,
		category: 'luxury'
	},
	weapons: {
		name: 'Weapons',
		price: 220,
		category: 'military'
	},
	wheat: {
		name: 'Wheat',
		price: 25,
		category: 'food'
	},
	wine: {
		name: 'Wine',
		price: 95,
		category: 'luxury'
	},
	wood: {
		name: 'Wood',
		price: 20,
		category: 'construction',
		toolbar: true
	},
	woodplanks: {
		name: 'Wood Planks',
		price: 30,
		category: 'construction',
		toolbar: true
	}
};

/**
 * List of all obtainable game achievements.
 *
 * @constant
 * @type {Array}
 */
civitas.ACHIEVEMENTS = [
	{
		description: 'Develop your settlement to level 10.',
		name: 'Kiddo',
		handle: 'kiddo',
		conditions: {
			settlement_level: 10
		},
		points: 100
	}, {
		description: 'Develop your settlement to level 20.',
		name: 'Teen',
		handle: 'teen',
		conditions: {
			settlement_level: 20
		},
		points: 200
	}, {
		description: 'Develop your settlement to level 30.',
		name: 'On my own',
		handle: 'onmyown',
		conditions: {
			settlement_level: 30
		},
		points: 500
	}, {
		description: 'Develop your settlement to level 40.',
		name: 'Fear me',
		handle: 'fearme',
		conditions: {
			settlement_level: 40
		},
		points: 1000
	}, {
		description: 'Gather maximum espionage.',
		name: 'Anna Chapman',
		handle: 'chapman',
		conditions: {
			resources: {
				espionage: civitas.MAX_ESPIONAGE_VALUE
			}
		},
		points: 100
	}, {
		description: 'Gather maximum faith.',
		name: 'Jesus Christ',
		handle: 'jesus',
		conditions: {
			resources: {
				faith: civitas.MAX_FAITH_VALUE
			}
		},
		points: 100
	}, {
		description: 'Gather maximum prestige.',
		name: 'Your highness',
		handle: 'highness',
		conditions: {
			resources: {
				espionage: civitas.MAX_PRESTIGE_VALUE
			}
		},
		points: 100
	}, {
		description: 'Gather maximum research.',
		name: 'Albert Einstein',
		handle: 'eistein',
		conditions: {
			resources: {
				research: civitas.MAX_RESEARCH_VALUE
			}
		},
		points: 100
	}, {
		description: 'Gather 100k coins in your settlement.',
		name: 'Gatherer',
		handle: 'gatherer',
		conditions: {
			resources: {
				coins: 100000
			}
		},
		points: 100
	}, {
		description: 'Gather 500k coins in your settlement.',
		name: 'Ba dum tss',
		handle: 'badumtss',
		conditions: {
			resources: {
				coins: 500000
			}
		},
		points: 100
	}, {
		description: 'Gather 1M coins in your settlement.',
		name: 'Milionaire',
		handle: 'milionaire',
		conditions: {
			resources: {
				coins: 1000000
			}
		},
		points: 100
	}, {
		description: 'Gather 10M coins in your settlement.',
		name: 'Rockefeller',
		handle: 'rockefeller',
		conditions: {
			resources: {
				coins: 10000000
			}
		},
		points: 100
	}, {
		description: 'Gather 100M coins in your settlement.',
		name: 'Rottschild',
		handle: 'rottschild',
		conditions: {
			resources: {
				coins: 100000000
			}
		},
		points: 100
	}, {
		description: 'Gather 10k stones in your settlement.',
		name: 'Stone Age',
		handle: 'stoneage',
		conditions: {
			resources: {
				stones: 10000
			}
		},
		points: 100
	}, {
		description: 'Gather 10k wood in your settlement.',
		name: 'Woody the Woodpecker',
		handle: 'woody',
		conditions: {
			resources: {
				wood: 10000
			}
		},
		points: 100
	}, {
		description: 'Gather 10k meat in your settlement.',
		name: 'Animal killer',
		handle: 'animalkiller',
		conditions: {
			resources: {
				meat: 10000
			}
		},
		points: 100
	}, {
		description: 'Recruit 100 soldiers in your settlement.',
		name: 'Armed to the teeth',
		handle: 'armedteeth',
		conditions: {
			soldiers: 100
		},
		points: 100
	}, {
		description: 'Recruit 500 soldiers in your settlement.',
		name: 'Warfiend',
		handle: 'warfiend',
		conditions: {
			soldiers: 500
		},
		points: 200
	}, {
		description: 'Recruit 1000 soldiers in your settlement',
		name: 'Warlord',
		handle: 'warlord',
		conditions: {
			soldiers: 1000
		},
		points: 1000
	}, {
		description: 'Recruit 10 ships in your settlement.',
		name: 'Shipwrecked',
		handle: 'shipwrecked',
		conditions: {
			ships: 10
		},
		points: 100
	}, {
		description: 'Recruit 50 ships in your settlement.',
		name: 'Ship has sailed',
		handle: 'shipsailed',
		conditions: {
			ships: 50
		},
		points: 100
	}, {
		description: 'Recruit 100 ships in your settlement.',
		name: 'Captain Ahab',
		handle: 'ahab',
		conditions: {
			ships: 100
		},
		points: 1000
	}, {
		description: 'Gather 100 prestige.',
		name: 'Prestigious',
		handle: 'prestigious',
		conditions: {
			resources: {
				prestige: 100
			}
		},
		points: 100
	}, {
		description: 'Gather 500 prestige.',
		name: 'The God King',
		handle: 'godking',
		conditions: {
			resources: {
				prestige: 500
			}
		},
		points: 100
	}, {
		description: 'Gather 10 espionage.',
		name: 'You got Mossad-ed!',
		handle: 'mossad',
		conditions: {
			resources: {
				espionage: 10
			}
		},
		points: 10
	}, {
		description: 'Gather 100 espionage.',
		name: 'You got Snowden-ed!',
		handle: 'snowden',
		conditions: {
			resources: {
				espionage: 100
			}
		},
		points: 100
	}, {
		description: 'Gather 500 espionage.',
		name: 'I spy with my own eye',
		handle: 'ispy',
		conditions: {
			resources: {
				espionage: 500
			}
		},
		points: 100
	}, {
		description: 'Gather 10 research.',
		name: 'Initiate',
		handle: 'initiate',
		conditions: {
			resources: {
				research: 10
			}
		},
		points: 10
	}, {
		description: 'Gather 100 research.',
		name: 'Researcher',
		handle: 'researcher',
		conditions: {
			resources: {
				research: 100
			}
		},
		points: 100
	}, {
		description: 'Gather 500 research.',
		name: 'Searching',
		handle: 'searching',
		conditions: {
			resources: {
				research: 500
			}
		},
		points: 100
	}, {
		description: 'Gather 100 faith.',
		name: 'Faithful',
		handle: 'faithful',
		conditions: {
			resources: {
				faith: 100
			}
		},
		points: 100
	}, {
		description: 'Gather 500 faith.',
		name: 'Disciple',
		handle: 'disciple',
		conditions: {
			resources: {
				faith: 500
			}
		},
		points: 100
	}, {
		description: 'Build a Castle in your settlement.',
		name: 'Castlevania',
		handle: 'castlevania',
		conditions: {
			buildings: {
				castle: 1
			}
		},
		points: 400
	}, {
		description: 'Build a Church in your settlement.',
		name: 'Winston Churchill',
		handle: 'churchill',
		conditions: {
			buildings: {
				church: 1
			}
		},
		points: 100
	}, {
		description: 'Build an Academy in your settlement.',
		name: 'Academician',
		handle: 'academician',
		conditions: {
			buildings: {
				academy: 1
			}
		},
		points: 100
	}, {
		description: 'Build each of the mines (Iron, Gold, Copper and Salt).',
		name: 'All mine!',
		handle: 'allmine',
		conditions: {
			buildings: {
				ironmine: 1,
				goldmine: 1,
				coppermine: 1,
				saltmine: 1
			}
		},
		points: 200
	}, {
		description: 'Fill out all your storage space.',
		name: 'All filled up',
		handle: 'allfilledup',
		conditions: {
			storage: 0
		},
		points: 500
	}, {
		description: 'Build 10 catapults in your settlement.',
		name: 'Cat-a-pulter',
		handle: 'catapulter',
		conditions: {
			resources: {
				catapults: 10
			}
		},
		points: 200
	}, {
		description: 'Build an Embassy in your settlement.',
		name: 'Gandhi',
		handle: 'gandhi',
		conditions: {
			buildings: {
				embassy: 1
			}
		},
		points: 100
	}, {
		description: 'Get 100 achievements.',
		name: 'Sir Achievealot',
		handle: 'achievelot',
		conditions: {
			achievements: 100
		},
		points: 100
	}, {
		description: 'Recruit a mercenary army.',
		name: 'Merc',
		handle: 'merc',
		conditions: {
			mercenary: 1
		},
		points: 100
	}, {
		description: 'Reach 10 milion people in your settlement.',
		name: 'Megalopolis',
		handle: 'megalopolis',
		conditions: {
			population: 10000000
		},
		points: 200
	}, {
		description: 'Upgrade your settlement`s Academy to level 3.',
		name: 'Too much research',
		handle: 'toomuchresearch',
		conditions: {
			buildings: {
				academy: 3
			}
		},
		points: 200
	}, {
		description: 'Upgrade your settlement`s Castle to level 3.',
		name: 'Goldilocks',
		handle: 'goldilocks',
		conditions: {
			buildings: {
				castle: 3
			}
		},
		points: 500
	}, {
		description: 'Upgrade your settlement`s Church to level 3.',
		name: 'Cathedral',
		handle: 'cathedral',
		conditions: {
			buildings: {
				church: 3
			}
		},
		points: 300
	}, {
		description: 'Build a Tournir Area in your settlement.',
		name: 'Richard Lionheart',
		handle: 'lionheart',
		conditions: {
			buildings: {
				tournir: 1
			}
		},
		points: 1000
	}, {
		description: 'Send a caravan to another settlement.',
		name: 'Donkey Lord',
		handle: 'donkeylord',
		points: 100
	}, {
		description: 'Send a spy to another settlement.',
		name: 'Bond. James Bond.',
		handle: 'jamesbond',
		points: 100
	}, {
		description: 'Send an army to another settlement.',
		name: 'Warrior',
		handle: 'sendarmy',
		points: 100
	}, {
		description: 'Declare war to another settlement.',
		name: 'Warlord',
		handle: 'declarewar',
		points: 100
	}, {
		description: 'Propose to another settlement to join you.',
		name: 'The One to Rule Them All',
		handle: 'rulethemall',
		points: 100
	}, {
		description: 'Propose a pact to another settlement.',
		name: 'The Friendly',
		handle: 'friendly',
		points: 100
	}, {
		description: 'Propose an alliance to another settlement.',
		name: 'The Pacifist',
		handle: 'pacifist',
		points: 100
	}, {
		description: 'Win a battleground.',
		name: 'Conqueror',
		handle: 'conqueror',
		points: 20
	}, {
		description: 'Lose a battleground.',
		name: 'Foolish!',
		handle: 'foolish',
		points: 10
	}, {
		description: 'Convince another settlement to accept an alliance.',
		name: 'I got your back',
		handle: 'gotyourback',
		points: 200
	}, {
		description: 'Convince another settlement to accept a pact.',
		name: 'Pactish',
		handle: 'pactish',
		points: 200
	}, {
		description: 'Convince another settlement to join your settlement.',
		name: 'You are mine!',
		handle: 'youaremine',
		points: 500
	}, {
		description: 'Adopt Christianity as the religion of your settlement.',
		name: 'Church of Nativity',
		handle: 'nativity',
		conditions: {
			religion: 'christianity'
		},
		points: 100
	}, {
		description: 'Adopt Islam as the religion of your settlement.',
		name: 'Kaaba',
		handle: 'kaaba',
		conditions: {
			religion: 'islam'
		},
		points: 100
	}, {
		description: 'Adopt Judaism as the religion of your settlement.',
		name: 'Hanukkah',
		handle: 'hanukkah',
		conditions: {
			religion: 'judaism'
		},
		points: 100
	}, {
		description: 'Adopt Buddhism as the religion of your settlement.',
		name: 'Bodhisattva',
		handle: 'bodhisattva',
		conditions: {
			religion: 'buddhism'
		},
		points: 100
	}, {
		description: 'Adopt Hinduism as the religion of your settlement.',
		name: 'Bhagavad Gita',
		handle: 'gita',
		conditions: {
			religion: 'hinduism'
		},
		points: 100
	}, {
		description: 'Adopt Confucianism as the religion of your settlement.',
		name: 'Tiān',
		handle: 'tian',
		conditions: {
			religion: 'confucianism'
		},
		points: 100
	}, {
		description: 'Adopt Taoism as the religion of your settlement.',
		name: 'Laozi',
		handle: 'laozi',
		conditions: {
			religion: 'taoism'
		},
		points: 100
	}
];

/*
 * Items in Civitas
 * ================
 *
 * The items in Civitas follow a very simple rule: common is the worst type,
 * rare is good, epic is very good, legendary is for the gods and heroes.
 *
 * That's it for now.
 */

/**
 * Armor
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_TYPE_ARMOR = 1;

/**
 * Weapon
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_TYPE_WEAPON = 2;

/**
 * Other
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_TYPE_OTHER = 3

/**
 * Cloth armor
 *
 * @constant
 * @type {Number}
 */
civitas.ARMOR_TYPE_CLOTH = 1;

/**
 * Leather armor
 *
 * @constant
 * @type {Number}
 */
civitas.ARMOR_TYPE_LEATHER = 2;

/**
 * Mail armor
 *
 * @constant
 * @type {Number}
 */
civitas.ARMOR_TYPE_MAIL = 3;

/**
 * Plate armor
 *
 * @constant
 * @type {Number}
 */
civitas.ARMOR_TYPE_PLATE = 4;

/**
 * Melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE = 1;

/**
 * Ranged weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_RANGED = 2;

/**
 * Bow ranged weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_RANGED_BOW = 1;

/**
 * Crossbow ranged weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_RANGED_CROSSBOW = 2;

/**
 * Gun ranged weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_RANGED_GUN = 3;

/**
 * Thrown ranged weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_RANGED_THROWN = 4;

/**
 * Dagger melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_DAGGER = 1;

/**
 * One-handed axe melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_AXE_ONE_HAND = 2;

/**
 * Two-handed axe melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_AXE_TWO_HAND = 3;

/**
 * Fist melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_FIST = 4;

/**
 * One-handed mace melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_MACE_ONE_HAND = 5;

/**
 * Two-handed mace melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_MACE_TWO_HAND = 6;

/**
 * Polearm melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_POLEARM = 7;

/**
 * Staff melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_STAFF = 8;

/**
 * One-handed sword melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_SWORD_ONE_HAND = 9;

/**
 * Two-handed sword melee weapon
 *
 * @constant
 * @type {Number}
 */
civitas.WEAPON_TYPE_MELEE_SWORD_TWO_HAND = 10;

/**
 * Common quality, bad
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_QUALITY_COMMON = 1;

/**
 * Rare quality, good
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_QUALITY_RARE = 2;

/**
 * Epic quality, very good
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_QUALITY_EPIC = 3;

/**
 * Legendary quality, legen-wait for it-dary!
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_QUALITY_LEGENDARY = 4;

/**
 * Names of the types of item quality
 *
 * @constant
 * @type {Array}
 */
civitas.ITEM_QUALITY_LIST = [
	'',
	'Common',
	'Rare',
	'Epic',
	'Legendary'
];

/**
 * List of colors for each type of item quality
 *
 * @constant
 * @type {Array}
 */
civitas.ITEM_QUALITY_COLORS = [
	'',
	'#00ff00',
	'#0070ff',
	'#a335ee',
	'#ff8000'
];

/**
 * No actual slot, reserved
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_NONE = 0;

/**
 * Neck item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_NECK = 1;

/**
 * Head item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_HEAD = 2;

/**
 * Ring item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_RING = 3;

/**
 * Shoulder item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_SHOULDER = 4;

/**
 * Chestpiece item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_CHEST = 5;

/**
 * Leggings item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_LEGS = 6;

/**
 * Hands item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_HANDS = 7;

/**
 * Waist item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_WAIST = 8;

/**
 * Feet item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_FEET = 9;

/**
 * Main hand item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_MAIN_HAND = 10;

/**
 * Off hand item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_OFF_HAND = 11;

/**
 * Any hand item slot
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOT_ANY_HAND = 12;

/**
 * Number of item slots
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_SLOTS_NUM = 12;

/**
 * Number of backpack slots
 *
 * @constant
 * @type {Number}
 */
civitas.ITEM_BACKPACK_NUM = 6;

/**
 * Name of item slots
 *
 * @constant
 * @type {Array}
 */
civitas.ITEM_SLOTS_LIST = [
	'',
	'Neck',
	'Head',
	'Ring',
	'Shoulder',
	'Chest',
	'Legs',
	'Hands',
	'Waist',
	'Feet',
	'Main Hand',
	'Off Hand',
	''
];

/**
 * Random items
 *
 * @constant
 * @type {Array}
 */
civitas.RANDOM_UNCOMMON = [
	{
		name: 'ITEM of Spirit',
		stats: {
			spirit: 0
		}
	}, {
		name: 'ITEM of Intellect',
		stats: {
			intellect: 0
		}
	}, {
		name: 'ITEM of Strength',
		stats: {
			strength: 0
		}
	}, {
		name: 'ITEM of Stamina',
		stats: {
			spirit: 0
		}
	}, {
		name: 'ITEM of Agility',
		stats: {
			agility: 0
		}
	}, {
		name: 'ITEM of the Tiger',
		stats: {
			strength: 0,
			agility: 0
		}
	}, {
		name: 'ITEM of the Bear',
		stats: {
			strength: 0,
			stamina: 0
		}
	}, {
		name: 'ITEM of the Gorilla',
		stats: {
			strength: 0,
			intellect: 0
		}
	}, {
		name: 'ITEM of the Boar',
		stats: {
			strength: 0,
			spirit: 0
		}
	}, {
		name: 'ITEM of the Monkey',
		stats: {
			agility: 0,
			stamina: 0
		}
	}, {
		name: 'ITEM of the Falcon',
		stats: {
			agility: 0,
			intellect: 0
		}
	}, {
		name: 'ITEM of the Wolf',
		stats: {
			agility: 0,
			spirit: 0
		}
	}, {
		name: 'ITEM of the Eagle',
		stats: {
			stamina: 0,
			intellect: 0
		}
	}, {
		name: 'ITEM of the Whale',
		stats: {
			stamina: 0,
			spirit: 0
		}
	}, {
		name: 'ITEM of the Owl',
		stats: {
			intellect: 0,
			spirit: 0
		}
	}, {
		name: 'ITEM of the Bandit',
		stats: {
			agility: 0,
			stamina: 0,
			attackPower: 0
		}
	}, {
		name: 'ITEM of the Beast',
		stats: {
			agility: 0,
			strength: 0,
			stamina: 0
		}
	}
];

/**
 * Weapon items
 *
 * @constant
 * @type {Object}
 */
civitas.ITEM_WEAPON_DAGGER_WICKED = {
	name: 'Wicked Dagger',
	id: 1,
	stats: {
		damageMin: 0,
		damageMax: 2,
		speed: 1.60
	},
	slot: civitas.ITEM_SLOT_ANY_HAND,
	type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_COMMON,
	cost: 1
};

civitas.ITEM_WEAPON_DAGGER_DIRK = {
	name: 'Wicked Dirk',
	id: 2,
	stats: {
		damageMin: 1,
		damageMax: 3,
		speed: 1.60
	},
	slot: civitas.ITEM_SLOT_ANY_HAND,
	type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_COMMON,
	cost: 1.2
};

civitas.ITEM_WEAPON_AXE_SMALL = {
	name: 'Small Axe',
	id: 3,
	stats: {
		damageMin: 3,
		damageMax: 10,
		speed: 1.60
	},
	slot: civitas.ITEM_SLOT_ANY_HAND,
	type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_COMMON,
	cost: 2.2
};

civitas.ITEM_WEAPON_SWORD_SMALL = {
	name: 'Small Sword',
	id: 4,
	stats: {
		damageMin: 2,
		damageMax: 4,
		speed: 1.60
	},
	slot: civitas.ITEM_SLOT_ANY_HAND,
	type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_COMMON,
	cost: 2.2
};

civitas.ITEM_WEAPON_BUCKLER_SMALL = {
	name: 'Small Buckler',
	id: 5,
	stats: {
		armor: 10
	},
	slot: civitas.ITEM_SLOT_OFF_HAND,
	quality: civitas.ITEM_QUALITY_COMMON,
	cost: 2.2
};

civitas.ITEM_EXCALIBUR = {
	name: 'Excalibur',
	id: 6,
	stats: {
		damageMin: 10,
		damageMax: 50,
		speed: 1.0,
		agility: 20,
		stamina: 10,
		strength: 30
	},
	slot: civitas.ITEM_SLOT_MAIN_HAND,
	type: civitas.ITEM_TYPE_WEAPON,
	secondary_type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_LEGENDARY,
	cost: 1
};

civitas.ITEM_CROWN_OF_KINGS = {
	name: 'Crown of Kings',
	id: 7,
	stats: {
		armor: 10,
		stamina: 10,
		strength: 30
	},
	slot: civitas.ITEM_SLOT_HEAD,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_RARE,
	cost: 1
};

civitas.ITEM_BULWARK_OF_GODS = {
	name: 'The Bulwark of Gods',
	id: 8,
	stats: {
		armor: 100,
		stamina: 20,
		strength: 50
	},
	slot: civitas.ITEM_SLOT_OFF_HAND,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_EPIC,
	cost: 1
};

civitas.ITEM_CHESTPIECE_OF_ZEUS = {
	name: 'Chestpiece of Zeus',
	id: 9,
	stats: {
		armor: 200,
		stamina: 30,
		agility: 20,
		strength: 20
	},
	slot: civitas.ITEM_SLOT_CHEST,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_EPIC,
	cost: 1
};

civitas.ITEM_ARCHAIC_WAIST_BAND = {
	name: 'Archaic Waist Band',
	id: 10,
	stats: {
		armor: 5,
		stamina: 3,
		strength: 2,
		intellect: 2
	},
	slot: civitas.ITEM_SLOT_WAIST,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_RARE,
	cost: 1
};

civitas.ITEM_ALCMENE_BAND = {
	name: 'Alcmene Band',
	id: 11,
	stats: {
		armor: 2,
		stamina: 2,
		strength: 1,
		agility: 2,
		intellect: 1,
		spirit: 10
	},
	slot: civitas.ITEM_SLOT_RING,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_EPIC,
	cost: 1
};

civitas.ITEM_SUN_NECKLACE = {
	name: 'Sun Necklace',
	flavour: 'From Amun Ra to his beloved son.',
	id: 11,
	stats: {
		armor: 4,
		stamina: 2,
		strength: 1,
		intellect: 10,
		spirit: 1
	},
	slot: civitas.ITEM_SLOT_NECK,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_LEGENDARY,
	cost: 1
};

civitas.ITEM_TROJAN_BASTARD_SWORD = {
	name: 'Trojan Bastard Sword',
	flavour: 'Hector`s sword, dropped by the fallen Trojan prince.',
	id: 12,
	stats: {
		damageMin: 8,
		damageMax: 34,
		speed: 1.3,
		stamina: 15,
		strength: 10
	},
	slot: civitas.ITEM_SLOT_MAIN_HAND,
	type: civitas.ITEM_TYPE_WEAPON,
	secondary_type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_LEGENDARY,
	cost: 1
};

civitas.ITEM_SPEAR_OF_DESTINY = {
	name: 'Spear of Destiny',
	flavour: 'The spear that befell the Trojan prince, Hector.',
	id: 13,
	stats: {
		damageMin: 25,
		damageMax: 90,
		speed: 2,
		stamina: 40,
		strength: 3
	},
	slot: civitas.ITEM_SLOT_MAIN_HAND,
	type: civitas.ITEM_TYPE_WEAPON,
	secondary_type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_LEGENDARY,
	cost: 1
};

civitas.ITEM_GOLDEN_KATANA = {
	name: 'Golden Katana',
	id: 14,
	stats: {
		damageMin: 10,
		damageMax: 20,
		speed: 1.1,
		stamina: 10,
		agility: 20,
		strength: 5
	},
	slot: civitas.ITEM_SLOT_OFF_HAND,
	type: civitas.ITEM_TYPE_WEAPON,
	secondary_type: civitas.WEAPON_TYPE_MELEE,
	quality: civitas.ITEM_QUALITY_RARE,
	cost: 1
};

civitas.ITEM_ETHEREAL_BOOTS = {
	name: 'Ethereal Boots',
	id: 15,
	stats: {
		armor: 6,
		strength: 10,
		agility: 10
	},
	slot: civitas.ITEM_SLOT_FEET,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_RARE,
	cost: 1
};

civitas.ITEM_SHOULDERPADS_OF_VALOR = {
	name: 'Shoulderpads of Valor',
	id: 16,
	stats: {
		armor: 15,
		strength: 20,
		stamina: 10
	},
	slot: civitas.ITEM_SLOT_SHOULDER,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_COMMON,
	cost: 1
};

civitas.ITEM_MOUNTAIN_TROLLS = {
	name: 'Mountain Trolls',
	id: 17,
	stats: {
		armor: 25,
		agility: 10,
		stamina: 30
	},
	slot: civitas.ITEM_SLOT_LEGS,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_EPIC,
	cost: 1
};

civitas.ITEM_GAUNTLETS_OF_GHASTLY_GLARE = {
	name: 'Gauntlets of Ghastly Glare',
	flavour: 'Ghastly indeed ...',
	id: 18,
	stats: {
		armor: 10,
		strength: 20,
		stamina: 2,
		intellect: 30
	},
	slot: civitas.ITEM_SLOT_HANDS,
	type: civitas.ITEM_TYPE_ARMOR,
	secondary_type: civitas.ARMOR_TYPE_PLATE,
	quality: civitas.ITEM_QUALITY_EPIC,
	cost: 1
};

/**
 * Warrior class
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.HERO_CLASS_WARRIOR = 1;

/**
 * Mage class
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.HERO_CLASS_MAGE = 2;

/**
 * Druid class
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.HERO_CLASS_DRUID = 3;

/**
 * Priest class
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.HERO_CLASS_PRIEST = 4;

/**
 * Rogue class
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.HERO_CLASS_ROGUE = 5;

/**
 * Shaman class
 *
 * @constant
 * @default
 * @type {Number}
 */
civitas.HERO_CLASS_SHAMAN = 6;

/**
 * List of names for hero classes
 *
 * @constant
 * @default
 * @type {Array}
 */
civitas.HERO_CLASS_LIST = [
	'',
	'Warrior',
	'Mage',
	'Druid',
	'Priest',
	'Rogue',
	'Shaman'
];

/**
 * List of in-game heroes.
 *
 * @constant
 * @type {Object}
 */
civitas.HEROES = {
	1: {
		name: 'Achilles',
		description: 'Achilles is a Greek hero of the Trojan War and the central character and ' +
			'greatest warrior of Homer`s Iliad. His mother is the immortal nymph Thetis, and ' +
			'his father, the mortal Peleus, is the king of the Myrmidons.',
		price: 5000000,
		link: 'https://en.wikipedia.org/wiki/Achilles',
		stats: {
			strength: 10,
			stamina: 10,
			agility: 10,
			spirit: 5,
			intellect: 7
		},
		class: civitas.HERO_CLASS_WARRIOR,
		items: [
			civitas.ITEM_TROJAN_BASTARD_SWORD
		],
		backpack: [
		]
	},
	2: {
		name: 'Hector',
		description: 'In Greek mythology and Roman Mythology, Hector is a Trojan prince and ' +
			'the greatest fighter for Troy in the Trojan War. As the first-born son of King ' +
			'Priam and Queen Hecuba, who was a descendant of Dardanus and Tros, the founder ' +
			'of Troy, he is a prince of the royal house and the heir apparent to his father`s ' +
			'throne.',
		price: 4000000,
		link: 'https://en.wikipedia.org/wiki/Hector',
		stats: {
			strength: 8,
			stamina: 10,
			agility: 6,
			spirit: 4,
			intellect: 6
		},
		class: civitas.HERO_CLASS_WARRIOR,
		items: [
			civitas.ITEM_EXCALIBUR,
			civitas.ITEM_GOLDEN_KATANA
		],
		backpack: [
		]
	},
	3: {
		name: 'Hannibal',
		description: 'Hannibal Barca is a Carthaginian general, considered one of the greatest ' +
			'military commanders in history.',
		price: 3000000,
		link: 'https://en.wikipedia.org/wiki/Hannibal',
		stats: {
			strength: 7,
			stamina: 7,
			agility: 4,
			spirit: 2,
			intellect: 9
		},
		class: civitas.HERO_CLASS_WARRIOR,
		items: [
		],
		backpack: [
		]
	},
	4: {
		name: 'Heracles',
		description: 'Heracles is a divine hero in Greek mythology, the son of Zeus and ' +
			'Alcmene, foster son of Amphitryon and great-grandson and half-brother (as they ' +
			'are both sired by the god Zeus) of Perseus.<br /><br />He is the greatest of the Greek heroes, ' +
			'a paragon of masculinity, the ancestor of royal clans who claim to be Heracleidae, ' +
			'and a champion of the Olympian order against chthonic monsters.',
		price: 5000000,
		link: 'https://en.wikipedia.org/wiki/Heracles',
		stats: {
			strength: 9,
			stamina: 9,
			agility: 6,
			spirit: 7,
			intellect: 9
		},
		class: civitas.HERO_CLASS_WARRIOR,
		items: [
			civitas.ITEM_SPEAR_OF_DESTINY,
			civitas.ITEM_CROWN_OF_KINGS,
			civitas.ITEM_BULWARK_OF_GODS,
			civitas.ITEM_CHESTPIECE_OF_ZEUS,
			civitas.ITEM_ARCHAIC_WAIST_BAND,
			civitas.ITEM_ALCMENE_BAND,
			civitas.ITEM_SUN_NECKLACE,
			civitas.ITEM_ETHEREAL_BOOTS,
			civitas.ITEM_SHOULDERPADS_OF_VALOR,
			civitas.ITEM_MOUNTAIN_TROLLS,
			civitas.ITEM_GAUNTLETS_OF_GHASTLY_GLARE
		],
		backpack: [
		]
	},
	5: {
		name: 'Akhenaten',
		description: 'Akhenaten, known before the fifth year of his reign as Amenhotep IV ' +
			'(sometimes given its Greek form, Amenophis IV, and meaning "Amun Is Satisfied"), ' +
			'is an Ancient Egyptian pharaoh of the 18th Dynasty who ruled for 17 years.',
		price: 1000000,
		link: 'https://en.wikipedia.org/wiki/Akhenaten',
		stats: {
			strength: 4,
			stamina: 4,
			agility: 8,
			spirit: 9,
			intellect: 9
		},
		class: civitas.HERO_CLASS_WARRIOR,
		items: [
		],
		backpack: [
		]
	}
};

/**
 * Utils object.
 * @license GPLv3
 * @mixin
 */
civitas.utils = {
	get_neighbours: function(y, x) {
		if (x % 2 == 0) {
			return [
			    {
			    	x: x+1,
			    	y: y
			    }, {
			    	x: x+1,
			    	y: y-1
			    }, {
			    	x: x,
			    	y: y-1
			    }, {
			    	x: x-1,
			    	y: y
			    }, {
			    	x: x-1,
			    	y: y-1 // y + 1
			    }, {
			    	x: x,
			    	y: y+1
			    }
			]
		} else {
			return [
			    {
			    	x: x+1,
			    	y: y
			    }, {
			    	x: x+1,
			    	y: y+1
			    }, {
			    	x: x,
			    	y: y-1
			    }, {
			    	x: x-1,
			    	y: y
			    }, {
			    	x: x-1,
			    	y: y+1
			    }, {
			    	x: x,
			    	y: y+1
			    }
			]
		}
	},

	get_random_color: function() {
		let color = (Math.random() * 250) + 1;
		let colors = Math.random() * 255;
		return "hsl(" + (color * (360 / colors) % 360) + ", 50%, 50%)";
	},

	is_virtual_resource: function(resource) {
		if (typeof civitas.RESOURCES[resource] !== undefined) {
			if (civitas.RESOURCES[resource].category === 'virtual') {
 				return true;
			}
		}
		return false;
	},

	/**
	 * Get the total damage points of a hero, modified by the items
	 * he's using.
	 *
	 * @param {Object} hero
	 * @returns {Object}
	 */
	get_damage_points: function(hero) {
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
			if (hero.items[i].type === civitas.ITEM_TYPE_WEAPON) {
				damage_min += hero.items[i].stats.damageMin + damage_val;
				damage_max += hero.items[i].stats.damageMax + damage_val;
			}
		}
		return {
			value: damage_val,
			min: damage_min !== 0 ? damage_min : 1,
			max: damage_max !== 0 ? damage_max : damage_val
		}
	},

	/**
	 * Get the total mana points of a hero, modified by the items
	 * he's using.
	 *
	 * @param {Object} hero
	 * @returns {Number}
	 */
	get_mana_points: function(hero) {
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
	},

	/**
	 * Get the total health points of a hero, modified by the items
	 * he's using.
	 *
	 * @param {Object} hero
	 * @returns {Number}
	 */
	get_health_points: function(hero) {
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
	},

	/**
	 * Check if resource exists.
	 *
	 * @param {String} resource
	 * @returns {Boolean}
	 */
	resource_exists: function(resource) {
		for (let item in civitas.RESOURCES) {
			if (item === resource) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Get the distance between two points.
	 *
	 * @param {Number} source
	 * @param {Number} destination
	 * @returns {Number}
	 */
	get_distance: function(source, destination) {
		return Math.floor(Math.sqrt(Math.pow(destination.x - source.x, 2) + Math.pow(destination.y - source.y, 2))) * 100;
	},

	/**
	 * Get the distance between two points in days
	 *
	 * @param {Number} source
	 * @param {Number} destination
	 * @returns {Number}
	 */
	get_distance_in_days: function(source, destination) {
		return Math.floor((Math.sqrt(Math.pow(destination.x - source.x, 2) + Math.pow(destination.y - source.y, 2)) * 100) / 15);
	},

	/**
	 * Format a timestamp to a more human form (x ago).
	 *
	 * @param {Number} time
	 * @returns {Number}
	 */
	time_since: function(time) {
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
	},

	/**
	 * Round the number to nearest 10.
	 *
	 * @param {Number} value
	 * @returns {Number}
	 */
	get_up_number: function(value) {
		return Math.floor(value / 10) * 10;
	},

	/**
	 * Return a random number between min and max.
	 *
	 * @param {Number} min
	 * @param {Number} max
	 * @returns {Number}
	 */
	get_random: function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	/**
	 * Return a random number based on importance.
	 *
	 * @param {Number} importance
	 * @returns {Number}
	 */
	get_random_by_importance: function(importance) {
		return civitas.utils.get_up_number(
			civitas.utils.get_random(
				Math.floor(Math.random() * importance) * 10 + 10,
				Math.floor(Math.random() * importance) * 10 + 20
			)
		);
	},

	/**
	 * Return the resource name by handle.
	 *
	 * @param {String} handle
	 * @returns {String}
	 */
	get_resource_name: function(handle) {
		return civitas.RESOURCES[handle].name;
	},

	/**
	 * Calculate the resource price for the specified amount minus the discount.
	 * 
	 * @param {Number} amount
	 * @param {String} resource
	 * @param {Number} discount
	 * @returns {Number}
	 */
	calc_price_minus_discount: function (amount, resource, discount) {
		return Math.ceil(Math.ceil(civitas.RESOURCES[resource].price - discount) * amount);
	},

	/**
	 * Calculate the resource price for the specified amount.
	 * 
	 * @param {Number} amount
	 * @param {String} resource
	 * @returns {Number}
	 */
	calc_price: function (amount, resource) {
		return Math.ceil(amount * (civitas.RESOURCES[resource].price));
	},

	/**
	 * Calculate the resource price for the specified amount plus the discount.
	 * 
	 * @param {Number} amount
	 * @param {String} resource
	 * @param {Number} discount
	 * @returns {Number}
	 */
	calc_price_plus_discount: function (amount, resource, discount) {
		return Math.ceil(Math.ceil(civitas.RESOURCES[resource].price + discount) * amount);
	},

	/**
	 * Format the current time.
	 * 
	 * @returns {String}
	 */
	get_now: function () {
		let today = new Date();
		let hh = today.getHours();
		let mm = today.getMinutes();
		let ss = today.getSeconds();
		return hh + ':' + mm + ':' + ss;
	},

	/**
	 * Format a number so that it's more user-friendly.
	 *
	 * @returns {String}
	 */
	nice_numbers: function(num) {
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
	},

	/**
	 * Return a random unique array element.
	 *
	 * @param {Array} from
	 * @returns {String|Number}
	 */
	get_random_unique: function(from) {
		let id = civitas.utils.get_random(0, from.length - 1);
		let element = from[id];
		from.splice(id, 1);
		return element;
	},

	sanitize_string: function(string) {
		return string.replace(/[^a-z0-9+]-/gi, '-');
	},

	to_point: function(s, dx, dy) {
		return Math.round(dx + s.x) + ',' + Math.round(dy + s.y);
	}
};

/**
 * Main Game AI (Artificial Intelligence) object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.modules.ai
 * @returns {civitas.modules.ai}
 */
civitas.modules.ai = function (params) {

	/**
	 * Reference to the core object.
	 * 
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Personality type for this AI.
	 *
	 * @private
	 * @type {Number}
	 */
	this._type = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.modules.ai}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		this._type = params.type;
		// Todo
		return this;
	};

	/**
	 * Perform the actual data processing for this AI.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.process = function() {
		// Todo
		return true;
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

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Main Game UI interface.
 * @license GPLv3
 * @mixin
 */
civitas.ui = {
	/**
	 * Show the application loading indicator.
	 *
	 */
	show_loader: function() {
		$('.loading').show().tipsy({
			gravity: 'e'
		});
	},

	/**
	 * Hide the application loading indicator.
	 *
	 */
	hide_loader: function() {
		$('.loading').hide();
	},

	build_main: function() {
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
	},

	/**
	 * Create an item tooltip.
	 *
	 * @param {Object} item
	 * @returns {String}
	 */
	item_tooltip: function(item) {
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
	},

	/**
	 * Build the About section of the UI.
	 *
	 * @returns {String}
	 */
	window_about_section: function() {
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
	},

	/**
	 * Generate a generic panel template.
	 *
	 * @param {String} title
	 * @returns {String}
	 */
	generic_panel_template: function(title) {
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
	},

	building_panel_template: function(title) {
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
	},

	building_panel: function (params, level) {
		if (typeof params.levels === 'undefined') {
			params.levels = 1;
		}
		let building_image = params.handle;
		if (params.handle.slice(0, 5) === 'house') {
			building_image = params.handle.slice(0, 5);
		}
		let image = (typeof params.visible_upgrades === 'undefined' || 
			params.visible_upgrades === false) ? building_image: building_image + params.level;
		let out = '<div class="column">' +
			'<img src="' + civitas.ASSETS_URL + 'images/assets/buildings/' + image + '.png" />' +
		'</div>' +
		'<div class="column">' +
			'<p>' + params.description + '</p>' +
			'<dl>' +
				civitas.ui.level_panel(params.level, level, params.levels) +
				civitas.ui.cost_panel(params.cost, level, params.levels) +
				civitas.ui.materials_panel(params.materials) +
				civitas.ui.production_panel(params.production, level) +
				civitas.ui.requires_panel(params.requires) +
				civitas.ui.chance_panel(params.chance, level) +
				civitas.ui.tax_panel(params.tax, level) +
				civitas.ui.storage_panel(params.storage, level) +
			'</dl>' +
		'</div>'; 
		return out;
	},

	normal_panel: function (section, contents) {
		let out = '<fieldset>' +
				'<legend>' + section + '</legend>' +
				contents +
			'</fieldset>';
		return out;
	},

	level_panel: function (level, new_level, max_level) {
		let out = '<dt>Level</dt>' +
			'<dd>' + new_level + ' / ' + max_level + ' </dd>';
		return out;
	},

	cost_panel: function (costs, level, levels) {
		let out = '';
		if (typeof costs !== 'undefined') {
			out += '<dt>Cost</dt>';
			for (let item in costs) {
				out += '<dd>' + civitas.utils.nice_numbers(costs[item]) + civitas.ui.resource_small_img(item) + (typeof levels !== 'undefined' && level < levels ? ' / ' + civitas.utils.nice_numbers(costs[item] * (level + 1)) + civitas.ui.resource_small_img(item) : '') + '</dd>';
			}
		}
		return out;
	},

	progress: function(value, progress_type, show_value) {
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
	},

	navy_img: function (name) {
		return '<img class="tips small" title="' + civitas.SHIPS[name].name + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + name.toLowerCase().replace(/ /g,"_") + '.png" />';
	},

	army_img: function (name) {
		return '<img class="tips small" title="' + civitas.SOLDIERS[name].name + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + name.toLowerCase().replace(/ /g,"_") + '.png" />';
	},

	army_list: function (army, no_margin) {
		let out2 = '<p>There are no soldiers in this army.</p>';
		let out = '<dl' + ((typeof no_margin !== 'undefined' && no_margin === true) ? ' class="nomg"' : '') + '>';
		let total = 0;
		for (let soldier in army) {
			if (army[soldier] > 0) {
				out += '<dt>' + army[soldier] + '</dt>' + '<dd>' + civitas.ui.army_img(soldier) + '</dd>';
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
	},

	/**
	 * Check if a window exists and is opened.
	 * 
	 * @param {String} id
	 * @returns {Boolean}
	 */
	window_exists: function (id) {
		if ($(id).length == 0) {
			return false;
		}
		return true;
	},

	/**
	 * Check if a panel exists and is opened.
	 * 
	 * @param {String} id
	 * @returns {Boolean}
	 */
	panel_exists: function (id) {
		if ($(id).length == 0) {
			return false;
		}
		return true;
	},

	panel_btn: function (text, title, handle, class_name, disabled) {
		return '<a title="' + title + '" data-handle="' + handle + '" class="tips ' + class_name + (disabled === true ? ' disabled' : '') + '" href="#">' + text + '</a></td>';
	},

	trades_list: function (trades, mode) {
		mode = (typeof mode === 'undefined' || mode === 'imports') ? 'imports' : 'exports';
		let out = '';
		if (trades !== null) {
			let trade = trades[mode];
			for (let item in trade) {
				if (trade[item] > 0) {
					out += civitas.ui.resource_storage_small_el(item, trade[item]);
				}
			}
		}
		return out;
	},

	navy_list: function (army, no_margin) {
		let out2 = '<p>There are no ships in this navy.</p>';
		let out = '<dl' + ((typeof no_margin !== 'undefined' && no_margin === true) ? ' class="nomg"' : '') + '>';
		let total = 0;
		for (let ship in army) {
			if (army[ship] > 0) {
				out += '<dt>' + army[ship] + '</dt>' + '<dd>' + civitas.ui.navy_img(ship) + '</dd>';
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
	},

	building_element: function (params) {
		let building_image = params.type;
		let description = '<br /><span class="smalldesc">' + params.data.description + '</span>';
		if (params.type.slice(0, 5) === 'house') {
			building_image = params.type.slice(0, 5);
		}
		let image = (typeof params.data.visible_upgrades === 'undefined' || params.data.visible_upgrades === false) ? building_image : building_image + params.data.level;
		return '<div data-type="' + params.type + '" data-level="' + params.data.level + '" ' + 'style="background-image:url(' + civitas.ASSETS_URL + 'images/assets/buildings/' + image + '.png);left:' + params.data.position.x + 'px;top:' + params.data.position.y + 'px" title=\'' + params.data.name + '\' ' + 'id="building-' + params.data.handle + '"' + 'class="tips building' + (params.data.large === true ? ' large' : '') + '"></div>';
	},

	resource_storage_small_el: function (resource, amount) {
		return '<div class="tips storage-item small" title="' + civitas.utils.get_resource_name(resource) + '"><img class="small" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + resource + '.png" /><span class="amount">' + amount + '</span></div>';
	},

	resource_storage_el: function (resource, amount) {
		return '<div class="storage-item" data-resource="' + resource + '"><span class="title">' + civitas.utils.get_resource_name(resource) + '</span><img src="' + civitas.ASSETS_URL + 'images/assets/resources/' +  resource + '.png" /><span class="amount">' + amount + '</span></div>';
	},

	tabs: function (data) {
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
	},

	materials_panel: function (materials) {
		let out = '';
		if (typeof materials !== 'undefined') {
			out += '<dt>Uses</dt>';
			if (Array.isArray(materials)) {
				for (let i = 0; i < materials.length; i++) {
					for (let y in materials[i]) {
						out += '<dd>' + materials[i][y] + civitas.ui.resource_small_img(y) + '</dd>';
					}
				}
			} else {
				for (let item in materials) {
					out += '<dd>' + materials[item] + civitas.ui.resource_small_img(item) + '</dd>';
				}
			}
		}
		return out;
	},

	chance_panel: function (materials, level) {
		let out = '';
		if (typeof materials !== 'undefined') {
			out += '<dt>Extra materials</dt>';
			for (let item in materials) {
				out += '<dd>' + (level * materials[item]).toFixed(4) * 100 + '%' + civitas.ui.resource_small_img(item) + '</dd>';
			}
		}
		return out;
	},

	production_panel: function (materials, level) {
		let out = '';
		if (typeof materials !== 'undefined') {
			out += '<dt>Produces</dt>';
			for (let item in materials) {
				out += '<dd>' + (level * materials[item]) + civitas.ui.resource_small_img(item) + '</dd>';
			}
		}
		return out;
	},

	requires_panel: function (requires) {
		let out = '';
		if (typeof requires.buildings !== 'undefined' || typeof requires.settlement_level !== 'undefined') {
			out += '<dt>Requires</dt>';
			out += '<dd>';
			if (typeof requires.buildings !== 'undefined') {
				for (let item in requires.buildings) {
					let b = civitas.BUILDINGS[civitas.BUILDINGS.findIndexM(item)];
					out += b.name + ' level ' + requires.buildings[item] + '<br />'
				}
			}
			if (typeof requires.settlement_level !== 'undefined') {
				out += 'City level ' + requires.settlement_level;
			}
			out += '</dd>';
		}
		return out;
	},

	tax_panel: function (tax, level) {
		let out = '';
		if (typeof tax !== 'undefined') {
			out += '<dt>Tax</dt>';
			out += '<dd>' + (level * tax) + civitas.ui.resource_small_img('coins') + '</dd>';
		}
		return out;
	},

	storage_panel: function (storage, level) {
		let out = '';
		if (typeof storage !== 'undefined') {
			out += '<dt>Storage</dt>';
			out += '<dd>' + (level * storage) + '<img alt="Storage space" class="tips small" title="Storage Space" src="' + civitas.ASSETS_URL + 'images/assets/resources/storage.png" /></dd>';
		}
		return out;
	},

	resource_small_img: function (resource) {
		return '<img alt="' + civitas.utils.get_resource_name(resource) + '" class="tips small" title="' + civitas.utils.get_resource_name(resource) + '" src="' + civitas.ASSETS_URL + 'images/assets/resources/' + resource + '.png" />';
	},

	svg_add_settlement_image: function(row, column, settlement, player_settlement) {
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
	},

	svg_add_mountain: function(row, column, color) {
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
	},

	svg_add_hill: function(row, column, color) {
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
	},

	svg_add_desert: function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M39.5,18.7h-1c-0.6-2.1-2.3-2.8-4.1-3.3c-3-0.7-5.8-0.6-8.6,0.7C25,16.5,24.3,17,24,17.8c1,0.8,2.1,0.3,3.2,0.2c3.5-0.2,6.9,0.2,10,1.9c1.6,0.8,2.9,1.9,3.3,3.8c0,0.3,0.1,0.6,0.1,0.9h-1c-0.5-2.1-2.2-2.8-4.1-3.2c-2.9-0.8-5.8-0.6-8.5,0.6c-0.2,0.1-0.3,0.2-0.5,0.2c-0.2,0.1-0.3,0.2-0.5,0.4c3,1.1,6.2,2,6.8,6h-1.1c-0.4-1.9-2-2.7-3.7-3.2c-2.7-0.8-5.6-0.7-8.3,0.3c-1.4,0.5-2.5,1.3-2.8,2.9H8.9c-0.2-1.8,0.9-3.3,3.9-5h-7c-0.1-1,0.2-1.9,0.8-2.7c1.3-1.7,3-2.6,5-3.1c1.3-0.4,2.7-0.5,4.1-0.8c0.2,0,0.5-0.1,0.6-0.3c1.2-2,3-3,5.1-3.6c4.9-1.6,9.8-1.5,14.5,0.7c1.1,0.5,2.1,1.4,3,2.3C39.3,16.7,39.6,17.6,39.5,18.7z M19.8,19.8c-2.3,0.4-4.8,0.6-6.2,3.3c1.3-0.3,2.4-0.6,3.4-0.9c0.2-0.1,0.3-0.1,0.4-0.3C18.3,21.3,19,20.5,19.8,19.8L19.8,19.8z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	},

	svg_add_grass: function(row, column, color) {
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
	},

	svg_add_plains: function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M24.53,39.05a1.93,1.93,0,0,1-.33,0L21.93,39c0.09-.78.16-1.52,0.26-2.26s-0.14-.94-0.87-0.91c-1.64.06-3.29,0-4.94,0h-0.9a21.05,21.05,0,0,1,.59-2.48A22.84,22.84,0,0,1,17.26,31l-1.86-.12c0-1.52,0-3,0-4.44a0.57,0.57,0,0,0-.58-0.63c-0.91-.21-1.82-0.42-2.71-0.69A3.8,3.8,0,0,1,11,24.49c-0.8-.57-0.92-1-0.6-2.17-0.23-.07-0.46-0.12-0.69-0.2a10.11,10.11,0,0,1-1.13-.43A2,2,0,0,1,7.28,20a1.93,1.93,0,0,1,1.28-1.73c0.39-.21.81-0.37,1.29-0.58l-0.48-.53a2.49,2.49,0,0,1,0-3.72,4.61,4.61,0,0,1,2.79-1.23,1.9,1.9,0,0,0,1-.45,5.91,5.91,0,0,1,7.35-.32,3.67,3.67,0,0,1,1.31,3.09,7,7,0,0,0,.74-2.17,2.5,2.5,0,0,1,1-2,1.31,1.31,0,0,0,.59-1.73,0.91,0.91,0,0,1,.18-0.69c1-1.52,2-3,3.08-4.62C28.84,4.78,30.24,6.1,30.77,8c0.13,0.48.4,0.92,0.52,1.41s0,0.76,0,1.14a1.86,1.86,0,0,0,.34.87c0.53,0.63,1.45.94,1.53,2a1.17,1.17,0,0,0,.61.32,15.89,15.89,0,0,1,2.45.91,2.73,2.73,0,0,1,1.4,2.82,1,1,0,0,0,.4.64,12.62,12.62,0,0,1,2.12,1.76,3.25,3.25,0,0,1-.86,4.57c-0.34.26-.71,0.47-1.06,0.7,0.69,1.31.5,2.1-.88,2.68a16.76,16.76,0,0,1-3.5.92,0.67,0.67,0,0,0-.72.79c0,1.36,0,2.72,0,4.14H31.46c0-1.41,0-2.79,0-4.17a0.65,0.65,0,0,0-.72-0.8,17.53,17.53,0,0,1-1.81-.33c-0.32.81,0.94,1.9-.52,2.52a13.68,13.68,0,0,1,1.52,2.2,14.37,14.37,0,0,1,.62,2.67c-0.38,0-.65,0-0.91,0H24.85c-0.87,0-.9,0-0.75.92S24.38,38.25,24.53,39.05Zm8.53-14.51c-0.71,1.18-.45,2.08.78,2.45a4.31,4.31,0,0,0,2,.08c1.42-.29,1.78-1.31,1-2.52a0.56,0.56,0,0,1,0-.2c0.26-.09.55-0.18,0.82-0.28a2.64,2.64,0,0,0,1.77-2.49,2.69,2.69,0,0,0-1.81-2.39A2.65,2.65,0,0,0,37,19c-0.46,0-.6-0.2-0.46-0.69a2.22,2.22,0,0,0-1.17-2.73,2.38,2.38,0,0,0-2.87.67,2.18,2.18,0,0,0,.17,2.9,2.31,2.31,0,0,1,.15.24C30.82,21.65,30.84,22.1,33.06,24.54ZM17,21.45c-0.61,1-.63,1.43-0.06,2a2.59,2.59,0,0,0,2.23.72,0.66,0.66,0,0,0,.6-1,1.77,1.77,0,0,1,0-.87,14.87,14.87,0,0,1,.44-1.58c0.28-.88.55-1.77,0.89-2.63,0.24-.6.58-1.16,0.85-1.69a0.7,0.7,0,0,0-.1-0.15l-0.2-.1c-0.68-.3-1.36-0.48-1-1.59a2.09,2.09,0,0,0-1.44-2.39,2.46,2.46,0,0,0-2.85.83,2.17,2.17,0,0,0,.08,2.73c0.1,0.14.2,0.28,0.29,0.41C14.74,18.58,14.76,19,17,21.45Zm8.29,1.88a8.7,8.7,0,0,0-.83-1.22,3.58,3.58,0,0,0-.9-0.51,3.48,3.48,0,0,0-.21.86c0,2.65.16,5.31,0.09,8A9.79,9.79,0,0,0,23.84,33a2.14,2.14,0,0,0,2.48,2,20,20,0,0,1,2.57.16,5.71,5.71,0,0,0-3.53-5.18l0.17-.2h2.33a8.1,8.1,0,0,0-.39-0.85c-0.62-1-.79-2.36-2.18-2.75a0.35,0.35,0,0,1-.18-0.23c-0.19-.78-0.37-1.56-0.55-2.36ZM28,6.21l-0.15.09c0.13,2.93.25,5.85,0.39,8.78,0,0.49.48,0.61,0.93,0.27l2.29-1.69a2.2,2.2,0,0,0-1.26-1.6,1,1,0,0,1-.55-0.46c-0.22-.74-0.37-1.51-0.54-2.29l0.76-.24ZM17.18,28.43l0.32,0.09c0.21-.75.45-1.49,0.62-2.25a0.62,0.62,0,0,0-.44-0.4,0.63,0.63,0,0,0-.48.39C17.15,27,17.18,27.7,17.18,28.43Z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	},

	svg_add_swamp: function(row, column, color) {
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
	},

	svg_add_jungle: function(row, column, color) {
		$(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
			.attr({
				d: 'M22.46,17.67l-1.17-.41a3,3,0,0,0,.09,2.45,5.7,5.7,0,0,1-1.08,6.79,6.79,6.79,0,0,0-1.7-4.19,14.23,14.23,0,0,0-2.37-1.91c-0.71-.46-0.92-0.29-0.92.59q0,7.69,0,15.39c0,0.29,0,.58,0,0.92H13.26L14.66,21l-0.22-.06a8.13,8.13,0,0,0-1.57,4.21c-0.22,1.54-.29,3.11-0.43,4.68A1.39,1.39,0,0,1,10.57,29a8.25,8.25,0,0,1,.05-8.25c0.12-.21.26-0.4,0.4-0.62-1.23-.08-2.17.65-5.51,4.28L4.4,23.74c0.52-1.1,1-2.19,1.55-3.25a1.62,1.62,0,0,0,.27-1.17c-0.35-1.89,1.17-3.7,3.36-4.13a3.13,3.13,0,0,1,1.12-.14A1.11,1.11,0,0,0,12.12,14a2.59,2.59,0,0,1,.26-0.59,5.91,5.91,0,0,0,1-3.44c-0.15-2.15,2.12-3.9,4.71-4.15a6.55,6.55,0,0,1,4.92,1.4,6.79,6.79,0,0,1,8-1.4c1.35,0.7,1.89,1.8,1.4,2.85a0.74,0.74,0,0,1-.16.14,6.12,6.12,0,0,0-3.91-.52,6.07,6.07,0,0,0,.5.42,6.59,6.59,0,0,1,2.89,6.87,0.84,0.84,0,0,0,.58,1.21,6.08,6.08,0,0,1,1,.62c1.36-2.1,5.26-2.3,7.26-.93a1.65,1.65,0,0,1,.71,2.32,5.1,5.1,0,0,0-3.49-.44A5.61,5.61,0,0,1,41,23.44a5.66,5.66,0,0,1-1.69,4.25c-0.1-.54-0.16-1-0.28-1.46a7.08,7.08,0,0,0-3.64-4.62c-1-.52-1.12-0.42-1.11.64q0,7.61,0,15.22c0,0.29,0,.59,0,0.94H32.22l1.39-16.33-0.28,0c-1.76,2.71-1.81,5.81-1.85,8.93a1.68,1.68,0,0,1-2-.89,8.32,8.32,0,0,1,.11-8.25c0.11-.2.24-0.4,0.36-0.6L29.84,21a10.41,10.41,0,0,0-2.06,1.11C26.76,23,25.89,24,24.94,25c-0.23.23-.5,0.42-0.84,0.71v6.07H21.66l1.65-19.22a4.44,4.44,0,0,0-1.51,2.62,1,1,0,0,0,.37.57A1.55,1.55,0,0,1,22.46,17.67Zm6.6-1.44a7.87,7.87,0,0,0-4.26-4.38c-0.61-.17-0.75.12-0.75,0.67,0,3.27,0,6.53,0,9.8a3.2,3.2,0,0,0,.08.43c0.52-.94,1.26-1.57,1-2.71A2.53,2.53,0,0,1,26,17.77,5.16,5.16,0,0,1,29.07,16.23Zm-10-4.75a10,10,0,0,0-5.49,4.21l0.92,0.63A3.67,3.67,0,0,1,17,14.68a1.23,1.23,0,0,0,.74-0.38C18.19,13.4,18.61,12.45,19.08,11.48Z',
				fill: color,
				'class': 'w-t-p'
			})
			.appendTo('.s-c-g-' + row + '-' + column);
	},

	svg_create_group: function(terrain, row, column) {
		let height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		let t_x = Math.round((1.5 * column) * civitas.WORLD_HEX_SIZE);
		let t_y = Math.round(height * (row * 2 + (column % 2)));
		$(document.createElementNS('http://www.w3.org/2000/svg', 'g'))
			.attr({
				'class': 's-c-g-' + row + '-' + column,
				'transform': 'translate(' + t_x + ', ' + t_y + ')',
			})
			.appendTo('.svg-grid');
	},

	svg_get_cell_middle: function(row, column) {
		let height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		let center = {
			x: Math.round(civitas.WORLD_HEX_SIZE), 
			y: Math.round(height)
		};
		return center;
	},

	/**
	 * Scroll the world map to the specified location.
	 *
	 * @param {Object} location
	 */
	worldmap_scrollto: function(location) {
		let coords = civitas.ui.svg_get_cell_middle_coords(location.y, location.x);
		$('.worldmap').scrollTop(coords.y - (700 / 2));
		$('.worldmap').scrollLeft(coords.x - (1164 / 2));
	},

	svg_get_cell_middle_coords: function(row, column) {
		let height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		return {
			x: Math.round((1.5 * column) * civitas.WORLD_HEX_SIZE),
			y: Math.round(height * (row * 2 + (column % 2)))
		}
		
	},

	svg_map_element: function(row, column, prev_row, prev_column, element_type, id, title) {
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
	},

	svg_link_cells: function(source, destination) {
		let _source = civitas.ui.svg_get_cell_middle_coords(source.x, source.y);
		let _destination = civitas.ui.svg_get_cell_middle_coords(destination.x, destination.y);
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
	},

	svg_create_cell: function(row, column, color, show_grid) {
		let height = Math.sqrt(3) / 2 * civitas.WORLD_HEX_SIZE;
		let center = civitas.ui.svg_get_cell_middle(row, column);
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
	},

	svg_create_worldmap: function(cell_size, colors) {
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
	},

	svg_apply_terrain: function(row, column, color, terrain) {
		if (terrain === 'M') {
			civitas.ui.svg_add_mountain(row, column, color);
		} else if (terrain === 'H') {
			civitas.ui.svg_add_hill(row, column, color);
		} else if (terrain === 'D') {
			civitas.ui.svg_add_desert(row, column, color);
		} else if (terrain === 'G') {
			civitas.ui.svg_add_grass(row, column, color);
		} else if (terrain === 'P') {
			civitas.ui.svg_add_plains(row, column, color);
		} else if (terrain === 'J') {
			civitas.ui.svg_add_jungle(row, column, color);
		} else if (terrain === 'W') {
			civitas.ui.svg_add_swamp(row, column, color);
		}
	}
};

/**
 * World object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.world
 * @returns {civitas.objects.world}
 */
civitas.objects.world = function (params) {

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Terrain colors.
	 *
	 * @private
	 * @type {Object}
	 */
	this._colors = {
		// Sea
		S: {
			bg: '#64B4E1',
			fg: ''
		},
		// Ocean
		O: {
			bg: '#509FCC',
			fg: ''
		},
		// Grass
		G: {
			bg: '#E6F59A',
			fg: '#527B2A'
		},
		// Jungle
		J: {
			bg: '#549D65',
			fg: '#205b45'
		},
		// Plains
		P: {
			bg: '#96C764',
			fg: '#264b0e'
		},
		// Hills
		H: {
			bg: '#E1C859',
			fg: '#6F5D0D'
		},
		// Swamp
		W: {
			bg: '#82C995',
			fg: '#349253'
		},
		// Mountains
		M: {
			bg: '#B37D1A',
			fg: '#33381D'
		},
		// Desert
		D: {
			bg: '#F2CD63',
			fg: '#c0b23c'
		},
		// Ice
		I: {
			bg: '#FFFFFF',
			fg: ''
		},
		// Borders
		X: {
			bg: '#64B4E1',
			fg: ''
		}
	}
	
	/**
	 * World properties.
	 *
	 * @private
	 * @type {Object}
	 */
	this._properties = {
		roughness: 5
	};

	/**
	 * Raw world data.
	 *
	 * @private
	 * @type {Array}
	 */
	this._data = [];

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.world}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		this._properties.roughness = (typeof params.roughness !== 'undefined') ? params.roughness : civitas.WORLD_ROUGHNESS;
		if (this._data.length === 0) {
			this._generate();
			this._adjust();
		}
		return this;
	};

	/**
	 * Adjust terrain based on the elevation.
	 * 
	 * @private
	 * @returns {civitas.objects.world}
	 */
	this._adjust = function() {
		for (let x = 0; x <= civitas.WORLD_SIZE_WIDTH; x++) {
			for (let y = 0; y <= civitas.WORLD_SIZE_HEIGHT; y++) {
				if (this._data[y][x].e < 0) {
					this._data[y][x].t = 'O';
				} else if (this._data[y][x].e >= 0 && this._data[y][x].e <= 0.3) {
					this._data[y][x].t = 'S';
				} else if (this._data[y][x].e > 0.3 && this._data[y][x].e <= 0.33) {
					this._data[y][x].t = 'W';
				} else if (this._data[y][x].e > 0.33 && this._data[y][x].e <= 0.38) {
					this._data[y][x].t = 'D';
				} else if (this._data[y][x].e > 0.38 && this._data[y][x].e <= 0.5) {
					this._data[y][x].t = 'G';
				} else if (this._data[y][x].e > 0.5 && this._data[y][x].e <= 0.55) {
					this._data[y][x].t = 'J';
				} else if (this._data[y][x].e > 0.55 && this._data[y][x].e <= 0.8) {
					this._data[y][x].t = 'P';
				} else if (this._data[y][x].e > 0.8 && this._data[y][x].e <= 0.95) {
					this._data[y][x].t = 'H';
				} else if (this._data[y][x].e > 0.95 && this._data[y][x].e <= 1) {
					this._data[y][x].t = 'M';
				}
				if ((y === 0 || y === civitas.WORLD_SIZE_HEIGHT - 1) && (this._data[y][x].t !== 'O' && this._data[y][x].t !== 'S')) {
					this._data[y][x].t = 'I';
				}
			}
		}
		return this;
	};

	/**
	 * Convert a terrain type into climate type.
	 *
	 * @param {String} terrain
	 * @public
	 * @returns {Boolean|Object}
	 */
	this.get_climate_from_terrain = function(terrain) {
		if (terrain === 'W' || terrain === 'J') {
			return {
				id: civitas.CLIMATE_TROPICAL,
				name: civitas.CLIMATES[civitas.CLIMATE_TROPICAL]
			};
		} else if (terrain === 'D') {
			return {
				id: civitas.CLIMATE_ARID,
				name: civitas.CLIMATES[civitas.CLIMATE_ARID]
			};
		} else if (terrain === 'I') {
			return {
				id: civitas.CLIMATE_POLAR,
				name: civitas.CLIMATES[civitas.CLIMATE_POLAR]
			};
		} else if (terrain === 'G' || terrain === 'P' || terrain === 'H' || terrain === 'M') {
			return {
				id: civitas.CLIMATE_TEMPERATE,
				name: civitas.CLIMATES[civitas.CLIMATE_TEMPERATE]
			};
		} else {
			return false;
		}
	};

	/**
	 * Convert a climate type into terrain type.
	 *
	 * @param {Number} climate
	 * @public
	 * @returns {Boolean|Array}
	 */
	this.get_terrain_from_climate = function(climate) {
		if (climate === civitas.CLIMATE_TROPICAL) {
			return ['W', 'J'];
		} else if (climate === civitas.CLIMATE_ARID) {
			return ['D'];
		} else if (climate === civitas.CLIMATE_POLAR) {
			return ['I'];
		} else if (climate === civitas.CLIMATE_TEMPERATE) {
			return ['G', 'P', 'H', 'M'];
		} else {
			return false;
		}
	};

	/**
	 * Get a random world location
	 * 
	 * @public
	 * @param {String} terrain
	 * @returns {Object}
	 */
	this.get_random_location = function(terrain) {
		let pos = {
			x: civitas.utils.get_random(1, civitas.WORLD_SIZE_WIDTH - 2),
			y: civitas.utils.get_random(1, civitas.WORLD_SIZE_HEIGHT - 2)
		}
		if (typeof terrain !== 'undefined') {
			if (!this.hex_is_water(pos) && !this.hex_is_locked(pos)) {
				//if ($.inArray(data[pos.y][pos.x].t, terrain) !== -1) {
					return pos;
				//}
			}
			return this.get_random_location(terrain);
		} else {
			if (!this.hex_is_water(pos) && !this.hex_is_locked(pos)) {
				return pos;
			}
			return this.get_random_location(terrain);
		}
	};

	/**
	 * Get the world properties.
	 *
	 * @public
	 * @returns {Object}
	 */
	this.properties = function() {
		return this._properties;
	};

	/**
	 * Return the default terrain colors.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.colors = function() {
		return this._colors;
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
	 * Check if the specified hex is sea or ocean.
	 *
	 * @public
	 * @param {Object} hex
	 * @returns {Boolean}
	 */
	this.hex_is_water = function(hex) {
		let data = this.data();
		if (data[hex.y][hex.x].t === 'S' || data[hex.y][hex.x].t === 'O') {
			return true;
		}
		return false;
	};

	/**
	 * Return the terrain data for the specified hex.
	 *
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {String}
	 */
	this.get_hex_terrain = function(x, y) {
		return this.get_hex(x, y).t;
	};

	/**
	 * Lock the specified hex as being inside the borders of a city.
	 *
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {String}
	 */
	this.lock_hex = function(x, y, lid) {
		this.set_hex(x, y, 'l', true);
		this.set_hex(x, y, 'lid', lid);
	};

	/**
	 * Check if the specified hex is locked.
	 *
	 * @public
	 * @param {Object} hex
	 * @returns {Boolean}
	 */
	this.hex_is_locked = function(hex) {
		return this.get_hex(hex.x, hex.y).l;
	};

	/**
	 * Lock the specified hex by the settlement id.
	 *
	 * @public
	 * @param {Object} hex
	 * @returns {Object}
	 */
	this.hex_locked_by = function(hex) {
		return this.get_hex(hex.x, hex.y).lid;
	};

	/**
	 * Return the moisture data for the specified hex.
	 *
	 * @public
	 * @param {Object} hex
	 * @returns {String}
	 */
	this.get_hex_moisture = function(hex) {
		return this.get_hex(hex.x, hex.y).m;
	};

	/**
	 * Return the elevation data for the specified hex.
	 *
	 * @public
	 * @param {Object} hex
	 * @returns {Number}
	 */
	this.get_hex_elevation = function(hex) {
		return this.get_hex(hex.x, hex.y).e;
	};

	/**
	 * Return the specified hex data.
	 *
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {String}
	 */
	this.get_hex = function(x, y) {
		return this._data[y][x];
	};

	/**
	 * Set the specified hex data.
	 *
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {String}
	 */
	this.set_hex = function(x, y, key, value) {
		return this._data[y][x][key] = value;
	};

	/**
	 * Add a settlement into the world data.
	 *
	 * @public
	 * @param {civitas.settlement} settlement
	 * @returns {civitas.objects.world}
	 */
	this.add_city = function(settlement) {
		let location = settlement.location();
		this._data[location.y][location.x].s = settlement.id();
		this._data[location.y][location.x].l = true;
		this._data[location.y][location.x].lid = settlement.id();
		this._data[location.y][location.x].n = settlement.name();
		//civitas.ui.svg_add_city_image(location.x, location.y, settlement);
		return this;
	};

	/**
	 * Remove a settlement from the world data.
	 *
	 * @public
	 * @param {civitas.settlement} settlement
	 * @returns {civitas.objects.world}
	 */
	this.remove_city = function(settlement) {
		let location = settlement.location();
		let id = settlement.id();
		this._data[location.y][location.x].s = null;
		this._data[location.y][location.x].n = null;
		for (let x = 0; x <= civitas.WORLD_SIZE_WIDTH; x++) {
			for (let y = 0; y <= civitas.WORLD_SIZE_HEIGHT; y++) {
				if (this._data[y][x].lid === id) {
					this._data[y][x].lid = null;
					this._data[y][x].l = false;
				}
			}
		}
		$('#worldmap-city-image' + location.y + '-' + location.x).remove();
		return this;
	}

	/**
	 * Generate elevation/terrain data.
	 *
	 * @private
	 * @returns {Array}
	 */
	this._generate = function() {
		this._data = this.create_map_array(civitas.WORLD_SIZE_WIDTH + 1, civitas.WORLD_SIZE_WIDTH + 1);
		this._start_displacement(civitas.WORLD_SIZE_WIDTH);
	};

	this.create_map_array = function(d1, d2) {
		let x = new Array(d1);
		for (let i = 0; i < d1; i += 1) {
			x[i] = new Array(d2);
		}
		for (let i = 0; i < d1; i += 1) {
			for (let j = 0; j < d2; j += 1) {
				x[i][j] = {
					/* Elevation */
					e: -1,
					/* Terrain */
					t: 'S',
					/* Settlement id */
					s: null,
					/* Settlement name */
					n: null,
					/* Locked */
					l: false,
					/* Locked to settlement id */
					lid: null,
					/* Moisture */
					m: 0
				};
			}
		}
		return x;
	};

	this._start_displacement = function(size) {
		let tr, tl, t, br, bl, b, r, l, center;
		this._data[0][0].e = Math.random(1.0);
		tl = this._data[0][0].e;
		this._data[0][size].e = Math.random(1.0);
		bl = this._data[0][size].e;
		this._data[size][0].e = Math.random(1.0);
		tr = this._data[size][0].e;
		this._data[size][size].e = Math.random(1.0);
		br = this._data[size][size].e;
		this._data[size / 2][size / 2].e = this._data[0][0].e + this._data[0][size].e + this._data[size][0].e + this._data[size][size].e / 4;
		this._data[size / 2][size / 2].e = this.normalize(this._data[size / 2][size / 2].e);
		center = this._data[size / 2][size / 2].e;
		this._data[size / 2][size].e = bl + br + center + center / 4;
		this._data[size / 2][0].e = tl + tr + center + center / 4;
		this._data[size][size / 2].e = tr + br + center + center / 4;
		this._data[0][size / 2].e = tl + bl + center + center / 4;
		this._midpoint_displacement(size);
	};

	this._midpoint_displacement = function(dimension) {
		let new_dimension = dimension / 2;
		let top, tr, tl, bottom, bl, br, right, left, center;
		if (new_dimension > 1) {
			for (let i = new_dimension; i <= civitas.WORLD_SIZE_WIDTH; i += new_dimension) {
				for (let j = new_dimension; j <= civitas.WORLD_SIZE_WIDTH; j += new_dimension) {
					let x = i - (new_dimension / 2);
					let y = j - (new_dimension / 2);
					tl = this._data[i - new_dimension][j - new_dimension].e;
					tr = this._data[i][j - new_dimension].e;
					bl = this._data[i - new_dimension][j].e;
					br = this._data[i][j].e;
					this._data[x][y].e = (tl + tr + bl + br) / 4 + this._displace(dimension);
					this._data[x][y].e = this.normalize(this._data[x][y].e);
					center = this._data[x][y].e;
					if (j - (new_dimension * 2) + (new_dimension / 2) > 0) {
						this._data[x][j - new_dimension].e = (tl + tr + center + this._data[x][j - dimension + (new_dimension / 2)].e) / 4 + this._displace(dimension);
					} else {
						this._data[x][j - new_dimension].e = (tl + tr + center) / 3 + this._displace(dimension);
					}
					this._data[x][j - new_dimension].e = this.normalize(this._data[x][j - new_dimension].e);
					if (j + (new_dimension / 2) < civitas.WORLD_SIZE_WIDTH) {
						this._data[x][j].e = (bl + br + center + this._data[x][j + (new_dimension / 2)].e) / 4 + this._displace(dimension);
					} else {
						this._data[x][j].e = (bl + br + center) / 3 + this._displace(dimension);
					}
					this._data[x][j].e = this.normalize(this._data[x][j].e);
					if (i + (new_dimension / 2) < civitas.WORLD_SIZE_WIDTH) {
						this._data[i][y].e = (tr + br + center + this._data[i + (new_dimension / 2)][y].e) / 4 + this._displace(dimension);
					} else {
						this._data[i][y].e = (tr + br + center) / 3 + this._displace(dimension);
					}
					this._data[i][y].e = this.normalize(this._data[i][y].e);
					if (i - (new_dimension * 2) + (new_dimension / 2) > 0) {
						this._data[i - new_dimension][y].e = (tl + bl + center + this._data[i - dimension + (new_dimension / 2)][y].e) / 4 + this._displace(dimension);
					} else {
						this._data[i - new_dimension][y].e = (tl + bl + center) / 3 + this._displace(dimension);
					}
					this._data[i - new_dimension][y].e = this.normalize(this._data[i - new_dimension][y].e);
				}
			}
			this._midpoint_displacement(new_dimension);
		}
	};

	this._displace = function(num) {
		return (Math.random(1.0) - 0.5) * (num / (civitas.WORLD_SIZE_WIDTH + civitas.WORLD_SIZE_WIDTH) * this._properties.roughness);
	};

	this.normalize = function(value) {
		if (value > 1) {
			value = 1;
		} else if (value < -1) {
			value = -1;
		}
		return value;
	};

	/**
	 * Return the world data array.
	 *
	 * @public
	 * @param {Array} value
	 * @returns {Array}
	 */
	this.data = function(value) {
		if (typeof value !== 'undefined') {
			this._data = value;
		}
		return this._data;
	};

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Main Game settlement object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.settlement
 * @returns {civitas.objects.settlement}
 */
civitas.objects.settlement = function(params) {
	
	/**
	 * Settlement properties.
	 *
	 * @private
	 * @type {Object}
	 */
	this.properties = {
		id: null,
		type: null,
		name: null,
		storage: null,
		population: null,
		climate: null,
		level: null,
		icon: null,
		population: null,
		ruler: null,
		religion: null,
		player: null,
		nationality: null,
		color: null,
		waterside: false
	};

	/**
	 * Location of the settlement.
	 *
	 * @private
	 * @type {Object}
	 */
	this._location = {
		x: 0,
		y: 0
	};

	/**
	 * Diplomacy status with all the settlements in the world.
	 *
	 * @private
	 * @type {Object}
	 */
	this._status = {};

	/**
	 * Pointer to the game core.
	 * 
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;
	
	/**
	 * List of the buildings in this settlement.
	 * 
	 * @private
	 * @type {Array}
	 */
	this.buildings = [];

	/**
	 * Soldiers headquartered in this settlement.
	 * 
	 * @private
	 * @type {Number}
	 */
	this.army = {};

	/**
	 * Ships built in this settlement.
	 * 
	 * @private
	 * @type {Number}
	 */
	this.navy = {};

	/**
	 * Mercenary armies available for this settlement.
	 * 
	 * @private
	 * @type {Number}
	 */
	this._mercenary = [];
	
	/**
	 * The resources of this settlement.
	 * 
	 * @private
	 * @type {Object}
	 */
	this.resources = {};

	/**
	 * The settlement heroes.
	 *
	 * @private
	 * @type {Array}
	 */
	this._heroes = [];

	/**
	 * List of the imports and exports of this settlement.
	 * 
	 * @private
	 * @type {Object}
	 */
	this.trades = null;

	/**
	 * AI module for this settlement.
	 *
	 * @private
	 * @type {civitas.modules.ai}
	 */
	this._ai = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.settlement}
	 * @param {Object} params
	 */
	this.__init = function(params) {
		this._core = params.core;
		this.properties.id = params.properties.id;
		this.properties.name = params.properties.name;
		this.properties.player = (typeof params.properties.player !== 'undefined') ? params.properties.player : false;
		this.properties.level = (typeof params.properties.level !== 'undefined') ? params.properties.level : 1;
		this.properties.religion = (typeof params.properties.religion !== 'undefined') ? params.properties.religion : civitas.RELIGION_NONE;
		this.properties.nationality = (typeof params.properties.nationality !== 'undefined') ? params.properties.nationality : civitas.NATION_PHOENICIAN;
		this.properties.ruler = params.properties.ruler;
		this.properties.icon = (typeof params.properties.icon !== 'undefined') ? params.properties.icon : 1;
		this.properties.waterside = (typeof params.properties.waterside !== 'undefined') ? params.properties.waterside : false;
		this.properties.population = (typeof params.properties.population !== 'undefined') ? params.properties.population : this.properties.level * civitas.POPULATION_PER_LEVEL;
		this.properties.type = (typeof params.properties.type !== 'undefined') ? params.properties.type : civitas.CITY;
		this.army = this.load_army(params.army);
		this._mercenary = (typeof params.mercenary !== 'undefined') ? params.mercenary : [];
		this._status = (typeof params.status !== 'undefined') ? params.status : {};
		this._heroes = (typeof params.heroes !== 'undefined') ? params.heroes : [];
		this.resources = (typeof params.resources !== 'undefined') ? params.resources : {};
		this._fill_resources();
		this._location = params.location;
		this.properties.color = (typeof params.properties.color !== 'undefined') ? params.properties.color : civitas.utils.get_random_color();
		this.core().world().add_city(this);
		this.calc_neighbours();
		if (this.waterside() === true) {
			this.navy = this.load_navy(params.navy);
		}
		if (typeof params.trades !== 'undefined') {
			this.trades = params.trades;
		} else {
			this.trades = {
				'imports': {},
				'exports': {}
			};
		}
		if (this.is_player() === false) {
			this.resources.fame = civitas.LEVELS[this.level()];
			this._ai = new civitas.modules.ai({
				core: this,
				type: this.properties.ruler.personality
			});
		}
		if (this.is_player() === false) {
			let terrain = this.core().world().get_hex_terrain(this._location.x, this._location.y);
			let climate = this.core().world().get_climate_from_terrain(terrain);
			this.properties.climate = civitas['CLIMATE_' + climate.name.toUpperCase()];
			if (this.is_urban()) {
				this.setup_initial_buildings(civitas['SETTLEMENT_BUILDINGS_' + climate.name.toUpperCase()], true);
			}
		} else {
			this.properties.climate = params.properties.climate;
		}
		return this;
	};

	/**
	 * Get a reference to the AI module.
	 *
	 * @public
	 * @returns {civitas.modules.ai}
	 */
	this.ai = function() {
		return this._ai;
	};

	/**
	 * Export settlement data.
	 *
	 * @returns {Object}
	 * @public
	 */
	this.export = function() {
		let data = {
			properties: this.get_properties(),
			trades: this.get_trades(),
			resources: this.get_resources(),
			army: this.get_army(),
			navy: this.get_navy(),
			buildings: this.export_buildings(),
			mercenary: this.mercenary(),
			heroes: this.heroes(),
			location: this.location()
		};
		if (this.is_player()) {
			data.status = this.status();
		}
		return data;
	};

	/**
	 * Get the settlement properties.
	 *
	 * @public
	 * @returns {Object}
	 */
	this.get_properties = function() {
		return this.properties;
	};

	/**
	 * Get the list of all the neighbouring hexes to this settlement.
	 *
	 * @returns {Array}
	 * @public
	 */
	this.get_neighbours = function() {
		let hexes = [];
		let location = this.location();
		let neighbours = civitas.utils.get_neighbours(location.y, location.x);
		if (this.is_city()) {
			for (let z = 0; z < neighbours.length; z++) {
				hexes.push(neighbours[z]);
			}
		} else if (this.is_metropolis()) {
			for (let z = 0; z < neighbours.length; z++) {
				hexes.push(neighbours[z]);
				let new_neighbours = civitas.utils.get_neighbours(neighbours[z].y, neighbours[z].x);
				for (let u = 0; u < new_neighbours.length; u++) {
					hexes.push(new_neighbours[u]);
				}
			}
		}
		return hexes;
	};

	/**
	 * Lock neighbouring hexes.
	 *
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.calc_neighbours = function() {
		let terrain;
		let world = this.core().world();
		let neighbours = this.get_neighbours();
		for (let i = 0; i < neighbours.length; i++) {
			terrain = world.get_hex_terrain(neighbours[i].x, neighbours[i].y);
			world.lock_hex(neighbours[i].x, neighbours[i].y, this.id());
			if (terrain === 'S' || terrain === 'O') {
				this.waterside(true);
			}
		}
		return this;
	};

	/**
	 * Get/set if the settlement is waterside (can build ships).
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.waterside = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.waterside = value;
		}
		return this.properties.waterside;
	};

	/**
	 * Get/set the name of this settlement.
	 * 
	 * @public
	 * @param {String} value
	 * @returns {String}
	 */
	this.name = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.name = value;
		}
		return this.properties.name;
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
	 * Raise the level of this settlement.
	 * 
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.level_up = function() {
		let level = this.level();
		this.fame(civitas.LEVELS[level]);
		this.properties.level++;
		this.properties.population = this.properties.level * civitas.POPULATION_PER_LEVEL;
		this.core().log('The city of ' + this.name() + ' is now level ' + this.level() + '.');
		return this;
	};

	/**
	 * Rename this settlement.
	 * 
	 * @public
	 * @param {String} value
	 * @returns {String}
	 */
	this.rename = function(value) {
		return this.name(value);
	};

	/**
	 * Get the rank of this settlement
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_rank = function() {
		let level = this.level();
		let half_level = Math.round(level / 2);
		let rank = {
			fame: this.fame(),
			prestige: this.prestige(),
			espionage: this.espionage(),
			score: Math.floor((
				((this.fame() > 0 ? this.fame() : 1) / half_level) + (this.prestige() / half_level) + (this.espionage() / half_level)
			) / half_level)
		};
		return rank;
	};
	
	/**
	 * Ask the City Council for tips.
	 * 
	 * @public
	 * @returns {Array}
	 */
	this.city_council = function() {
		let resources = this.get_resources();
		let storage = this.storage();
		let advices = [];
		let army = this.num_soldiers();
		let navy = this.num_ships();
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
			advices.push('Your settlement`s faith is too low, build a Church or upgrade it to be able to gather faith and choose/switch reglinios.');
		}
		if (resources.faith === civitas.MAX_FAITH_VALUE) {
			advices.push('You are at maximum faith, start using it from your settlement`s Church.');
		}
		if (resources.research < 100) {
			advices.push('Your settlement`s research is too low, build an Academy or upgrade it to be able to gather research and use it.');
		}
		if (resources.research === civitas.MAX_RESEARCH_VALUE) {
			advices.push('You are at maximum research, start using it for settlement researches, from your Academy.');
		}
		if (resources.espionage < 100) {
			advices.push('Your settlement`s espionage is too low, build an Embassy or upgrade it to be able to gather espionage.');
		}
		if (resources.espionage === civitas.MAX_ESPIONAGE_VALUE) {
			advices.push('You are at maximum espionage, start using it for espionage missiong from your Embassy.');
		}
		if (resources.coins > 100000) {
			advices.push('You have lots of coins, why not invest some in goods?');
		}
		for (let item in this.resources) {
			if (!civitas.utils.is_virtual_resource(item)) {
				if (resources[item] > 1000) {
					advices.push('You seem to have a surplus of ' + civitas.utils.get_resource_name(item) + '. You can sell some or place it on the Black Market and get coins instead.');
				}
			}
		}
		for (let i = 0; i < this.core()._queue.length; i++) {
			if (this.core()._queue[i].destination.id === this.id()) {
				advices.push('There is an army from ' + this.core().get_settlement(this.core()._queue[i].source.id).name() + ' marching towards your city!');
			}
			if (this.core()._queue[i].source.id === this.id()) {
				advices.push('Your army is marching towards ' + this.core().get_settlement(this.core()._queue[i].destination.id).name() + '!');
			}
		}
		let buildings = this.get_buildings();
		let problem_buildings = [];
		for (let i = 0; i < buildings.length; i++) {
			if (typeof buildings[i] !== 'undefined') {
				if (buildings[i].has_problems()) {
					problem_buildings.push(buildings[i].get_name());
				}
			}
		}
		if (problem_buildings.length > 0) {
			advices.push((problem_buildings.length === 1 ? 'One' : 'Several') + ' of your buildings (' + problem_buildings.join(', ') + ') ' + (problem_buildings.length === 1 ? 'is' : 'are') + ' not working due to a shortage of materials. Buy more goods.');
		}
		return advices;
	};
	
	/**
	 * Get/set the ruler object of this settlement.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	this.ruler = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.ruler = value;
		}
		return this.properties.ruler;
	};

	/**
	 * Get/set the level of this settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.level = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.level = value;
		}
		return this.properties.level;
	};

	/**
	 * Get/set the personality of the ruler of this settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Object}
	 */
	this.personality = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.ruler.personality = value;
		}
		return {
			id: this.properties.ruler.personality,
			name: civitas.PERSONALITIES[this.properties.ruler.personality].capitalize()
		};
	};

	/**
	 * Get/set the climate of the area of this settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Object}
	 */
	this.climate = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.climate = value;
		}
		return {
			id: this.properties.climate,
			name: civitas.CLIMATES[this.properties.climate].capitalize()
		};
	};
	
	/**
	 * Get/set the nationality of this settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Object}
	 */
	this.nationality = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.nationality = value;
		}
		return {
			id: this.properties.nationality,
			name: civitas.NATIONS[this.properties.nationality].capitalize()
		};
	};

	/**
	 * Get/set the icon of this settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.icon = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.icon = value;
		}
		return this.properties.icon;
	};

	/**
	 * Get/set the id of this settlement.
	 *
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.id = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.id = id;
		}
		return this.properties.id;
	};

	/**
	 * Check if this settlement is a player settlement.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.is_player = function() {
		return this.properties.player;
	};

	/**
	 * Return the type of this settlement.
	 *
	 * @public
	 * @returns {Number}
	 */
	this.get_type = function() {
		return this.properties.type;
	};

	/**
	 * Return the population of this settlement.
	 *
	 * @public
	 * @returns {Number}
	 */
	this.population = function() {
		return this.properties.population;
	};

	/**
	 * Check if this settlement is a city.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.is_city = function() {
		return this.properties.type === civitas.CITY;
	};

	/**
	 * Check if this settlement is a metropolis.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.is_metropolis = function() {
		return this.properties.type === civitas.METROPOLIS;
	};

	/**
	 * Check if this settlement is a camp.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.is_camp = function() {
		return this.properties.type === civitas.CAMP;
	};

	/**
	 * Check if this settlement is a village.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.is_village = function() {
		return this.properties.type === civitas.VILLAGE;
	};

	/**
	 * Refresh the heroes in the Tavern.
	 *
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.refresh_heroes = function() {
		if (this.is_building_built('tavern')) {
			// TODO
		}
	};

	/**
	 * Check if the player settlement's nationality and the one passed as parameter nationality are the same.
	 *
	 * @param {String|civitas.objects.settlement|Number} settlement
	 * @returns {Boolean}
	 * @public
	 */
	this.has_same_nationality = function(settlement) {
		if (typeof settlement === 'object' && this.nationality().id === settlement.nationality().id) {
			return true;
		} else if (typeof settlement === 'number' || typeof settlement === 'string') {
			let _settlement = this.core().get_settlement(settlement);
			if (typeof _settlement !== 'undefined') {
				if (this.nationality().id === _settlement.nationality().id) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Get/set the heroes of the settlement.
	 *
	 * @public
	 * @returns {Object}
	 */
	this.heroes = function(value) {
		if (typeof value !== 'undefined') {
			this._heroes = value;
		}
		return this._heroes;
	};

	/**
	 * Get/set the location of the settlement.
	 *
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	this.location = function(value) {
		if (typeof value !== 'undefined') {
			this._location = value;
		}
		return this._location;
	};

	/**
	 * Change this settlement's type to city.
	 *
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.to_city = function() {
		this.properties.type = civitas.CITY;
	};

	/**
	 * Change this settlement's type to village.
	 *
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.to_village = function() {
		this.properties.type = civitas.VILLAGE;
	};

	/**
	 * Change this settlement's type to camp.
	 *
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.to_camp = function() {
		this.properties.type = civitas.CAMP;
	};

	/**
	 * Change this settlement's type to metropolis.
	 *
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.to_metropolis = function() {
		this.properties.type = civitas.METROPOLIS;
	};

	/**
	 * Check if the settlement has soldiers in its army.
	 *
	 * @public
	 * @param {Object} data
	 * @returns {Boolean}
	 */
	this.has_soldiers = function(data) {
		let army = this.get_army();
		for (let item in army) {
			if (army[item] - data[item] < 0) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Adjust costs for the campaign.
	 *
	 * @public
	 * @param {Object} cost
	 * @param {Number} duration
	 * @param {Object} resources
	 * @returns {Object}
	 */
	this.adjust_campaign_cost = function(cost, duration, resources) {
		let mission_costs = cost;
		for (let item in mission_costs) {
			if (item === 'coins') {
				mission_costs[item] = Math.ceil(cost[item] * duration);
			} else if (item === 'provisions') {
				mission_costs[item] = Math.ceil((cost[item] * duration) / 2);
			}
		}
		if (typeof resources !== 'undefined') {
			let merged_costs = $.extend({}, resources);
			for (let item in mission_costs) {
				if (merged_costs[item]) {
					merged_costs[item] += mission_costs[item];
				} else {
					merged_costs[item] = mission_costs[item];
				}
			}
			return merged_costs;
		}
		return mission_costs;
	};

	/**
	 * Remove soldiers from the settlement's army (to create another army).
	 *
	 * @public
	 * @param {Object} data
	 * @returns {Boolean}
	 */
	this.split_army = function(data) {
		let army = this.get_army();
		if (this.has_soldiers(data)) {
			for (let item in army) {
				if (army[item] - data[item] >= 0) {
					army[item] = army[item] - data[item];
				} else {
					army[item] = 0;
				}
			}
			return true;
		}
		return false;
	};

	/**
	 * Get the color of the settlement.
	 *
	 * @public
	 * @returns {String}
	 */
	this.color = function() {
		return this.properties.color;
	};

	/**
	 * Check if the settlement has ships in its navy.
	 *
	 * @public
	 * @param {Object} data
	 * @returns {Boolean}
	 */
	this.has_ships = function(data) {
		let navy = this.get_navy();
		for (let item in navy) {
			if (navy[item] - data[item] < 0) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Remove ships from the settlement's navy (to create another navy).
	 *
	 * @public
	 * @param {Object} data
	 * @returns {Boolean}
	 */
	this.split_navy = function(data) {
		let navy = this.get_navy();
		if (this.has_ships(data)) {
			for (let item in navy) {
				if (navy[item] - data[item] >= 0) {
					navy[item] = navy[item] - data[item];
				} else {
					navy[item] = 0;
				}
			}
			return true;
		}
		return false;
	};

	/**
	 * Return the number of the ships in this settlement's navy.
	 * 
	 * @public
	 * @param {Object} navy
	 * @returns {Object}
	 */
	this.num_ships = function(navy) {
		let total = 0;
		if (typeof navy === 'undefined') {
			navy = this.navy;
		}
		for (let item in navy) {
			total = total + navy[item];
		}
		return total;
	};

	/**
	 * Return the number of the soldiers in this settlement's army.
	 * 
	 * @public
	 * @param {Object} army
	 * @returns {Object}
	 */
	this.num_soldiers = function(army) {
		let total = 0;
		if (typeof army === 'undefined') {
			army = this.army;
		}
		for (let item in army) {
			total += army[item];
		}
		return total;
	};

	/**
	 * Merge two armies.
	 *
	 * @public
	 * @param {Object} army
	 */
	this.merge_army = function(army) {
		let _army = this.get_army();
		let merged_army = $.extend({}, _army);
		for (let item in army) {
			if (merged_army[item]) {
				merged_army[item] += army[item];
			} else {
				merged_army[item] = army[item];
			}
		}
		this.army = merged_army;
	};

	/**
	 * Merge two navies.
	 *
	 * @public
	 * @param {Object} navy
	 */
	this.merge_navy = function(navy) {
		let _navy = this.get_navy();
		let merged_navy = $.extend({}, _navy);
		for (let item in navy) {
			if (merged_navy[item]) {
				merged_navy[item] += navy[item];
			} else {
				merged_navy[item] = navy[item];
			}
		}
		this.navy = merged_navy;
	};

	/**
	 * Method for the setup of the settlement's army.
	 *
	 * @public
	 * @param {Object} params
	 * @returns {Object}
	 */
	this.load_army = function(params) {
		let army = {};
		for (let item in civitas.SOLDIERS) {
			if (typeof params !== 'undefined' && typeof params[item] !== 'undefined') {
				army[item] = params[item];
			} else {
				army[item] = 0;
			}
		}
		return army;
	};

	/**
	 * Internal method for the initial setup of the settlement's navy.
	 *
	 * @private
	 * @param {Object} params
	 * @returns {Object}
	 */
	this.load_navy = function(params) {
		let navy = {};
		for (let item in civitas.SHIPS) {
			if (typeof params !== 'undefined' && typeof params[item] !== 'undefined') {
				navy[item] = params[item];
			} else {
				navy[item] = 0;
			}
		}
		return navy;
	};

	/**
	 * Get the list of settlement mercenary armies.
	 *
	 * @public
	 * @param {Array} value
	 * @returns {Array}
	 */
	this.mercenary = function(value) {
		if (typeof value !== 'undefined') {
			this._mercenary = value;
		}
		return this._mercenary;
	};

	/**
	 * Check if this settlement can build ships.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.can_build_ships = function() {
		return this.is_building_built('shipyard');
	};

	/**
	 * Check if this settlement can recruit soldiers.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.can_recruit_soldiers = function() {
		return this.is_building_built('militarycamp');
	};

	/**
	 * Recruit a soldier for the settlement's army.
	 * 
	 * @public
	 * @param {String} name
	 * @returns {Boolean}
	 */
	this.recruit_mercenary_army = function(name) {
		for (let i = 0; i < civitas.MERCENARIES.length; i++) {
			if (name === civitas.MERCENARIES[i].handle) {
				let price = civitas.MERCENARIES[i].cost;
				if (this.dec_coins(price) === false) {
					return false;
				}
				let army = {
					id: i,
					handle: name,
					army: {}
				};
				for (let item in civitas.SOLDIERS) {
					if (typeof civitas.MERCENARIES[i].army[item] !== 'undefined') {
						army.army[item] = civitas.MERCENARIES[i].army[item];
					} else {
						army.army[item] = 0;
					}
				}
				this._mercenary.push(army);
				if (this.is_player()) {
					this.core().notify('The mercenaries of the ' + civitas.MERCENARIES[i].name + ' are now available for skirmish missions for the duration of one year.', 'Mercenaries recruited.');
				} else {
					this.core().log('game', 'The city of ' + this.name() + ' hired the mercenaries of ' + civitas.MERCENARIES[i].name + '.');
				}
				this.core().save_and_refresh();
				return true;
			}
		}
		return false;
	};

	/**
	 * Construct a ship for the settlement's navy.
	 * 
	 * @public
	 * @param {String} ship_name
	 * @returns {Boolean}
	 */
	this.recruit_ship = function(ship_name) {
		if (typeof this.navy[ship_name] !== 'undefined' && this.navy[ship_name] !== null ) {
			this.navy[ship_name] = this.navy[ship_name] + 1;
		} else {
			this.navy[ship_name] = 1;
		}
		if (this.is_player()) {
			this.core().save_and_refresh();
		}
		return true;
	};

	/**
	 * Recruit a soldier for the settlement's army.
	 * 
	 * @public
	 * @param {String} soldier_name
	 * @returns {Boolean}
	 */
	this.recruit_soldier = function(soldier_name) {
		if (typeof this.army[soldier_name] !== 'undefined' && this.army[soldier_name] !== null ) {
			this.army[soldier_name] = this.army[soldier_name] + 1;
		} else {
			this.army[soldier_name] = 1;
		}
		if (this.is_player()) {
			this.core().save_and_refresh();
		}
		return true;
	};

	/**
	 * Disband a ship from the settlement's navy.
	 * 
	 * @public
	 * @param {String} ship_name
	 * @returns {Boolean}
	 */
	this.disband_ship = function(ship_name) {
		if (typeof this.navy[ship_name] === 'undefined') {
			return false;
		} else {
			if (this.navy[ship_name] - 1 >= 0) {
				this.navy[ship_name] = this.navy[ship_name] - 1;
			} else {
				this.navy[ship_name] = 0;
			}
		}
		return true;
	};

	/**
	 * Disband a soldier from the settlement's army.
	 * 
	 * @public
	 * @param {String} soldier_name
	 * @returns {Boolean}
	 */
	this.disband_soldier = function(soldier_name) {
		if (typeof this.army[soldier_name] === 'undefined') {
			return false;
		} else {
			if (this.army[soldier_name] - 1 >= 0) {
				this.army[soldier_name] = this.army[soldier_name] - 1;
			} else {
				this.army[soldier_name] = 0;
			}
		}
		return true;
	};

	/**
	 * Set the navy of the settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {civitas.objects.settlement}
	 */
	this.set_navy = function(value) {
		this.navy = value;
		return this;
	};

	/**
	 * Set the soldiers of the settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {civitas.objects.settlement}
	 */
	this.set_army = function(value) {
		this.army = value;
		return this;
	};

	/**
	 * Release all the mercenary armies.
	 * 
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.release_mercenaries = function() {
		this._mercenary = [];
		return this;
	};

	/**
	 * Get the total number of soldiers available in this settlement.
	 * 
	 * @public
	 * @returns {Number}
	 */
	this.get_army = function() {
		return this.army;
	};
		
	/**
	 * Get the total number of ships available in this settlement.
	 * 
	 * @public
	 * @returns {Number}
	 */
	this.get_navy = function() {
		return this.navy;
	};

	/**
	 * Check if this mercenary army has already been recruited.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {Boolean}
	 */
	this.is_mercenary_recruited = function(handle) {
		for (let i = 0; i < this._mercenary.length; i++) {
			if (typeof this._mercenary[i] !== 'undefined') {
				if (this._mercenary[i].handle === handle) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Release a recruited mercenary army.
	 *
	 * @public
	 * @param {Number} id
	 * @returns {Boolean}
	 */
	this.release_mercenary = function(id) {
		if (typeof this._mercenary[id] !== 'undefined') {
			let mercenary_army_data = civitas.MERCENARIES[id];
			this._mercenary.splice(id, 1);
			if (this.is_player()) {
				this.core().notify(mercenary_army_data.name + ' has been released from its duties.');
			}
			return true;
		} else {
			return false;
		}
	};

	/**
	 * Get the list of settlement buildings, for export reasons.
	 *
	 * @public
	 * @returns {Array}
	 */
	this.export_buildings = function() {
		let buildings_list = [];
		for (let i = 0; i < this.buildings.length; i++) {
			if (typeof this.buildings[i] !== 'undefined') {
				buildings_list.push({
					handle: this.buildings[i].get_handle(),
					level: this.buildings[i].get_level(),
					stopped: this.buildings[i].is_stopped()
				});
			}
		}
		return buildings_list;
	};

	/**
	 * Return a pointer to the specified building in this settlement by the specified
	 * handle.
	 * 
	 * @public
	 * @param {String} handle
	 * @returns {civitas.objects.building|Boolean}
	 */
	this.get_building = function(handle) {
		let buildings = this.get_buildings();
		if (typeof handle === 'string') {
			for (let i = 0; i < buildings.length; i++) {
				if (typeof buildings[i] !== 'undefined') {
					if (buildings[i].get_type() === handle) {
						return buildings[i];
					}
				}
			}
		}
		return false;
	};

	/**
	 * Internal method for creating a building.
	 *
	 * @private
	 * @param {String|Object} building
	 * @param {Boolean} hidden
	 * returns {Boolean}
	 */
	this._build = function(building, hidden) {
		hidden = (typeof hidden !== 'undefined') && hidden === true ? true : false;
		let building_data = false;
		let handle = typeof building.handle !== 'undefined' ? building.handle : building;
		let level = typeof building.level !== 'undefined' ? building.level : 1;
		let stopped = typeof building.stopped !== 'undefined' ? building.stopped : false;
		if (building_data = this.get_building_data(handle)) {
			if (level > 1) {
				building_data.level = level;
			}
			let new_building = new civitas.objects.building({
				settlement: this,
				type: handle,
				data: building_data,
				hidden: hidden,
				stopped: stopped
			});
			this.buildings.push(new_building);
			return true;
		}
		return false;
	};

	/**
	 * Internal function for building the specified buildings, bypassing
	 * the requirements.
	 * 
	 * @public
	 * @param {String|Object} building_type
	 * @param {Boolean} hidden
	 * @returns {Boolean}
	 */
	this.setup_initial_buildings = function(building_type, hidden) {
		if (typeof building_type === 'object') {
			for (let i = 0; i < building_type.length; i++) {
				this._build(building_type[i], hidden);
			}
			return true;
		} else {
			this._build(building_type, hidden);
			return true;
		}
		return false;
	};

	/**
	 * Get the building data.
	 *
	 * @public
	 * @param {String} handle
	 * @returns {Object|Boolean}
	 */
	this.get_building_data = function(handle) {
		let id = civitas.BUILDINGS.findIndexM(handle);
		if (id !== false) {
			return civitas.BUILDINGS[id];
		}
		return false;
	};

	/**
	 * Build the specified building.
	 * 
	 * @public
	 * @param {String} building_type
	 * @returns {civitas.objects.building|Boolean}
	 */
	this.build = function(building_type) {
		let building_data = false;
		if (building_data = this.get_building_data(building_type)) {
			if ((typeof building_data.requires.settlement_level !== 'undefined') && 
				(this.properties.level < building_data.requires.settlement_level)) {
				if (this.is_player()) {
					this.core().error('Your city level is too low to construct this building.');
				}
				return false;
			}
			if (typeof building_data.requires.buildings !== 'undefined') {
				let required = building_data.requires.buildings;
				for (let item in required) {
					if (!this.is_building_built(item, required[item])) {
						let _z = civitas.BUILDINGS.findIndexM(item);
						_z = civitas.BUILDINGS[_z];
						if (this.is_player()) {
							this.core().error('You don`t have the required level ' + required[item] + ' ' + _z.name + '.');
						}
						return false;
					}
				}
			}
			if (!this.has_resources(building_data.cost)) {
				if (this.is_player()) {
					this.core().error('You don`t have enough resources to construct this building.');
				}
				return false;
			}
			if (!this.remove_resources(building_data.cost)) {
				return galse;
			}
			let _building = new civitas.objects.building({
				settlement: this,
				type: building_type,
				data: building_data
			});
			this.buildings.push(_building);
			this.raise_prestige();
			if (this.is_player()) {
				this.core().save_and_refresh();
				this.core().notify('A new ' + _building.get_name() + ' was just constructed in your city.');
				$('.tips').tipsy({
					gravity: $.fn.tipsy.autoNS,
					html: true
				});
			}
			return _building;
		}
		return false;
	};

	/**
	 * Check if the specified building is already built.
	 * 
	 * @public
	 * @param {String} handle
	 * @param {Number} level
	 * @returns {Boolean}
	 */
	this.is_building_built = function(handle, level) {
		if (typeof level === 'undefined') {
			level = 1;
		}
		let buildings = this.get_buildings();
		for (let i = 0; i < buildings.length; i++) {
			if (typeof buildings[i] !== 'undefined') {
				if (buildings[i].type === handle && buildings[i].level >= level) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Get the list of all the buildings in this settlement.
	 * 
	 * @public
	 * @returns {Array}
	 */
	this.get_buildings = function() {
		return this.buildings;
	};

	/**
	 * Perform diplomacy missions.
	 *
	 * @public
	 * @param {Number|civitas.objects.settlement} settlement
	 * @param {Number} mode
	 * @returns {Boolean}
	 */
	this.diplomacy = function(settlement, mode) {
		if (typeof settlement === 'object') {
			settlement = settlement.id();
		}
		if (typeof settlement === 'number') {
			this._status[settlement].status = mode;
			if (mode === civitas.DIPLOMACY_WAR) {
				this.core().achievement('declarewar');
				this.reset_influence(settlement);
			} else if (mode === civitas.DIPLOMACY_ALLIANCE) {
				this.core().achievement('gotyourback');
				this.set_influence(settlement, civitas.MAX_INFLUENCE_VALUE);
			} else if (mode === civitas.DIPLOMACY_PACT) {
				this.core().achievement('pactish');
				this.set_influence(settlement, Math.ceil(civitas.MAX_INFLUENCE_VALUE / 2));
			} else if (mode === civitas.DIPLOMACY_CEASE_FIRE) {
				this.set_influence(settlement, Math.ceil(civitas.MAX_INFLUENCE_VALUE / 4));
			} else if (mode === civitas.DIPLOMACY_VASSAL) {
				this.core().achievement('youaremine');
				this.set_influence(settlement, civitas.MAX_INFLUENCE_VALUE);
			}
			this.core().save_and_refresh();
			return true;
		}
		return false;
	};

	/**
	 * Get/set the diplomatic status with another settlement.
	 *
	 * @public
	 * @param {Number} settlement
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.status = function(settlement, value) {
		if (typeof value !== 'undefined') {
			this._status[settlement] = value;
		}
		if (typeof settlement !== 'undefined') {
			return this._status[settlement];
		} else {
			return this._status;
		}
	};

	/**
	 * Check if this settlement can recruit heroes.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.can_recruit_heroes = function() {
		return this.is_building_built('tavern');
	};

	/**
	 * Check if this settlement can conduct diplomatic missions.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.can_diplomacy = function() {
		return this.is_building_built('embassy');
	};

	/**
	 * Returns the influenceof this settlement with a specific settlement.
	 * 
	 * @public
	 * @param {String} settlement
	 * @returns {Number}
	 */
	this.get_influence_with_settlement = function(settlement) {
		if (typeof settlement === 'number') {
			return this._status[settlement].influence;
		} else if (typeof settlement === 'object') {
			return this._status[settlement.id()].influence;
		} else if (typeof settlement === 'string') {
			return this._status[this.core().get_settlement(settlement)].influence;
		}
	};

	/**
	 * Decrease the influence of this settlement.
	 * 
	 * @public
	 * @param {String} settlement
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.lower_influence = function(settlement, value) {
		if (typeof value === 'undefined') {
			value = 1;
		}
		return this.set_influence(settlement, this.get_influence_with_settlement(settlement) - value);
	};

	/**
	 * Set the influence with the specified settlement to this value.
	 *
	 * @public
	 * @param {civitas.objects.settlement} settlement
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.set_influence = function(settlement, value) {
		if (typeof settlement === 'object') {
			settlement = settlement.id();
		} else if (typeof settlement === 'string') {
			settlement = this.core().get_settlement(settlement);
		}
		if (value < civitas.MIN_INFLUENCE_VALUE || this._status[settlement].influence < civitas.MIN_INFLUENCE_VALUE) {
			this._status[settlement].influence = civitas.MIN_INFLUENCE_VALUE;
		} else {
			this._status[settlement].influence = value;
		}
		if (this._status[settlement].influence >= civitas.MAX_INFLUENCE_VALUE) {
			this._status[settlement].influence = civitas.MAX_INFLUENCE_VALUE;
		}
		return this.get_influence_with_settlement(settlement);
	};

	/**
	 * Increase the influence of this settlement.
	 * 
	 * @public
	 * @param {String} settlement
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.raise_influence = function(settlement, value) {
		if (typeof value === 'undefined') {
			value = 1;
		}
		return this.set_influence(settlement, this.get_influence_with_settlement(settlement) + value);
	};

	/**
	 * Reset the influence of this settlement.
	 * 
	 * @param {Number} s_id
	 * @returns {civitas.objects.settlement}
	 * @public
	 */
	this.reset_influence = function(s_id) {
		this.set_influence(s_id, civitas.MIN_INFLUENCE_VALUE);
		return this;
	};
		
	/**
	 * Return the diplomacy status of this settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_diplomacy_status = function(settlement) {
		return {
			id: this._status[settlement].status,
			name: civitas.DIPLOMACIES[this._status[settlement].status].capitalize()
		};
	};
	/**
	 * Raise the espionage of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.raise_espionage = function(value) {
		if (typeof value === 'undefined') {
			value = 1;
		}
		return this.espionage(this.espionage() + value);
	};

	/**
	 * Lower the espionage of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.lower_espionage = function(value) {
		if (typeof value === 'undefined') {
			value = 1;
		}
		return this.espionage(this.espionage() - value);
	};

	/**
	 * Reset the espionage of this settlement.
	 * 
	 * @returns {Number}
	 * @public
	 */
	this.reset_espionage = function() {
		return this.espionage(civitas.MIN_ESPIONAGE_VALUE);
	};

	/**
	 * Get/set the espionage of this settlement.
	 * 
	 * @public
	 * @returns {Number}
	 * @param {Number} value
	 */
	this.espionage = function(value) {
		if (typeof value !== 'undefined') {
			if (value < civitas.MIN_ESPIONAGE_VALUE || this.resources.espionage < civitas.MIN_ESPIONAGE_VALUE) {
				this.resources.espionage = civitas.MIN_ESPIONAGE_VALUE;
			} else {
				this.resources.espionage = value;
			}
			if (this.resources.espionage >= civitas.MAX_ESPIONAGE_VALUE) {
				this.resources.espionage = civitas.MAX_ESPIONAGE_VALUE;
			}
		}
		return this.resources.espionage;
	};
	/**
	 * Increase this settlement's fame by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.raise_fame = function(amount) {
		if (typeof amount === 'undefined') {
			amount = 1;
		}
		return this.fame(this.fame() + amount);
	};

	/**
	 * Decrease this settlement's fame by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.lower_fame = function(amount) {
		if (typeof amount === 'undefined') {
			amount = 1;
		}
		return this.fame(this.fame() - amount);
	};

	/**
	 * Get/set this settlement's fame.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.fame = function(value) {
		if (typeof value !== 'undefined') {
			if (this.resources.fame >= civitas.LEVELS[civitas.MAX_SETTLEMENT_LEVEL - 1]) {
				this.resources.fame = civitas.LEVELS[civitas.MAX_SETTLEMENT_LEVEL - 1];
			} else if (value < 0 || this.resources.fame < 0) {
				this.resources.fame = 0;
			} else {
				this.resources.fame = value;
			}
			return value;
		} else {
			return this.resources.fame;
		}
	};

	/**
	 * Reset the fame of this settlement.
	 * 
	 * @returns {Number}
	 * @public
	 */
	this.reset_fame = function() {
		return this.fame(0);
	};

	/**
	 * Raise the prestige of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.raise_prestige = function(amount) {
		if (typeof amount === 'undefined') {
			amount = 1;
		}
		return this.prestige(this.prestige() + amount);
	};

	/**
	 * Lower the prestige of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.lower_prestige = function(amount) {
		if (typeof amount === 'undefined') {
			amount = 1;
		}
		return this.prestige(this.prestige() - amount);
	};

	/**
	 * Reset the prestige of this settlement.
	 * 
	 * @returns {Number}
	 * @public
	 */
	this.reset_prestige = function() {
		return this.prestige(civitas.MIN_PRESTIGE_VALUE);
	};

	/**
	 * Get/set the prestige of this settlement.
	 * 
	 * @public
	 * @returns {Number}
	 * @param {Number} value
	 */
	this.prestige = function(value) {
		if (typeof value !== 'undefined') {
			if (value < civitas.MIN_PRESTIGE_VALUE || this.resources.prestige < civitas.MIN_PRESTIGE_VALUE) {
				this.resources.prestige = civitas.MIN_PRESTIGE_VALUE;
			} else {
				this.resources.prestige = value;
			}
			if (this.resources.prestige >= civitas.MAX_PRESTIGE_VALUE) {
				this.resources.prestige = civitas.MAX_PRESTIGE_VALUE;
			}
		}
		return this.resources.prestige;
	};
	/**
	 * Change religion of your settlement.
	 *
	 * @public
	 * @param {Number|String} id
	 * @returns {Boolean}
	 */
	this.change_religion = function(id) {
		if (this.faith() !== civitas.MAX_FAITH_VALUE && id !== 0) {
			if (this.is_player()) {
				this.core().error('You don`t have enough faith to switch religions.');
			}
			return false;
		}
		if ((typeof id === 'number' && this.religion().id === id) || (typeof id === 'string' && this.religion().name === id)) {
			if (this.is_player()) {
				this.core().error('You cannot switch religion to your already existing one.');
			}
			return false;
		}
		if (!this.religion(id)) {
			if (this.is_player()) {
				this.core().error('Unable to switch religion to the specified one.');
			}
			return false;
		}
		this.reset_faith();
		this.refresh_heroes();
		if (this.is_player()) {
			this.core()._notify({
				title: 'Religion Adopted',
				mode: civitas.NOTIFY_RELIGION,
				content: 'Your settlement`s new religion is <strong>' + this.religion().name + '</strong>',
				timeout: false
			});
		}
		this.core().save_and_refresh();
		return true;
	};

	/**
	 * Get/set the religion of this settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.religion = function(value) {
		if (typeof value !== 'undefined') {
			if (typeof value === 'number') {
				this.properties.religion = value;
				return true;
			} else if (typeof value === 'string') {
				let pos = $.inArray(value, civitas.RELIGIONS);
				if (pos !== -1) {
					this.properties.religion = pos;
					return true;
				}
			}
		}
		return {
			id: this.properties.religion,
			name: civitas.RELIGIONS[this.properties.religion].capitalize()
		};
	};

	/**
	 * Raise the faith of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.raise_faith = function(value) {
		if (typeof value === 'undefined') {
			value = 1;
		}
		return this.faith(this.faith() + value);
	};

	/**
	 * Lower the faith of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.lower_faith = function(value) {
		if (typeof value === 'undefined') {
			value = 1;
		}
		return this.faith(this.faith() - value);
	};

	/**
	 * Reset the faith of this settlement.
	 * 
	 * @returns {Number}
	 * @public
	 */
	this.reset_faith = function() {
		return this.faith(civitas.MIN_FAITH_VALUE);
	};

	/**
	 * Get/set the faith of this settlement.
	 * 
	 * @public
	 * @returns {Number}
	 * @param {Number} value
	 */
	this.faith = function(value) {
		if (typeof value !== 'undefined') {
			if (value < civitas.MIN_FAITH_VALUE || this.resources.faith < civitas.MIN_FAITH_VALUE) {
				this.resources.faith = civitas.MIN_FAITH_VALUE;
			} else {
				this.resources.faith = value;
			}
			if (this.resources.faith >= civitas.MAX_FAITH_VALUE) {
				this.resources.faith = civitas.MAX_FAITH_VALUE;
			}
		}
		return this.resources.faith;
	};

	/**
	 * Check if this settlement can recruit soldiers.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.can_research = function() {
		return this.is_building_built('academy');
	};

	/**
	 * Raise the research of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.raise_research = function(amount) {
		if (typeof amount === 'undefined') {
			amount = 1;
		}
		return this.research(this.research() + amount);
	};

	/**
	 * Lower the research of this settlement by the specified amount.
	 * 
	 * @public
	 * @param {Number} amount
	 * @returns {Number}
	 */
	this.lower_research = function(amount) {
		if (typeof amount === 'undefined') {
			amount = 1;
		}
		return this.research(this.research() - amount);
	};

	/**
	 * Reset the research of this settlement.
	 * 
	 * @returns {Number}
	 * @public
	 */
	this.reset_research = function() {
		return this.research(civitas.MIN_RESEARCH_VALUE);
	};

	/**
	 * Get/set the research of this settlement.
	 * 
	 * @public
	 * @returns {Number}
	 * @param {Number} value
	 */
	this.research = function(value) {
		if (typeof value !== 'undefined') {
			if (value < civitas.MIN_RESEARCH_VALUE || this.resources.research < civitas.MIN_RESEARCH_VALUE) {
				this.resources.research = civitas.MIN_RESEARCH_VALUE;
			} else {
				this.resources.research = value;
			}
			if (this.resources.research >= civitas.MAX_RESEARCH_VALUE) {
				this.resources.research = civitas.MAX_RESEARCH_VALUE;
			}
		}
		return this.resources.research;
	};

	/**
	 * Merge resources from a source into settlement's storage.
	 *
	 * @public
	 * @param {Object} resources
	 * @returns {civitas.objects.settlement}
	 */
	this.merge_resources = function(resources) {
		if (typeof resources !== 'undefined') {
			for (let item in resources) {
				if (!civitas.utils.is_virtual_resource(item)) {
					this.add_to_storage(item, resources[item]);
				}
			}
		}
		return this;
	};

	/**
	 * Get resources from the settlement's storage as spoils of war.
	 *
	 * @public
	 * @returns {Object}
	 */
	this.get_spoils = function() {
		let resources = this.get_resources();
		let tmp_res = Object.keys(resources);
		let spoils = {};
		let tmp;
		let resource;
		let random_resource;
		let count = 0;
		while (count < 3) {
			random_resource = tmp_res[Math.floor(Math.random() * tmp_res.length)];
			resource = resources[random_resource];
			if (!civitas.utils.is_virtual_resource(random_resource)) {
				if (resource > 0) {
					if (this.remove_resource(random_resource, resource)) {
						spoils[random_resource] = resource;
						count++;
					}
				}
			}
		}
		return spoils;
	};

	/**
	 * Increase this settlement's coins by the specified amount.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.inc_coins = function(value) {
		return this.coins(this.coins() + value);
	};
		
	/**
	 * Decrease this settlement's coins by the specified amount.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.dec_coins = function(value) {
		if (!this.has_coins(value)) {
			return false;
		}
		this.coins(this.coins() - value);
		return true;
	};
		
	/**
	 * Get/set the coins of the settlement.
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {Number}
	 */
	this.coins = function(value) {
		if (typeof value !== 'undefined') {
			this.resources.coins = value;
		}
		return this.resources.coins;
	};

	/**
	 * Get/set the storage space of this settlement.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {Object}
	 */
	this.storage = function(value) {
		if (typeof value !== 'undefined') {
			this.properties.storage = value;
		}
		let storage = 0;
		for (let item in this.get_resources()) {
			if (!civitas.utils.is_virtual_resource(item)) {
				storage += this.get_resources()[item];
			}
		}
		return {
			occupied: storage,
			all: this.properties.storage
		};
	};
		
	/**
	 * Adjust the resources according to the settlement owner.
	 *
	 * @private
	 * @returns {civitas.objects.settlement}
	 */
	this._fill_resources = function() {
		for (let item in civitas.RESOURCES) {
			if (typeof this.resources[item] === 'undefined') {
				this.resources[item] = 0;
			}
		}
		return this;
	};

	/**
	 * Add a specified amount of a resource to the storage of this settlement.
	 * 
	 * @public
	 * @param {String} item
	 * @param {Number} amount
	 * @returns {Boolean}
	 */
	this.add_to_storage = function(item, amount) {
		if (!civitas.utils.resource_exists(item)) {
			return false;
		}
		if (!this.has_storage_space_for(item, amount)) {
			return false;
		}
		let res = this.get_resources();
		if (typeof res[item] !== 'undefined') {
			res[item] = res[item] + amount;
		} else {
			res[item] = amount;
		}
		return true;
	};
		
	/**
	 * Check if the settlement has the required coins to create this building.
	 * 
	 * @public
	 * @param {Number} coins
	 * @param {Boolean} alert
	 * @returns {Boolean}
	 */
	this.has_coins = function(coins, alert) {
		if (this.coins() - coins < 0) {
			if (alert !== false) {
				if (this.is_player()) {
					this.core().error(this.name() + ' doesn`t have enough ' + civitas.utils.get_resource_name('coins') + '.');
				}
			}
			return false;
		}
		return true;
	};

	/**
	 * Remove the specified resources from the settlement's storage.
	 *
	 * @public
	 * @param {Object} resources
	 * @returns {Boolean}
	 */
	this.remove_resources = function(resources) {
		let good = true;
		for (let item in resources) {
			good = this.remove_resource(item, resources[item]);
			if (good === false) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Remove the amount of specified resource from the settlement's storage.
	 *
	 * @public
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {Boolean}
	 */
	this.remove_resource = function(resource, amount) {
		let resources = this.get_resources();
		resources[resource] = resources[resource] - amount;
		if (resources[resource] < 0) {
			resources[resource] = 0;
		}
		return true;
	};

	/**
	 * Check if the settlement has storage space for the amount of specified resource.
	 *
	 * @public
	 * @param {String|Object} resources
	 * @param {Number} amount
	 * @returns {Boolean}
	 */
	this.has_storage_space_for = function(resources, amount) {
		let total = 0;
		if (typeof amount === 'undefined') {
			for (let item in resources) {
				if (!civitas.utils.is_virtual_resource(item)) {
					total += resources[item];
				}
			}
		} else {
			if (!civitas.utils.is_virtual_resource(resources)) {
				total += amount;
			}
		}
		let storage = this.storage();
		if ((storage.occupied + total) > storage.all) {
			return false;
		}
		return true;
	};

	/**
	 * Check if the settlement is urban.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.is_urban = function() {
		if (this.is_city() || this.is_metropolis()) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Check if the settlement has any of the specified resources.
	 *
	 * @public
	 * @param {Object} resources
	 * @returns {Boolean}
	 */
	this.has_any_resources = function(resources) {
		let good = false;
		for (let item in resources) {
			good = this.has_resource(item, resources[item]);
			if (good === true) {
				return item;
			}
		}
		return false;
	};

	/**
	 * Check if the settlement has the specified resources.
	 *
	 * @public
	 * @param {Object} resources
	 * @returns {Boolean}
	 */
	this.has_resources = function(resources) {
		let good = true;
		for (let item in resources) {
			good = this.has_resource(item, resources[item]);
			if (good === false) {
				return false;
			}
		}
		return good;
	};

	/**
	 * Check if the settlement has the amount of specified resource.
	 *
	 * @public
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {Boolean}
	 */
	this.has_resource = function(resource, amount) {
		let resources = this.get_resources();
		if (!civitas.utils.resource_exists(resource)) {
			return false;
		}
		if (resources[resource] - amount < 0) {
			return false;
		}
		return true;
	};

	/**
	 * Get the resources available in this settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_resources = function() {
		return this.resources;
	};
		
	/**
	 * Set the resources of the settlement.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {civitas.objects.settlement}
	 */
	this.set_resources = function(value) {
		this.resources = value;
		return this;
	};
	
	/**
	 * Check if this settlement can trade resources.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.can_trade = function() {
		return this.is_building_built('tradingpost');
	};

	/**
	 * Buy the specified goods from a settlement.
	 * 
	 * @public
	 * @param {civitas.objects.settlement|String|Number} settlement
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {Object|Boolean}
	 */
	this.buy_from_settlement = function(settlement, resource, amount) {
		if (!civitas.utils.resource_exists(resource)) {
			if (this.is_player()) {
				this.core().error('The resource you specified does not exist.');
			}
			return false;
		}
		if (this.can_trade()) {
			let resources = this.get_resources();
			let _settlement;
			if (typeof settlement === 'string' || typeof settlement === 'number') {
				_settlement = this.core().get_settlement(settlement);
				if (settlement === false) {
					if (this.is_player()) {
						this.core().error(settlement + ' does not exist.');
					}
					return false;
				}
			} else {
				_settlement = settlement;
			}
			let is_double = this.religion().id === _settlement.religion().id ? true : false;
			let trades = _settlement.get_trades();
			if (trades === null) {
				if (this.is_player()) {
					this.core().error(settlement + ' does not trade any goods.');
				}
				return false;
			}
			if (typeof trades.exports === 'undefined') {
				if (this.is_player()) {
					this.core().error(settlement + ' does not export any goods.');
				}
				return false;
			}
			for (let item in trades.exports) {
				if (item === resource) {
					if (typeof amount === 'undefined') {
						amount = trades.exports[item];
					}
					let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_ADDITION) / 100);
					let price = civitas.utils.calc_price_plus_discount(amount, item, discount);
					let s_price = civitas.utils.calc_price(amount, item);
					let item_discount_price = Math.ceil(civitas.RESOURCES[item].price + discount);
					if (!this.has_storage_space_for(amount)) {
						this.core().error(this.name() + ' does not have enough storage space for ' +
							'<strong>' + amount + '</strong> ' + 
							civitas.utils.get_resource_name(item) + '.');
						return false;
					}
					if (this.dec_coins(price) === false) {
						return false;
					}
					if (!_settlement.has_resource(item, amount)) {
						return false;
					}
					if (!_settlement.remove_resource(item, amount)) {
						return false;
					}
					_settlement.inc_coins(s_price);
					this.add_to_storage(item, amount);
					this.remove_from_exports(_settlement, item, amount);
					this.raise_influence(_settlement.id(), (is_double ? civitas.IMPORT_INFLUENCE * 2 : 
						civitas.IMPORT_INFLUENCE));
					this.raise_prestige(is_double ? civitas.IMPORT_PRESTIGE * 2 : 
						civitas.IMPORT_PRESTIGE);
					this.raise_fame(50);
					this.core().refresh();
					if (this.is_player()) {
						this.core().notify(this.name() + ' bought <strong>' + amount + '</strong> ' + 
							civitas.utils.get_resource_name(item) + ' from ' + settlement + 
							' for <strong>' + item_discount_price + '</strong> ' + 
							civitas.utils.get_resource_name('coins') + 
							' each, for a total of <strong>' + price + '</strong> ' + 
							civitas.utils.get_resource_name('coins') + '.', 'World Market');
					}
					return {
						buyer: this.name(),
						amount: amount,
						goods: civitas.utils.get_resource_name(item),
						seller: settlement,
						price: Math.round(civitas.RESOURCES[item].price + discount),
						totalPrice: price
					};
				}
			}
			if (this.is_player()) {
				this.core().error(settlement + ' does not export the requested goods.');
			}
		}
		return false;
	};
		
	/**
	 * Perform a trades reset (resets all amounts of resources available
	 * for trade and randomize the amount.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.reset_trades = function() {
		let data = this.core().generate_random_resources(false, this.get_type());
		let new_resources = data.resources;
		new_resources.coins = this.resources.coins;
		new_resources.fame = this.resources.fame;
		new_resources.prestige = this.resources.prestige;
		new_resources.espionage = this.resources.espionage;
		new_resources.research = this.resources.research;
		new_resources.faith = this.resources.faith;
		this.resources = new_resources;
		if (this.is_urban()) {
			this.trades = data.trades;
		}
		return true;
	};

	/**
	 * Add the specified resource amount and the total price to the Black Market goods list.
	 * 
	 * @private
	 * @param {String} resource
	 * @param {Number} amount
	 * @param {Number} price
	 * @returns {Object}
	 */
	this._add_to_black_market = function (resource, amount, price) {
		let core = this.core();
		if (typeof core.black_market[resource] !== 'undefined') {
			let old = core.black_market[resource];
			core.black_market[resource] = {
				resource: resource,
				amount: old.amount + amount,
				price: old.price + price
			};
		} else {
			core.black_market[resource] = {
				resource: resource,
				amount: amount,
				price: price
			};
		}
		return core.black_market;
	};

	/**
	 * List the specified goods onto the Black Market.
	 * 
	 * @public
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {Object|Boolean}
	 */
	this.add_to_black_market = function(resource, amount) {
		if (!civitas.utils.resource_exists(resource)) {
			return false;
		}
		let resources = this.get_resources();
		if (!this.has_resource(resource, amount)) {
			this.core().error(this.name() + ' doesn`t have enough resources of this type.');
			return false;
		}
		if (this.remove_resource(resource, amount)) {
			let discount = Math.ceil((civitas.RESOURCES[resource].price * civitas.BLACK_MARKET_DISCOUNT) / 100);
			let price = civitas.utils.calc_price_minus_discount(amount, resource, discount);
			this._add_to_black_market(resource, amount, price);
			this.core().refresh();
			if (this.is_player()) {
				this.core().notify(this.name() + ' placed ' + amount + ' ' + civitas.utils.get_resource_name(resource) + ' on the Black Market and will receive ' + price + ' ' + civitas.utils.get_resource_name('coins') + ' next month.', 'Black Market');
			}
			return {
				seller: this.name(),
				amount: amount,
				goods: civitas.utils.get_resource_name(resource),
				price: price,
				discount: discount
			};
		}
		return false;
	};
		
	/**
	 * Sell the specified goods to a settlement.
	 * 
	 * @public
	 * @param {civitas.objects.settlement|String|Number} settlement
	 * @param {String} resource
	 * @param {Number} amount
	 * @returns {Object|Boolean}
	 */
	this.sell_to_settlement = function(settlement, resource, amount) {
		if (!civitas.utils.resource_exists(resource)) {
			if (this.is_player()) {
				this.core().error('The resource you specified does not exist.');
			}
			return false;
		}
		if (this.can_trade()) {
			let resources = this.get_resources();
			let _settlement;
			if (typeof settlement === 'string' || typeof settlement === 'number') {
				_settlement = this.core().get_settlement(settlement);
				if (settlement === false) {
					if (this.is_player()) {
						this.core().error(settlement + ' does not exist.');
					}
					return false;
				}
			} else {
				_settlement = settlement;
			}
			let is_double = this.religion().id === _settlement.religion().id ? true : false;
			let trades = _settlement.get_trades();
			if (trades === null) {
				if (this.is_player()) {
					this.core().error(settlement + ' does not trade any goods.');
				}
				return false;
			}
			if (typeof trades.imports === 'undefined') {
				if (this.is_player()) {
					this.core().error(settlement + ' does not import any goods.');
				}
				return false;
			}
			for (let item in trades.imports) {
				if (item === resource) {
					if (typeof amount === 'undefined') {
						amount = trades.imports[item];
					}
					let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_DISCOUNT) / 100);
					let price = civitas.utils.calc_price_minus_discount(amount, item, discount);
					let s_price = civitas.utils.calc_price(amount, item);
					let item_discount_price = Math.ceil(civitas.RESOURCES[item].price - discount);
					if (!this.has_resource(item, amount)) {
						this.core().error(this.name() + ' does not have enough ' + civitas.utils.get_resource_name(item) + ' to sell.');
						return false;
					}
					if (!this.remove_resource(item, amount)) {
						return false;
					}
					this.inc_coins(price);
					if (!_settlement.dec_coins(s_price)) {
						if (this.is_player()) {
							this.core().error(settlement + ' does not have enough ' + civitas.utils.get_resource_name('coins') + '.');
						}
						return false;
					}
					_settlement.add_to_storage(item, amount);
					this.remove_from_imports(_settlement, item, amount);
					this.raise_influence(_settlement.id(), (is_double ? civitas.EXPORT_INFLUENCE * 2 : civitas.EXPORT_INFLUENCE));
					this.raise_prestige(is_double ? civitas.EXPORT_PRESTIGE * 2 : civitas.EXPORT_PRESTIGE);
					this.raise_fame(50);
					this.core().refresh();
					if (this.is_player()) {
						this.core().notify(this.name() + ' sold <strong>' + amount + '</strong> ' + civitas.utils.get_resource_name(item) + ' to ' + settlement + ' for <strong>' + item_discount_price + '</strong> ' + civitas.utils.get_resource_name('coins') + ' each, for a total of <strong>' + price + '</strong> ' + civitas.utils.get_resource_name('coins') + '.', 'World Market');
					}
					return {
						seller: this.name(),
						amount: amount,
						goods: civitas.utils.get_resource_name(item),
						buyer: settlement,
						price: Math.round(civitas.RESOURCES[item].price - discount),
						totalPrice: price
					};
				}
			}
			if (this.is_player()) {
				this.core().error(settlement + ' does not import the specified goods.');
			}
		}
		return false;
	};
		
	/**
	 * Remove a specified amount of a resource from the trade exports of a settlement.
	 * 
	 * @public
	 * @param {civitas.objects.settlement} settlement
	 * @param {String} item
	 * @param {Number} amount
	 * @returns {Boolean}
	 */
	this.remove_from_exports = function(settlement, item, amount) {
		settlement.trades.exports[item] = settlement.trades.exports[item] - amount;
		return true;
	};

	/**
	 * Remove a specified amount of a resource from the trade imports of a settlement.
	 * 
	 * @public
	 * @param {civitas.objects.settlement} settlement
	 * @param {String} item
	 * @param {Number} amount
	 * @returns {Boolean}
	 */
	this.remove_from_imports = function(settlement, item, amount) {
		settlement.trades.imports[item] = settlement.trades.imports[item] - amount;
		return true;
	};

	/**
	 * Get the imports and exports of this settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_trades = function() {
		return this.trades;
	};

	/**
	 * Get the exports of this settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_trades_exports = function() {
		return this.trades.exports;
	};

	/**
	 * Get the imports of this settlement.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_trades_imports = function() {
		return this.trades.imports;
	};

	/**
	 * Format settlement's name into something nicer.
	 *
	 * @public
	 * @returns {String}
	 */
	this.nice_name = function() {
		if (this.is_metropolis()) {
			return 'Metropolis of ' + this.name();
		} else if (this.is_city()) {
			return 'City of ' + this.name();
		} else if (this.is_village()) {
			return 'Village of ' + this.name();
		} else if (this.is_camp()) {
			return 'Raider Camp ' + this.name();
		} else {
			return '';
		}
	};

	/**
	 * Set the imports and exports of this settlement.
	 * 
	 * @public
	 * @param {Object} value
	 * @returns {civitas.objects.settlement}
	 */
	this.set_trades = function(value) {
		this.trades = value;
		return this;
	};

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Main Game event object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.event
 * @returns {civitas.objects.event}
 */
civitas.objects.event = function (params) {

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Name of the event.
	 *
	 * @private
	 * @type {String}
	 */
	this._name = null;

	/**
	 * Event's chance to occur.
	 *
	 * @private
	 * @type {Number}
	 */
	this._chance = 0;

	/**
	 * Event's effect.
	 *
	 * @private
	 * @type {Number}
	 */
	this._effect = null;

	/**
	 * Description of the event.
	 *
	 * @private
	 * @type {String}
	 */
	this._description = null;

	/**
	 * Event data for lowering stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._lower = null;

	/**
	 * Event data for raising stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._raise = null;

	/**
	 * Event data for destroying stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._destroy = null;

	/**
	 * Event data for building stuff.
	 *
	 * @private
	 * @type {Object}
	 */
	this._build = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.event}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		this._name = params.name;
		this._chance = (typeof params.chance !== 'undefined') ? params.chance : 0.001;
		this._description = params.description;
		this._raise = typeof params.raise !== 'undefined' ? params.raise : null;
		this._lower = typeof params.lower !== 'undefined' ? params.lower : null;
		this._destroy = typeof params.destroy !== 'undefined' ? params.destroy : null;
		this._build = typeof params.build !== 'undefined' ? params.build : null;
		this.process();
		return this;
	};

	/**
	 * Process the event data.
	 * 
	 * @public
	 * @returns {civitas.objects.event}
	 */
	this.process = function () {
		let core = this.core();
		let random_s_id = civitas.utils.get_random(1, core.settlements.length);
		let with_settlement = core.get_settlement(random_s_id);
		if (typeof with_settlement !== 'undefined') {
			let description = this._description.replace(/SETTLEMENT/g, with_settlement.name());
			if (this._raise !== null) {
				for (let item in this._raise) {
					if (item === 'influence') {
						core.get_settlement().raise_influence(with_settlement.id(), this._raise[item]);
					} else {
						if (core.get_settlement().has_storage_space_for(item, this._raise[item])) {
							core.get_settlement().add_to_storage(item, this._raise[item]);
						}
					}
					let replace = new RegExp(item.toUpperCase(), 'g');
					description = description.replace(replace, this._raise[item]);
				}
			}
			if (this._lower !== null) {
				for (let item in this._lower) {
					if (item === 'influence') {
						core.get_settlement().lower_influence(with_settlement.id(), this._lower[item]);
					} else {
						core.get_settlement().remove_resource(item, this._lower[item]);
					}
					let replace = new RegExp(item.toUpperCase(), 'g');
					description = description.replace(replace, this._lower[item]);
				}
			}
		}
		if (this._destroy !== null) {
			let buildings = core.get_settlement().get_buildings();
			let building = civitas.utils.get_random(1, buildings.length);
			let _building = buildings[building];
			if (typeof _building !== 'undefined') {
				let name = _building.get_name();
				buildings[building].demolish();
				let replace = new RegExp('BUILDING', 'g');
				description = description.replace(replace, name);
			}
		}
		if (this._build !== null) {
			let buildings = core.get_settlement().get_buildings();
			// Todo
			let replace = new RegExp('BUILDING', 'g');
			description = description.replace(replace, name);
		}
		if (core.get_settlement().is_player()) {
			core._notify({
				title: 'Event: ' + this._name,
				content: description,
				timeout: false,
				mode: civitas.NOTIFY_EVENT
			});
		}
		core.log('event', this._name);
		return this;
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

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Main Game building object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.building
 * @returns {civitas.objects.building}
 */
civitas.objects.building = function(params) {

	/**
	 * The level of this building.
	 * 
	 * @type {Number}
	 * @private
	 */
	this.level = 1;

	/**
	 * Pointer to the settlement this building is located in.
	 * 
	 * @type {civitas.objects.settlement}
	 * @private
	 */
	this.settlement = null;

	/**
	 * The name of this building.
	 * 
	 * @type {String}
	 * @private
	 */
	this.name = null;

	/**
	 * The type of this building.
	 * 
	 * @type {String}
	 * @private
	 */
	this.type = null;

	/**
	 * Check if this building producing goods.
	 * 
	 * @type {Boolean}
	 * @private
	 */
	this.stopped = false;

	/**
	 * Check if this is a production building.
	 * 
	 * @type {Boolean}
	 * @private
	 */
	this.is_production = false;

	/**
	 * Check if this is a municipal building.
	 * 
	 * @type {Boolean}
	 * @private
	 */
	this.is_municipal = false;

	/**
	 * Check if this is a housing building.
	 * 
	 * @type {Boolean}
	 * @private
	 */
	this.is_housing = false;

	/**
	 * The DOM handle of this building.
	 *
	 * @type {String}
	 * @private
	 */
	this.handle = null;

	/**
	 * Flag if this building has any problems producing its goods.
	 *
	 * @type {Boolean}
	 * @private
	 */
	this.problems = false;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.building}
	 * @param {Object} params
	 */
	this.__init = function(params) {
		let self = this;
		this.settlement = params.settlement;
		this.type = params.type;
		this.name = params.data.name;
		this.is_production = (typeof params.data.is_production !== 'undefined' && params.data.is_production === true) ? true : false;
		this.is_municipal = (typeof params.data.is_municipal !== 'undefined' && params.data.is_municipal === true) ? true : false;
		this.is_housing = (typeof params.data.is_housing !== 'undefined' && params.data.is_housing === true) ? true : false;
		this.level = (typeof params.data.level !== 'undefined') ? params.data.level : 1;
		this.stopped = (typeof params.stopped !== 'undefined') ? params.stopped : false;
		this.handle = params.data.handle;
		params.data.level = this.get_level();
		if (params.hidden !== true && this.settlement.is_player()) {
			$('section.game').append(civitas.ui.building_element(params)).on('click', '#building-' + this.get_handle(), function() {
				let panel = civitas['PANEL_' + self.get_handle().toUpperCase()];
				if (typeof panel !== 'undefined') {
					self.core().open_panel(panel, params.data);
				} else {
					self.core().open_panel(civitas.PANEL_BUILDING, params.data, true);
				}
				return false;
			});
			if (this.stopped === true) {
				this.notify(civitas.NOTIFICATION_PRODUCTION_PAUSED);
			} else {
				this.notify();
			}
			this.core().refresh();
		}
		let building = this.get_building_data();
		switch (this.get_type()) {
			case 'marketplace':
			case 'warehouse':
				this.get_settlement().storage(this.get_settlement().storage().all + (building.storage * this.get_level()));
				break;
		}
		return this;
	};

	/**
	 * Check if the building can be upgraded.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	this.is_upgradable = function() {
		let building = this.get_building_data();
		if (this.get_level() < building.levels) {
			return true;
		}
		return false;
	};

	/**
	 * Check if the building can be downgraded.
	 *
	 * @returns {Boolean}
	 * @public
	 */
	this.is_downgradable = function() {
		let building = this.get_building_data();
		if (this.get_level() > 1) {
			return true;
		}
		return false;
	};

	/**
	 * Calculate the upgrade costs according to the next level.
	 *
	 * @public
	 * @returns {Object}
	 */
	this.get_upgrade_costs = function() {
		if (this.is_upgradable()) {
			let next_level = this.get_level() + 1;
			let costs = {};
			let data = this.get_building_data(this.get_type());
			for (let item in data.cost) {
				costs[item] = data.cost[item] * next_level;
			}
			return costs;
		}
		return false;
	};

	/**
	 * Upgrade this building.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.upgrade = function() {
		let core = this.core();
		let settlement = this.get_settlement();
		let resources = settlement.get_resources();
		let next_level = this.get_level() + 1;
		let data = this.get_building_data(this.get_type());
		let building_image = this.get_type();
		let costs = this.get_upgrade_costs();
		if (data && this.is_upgradable() && settlement.is_building_built(this.get_type())) {
			if (costs && this.get_settlement().has_resources(costs)) {
				this.get_settlement().remove_resources(costs);
				this.set_level(next_level);
				if (settlement.is_player()) {
					if (this.get_type().slice(0, 5) === 'house') {
						building_image = this.get_type().slice(0, 5);
					}
					$('section.game .building[data-type=' + this.get_type() + ']').css({
						'background-image': 'url(' + civitas.ASSETS_URL + 'images/assets/buildings/' + ((typeof data.visible_upgrades === 'undefined' || data.visible_upgrades === false) ? building_image : building_image + this.get_level()) + '.png)'
					});
				}
				if (typeof data.storage !== 'undefined') {
					settlement.storage(settlement.storage().all + data.storage);
				}
				if (settlement.is_player()) {
					core.save_and_refresh();
					core.notify(this.get_name() + ' upgraded to level ' + this.get_level());
				}
				return true;
			} else {
				if (settlement.is_player()) {
					core.error('You don`t have enough resources to upgrade your ' + this.get_name() + '.');
				}
				return false;
			}
		}
		return false;
	};

	/**
	 * Downgrade this building.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.downgrade = function() {
		let settlement = this.get_settlement();
		let data = this.get_building_data(this.get_type());
		let building_image = this.get_type();
		let next_level = this.get_level() - 1;
		if (data && this.is_downgradable() && settlement.is_building_built(this.get_type())) {
			this.set_level(next_level);
			if (settlement.is_player()) {
				if (this.get_type().slice(0, 5) === 'house') {
					building_image = this.get_type().slice(0, 5);
				}
				$('section.game .building[data-type=' + this.get_type() + ']').css({
					'background-image': 'url(' + civitas.ASSETS_URL + 'images/assets/buildings/' + ((typeof data.visible_upgrades === 'undefined' || data.visible_upgrades === false) ? building_image + '1' : building_image + this.get_level()) + '.png)'
				});
				if (typeof data.storage !== 'undefined') {
					settlement.storage(settlement.storage().all - data.storage);
				}
				this.core().save_and_refresh();
				this.core().notify(this.get_name() + ' downgraded to level ' + this.get_level());
			}
			return true;
		}
		return false;
	};

	/**
	 * Check if this building is a housing building.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.is_housing_building = function() {
		return this.is_housing;
	};

	/**
	 * Check if this building is a municipal building.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.is_municipal_building = function() {
		return this.is_municipal;
	};

	/**
	 * Check if this building is a production building (its production can be
	 * started and stopped).
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.is_production_building = function() {
		return this.is_production;
	};

	/**
	 * Check if this building's production is started or stopped.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.is_stopped = function() {
		return this.stopped;
	};

	/**
	 * Start this building's production
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.start_production = function() {
		if (this.get_settlement().is_building_built(this.get_type()) &&
			this.is_production_building()) {
			if (this.get_settlement().is_player()) {
				this.core().notify(this.get_name() + '`s production started.');
			}
			this.notify();
			this.stopped = false;
			this.core().save_and_refresh();
			return true;
		}
		return false;
	};

	/**
	 * Stop this building's production
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.stop_production = function() {
		if (this.get_settlement().is_building_built(this.get_type()) &&
			this.is_production_building()) {
			if (this.get_settlement().is_player()) {
				this.core().notify(this.get_name() + '`s production stopped.');
			}
			this.notify(civitas.NOTIFICATION_PRODUCTION_PAUSED);
			this.stopped = true;
			this.core().save_and_refresh();
			return true;
		}
		return false;
	};

	/**
	 * Demolish this building and remove it from the DOM.
	 * 
	 * @public
	 * @param {Boolean} notify
	 * @returns {Boolean}
	 */
	this.demolish = function(notify) {
		let settlement = this.get_settlement();
		if (this.get_type() !== 'marketplace') {
			for (let i = 0; i < settlement.buildings.length; i++) {
				if (settlement.buildings[i].get_type() === this.get_type()) {
					settlement.buildings.splice(i, 1);
				}
			}
			if (settlement.is_player()) {
				$('section.game > .building[data-type=' + this.get_type() + ']').remove();
				if (notify === true) {
					this.core().notify(this.get_name() + ' demolished successfully!');
				}
			}
			return true;
		} else {
			if (settlement.is_player()) {
				if (notify === true) {
					this.core().error('Unable to demolish the specified building `' + this.get_name() + '`!');
				}
			}
			return false;
		}
	};

	/**
	 * Get building data from the main configuration array.
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_building_data = function(type) {
		if (typeof type === 'undefined') {
			type = this.type;
		}
		return civitas.BUILDINGS[civitas.BUILDINGS.findIndexM(type)];
	};

	/**
	 * Get the settlement resources object
	 * 
	 * @public
	 * @returns {Object}
	 */
	this.get_settlement_resources = function() {
		return this.get_settlement().get_resources();
	};

	/**
	 * Check if this building has all the buildings requirements.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.has_building_requirements = function() {
		let good = true;
		let parent;
		let building = this.get_building_data();
		if (typeof building.requires.buildings !== 'undefined') {
			let required = building.requires.buildings;
			for (let item in required) {
				if (this.get_settlement().is_building_built(item, required[item])) {
					parent = this.get_settlement().get_building(item);
					if (parent && !parent.is_stopped()) {
						good = parent.has_building_requirements() && parent.has_settlement_requirements()
						if (good === false) {
							return false;
						}
					} else {
						return false;
					}
				}
			}
		}
		return good;
	};

	/**
	 * Check if this building has all the settlement level requirements.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.has_settlement_requirements = function() {
		let building = this.get_building_data();
		if (typeof building.requires.settlement_level !== 'undefined') {
			if (building.requires.settlement_level > this.get_settlement().level()) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Check if this building has all the requirements.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.has_requirements = function() {
		return this.has_building_requirements() && this.has_settlement_requirements();
	};

	/**
	 * Tax this building.
	 *
	 * @public
	 * @param {Number} amount
	 * @returns {Boolean}
	 */
	this.tax = function(amount) {
		amount = amount * this.get_level();
		this.get_settlement().inc_coins(amount);
		return this;
	};

	/**
	 * Produce the resources.
	 *
	 * @public
	 * @param {Object} materials
	 * @returns {Boolean}
	 */
	this.produce = function(materials) {
		if (!this.get_settlement().has_storage_space_for(materials)) {
			return false;
		}
		let settlement = this.get_settlement();
		let chance;
		let amount;
		let building = this.get_building_data();
		let random_amount;
		for (let item in materials) {
			amount = materials[item] * this.get_level();
			if (item === 'faith') {
				settlement.raise_faith(amount);
			} else if (item === 'research') {
				settlement.raise_research(amount);
			} else if (item === 'espionage') {
				settlement.raise_espionage(amount);
			} else if (item === 'fame') {
				settlement.raise_fame(amount);
			} else if (item === 'prestige') {
				settlement.raise_prestige(amount);
			} else {
				settlement.add_to_storage(item, amount);
				if (typeof building.chance !== 'undefined') {
					for (let itemo in building.chance) {
						chance = Math.random();
						if ((chance * this.get_level()) < building.chance[itemo]) {
							random_amount = civitas.utils.get_random(1, 5);
							settlement.add_to_storage(itemo, random_amount);
						}
					}
				}
			}
		}
		return true;
	};

	/**
	 * Main threading method for the building, this does the actual processing each turn.
	 * 
	 * @public
	 * @returns {civitas.objects.building}
	 */
	this.process = function() {
		let building = this.get_building_data();
		let materials = building.materials;
		if (building.is_housing === true) {
			if (typeof materials !== 'undefined') {
				if (this.get_settlement().has_resources(materials)) {
					this.get_settlement().remove_resources(materials);
					this.tax(building.tax);
					this.log_to_console();
				} else {
					this.notify(civitas.NOTIFICATION_MISSING_RESOURCES);
					return false;
				}
			}
		} else if (building.is_production === true) {
			if (!this.is_stopped()) {
				let products = building.production;
				if (this.has_requirements()) {
					if (typeof materials !== 'undefined') {
						if (Array.isArray(materials)) {
							let all_good = true;
							let removable = {};
							for (let i = 0; i < materials.length; i++) {
								let res = this.get_settlement().has_any_resources(materials[i]);
								if (res !== false) {
									removable[res] = materials[i][res];
								} else {
									all_good = false;
								}
							}
							if (all_good === true) {
								if (this.get_settlement().has_storage_space_for(products)) {
									this.get_settlement().remove_resources(removable);
									if (this.produce(products)) {
										this.log_to_console();
									}
								} else {
									this.core().log('game', 'There is no storage space in your city to accomodate the new goods.', true);
									this.problems = true;
									return false;
								}
							} else {
								this.notify(civitas.NOTIFICATION_MISSING_RESOURCES);
								this.problems = true;
								return false;
							}
						} else {
							if (this.get_settlement().has_resources(materials)) {
								if (this.get_settlement().has_storage_space_for(products)) {
									this.get_settlement().remove_resources(materials);
									if (this.produce(products)) {
										this.log_to_console();
									}
								} else {
									this.core().log('game', 'There is no storage space in your city to accomodate the new goods.', true);
									this.problems = true;
									return false;
								}
							} else {
								this.notify(civitas.NOTIFICATION_MISSING_RESOURCES);
								return false;
							}
						}
					} else {
						if (this.get_settlement().has_storage_space_for(products)) {
							if (this.produce(products)) {
								this.log_to_console();
							}
						} else {
							this.core().log('game', 'There is no storage space in your city to accomodate the new goods.', true);
							this.problems = true;
							return false;
						}
					}
				} else {
					this.notify(civitas.NOTIFICATION_MISSING_REQUIREMENTS);
					return false;
				}
			} else {
				this.notify(civitas.NOTIFICATION_PRODUCTION_PAUSED);
				return false;
			}
		}
		return true;
	};

	/**
	 * Check if this building is the marketplace.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.is_marketplace = function() {
		if (this.get_type() === 'marketplace') {
			return true;
		}
		return false;
	};

	/**
	 * Get the settlement this building is located into
	 * 
	 * @public
	 * @returns {civitas.objects.settlement}
	 */
	this.get_settlement = function() {
		return this.settlement;
	};

	/**
	 * Get a pointer to the game core
	 * 
	 * @public
	 * @returns {civitas.game}
	 */
	this.core = function() {
		return this.get_settlement().core();
	};

	/**
	 * Get the name of this building
	 * 
	 * @public
	 * @returns {String}
	 */
	this.get_name = function() {
		return this.name;
	};

	/**
	 * Check whether this building has problems producing its goods.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.has_problems = function() {
		return this.problems;
	};

	/**
	 * Set the level of this building
	 * 
	 * @public
	 * @param {Number} value
	 * @returns {civitas.objects.building}
	 */
	this.set_level = function(value) {
		this.level = value;
		return this;
	};

	/**
	 * Get the level of this building
	 * 
	 * @public
	 * @returns {Number}
	 */
	this.get_level = function() {
		return this.level;
	};

	/**
	 * Get the type of this building
	 * 
	 * @public
	 * @returns {String}
	 */
	this.get_type = function() {
		return this.type;
	};

	/**
	 * Return the DOM handle of this building.
	 *
	 * @public
	 * @returns {String}
	 */
	this.get_handle = function() {
		return this.handle;
	};

	/**
	 * Log production data to the game console.
	 *
	 * @public
	 * @returns {civitas.objects.building}
	 */
	this.log_to_console = function() {
		this.notify();
		let building = this.get_building_data();
		let _p = '';
		let _m = '';
		if (typeof building.production !== 'undefined') {
			for (let item in building.production) {
				_p += (building.production[item] * this.get_level()) + ' ' + item + ', ';
			}
			_p = _p.substring(0, _p.length - 2);
		}
		if (typeof building.materials !== 'undefined') {
			if (Array.isArray(building.materials)) {
				let removable = {};
				for (let i = 0; i < building.materials.length; i++) {
					let res = this.get_settlement().has_any_resources(building.materials[i]);
					if (res !== false) {
						removable[res] = building.materials[i][res];
					}
				}
				for (let item in removable) {
					_m += removable[item] + ' ' + item + ', ';
				}
				_m = _m.substring(0, _m.length - 2);
			} else {
				for (let item in building.materials) {
					_m += building.materials[item] + ' ' + item + ', ';
				}
				_m = _m.substring(0, _m.length - 2);
			}
		}
		if (typeof building.tax !== 'undefined') {
			this.core().log('game', this.get_name() + ' used ' + _m + ' and got taxed for ' + (building.tax * this.get_level()) + ' coins.');
		} else if (typeof building.production !== 'undefined' &&
			typeof building.materials === 'undefined') {
			this.core().log('game', this.get_name() + ' produced ' + _p + '.');
		} else {
			this.core().log('game', this.get_name() + ' used ' + _m + ' and produced ' + _p + '.');
		}
		return this;
	};

	/**
	 * Perform building notifications.
	 *
	 * @public
	 * @param {Number} notification_type
	 * @returns {civitas.objects.building}
	 */
	this.notify = function(notification_type) {
		if (typeof notification_type !== 'undefined') {
			this.problems = true;
			if (this.get_settlement().is_player()) {
				let handle = $('section.game > #building-' + this.get_handle());
				switch (notification_type) {
					case civitas.NOTIFICATION_MISSING_REQUIREMENTS:
						this.core().log('game', this.get_name() + ' doesn`t have one of the buildings required to be operational.', true);
						handle.empty().append('<span class="notification requirements"></span>');
						break;
					case civitas.NOTIFICATION_PRODUCTION_PAUSED:
						this.core().log('game', this.get_name() + '`s production is stopped.', true);
						handle.empty().append('<span class="notification paused"></span>');
						break;
					case civitas.NOTIFICATION_SETTLEMENT_LOW_LEVEL:
						this.core().log('game', 'Your settlement level is too low for ' + this.get_name() + ' to be active.', true);
						handle.empty().append('<span class="notification lowlevel"></span>');
						break;
					case civitas.NOTIFICATION_MISSING_RESOURCES:
					default:
						this.core().log('game', this.get_name() + ' is missing materials for production.', true);
						handle.empty().append('<span class="notification error"></span>');
						break;
				}
			}
		} else {
			this.problems = false;
			if (this.get_settlement().is_player()) {
				$('section.game > #building-' + this.get_handle()).empty();
			}
		}
		return this;
	};

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Battleground object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.battleground
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground = function (params) {

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Battleground properties.
	 *
	 * @private
	 * @type {Object}
	 */
	this._properties = {
		width: 0,
		height: 0
	};

	/**
	* DOM elements for external output.
	*
	* @private
	* @type {Object}
	*/
	this._elements = {
		container: null,
		console: null,
		attack: null,
		defense: null
	};

	/**
	 * Callback when the user wins.
	 *
	 * public
	 */
	this.on_win = function() {};

	/**
	 * Callback when the user loses.
	 *
	 * public
	 */
	this.on_lose = function() {};

	/**
	 * Callback when the user selects a cell.
	 *
	 * public
	 */
	this.on_select = function() {};

	/**
	 * Callback when the user moves a cell.
	 *
	 * public
	 */
	this.on_move = function() {};

	/**
	 * Callback when the user attacks another cell.
	 *
	 * public
	 */
	this.on_attack = function() {};

	/**
	 * Callback when the turn ends.
	 *
	 * public
	 */
	this.on_end_turn = function() {};

	/**
	 * Grid containing info about all battleground units and their properties.
	 *
	 * @type {Array}
	 * @private
	 */
	this._grid = [];

	/**
	 * Object containing the attacking side.
	 *
	 * @private
	 * @type {Object}
	 */
	this._attack = null;

	/**
	 * Object containing the defending side.
	 *
	 * @private
	 * @type {Object}
	 */
	this._defense = null;

	/**
	 * Property that contains the coords of the currently clicked cell.
	 *
	 * @private
	 * @type {Object}
	 */
	this._from = null;

	/**
	 * Flag if the battleground is over.
	 *
	 * @private
	 * @type {Boolean}
	 */
	this.done = false;

	/**
	 * Battleground statistics.
	 *
	 * @private
	 * @type {Object}
	 */
	this._stats = {
		attacking: {
			attack: 0,
			defense: 0
		},
		defending: {
			attack: 0,
			defense: 0
		}
	};

	/**
	 * Current turn for this battleground.
	 *
	 * @private
	 * @type {Number}
	 */
	this._current_turn = 1;

	/**
	 * The side of the player (left attacking, right defending).
	 *
	 * @private
	 * @type {Number}
	 */
	this._player = null;

	/**
	 * The side of the computer (left attacking, right defending).
	 *
	 * @private
	 * @type {Number}
	 */
	this._computer = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.battleground}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		this._properties.width = params.width;
		this._properties.height = params.height;
		this._elements.container = params.elements.container;
		this._elements.console = params.elements.console;
		this._elements.attack = params.elements.attack;
		this._elements.defense = params.elements.defense;
		this._attack = params.attack;
		this._defense = params.defense;
		if (params.on_win instanceof Function) {
			this.on_win = params.on_win;
		}
		if (params.on_lose instanceof Function) {
			this.on_lose = params.on_lose;
		}
		if (params.on_select instanceof Function) {
			this.on_select = params.on_select;
		}
		if (params.on_move instanceof Function) {
			this.on_move = params.on_move;
		}
		if (params.on_attack instanceof Function) {
			this.on_attack = params.on_attack;
		}
		if (params.on_end_turn instanceof Function) {
			this.on_end_turn = params.on_end_turn;
		}
		if (this._attack.city === this.core().get_settlement().id()) {
			this._player = 1;
			this._computer = 2;
		} else {
			this._player = 2;
			this._computer = 1;
		}
		this._setup();
		this.show_stats();
		return this;
	};

	/**
	 * Attack a hex cell.
	 *
	 * @public
	 * @param {Object} cell
	 * @returns {Boolean}
	 */
	this.attack = function(cell) {
		let sx = this._from.x;
		let sy = this._from.y;
		let source = this._grid[sy][sx];
		let destination = this._grid[cell.y][cell.x];
		let is_ranged = civitas.SOLDIERS[source.item].ranged;
		let city = this.core().get_settlement(source.city);
		let city2 = this.core().get_settlement(destination.city);
		let remaining = 0;
		let _a;
		if (city && source.moved) {
			this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> already used up its turn.');
			return false;
		}
		if (source !== null && destination !== null && city && city2) {
			if (destination.side === civitas.BATTLEGROUND_DEFENSE) {
				_a = '_defense';
			} else {
				_a = '_attack';
			}
			if (is_ranged !== undefined) {
				if ((Math.abs(cell.y - sy) + Math.abs(cell.x - sx)) > is_ranged) {
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> is not close enough for a ranged attack.');
					return false;
				}
				let attack = Math.ceil(source.attack / 2);
				let defense = destination.defense;
				if (defense - attack < 0) {
					this[_a].army[destination.item] = 0;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> attacked ' + city2.name() + '`s <strong>' + civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack + ' damage from range and killed its opponent.');
					this._cell_empty(cell);
				} else {
					remaining = Math.ceil((defense - attack) / civitas.SOLDIERS[destination.item].defense);
					destination.total = remaining;
					this[_a].army[destination.item] = remaining;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> attacked ' + city2.name() + '`s <strong>' + civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack + ' damage from range.');
				}
				this._cell_under_attack(cell);
				source.moved = true;
				this.redraw();
			} else {
				let can_move = civitas.SOLDIERS[this._grid[sy][sx].item].moves;
				if ((Math.abs(cell.y - sy) + Math.abs(cell.x - sx)) > can_move) {
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> doesn`t have a ranged attack.');
					return false;
				}
				let attack = Math.ceil(source.attack / 2);
				let defense = destination.defense;
				if (defense - attack < 0) {
					this[_a].army[destination.item] = 0;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> attacked ' + city2.name() + '`s <strong>' + civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack + ' damage in melee and killed its opponent.');
					this._cell_empty(cell);
				} else {
					remaining = Math.ceil((defense - attack) / civitas.SOLDIERS[destination.item].defense);
					destination.total = remaining;
					this[_a].army[destination.item] = remaining;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> attacked ' + city2.name() + '`s <strong>' + civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack + ' damage in melee.');
				}
				this._cell_under_attack(cell);
				source.moved = true;
				this.redraw();
			}
		}
		this._from = null;
		return true;
	};

	/**
	 * End the current turn.
	 *
	 * @public
	 * @returns {civitas.objects.battleground}
	 */
	this.end_turn = function() {
		this._from = null;
		this._do_computer();
		for (let y = 0; y < this._grid.length; y++) {
			for (let x = 0; x < this._grid[y].length; x++) {
				if (this._grid[y][x] !== null) {
					this._grid[y][x].moved = false;
				}
			}
		}
		this._current_turn++;
		this.on_end_turn.call(self, this.num_turns());
		this.redraw();
		if (!this._done) {
			this.log('Turn <strong>' + this._current_turn + '</strong> started now.');
		}
		return this;
	};

	/**
	* Check the status of the current game.
	*
	* @private
	* @returns {Boolean}
	*/
	this._check_status = function() {
		let city;
		if (!this._done) {
			if (this._stats.attacking.attack <= 0 || this._stats.attacking.defense <= 0 ||
				this._stats.defending.attack <= 0 || this._stats.defending.defense <= 0) {
				this._done = true;
				this._reset();
			}
			if (this._stats.attacking.attack <= 0 || this._stats.attacking.defense <= 0) {
				if (this._defense.city === this.core().get_settlement().id()) {
					this._on_win.call(this, this._defense, this._attack);
					this.on_win.call(this, this._defense, this._attack);
				} else {
					this._on_lose.call(this, this._defense, this._attack);
					this.on_lose.call(this, this._defense, this._attack);
				}
				city = this.core().get_settlement(this._defense.city);
			} else if (this._stats.defending.attack <= 0 || this._stats.defending.defense <= 0) {
				if (this._attack.city === this.core().get_settlement().id()) {
					this._on_win.call(this, this._attack, this._defense);
					this.on_win.call(this, this._attack, this._defense);
				} else {
					this._on_lose.call(this, this._attack, this._defense);
					this.on_lose.call(this, this._attack, this._defense);
				}
				city = this.core().get_settlement(this._attack.city);
			}
			if (this._done) {
				this.log(city.name() + ' won this battle!');
				this.show_stats();
			}
		}
		return false;
	};

	/**
	 * Display the battleground stats.
	 *
	 * @public
	 * @returns {Object}
	 */
	this.show_stats = function() {
		$(this._elements.attack).empty().append(this.core().get_settlement(this._attack.city).name() + ' ' + this._stats.attacking.attack + ' / ' + this._stats.attacking.defense);
		$(this._elements.defense).empty().append(this.core().get_settlement(this._defense.city).name() + ' ' + this._stats.defending.attack + ' / ' + this._stats.defending.defense);
		return {
			attack: this._attack,
			defense: this._defense
		}
	};

	/**
	 * Log a message to the battleground status.
	 *
	 * @public
	 * @param {String} message
	 * @returns {civitas.objects.battleground}
	 */
	this.log = function(message) {
		$(this._elements.console).prepend('<p>' + message + '</p>');
		return this;
	};

	/**
	 * Reset and rebuild the battleground hex cell grid.
	 *
	 * @private
	 * @returns {civitas.objects.battleground}
	 */
	this._reset = function() {
		let mode = 'even';
		let template = '';
		for (let y = 0; y <= this._properties.height - 1; y++) {
			this._grid[y] = [];
			template += '<ol class="' + mode + '">';
			for (let x = 0; x <= this._properties.width - 1; x++) {
				this._grid[y][x] = null;
				template += '<li data-pos="' + x + '-' + y + '" data-x="' + x + '" data-y="' + y + '" class="cell empty"></li>';
			}
			template += '</ol>';
			if (mode === 'even') {
				mode = 'odd';
			} else {
				mode = 'even';
			}
		}
		$(this._elements.container).empty().append(template);
		return this;
	};

	/**
	 * Return the current hex cell grid.
	 *
	 * @public
	 * @returns {Array}
	 */
	this.grid = function() {
		return this._grid;
	};

	/**
	 * Get the current turn.
	 *
	 * @public
	 * @returns {Number}
	 */
	this.num_turns = function() {
		return this._current_turn;
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
	* Get the properties of this battleground.
	*
	* @public
	* @returns {Object}
	*/
	this.properties = function() {
		return this._properties;
	};

	/**
	 * Move closer to the enemy.
	 *
	 * @private
	 * @param {Object} cell
	 * @returns {Boolean}
	 */
	this._move_to_enemy = function(cell) {
		/*
		let sx = cell.x;
		let sy = cell.y;
		let source = this._grid[sy][sx];
		let can_move = civitas.SOLDIERS[source.item].moves;
		if (this._computer === 2) {
			// TODO
		}
		*/
		return false;
	};

	this._do_computer = function() {
		for (let y = 0; y < this._grid.length; y++) {
			for (let x = 0; x < this._grid[y].length; x++) {
				if (this._grid[y][x] !== null && this._grid[y][x].side === this._computer) {
					let source = this._grid[y][x];
					this._from = {
						x: x,
						y: y
					};
					this._cell_select(this._from);
					if (civitas.SOLDIERS[source.item].ranged) {
						this._check_for_ranged_target(this._player);
					} else {
						this._check_for_melee_target(this._player);
					}
					this._move_to_enemy(this._from);
					this._from = null;
				}
			}
		}
		return true;
	};

	/**
	 * Computer check if there are any targets in melee.
	 *
	 * @private
	 * @param {Number} type
	 * @returns {Boolean}
	 */
	this._check_for_melee_target = function(type) {
		if (this._from !== null) {
			let source = this._grid[this._from.y][this._from.x];
			let can_move = civitas.SOLDIERS[source.item].moves;
			for (let y = 0; y < this._grid.length; y++) {
				for (let x = 0; x < this._grid[y].length; x++) {
					if (source !== null && !source.moved && can_move &&
						(Math.abs(y - this._from.y) + Math.abs(x - this._from.x)) <= can_move) {
						if (this._grid[y][x] !== null && this._grid[y][x].side === type) {
							this.attack({
								x: x,
								y: y
							});
							return true;
						}
					}
				}
			}
		}
		return false;
	};

	/**
	 * Check if there are any targets in range.
	 *
	 * @private
	 * @param {Number} type
	 * @returns {Boolean}
	 */
	this._check_for_ranged_target = function(type) {
		if (this._from !== null) {
			for (let y = 0; y < this._grid.length; y++) {
				for (let x = 0; x < this._grid[y].length; x++) {
					if (this._grid[y][x] !== null && this._grid[y][x].side === type) {
						this.attack({
							x: x,
							y: y
						});
						return true;
					}
				}
			}
		}
		return false;
	};
	/**
	 * Internal callback for when someone wins the battleground.
	 *
	 * @private
	 * @param {Object} winner
	 * @param {Object} winner
	 * @returns {civitas.objects.battleground}
	 */
	this._on_win = function(winner, loser) {
		let my_settlement = this.core().get_settlement(winner.city);
		let settlement = this.core().get_settlement(loser.city);
		if (this._attack.city === winner.city) {
			// player was attacking and won.
			settlement.army = settlement.load_army(loser.army);
			settlement.navy = settlement.load_navy(loser.navy);
			let spoils = settlement.get_spoils();
			this.core().add_to_queue(settlement, my_settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
				army: winner.army,
				navy: winner.navy,
				resources: spoils
			});
		} else if (this._defense.city === winner.city) {
			// player was defending and won.
			my_settlement.army = my_settlement.load_army(winner.army);
			my_settlement.navy = my_settlement.load_navy(winner.navy);
			let has_loser_army = settlement.num_soldiers(loser.army);
			let has_loser_navy = settlement.num_ships(loser.navy);
			if (has_loser_army > 0 || has_loser_navy > 0) {
				this.core().add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
					army: loser.army,
					navy: loser.navy,
					resources: {}
				});
			}
		}
		return this;
	};

	/**
	 * Internal callback for when someone loses the battleground.
	 *
	 * @private
	 * @param {Object} winner
	 * @param {Object} winner
	 * @returns {civitas.objects.battleground}
	 */
	this._on_lose = function(winner, loser) {
		let settlement = this.core().get_settlement(winner.city);
		let my_settlement = this.core().get_settlement(loser.city);
		if (this._attack.city === loser.city) {
			// player was attacking and lost.
			settlement.army = settlement.load_army(winner.army);
			settlement.navy = settlement.load_navy(winner.navy);
			let has_loser_army = settlement.num_soldiers(loser.army);
			let has_loser_navy = settlement.num_ships(loser.navy);
			if (has_loser_army > 0 || has_loser_navy > 0) {
				this.core().add_to_queue(settlement, my_settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
					army: loser.army,
					navy: loser.navy,
					resources: {}
				});
			}
		} else if (this._defense.city === loser.city) {
			// player was defending and lost.
			my_settlement.army = my_settlement.load_army(loser.army);
			my_settlement.navy = my_settlement.load_navy(loser.navy);
			let spoils = my_settlement.get_spoils();
			this.core().add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
				army: winner.army,
				navy: winner.navy,
				resources: spoils
			});
		}
		return this;
	};
	/**
	 * Get the distance between two cells.
	 *
	 * @public
	 * @param {Object} cell1
	 * @param {Object} cell2
	 * @returns {Number}
	 */
	this.distance = function(cell1, cell2) {
		let delta_x = cell1.x - cell2.x;  
	    let delta_y = cell1.y - cell2.y;  
	    return ((Math.abs(delta_x) + Math.abs(delta_y) + Math.abs(delta_x - delta_y)) / 2);
	};

	/**
	 * Move the contents of one cell to another cell.
	 *
	 * @public
	 * @param {Object} cell
	 * @returns {Boolean}
	 */
	this.move = function(cell) {
		let sx = this._from.x;
		let sy = this._from.y;
		if (this._from !== null && cell !== null) {
			let source = this._grid[sy][sx];
			let destination = this._grid[cell.y][cell.x];
			let city = this.core().get_settlement(source.city);
			if (source !== null && source.moved) {
				this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> already used up its turn.');
				return false;
			}
			if (source !== null && destination === null && city) {
				let can_move = civitas.SOLDIERS[this._grid[sy][sx].item].moves;
				if ((Math.abs(cell.y - sy) + Math.abs(cell.x - sx)) <= can_move) {
					this._grid[cell.y][cell.x] = this._grid[sy][sx];
					this._cell_empty(this._from);
					this._from = null;
					this._grid[cell.y][cell.x].moved = true;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> moved to ' + (cell.x + 1) + 'x' + (cell.y + 1) + '.');
					this.redraw();
					return true;
				} else {
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + '</strong> is unable to move to the specified location.');
					return false;
				}
			}
		}
	};

	/**
	 * Highlight the cells around the currently selected (or hovered) cell.
	 *
	 * @public
	 * @param {Object} cell
	 * @returns {civitas.objects.battleground}
	 */
	this.highlight_cells = function(cell) {
		this._cells_empty();
		let sx = cell.x;
		let sy = cell.y;
		let source = this._grid[sy][sx];
		if (source !== null) {
			let can_move = civitas.SOLDIERS[source.item].moves;
			for (let y = 0; y < this._grid.length; y++) {
				for (let x = 0; x < this._grid[y].length; x++) {
					if (!source.moved && can_move && (Math.abs(y - sy) +
						Math.abs(x - sx)) <= can_move) {
						if (this._grid[y][x] === null) {
							$(this._elements.container + ' .cell[data-pos=' + x + '-' + y + ']').addClass('canmove');
						}
					}
				}
			}
			let is_ranged = civitas.SOLDIERS[source.item].ranged;
			for (let y = 0; y < this._grid.length; y++) {
				for (let x = 0; x < this._grid[y].length; x++) {
					if (!source.moved && (Math.abs(y - sy) + Math.abs(x - sx)) <= is_ranged) {
						if (this._grid[y][x] === null) {
							$(this._elements.container + ' .cell[data-pos=' + x + '-' + y + ']').addClass('canattack');
						}
					}
				}
			}
		}
		return this;
	};

	/**
	 * Do a nice effect when a cell is under attack.
	 *
	 * @private
	 * @param {Object} cell
	 * @returns {civitas.objects.battleground}
	 */
	this._cell_under_attack = function(cell) {
		$(this._elements.container + ' .cell[data-pos=' + cell.x + '-' + cell.y + ']').addClass('scale').delay(1000).queue(function() {
			$(this).removeClass('scale').dequeue();
		});
		return this;
	};

	/**
	 * Empty all the cells that are already empty.
	 *
	 * @private
	 * @returns {civitas.objects.battleground}
	 */
	this._cells_empty = function() {
		for (let y = 0; y < this._grid.length; y++) {
			for (let x = 0; x < this._grid[y].length; x++) {
				if (this._grid[y][x] === null) {
					this._cell_empty({
						x: x,
						y: y
					});
				}
			}
		}
		return this;
	};

	/**
	 * Empty one cell.
	 *
	 * @private
	 * @param {Object} cell
	 * @returns {civitas.objects.battleground}
	 */
	this._cell_empty = function(cell) {
		this._grid[cell.y][cell.x] = null;
		$(this._elements.container + ' .cell[data-pos=' + cell.x + '-' + cell.y + ']')
			.removeData('side')
			.removeData('amount')
			.removeData('soldier')
			.addClass('empty')
			.removeClass('canmove canattack selected')
			.empty();
		return this;
	};

	/**
	 * Select a cell.
	 *
	 * @private
	 * @param {Object} cell
	 * @returns {civitas.objects.battleground}
	 */
	this._cell_select = function(cell) {
		$(this._elements.container + ' .cell').removeClass('selected canmove canattack');
		$(this._elements.container + ' .cell[data-pos=' + cell.x + '-' + cell.y + ']').addClass('selected');
		this._from = cell;
		this.highlight_cells(cell);
		return this;
	};

	/**
	 * Add a cell to the battleground grid.
	 *
	 * @private
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Object} army
	 * @returns {civitas.objects.battleground}
	 */
	this._cell_add = function(x, y, army) {
		this._grid[y][x] = army;
		$(this._elements.container + ' .cell[data-pos=' + x + '-' + y + ']')
			.removeData('side')
			.removeData('amount')
			.removeData('soldier')
			.attr('data-side', army.side)
			.attr('data-amount', army.total)
			.attr('data-soldier', army.item)
			.removeClass('empty canmove canattack selected')
			.empty()
			.append('<span class="moves' + (army.moved === false ? ' has' : '') + '"></span><img class="tips" title="' + civitas.SOLDIERS[army.item].name + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + army.item + '.png" />' + '<span class="amount">' + army.total + '</span>');
		return this;
	};

	/**
	 * Redraw the grid.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	this.redraw = function() {
		let a_attack = 0;
		let a_defense = 0;
		let d_attack = 0;
		let d_defense = 0;
		for (let y = 0; y < this._grid.length; y++) {
			for (let x = 0; x < this._grid[y].length; x++) {
				let army = this._grid[y][x];
				if (army !== null && army.total > 0) {
					army.attack = army.total * civitas.SOLDIERS[army.item].attack;
					army.defense = army.total * civitas.SOLDIERS[army.item].defense;
					if (army.side === civitas.BATTLEGROUND_ATTACK) {
						a_attack += army.attack;
						a_defense += army.defense;
					} else {
						d_attack += army.attack;
						d_defense += army.defense;
					}
					this._cell_add(x, y, army);
				} else {
					this._cell_empty({
						x: x,
						y: y
					});
				}
			}
		}
		this._stats.attacking.attack = a_attack;
		this._stats.attacking.defense = a_defense;
		this._stats.defending.attack = d_attack;
		this._stats.defending.defense = d_defense;
		this.show_stats();
		this._check_status();
		$('.tipsy').remove();
		$('.tips').tipsy({
			gravity: $.fn.tipsy.autoNS,
			html: true
		});
		return true;
	};

	/**
	 * Setup the battleground hex grid.
	 *
	 * @private
	 * @returns {civitas.objects.battleground}
	 */
	this._setup = function() {
		let self = this;
		this._reset();
		let xx = 0;
		let xxx = 3;
		let yy;
		for (let item in this._attack.army) {
			if (this._attack.army[item] > 0) {
				if (civitas.SOLDIERS[item].siege === true) {
					yy = 0;
					xx = xxx;
					xxx++;
				} else {
					yy = 2;
				}
				this.add(xx, yy, 1, item, this._attack);
				xx++;
			}
		}
		xxx = 3;
		xx = 0;
		for (let item in this._defense.army) {
			if (this._defense.army[item] > 0) {
				if (civitas.SOLDIERS[item].siege === true) {
					yy = this._properties.width - 1;
					xx = xxx;
					xxx++;
				} else {
					yy = this._properties.width - 3;
				}
				this.add(xx, yy, 2, item, this._defense);
				xx++;
			}
		}
		$(this._elements.container).on('mouseover', '.cell', function () {
			if (self._from === null) {
				let from = {
					x: parseInt($(this).data('x')),
					y: parseInt($(this).data('y'))
				};
				self.highlight_cells(from);
			}
			return false;
		}).on('click', '.cell', function () {
			if ($(this).hasClass('empty')) {
				if (self._from !== null) {
					let to = {
						x: parseInt($(this).data('x')),
						y: parseInt($(this).data('y'))
					};
					self.move(to);
					self.on_move.call(self, self._from, to);
				}
			} else {
				if (parseInt($(this).data('side')) === self._player) {
					if (!$(this).hasClass('selected')) {
						let from = {
							x: parseInt($(this).data('x')),
							y: parseInt($(this).data('y'))
						};
						self._cell_select(from);
						self.on_select.call(self, from);
					} else {
						self._from = null;
						$(self._elements.container + ' .cell').removeClass('selected canmove canattack');
					}
				} else if (parseInt($(this).data('side')) === self._computer) {
					if (self._from !== null) {
						let to = {
							x: parseInt($(this).data('x')),
							y: parseInt($(this).data('y'))
						};
						self.attack(to);
						self.on_attack.call(self, self._from, to);
					}
				}
			}
			return false;
		});
		return this;
	};

	/**
	 * Add a hex cell to the battleground grid.
	 *
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} side
	 * @param {String} soldier
	 * @param {Object} settlement
	 * @returns {civitas.objects.battleground}
	 */
	this.add = function(x, y, side, soldier, settlement) {
		this._cell_add(y, x, {
			item: soldier,
			city: settlement.city,
			total: settlement.army[soldier],
			attack: civitas.SOLDIERS[soldier].attack * settlement.army[soldier],
			defense: civitas.SOLDIERS[soldier].defense * settlement.army[soldier],
			side: side,
			moved: false
		});
		return this;
	};

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Hero object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.objects.hero
 * @returns {civitas.objects.hero}
 */
civitas.objects.hero = function (params) {

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Name of the hero.
	 *
	 * @private
	 * @type {String}
	 */
	this._name = null;

	/**
	 * Description of the hero.
	 *
	 * @private
	 * @type {String}
	 */
	this._description = null;

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.objects.hero}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		this._name = params.name;
		this._description = params.description;
		return this;
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

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Main Game window object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.controls.window
 * @returns {civitas.controls.window}
 */
civitas.controls.window = function (params) {

	/**
	 * DOM handle of this window.
	 *
	 * @private
	 * @type {String}
	 */
	this._handle = null;

	/**
	 * Data passed to this window.
	 *
	 * @private
	 * @type {Object}
	 */
	this.params_data = null;

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * DOM id of this panel.
	 * 
	 * @type {String}
	 * @private
	 */
	this.id = null;

	/**
	 * Localized title of the window.
	 * 
	 * @private
	 * @type {String}
	 */
	this.title = null;

	/**
	 * Callback function when the window is shown (created).
	 *
	 * @public
	 * @type {Function}
	 */
	this.on_show = null;

	/**
	 * Callback function when the window is hidden (destroyed).
	 *
	 * @public
	 * @type {Function}
	 */
	this.on_hide = null;

	/**
	 * Object destructor.
	 * 
	 * @private
	 * @returns {Boolean}
	 */
	this.__destroy = function () {
		this.core().log('ui', 'Destroying window with id `' + this.id() + '`');
		$(this.handle()).remove();
		$('.tipsy').remove();
		this.on_hide.call(this);
		return false;
	};

	/**
	 * Method for destroying the window.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.destroy = function () {
		return this.__destroy();
	};

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.controls.window}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		this._id = params.id;
		this._handle = '#window-' + this.id();
		this.params_data = params.data;
		if (params.on_show instanceof Function) {
			this.on_show = params.on_show;
		} else {
			this.on_show = function() {};
		}
		if (params.on_hide instanceof Function) {
			this.on_hide = params.on_hide;
		} else {
			this.on_hide = function() {};
		}
		if (civitas.ui.window_exists(this.handle())) {
			this.destroy();
		}
		this.core().log('ui', 'Creating window with id `' + this.id() + '`');
		$('body').append(params.template.replace(/{ID}/g, this.id()));
		this.on_show.call(this);
		$('.tipsy').remove();
		$('.tips').tipsy({
			gravity: $.fn.tipsy.autoNS,
			html: true
		});
		return this;
	};

	/**
	 * Return a pointer to the window id.
	 *
	 * @public
	 * @returns {String}
	 */
	this.id = function() {
		return this._id;
	};

	/**
	 * Return a pointer to the window DOM handle.
	 *
	 * @public
	 * @returns {String}
	 */
	this.handle = function() {
		return this._handle;
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

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Main modal object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.controls.modal
 * @returns {civitas.controls.modal}
 */
civitas.controls.modal = function (params) {

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * Template of the modal window.
	 *
	 * @private
	 * @type {String}
	 */
	this._template = '<div class="modal-overlay">' +
			'<div class="modal">' +
				'<header></header>' +
				'<section></section>' +
				'<footer></footer>' +
			'</div>' +
		'</div>';

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.controls.modal}
	 * @param {Object} params
	 */
	this.__init = function(params) {
		this._core = params.core;
		let self = this;
		$('body').append(this._template);
		$(window).bind('resize', function() {
			self._resize();
		});
		return this;
	};

	/**
	 * Main method to show the modal window.
	 *
	 * @public
	 * @param {Object} options
	 * @returns {civitas.objects.modal}
	 */
	this.alert = function(options) {
		let self = this;
		let settlement = false;
		if (this.core().settlements.length > 0) {
			settlement = this.core().get_settlement();
		}
		if (this._is_open()) {
			return false;
		}
		civitas.ui.show_loader();
		$('.modal').css({
			width: '400px'
		});
		this._resize();
		$('.modal header').html(options.title);
		$('.modal footer').html('<a data-id="yes" href="#" class="btn float-right">Yes</a><a data-id="no" href="#" class="btn">No</a>');
		$('.modal section').html((settlement ? '<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + this.core().get_settlement().ruler().avatar + '.png" />' : '') + '<p>' + options.text + '</p>');
		$('.modal footer').on('click', 'a', function() {
			self._action($(this).data('id'));
			return false;
		});
		$('.modal-overlay, .modal').show();
		if (typeof options.on_click === 'function') {
			this.on_click = options.on_click;
		}
		return this;
	};

	/**
	 * Internal method to check out if the modal window is already open.
	 *
	 * @private
	 * @returns {Boolean}
	 */
	this._is_open = function() {
		return $('.modal').css('display') === "block";
	};

	/**
	 * Internal method for resetting the modal window.
	 *
	 * @private
	 * @returns {Boolean}
	 */
	this._clear = function() {
		$('.modal-overlay').remove();
		// $('body').append(this._template);
		civitas.ui.hide_loader();
		// this._resize();
		return true;
	};

	/**
	 * Internal method for triggering the click event on the buttons.
	 *
	 * @private
	 * @param {String} key
	 */
	this._action = function(key) {
		this._clear();
		this.on_click(key);
		$(window).unbind('resize');
	};

	/**
	 * Internal method for resizing the modal window.
	 *
	 * @private
	 * @returns {civitas.objects.modal}
	 */
	this._resize = function() {
		let lbox = $('.modal');
		let height = parseInt((lbox.css('height')).replace('px', ''));
		let width = parseInt((lbox.css('width')).replace('px', ''));
		lbox.css({
			top: ($(window).height() / 2) - 100 + 'px',
			left: ($(window).width() - width) / 2 + 'px'
		});
		return this;
	};

	/**
	 * Callback function.
	 *
	 * @public
	 */
	this.on_click = function() {
		// nothing here, move along.
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
	 * Object destructor.
	 * 
	 * @private
	 * @returns {Boolean}
	 */
	this.__destroy = function() {
		$('.modal-overlay').remove();
		$(window).unbind('resize');
		return false;
	};

	// Fire up the constructor
	return this.__init(params);
};

/**
 * Main Game panel object.
 * 
 * @param {Object} params
 * @license GPLv3
 * @class civitas.controls.panel
 * @returns {civitas.controls.panel}
 */
civitas.controls.panel = function (params) {

	/**
	 * DOM handle of this panel.
	 *
	 * @private
	 * @type {String}
	 */
	this.handle = null;

	/**
	 * Reference to the core object.
	 *
	 * @private
	 * @type {civitas.game}
	 */
	this._core = null;

	/**
	 * DOM id of this panel.
	 *
	 * @private
	 * @type {String}
	 */
	this.id = null;

	/**
	 * Data passed to this panel.
	 *
	 * @private
	 * @type {Object}
	 */
	this.params_data = null;

	/**
	 * Localized title of the panel.
	 *
	 * @private
	 * @type {String}
	 */
	this.title = null;

	/**
	 * Callback function when the panel is shown.
	 *
	 * @public
	 * @type {Function}
	 */
	this.on_show = null;

	/**
	 * Callback function when the panel is hidden (destroyed).
	 *
	 * @public
	 * @type {Function}
	 */
	this.on_hide = null;

	/**
	 * Callback function when the panel is refreshed.
	 *
	 * @public
	 * @type {Function}
	 */
	this.on_refresh = null;

	/**
	 * Object destructor.
	 * 
	 * @private
	 * @returns {Boolean}
	 */
	this.__destroy = function () {
		this.core().log('ui', 'Destroying panel with id `' + this.id + '`');
		$(this.handle).remove();
		let panels = this.core().get_panels();
		for (let i = 0; i < panels.length; i++) {
			if (panels[i].id === this.id) {
				panels.splice(i, 1);
			}
		}
		$('.ui > .viewport').width($(window).width() - $('.ui > aside').width());
		$('.tipsy').remove();
		this.on_hide.call(this);
		return false;
	};

	/**
	 * Method for destroying the panel.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	this.destroy = function () {
		return this.__destroy();
	};

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {civitas.controls.panel}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		let self = this;
		this._core = params.core;
		this.id = params.id;
		this.handle = '#panel-' + this.id;
		this.params_data = params.data;
		if (params.on_show instanceof Function) {
			this.on_show = params.on_show;
		} else {
			this.on_show = function() {};
		}
		if (params.on_hide instanceof Function) {
			this.on_hide = params.on_hide;
		} else {
			this.on_hide = function() {};
		}
		if (params.on_refresh instanceof Function) {
			this.on_refresh = params.on_refresh;
		} else {
			this.on_refresh = function() {};
		}
		if (civitas.ui.panel_exists(this.handle)) {
			this.destroy();
		}
		this.core().log('ui', 'Creating panel with id `' + this.id + '`');
		let tpl = params.template.replace(/{ID}/g, params.id);
		if (typeof this.params_data !== 'undefined' && 
			typeof this.params_data.name !== 'undefined' &&
			typeof this.params_data.name !== 'function') {
			tpl = tpl.replace(/{BUILDING}/g, this.params_data.handle);
			if (this.params_data.sidebar === true) {
				$('.ui > aside').empty().append(tpl);
				$('.ui > .viewport').width($(window).width() - $('.ui > aside').width());
			} else {
				$('.ui').append(tpl);
			}
			$(this.handle + ' header').append(this.params_data.name);
		} else {
			$('.ui').append(tpl);
		}
		this.on_show.call(this, params);
		this.on_refresh.call(this, params);
		if (typeof params.data !== 'undefined') {
			let building = this.core().get_settlement().get_building(params.data.handle);
			if (building !== false) {
				if (!building.is_upgradable()) {
					$(this.handle + ' footer .upgrade').hide();
				}
				if (!building.is_downgradable()) {
					$(this.handle + ' footer .downgrade').hide();
				}
				if (building.is_marketplace()) {
					$(this.handle + ' footer .demolish').hide();
				}
				if (building.is_production_building()) {
					if (!building.is_stopped()) {
						$(this.handle + ' .pause').removeClass('start').attr('title', 'Stop production');
					} else {
						$(this.handle + ' .start').removeClass('pause').attr('title', 'Start production');
					}
				} else {
					$(this.handle + ' .start, ' + this.handle + ' .pause').hide();
				}
				$(this.handle).on('click', '.upgrade', function () {
					self.core().open_modal(
						function(button) {
							if (button === 'yes') {
								if (building.upgrade()) {
									if (!building.is_upgradable()) {
										$(self.handle + ' footer .upgrade').hide();
									} else {
										$(self.handle + ' footer .downgrade').show();
									}
								}
							}
						},
						'Are you sure you want to upgrade this building?'
					);
					return false;
				}).on('click', '.downgrade', function () {
					self.core().open_modal(
						function(button) {
							if (button === 'yes') {
								if (building.downgrade()) {
									if (!building.is_downgradable()) {
										$(self.handle + ' footer .downgrade').hide();
									} else {
										$(self.handle + ' footer .upgrade').show();
									}
								}
							}
						},
						'Are you sure you want to downgrade this building?'
					);
					return false;
				}).on('click', '.demolish', function () {
					self.core().open_modal(
						function(button) {
							if (button === 'yes') {
								if (building.demolish(true)) {
									self.destroy();
									self.core().save_and_refresh();
								}
							}
						},
						'Are you sure you want to demolish this building?'
					);
					return false;
				}).on('click', '.pause', function () {
					if (building.stop_production()) {
						$(this).removeClass('pause').addClass('start');
						$(this).attr('title', 'Start production');
					}
					return false;
				}).on('click', '.start', function () {
					if (building.start_production()) {
						$(this).removeClass('start').addClass('pause');
						$(this).attr('title', 'Stop production');
					}
					return false;
				});
			}
		}
		$(this.handle).on('click', 'header', function () {
			$('.ui .panel').css({
				'z-index': 99996
			});
			$(self.handle).css({
				'z-index': 99997
			});
		}).on('click', '.close', function () {
			self.destroy();
			return false;
		});
		if ((typeof this.params_data === 'undefined') || (typeof this.params_data !== 'undefined' && this.params_data.sidebar !== true)) {
			$(this.handle).draggable({
				handle: 'header',
				containment: 'window',
				start: function() {
					$(this).css({
						height: 'auto'
					});
				},
				stop: function() {
					$(this).css({
						height: 'auto'
					});
				}
			});
		}
		$(this.handle + ' .tabs').tabs();
		$(this.handle).css({
			'left': ($(window).width() / 2) - ($(this.handle).width() / 2),
			'top': ($(window).height() / 2) - ($(this.handle).height() / 2)
		});
		$('.tipsy').remove();
		$('.tips').tipsy({
			gravity: $.fn.tipsy.autoNS,
			html: true
		});
		return this;
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

	// Fire up the constructor
	return this.__init(params);
};

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
			research = civitas.RESEARCH[civitas.RESEARCH.findIndexM(handle)]
			if (research !== false) {
				this.get_settlement().remove_resources(research.cost);
				this._research.push({
					handle: handle
				});
				this._notify({
					title: 'Research: ' + research.title,
					mode: civitas.NOTIFY_RESEARCH,
					content: research.description,
					timeout: false
				});
				this.log('research', 'Research Completed: ' + research.description);
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
			achievement = civitas.ACHIEVEMENTS[civitas.ACHIEVEMENTS.findIndexM(handle)]
			if (achievement !== false) {
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
		let campaign = this._queue[id];
		let failed = true;
		let settlement = this.get_settlement(campaign.source.id);
		let destination_settlement = this.get_settlement(campaign.destination.id);
		if (campaign.mode === civitas.ACTION_CAMPAIGN) {
			let random = Math.ceil(Math.random() * 100);
			let amount = Math.floor(campaign.data.espionage / 100);
			if (settlement.is_player()) {
				if (campaign.type === civitas.CAMPAIGN_ARMY && !settlement.can_recruit_soldiers()) {
					this.remove_action(id);
					return false;
				}
				if (campaign.type === civitas.CAMPAIGN_SPY && !settlement.can_diplomacy()) {
					this.remove_action(id);
					return false;
				}
				if (campaign.type === civitas.CAMPAIGN_CARAVAN && !settlement.can_trade()) {
					this.remove_action(id);
					return false;
				}
			}
			switch (campaign.type) {
				case civitas.CAMPAIGN_ARMY:
					this.notify('The army sent from ' + settlement.name() + ' to ' + destination_settlement.name() + ' ' + campaign.duration + ' days ago reached its destination.');
					if (!this.get_panel('battle')) {
						this.open_window(civitas.WINDOW_BATTLE, {
							source: campaign,
							destination: destination_settlement
						});
					}
					break;
				case civitas.CAMPAIGN_ARMY_RETURN:
					this.notify('The army sent from ' + destination_settlement.name() + ' to ' + settlement.name() + ' ' + (campaign.duration * 2) + ' days ago reached its home town.');
					destination_settlement.merge_army(campaign.data.army);
					destination_settlement.merge_navy(campaign.data.navy);
					destination_settlement.merge_resources(campaign.data.resources);
					break;
				case civitas.CAMPAIGN_SPY:
					if (typeof campaign.data.espionage !== 'undefined') {
						switch (campaign.data.mission) {
							case civitas.SPY_MISSION_RELIGION:
								if (random <= Math.ceil(campaign.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									if (campaign.source.id === settlement.id()) {
										destination_settlement.religion(campaign.data.religion);
										let religion = destination_settlement.religion();
										this.notify('The spy you sent ' + campaign.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and managed to convince the settlement council to change the religion to ' + religion.name + '.');
									} else if (campaign.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(campaign.source.id);
										settlement.religion(campaign.data.religio);
										let religion = settlement.religion();
										this.notify('The spy sent from ' + destination_settlement.name() + ' ' + campaign.duration + ' days ago to our city reached its destination and managed to convince your city council to change the religion to ' + religion.name + '.');
									}
									failed = false;
								}
								break;
							case civitas.SPY_MISSION_INFLUENCE:
								if (random <= Math.ceil(campaign.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									if (campaign.source.id === settlement.id()) {
										settlement.raise_influence(campaign.destination.id, amount);
										this.notify('The spy you sent ' + campaign.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and increased your influence over this settlement.');
									} else if (campaign.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(campaign.source.id);
										// TODO
										// destination_settlement.raise_influence(campaign.destination.id, amount);
										this.notify('The spy sent from ' + destination_settlement.name() + ' ' + campaign.duration + ' days ago to our city reached its destination and lowered your influence over this settlement.');
									}
									failed = false;
								}
								break;
							case civitas.SPY_MISSION_STEAL_RESOURCES:
								if (random <= Math.ceil(campaign.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									// TODO
									failed = false;
								}
								break;
							case civitas.SPY_MISSION_INSTIGATE:
								if (random <= Math.ceil(campaign.data.espionage / civitas.MAX_ESPIONAGE_SUCESS_RATE)) {
									if (campaign.source.id === settlement.id()) {
										destination_settlement.lower_prestige(amount);
										this.notify('The spy you sent ' + campaign.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination and incited the population to revolt, therefore lowering the prestige of the city.');
									} else if (campaign.destination.id === settlement.id()) {
										destination_settlement = this.get_settlement(campaign.source.id);
										settlement.lower_prestige(amount);
										this.notify('The spy sent from ' + destination_settlement.name() + ' ' + campaign.duration + ' days ago to our city reached its destination and incited our population to revolt, therefore lowering the prestige of our city.');
									}
									failed = false;
								}
								break;
						}
					}
					break;
				case civitas.CAMPAIGN_CARAVAN:
					let total = 0;
					if (typeof campaign.data.resources !== 'undefined') {
						for (let item in campaign.data.resources) {
							if (!civitas.utils.is_virtual_resource(item)) {
								total += civitas.utils.calc_price(campaign.data.resources[item], item);
							} else if (item === 'coins') {
								total += campaign.data.resources[item];
							}
							destination_settlement.add_to_storage(item, campaign.data.resources[item]);
						}
						settlement.raise_influence(campaign.destination.id, civitas.CARAVAN_INFLUENCE);
						this.notify('The caravan sent from ' + settlement.name() + ' to ' + destination_settlement.name() + campaign.duration + ' days ago reached its destination.');
					}
					break;
			}
			/*
			if (failed === true) {
				if (campaign.destination.id === this.get_settlement().id()) {
					destination_settlement = this.get_settlement(campaign.source.id);
					this.notify('The ' + class_name + ' sent by ' + destination_settlement.name() + ' ' + campaign.duration + ' days ago reached its destination.');
				} else {
					this.notify('The ' + class_name + ' you sent ' + campaign.duration + ' days ago to ' + destination_settlement.name() + ' reached its destination.');
				}
			}
			*/
		} else if (campaign.mode === civitas.ACTION_DIPLOMACY) {
			if (settlement.is_player() && !settlement.can_diplomacy()) {
				this.remove_action(id);
				return false;
			}
			switch (campaign.type) {
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
				if (campaign.source.id === settlement.id()) {
					this.notify('The proposal you sent ' + campaign.duration + ' days ago to ' + destination_settlement.name() + ' was accepted.');
				}
			}
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
		let s_loc = source_settlement.location();
		let d_loc = destination_settlement.location();
		let duration = civitas.utils.get_distance_in_days(s_loc, d_loc);
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
		}
		action = {
			mode: mode,
			source: {
				x: s_loc.x,
				y: s_loc.y,
				id: source_settlement.id()
			},
			destination: {
				x: d_loc.x,
				y: d_loc.y,
				id: destination_settlement.id()
			},
			duration: duration,
			passed: 0,
			type: type,
			data: data
		};
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

/**
 * Settlement panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_SETTLEMENT = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>' +
				'<a class="tips close" title="Close"></a>' +
			'</header>' +
			'<section></section>' +
			'<footer>' +
				'<a class="tips attack" title="Attack this settlement." href="#"></a>' +
				'<a class="tips caravan" title="Send a caravan to this settlement." href="#"></a>' +
				'<a class="tips spy" title="Send a spy to this settlement." href="#"></a>' +
				'<a class="tips alliance" title="Propose an alliance to this settlement." href="#"></a>' +
				'<a class="tips pact" title="Propose a pact to this settlement." href="#"></a>' +
				'<a class="tips ceasefire" title="Propose a cease fire to this settlement." href="#"></a>' +
				'<a class="tips join" title="Ask this settlement to join your city." href="#"></a>' +
				'<a class="tips war" title="Declare war to this settlement." href="#"></a>' +
			'</footer>' +
		'</div>',
	params_data: null,

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'settlement',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = params.data;
		this.params_data = params;
		let trades = settlement.get_trades();
		$(this.handle + ' header').append(settlement.name());
		let tabs = [];
		if (settlement.is_urban()) {
			tabs.push('Info');
			if (my_settlement.can_diplomacy()) {
				tabs.push('Army');
				if (settlement.waterside() === true) {
					tabs.push('Navy');
				}
			}
			tabs.push('Resources', 'Imports', 'Exports');
		} else {
			tabs.push('Info');
			if (my_settlement.can_diplomacy() || settlement.is_camp()) {
				tabs.push('Army');
				if (settlement.waterside() === true) {
					tabs.push('Navy');
				}
			}
			tabs.push('Resources');
		}
		$(this.handle + ' section').append(civitas.ui.tabs(tabs));
		$(this.handle).on('click', '.alliance', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to propose an alliance to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_ALLIANCE, {})) {
							core.error('There was an error proposing an alliance to this settlement, check the data you entered and try again.');
							return false;
						}
						core.achievement('pacifist');
					}
				},
				'Are you sure you want to propose an alliance to this settlement?'
			);
			return false;
		}).on('click', '.join', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to ask other settlements to join your city.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_JOIN, {})) {
							core.error('There was an error proposing this settlement to join your city, check the data you entered and try again.');
							return false;
						}
						core.achievement('rulethemall');
					}
				},
				'Are you sure you want to propose this this settlement to join you?'
			);
			return false;
		}).on('click', '.pact', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to propose a pact to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_PACT, {})) {
							core.error('There was an error proposing a pact to this settlement, check the data you entered and try again.');
							return false;
						}
						core.achievement('friendly');
					}
				},
				'Are you sure you want to propose a pact to this settlement?'
			);
			return false;
		}).on('click', '.ceasefire', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to propose a cease fire to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						if (!core.add_to_queue(my_settlement, settlement, civitas.ACTION_DIPLOMACY,
							civitas.DIPLOMACY_PROPOSE_CEASE_FIRE, {})) {
							core.error('There was an error proposing a cease fire to this settlement, check the data you entered and try again.');
							return false;
						}
					}
				},
				'Are you sure you want to propose a cease fire to this settlement?'
			);
			return false;
		}).on('click', '.war', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to declare war to other settlements.');
				return false;
			}
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						my_settlement.diplomacy(settlement.id(), civitas.DIPLOMACY_WAR);
					}
				},
				'Are you sure you want to declare war to this settlement?<br /><br />You will lose all influence over ' + settlement.name() + ' and the settlement might retaliate back!'
			);
			return false;
		}).on('click', '.caravan', function () {
			if (!my_settlement.can_trade()) {
				core.error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			core.open_panel(civitas.PANEL_NEW_CARAVAN, settlement);
			return false;
		}).on('click', '.spy', function () {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to send spies to other settlements.');
				return false;
			}
			core.open_panel(civitas.PANEL_NEW_SPY, settlement);
			return false;
		}).on('click', '.attack', function () {
			if (!my_settlement.can_recruit_soldiers()) {
				core.error('You will need to construct a Military Camp before being able to attack other settlements.');
				return false;
			}
			core.open_panel(civitas.PANEL_NEW_ARMY, settlement);
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
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = this.params_data.data;
		let trades = settlement.get_trades();
		let _status = my_settlement.get_diplomacy_status(settlement.id());
		let sett_type_text = '';
		let location = my_settlement.location();
		if (settlement.is_city()) {
			sett_type_text = 'City';
		} else if (settlement.is_metropolis()) {
			sett_type_text = 'Metropolis';
		} else if (settlement.is_village()) {
			sett_type_text = 'Village';
		} else if (settlement.is_camp()) {
			sett_type_text = 'Raider Camp';
		}
		$(this.handle + ' #tab-info').empty().append('' +
			'<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + settlement.ruler().avatar + '.png" />' +
			'<dl>' +
				'<dt>' + settlement.ruler().title + '</dt><dd>' + settlement.ruler().name + '</dd>' +
				'<dt>Settlement Type</dt>' +
				'<dd>' + sett_type_text + '</dd>' +
				'<dt>Climate</dt>' +
				'<dd>' + settlement.climate().name + '</dd>' +
				(my_settlement.can_diplomacy() ?
				'<dt>Personality</dt>' +
				'<dd>' + settlement.personality().name + '</dd>'
				: '') +
				'<dt>Nationality</dt>' +
				'<dd>' + settlement.nationality().name + '</dd>' +
				(my_settlement.can_diplomacy() && (settlement.is_urban()) ? 
				'<dt>Level</dt>' +
				'<dd>' + settlement.level() + '</dd>' +
				'<dt>Prestige</dt>' +
				'<dd>' + civitas.ui.progress((settlement.prestige() * 100) / civitas.MAX_PRESTIGE_VALUE, 'small', settlement.prestige()) + '</dd>'
				: '') + 
				'<dt>Population</dt>' +
				'<dd>' + civitas.utils.nice_numbers(settlement.population()) + '</dd>' +
				(my_settlement.can_diplomacy() ?
				'<dt>Coins</dt>' +
				'<dd>' + civitas.utils.nice_numbers(settlement.coins()) + '</dd>' +
				'<dt>Religion</dt>' +
				'<dd>' + settlement.religion().name + '</dd>' +
				'<dt>Influence</dt>' +
				'<dd>' + civitas.ui.progress(my_settlement.get_influence_with_settlement(settlement.id()), 'small') + '</dd>' +
				'<dt>Diplomatic Status</dt>' +
				'<dd>' + my_settlement.get_diplomacy_status(settlement.id()).name + '</dd>'
				: '') + 
				'<dt>Distance</dt>' +
				'<dd>' + civitas.utils.get_distance(location, settlement.location()) + ' miles (' + civitas.utils.get_distance_in_days(location, settlement.location()) + ' days)</dd>' +
			'</dl>');
		if (my_settlement.can_diplomacy() || settlement.is_camp()) {
			$(this.handle + ' #tab-army').empty().append(civitas.ui.army_list(settlement.get_army()));
			if (settlement.waterside() === true) {
				$(this.handle + ' #tab-navy').empty().append(civitas.ui.navy_list(settlement.get_navy()));
			}
		}
		if (settlement.is_urban()) {
			$(this.handle + ' #tab-imports').empty().append('<p>Below are the goods this city will be buying this year.</p>' + civitas.ui.trades_list(trades, 'imports'));
			$(this.handle + ' #tab-exports').empty().append('<p>Below are the goods this city will be selling this year.</p>' + civitas.ui.trades_list(trades, 'exports'));
		}
		let out = '';
		let _out = '<p>This settlement has the the following resources:</p>';
		for (let item in settlement.get_resources()) {
			if (!civitas.utils.is_virtual_resource(item)) {
				if (settlement.resources[item] > 0) {
					out += civitas.ui.resource_storage_small_el(item, settlement.resources[item]);
				}
			}
		}
		if (out !== '') {
			_out += out;
		} else {
			_out = '<p>This settlement has no resources.</p>';
		}
		$(this.handle + ' #tab-resources').empty().append(_out);
		if (_status.id === civitas.DIPLOMACY_VASSAL) {
			$(this.handle + ' footer .attack').css('display','none');
		} else {
			$(this.handle + ' footer .attack').css('display', 'inline-block');
		}
		if (my_settlement.can_diplomacy()) {
			if (settlement.is_camp()) {
				$(this.handle + ' footer .caravan, ' + this.handle + ' footer .spy').hide();
			} else {
				$(this.handle + ' footer .caravan, ' + this.handle + ' footer .spy').css('display', 'inline-block');
			}
			if (_status.id === civitas.DIPLOMACY_PACT && (settlement.is_urban())) {
				$(this.handle + ' footer .alliance').css('display', 'inline-block');
			} else if (!settlement.is_camp()) {
				$(this.handle + ' footer .alliance').css('display','none');
			}
			if ((_status.id === civitas.DIPLOMACY_TRUCE || _status.id === civitas.DIPLOMACY_CEASE_FIRE) && !settlement.is_camp()) {
				$(this.handle + ' footer .pact').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .pact').css('display','none');
			}
			if (_status.id === civitas.DIPLOMACY_WAR && !settlement.is_camp()) {
				$(this.handle + ' footer .ceasefire').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .ceasefire').css('display','none');
			}
			if ((_status.id !== civitas.DIPLOMACY_WAR && _status.id !== civitas.DIPLOMACY_VASSAL) && !settlement.is_camp()) {
				$(this.handle + ' footer .war').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .war').css('display','none');
			}
			if ((_status.id === civitas.DIPLOMACY_PACT && settlement.is_village()) && !settlement.is_camp()) {
				$(this.handle + ' footer .join').css('display', 'inline-block');
			} else {
				$(this.handle + ' footer .join').css('display','none');
			}
		}
	}
};

/**
 * Help panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_HELP = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('Help'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'help',
	
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
		$(this.handle + ' section').append(civitas.ui.tabs([
			'About',
			'Buildings',
			'Settlements',
			'Religion',
			'Research'
		]));
		$(this.handle + ' #tab-buildings').empty().append(
			'<fieldset>' +
				'<legend>Table of Contents</legend>' +
				'<ul>' +
					'<li><a href="#">Intro</a></li>' +
					'<li><a href="#">Build</a></li>' +
					'<li><a href="#">Upgrade</a></li>' +
					'<li><a href="#">Demolish</a></li>' +
					'<li><a href="#">Production</a></li>' +
					'<li><a href="#">Housing</a></li>' +
					'<li><a href="#">Municipal</a></li>' +
					'<li><a href="#">Storage</a></li>' +
					'<li><a href="#">Coins</a></li>' +
				'</ul>' +
			'</fieldset>' +
			'<h3>Intro</h3>' +
			'<p>In Civitas, buildings are the backbone of your city, providing you with goods for export.</p>' +
			'<h3>Build</h3>' +
			'<p>Each building has some special requirements to build, whether a required city level or another existing building.</p>' +
			'<h3>Upgrade</h3>' +
			'<p>Upgrading one of your buildings has several benefits, besides the obvious estetic one.</p>' +
			'<img title="Level 1 house" class="help tips" src="' + civitas.ASSETS_URL + 'images/assets/buildings/house1.png" /> ' +
			'<img title="Level 3 house" class="help tips" src="' + civitas.ASSETS_URL + 'images/assets/buildings/house3.png" /> ' +
			'<img title="Maximum level house" class="help tips" src="' + civitas.ASSETS_URL + 'images/assets/buildings/house5.png" />' +
			'<p>Upgrading a building costs the initial building price multiplied by the level. So, if a building initially costs 100 ' + civitas.ui.resource_small_img('coins') + ' and 20 ' + civitas.ui.resource_small_img('wood') + ' to construct, upgrading it to level 2 will cost 200 ' + civitas.ui.resource_small_img('coins') + ' and 40 ' + civitas.ui.resource_small_img('wood') + ', so on.</p>' +
			'<p>When a building is upgraded, it produces the inital amount of goods multiplied by the level of the building. Keep in mind that the materials it uses for production are the same as for a building of level 1, so upgrading a building is an easy way of getting double (or triple) the production goods for the same materials as the previous level used.</p>' +
			'<h3>Demolish</h3>' +
			'<p>Demolishing a building has no actual benefits except it no longer used the production materials (a better way to adjust that will be to stop the production of the specific building, this way you can restart it when you want).</p>' +
			'<h3>Production</h3>' +
			'<p></p>' +
			'<h3>Housing</h3>' +
			'<p></p>' +
			'<h3>Municipal</h3>' +
			'<p></p>' +
			'<h3>Storage</h3>' +
			'<p>The goods you`re producing need a storage place inside your city, the initial Marketplace provides some storage space (100k <img class="small" src="' + civitas.ASSETS_URL + 'images/assets/resources/storage.png" /> ), and it can be increased even further with upgrading, but you will need to build Warehouses to store all the goods. If you have no free storage space, the produced goods will be lost.</p>' +
			'<h3>Coins</h3>' +
			'<p>Your city can only gain coins through trades and taxes.</p>');
		$(this.handle + ' #tab-religion').empty().append('<h2>Religion</h2>');
		$(this.handle + ' #tab-settlements').empty().append('<fieldset>' +
				'<legend>Table of Contents</legend>' +
				'<ul>' +
					'<li><a href="#">Intro</a></li>' +
					'<li><a href="#">Cities and villages</a></li>' +
					'<li><a href="#">Diplomacy</a></li>' +
					'<li><a href="#">Fame and levels</a></li>' +
					'<li><a href="#">Influence</a></li>' +
					'<li><a href="#">Espionage</a></li>' +
					'<li><a href="#">Prestige</a></li>' +
					'<li><a href="#">Pacts and alliances</a></li>' +
					'<li><a href="#">Wars</a></li>' +
					'<li><a href="#">Caravans</a></li>' +
				'</ul>' +
			'</fieldset>' +
			'<h3>Intro</h3>' +
			'<p></p>' +
			'<h3>Cities and villages</h3>' +
			'<p></p>' +
			'<h3>Diplomacy</h3>' +
			'<p></p>' +
			'<h3>Fame and levels</h3>' +
			'<p>Each time you reach a specific fame level, your city gets a new level, thus you never lose your initial fame. There are several ways of getting extra fame (besides your initial Marketplace), there are several municipal buildings that add a small amount of fame to your city each day (this amount can be increased by upgrading the buildings).</p>' +
			'<p>There is no fixed way in which you can lose fame, except the random events that occur from time to time, or if another city manages to incite your population to revolt.</p>' +
			'<p>The current maximum level a settlement can reach is <strong>' + civitas.MAX_SETTLEMENT_LEVEL + '</strong> and to reach that level your city will need <strong>' + civitas.utils.nice_numbers(civitas.LEVELS[civitas.MAX_SETTLEMENT_LEVEL - 1]) + '</strong> ' + civitas.ui.resource_small_img('fame') + '. There is no fixed date (in game or real days) to reach that level, it all depends on your decisions, buildings, diplomacy, etc.</p>' +
			'<h3>Influence</h3>' +
			'<p>All settlements in the game world have an influence rating with each of the other settlements. The influence drops over time (yearly) and needs to be kept above a certain level, else the other cities might attack your city.</p>' +
			'<p>Maximum influence a settlement can have is <strong>' + civitas.MAX_INFLUENCE_VALUE + '</strong>.</p>' +
			'<h3>Espionage</h3>' +
			'<p>After building your city Embassy, you can start assigning spies to other settlements using your accumulated espionage points. Depending on the amount of espionage you use for a spy mission, that mission has a rate of success. The most points you can assign are <strong>' + civitas.MAX_ESPIONAGE_VALUE + '</strong> ' + civitas.ui.resource_small_img('espionage') + ' (maximum espionage points a city can get) and this gives you approximately a <strong>' + (civitas.MAX_ESPIONAGE_VALUE / civitas.MAX_ESPIONAGE_SUCESS_RATE) + '%</strong> success rate.</p>' +
			'<h3>Prestige</h3>' +
			'<p>Prestige is a very important feature of your city because it influences the way other settlements see you and they will act upon that information. Low prestige might be good for your city if you plan to lay low and prepare (the other settlements won`t bother to go to war with a city with low prestige unless you manage somehow to piss them off) but usually, your city prestige should raise with the city level.</p>' +
			'<p>Prestige is gained through trading with other settlements, sending caravans with resources to help them when in need, etc. Random events can also affect your city prestige. The maximum prestige a settlement can get is <strong>' + civitas.MAX_PRESTIGE_VALUE + '</strong> ' + civitas.ui.resource_small_img('prestige') + '.</p>' +
			'<h3>Pacts and alliances</h3>' +
			'<p></p>' +
			'<h3>Wars</h3>' +
			'<p></p>' +
			'<h3>Caravans</h3>' +
			'<p></p>');
		$(this.handle + ' #tab-about').empty().append('<h2>About Civitas</h2>' +
			'<p>Civitas is an empire-building game written in Javascript with the help of the <a target="_blank" href="https://jquery.com">jQuery</a> library. All the development is done over <a target="_blank" href="https://github.com/sizeofcat/civitas">GitHub</a> and everybody can contribute.</p>' +
			'<p>Civitas is written by <a target="_blank" href="https://sizeof.cat">sizeof(cat)</a>, is free and distributed under the <a target="_blank" href="https://raw.githubusercontent.com/sizeofcat/civitas/master/LICENSE">GPLv3 license</a>.</p>' +
			'<p>Big thanks to:</p>' +
			'<ul>' +
				'<li><a target="_blank" href="https://soundcloud.com/shantifax">Shantifax</a> for the music (Glandula Pinealis).</li>' +
				'<li><a target="_blank" href="http://bluebyte.com">Blue Byte</a> for Anno 1404.</li>' +
			'</ul>');
		$(this.handle + ' #tab-research').empty().append('<h2>Research</h2>');
		$(this.handle + ' #tab-diplomacy').empty().append('<h2>Diplomacy</h2>');
	}
};

/**
 * Debug panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_DEBUG = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('Debug'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'debug',
	
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
		let handle = this.handle;
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Data',
			'Console',
			'Cheats'
		]));
		$(this.handle + ' #tab-console').empty().append('<div class="console"></div>');
		$(this.handle + ' #tab-cheats').empty().append('<div class="toolbar">' +
					'<a href="#" class="btn iblock one">+1M coins</a> ' +
					'<a href="#" class="btn iblock two">+1000 cons. mats</a> ' +
					'<a href="#" class="btn iblock thirty">+1000 food / wine</a> ' +
					'<a href="#" class="btn iblock fifteen">+1000 prov./spyg.</a> <br /><br />' +
					'<a href="#" class="btn iblock five">level up</a> ' +
					'<a href="#" class="btn iblock fourteen">+900 faith</a> ' +
					'<a href="#" class="btn iblock six">+1000 fame</a> ' +
					'<a href="#" class="btn iblock ten">+5000 fame</a> ' +
					'<a href="#" class="btn iblock seven">refresh trades</a> <br /><br />' +
					'<a href="#" class="btn iblock eleven">random soldiers</a> ' +
					'<a href="#" class="btn iblock twelve">random ships</a> ' +
					'<a href="#" class="btn iblock fourty">defend city</a> ' +
					'<a href="#" class="btn iblock fifty">battle-ready</a> <br /><br />' +
					'<a href="#" class="btn iblock ninety">add city</a> ' +
				'</div>');
		$(this.handle + ' #tab-data').empty().append(
			'<textarea class="storage-data"></textarea>' +
			'<div class="toolbar">' +
				'<a href="#" class="btn iblock refresh">Refresh</a> ' +
				'<a href="#" class="btn iblock load">Load</a> ' +
				'<a href="#" class="btn iblock save">Save</a> ' +
			'</div>');
		$(this.handle).on('click', '.fourty', function() {
			let city_index = civitas.utils.get_random(1, core.get_num_settlements() - 1);
			let _settlement = core.get_settlement(city_index);
			core.add_to_queue(_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY, {
				army: {
					militia: 40,
					axeman: 30,
					knight: 10,
					bowman: 20,
					cannon: 200,
					catapult: 300,
					crossbowman: 10,
					pikeman: 30
				}
			});
			return false;
		}).on('click', '.fifty', function() {
			for (let i = 0; i < 9; i++) {
				core.level_up();
			}
			settlement.add_to_storage('wood', 1000);
			settlement.add_to_storage('stones', 1000);
			settlement.add_to_storage('woodplanks', 1000);
			settlement.add_to_storage('provisions', 1000);
			settlement.add_to_storage('ropes', 50);
			settlement.add_to_storage('barrels', 50);
			settlement.add_to_storage('tools', 100);
			settlement.inc_coins(2000000);
			let army = settlement.get_army();
			for (let soldier in army) {
				army[soldier] = civitas.utils.get_random(1, 100);
			}
			settlement.build('provisions');
			settlement.build('militarycamp');
			settlement.build('shipyard');
			core.save_and_refresh();
			return false;
		}).on('click', '.eleven', function() {
			let army = settlement.get_army();
			for (let soldier in army) {
				army[soldier] = civitas.utils.get_random(1, 100);
			}
			core.save_and_refresh();
			return false;
		}).on('click', '.twelve', function() {
			let navy = settlement.get_navy();
			for (let ship in navy) {
				navy[ship] = civitas.utils.get_random(1, 10);
			}
			core.save_and_refresh();
			return false;
		}).on('click', '.fourteen', function() {
			settlement.raise_faith(900);
			core.save_and_refresh();
			return false;
		}).on('click', '.one', function() {
			settlement.inc_coins(1000000);
			core.save_and_refresh();
			return false;
		}).on('click', '.fifteen', function() {
			settlement.add_to_storage('provisions', 1000);
			settlement.add_to_storage('donkeys', 1000);
			settlement.add_to_storage('ropes', 1000);
			settlement.add_to_storage('spyglasses', 1000);
			core.save_and_refresh();
			return false;
		}).on('click', '.two', function() {
			settlement.add_to_storage('wood', 1000);
			settlement.add_to_storage('stones', 1000);
			settlement.add_to_storage('woodplanks', 1000);
			settlement.add_to_storage('clay', 1000);
			settlement.add_to_storage('bricks', 1000);
			settlement.add_to_storage('tools', 500);
			core.save_and_refresh();
			return false;
		}).on('click', '.thirty', function() {
			settlement.add_to_storage('bread', 1000);
			settlement.add_to_storage('meat', 1000);
			settlement.add_to_storage('wine', 1000);
			core.save_and_refresh();
			return false;
		}).on('click', '.five', function() {
			core.level_up();
			core.save_and_refresh();
			return false;
		}).on('click', '.ten', function() {
			settlement.raise_fame(5000);
			core.save_and_refresh();
			return false;
		}).on('click', '.six', function() {
			settlement.raise_fame(1000);
			core.save_and_refresh();
			return false;
		}).on('click', '.seven', function() {
			core.refresh_trades();
			core.save_and_refresh();
			return false;
		}).on('click', '.refresh', function() {
			$(handle + ' .storage-data').val(core.get_storage_data('live', true));
			return false;
		}).on('click', '.ninety', function() {
			core.add_random_settlement();
			return false;
		}).on('click', '.load', function() {
			let save_game = $(handle + ' .storage-data').val();
			if (save_game != '') {
				core.open_modal(
					function(button) {
						if (button === 'yes') {
							core.set_storage_data('live', save_game, true);
							document.location.reload();
						}
					},
					'Are you sure you want to load a new game? You will lose all progress on the current game!',
					'Civitas'
				);
			} else {
				core.error('Invalid save game.');
			}
			return false;
		}).on('click', '.save', function() {
			let save_game = $(handle + ' .storage-data').val();
			if (save_game == '') {
				save_game = core.get_storage_data('live', true);
			}
			let a = document.createElement("a");
			a.style.display = "none";
			document.body.appendChild(a);
			a.href = window.URL.createObjectURL(
				new Blob([save_game], {
					type: 'text/plain'
				})
			);
			a.setAttribute("download", 'civitas_savegame.json');
			a.click();
			window.URL.revokeObjectURL(a.href);
			document.body.removeChild(a);
			return false;
		});
	}
};

/**
 * Building panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_BUILDING = {
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
	id: 'building',
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let building = this.core().get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' section').empty().append(civitas.ui.building_panel(this.params_data, building.get_level()));
		} else {
			this.destroy();
		}
	}
};

/**
 * Campaign panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_CAMPAIGN = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template(),

	params_data: null,

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'campaign',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let campaign = params.data;
		let class_name = '';
		let tabs = ['Info'];
		this.params_data = params;
		if (campaign.type === civitas.CAMPAIGN_ARMY || campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			class_name = 'army';
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			class_name = 'caravan';
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			class_name = 'spy';
		}
		$(this.handle + ' header').append(class_name.capitalize() + ' mission');
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				tabs.push('Soldiers');
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				tabs.push('Ships');
			}
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			tabs.push('Resources');
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			tabs.push('Spy');
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				tabs.push('Soldiers');
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				tabs.push('Ships');
			}
			tabs.push('Resources');
		}
		$(this.handle + ' section').append(civitas.ui.tabs(tabs));
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let campaign = this.params_data.data;
		let out = '';
		let source = core.get_settlement(campaign.source.id);
		let destination = core.get_settlement(campaign.destination.id);
		let distance = civitas.utils.get_distance(campaign.source, campaign.destination);
		let action = '';
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			action = 'Attacking';
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			action = 'Returning';
		} else {
			action = 'Going to';
		}
		$(this.handle + ' #tab-info').empty().append('' +
			'<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? destination.ruler().avatar : source.ruler().avatar) + '.png" />' +
			'<dl>' +
				'<dt>Sent By</dt><dd>' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? destination.name() : source.name()) + '</dd>' +
				'<dt>Destination</dt><dd>' + (campaign.type === civitas.CAMPAIGN_ARMY_RETURN ? source.name() : destination.name()) + '</dd>' +
				'<dt>Action</dt><dd>' + action + '</dd>' +
				'<dt>Distance</dt><dd>' + distance + ' miles (' + campaign.duration + ' days)</dd>' +
				'<dt>Remaining</dt><dd>' + (10 * (campaign.duration - campaign.passed)) + ' miles (' + (campaign.duration - campaign.passed) + ' days)</dd>' +
			'</dl>');
		if (campaign.type === civitas.CAMPAIGN_ARMY) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				$(this.handle + ' #tab-soldiers').empty().append(civitas.ui.army_list(campaign.data.army));
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				$(this.handle + ' #tab-ships').empty().append(civitas.ui.navy_list(campaign.data.navy));
			}
		} else if (campaign.type === civitas.CAMPAIGN_CARAVAN) {
			if (typeof campaign.data.resources !== 'undefined' && !$.isEmptyObject(campaign.data.resources)) {
				out = '<p>This caravan has the the following resources:</p>' +
					'<dl>';
				for (let item in campaign.data.resources) {
					if (campaign.data.resources[item] > 0) {
						out += '<dt>' + campaign.data.resources[item] + '</dt>' +
							'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
					}
				}
				out += '</dl>';
			} else {
				out = '<p>This is an empty caravan with no resources.</p>';
			}
			$(this.handle + ' #tab-resources').empty().append(out);
		} else if (campaign.type === civitas.CAMPAIGN_SPY) {
			out = '<dl>' +
				'<dt>Mission</dt>' +
				'<dd>' + civitas.SPY_MISSIONS[campaign.data.mission].capitalize() + '</dd>' +
				(campaign.data.mission === civitas.SPY_MISSION_RELIGION ? '<dt>Religion</dt>' +
				'<dd>' + civitas.RELIGIONS[campaign.data.religion].capitalize() + '</dd>' : '') +
				'<dt>Espionage</dt>' +
				'<dd>' + campaign.data.espionage + ' ' + civitas.ui.resource_small_img('espionage') + '</dd>' +
				'<dt>Success chance</dt>' +
				'<dd>' + Math.ceil(campaign.data.espionage / 100) + '%</dd>' +
			'</dl>';
			$(this.handle + ' #tab-spy').empty().append(out);
		} else if (campaign.type === civitas.CAMPAIGN_ARMY_RETURN) {
			if (my_settlement.num_soldiers(campaign.data.army) > 0) {
				$(this.handle + ' #tab-soldiers').empty().append(civitas.ui.army_list(campaign.data.army));
			}
			if (my_settlement.num_ships(campaign.data.navy) > 0) {
				$(this.handle + ' #tab-ships').empty().append(civitas.ui.navy_list(campaign.data.navy));
			}
			if (typeof campaign.data.resources !== 'undefined' && !$.isEmptyObject(campaign.data.resources)) {
				out = '<p>This army is bringing back to its home city the following spoils of war:</p>' +
					'<dl>';
				for (let item in campaign.data.resources) {
					if (campaign.data.resources[item] > 0) {
						out += '<dt>' + campaign.data.resources[item] + '</dt>' +
							'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
					}
				}
				out += '</dl>';
			} else {
				out = '<p>This army is returning with no spoils of war.</p>';
			}
			$(this.handle + ' #tab-resources').empty().append(out);
		}
	}
};

/**
 * Storage panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_STORAGE = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('City Storage'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'storage',

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
		let storage_space = settlement.storage();
		let resources = settlement.get_resources();
		$(this.handle + ' section').append(civitas.ui.tabs(civitas.RESOURCE_CATEGORIES));
		$(this.handle + ' section').append('<p>Total storage space: <span class="total-storage">' + storage_space.all + '</span>, used: <span class="used-storage">' + storage_space.occupied + '</span></p>');
		for (let i = 0; i < civitas.RESOURCE_CATEGORIES.length; i++) {
			$(this.handle + ' #tab-' + civitas.RESOURCE_CATEGORIES[i]).append('<div class="storage-board"></div>');
		}
		for (let resource in resources) {
			if (!civitas.utils.is_virtual_resource(resource)) {
				$(this.handle + ' #tab-' + civitas.RESOURCES[resource].category + ' .storage-board').append(civitas.ui.resource_storage_el(resource, resources[resource]));
			}
		}
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let settlement = this.core().get_settlement();
		let resources = settlement.get_resources();
		let storage_space = settlement.storage();
		for (let resource in resources) {
			if (!civitas.utils.is_virtual_resource(resource)) {
				$(this.handle + ' #tab-' + civitas.RESOURCES[resource].category + ' .storage-board > .storage-item[data-resource="' + resource + '"] > .amount').empty().html(resources[resource]);
			}
		}
		$(this.handle + ' .total-storage').empty().append(storage_space.all);
		$(this.handle + ' .used-storage').empty().append(storage_space.occupied);
	}
};

/**
 * World panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_WORLD = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('World Map'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'world',

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
		let settlements = core.get_settlements();
		let world = core.world();
		let colors = world.colors();
		let color;
		let props = world.properties();
		let settings = core.get_settings();
		let world_data = world.data();
		$(this.handle + ' section').append('<div class="worldmap"></div>');
		civitas.ui.svg_create_worldmap(civitas.WORLD_HEX_SIZE, colors);
		for (let row = 0; row < civitas.WORLD_SIZE_HEIGHT; row++) {
			for (let column = 0; column < civitas.WORLD_SIZE_WIDTH; column++) {
				let terrain = world_data[row][column].t;
				color = colors[terrain].bg;
				civitas.ui.svg_create_group(terrain, row, column);
				if (world_data[row][column].l === true) {
					let lid = world_data[row][column].lid;
					if (lid !== null) {
						if (typeof settlements[lid] !== 'undefined') {
							color = settlements[lid].color();
						}
					}
				}
				civitas.ui.svg_create_cell(row, column, color, settings.worldmap_grid);
				if (settings.worldmap_beautify === true) {
					civitas.ui.svg_apply_terrain(row, column, colors[terrain].fg, terrain);
				}
			}
		}
		for (let row = 0; row < civitas.WORLD_SIZE_HEIGHT; row++) {
			for (let column = 0; column < civitas.WORLD_SIZE_WIDTH; column++) {
				let suid = world_data[row][column].s;
				if (suid !== null && typeof settlements[suid] !== 'undefined') {
					civitas.ui.svg_add_settlement_image(row, column, settlements[suid], settlement);
				}
			}
		}
		let clicked = false;
		let clickY, clickX;
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
		let update_scroll_pos = function (event) {
			$('.worldmap').scrollTop($('.worldmap').scrollTop() + (clickY - event.pageY));
			$('.worldmap').scrollLeft($('.worldmap').scrollLeft() + (clickX - event.pageX));
			clickY = event.pageY;
			clickX = event.pageX;
		};
		$(this.handle).on('click', '.settlement', function () {
			let _settlement_name = $(this).data('name');
			if (_settlement_name === settlement.name()) {
				core.open_panel(civitas.PANEL_COUNCIL);
			} else {
				core.open_panel(civitas.PANEL_SETTLEMENT, core.get_settlement(_settlement_name));
			}
			return false;
		}).on('click', '.troop', function () {
			let _action_id = parseInt($(this).data('id'));
			if (core._queue[_action_id].mode === civitas.ACTION_CAMPAIGN) {
				core.open_panel(civitas.PANEL_CAMPAIGN, core._queue[_action_id]);
			}
			return false;
		});
		/*
		civitas.ui.svg_link_cells({x: 21, y: 25}, {x: 24, y: 32});
		*/
		civitas.ui.worldmap_scrollto(settlement.location());
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let self = this;
		let core = this.core();
		let settlement = core.get_settlement();
		let settlements = core.get_settlements();
		let queue_actions = core.queue();
		let class_name = '';
		$('.troop').remove();
		for (let i = 0; i < queue_actions.length; i++) {
			let action = queue_actions[i];
			let source = action.source;
			let destination = action.destination;
			let distance_in_days = civitas.utils.get_distance_in_days(source, destination);
			if (action.mode === civitas.ACTION_DIPLOMACY) {
				distance_in_days = distance_in_days / 2;
			}
			let title = '';
			let troop_type = 'troop';
			let _source = core.get_settlement(source.id);
			let _destination = core.get_settlement(destination.id)
			let x = source.x + Math.floor(((destination.x - source.x) / distance_in_days) * action.passed);
			let y = source.y - Math.floor(((source.y - destination.y) / distance_in_days) * action.passed);
			let prev_x = source.x + Math.floor(((destination.x - source.x) / distance_in_days) * (action.passed - 1));
			let prev_y = source.y - Math.floor(((source.y - destination.y) / distance_in_days) * (action.passed - 1));
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

/**
 * Ranks panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_RANKS = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('World Rankings'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'ranks',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		$(this.handle + ' section').append('<div class="ranks-list"></div>');
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let ranking_list = [];
		let settlements = this.core().get_settlements();
		for (let i = 0; i < settlements.length; i++) {
			if (settlements[i].is_urban()) {
				ranking_list.push({
					name: settlements[i].name(),
					data: settlements[i].get_rank()
				});
			}
		}
		ranking_list.sort(function(a, b) {
			let keyA = new Date(a.data.score);
			let keyB = new Date(b.data.score);
			if (keyA > keyB) {
				return -1;
			}
			if (keyA < keyB) {
				return 1;
			}
			return 0;
		});
		let _t = '<table class="normal">';
		_t += '<thead>' +
				'<tr>' +
					'<td class="center">Rank</td>' +
					'<td>City</td>' +
					'<td class="center">Score</td>' +
				'</tr>' +
			'</thead>' +
			'<tbody>';
		for (let i = 0; i < ranking_list.length; i++) {
			_t += '<tr>' +
				'<td class="center">' + (i + 1) + '</td>' +
				'<td>' + ranking_list[i].name + '</td>' +
				'<td class="center">' + ranking_list[i].data.score + '</td>' +
			'</tr>';
		}
		_t += '</tbody>' +
			'</table>';
		$(this.handle + ' .ranks-list').empty().append(_t);
	}
};

/**
 * Create a new army panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_NEW_ARMY = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>Create army<a class="tips close" title="Close"></a></header>' +
			'<section></section>' +
			'<div class="toolbar clearfix">' +
				'<a class="dispatch btn iblock" href="#">Dispatch</a>' +
			'</div>' +
		'</div>',

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'new-army',
	
	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = params.data;
		let settlements = core.get_settlements();
		let army = my_settlement.get_army();
		let location = my_settlement.location();
		let distance = civitas.utils.get_distance_in_days(location, settlement.location());
		this.assigned_army = {};
		this.assigned_navy = {};
		for (let item in army) {
			this.assigned_army[item] = army[item];
		}
		if (my_settlement.can_build_ships()) {
			let navy = my_settlement.get_navy();
			for (let item in navy) {
				this.assigned_navy[item] = navy[item];
			}
		}
		let _t = '<div class="column">' +
			'<fieldset>' +
				'<legend>Initial costs</legend>' +
				'<dl>';
		for (let item in civitas.ARMY_COSTS) {
			let _cost = 0;
			if (item === 'coins') {
				_cost = civitas.ARMY_COSTS[item] * distance;
			} else if (item === 'provisions') {
				_cost = Math.ceil((civitas.ARMY_COSTS[item] * distance) / 2);
			} else {
				_cost = civitas.ARMY_COSTS[item];
			}
			_t += '<dt>' + civitas.utils.nice_numbers(_cost) + '</dt>' +
				'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
		}
		_t += '</dl>' +
			'</fieldset>';
		if (typeof army !== 'undefined') {
			_t += '<fieldset>' +
				'<legend>Soldiers</legend>';
			for (let item in army) {
				_t += '<div class="army-item">' +
					'<a href="#" data-max="' + army[item] + '" data-soldier="' + item + '" class="army-item-inc">+</a>' +
					'<a href="#" data-max="' + army[item] + '" data-soldier="' + item + '" class="army-item-dec">-</a>' +
					'<img class="tips" title="' + civitas.SOLDIERS[item].name + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + item.toLowerCase().replace(/ /g,"_") + '.png" />' +
					'<span class="amount">' + army[item] + '</span>' +
				'</div>';
			}
			_t += '</fieldset>';
		}
		_t += '<fieldset>' +
			'<legend>Destination</legend>' +
			'<select class="army-destination">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < settlements.length; i++) {
			_t += '<option ' + (settlement && (settlements[i].id() === settlement.id()) ? 'selected ' : '') + 'value="' + settlements[i].id() + '">' + settlements[i].nice_name() + '</option>';
		}
		_t += '</select>' +
			'</fieldset>' +
		'</div>' +
		'<div class="column">';
		if (my_settlement.can_build_ships()) {
			if (typeof navy !== 'undefined') {
				_t += '<fieldset>' +
					'<legend>Ships</legend>';
				for (let item in navy) {
					_t += '<div class="navy-item">' +
							'<a href="#" data-max="' + navy[item] + '" data-ship="' + item + '" class="navy-item-inc">+</a>' +
							'<a href="#" data-max="' + navy[item] + '" data-ship="' + item + '" class="navy-item-dec">-</a>' +
							'<img class="tips" title="' + item + '" src="' + civitas.ASSETS_URL + 'images/assets/army/' + item.toLowerCase().replace(/ /g,"_") + '.png" />' +
							'<span class="amount">' + navy[item] + '</span>' +
						'</div>';
				}
				_t += '</fieldset>';
			}
		}
		if (my_settlement.can_recruit_heroes()) {
			let heroes = my_settlement.heroes();
			_t += '<fieldset>' +
				'<legend>Hero</legend>' +
				'<select class="army-hero">';
			if ($.isEmptyObject(heroes)) {
				_t += '<option value="0">-- no heroes available --</option>';
			} else {
				_t += '<option value="0">-- select --</option>';
				for (let item in heroes) {
					_t += '<option value="' + item + '">' + heroes[item] + '</option>';
				}
			}
			_t += '</select>' +
			'</fieldset>';
		} else {
			_t += '<p><strong>Note!</strong> Build a Tavern to be able to recruit powerful heroes and assign them to your armies.</p>';		
		}
		_t += '</div>';
		$(this.handle + ' section').empty().append(_t);
		$(this.handle).on('click', '.navy-item-inc', function() {
			let max = parseInt($(this).data('max'));
			let ship = $(this).data('ship');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current + 1 <= max) {
				self.assigned_navy[ship] = current + 1;
				$(this).parent().children('.amount').html(current + 1);
			}
			return false;
		}).on('click', '.navy-item-dec', function() {
			let max = parseInt($(this).data('max'));
			let ship = $(this).data('ship');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current - 1 >= 0) {
				self.assigned_navy[ship] = current - 1;
				$(this).parent().children('.amount').html(current - 1);
			}
			return false;
		}).on('click', '.army-item-inc', function() {
			let max = parseInt($(this).data('max'));
			let soldier = $(this).data('soldier');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current + 1 <= max) {
				self.assigned_army[soldier] = current + 1;
				$(this).parent().children('.amount').html(current + 1);
			}
			return false;
		}).on('click', '.army-item-dec', function() {
			let max = parseInt($(this).data('max'));
			let soldier = $(this).data('soldier');
			let current = parseInt($(this).parent().children('.amount').html());
			if (current - 1 >= 0) {
				self.assigned_army[soldier] = current - 1;
				$(this).parent().children('.amount').html(current - 1);
			}
			return false;
		}).on('click', '.dispatch', function() {
			if (!my_settlement.can_recruit_soldiers()) {
				core.error('You will need to construct a Military Camp before being able to attack other settlements.');
				return false;
			}
			let destination = parseInt($(self.handle + ' .army-destination').val());
			if ((settlement && settlement.id() !== destination) || !settlement) {
				settlement = core.get_settlement(destination);
			}
			// TODO there is an error here when there is no shipyard to send navy.
			if (destination === 0 || !settlement || (my_settlement.num_soldiers(self.assigned_army) === 0 && my_settlement.num_ships(self.assigned_navy) === 0)) {
				core.error('There was an error creating and dispatching the army, check the data you entered and try again.');
				return false;
			}
			if (core.add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY, {
				army: self.assigned_army,
				navy: self.assigned_navy
			})) {
				core.achievement('sendarmy');
				self.destroy();
			} else {
				core.error('There was an error creating and dispatching the army, check the data you entered and try again.');
			}
			return false;
		});
	}
};

/**
 * Create a new spy panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_NEW_SPY = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>Create spy' +
				'<a class="tips close" title="Close"></a>' +
			'</header>' +
			'<section></section>' +
			'<div class="toolbar">' +
				'<a class="btn dispatch" href="#">Dispatch</a>' +
			'</div>' +
		'</div>',

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'new-spy',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = params.data;
		let settlements = core.get_settlements();
		let espionage = my_settlement.espionage();
		let location = my_settlement.location();
		let distance = civitas.utils.get_distance_in_days(location, settlement.location());
		let _t = '<fieldset>' +
			'<legend>Initial costs</legend>' +
			'<dl>';
		for (let item in civitas.SPY_COSTS) {
			let _cost = 0;
			if (item === 'coins') {
				_cost = civitas.SPY_COSTS[item] * distance;
			} else if (item === 'provisions') {
				_cost = Math.ceil((civitas.SPY_COSTS[item] * distance) / 2);
			} else {
				_cost = civitas.SPY_COSTS[item];
			}
			_t += '<dt>' + civitas.utils.nice_numbers(_cost) + '</dt>' +
				'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
		}
		_t += '</dl>' +
		'</fieldset>' +
		'<fieldset>' +
			'<legend>Destination</legend>' +
			'<select class="espionage-destination">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < settlements.length; i++) {
			_t += '<option ' + (settlement && (settlements[i].id() === settlement.id()) ? 'selected ' : '') + 'value="' + settlements[i].id() + '">' + settlements[i].nice_name() + '</option>';
		}
		_t += '</select>' +
		'</fieldset>' +
		'<fieldset class="range-combo">' +
			'<legend>Espionage</legend>' +
			'<input type="range" value="' + espionage + '" min="1" max="' + espionage + '" class="espionage-range" />' +
			'<input type="text" readonly value="' + espionage + '" class="espionage-value tips" title="Total espionage assigned to this spy." />' +
			'<input type="text" readonly value="' + Math.ceil(espionage / 100) + '%" class="espionage-chance tips" title="Chance of mission success." />' +
		'</fieldset>' +
		'<fieldset>' +
			'<legend>Mission</legend>' +
			'<select class="espionage-mission">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < civitas.SPY_MISSIONS.length; i++) {
			_t += '<option value="' + i + '">' + civitas.SPY_MISSIONS[i].capitalize() + '</option>';
		}
		_t += '</select>' +
		'</fieldset>' +
		'<fieldset class="espionage-rel">' +
			'<legend>Religion' + (settlement ? ' (currently ' + settlement.religion().name + ')': '') + '</legend>' +
			'<select class="espionage-religion">';
		for (let i = 0; i < civitas.RELIGIONS.length; i++) {
			_t += '<option value="' + i + '">' + civitas.RELIGIONS[i].capitalize() + (i === my_settlement.religion().id ? ' (your religion)' : '') + '</option>';
		}
		_t += '</select>' +
			'<p><strong>Note!</strong> Attempting to change a settlement`s religion uses up all your accumulated faith.</p>' +
		'</fieldset>';
		$(this.handle + ' section').empty().append(_t);
		$(this.handle).on('change', '.espionage-range', function() {
			let value = parseInt($(this).val());
			$(self.handle + ' .espionage-value').val(value);
			$(self.handle + ' .espionage-chance').val(Math.ceil(value / 100) + '%');
		}).on('change', '.espionage-mission', function() {
			let value = parseInt($(this).val());
			if (value === civitas.SPY_MISSION_RELIGION) {
				$(self.handle + ' .espionage-rel').show();
			} else {
				$(self.handle + ' .espionage-rel').hide();
			}
		}).on('click', '.dispatch', function() {
			if (!my_settlement.can_diplomacy()) {
				core.error('You will need to construct an Embassy before being able to send spies to other settlements.');
				return false;
			}
			let _espionage = parseInt($(self.handle + ' .espionage-value').val());
			let destination = parseInt($(self.handle + ' .espionage-destination').val());
			let mission = parseInt($(self.handle + ' .espionage-mission').val());
			if ((settlement && settlement.id() !== destination) || !settlement) {
				settlement = core.get_settlement(destination);
			}
			if (destination === 0 || _espionage > espionage || !settlement || mission <= 0) {
				console.log(1);
				core.error('There was an error creating and dispatching the spy, check the data you entered and try again.');
				return false;
			}
			let data = {
				espionage: _espionage,
				mission: mission
			};
			if (mission === civitas.SPY_MISSION_RELIGION) {
				data.religion = parseInt($(self.handle + ' .espionage-religion').val());
			}
			if (core.add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_SPY, data)) {
				core.achievement('jamesbond');
				self.destroy();
			} else {
				console.log(2);
				core.error('There was an error creating and dispatching the spy, check the data you entered and try again.');
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
		let my_settlement = core.get_settlement();
		let espionage = my_settlement.espionage();
		$(this.handle + ' .espionage-range').attr('max', espionage);
	}
};

/**
 * Create a new caravan panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_NEW_CARAVAN = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: '' +
		'<div id="panel-{ID}" class="panel">' +
			'<header>Create caravan<a class="tips close" title="Close"></a>' +
			'</header>' +
			'<section></section>' +
			'<div class="toolbar">' +
				'<a class="btn dispatch" href="#">Dispatch</a>' +
			'</div>' +
		'</div>',

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'new-caravan',
	
	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		this.resources = {};
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = params.data;
		let settlements = core.get_settlements();
		let location = my_settlement.location();
		let distance = civitas.utils.get_distance_in_days(location, settlement.location());
		let _t = '<fieldset>' +
			'<legend>Initial costs</legend>' +
			'<dl>';
		for (let item in civitas.CARAVAN_COSTS) {
			let _cost = 0;
			if (item === 'coins') {
				_cost = civitas.CARAVAN_COSTS[item] * distance;
			} else if (item === 'provisions') {
				_cost = Math.ceil((civitas.CARAVAN_COSTS[item] * distance) / 2);
			} else {
				_cost = civitas.CARAVAN_COSTS[item];
			}
			_t += '<dt>' + civitas.utils.nice_numbers(_cost) + '</dt>' +
				'<dd>' + civitas.ui.resource_small_img(item) + '</dd>';
		}
		_t += '</dl>' +
		'</fieldset>' +
		'<fieldset>' +
			'<legend>Destination</legend>' +
			'<select class="caravan-destination">' +
				'<option value="0">-- select --</option>';
		for (let i = 1; i < settlements.length; i++) {
			_t += '<option ' + (settlement && (settlements[i].id() === settlement.id()) ? 'selected ' : '') + 'value="' + settlements[i].id() + '">' + settlements[i].nice_name() + '</option>';
		}
		_t += '</select>' +
		'</fieldset>' +
		'<fieldset class="select-combo">' +
			'<legend>Resources</legend>' +
			'<select class="caravan-resources-select">' +
				'<option value="0">-- select --</option>' +
				'<option value="coins">Coins</option>';
		let resources = my_settlement.get_resources();
		for (let item in resources) {
			if (!civitas.utils.is_virtual_resource(item)) {
				_t += '<option value="' + item + '"> ' + civitas.utils.get_resource_name(item) + '</option>';
			}
		}
		_t += '</select>' +
			'<input title="Add the resources to the list." type="button" class="tips caravan-resources-add" value="+" />' +
			'<input title="Amount of selected resource to add to the caravan." type="number" value="1" class="tips caravan-resources-amount" min="1" max="999" />' +
			'<div class="caravan-resources clearfix"></div>' +
		'</fieldset>';
		$(this.handle + ' section').empty().append(_t);
		this.generate_table_data = function() {
			let _t = '<table class="caravan-resources clearfix">' +
				'<thead>' +
				'<tr>' +
					'<td>Amount</td>' +
					'<td>Resource</td>' +
					'<td></td>' +
				'</tr>' +
				'</thead>' +
				'<tbody>';
			for (let item in this.resources) {
				_t += '<tr>' +
					'<td>' + this.resources[item] + '</td>' +
					'<td>' + civitas.ui.resource_small_img(item) + '</td>' +
					'<td>' +
						'<a title="Remove this resource from the caravan." href="#" data-id="' + item + '" class="tips caravan-resources-delete">-</a>' +
					'</td>' +
				'</tr>';
			}
			_t += '</tbody>' +
			'</table>';
			$(this.handle + ' .caravan-resources').empty().append(_t);
		};
		$(this.handle).on('click', '.caravan-resources-add', function() {
			let amount = parseInt($(self.handle + ' .caravan-resources-amount').val());
			let resource = $(self.handle + ' .caravan-resources-select').val();
			if (resource !== '0') {
				if (typeof self.resources[resource] !== 'undefined' && !my_settlement.has_resource(resource, self.resources[resource] + amount)) {
					core.error(my_settlement.name() + ' doesn`t have enough ' + civitas.utils.get_resource_name(resource) + '.');
					return false;
				} else if (typeof self.resources[resource] === 'undefined' && !my_settlement.has_resource(resource, amount)) {
					core.error(my_settlement.name() + ' doesn`t have enough ' + civitas.utils.get_resource_name(resource) + '.');
					return false;
				}
				if (typeof self.resources[resource] !== 'undefined') {
					self.resources[resource] = self.resources[resource] + amount;
				} else {
					self.resources[resource] = amount;
				}
				self.generate_table_data();
			}
			return false;
		}).on('click', '.caravan-resources-delete', function() {
			let resource = $(this).data('id');
			delete self.resources[resource];
			self.generate_table_data();
			return false;
		}).on('click', '.dispatch', function() {
			if (!my_settlement.can_trade()) {
				core.error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			let destination = parseInt($(self.handle + ' .caravan-destination').val());
			if ((settlement && settlement.id() !== destination) || !settlement) {
				settlement = core.get_settlement(destination);
			}
			if (destination === 0 || !settlement || $.isEmptyObject(self.resources)) {
				core.error('There was an error creating and dispatching the caravan, check the data you entered and try again.');
				return false;
			}
			if (core.add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_CARAVAN, {
				resources: self.resources
			})) {
				core.achievement('donkeylord');
				self.destroy();
			} else {
				core.error('There was an error creating and dispatching the caravan, check the data you entered and try again.');
			}
			return false;
		});
	}
};

/**
 * City Council panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_COUNCIL = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('City Council'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'council',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let core = this.core();
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Tips',
			'Production',
			'Housing',
			'Municipal',
			'Mercenary',
			'Achievements'
		]));
		let _t = '<div class="achievements-list">';
		for (let i = 0; i < civitas.ACHIEVEMENTS.length; i++) {
			_t += '<div data-handle="' + civitas.ACHIEVEMENTS[i].handle + '" class="achievement">' +
				'<div class="left">' +
					'<div class="ach img"></div>' +
					'<div class="ach points">' + civitas.ACHIEVEMENTS[i].points + '</div>' +
				'</div>' +
				'<div class="right">' +
					'<div class="inner">' +
						'<h2>' + civitas.ACHIEVEMENTS[i].name + '</h2>' +
						civitas.ACHIEVEMENTS[i].description +
					'</div>' +
					'<div class="time-ago"></div>' +
				'</div>' +
			'</div>';
		}
		_t += '</div>';
		$(this.handle + ' #tab-achievements').empty().append(_t);
		$(this.handle).on('click', '.view-merc', function () {
			let _army = parseInt($(this).data('id'));
			let data = civitas.MERCENARIES[_army];
			core.open_panel(civitas.PANEL_ARMY, data);
			return false;
		}).on('click', '.raid-merc', function () {
			let _army = parseInt($(this).data('id'));
			core.error('Not implemented yet.');
			return false;
		}).on('click', '.disband-merc', function () {
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						let _army = parseInt($(this).data('id'));
						core.get_settlement().release_mercenary(_army);
						core.save_and_refresh();
					}
				},
				'Are you sure you want to release this mercenary army? You won`t be able to use them anymore!'
			);
			return false;
		}).on('click', '.building-info', function() {
			let handle = $(this).data('handle');
			let panel = civitas['PANEL_' + handle.toUpperCase()];
			let building_data = core.get_building_config_data(handle);
			if (handle && building_data) {
				if (typeof panel !== 'undefined') {
					core.open_panel(panel, building_data);
				} else {
					core.open_panel(civitas.PANEL_BUILDING, building_data, true);
				}
			}
			return false;
		}).on('click', '.pause', function () {
			let handle = $(this).data('handle');
			let building = core.get_settlement().get_building(handle);
			if (building && building.stop_production()) {
				$(this).removeClass('pause').addClass('start');
				$(this).attr('title', 'Start production');
			}
			return false;
		}).on('click', '.start', function () {
			let handle = $(this).data('handle');
			let building = core.get_settlement().get_building(handle);
			if (building && building.start_production()) {
				$(this).removeClass('start').addClass('pause');
				$(this).attr('title', 'Stop production');
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
		let settlements = core.get_settlements();
		let buildings = settlement.get_buildings();
		let resources = settlement.get_resources();
		let achievements = core.achievements();
		let advices = settlement.city_council();
		let total_costs = 0;
		let total_tax = 0;
		let army_data;
		let achievement_data;
		let building_data;
		let _z = '';
		let total_benefits = {
			fame: 0,
			espionage: 0,
			research: 0,
			faith: 0
		}
		let mercenary = settlement.mercenary();
		let _t = '<p>Mercenary armies are available to hire for a fixed price, they do not cost additional resources but they are only available for raiding and campaign missions, they do not participate in the defense of your city.</p>' +
			'<p>Also, keep in mind that once a mercenary army is hired, they are at your disposal until the end of the current year.</p>' +
			'<div class="hired-mercenaries-list">';
		if (mercenary.length > 0) {
			_t += '<table class="normal">';
			for (let i = 0; i < mercenary.length; i++) {
				army_data = civitas.MERCENARIES[mercenary[i].id];
				_t += '<tr>' +
						'<td class="icon">' +
							'<img src="' + civitas.ASSETS_URL + 'images/assets/emblems/' + 
								army_data.icon + '.png" />' +
						'</td>' +
						'<td>' +
							'<p class="title">' + army_data.name + '</p>' +
							'<p class="description">' + army_data.description + '</p>' +
						'</td>' +
						'<td class="large">' +
							'<a title="View info on this mercenary army." data-id="' + mercenary[i].id + '" class="tips view-merc" href="#">view</a> ' +
							'<a title="Send this mercenary army on a raiding mission towards a specific settlement." data-id="' + i + '" class="tips raid-merc" href="#">raid</a> ' +
							'<a title="Disband this mercenary army? They will be available for hire later when you need them." data-id="' + i + '" class="tips disband-merc" href="#">release</a>' +
						'</td>' +
					'</tr>';

			}
			_t += '</table>';
		} else {
			_t += '<p>You have no mercenary armies hired for your city. Go to the World Market Trades and hire one.</p>';
		}
		_t += '</div>';
		$(this.handle + ' #tab-mercenary').empty().append(_t);
		for (let f = 0; f < achievements.length; f++) {
			if (typeof achievements[f] !== 'undefined') {
				$(this.handle + ' .achievement[data-handle=' + achievements[f].handle + ']').addClass('has');
				$(this.handle + ' .achievement[data-handle=' + achievements[f].handle + '] .time-ago')
					/*.attr("title", achievements[f].date)*/
					.html(civitas.utils.time_since(achievements[f].date) + ' ago');
			}
		}
		_t = '<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + settlement.ruler().avatar + '.png" />' +
			'<dl>' +
				'<dt>Current date</dt>' +
				'<dd class="citydate">' + core.format_date() + '</dd>' +
				'<dt>Ruler</dt>' +
				'<dd>' + settlement.ruler().name + '</dd>' +
				'<dt>Climate</dt>' +
				'<dd>' + settlement.climate().name + '</dd>' +
				'<dt>Personality</dt>' +
				'<dd>' + settlement.personality().name + '</dd>' +
				'<dt>Nationality</dt>' +
				'<dd>' + settlement.nationality().name + '</dd>' +
				'<dt>Population</dt>' +
				'<dd>' + civitas.utils.nice_numbers(settlement.population()) + '</dd>' +
				'<dt>Achievement Points</dt>' +
				'<dd>' + core.achievement_points() + '</dd>' +
				'<dt>Religion</dt>' +
				'<dd>' + settlement.religion().name + '</dd>' +
				'<dt>Level</dt>' +
				'<dd>' + civitas.ui.progress((settlement.level() * 100) / civitas.MAX_SETTLEMENT_LEVEL, 'small', settlement.level()) + '</dd>' +
				'<dt>Fame</dt>' +
				'<dd>' + civitas.ui.progress((settlement.fame() * 100) / civitas.LEVELS[settlement.level()], 'small', civitas.utils.nice_numbers(settlement.fame()) + ' / ' + civitas.utils.nice_numbers(civitas.LEVELS[settlement.level()])) + '</dd>' +
				'<dt>Prestige</dt>' +
				'<dd>' + civitas.ui.progress((settlement.prestige() * 100) / civitas.MAX_PRESTIGE_VALUE, 'small', settlement.prestige()) + '</dd>' +
				'<dt>Espionage</dt>' +
				'<dd>' + civitas.ui.progress((settlement.espionage() * 100) / civitas.MAX_ESPIONAGE_VALUE, 'small', settlement.espionage()) + '</dd>' +
				'<dt>Faith</dt>' +
				'<dd>' + civitas.ui.progress((settlement.faith() * 100) / civitas.MAX_FAITH_VALUE, 'small', settlement.faith()) + '</dd>' +
				'<dt>Research</dt>' +
				'<dd>' + civitas.ui.progress((settlement.research() * 100) / civitas.MAX_RESEARCH_VALUE, 'small', settlement.research()) + '</dd>' +
			'</dl>';
		$(this.handle + ' #tab-info').empty().append(_t);
		_t = '';
		if (advices.length > 0) {
			_t += '<ul class="advices">';
			for (let z = 0; z < advices.length; z++) {
				_t += '<li>' + advices[z] + '</li>';
			}
			_t += '</ul>';
		}
		$(this.handle + ' #tab-tips').empty().append(_t);
		_t = '<table class="normal">' +
			'<thead>' +
				'<tr>' +
					'<td></td>' +
					'<td class="tips center" title="Current level / Maximum level">Level</td>' +
					'<td>Raises</td>' +
					'<td>Uses</td>' +
				'</tr>' +
			'</thead>';
		for (let l = 0; l < buildings.length; l++) {
			if (buildings[l].is_municipal_building()) {
				building_data = buildings[l].get_building_data();
				_t += '<tr' + ((buildings[l].has_problems() === false) ? '' : ' class="notify"') +'>' +
					'<td><a href="#" class="building-info" data-handle="' + buildings[l].get_handle() + '">' + buildings[l].get_name() + '</a></td>' +
					'<td class="center">' + buildings[l].get_level() + ' / ' + (typeof building_data.levels !== 'undefined' ? building_data.levels : 1) + '</td>' +
					'<td>';
					if (building_data.production) {
						for (let item in building_data.production) {
							total_benefits[item] += (buildings[l].has_problems() === false) ? buildings[l].get_level() * building_data.production[item] : 0;
							_t += ' +' + buildings[l].get_level() * building_data.production[item] + ' ' + civitas.ui.resource_small_img(item);
						}
					}
				_t += '</td>' +
					'<td>';
					if (building_data.materials) {
						if (Array.isArray(building_data.materials)) {
							for (let i = 0; i < building_data.materials.length; i++) {
								for (let y in building_data.materials[i]) {
									total_costs += (buildings[l].has_problems() === false) ? building_data.materials[i][y] : 0;
									_t += ' -' + building_data.materials[i][y] + ' ' + civitas.ui.resource_small_img(y);
								}
							}
						} else {
							for (let item in building_data.materials) {
								total_costs += (buildings[l].has_problems() === false) ? building_data.materials[item] : 0;
								_t += ' -' + building_data.materials[item] + ' ' + civitas.ui.resource_small_img(item);
							}
						}
					}
				_t += '</td>' +
				'</tr>';
			}
		}
		for (let item in total_benefits) {
			if (total_benefits[item] > 0) {
				_z += ' +' + total_benefits[item] + ' ' + civitas.ui.resource_small_img(item);
			}
		}
		_t += '<tfoot>' +
					'<tr>' +
						'<td>Total</td>' +
						'<td></td>' +
						'<td>' + _z + '</td>' +
						'<td>' + (total_costs > 0 ? '-' : '') + total_costs + ' ' + civitas.ui.resource_small_img('coins') + '</td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$(this.handle + ' #tab-municipal').empty().append(_t);
		_t = '<table class="normal">' +
			'<thead>' +
				'<tr>' +
					'<td></td>' +
					'<td class="tips center" title="Current level / Maximum level">Level</td>' +
					'<td>Tax</td>' +
					'<td>Materials</td>' +
				'</tr>' +
			'</thead>';
		for (let l = 0; l < buildings.length; l++) {
			if (buildings[l].is_housing_building()) {
				building_data = buildings[l].get_building_data();
				_t += '<tr' + ((buildings[l].has_problems() === false) ? '' : ' class="notify"') +'>' +
					'<td><a href="#" class="building-info" data-handle="' + buildings[l].get_handle() + '">' + buildings[l].get_name() + '</a></td>' +
					'<td class="center">' + buildings[l].get_level() + ' / ' + (typeof building_data.levels !== 'undefined' ? building_data.levels : 1) + '</td>' +
					'<td>';
					if (building_data.tax) {
						total_tax += (buildings[l].has_problems() === false) ? buildings[l].get_level() * building_data.tax : 0;
						_t += ' +' + buildings[l].get_level() * building_data.tax + ' ' + civitas.ui.resource_small_img('coins');
					}
				_t += '</td>' +
					'<td>';
					if (typeof building_data.materials !== 'undefined') {
						if (Array.isArray(building_data.materials)) {
							for (let i = 0; i < building_data.materials.length; i++) {
								for (let y in building_data.materials[i]) {
									_t += ' -' + building_data.materials[i][y] + ' ' + civitas.ui.resource_small_img(y);
								}
							}
						} else {
							for (let item in building_data.materials) {
								_t += ' -' + building_data.materials[item] + ' ' + civitas.ui.resource_small_img(item);
							}
						}
					}
				_t += '</td>' +
				'</tr>';
			}
		}
		_t += '<tfoot>' +
					'<tr>' +
						'<td>Income</td>' +
						'<td></td>' +
						'<td>+' + total_tax + ' ' + civitas.ui.resource_small_img('coins') + '</td>' +
						'<td></td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$(this.handle + ' #tab-housing').empty().append(_t);
		_t = '<table class="normal">' +
			'<thead>' +
				'<tr>' +
					'<td></td>' +
					'<td class="tips center" title="Current level / Maximum level">Level</td>' +
					'<td>Production</td>' +
					'<td>Materials</td>' +
					'<td></td>' +
				'</tr>' +
			'</thead>';
		for (let l = 0; l < buildings.length; l++) {
			if (buildings[l].is_production_building() && buildings[l].is_municipal_building() === false) {
				building_data = buildings[l].get_building_data();
				_t += '<tr' + ((buildings[l].has_problems() === false) ? '' : ' class="notify"') +'>' +
					'<td><a href="#" class="building-info" data-handle="' + buildings[l].get_handle() + '">' + buildings[l].get_name() + '</a></td>' +
					'<td class="center">' + buildings[l].get_level() + ' / ' + (typeof building_data.levels !== 'undefined' ? building_data.levels : 1) + '</td>' +
					'<td>';
					if (building_data.production) {
						for (let item in building_data.production) {
							_t += ' +' + buildings[l].get_level() * building_data.production[item] + ' ' + civitas.ui.resource_small_img(item);
						}
					}
				_t += '</td>' +
					'<td>';
					if (building_data.materials) {
						if (Array.isArray(building_data.materials)) {
							for (let i = 0; i < building_data.materials.length; i++) {
								for (let y in building_data.materials[i]) {
									_t += ' -' + building_data.materials[i][y] + ' ' + civitas.ui.resource_small_img(y);
								}
							}
						} else {
							for (let item in building_data.materials) {
								_t += ' -' + building_data.materials[item] + ' ' + civitas.ui.resource_small_img(item);
							}
						}
					}
				_t += '</td>' +
					'<td class="center">' + 
						'<a title="' + (!buildings[l].is_stopped() ? 'Stop production' : 'Start production') + '" data-handle="' + buildings[l].get_handle() + '" class="tips ' + (!buildings[l].is_stopped() ? 'pause' : 'start') + ' btn" href="#"></a>' +
					'</td>' +
				'</tr>';
			}
		}
		_t += '<tfoot>' +
					'<tr>' +
						'<td></td>' +
						'<td class="center">Level</td>' +
						'<td>Production</td>' +
						'<td>Materials</td>' +
						'<td></td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$(this.handle + ' #tab-production').empty().append(_t);
	}
};

/**
 * Army panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_ARMY = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template(),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'army',
	
	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let my_settlement = core.get_settlement();
		let army = params.data;
		$(this.handle + ' header').append(army.name);
		let tabs = ['Info'];
		if (my_settlement.num_soldiers(army.army) > 0) {
			tabs.push('Soldiers');
		}
		if (my_settlement.num_ships(army.navy) > 0) {
			tabs.push('Ships');
		}
		$(this.handle + ' section').append(civitas.ui.tabs(tabs));
		$(this.handle + ' #tab-info').append('<img class="avatar" src="' + civitas.ASSETS_URL + 'images/assets/emblems/' + ((typeof army.icon !== 'undefined') ? army.icon : '22') + '.png" />' + '<p>' + army.description + '</p>');
		if (my_settlement.num_soldiers(army.army) > 0) {
			$(this.handle + ' #tab-soldiers').append(civitas.ui.army_list(army.army));
		}
		if (my_settlement.num_ships(army.navy) > 0) {
			$(this.handle + ' #tab-ships').append(civitas.ui.navy_list(army.navy));
		}
	}
};

/**
 * Buildings panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_BUILDINGS = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('City Buildings'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'buildings',
	
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
					let building_data = civitas.BUILDINGS[civitas.BUILDINGS.findIndexM(building)];
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
			let building = civitas.BUILDINGS[civitas.BUILDINGS.findIndexM(handle)];
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

/**
 * Trades panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_TRADES = {
	/**
	 * Template of the panel.
	 *
	 * @type {String}
	 */
	template: civitas.ui.generic_panel_template('World Market'),

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'trades',

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
		let el = this.handle;
		let _t = '';
		$(el + ' section').append(civitas.ui.tabs([
			'Export',
			'Import',
			'Mercenaries',
			'BlackMarket',
			'Prices'
		]));
		$(el + ' #tab-import').append('<p>Below is a list of goods that the other cities in the world are looking to sell. The goods replenish every six months, so plan accordingly. You will need to build a Trading Post before being able to sell goods.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-export').append('<p>Below is a list of goods that the other cities in the world are looking to buy. The goods replenish every six months, so plan accordingly. You will need to build a Trading Post before being able to buy goods.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-mercenaries').append('<p>Below is a list of mercenary armies that are looking for hire. Mercenaries are available only for raiding and conquest missions, they do not join your city so they will not participate in defense.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-blackmarket').append('<p>The Black Market is a way to dump your excess materials when you`re in need of emptying your warehouses, but expect a steep price drop (taxes for all Black Market trades are <strong>' + civitas.BLACK_MARKET_DISCOUNT + '%</strong>). The goods will be taken immediately from your warehouses but you will receive the coins at the <strong>start of the next month</strong>. Also, you get <strong>no prestige</strong> from Black Market trades.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-prices').append('<div class="contents"></div>');
		$(el + ' #tab-blackmarket > .contents').append('' +
			'<table class="normal">' +
				'<thead>' +
					'<tr>' +
						'<td>Resources: <select class="bm-materials"></select></td>' +
						'<td>Quantity: ' +
							'<select class="bm-quantity">' +
								'<option value="0">-- select --</option>' +
								'<option value="10">10</option>' +
								'<option value="100">100</option>' +
								'<option value="1000">1000</option>' +
								'<option value="10000">10000</option>' +
							'</select> or enter manually <input type="number" min="1" max="100000" placeholder="amount" class="small bm-qty-manual" />' +
						'</td>' +
						'<td>' +
							'<a title="List goods on Black Market" class="tips bmarket" href="#">List</a>' +
						'</td>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +
				'</tbody>' +
			'</table>');
		let out = '<option value="0">-- select --</option>';
		let resources = settlement.get_resources();
		for (let item in resources) {
			if (!civitas.utils.is_virtual_resource(item)) {
				out += '<option value="' + item + '"> ' + civitas.utils.get_resource_name(item) + '</option>';
			}
		}
		$(el + ' .bm-materials').empty().append(out);
		$(el).on('click', '.settlement-info', function () {
			let _settlement_name = $(this).data('settlement');
			core.open_panel(civitas.PANEL_SETTLEMENT, core.get_settlement(_settlement_name));
			return false;
		}).on('click', '.buy:not(.disabled)', function () {
			if (!settlement.can_trade()) {
				core.error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			let handle = $(this).data('settlement');
			let resource = $(this).data('resource');
			if (settlement.buy_from_settlement(handle, resource) !== false) {
				self.on_refresh();
			}
			return false;
		}).on('click', '.sell:not(.disabled)', function () {
			if (!settlement.can_trade()) {
				core.error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			let handle = $(this).data('settlement');
			let resource = $(this).data('resource');
			if (settlement.sell_to_settlement(handle, resource) !== false) {
				self.on_refresh();
			}
			return false;
		}).on('click', '.bmarket', function () {
			let resource = $('.bm-materials').val();
			let auto_amount = $('.bm-quantity').val();
			let manual_amount = $('.bm-qty-manual').val();
			let amount = manual_amount === '' ? parseInt(auto_amount) : parseInt(manual_amount);
			if (resource !== '0' && amount > 0) {
				if (settlement.add_to_black_market(resource, amount)) {
					self.on_refresh();
				}
			} else {
				core.error('Select a resource and the amount of it you want to place on the Black Market.');
			}
			return false;
		}).on('click', '.recruit:not(.disabled)', function () {
			let handle = $(this).data('handle');
			if (settlement.recruit_mercenary_army(handle) !== false) {
				self.on_refresh();
			}
			return false;
		}).on('click', '.view-army:not(.disabled)', function () {
			let army = parseInt($(this).data('id'));
			let army_data = civitas.MERCENARIES[army];
			core.open_panel(civitas.PANEL_ARMY, army_data);
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
		let my_settlement = core.get_settlement();
		let settlement = core.get_settlement();
		let settlements = core.get_settlements();
		let out = '';
		let bm = core.get_black_market();
		for (let item in bm) {
			out += '<tr>' +
					'<td>Amount: ' + bm[item].amount + civitas.ui.resource_small_img(item) + '</td>' +
					'<td>Total price: ' + bm[item].price + civitas.ui.resource_small_img('coins') + '</td>' +
					'<td>&nbsp;</td>' +
				'</tr>';
		}
		$('#tab-blackmarket > .contents > table > tbody').empty().append(out);
		out = '<table class="normal">' +
					'<thead>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Discount</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
					'</thead>';
		for (let z = 1; z < settlements.length; z++) {
			let settlement = settlements[z];
			if (my_settlement.status()[settlements[z].id()].influence < 20) {
				break;
			}
			let trades = settlements[z].get_trades();
			let resources = settlement.get_resources();
			if (trades !== null) {
				let imports = trades.imports;
				for (let item in imports) {
					let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_DISCOUNT) / 100);
					let discount_price = Math.ceil(civitas.RESOURCES[item].price - discount);
					out += '<tr>' +
							'<td><a href="#" class="settlement-info tips" data-settlement="' + settlements[z].name() + '" title="View info about this settlement.">' + settlements[z].name() + '</a></td>' +
							'<td class="center">' + civitas.ui.resource_small_img(item) + '</td>' +
							'<td class="center">' + imports[item] + '</td>' +
							'<td class="center">' + civitas.RESOURCES[item].price + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount_price + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' + Math.ceil(discount_price * imports[item]) + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' +
								'<a title="Sell those goods" data-resource="' + item + '" data-settlement="' + settlements[z].name() + '" class="tips sell' + (imports[item] === 0 ? ' disabled' : '') + '" href="#">sell</a>' +
							'</td>' +
						'</tr>';
				}
			}
		}
		out += '<tfoot>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Discount</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$('#tab-export > .contents').empty().append(out);
		out = '<table class="mercenaries">';
		for (let i = 0; i < civitas.MERCENARIES.length; i++) {
			out += '<tr>' +
					'<td class="icon">' +
						'<img src="' + civitas.ASSETS_URL + 'images/assets/emblems/' + civitas.MERCENARIES[i].icon + '.png" />' +
					'</td>' +
					'<td>' +
						'<p class="title">' + civitas.MERCENARIES[i].name + '</p>' +
						'<p class="description">' + civitas.MERCENARIES[i].description + '</p>' +
					'</td>' +
					'<td>' + 
						civitas.utils.nice_numbers(civitas.MERCENARIES[i].cost) + civitas.ui.resource_small_img('coins') + 
					'</td>' +
					'<td class="medium">' +
						'<a title="View info on this mercenary army" data-id="' + i + '" class="tips view-army" href="#">view</a> ' + civitas.ui.panel_btn('recruit', 'Recruit this mercenary army', civitas.MERCENARIES[i].handle, 'recruit', core.get_settlement().is_mercenary_recruited(civitas.MERCENARIES[i].handle)) +
					'</td>' +
				'</tr>';
		}
		out += '</table>';
		$('#tab-mercenaries > .contents').empty().append(out);
		out = '<table class="normal">' +
					'<thead>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Tax</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
					'</thead>';
		for (let z = 1; z < settlements.length; z++) {
			let settlement = settlements[z];
			if (my_settlement.status()[settlements[z].id()].influence < 20) {
				break;
			}
			let trades = settlements[z].get_trades();
			let resources = settlement.get_resources();
			if (trades !== null) {
				let exports = trades.exports;
				for (let item in exports) {
					let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_ADDITION) / 100);
					let discount_price = Math.ceil(civitas.RESOURCES[item].price + discount);
					out += '<tr>' +
							'<td>' + settlements[z].name() + '</td>' +
							'<td class="center">' + civitas.ui.resource_small_img(item) + '</td>' +
							'<td class="center">' + exports[item] + '</td>' +
							'<td class="center">' + civitas.RESOURCES[item].price + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount_price + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' + Math.ceil(discount_price * exports[item]) + civitas.ui.resource_small_img('coins') + '</td>' +
							'<td class="center">' +
								'<a title="Buy those goods" data-resource="' + item + '" data-settlement="' + settlements[z].name() + '" class="tips buy' + (exports[item] === 0 ? ' disabled' : '') + '" href="#">buy</a>' +
							'</td>' +
						'</tr>';
				}
			}
		}
		out += '<tfoot>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Tax</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$('#tab-import > .contents').empty().append(out);
		out = '<table class="normal">' +
					'<thead>' +
					'<tr>' +
						'<td>Resource</td>' +
						'<td class="center">Icon</td>' +
						'<td class="center">Price</td>' +
						'<td class="center tips" title="This is the price you get for selling one unit of the resource to another settlement, minus the <strong>' + civitas.TRADES_DISCOUNT + '%</strong> export taxes.">Sell Price</td>' +
						'<td class="center tips" title="This is the price you get for buying one unit of the resource from another settlement, plus the <strong>' + civitas.TRADES_ADDITION + '%</strong> import taxes.">Buy Price</td>' +
						'<td class="center tips" title="This is the price you get for placing one unit of the resource on the Black Market, minus the <strong>' + civitas.BLACK_MARKET_DISCOUNT + '%</strong> taxes.">BM Price</td>' +
						'<td class="center tips" title="If the resource is listed as produced, that possibility depends on the location and climate of your settlement (ex. tropical settlements can build <strong>Sugar Farms</strong> and produce <strong>Sugar</strong>).">Type</td>' +
					'</tr>' +
					'</thead>';
		for (let item in civitas.RESOURCES) {
			if (!civitas.utils.is_virtual_resource(item)) {
				let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_ADDITION) / 100);
				let tax = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_DISCOUNT) / 100);
				let bm_tax = Math.ceil((civitas.RESOURCES[item].price * civitas.BLACK_MARKET_DISCOUNT) / 100);
				out += '<tr>' +
					'<td>' + civitas.RESOURCES[item].name + '</td>' +
					'<td class="center">' + civitas.ui.resource_small_img(item) + '</td>' +
					'<td class="center">' + civitas.RESOURCES[item].price + civitas.ui.resource_small_img('coins') + '</td>' +
					'<td class="center">' + (civitas.RESOURCES[item].price - tax) + civitas.ui.resource_small_img('coins') + '</td>' +
					'<td class="center">' + (civitas.RESOURCES[item].price + discount) + civitas.ui.resource_small_img('coins') + '</td>' +
					'<td class="center">' + (civitas.RESOURCES[item].price - bm_tax) + civitas.ui.resource_small_img('coins') + '</td>' +
					'<td class="center">' + ((civitas.RESOURCES[item].imported === true) ? 'imported' : 'produced') + '</td>' +
				'</tr>';
			}
		}
		out += '<tfoot>' +
					'<tr>' +
						'<td>Resource</td>' +
						'<td class="center">Icon</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Sell Price</td>' +
						'<td class="center">Buy Price</td>' +
						'<td class="center">BM Price</td>' +
						'<td class="center">Type</td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$('#tab-prices > .contents').empty().append(out);
	}
};

/**
 * Military Camp panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_MILITARYCAMP = {
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
	id: 'militarycamp',

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
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Army'
		]));
		let _t = '<div class="army-list"></div>' +
				'<div class="army-recruiter">';
		for (let item in civitas.SOLDIERS) {
			_t += '<fieldset>' +
					'<legend>' + civitas.SOLDIERS[item].name + '</legend>' +
					'<div class="cost">' +
						'<dl class="nomg">';
			for (let res in civitas.SOLDIERS[item].cost) {
				_t += '<dt>' + civitas.utils.nice_numbers(civitas.SOLDIERS[item].cost[res]) + '</dt><dd>' + civitas.ui.resource_small_img(res) + '</dd>';
			}
			_t += '</dl>' +
					'</div>' +
					'<div class="info">' +
						'<dl class="nomg">' +
							'<dt>Attack</dt><dd>' + civitas.SOLDIERS[item].attack + '</dd>' +
							'<dt>Defense</dt><dd>' + civitas.SOLDIERS[item].defense + '</dd>' +
						'</dl>' +
					'</div>' +
					'<img data-handle="' + item + '" title="Recruit ' + civitas.SOLDIERS[item].name + '" class="tips recruit-soldier" src="' + civitas.ASSETS_URL + 'images/assets/army/' + item.toLowerCase() + '.png" />' +
				'</fieldset>';
		}
		_t += '</div>';
		$(this.handle + ' #tab-army').empty().append(_t);
		$(this.handle).on('click', '.recruit-soldier', function () {
			let soldier = $(this).data('handle');
			let costs = civitas.SOLDIERS[soldier].cost;
			if (settlement.has_resources(costs)) {
				if (settlement.remove_resources(costs)) {
					if (settlement.recruit_soldier(soldier)) {
						core.notify('A new ' + civitas.SOLDIERS[soldier].name + ' has been recruited.');
						self.on_refresh();
						return false;
					}
				}
			}
			core.error('You don`t have enough resources to recruit a ' + civitas.SOLDIERS[soldier].name + '.');
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
		let building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' #tab-info').empty().append(civitas.ui.building_panel(this.params_data, building.get_level()));
			$(this.handle + ' .army-list').empty().append('<fieldset>' +
					'<legend>Current Army</legend>' + civitas.ui.army_list(settlement.get_army(), true) +
				'</fieldset>');
		} else {
			this.destroy();
		}
	}
};

/**
 * Shipyard panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_SHIPYARD = {
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
	id: 'shipyard',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let core = this.core();
		let settlement = core.get_settlement();
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Navy'
		]));
		let _t = '<div class="navy-list"></div>' +
				'<div class="navy-recruiter">';
		for (let item in civitas.SHIPS) {
			_t += '<fieldset>' +
					'<legend>' + civitas.SHIPS[item].name + '</legend>' +
					'<div class="cost">' +
						'<dl class="nomg">';
			for (let res in civitas.SHIPS[item].cost) {
				_t += '<dt>' + civitas.utils.nice_numbers(civitas.SHIPS[item].cost[res]) + 
					'</dt><dd>' + civitas.ui.resource_small_img(res) + '</dd>';
			}
			_t += '</dl>' +
					'</div>' +
					'<div class="info">' +
						'<dl class="nomg">' +
							'<dt>Attack</dt><dd>' + civitas.SHIPS[item].attack + '</dd>' +
							'<dt>Defense</dt><dd>' + civitas.SHIPS[item].defense + '</dd>' +
						'</dl>' +
					'</div>' +
					'<img data-handle="' + item + '" title="Recruit ' + civitas.SHIPS[item].name + '" class="tips recruit-ship" src="' + civitas.ASSETS_URL + 'images/assets/army/' + item.toLowerCase().replace(/ /g,"_") + '.png" />' +
				'</fieldset>';
		}
		_t += '</div>';
		$(this.handle + ' #tab-navy').empty().append(_t);
		$(this.handle).on('click', '.recruit-ship', function () {
			let ship = $(this).data('handle');
			let costs = civitas.SHIPS[ship].cost;
			if (settlement.has_resources(costs)) {
				if (settlement.remove_resources(costs)) {
					if (settlement.recruit_ship(ship)) {
						core.notify('A new ' + civitas.SHIPS[ship].name + ' has been recruited.');
						self.on_refresh();
						return false;
					}
				}
			}
			core.error('You don`t have enough resources to recruit a ' + civitas.SHIPS[ship].name + '.');
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
		let building = settlement.get_building(this.params_data.handle);
		if (building) {
			let level = building.get_level();
			$(this.handle + ' #tab-info').empty().append(civitas.ui.building_panel(this.params_data, level));
			$(this.handle + ' .navy-list').empty().append('<fieldset>' +
					'<legend>Current Navy</legend>' + civitas.ui.navy_list(settlement.get_navy(), true) +
				'</fieldset>');
		} else {
			this.destroy();
		}
	}
};

/**
 * Church panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_CHURCH = {
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
	id: 'church',

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
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Religion'
		]));
		$(this.handle).on('click', '.religion', function() {
			let id = parseInt($(this).data('id'));
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						settlement.change_religion(id);
					}
				},
				'Are you sure you want to switch religions? You will lose all your city`s faith!'
			);
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
		let building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			$(this.handle + ' #tab-info').empty().append(civitas.ui.building_panel(this.params_data, building.get_level()));
			let _t = '<div class="section">' + civitas.ui.progress((settlement.faith() * 100) / civitas.MAX_FAITH_VALUE, 'large', settlement.faith()) + '</div>' +
				'<p>Changing your settlement`s religion requires <strong>' + civitas.MAX_FAITH_VALUE + '</strong> faith, each religion gives you access to different heroes in your Tavern and gives you a boost to the influence with the cities sharing the same religion.</p>' +
				'<div class="religion-list">';
			for (let i = 0; i < civitas.RELIGIONS.length; i++) {
				_t += '<div data-handle="' + civitas.RELIGIONS[i] + '" data-id="' + i + '" class="religion' + (settlement.religion().id === i ? ' selected' : '') + '"><span>' + civitas.RELIGIONS[i].capitalize() + '</span></div>';
			}
			_t += '</div>';
			$(this.handle + ' #tab-religion').empty().append(_t);
		} else {
			this.destroy();
		}
	}
};

/**
 * Embassy panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_EMBASSY = {
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
	id: 'embassy',

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
		let settlements = core.get_settlements();
		let status = settlement.status();
		let building = core.get_settlement().get_building(this.params_data.handle);
		let level = building.get_level();
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Diplomacy',
			'Espionage'
		]));
		$(this.handle + ' #tab-diplomacy').empty().append('<div class="settlements-list"></div>');
		$(this.handle).on('click', '.view', function () {
			let _settlement_id = parseInt($(this).data('id'));
			let _settlement = core.get_settlement(_settlement_id);
			if (_settlement) {
				core.open_panel(civitas.PANEL_SETTLEMENT, _settlement);
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
		let settlements = core.get_settlements();
		let status = settlement.status();
		let building = core.get_settlement().get_building(this.params_data.handle);
		if (building) {
			let level = building.get_level();
			$(this.handle + ' #tab-info').empty().append(civitas.ui.building_panel(this.params_data, level));
			$(this.handle + ' #tab-espionage').empty().append('<div class="section">' + civitas.ui.progress((settlement.espionage() * 100) / civitas.MAX_ESPIONAGE_VALUE, 'large', settlement.espionage()) + '</div>');
			let _t = '<table class="normal">';
			for (let i = 1; i < settlements.length; i++) {
				let _status = settlement.get_diplomacy_status(settlements[i].id());
				_t += '<tr>' +
						'<td class="icon">' +
							'<a data-id="' + settlements[i].id() + '" title="View info about this settlement." class="tips view" href="#"><img src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + settlements[i].ruler().avatar + '.png" /></a>' +
						'</td>' +
						'<td>' +
							'<p class="title">' + settlements[i].nice_name() + '</p> ' +
							'<div data-id="' + settlements[i].id() + '" >' + civitas.ui.progress(status[settlements[i].id()].influence, 'big') + '</div>' +
						'</td>' +
						'<td>' +
							'<p>Leader: <strong>' + settlements[i].ruler().name + '</strong>' + '</p>' +
							'<p>Personality: <strong>' + settlements[i].personality().name + '</strong>' + '</p>' +
							'<p>Diplomatic Status: <strong>' + settlement.get_diplomacy_status(settlements[i].id()).name + '</strong>' + '</p>' +
						'</td>' +
					'</tr>';
			}
			_t += '</table>';
			$(this.handle + ' .settlements-list').empty().append(_t);
		} else {
			this.destroy();
		}
	}
};

/**
 * Tavern panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_TAVERN = {
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
	id: 'tavern',

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = self.core();
		let _t = '';
		$(this.handle + ' section').append(civitas.ui.tabs([
			'Info',
			'Heroes',
			'Items'
		]));
		let building = core.get_settlement().get_building(self.params_data.handle);
		if (building) {
			$(self.handle + ' #tab-items').empty().append('Not implemented yet.');
			$(self.handle + ' #tab-heroes').empty().append(
				'<div class="column hero-list"></div>' +
				'<div class="column hero-info"></div>' +
				'<div class="column hero-items"></div>'
			);
			$(self.handle + ' #tab-info').empty().append(civitas.ui.building_panel(self.params_data, building.get_level()));
			self.empty_items = function() {
				$(self.handle + ' .hero-items').empty().append('<h3>Equipment</h3>');
				for (let i = 1; i < civitas.ITEM_SLOTS_NUM; i++) {
					$(self.handle + ' .hero-items').append('<div class="slot" data-slot="' + i + '"></div>');
				}
				$(self.handle + ' .hero-items').append('<br class="clearfix" />').append('<h3>Bags</h3>');
				for (let i = 0; i < civitas.ITEM_BACKPACK_NUM; i++) {
					$(self.handle + ' .hero-items').append('<div class="slot" data-backpack-slot="' + i + '"></div>');
				}
			}
			self.empty_items();
			for (let item in civitas.HEROES) {
				_t += '<p><a href="#" data-hero="' + item + '">' + civitas.HEROES[item].name + '</a></p>';
			}
			$(self.handle + ' .hero-list').empty().append(_t);
			$(self.handle).on('click', '.hero-list a', function() {
				let hero_id = parseInt($(this).data('hero'));
				let hero_data = civitas.HEROES[hero_id];
				if (hero_data) {
					$(self.handle + ' .hero-info').empty().append(
						'<h3>Info <a title="Information provided by Wikipedia." href="' + hero_data.link + '" class="tips external-link wikipedia"></a></h3>' +
						hero_data.description + 
						'<br /><br />' +
						'<h3>Class</h3>' +
						civitas.HERO_CLASS_LIST[hero_data.class] + '' +
						'<br /><br />' +
						'<h3>Attributes</h3>' +
						'Strength: <span class="green">' + hero_data.stats.strength + '</span><br />' +
						'Stamina: <span class="green">' + hero_data.stats.stamina + '</span><br />' +
						'Agility: <span class="green">' + hero_data.stats.agility + '</span><br />' +
						'Intellect: <span class="green">' + hero_data.stats.intellect + '</span><br />' +
						'Spirit: <span class="green">' + hero_data.stats.spirit + '</span><br />' +
						'Health Points: <span class="blue">' + civitas.utils.get_health_points(hero_data) + '</span><br />' +
						'Mana Points: <span class="blue">' + civitas.utils.get_mana_points(hero_data) + '</span><br />' +
						'Damage: <span class="red">' + civitas.utils.get_damage_points(hero_data).min + '-' + civitas.utils.get_damage_points(hero_data).max + '</span>'
					);
					self.empty_items();
					for (let x = 0; x < hero_data.items.length; x++) {
						let slot = hero_data.items[x].slot;
						$(self.handle + ' .hero-items > div.slot[data-slot="' + slot + '"]')
							.empty()
							.append('X')
							.attr('title', civitas.ui.item_tooltip(hero_data.items[x]))
							.tipsy({
								className: 'item',
								html: true
							});
					}
					for (let x = 0; x < hero_data.backpack.length; x++) {
						$(self.handle + ' .hero-items > div.slot[data-backpack-slot="' + x + '"]')
							.empty()
							.append('X')
							.attr('title', civitas.ui.item_tooltip(hero_data.backpack[x]))
							.tipsy({
								className: 'item',
								html: true
							});
					}
				}
				return false;
			});
		} else {
			self.destroy();
		}
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		// TODO
	}
};

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
		for (let i = 0; i < civitas.RESEARCH.length; i++) {
			_t += '<div data-technology="' + civitas.RESEARCH[i].handle + '" class="technology"><img src="' + civitas.ASSETS_URL + 'images/assets/research/' + civitas.RESEARCH[i].handle + '.png" /></div>';
		}
		$(this.handle + ' .column-left').empty().append(_t);
		$(this.handle).on('click', '.technology', function() {
			$(self.handle + ' .technology').removeClass('selected');
			$(this).addClass('selected');
			let technology_name = $(this).data('technology');
			let technology = civitas.RESEARCH[civitas.RESEARCH.findIndexM(technology_name)];
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
				_t += '<div class="toolbar"></div>';
				$(self.handle + ' .column-right').empty().append(_t);
				let _i = core.has_research(technology.handle);
				if (_i === false) {
					$(self.handle + ' .toolbar').empty().append('<a href="#" class="btn do-research" data-technology="' + technology.handle + '">Research</a>');
				} else {
					$(self.handle + ' .toolbar').empty().append('You already researched this technology.');
				}
			}
			return false;
		}).on('click', '.do-research', function() {
			let technology_name = $(this).data('technology');
			let technology = civitas.RESEARCH[civitas.RESEARCH.findIndexM(technology_name)];
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

/**
 * Login window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_SIGNIN = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '' +
		'<section id="window-{ID}" class="window">' +
			'<div class="logo">Civitas</div>' +
			'<fieldset>' +
				'<div class="new-game">' +
					'<p>Enter the city password to decrypt the game data.</p>' +
					'<dl>' +
						'<dt class="clearfix">Password:</dt>' +
						'<dd><input type="password" class="password text-input" /></dd>' +
					'</dl>' +
					'<a href="#" class="do-start highlight button">Load Game</a>' +
				'</div>' +
				'<a href="#" class="do-restart button">Restart</a>' +
				civitas.ui.window_about_section() +
			'</fieldset>' +
		'</section>',

	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'signin',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function() {
		let self = this;
		let handle = this.handle();
		let core = this.core();
		$(handle).on('click', '.do-start', function () {
			let password = $(handle + ' .password').val();
			if (password === '') {
				core.error('Enter your city password.', 'Error', true);
				return false;
			}
			if (!core.load_game_data(password)) {
				$(handle + ' .password').val('');
				core.error('Error decrypting the game data with the specified password. Try again.', 'Error', true);
			} else {
				self.destroy();
			}
			return false;
		}).on('click', '.do-restart', function () {
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						core.reset_storage_data();
						document.location.reload();
					}
				},
				'Are you sure you want to restart the game? You will lose all progress on the current game!',
				'Civitas'
			);
			return false;
		}).on('click', '.do-about', function () {
			$(handle + ' .about-game').slideToggle();
			return false;
		});
	},

	/**
	 * Callback function for hiding the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_hide: function() {
		civitas.ui.hide_loader();
	}
};

/**
 * Battle window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_BATTLE = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '<section id="window-{ID}" class="window">' +
			'<div class="container">' +
				'<div title="Attack and defense rating for the attacking army." class="tips attack"></div>' +
				'<div title="Attack and defense rating for the defending army." class="tips defense"></div>' +
				'<div class="battleground"></div>' +
				'<div title="Current turn." class="tips turns">1</div>' +
				'<div class="status"></div>' +	
				'<div class="toolbar">' +
					'<a title="End current turn." class="tips button end" href="#">End turn</a> ' +
					'<a title="Close the window." class="tips button close" href="#">Close</a>' +
				'</div>' +
			'</div>' +
		'</section>',
	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'battle',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let handle = this.handle();
		core.pause();
		this.battleground = new civitas.objects.battleground({
			core: core,
			width: 15,
			height: 9,
			elements: {
				container: handle + ' .battleground',
				attack: handle + ' .attack',
				defense: handle + ' .defense',
				console: handle + ' .status',
			},
			attack: {
				city: this.params_data.source.source.id,
				army: this.params_data.source.data.army,
				navy: this.params_data.source.data.navy
			},
			defense: {
				city: this.params_data.destination.id(),
				army: this.params_data.destination.army,
				navy: this.params_data.destination.navy
			},
			on_win: function(winner, loser) {
				core.achievement('conqueror');
				$(handle + ' .end').hide();
				$(handle + ' .close').show();
			},
			on_lose: function(winner, loser) {
				core.achievement('foolish');
				$(handle + ' .end').hide();
				$(handle + ' .close').show();
			},
			on_end_turn: function(turn) {
				$(handle + ' .turns').html(turn);
			}
		});
		$(handle + ' .close').hide();
		$(handle).on('click', '.close', function () {
			core.unpause();
			self.destroy();
			return false;
		}).on('click', '.end', function () {
			self.battleground.end_turn();
			return false;
		});
	}
};

/**
 * Sign Up window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_SIGNUP = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '' +
		'<section id="window-{ID}" class="window">' +
			'<div class="logo">Civitas</div>' +
			'<fieldset>' +
				'<div class="new-game">' +
					'<p>Choose your city details well, climate changes and game difficulty affects your building options and resources.</p>' +
					'<dl>' +
						'<dt class="clearfix">Your Name:</dt>' +
						'<dd><input type="text" maxlength="12" title="Maximum of 12 characters." class="tips name text-input" /></dd>' +
						((civitas.ENCRYPTION === true) ?
						'<dt class="clearfix">Password:</dt>' +
						'<dd><input type="password" class="password text-input" /></dd>' +
						'<dt class="clearfix">Confirm Password:</dt>' +
						'<dd><input type="password" class="password2 text-input" /></dd>'
						: '') +
						'<div class="hr"></div>' +
						'<dt class="clearfix">City Name:</dt>' +
						'<dd><input type="text" maxlength="12" title="Maximum of 12 characters." class="tips cityname text-input" /></dd>' +
						'<dt class="clearfix">Nationality:</dt>' +
						'<dd>' +
							'<select class="nation text-input"></select>' +
						'</dd>' +
						'<dt class="clearfix">Climate:</dt>' +
						'<dd>' +
							'<select class="climate text-input"></select>' +
						'</dd>' +
						'<dt class="clearfix">Difficulty:</dt>' +
						'<dd>' +
							'<select class="difficulty text-input">' +
								'<option value="1">Easy</option>' +
								'<option value="2">Medium</option>' +
								'<option value="3">Hard</option>' +
								'<option value="4">Hardcore</option>' +
							'</select>' +
						'</dd>' +
						'<div class="avatar-select"></div>' +
					'</dl>' +
					'<a href="#" class="do-start highlight button">Start Playing</a>' +
				'</div>' +
				civitas.ui.window_about_section() +
			'</fieldset>' +
		'</section>',

	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'signup',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function() {
		let self = this;
		let avatar = 1;
		let password = '';
		let password2 = '';
		let core = this.core();
		let handle = this.handle();
		for (let i = 1; i < civitas.CLIMATES.length; i++) {
			$(handle + ' .climate').append('<option value="' + civitas['CLIMATE_' + civitas.CLIMATES[i].toUpperCase()] + '">' + civitas.CLIMATES[i].capitalize() + '</option>');
		}
		for (let i = 1; i < civitas.NATIONS.length; i++) {
			$(handle + ' .nation').append('<option value="' + civitas['NATION_' + civitas.NATIONS[i].toUpperCase()] + '">' + civitas.NATIONS[i].capitalize() + '</option>');
		}
		for (let i = 1; i <= civitas.AVATARS; i++) {
			$(handle + ' .avatar-select').append('<img class="avatar' + (i === avatar ? ' selected' : '') + '" data-avatar="' + i + '" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + i + '.png" />');
		}
		$(handle).on('click', '.do-start', function () {
			if (civitas.ENCRYPTION === true) {
				password = $(handle + ' .password').val();
				password2 = $(handle + ' .password2').val();
			}
			let name = $(handle + ' .name').val();
			let cityname = $(handle + ' .cityname').val();
			let nation = parseInt($(handle + ' .nation').val());
			let climate = parseInt($(handle + ' .climate').val());
			let difficulty = parseInt($(handle + ' .difficulty').val());
			if (name.length > 12) {
				name = name.substring(0, 12);
			}
			if (cityname.length > 12) {
				cityname = cityname.substring(0, 12);
			}
			if (name === '') {
				core.error('Enter your ruler name, for example <strong>Ramses</strong>.', 'Error', true);
				return false;
			}
			if (cityname === '') {
				core.error('Enter your city name, for example <strong>Alexandria</strong>.', 'Error', true);
				return false;
			}
			if (civitas.ENCRYPTION === true) {
				if (password === '') {
					core.error('Enter a strong password for your city.', 'Error', true);
					return false;
				}
				if (password !== password2) {
					core.error('Your passwords do not match.', 'Error', true);
					return false;
				}
			}
			core.new_game(name, cityname, nation, climate, avatar, difficulty, password);
			self.destroy();
			return false;
		}).on('click', '.avatar', function () {
			$(handle + ' img.avatar').removeClass('selected');
			$(this).addClass('selected');
			let new_avatar = parseInt($(this).data('avatar'));
			if (new_avatar >= 1 && new_avatar <= civitas.AVATARS) {
				avatar = new_avatar;
			}
			return false;
		}).on('click', '.do-about', function () {
			$(handle + ' .about-game').slideToggle();
			return false;
		});
	},

	/**
	 * Callback function for hiding the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_hide: function() {
		civitas.ui.hide_loader();
	}
};

/**
 * Options window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_ERROR = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '' +
		'<section id="window-{ID}" class="window">' +
			'<div class="logo">Civitas</div>' +
			'<fieldset>' +
				'An error has occured in Civitas and the game is unable to resume.' +
				'<br /><br />' +
				'<span class="error-message"></span>' +
				'<br />' +
				'<span class="error-code"></span>' +
				'<br /><br />' +
				'<a href="#" class="do-restart button">Restart</a>' +
			'</fieldset>' +
		'</section>',

	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'error',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function() {
		let self = this;
		let core = this.core();
		let handle = this.handle();
		$(handle + ' .error-message').html('Message: ' + this.params_data.error);
		$(handle + ' .error-code').html('Code: ' + this.params_data.code);
		$(handle).on('click', '.do-restart', function () {
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						core.reset_storage_data();
						document.location.reload();
					}
				},
				'Are you sure you want to restart the game? You will lose all progress on the current game!',
				'Civitas'
			);
			return false;
		});
	},

	/**
	 * Callback function for hiding the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_hide: function() {
		civitas.ui.hide_loader();
	}
};

/**
 * Options window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_OPTIONS = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '' +
		'<section id="window-{ID}" class="window">' +
			'<div class="logo">Civitas</div>' +
			'<fieldset>' +
				'<a href="#" class="do-pause button">Pause</a>' +
				'<a href="#" class="do-restart button">Restart</a>' +
				'<a href="#" class="do-options button">Options</a>' +
				'<div class="options-game"></div>' +
				civitas.ui.window_about_section() +
				'<br />' +
				'<a href="#" class="do-resume button">Resume Playing</a>' +
			'</fieldset>' +
		'</section>',

	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'options',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function() {
		let _game_data = null;
		let self = this;
		let handle = this.handle();
		let core = this.core();
		$(handle + ' .options-game').append(civitas.ui.tabs(['Sounds', 'UI', 'Gameplay']));
		$(handle + ' #tab-sounds').append('<div>' +
			'<a href="#" class="music-control ui-control ' + ((core.get_settings('music') === true) ? 'on' : 'off') + '">music</a>' +
			'<input class="music-volume" type="range" min="0" max="1" step="0.1" ' + ((core.get_settings('music') !== true) ? 'disabled' : '') + ' />' +
			'</div>');
		$(handle + ' #tab-ui').append('<div>' +
			'<a href="#" class="worldmap-grid-control ui-control ' + ((core.get_settings('worldmap_grid') === true) ? 'on' : 'off') + '">worldmap grid</a> ' +
			'<a href="#" class="worldmap-beautify-control ui-control ' + ((core.get_settings('worldmap_beautify') === true) ? 'on' : 'off') + '">worldmap beautify</a>' +
			'</div>');
		$(handle + ' .tabs').tabs();
		$(handle).on('click', '.do-resume', function () {
			civitas.ui.hide_loader();
			core.unpause();
			self.destroy();
			return false;
		}).on('click', '.do-pause', function () {
			if (core.is_paused() === true) {
				$(this).removeClass('highlight').html('Pause');
				civitas.ui.show_loader();
				core.unpause();
			} else {
				$(this).addClass('highlight').html('Resume');
				civitas.ui.hide_loader();
				core.pause();
			}
			return false;
		}).on('click', '.do-options', function () {
			$(handle + ' .options-game').slideToggle();
			return false;
		}).on('click', '.do-about', function () {
			$(handle + ' .about-game').slideToggle();
			return false;
		}).on('click', '.do-restart', function () {
			core.open_modal(
				function(button) {
					if (button === 'yes') {
						core.reset_storage_data();
						document.location.reload();
					}
				},
				'Are you sure you want to restart the game? You will lose all progress on the current game!',
				'Civitas'
			);
			return false;
		}).on('click', '.music-control', function () {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').addClass('off');
				$('.music-volume').attr('disabled', true);
				core.set_settings('music', false);
			} else {
				$(this).removeClass('off').addClass('on');
				$('.music-volume').attr('disabled', false);
				core.set_settings('music', true);
			}
			core.save();
			return false;
		}).on('click', '.worldmap-grid-control', function () {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').addClass('off');
				core.set_settings('worldmap_grid', false);
			} else {
				$(this).removeClass('off').addClass('on');
				core.set_settings('worldmap_grid', true);
			}
			core.save();
			return false;
		}).on('click', '.worldmap-beautify-control', function () {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').addClass('off');
				core.set_settings('worldmap_beautify', false);
			} else {
				$(this).removeClass('off').addClass('on');
				core.set_settings('worldmap_beautify', true);
			}
			core.save();
			return false;
		}).on('change', '.music-volume', function () {
			let value = parseInt($(this).val());
			core.music.volume = value;
			core.save();
			return false;
		});
	},

	/**
	 * Callback function for hiding the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_hide: function() {
		civitas.ui.hide_loader();
	}
};
