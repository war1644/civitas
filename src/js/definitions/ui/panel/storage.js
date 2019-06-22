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
		var self = this;
		var core = this.core();
		var settlement = core.get_settlement();
		var storage_space = settlement.storage();
		var resources = settlement.get_resources();
		var section;
		$(this.handle + ' section').append(civitas.ui.tabs(civitas.RESOURCE_CATEGORIES));
		$(this.handle + ' section').append('<p>Total storage space: <span class="total-storage">' + storage_space.all + '</span>, used: <span class="used-storage">' + storage_space.occupied + '</span></p>');
		for (var i = 0; i < civitas.RESOURCE_CATEGORIES.length; i++) {
			section = civitas.RESOURCE_CATEGORIES[i];
			$(this.handle + ' #tab-' + section).append('<div class="storage-board"></div>');
		}
		for (var resource in resources) {
			if (!civitas.utils.is_virtual_resource(resource)) {
				section = civitas.RESOURCES[resource].category;
				$(this.handle + ' #tab-' + section + ' .storage-board').append(civitas.ui.resource_storage_el(resource, resources[resource]));
			}
		}
	},
	on_refresh: function() {
		var settlement = this.core().get_settlement();
		var resources = settlement.get_resources();
		var section;
		var storage_space = settlement.storage();
		for (var resource in resources) {
			if (!civitas.utils.is_virtual_resource(resource)) {
				section = civitas.RESOURCES[resource].category;
				$(this.handle + ' #tab-' + section + ' .storage-board > .storage-item[data-resource="' + resource + '"] > .amount').empty().html(resources[resource]);
			}
		}
		$(this.handle + ' .total-storage').empty().append(storage_space.all);
		$(this.handle + ' .used-storage').empty().append(storage_space.occupied);
	}
};
