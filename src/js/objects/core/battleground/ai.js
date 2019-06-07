/**
 * Move closer to the enemy.
 *
 * @private
 * @param {Object} cell
 * @returns {Boolean}
 */
civitas.objects.battleground.prototype._move_to_enemy = function(cell) {
	/*
	var sx = cell.x;
	var sy = cell.y;
	var source = this._grid[sy][sx];
	var can_move = civitas.SOLDIERS[source.item].moves;
	if (this._computer === 2) {
		// TODO
	}
	*/
	return false;
};

civitas.objects.battleground.prototype._do_computer = function() {
	for (var y = 0; y < this._grid.length; y++) {
		for (var x = 0; x < this._grid[y].length; x++) {
			if (this._grid[y][x] !== null && this._grid[y][x].side === this._computer) {
				var source = this._grid[y][x];
				this._from = {
					x: x,
					y: y
				};
				this._cell_select(this._from);
				if (civitas.SOLDIERS[source.item].ranged) {
					this._check_for_ranged_target(this._player);
				} else {
					this._check_for_melee_target(this._player);
				}
				this._move_to_enemy(this._from);
				this._from = null;
			}
		}
	}
	return true;
};

/**
 * Computer check if there are any targets in melee.
 *
 * @private
 * @param {Number} type
 * @returns {Boolean}
 */
civitas.objects.battleground.prototype._check_for_melee_target = function(type) {
	if (this._from !== null) {
		var source = this._grid[this._from.y][this._from.x];
		var can_move = civitas.SOLDIERS[source.item].moves;
		for (var y = 0; y < this._grid.length; y++) {
			for (var x = 0; x < this._grid[y].length; x++) {
				if (source !== null && !source.moved && can_move &&
					(Math.abs(y - this._from.y) + Math.abs(x - this._from.x)) <= can_move) {
					if (this._grid[y][x] !== null && this._grid[y][x].side === type) {
						this.attack({
							x: x,
							y: y
						});
						return true;
					}
				}
			}
		}
	}
	return false;
};

/**
 * Check if there are any targets in range.
 *
 * @private
 * @param {Number} type
 * @returns {Boolean}
 */
civitas.objects.battleground.prototype._check_for_ranged_target = function(type) {
	if (this._from !== null) {
		for (var y = 0; y < this._grid.length; y++) {
			for (var x = 0; x < this._grid[y].length; x++) {
				if (this._grid[y][x] !== null && this._grid[y][x].side === type) {
					this.attack({
						x: x,
						y: y
					});
					return true;
				}
			}
		}
	}
	return false;
};
