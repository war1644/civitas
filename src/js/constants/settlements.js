/**
 * List of settlement types
 *
 * @constant
 * @default
 * @type {Array}
 */
game.SETTLEMENTS = [
	'city',
	'village',
	'metropolis',
	'camp',
	'ruins'
];

/**
 * City settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.CITY = 0;

/**
 * Village settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.VILLAGE = 1;

/**
 * Metropolis settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.METROPOLIS = 2;

/**
 * Raider camp settlement.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.CAMP = 3;

/**
 * Ruins.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.RUINS = 4;

/**
 * Max number of settlements on a map.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.MAX_SETTLEMENTS = 100;

/**
 * Max number of settlement icons.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.MAX_SETTLEMENT_ICONS = 3;

/**
 * Max level a settlement can have.
 * 
 * @constant
 * @default
 * @type {Number}
 */
game.MAX_SETTLEMENT_LEVEL = 99;

/**
 * Getting total city population is city_level * game.POPULATION_PER_LEVEL.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.POPULATION_PER_LEVEL = 2300;

/**
 * The minimum value settlement fame can have.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.MIN_FAME_VALUE = 1;

/**
 * Days it takes to complete a world project.
 *
 * @constant
 * @default
 * @type {Number}
 */
game.RUINS_TIME_TO_BUILD = 7200;

/**
 * Resources required to complete atage 2 or builging a world project.
 *
 * @constant
 * @default
 * @type {Object}
 */
game.RUINS_RESOURCES_REQ = {
	coins: 100000000,
	wood: 10000,
	woodplanks: 50000,
	stones: 50000,
	limestone: 10000,
	mosaic: 1000,
	meals: 10000,
	tools: 1000,
	bricks: 50000,
	sand: 1000,
	steel: 10000,
	gold: 10000,
	silver: 10000,
	clothes: 10000,
	furcoats: 10000,
	gems: 1000,
	diamonds: 1000,
	champagne: 1000,
	cigars: 1000,
	jewelery: 1000,
	robes: 1000,
	perfume: 1000,
	soap: 1000,
	silk: 1000
};

/**
 * List of possible world settlement names.
 *
 * @constant
 * @type {Array}
 */
game.SETTLEMENT_NAMES = [
	'Alexandria',
	'Rome',
	'Carthage',
	'Constantinople',
	'Karakorum',
	'Niniveh',
	'Damascus',
	'Thebes',
	'Men-nefer',
	'Aria',
	'Zeffari',
	'Laenteglos',
	'Eastborne',
	'Larton',
	'Nantgarw',
	'Kingcardine',
	'Swindlincote',
	'Cewmann',
	'Rochdale',
	'Malrton',
	'Falcon Haven',
	'Rotherham',
	'Ironforge',
	'Halivaara',
	'Ularee',
	'Snake Canyon',
	'Dornwich',
	'Stawford',
	'Eastborne',
	'Dry Gulch',
	'Tamworth',
	'Ferncombe',
	'Rutherglen',
	'Dewhurst',
	'Haedleigh',
	'Chepstow',
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
game.NAMES = [
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
