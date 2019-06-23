/**
 * Storage panel data.
 *
 * @type {Object}
 */
civitas.PANEL_STORAGE = {
	template: civitas.ui.generic_panel_template('City Storage'),
	expanded: false,
	id: 'storage',
	on_show: function(params) {
		let self = this;
		let core = this.core();
		let settlement = core.get_settlement();
		let storage_space = settlement.storage();
		let resources = settlement.get_resources();
		$(this.handle + ' section').append(civitas.ui.tabs(civitas.RESOURCE_CATEGORIES));
		$(this.handle + ' section').append('<p>Total storage space: <span class="total-storage">' + storage_space.all + '</span>, used: <span class="used-storage">' + storage_space.occupied + '</span></p>');
		for (let i = 0; i < civitas.RESOURCE_CATEGORIES.length; i++) {
			$(this.handle + ' #tab-' + civitas.RESOURCE_CATEGORIES[i]).append('<div class="storage-board"></div>');
		}
		for (let resource in resources) {
			if (!civitas.utils.is_virtual_resource(resource)) {
				$(this.handle + ' #tab-' + civitas.RESOURCES[resource].category + ' .storage-board').append(civitas.ui.resource_storage_el(resource, resources[resource]));
			}
		}
	},
	on_refresh: function() {
		let settlement = this.core().get_settlement();
		let resources = settlement.get_resources();
		let section;
		let storage_space = settlement.storage();
		for (let resource in resources) {
			if (!civitas.utils.is_virtual_resource(resource)) {
				section = civitas.RESOURCES[resource].category;
				$(this.handle + ' #tab-' + section + ' .storage-board > .storage-item[data-resource="' + resource + '"] > .amount').empty().html(resources[resource]);
			}
		}
		$(this.handle + ' .total-storage').empty().append(storage_space.all);
		$(this.handle + ' .used-storage').empty().append(storage_space.occupied);
	}
};
