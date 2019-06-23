/**
 * Battle window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_BATTLE = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '<section id="window-{ID}" class="window">' +
			'<div class="container">' +
				'<div title="Attack and defense rating for the attacking army." class="tips attack"></div>' +
				'<div title="Attack and defense rating for the defending army." class="tips defense"></div>' +
				'<div class="battleground"></div>' +
				'<div title="Current turn." class="tips turns">1</div>' +
				'<div class="status"></div>' +	
				'<div class="toolbar">' +
					'<a title="End current turn." class="tips button end" href="#">End turn</a> ' +
					'<a title="Close the window." class="tips button close" href="#">Close</a>' +
				'</div>' +
			'</div>' +
		'</section>',
	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'battle',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let handle = this.handle();
		core.pause();
		this.battleground = new civitas.objects.battleground({
			core: core,
			width: 15,
			height: 9,
			elements: {
				container: handle + ' .battleground',
				attack: handle + ' .attack',
				defense: handle + ' .defense',
				console: handle + ' .status',
			},
			attack: {
				city: this.params_data.source.source.id,
				army: this.params_data.source.data.army,
				navy: this.params_data.source.data.navy
			},
			defense: {
				city: this.params_data.destination.id(),
				army: this.params_data.destination.army,
				navy: this.params_data.destination.navy
			},
			on_win: function(winner, loser) {
				core.achievement('conqueror');
				$(handle + ' .end').hide();
				$(handle + ' .close').show();
			},
			on_lose: function(winner, loser) {
				core.achievement('foolish');
				$(handle + ' .end').hide();
				$(handle + ' .close').show();
			},
			on_end_turn: function(turn) {
				$(handle + ' .turns').html(turn);
			}
		});
		$(handle + ' .close').hide();
		$(handle).on('click', '.close', function () {
			core.unpause();
			self.destroy();
			return false;
		}).on('click', '.end', function () {
			self.battleground.end_turn();
			return false;
		});
	}
};
