/**
 * Options window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_ERROR = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '' +
		'<section id="window-{ID}" class="window">' +
			'<div class="logo">Civitas</div>' +
			'<fieldset>' +
				'An error has occured in Civitas and the game is unable to resume.' +
				'<br /><br />' +
				'<span class="error-message"></span>' +
				'<br />' +
				'<span class="error-code"></span>' +
				'<br /><br />' +
				'<a href="#" class="do-restart button">Restart</a>' +
			'</fieldset>' +
		'</section>',

	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'error',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function() {
		let self = this;
		let core = this.core();
		let handle = this.handle();
		$(handle + ' .error-message').html('Message: ' + this.params_data.error);
		$(handle + ' .error-code').html('Code: ' + this.params_data.code);
		$(handle).on('click', '.do-restart', function () {
			core.ui().open_modal(
				function(button) {
					if (button === 'yes') {
						core.reset_storage_data();
						document.location.reload();
					}
				},
				'Are you sure you want to restart the game? You will lose all progress on the current game!',
				'Civitas'
			);
			return false;
		});
	},

	/**
	 * Callback function for hiding the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_hide: function() {
		this.core().ui().hide_loader();
	}
};
