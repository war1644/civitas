/**
 * Get the distance between two cells.
 *
 * @public
 * @param {Object} cell1
 * @param {Object} cell2
 * @returns {Number}
 */
civitas.objects.battleground.prototype.distance = function(cell1, cell2) {
	var delta_x = cell1.x - cell2.x;  
    var delta_y = cell1.y - cell2.y;  
    return ((Math.abs(delta_x) + Math.abs(delta_y) + Math.abs(delta_x - delta_y)) / 2);
};

/**
 * Move the contents of one cell to another cell.
 *
 * @public
 * @param {Object} cell
 * @returns {Boolean}
 */
civitas.objects.battleground.prototype.move = function(cell) {
	var sx = this._from.x;
	var sy = this._from.y;
	if (this._from !== null && cell !== null) {
		var source = this._grid[sy][sx];
		var destination = this._grid[cell.y][cell.x];
		var city = this.core().get_settlement(source.city);
		if (source !== null && source.moved) {
			this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name +
				'</strong> already used up its turn.');
			return false;
		}
		if (source !== null && destination === null && city) {
			var can_move = civitas.SOLDIERS[this._grid[sy][sx].item].moves;
			if ((Math.abs(cell.y - sy) + Math.abs(cell.x - sx)) <= can_move) {
				this._grid[cell.y][cell.x] = this._grid[sy][sx];
				this._cell_empty(this._from);
				this._from = null;
				this._grid[cell.y][cell.x].moved = true;
				this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name +
					'</strong> moved to ' + (cell.x + 1) + 'x' + (cell.y + 1) + '.');
				this.redraw();
				return true;
			} else {
				this.log(city.name() + '`s <strong>' + civitas.SOLDIERS[source.item].name +
					'</strong> is unable to move to the specified location.');
				return false;
			}
		}
	}
};

/**
 * Highlight the cells around the currently selected (or hovered) cell.
 *
 * @public
 * @param {Object} cell
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype.highlight_cells = function(cell) {
	this._cells_empty();
	var sx = cell.x;
	var sy = cell.y;
	var source = this._grid[sy][sx];
	if (source !== null) {
		var can_move = civitas.SOLDIERS[source.item].moves;
		for (var y = 0; y < this._grid.length; y++) {
			for (var x = 0; x < this._grid[y].length; x++) {
				if (!source.moved && can_move && (Math.abs(y - sy) +
					Math.abs(x - sx)) <= can_move) {
					if (this._grid[y][x] === null) {
						$(this._elements.container + ' .cell[data-pos=' + x + '-' + y + ']')
							.addClass('canmove');
					}
				}
			}
		}
		var is_ranged = civitas.SOLDIERS[source.item].ranged;
		for (var y = 0; y < this._grid.length; y++) {
			for (var x = 0; x < this._grid[y].length; x++) {
				if (!source.moved && (Math.abs(y - sy) + Math.abs(x - sx)) <= is_ranged) {
					if (this._grid[y][x] === null) {
						$(this._elements.container + ' .cell[data-pos=' + x + '-' + y + ']')
							.addClass('canattack');
					}
				}
			}
		}
	}
	return this;
};

/**
 * Do a nice effect when a cell is under attack.
 *
 * @private
 * @param {Object} cell
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._cell_under_attack = function(cell) {
	$(this._elements.container + ' .cell[data-pos=' + cell.x + '-' + cell.y + ']')
		.addClass('scale').delay(1000).queue(function() {
			$(this).removeClass('scale').dequeue();
		});
	return this;
};

/**
 * Empty all the cells that are already empty.
 *
 * @private
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._cells_empty = function() {
	for (var y = 0; y < this._grid.length; y++) {
		for (var x = 0; x < this._grid[y].length; x++) {
			if (this._grid[y][x] === null) {
				this._cell_empty({
					x: x,
					y: y
				});
			}
		}
	}
	return this;
};

/**
 * Empty one cell.
 *
 * @private
 * @param {Object} cell
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._cell_empty = function(cell) {
	this._grid[cell.y][cell.x] = null;
	$(this._elements.container + ' .cell[data-pos=' + cell.x + '-' + cell.y + ']')
		.removeData('side')
		.removeData('amount')
		.removeData('soldier')
		.addClass('empty')
		.removeClass('canmove canattack selected')
		.empty();
	return this;
};

/**
 * Select a cell.
 *
 * @private
 * @param {Object} cell
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._cell_select = function(cell) {
	$(this._elements.container + ' .cell').removeClass('selected canmove canattack');
	$(this._elements.container + ' .cell[data-pos=' + cell.x + '-' + cell.y + ']').addClass('selected');
	this._from = cell;
	this.highlight_cells(cell);
	return this;
};

/**
 * Add a cell to the battleground grid.
 *
 * @private
 * @param {Number} x
 * @param {Number} y
 * @param {Object} army
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._cell_add = function(x, y, army) {
	this._grid[y][x] = army;
	$(this._elements.container + ' .cell[data-pos=' + x + '-' + y + ']')
		.removeData('side')
		.removeData('amount')
		.removeData('soldier')
		.attr('data-side', army.side)
		.attr('data-amount', army.total)
		.attr('data-soldier', army.item)
		.removeClass('empty canmove canattack selected')
		.empty()
		.append('<span class="moves' + (army.moved === false ? ' has' : '') + '"></span>' +
			'<img class="tips" title="' + civitas.SOLDIERS[army.item].name + '" src="' +
			civitas.ASSETS_URL + 'images/assets/army/' + army.item + '.png" />' +
			'<span class="amount">' + army.total + '</span>');
	return this;
};

/**
 * Redraw the grid.
 *
 * @public
 * @returns {Boolean}
 */
