/**
 * Options window data.
 *
 * @type {Object}
 */
civitas.WINDOW_ERROR = {
	id: 'error',
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
	on_show: function() {
		let self = this;
		let core = this.core();
		let handle = this.handle();
		$(handle + ' .error-message').html('Message: ' + this.params_data.error);
		$(handle + ' .error-code').html('Code: ' + this.params_data.code);
		$(handle).on('click', '.do-restart', function () {
			core.open_modal(
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
	on_hide: function() {
		civitas.ui.hide_loader();
	}
};
