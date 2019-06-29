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
		const pos = {
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
		const data = this.data();
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
		const location = settlement.location();
		this._data[location.y][location.x].s = settlement.id();
		this._data[location.y][location.x].l = true;
		this._data[location.y][location.x].lid = settlement.id();
		this._data[location.y][location.x].n = settlement.name();
		//civitas.svg.add_city_image(location.x, location.y, settlement);
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
		const location = settlement.location();
		const id = settlement.id();
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

	this.get_neighbours = function(y, x) {
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
	};

	/**
	 * Get the distance between two points.
	 *
	 * @param {Number} source
	 * @param {Number} destination
	 * @returns {Number}
	 */
	this.get_distance = function(source, destination) {
		return Math.floor(Math.sqrt(Math.pow(destination.x - source.x, 2) + Math.pow(destination.y - source.y, 2))) * 100;
	};

	/**
	 * Get the distance between two points in days
	 *
	 * @param {Number} source
	 * @param {Number} destination
	 * @returns {Number}
	 */
	this.get_distance_in_days = function(source, destination) {
		return Math.floor((Math.sqrt(Math.pow(destination.x - source.x, 2) + Math.pow(destination.y - source.y, 2)) * 100) / 15);
	}

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
