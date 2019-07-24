/**
 * Ranks panel data.
 *
 * @param {Object} params
 * @license GPL-3.0-or-later
 * @class ui_panel_ranks
 * @extends ui_panel
 * @returns {ui_panel_ranks}
 */
class ui_panel_ranks extends ui_panel {

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {ui_panel_ranks}
	 * @param {Object} params
	 */
	constructor (params) {
		params.id = 'ranks';
		params.template = ui.generic_panel_template('World Ranks');
		params.on_show = function(params) {
			$(this.handle + ' section').append('<div class="ranks-list"></div>');
		};
		params.on_refresh = function() {
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
		};
		super(params);
	}
}
