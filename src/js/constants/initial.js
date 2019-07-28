/**
 * Initial state of the game, based on the selected difficulty.
 *
 * @constant
 * @default
 * @type {Object}
 */
game.INITIAL_SEED = [
	/* Easy difficulty */
	{
		/* Roughness of the world generator */
		roughness: 5,
		/* Number of settlements to build initially */
		settlements: {
			/* Cities */
			0: 8,
			/* Villages */
			1: 5,
			/* Metropolis */
			2: 6,
			/* Raider camps */
			3: 6,
			/* Ruins */
			4: 10
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
			fame: game.MIN_FAME_VALUE,
			faith: game.MIN_FAITH_VALUE,
			prestige: game.MIN_PRESTIGE_VALUE,
			espionage: game.MIN_ESPIONAGE_VALUE,
			research: game.MIN_RESEARCH_VALUE,
			bread: 400,
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
			3: 3,
			4: 4
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
			fame: game.MIN_FAME_VALUE,
			faith: game.MIN_FAITH_VALUE,
			prestige: game.MIN_PRESTIGE_VALUE,
			espionage: game.MIN_ESPIONAGE_VALUE,
			research: game.MIN_RESEARCH_VALUE,
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
			3: 10,
			4: 3
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
			fame: game.MIN_FAME_VALUE,
			faith: game.MIN_FAITH_VALUE,
			prestige: game.MIN_PRESTIGE_VALUE,
			espionage: game.MIN_ESPIONAGE_VALUE,
			research: game.MIN_RESEARCH_VALUE,
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
			3: 20,
			4: 1
		},
		military: {
			army: {},
			navy: {}
		},
		resources: {
			coins: 5000,
			fame: game.MIN_FAME_VALUE,
			faith: game.MIN_FAITH_VALUE,
			prestige: game.MIN_PRESTIGE_VALUE,
			espionage: game.MIN_ESPIONAGE_VALUE,
			research: game.MIN_RESEARCH_VALUE,
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
