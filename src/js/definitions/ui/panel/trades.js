/**
 * Trades panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_TRADES = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'trades',
	
	/**
	 * Callback function for creating the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = this.core().ui().generic_panel_template('World Market');
	},

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let settlement = core.get_settlement();
		let el = this.handle;
		let _t = '';
		$(el + ' section').append(core.ui().tabs([
			'Export',
			'Import',
			'Mercenaries',
			'BlackMarket',
			'Prices'
		]));
		$(el + ' #tab-import').append('<p>Below is a list of goods that the other cities in the world are looking to sell. The goods replenish every six months, so plan accordingly. You will need to build a Trading Post before being able to sell goods.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-export').append('<p>Below is a list of goods that the other cities in the world are looking to buy. The goods replenish every six months, so plan accordingly. You will need to build a Trading Post before being able to buy goods.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-mercenaries').append('<p>Below is a list of mercenary armies that are looking for hire. Mercenaries are available only for raiding and conquest missions, they do not join your city so they will not participate in defense.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-blackmarket').append('<p>The Black Market is a way to dump your excess materials when you`re in need of emptying your warehouses, but expect a steep price drop (taxes for all Black Market trades are <strong>' + civitas.BLACK_MARKET_DISCOUNT + '%</strong>). The goods will be taken immediately from your warehouses but you will receive the coins at the <strong>start of the next month</strong>. Also, you get <strong>no prestige</strong> from Black Market trades.</p>' +
			'<div class="contents"></div>');
		$(el + ' #tab-prices').append('<div class="contents"></div>');
		$(el + ' #tab-blackmarket > .contents').append('' +
			'<table class="normal">' +
				'<thead>' +
					'<tr>' +
						'<td>Resources: <select class="bm-materials"></select></td>' +
						'<td>Quantity: ' +
							'<select class="bm-quantity">' +
								'<option value="0">-- select --</option>' +
								'<option value="10">10</option>' +
								'<option value="100">100</option>' +
								'<option value="1000">1000</option>' +
								'<option value="10000">10000</option>' +
							'</select> or enter manually <input type="number" min="1" max="100000" placeholder="amount" class="small bm-qty-manual" />' +
						'</td>' +
						'<td>' +
							'<a title="List goods on Black Market" class="tips bmarket" href="#">List</a>' +
						'</td>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +
				'</tbody>' +
			'</table>');
		let out = '<option value="0">-- select --</option>';
		let resources = settlement.get_resources();
		for (let item in resources) {
			if (!civitas.utils.is_virtual_resource(item)) {
				out += '<option value="' + item + '"> ' + civitas.utils.get_resource_name(item) + '</option>';
			}
		}
		$(el + ' .bm-materials').empty().append(out);
		$(el).on('click', '.settlement-info', function () {
			let _settlement_name = $(this).data('settlement');
			core.ui().open_panel(civitas.PANEL_SETTLEMENT, core.get_settlement(_settlement_name));
			return false;
		}).on('click', '.buy:not(.disabled)', function () {
			if (!settlement.can_trade()) {
				core.ui().error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			let handle = $(this).data('settlement');
			let resource = $(this).data('resource');
			if (settlement.buy_from_settlement(handle, resource) !== false) {
				self.on_refresh();
			}
			return false;
		}).on('click', '.sell:not(.disabled)', function () {
			if (!settlement.can_trade()) {
				core.ui().error('You will need to construct a Trading Post before being able to trade resources with other settlements.');
				return false;
			}
			let handle = $(this).data('settlement');
			let resource = $(this).data('resource');
			if (settlement.sell_to_settlement(handle, resource) !== false) {
				self.on_refresh();
			}
			return false;
		}).on('click', '.bmarket', function () {
			let resource = $('.bm-materials').val();
			let auto_amount = $('.bm-quantity').val();
			let manual_amount = $('.bm-qty-manual').val();
			let amount = manual_amount === '' ? parseInt(auto_amount) : parseInt(manual_amount);
			if (resource !== '0' && amount > 0) {
				if (settlement.add_to_black_market(resource, amount)) {
					self.on_refresh();
					$('.bm-qty-manual').val('');
				}
			} else {
				core.ui().error('Select a resource and the amount of it you want to place on the Black Market.');
			}
			return false;
		}).on('click', '.recruit:not(.disabled)', function () {
			let handle = $(this).data('handle');
			if (settlement.recruit_mercenary_army(handle) !== false) {
				self.on_refresh();
			}
			return false;
		}).on('click', '.view-army:not(.disabled)', function () {
			let army = parseInt($(this).data('id'));
			let army_data = civitas.MERCENARIES[army];
			core.ui().open_panel(civitas.PANEL_ARMY, army_data);
			return false;
		});
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		let core = this.core();
		let my_settlement = core.get_settlement();
		let settlement = core.get_settlement();
		let settlements = core.get_settlements();
		let out = '';
		let bm = core.get_black_market();
		for (let item in bm) {
			out += '<tr>' +
					'<td>Amount: ' + bm[item].amount + core.ui().resource_small_img(item) + '</td>' +
					'<td>Total price: ' + bm[item].price + core.ui().resource_small_img('coins') + '</td>' +
					'<td>&nbsp;</td>' +
				'</tr>';
		}
		$('#tab-blackmarket > .contents > table > tbody').empty().append(out);
		out = '<table class="normal">' +
					'<thead>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Discount</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
					'</thead>';
		for (let z = 1; z < settlements.length; z++) {
			let settlement = settlements[z];
			if (my_settlement.status()[settlements[z].id()].influence < 20) {
				break;
			}
			let trades = settlements[z].get_trades();
			let resources = settlement.get_resources();
			if (trades !== null) {
				let imports = trades.imports;
				for (let item in imports) {
					let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_DISCOUNT) / 100);
					let discount_price = Math.ceil(civitas.RESOURCES[item].price - discount);
					out += '<tr>' +
							'<td><a href="#" class="settlement-info tips" data-settlement="' + settlements[z].name() + '" title="View info about this settlement.">' + settlements[z].name() + '</a></td>' +
							'<td class="center">' + core.ui().resource_small_img(item) + '</td>' +
							'<td class="center">' + imports[item] + '</td>' +
							'<td class="center">' + civitas.RESOURCES[item].price + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount_price + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' + Math.ceil(discount_price * imports[item]) + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' +
								'<a title="Sell those goods" data-resource="' + item + '" data-settlement="' + settlements[z].name() + '" class="tips sell' + (imports[item] === 0 ? ' disabled' : '') + '" href="#">sell</a>' +
							'</td>' +
						'</tr>';
				}
			}
		}
		out += '<tfoot>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Discount</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$('#tab-export > .contents').empty().append(out);
		out = '<table class="mercenaries">';
		for (let i = 0; i < civitas.MERCENARIES.length; i++) {
			out += '<tr>' +
					'<td class="icon">' +
						'<img src="' + civitas.ASSETS_URL + 'images/assets/emblems/' + civitas.MERCENARIES[i].icon + '.png" />' +
					'</td>' +
					'<td>' +
						'<p class="title">' + civitas.MERCENARIES[i].name + '</p>' +
						'<p class="description">' + civitas.MERCENARIES[i].description + '</p>' +
					'</td>' +
					'<td>' + 
						civitas.utils.nice_numbers(civitas.MERCENARIES[i].cost) + core.ui().resource_small_img('coins') + 
					'</td>' +
					'<td class="medium">' +
						'<a title="View info on this mercenary army" data-id="' + i + '" class="tips view-army" href="#">view</a> ' + core.ui().panel_btn('recruit', 'Recruit this mercenary army', civitas.MERCENARIES[i].handle, 'recruit', core.get_settlement().is_mercenary_recruited(civitas.MERCENARIES[i].handle)) +
					'</td>' +
				'</tr>';
		}
		out += '</table>';
		$('#tab-mercenaries > .contents').empty().append(out);
		out = '<table class="normal">' +
					'<thead>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Tax</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
					'</thead>';
		for (let z = 1; z < settlements.length; z++) {
			let settlement = settlements[z];
			if (my_settlement.status()[settlements[z].id()].influence < 20) {
				break;
			}
			let trades = settlements[z].get_trades();
			let resources = settlement.get_resources();
			if (trades !== null) {
				let exports = trades.exports;
				for (let item in exports) {
					let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_ADDITION) / 100);
					let discount_price = Math.ceil(civitas.RESOURCES[item].price + discount);
					out += '<tr>' +
							'<td>' + settlements[z].name() + '</td>' +
							'<td class="center">' + core.ui().resource_small_img(item) + '</td>' +
							'<td class="center">' + exports[item] + '</td>' +
							'<td class="center">' + civitas.RESOURCES[item].price + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' + discount_price + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' + Math.ceil(discount_price * exports[item]) + core.ui().resource_small_img('coins') + '</td>' +
							'<td class="center">' +
								'<a title="Buy those goods" data-resource="' + item + '" data-settlement="' + settlements[z].name() + '" class="tips buy' + (exports[item] === 0 ? ' disabled' : '') + '" href="#">buy</a>' +
							'</td>' +
						'</tr>';
				}
			}
		}
		out += '<tfoot>' +
					'<tr>' +
						'<td>City</td>' +
						'<td class="center">Goods</td>' +
						'<td class="center">Amount</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Tax</td>' +
						'<td class="center">City Price</td>' +
						'<td class="center">Total price</td>' +
						'<td></td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$('#tab-import > .contents').empty().append(out);
		out = '<table class="normal">' +
					'<thead>' +
					'<tr>' +
						'<td>Resource</td>' +
						'<td class="center">Icon</td>' +
						'<td class="center">Price</td>' +
						'<td class="center tips" title="This is the price you get for selling one unit of the resource to another settlement, minus the <strong>' + civitas.TRADES_DISCOUNT + '%</strong> export taxes.">Sell Price</td>' +
						'<td class="center tips" title="This is the price you get for buying one unit of the resource from another settlement, plus the <strong>' + civitas.TRADES_ADDITION + '%</strong> import taxes.">Buy Price</td>' +
						'<td class="center tips" title="This is the price you get for placing one unit of the resource on the Black Market, minus the <strong>' + civitas.BLACK_MARKET_DISCOUNT + '%</strong> taxes.">BM Price</td>' +
						'<td class="center tips" title="If the resource is listed as produced, that possibility depends on the location and climate of your settlement (ex. tropical settlements can build <strong>Sugar Farms</strong> and produce <strong>Sugar</strong>).">Type</td>' +
					'</tr>' +
					'</thead>';
		for (let item in civitas.RESOURCES) {
			if (!civitas.utils.is_virtual_resource(item)) {
				let discount = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_ADDITION) / 100);
				let tax = Math.ceil((civitas.RESOURCES[item].price * civitas.TRADES_DISCOUNT) / 100);
				let bm_tax = Math.ceil((civitas.RESOURCES[item].price * civitas.BLACK_MARKET_DISCOUNT) / 100);
				out += '<tr>' +
					'<td>' + civitas.RESOURCES[item].name + '</td>' +
					'<td class="center">' + core.ui().resource_small_img(item) + '</td>' +
					'<td class="center">' + civitas.RESOURCES[item].price + core.ui().resource_small_img('coins') + '</td>' +
					'<td class="center">' + (civitas.RESOURCES[item].price - tax) + core.ui().resource_small_img('coins') + '</td>' +
					'<td class="center">' + (civitas.RESOURCES[item].price + discount) + core.ui().resource_small_img('coins') + '</td>' +
					'<td class="center">' + (civitas.RESOURCES[item].price - bm_tax) + core.ui().resource_small_img('coins') + '</td>' +
					'<td class="center">' + ((civitas.RESOURCES[item].imported === true) ? 'imported' : 'produced') + '</td>' +
				'</tr>';
			}
		}
		out += '<tfoot>' +
					'<tr>' +
						'<td>Resource</td>' +
						'<td class="center">Icon</td>' +
						'<td class="center">Price</td>' +
						'<td class="center">Sell Price</td>' +
						'<td class="center">Buy Price</td>' +
						'<td class="center">BM Price</td>' +
						'<td class="center">Type</td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>';
		$('#tab-prices > .contents').empty().append(out);
	}
};
