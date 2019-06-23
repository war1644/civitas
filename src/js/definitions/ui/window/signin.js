/**
 * Login window data.
 *
 * @type {Object}
 */
civitas.WINDOW_SIGNIN = {
	id: 'signin',
	template: '' +
		'<section id="window-{ID}" class="window">' +
			'<div class="logo">Civitas</div>' +
			'<fieldset>' +
				'<div class="new-game">' +
					'<p>Enter the city password to decrypt the game data.</p>' +
					'<dl>' +
						'<dt class="clearfix">Password:</dt>' +
						'<dd><input type="password" class="password text-input" /></dd>' +
					'</dl>' +
					'<a href="#" class="do-start highlight button">Load Game</a>' +
				'</div>' +
				'<a href="#" class="do-restart button">Restart</a>' +
				civitas.ui.window_about_section() +
			'</fieldset>' +
		'</section>',
	on_show: function() {
		let self = this;
		let handle = this.handle();
		let core = this.core();
		$(handle).on('click', '.do-start', function () {
			let password = $(handle + ' .password').val();
			if (password === '') {
				core.error('Enter your city password.', 'Error', true);
				return false;
			}
			if (!core.load_game_data(password)) {
				$(handle + ' .password').val('');
				core.error('Error decrypting the game data with the specified password. Try again.', 'Error', true);
			} else {
				self.destroy();
			}
			return false;
		}).on('click', '.do-restart', function () {
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
		}).on('click', '.do-about', function () {
			$(handle + ' .about-game').slideToggle();
			return false;
		});
	},
	on_hide: function() {
		civitas.ui.hide_loader();
	}
};
