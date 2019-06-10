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
		conditions: {
			settlement_level: 10
		},
		points: 100
	}, {
		description: 'Develop your settlement to level 20.',
		name: 'Teen',
		conditions: {
			settlement_level: 20
		},
		points: 200
	}, {
		description: 'Develop your settlement to level 30.',
		name: 'On my own',
		conditions: {
			settlement_level: 30
		},
		points: 500
	}, {
		description: 'Develop your settlement to level 40.',
		name: 'Fear me',
		conditions: {
			settlement_level: 40
		},
		points: 1000
	}, {
		description: 'Gather maximum faith.',
		name: 'Jesus Christ',
		conditions: {
			resources: {
				faith: civitas.MAX_FAITH_VALUE
			}
		},
		points: 100
	}, {
		description: 'Gather maximum research.',
		name: 'Albert Einstein',
		conditions: {
			resources: {
				research: civitas.MAX_RESEARCH_VALUE
			}
		},
		points: 100
	}, {
		description: 'Gather 100M coins in your settlement.',
		name: 'Rottschild',
		conditions: {
			resources: {
				coins: 100000000
			}
		},
		points: 100
	}, {
		description: 'Gather 500k coins in your settlement.',
		name: 'Ba dum tss',
		conditions: {
			resources: {
				coins: 500000
			}
		},
		points: 100
	}, {
		description: 'Gather 100k coins in your settlement.',
		name: 'Gatherer',
		conditions: {
			resources: {
				coins: 100000
			}
		},
		points: 100
	}, {
		description: 'Gather 1M coins in your settlement.',
		name: 'Milionaire',
		conditions: {
			resources: {
				coins: 1000000
			}
		},
		points: 100
	}, {
		description: 'Gather 10M coins in your settlement.',
		name: 'Rockefeller',
		conditions: {
			resources: {
				coins: 10000000
			}
		},
		points: 100
	}, {
		description: 'Gather 10k stones in your settlement.',
		name: 'Stone Age',
		conditions: {
			resources: {
				stones: 10000
			}
		},
		points: 100
	}, {
		description: 'Gather 10k wood in your settlement.',
		name: 'Woody the Woodpecker',
		conditions: {
			resources: {
				wood: 10000
			}
		},
		points: 100
	}, {
		description: 'Gather 10k meat in your settlement.',
		name: 'Animal killer',
		conditions: {
			resources: {
				meat: 10000
			}
		},
		points: 100
	}, {
		description: 'Recruit 500 soldiers in your settlement.',
		name: 'Warfiend',
		conditions: {
			soldiers: 500
		},
		points: 200
	}, {
		description: 'Recruit 100 soldiers in your settlement.',
		name: 'Armed to the teeth',
		conditions: {
			soldiers: 100
		},
		points: 100
	}, {
		description: 'Recruit 1000 soldiers in your settlement',
		name: 'Warlord',
		conditions: {
			soldiers: 1000
		},
		points: 1000
	}, {
		description: 'Recruit 10 ships in your settlement.',
		name: 'Shipwrecked',
		conditions: {
			ships: 10
		},
		points: 100
	}, {
		description: 'Recruit 100 ships in your settlement.',
		name: 'Captain Ahab',
		conditions: {
			ships: 100
		},
		points: 1000
	}, {
		description: 'Gather 100 prestige.',
		name: 'Prestigious',
		conditions: {
			resources: {
				prestige: 100
			}
		},
		points: 100
	}, {
		description: 'Gather 500 prestige.',
		name: 'The God King',
		conditions: {
			resources: {
				prestige: 500
			}
		},
		points: 100
	}, {
		description: 'Gather 10 espionage.',
		name: 'You got Mossad-ed!',
		conditions: {
			resources: {
				espionage: 10
			}
		},
		points: 10
	}, {
		description: 'Gather 100 espionage.',
		name: 'You got Snowden-ed!',
		conditions: {
			resources: {
				espionage: 100
			}
		},
		points: 100
	}, {
		description: 'Gather 500 espionage.',
		name: 'I spy with my own eye',
		conditions: {
			resources: {
				espionage: 500
			}
		},
		points: 100
	}, {
		description: 'Gather maximum espionage.',
		name: 'Anna Chapman',
		conditions: {
			resources: {
				espionage: civitas.MAX_ESPIONAGE_VALUE
			}
		},
		points: 100
	}, {
		description: 'Gather 10 research.',
		name: 'Initiate',
		conditions: {
			resources: {
				research: 10
			}
		},
		points: 10
	}, {
		description: 'Gather 100 research.',
		name: 'Researcher',
		conditions: {
			resources: {
				research: 100
			}
		},
		points: 100
	}, {
		description: 'Gather 500 research.',
		name: 'Searching',
		conditions: {
			resources: {
				research: 500
			}
		},
		points: 100
	}, {
		description: 'Gather 500 faith.',
		name: 'Disciple',
		conditions: {
			resources: {
				faith: 500
			}
		},
		points: 100
	}, {
		description: 'Build a Castle in your settlement.',
		name: 'Castlevania',
		conditions: {
			buildings: {
				castle: 1
			}
		},
		points: 400
	}, {
		description: 'Build a Church in your settlement.',
		name: 'Winston Churchill, got it?',
		conditions: {
			buildings: {
				church: 1
			}
		},
		points: 100
	}, {
		description: 'Build an Academy in your settlement.',
		name: 'Academician',
		conditions: {
			buildings: {
				academy: 1
			}
		},
		points: 100
	}, {
		description: 'Build each of the mines (Iron, Gold, Copper and Salt).',
		name: 'All mine!',
		conditions: {
			buildings: {
				iconmine: 1,
				goldmine: 1,
				coppermine: 1,
				saltmine: 1
			}
		},
		points: 200
	}, {
		description: 'Fill out all your storage space.',
		name: 'All filled up',
		conditions: {
			storage: 0
		},
		points: 500
	}, {
		description: 'Build 10 catapults in your settlement.',
		name: 'Cat-a-pulter',
		conditions: {
			resources: {
				catapults: 10
			}
		},
		points: 200
	}, {
		description: 'Build an Embassy in your settlement.',
		name: 'Gandhi',
		conditions: {
			buildings: {
				embassy: 1
			}
		},
		points: 100
	}, {
		description: 'Get 100 achievements.',
		name: 'Achivement? Yes please.',
		conditions: {
			achievements: 100
		},
		points: 100
	}, {
		description: 'Recruit a mercenary army.',
		name: 'Merc',
		conditions: {
			mercenary: 1
		},
		points: 100
	}, {
		description: 'Reach 10 milion people in your settlement.',
		name: 'Megalopolis',
		conditions: {
			population: 10000000
		},
		points: 200
	}, {
		description: 'Upgrade your settlement`s Academy to level 3.',
		name: 'Too much research',
		conditions: {
			buildings: {
				academy: 3
			}
		},
		points: 200
	}, {
		description: 'Upgrade your settlement`s Castle to level 3.',
		name: 'Goldilocks',
		conditions: {
			buildings: {
				castle: 3
			}
		},
		points: 500
	}, {
		description: 'Upgrade your settlement`s Church to level 3.',
		name: 'Cathedral',
		conditions: {
			buildings: {
				church: 3
			}
		},
		points: 300
	}, {
		description: 'Build a Tournir Area in your settlement.',
		name: 'Richard Lionheart',
		conditions: {
			buildings: {
				tournir: 1
			}
		},
		points: 1000
	}, {
		description: 'Send a caravan to another settlement.',
		name: 'Donkey Lord',
		points: 100
	}, {
		description: 'Send a spy to another settlement.',
		name: 'Bond. James Bond.',
		points: 100
	}, {
		description: 'Send an army to another settlement.',
		name: 'Warrior',
		points: 100
	}, {
		description: 'Declare war to another settlement.',
		name: 'Warlord',
		points: 100
	}, {
		description: 'Propose to another settlement to join you.',
		name: 'The One to Rule Them All',
		points: 100
	}, {
		description: 'Propose a pact to another settlement.',
		name: 'The Friendly',
		points: 100
	}, {
		description: 'Propose an alliance to another settlement.',
		name: 'The Pacifist',
		points: 100
	}, {
		description: 'Gather maximum prestige.',
		name: 'Your highness',
		conditions: {
			resources: {
				espionage: civitas.MAX_PRESTIGE_VALUE
			}
		},
		points: 100
	}, {
		description: 'Win a battleground.',
		name: 'Conqueror',
		points: 20
	}, {
		description: 'Lose a battleground.',
		name: 'Foolish!',
		points: 10
	}, {
		description: 'Convince another settlement to accept an alliance.',
		name: 'I got your back',
		points: 200
	}, {
		description: 'Convince another settlement to accept a pact.',
		name: 'Pactish',
		points: 200
	}, {
		description: 'Convince another settlement to join your settlement.',
		name: 'You are mine!',
		points: 500
	}, {
		description: 'Adopt Christianity as the religion of your settlement.',
		name: 'Church of Nativity',
		conditions: {
			religion: 'christianity'
		},
		points: 100
	}, {
		description: 'Adopt Islam as the religion of your settlement.',
		name: 'Kaaba',
		conditions: {
			religion: 'islam'
		},
		points: 100
	}, {
		description: 'Adopt Judaism as the religion of your settlement.',
		name: 'Hanukkah',
		conditions: {
			religion: 'judaism'
		},
		points: 100
	}, {
		description: 'Adopt Buddhism as the religion of your settlement.',
		name: 'Bodhisattva',
		conditions: {
			religion: 'buddhism'
		},
		points: 100
	}, {
		description: 'Adopt Hinduism as the religion of your settlement.',
		name: 'Bhagavad Gita',
		conditions: {
			religion: 'hinduism'
		},
		points: 100
	}, {
		description: 'Adopt Confucianism as the religion of your settlement.',
		name: 'Tiān',
		conditions: {
			religion: 'confucianism'
		},
		points: 100
	}, {
		description: 'Adopt Taoism as the religion of your settlement.',
		name: 'Laozi',
		conditions: {
			religion: 'taoism'
		},
		points: 100
	}
];
