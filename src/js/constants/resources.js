
/**
 * List of resource categories.
 * 
 * @constant
 * @default
 * @type {Array}
 */
game.RESOURCE_CATEGORIES = [
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
game.RESOURCES = {
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
		price: 135,
		category: 'construction'
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
