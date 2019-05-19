/**
 * City settlement.
 *
 * @constant
 * @type {Number}
 */
civitas.CITY = 0;

/**
 * Village settlement.
 *
 * @constant
 * @type {Number}
 */
civitas.VILLAGE = 1;

civitas.WORLD_SIZE_WIDTH = 960;

civitas.WORLD_SIZE_HEIGHT = 560;

civitas.CITY_AREA = 100;

civitas.VILLAGE_AREA = 50;

/**
 * Max number of initial settlements on a map.
 *
 * @constant
 * @type {Number}
 */
civitas.MAX_INITIAL_SETTLEMENTS = 20;

/**
 * Max number of settlements on a map.
 *
 * @constant
 * @type {Number}
 */
civitas.MAX_SETTLEMENTS = 50;

/**
 * List of possible world rulers.
 *
 * @constant
 * @type {Array}
 */
civitas.RULERS = [
	{
		name: 'Caesar',
		title: 'Emperor',
		avatar: 1,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Cronus',
		title: 'Ruler',
		avatar: 3,
		personality: civitas.PERSONALITY_BALANCED
	}, {
		name: 'Dido',
		title: 'Queen',
		avatar: 6,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Genghis',
		title: 'Khan',
		avatar: 19,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Khufu',
		title: 'Pharaoh',
		avatar: 20,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Musa I',
		title: 'Mansa',
		avatar: 30,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Sennacherib',
		title: 'King',
		avatar: 2,
		personality: civitas.PERSONALITY_BALANCED
	}, {
		name: 'Pepi',
		title: 'Pharaoh',
		avatar: 40,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Hatshepsut',
		title: 'Pharaoh',
		avatar: 5,
		personality: civitas.PERSONALITY_BALANCED
	}, {
		name: 'Clovis',
		title: 'King',
		avatar: 13,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Gilgamesh',
		title: 'King',
		avatar: 31,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Dalai Lama',
		title: 'Priest',
		avatar: 48,
		personality: civitas.PERSONALITY_DIPLOMAT
	},
	{
		name: 'Ashoka',
		title: 'Emperor',
		avatar: 28,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Charlemagne',
		title: 'King',
		avatar: 43,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Darius',
		title: 'King',
		avatar: 38,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Ivan III',
		title: 'Tzar',
		avatar: 19,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Qin Shi Huang',
		title: 'Emperor',
		avatar: 45,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Ozymandias',
		title: 'Pharaoh',
		avatar: 33,
		personality: civitas.PERSONALITY_BALANCED
	}, {
		name: 'Timur',
		title: 'Emperor',
		avatar: 37,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Pol Pot',
		title: 'President',
		avatar: 46,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Napoleon',
		title: 'Emperor',
		avatar: 47,
		personality: civitas.PERSONALITY_WARLORD
	}, {
		name: 'Hirohito',
		title: 'Emperor',
		avatar: 30,
		personality: civitas.PERSONALITY_DIPLOMAT
	}, {
		name: 'Ivan Sirko',
		title: 'Otaman',
		avatar: 41,
		personality: civitas.PERSONALITY_BALANCED
	}, {
		name: 'Peter the Great',
		title: 'Tsar',
		avatar: 40,
		personality: civitas.PERSONALITY_DIPLOMAT
	}
];

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
	'Gerasa'
];

/**
 * List of possible ruler names for settlements and various other obscure
 * reasons.
 *
 * @type {Array}
 * @constant
 */
civitas.NAMES = [
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
	/*
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	*/
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
	'Irmhild'
];
