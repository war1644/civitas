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
