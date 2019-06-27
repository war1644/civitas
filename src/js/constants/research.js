
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
		duration: 80,
		cost: {
			research: 500,
			coins: 500000,
			woodplanks: 200,
			wheat: 100,
			tools: 10
		},
		effect: {
			buildings: {
				cottonfarm: 1,
				grainfarm: 1,
				grapesfarm: 1,
				rosenursery: 1,
				tobaccofarm: 1
			}
		}
	}, {
		name: 'Animal Enclosures',
		handle: 'animalenclosure',
		description: '',
		duration: 70,
		cost: {
			research: 400,
			coins: 500000,
			woodplanks: 100,
			iron: 100
		},
		effect: {
			buildings: {
				cattlefarm: 1,
				pigfarm: 1,
				goatfarm: 1
			}
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
			buildings: {
				cookhouse: 1
			}
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
			buildings: {
				carpenter: 2,
				lumberjack: 2
			}
		}
	}, {
		name: 'Diplomacy',
		handle: 'diplomacy',
		description: '',
		duration: 160,
		cost: {
			research: 1000,
			coins: 100000,
			soap: 100,
			jewelery: 100
		},
		effect: {
			buildings: {
				embassy: 10
			}
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
		duration: 60,
		cost: {
			research: 100,
			coins: 100000,
			steel: 200,
			glass: 1000
		},
		effect: {
			buildings: {
				ironmine: 1,
				coppermine: 1,
				goldmine: 1,
				uraniummine: 1
			}
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
	}, {
		name: 'Taxation',
		handle: 'taxation',
		description: '',
		duration: 100,
		cost: {
			research: 900,
			coins: 1000000
		},
		effect: {
			tax: 100
		}
	}
];
