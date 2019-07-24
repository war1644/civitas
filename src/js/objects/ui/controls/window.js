/**
 * Main Game window object.
 * 
 * @param {Object} params
 * @license GPL-3.0-or-later
 * @class ui_window
 * @returns {ui_window}
 */
class ui_window {

	/**
	 * Object destructor.
	 * 
	 * @private
	 * @returns {Boolean}
	 */
	destructor () {
		this.core().ui().log('ui', 'Destroying window with id `' + this.id + '`');
		$(this.handle).remove();
		$('.tipsy').remove();
		this.on_hide.call(this);
		return false;
	}

	/**
	 * Method for destroying the window.
	 * 
	 * @public
	 * @returns {Boolean}
	 */
	destroy () {
		return this.destructor();
	}

	/**
	 * Object constructor.
	 * 
	 * @private
	 * @constructor
	 * @returns {ui_window}
	 * @param {Object} params
	 */
	constructor (params) {
		this._core = params.core;
		this.id = params.id;
		this.handle = '#window-' + this.id;
		this.params_data = params.data;
		this.template = typeof params.template !== 'undefined' ? params.template : '';
		if (params.on_create instanceof Function) {
			this.on_create = params.on_create;
		} else {
			this.on_create = function() {};
		}
		if (params.on_show instanceof Function) {
			this.on_show = params.on_show;
		} else {
			this.on_show = function() {};
		}
		if (params.on_hide instanceof Function) {
			this.on_hide = params.on_hide;
		} else {
			this.on_hide = function() {};
		}
		if (this.core().ui().window_exists(this.handle)) {
			this.destroy();
		}
		this.core().ui().log('ui', 'Creating window with id `' + this.id + '`');
		this.on_create.call(this, params);
		$('body').append(this.template.replace(/{ID}/g, this.id));
		this.on_show.call(this);
		$('.tipsy').remove();
		$('.tips').tipsy({
			gravity: $.fn.tipsy.autoNS,
			html: true
		});
		return this;
	}

	/**
	 * Return a pointer to the game core.
	 *
	 * @public
	 * @returns {game}
	 */
	core () {
		return this._core;
	}
}
