/**
 * Ranks panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_RANKS = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'ranks',
	
	/**
	 * Callback function for creating the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = this.core().ui().generic_panel_template('World Ranks');
	},

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		$(this.handle + ' section').append('<div class="ranks-list"></div>');
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let ranking_list = [];
		let settlements = this.core().get_settlements();
		for (let i = 0; i < settlements.length; i++) {
			if (settlements[i].is_urban()) {
				ranking_list.push({
					name: settlements[i].name(),
					data: settlements[i].get_rank()
				});
			}
		}
		ranking_list.sort(function(a, b) {
			let keyA = new Date(a.data.score);
			let keyB = new Date(b.data.score);
			if (keyA > keyB) {
				return -1;
			}
			if (keyA < keyB) {
				return 1;
			}
			return 0;
		});
		let _t = '<table class="normal">';
		_t += '<thead>' +
				'<tr>' +
					'<td class="center">Rank</td>' +
					'<td>City</td>' +
					'<td class="center">Score</td>' +
				'</tr>' +
			'</thead>' +
			'<tbody>';
		for (let i = 0; i < ranking_list.length; i++) {
			_t += '<tr>' +
				'<td class="center">' + (i + 1) + '</td>' +
				'<td>' + ranking_list[i].name + '</td>' +
				'<td class="center">' + ranking_list[i].data.score + '</td>' +
			'</tr>';
		}
		_t += '</tbody>' +
			'</table>';
		$(this.handle + ' .ranks-list').empty().append(_t);
	}
};