civitas.objects.battleground.prototype.redraw = function() {
	var a_attack = 0;
	var a_defense = 0;
	var d_attack = 0;
	var d_defense = 0;
	for (var y = 0; y < this._grid.length; y++) {
		for (var x = 0; x < this._grid[y].length; x++) {
			var army = this._grid[y][x];
			if (army !== null && army.total > 0) {
				army.attack = army.total * civitas.SOLDIERS[army.item].attack;
				army.defense = army.total * civitas.SOLDIERS[army.item].defense;
				if (army.side === civitas.BATTLEGROUND_ATTACK) {
					a_attack += army.attack;
					a_defense += army.defense;
				} else {
					d_attack += army.attack;
					d_defense += army.defense;
				}
				this._cell_add(x, y, army);
			} else {
				this._cell_empty({
					x: x,
					y: y
				});
			}
		}
	}
	this._stats.attacking.attack = a_attack;
	this._stats.attacking.defense = a_defense;
	this._stats.defending.attack = d_attack;
	this._stats.defending.defense = d_defense;
	this.show_stats();
	this._check_status();
	$('.tipsy').remove();
	$('.tips').tipsy({
		gravity: $.fn.tipsy.autoNS,
		html: true
	});
	return true;
};

/**
 * Setup the battleground hex grid.
 *
 * @private
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._setup = function() {
	var self = this;
	this._reset();
	var xx = 0;
	var xxx = 3;
	var yy;
	for (var item in this._attack.army) {
		if (this._attack.army[item] > 0) {
			if (civitas.SOLDIERS[item].siege === true) {
				yy = 0;
				xx = xxx;
				xxx++;
			} else {
				yy = 2;
			}
			this.add(xx, yy, 1, item, this._attack);
			xx++;
		}
	}
	xxx = 3;
	xx = 0;
	for (var item in this._defense.army) {
		if (this._defense.army[item] > 0) {
			if (civitas.SOLDIERS[item].siege === true) {
				yy = this._properties.width - 1;
				xx = xxx;
				xxx++;
			} else {
				yy = this._properties.width - 3;
			}
			this.add(xx, yy, 2, item, this._defense);
			xx++;
		}
	}
	$(this._elements.container).on('mouseover', '.cell', function () {
		if (self._from === null) {
			var from = {
				x: parseInt($(this).data('x')),
				y: parseInt($(this).data('y'))
			};
			self.highlight_cells(from);
		}
		return false;
	}).on('click', '.cell', function () {
		if ($(this).hasClass('empty')) {
			if (self._from !== null) {
				var to = {
					x: parseInt($(this).data('x')),
					y: parseInt($(this).data('y'))
				};
				self.move(to);
				self.on_move.call(self, self._from, to);
			}
		} else {
			if (parseInt($(this).data('side')) === self._player) {
				if (!$(this).hasClass('selected')) {
					var from = {
						x: parseInt($(this).data('x')),
						y: parseInt($(this).data('y'))
					};
					self._cell_select(from);
					self.on_select.call(self, from);
				} else {
					self._from = null;
					$(self._elements.container + ' .cell').removeClass('selected canmove canattack');
				}
			} else if (parseInt($(this).data('side')) === self._computer) {
				if (self._from !== null) {
					var to = {
						x: parseInt($(this).data('x')),
						y: parseInt($(this).data('y'))
					};
					self.attack(to);
					self.on_attack.call(self, self._from, to);
				}
			}
		}
		return false;
	});
	return this;
};

/**
 * Add a hex cell to the battleground grid.
 *
 * @public
 * @param {Number} x
 * @param {Number} y
 * @param {Number} side
 * @param {String} soldier
 * @param {Object} settlement
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype.add = function(x, y, side, soldier, settlement) {
	this._cell_add(y, x, {
		item: soldier,
		city: settlement.city,
		total: settlement.army[soldier],
		attack: civitas.SOLDIERS[soldier].attack * settlement.army[soldier],
		defense: civitas.SOLDIERS[soldier].defense * settlement.army[soldier],
		side: side,
		moved: false
	});
	return this;
};
