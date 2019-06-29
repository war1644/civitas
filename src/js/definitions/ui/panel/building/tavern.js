/**
 * Tavern panel data.
 *
 * @type {Object}
 * @mixin
 */
civitas.PANEL_TAVERN = {

	/**
	 * Internal id of the panel.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'tavern',

	/**
	 * Callback function for creating the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = this.core().ui().building_panel_template();
	},

	/**
	 * Callback function for showing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function(params) {
		let self = this;
		let core = self.core();
		let _t = '';
		$(this.handle + ' section').append(core.ui().tabs([
			'Info',
			'Heroes',
			'Items'
		]));
		let building = core.get_settlement().get_building(self.params_data.handle);
		if (building) {
			$(self.handle + ' #tab-items').empty().append('Not implemented yet.');
			$(self.handle + ' #tab-heroes').empty().append(
				'<div class="column hero-list"></div>' +
				'<div class="column hero-info"></div>' +
				'<div class="column hero-items"></div>'
			);
			$(self.handle + ' #tab-info').empty().append(core.ui().building_panel(self.params_data, building.get_level()));
			self.empty_items = function() {
				$(self.handle + ' .hero-items').empty().append('<h3>Equipment</h3>');
				for (let i = 1; i < civitas.ITEM_SLOTS_NUM; i++) {
					$(self.handle + ' .hero-items').append('<div class="slot" data-slot="' + i + '"></div>');
				}
				$(self.handle + ' .hero-items').append('<br class="clearfix" />').append('<h3>Bags</h3>');
				for (let i = 0; i < civitas.ITEM_BACKPACK_NUM; i++) {
					$(self.handle + ' .hero-items').append('<div class="slot" data-backpack-slot="' + i + '"></div>');
				}
			}
			self.empty_items();
			for (let item in civitas.HEROES) {
				_t += '<p><a href="#" data-hero="' + item + '">' + civitas.HEROES[item].name + '</a></p>';
			}
			$(self.handle + ' .hero-list').empty().append(_t);
			$(self.handle).on('click', '.hero-list a', function() {
				let hero_id = parseInt($(this).data('hero'));
				let hero_data = civitas.HEROES[hero_id];
				if (hero_data) {
					$(self.handle + ' .hero-info').empty().append(
						'<h3>Info <a title="Information provided by Wikipedia." href="' + hero_data.link + '" class="tips external-link wikipedia"></a></h3>' +
						hero_data.description + 
						'<br /><br />' +
						'<h3>Class</h3>' +
						civitas.HERO_CLASS_LIST[hero_data.class] + '' +
						'<br /><br />' +
						'<h3>Attributes</h3>' +
						'Strength: <span class="green">' + hero_data.stats.strength + '</span><br />' +
						'Stamina: <span class="green">' + hero_data.stats.stamina + '</span><br />' +
						'Agility: <span class="green">' + hero_data.stats.agility + '</span><br />' +
						'Intellect: <span class="green">' + hero_data.stats.intellect + '</span><br />' +
						'Spirit: <span class="green">' + hero_data.stats.spirit + '</span><br />' +
						'Health Points: <span class="blue">' + civitas.utils.get_health_points(hero_data) + '</span><br />' +
						'Mana Points: <span class="blue">' + civitas.utils.get_mana_points(hero_data) + '</span><br />' +
						'Damage: <span class="red">' + civitas.utils.get_damage_points(hero_data).min + '-' + civitas.utils.get_damage_points(hero_data).max + '</span>'
					);
					self.empty_items();
					for (let x = 0; x < hero_data.items.length; x++) {
						let slot = hero_data.items[x].slot;
						$(self.handle + ' .hero-items > div.slot[data-slot="' + slot + '"]')
							.empty()
							.append('X')
							.attr('title', core.ui().item_tooltip(hero_data.items[x]))
							.tipsy({
								className: 'item',
								html: true
							});
					}
					for (let x = 0; x < hero_data.backpack.length; x++) {
						$(self.handle + ' .hero-items > div.slot[data-backpack-slot="' + x + '"]')
							.empty()
							.append('X')
							.attr('title', core.ui().item_tooltip(hero_data.backpack[x]))
							.tipsy({
								className: 'item',
								html: true
							});
					}
				}
				return false;
			});
		} else {
			self.destroy();
		}
	},
	
	/**
	 * Callback function for refreshing the panel.
	 *
	 * @type {Function}
	 * @public
	 */
	on_refresh: function() {
		// TODO
	}
};
