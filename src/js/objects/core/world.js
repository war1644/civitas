/**
 * World object.
 * 
 * @param {Object} params
 * @class {civitas.objects.world}
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
		S: '#64B4E1',
		// Ocean
		O: '#509FCC',
		// Grass
		G: '#E6F59A',
		// Jungle
		J: '#549D65',
		// Plains
		P: '#96C764',
		// Hills
		H: '#E1C859',
		// Swamp
		W: '#82C995',
		// Mountains
		M: '#B37D1A',
		// Desert
		D: '#F2CD63',
		// Ice
		I: '#DCDCE6',
		// Borders
		X: '#64B4E1'
	}
	
	/**
	 * World properties.
	 *
	 * @private
	 * @type {Object}
	 */
	this._properties = {
		cell_size: 24,
		beautify: true,
		grid: true
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
	 * @returns {civitas.objects.world}
	 * @param {Object} params
	 */
	this.__init = function (params) {
		this._core = params.core;
		if (this._data.length === 0) {
			this._data = this._generate();
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
		for (var x = 0; x <= civitas.WORLD_SIZE_WIDTH; x++) {
			for (var y = 0; y <= civitas.WORLD_SIZE_HEIGHT; y++) {
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
			}
		}
		return this;
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
	 * Return the moisture data for the specified hex.
	 *
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {String}
	 */
	this.get_hex_moisture = function(x, y) {
		return this.get_hex(x, y).m;
	};

	/**
	 * Return the elevation data for the specified hex.
	 *
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {String}
	 */
	this.get_hex_elevation = function(x, y) {
		return this.get_hex(x, y).e;
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
	 * Add a settlement into the world data.
	 *
	 * @public
	 * @param {civitas.settlement} settlement
	 * @returns {civitas.objects.world}
	 */
	this.add_city = function(settlement) {
		var location = settlement.get_location();
		this._data[location.y][location.x].s = settlement.id();
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
		var location = settlement.get_location();
		this._data[location.y][location.x].s = null;
		this._data[location.y][location.x].n = null;
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
		var map = civitas.utils.create_array(civitas.WORLD_SIZE_WIDTH + 1, civitas.WORLD_SIZE_WIDTH + 1);
		start_displacement(map, civitas.WORLD_SIZE_WIDTH);
		return map;

		function start_displacement(map, size) {
			var tr, tl, t, br, bl, b, r, l, center;
			map[0][0].e = Math.random(1.0);
			tl = map[0][0].e;
			map[0][size].e = Math.random(1.0);
			bl = map[0][size].e;
			map[size][0].e = Math.random(1.0);
			tr = map[size][0].e;
			map[size][size].e = Math.random(1.0);
			br = map[size][size].e;
			map[size / 2][size / 2].e = map[0][0].e + map[0][size].e + map[size][0].e + map[size][size].e / 4;
			map[size / 2][size / 2].e = normalize(map[size / 2][size / 2].e);
			center = map[size / 2][size / 2].e;
			map[size / 2][size].e = bl + br + center + center / 4;
			map[size / 2][0].e = tl + tr + center + center / 4;
			map[size][size / 2].e = tr + br + center + center / 4;
			map[0][size / 2].e = tl + bl + center + center / 4;
			midpoint_displacement(size);
		}

		function midpoint_displacement(dimension) {
			var new_dimension = dimension / 2;
			var top, tr, tl, bottom, bl, br, right, left, center;
			if (new_dimension > 1) {
				for (var i = new_dimension; i <= civitas.WORLD_SIZE_WIDTH; i += new_dimension) {
					for (var j = new_dimension; j <= civitas.WORLD_SIZE_WIDTH; j += new_dimension) {
						var x = i - (new_dimension / 2);
						var y = j - (new_dimension / 2);
						tl = map[i - new_dimension][j - new_dimension].e;
						tr = map[i][j - new_dimension].e;
						bl = map[i - new_dimension][j].e;
						br = map[i][j].e;
						map[x][y].e = (tl + tr + bl + br) / 4 + displace(dimension);
						map[x][y].e = normalize(map[x][y].e);
						center = map[x][y].e;
						if (j - (new_dimension * 2) + (new_dimension / 2) > 0) {
							map[x][j - new_dimension].e = (tl + tr + center + map[x][j - dimension + (new_dimension / 2)].e) / 4 + displace(dimension);
						} else {
							map[x][j - new_dimension].e = (tl + tr + center) / 3 + displace(dimension);
						}
						map[x][j - new_dimension].e = normalize(map[x][j - new_dimension].e);
						if (j + (new_dimension / 2) < civitas.WORLD_SIZE_WIDTH) {
							map[x][j].e = (bl + br + center + map[x][j + (new_dimension / 2)].e) / 4 + displace(dimension);
						} else {
							map[x][j].e = (bl + br + center) / 3 + displace(dimension);
						}
						map[x][j].e = normalize(map[x][j].e);
						if (i + (new_dimension / 2) < civitas.WORLD_SIZE_WIDTH) {
							map[i][y].e = (tr + br + center + map[i + (new_dimension / 2)][y].e) / 4 + displace(dimension);
						} else {
							map[i][y].e = (tr + br + center) / 3 + displace(dimension);
						}
						map[i][y].e = normalize(map[i][y].e);
						if (i - (new_dimension * 2) + (new_dimension / 2) > 0) {
							map[i - new_dimension][y].e = (tl + bl + center + map[i - dimension + (new_dimension / 2)][y].e) / 4 + displace(dimension);
						} else {
							map[i - new_dimension][y].e = (tl + bl + center) / 3 + displace(dimension);
						}
						map[i - new_dimension][y].e = normalize(map[i - new_dimension][y].e);
					}
				}
				midpoint_displacement(new_dimension);
			}
		}

		function displace(num) {
			return (Math.random(1.0) - 0.5) * (num / (civitas.WORLD_SIZE_WIDTH + civitas.WORLD_SIZE_WIDTH) * 5);
		}

		function normalize(value) {
			if (value > 1) {
				value = 1;
			} else if (value < -1) {
				value = -1;
			}
			return value;
		}
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
