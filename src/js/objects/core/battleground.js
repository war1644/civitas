/**
 * Battleground object.
 * 
 * @param {Object} params
 * @class {civitas.objects.battleground}
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
	 * @type {Function}
	 * public
	 */
	this.on_win = function() {};

	/**
	 * Callback when the user loses.
	 *
	 * @type {Function}
	 * public
	 */
	this.on_lose = function() {};

	/**
	 * Callback when the user selects a cell.
	 *
	 * @type {Function}
	 * public
	 */
	this.on_select = function() {};

	/**
	 * Callback when the user moves a cell.
	 *
	 * @type {Function}
	 * public
	 */
	this.on_move = function() {};

	/**
	 * Callback when the user attacks another cell.
	 *
	 * @type {Function}
	 * public
	 */
	this.on_attack = function() {};

	/**
	 * Callback when the turn ends.
	 *
	 * @type {Function}
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
		var sx = this._from.x;
		var sy = this._from.y;
		var source = this._grid[sy][sx];
		var destination = this._grid[cell.y][cell.x];
		var is_ranged = civitas.SOLDIERS[source.item].ranged;
		var city = this.core().get_settlement(source.city);
		var city2 = this.core().get_settlement(destination.city);
		var remaining = 0;
		if (city && source.moved) {
			this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + 
				'</strong> already used up its turn.');
			return false;
		}
		if (source !== null && destination !== null && city && city2) {
			if (destination.side === civitas.BATTLEGROUND_DEFENSE) {
				var _a = '_defense';
			} else {
				var _a = '_attack';
			}
			if (is_ranged !== undefined) {
				if ((Math.abs(cell.y - sy) + Math.abs(cell.x - sx)) > is_ranged) {
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + 
						'</strong> is not close enough for a ranged attack.');
					return false;
				}
				var attack = Math.ceil(source.attack / 2);
				var defense = destination.defense;
				if (defense - attack < 0) {
					this[_a].army[destination.item] = 0;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name + 
						'</strong> attacked ' + city2.name() + '`s <strong>' + 
						civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack + 
						' damage from range and killed its opponent.');
					this._cell_empty(cell);
				} else {
					remaining = Math.ceil((defense - attack) /
						civitas.SOLDIERS[destination.item].defense);
					destination.total = remaining;
					this[_a].army[destination.item] = remaining;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name +
						'</strong> attacked ' + city2.name() + '`s <strong>' +
						civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack +
						' damage from range.');
				}
				this._cell_under_attack(cell);
				source.moved = true;
				this.redraw();
			} else {
				var can_move = civitas.SOLDIERS[this._grid[sy][sx].item].moves;
				if ((Math.abs(cell.y - sy) + Math.abs(cell.x - sx)) > can_move) {
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name +
						'</strong> doesn`t have a ranged attack.');
					return false;
				}
				var attack = Math.ceil(source.attack / 2);
				var defense = destination.defense;
				if (defense - attack < 0) {
					this[_a].army[destination.item] = 0;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name +
						'</strong> attacked ' + city2.name() + '`s <strong>' +
						civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack +
						' damage in melee and killed its opponent.');
					this._cell_empty(cell);
				} else {
					remaining = Math.ceil((defense - attack) /
						civitas.SOLDIERS[destination.item].defense);
					destination.total = remaining;
					this[_a].army[destination.item] = remaining;
					this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name +
						'</strong> attacked ' + city2.name() + '`s <strong>' +
						civitas.SOLDIERS[destination.item].name + '</strong> for ' + attack +
						' damage in melee.');
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
		for (var y = 0; y < this._grid.length; y++) {
			for (var x = 0; x < this._grid[y].length; x++) {
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
		var city;
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
		$(this._elements.attack).empty()
			.append(this.core().get_settlement(this._attack.city).name() + ' ' +
			this._stats.attacking.attack + ' / ' + this._stats.attacking.defense);
		$(this._elements.defense).empty()
			.append(this.core().get_settlement(this._defense.city).name() + ' ' +
			this._stats.defending.attack + ' / ' + this._stats.defending.defense);
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
		var mode = 'even';
		var template = '';
		for (var y = 0; y <= this._properties.height - 1; y++) {
			this._grid[y] = [];
			template += '<ol class="' + mode + '">';
			for (var x = 0; x <= this._properties.width - 1; x++) {
				this._grid[y][x] = null;
				template += '<li data-pos="' + x + '-' + y + '" data-x="' + x + '" data-y="' + y +
					'" class="cell empty"></li>';
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

	// Fire up the constructor
	return this.__init(params);
};
