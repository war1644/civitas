/**
 * Options window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_OPTIONS = {

	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'options',
	
	/**
	 * Callback function for creating the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_create: function(params) {
		this.template = '<section id="window-{ID}" class="window">' +
							'<div class="logo">Civitas</div>' +
							'<fieldset>' +
								'<a href="#" class="do-pause button">Pause</a>' +
								'<a href="#" class="do-restart button">Restart</a>' +
								'<a href="#" class="do-options button">Options</a>' +
								'<div class="options-game"></div>' +
								this.core().ui().window_about_section() +
								'<br />' +
								'<a href="#" class="do-resume button">Resume Playing</a>' +
							'</fieldset>' +
						'</section>';
	},

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function() {
		let _game_data = null;
		let self = this;
		let handle = this.handle();
		let core = this.core();
		$(handle + ' .options-game').append(core.ui().tabs([
			'Sounds',
			'UI',
			'Gameplay'
		]));
		$(handle + ' #tab-sounds').append('<div>' +
			'<a href="#" class="music-control ui-control ' + ((core.get_settings('music') === true) ? 'on' : 'off') + '">music</a>' +
			'<input class="music-volume" type="range" min="0" max="1" step="0.1" ' + ((core.get_settings('music') !== true) ? 'disabled' : '') + ' />' +
			'</div>');
		$(handle + ' #tab-ui').append('<div>' +
			'<a href="#" class="worldmap-grid-control ui-control ' + ((core.get_settings('worldmap_grid') === true) ? 'on' : 'off') + '">worldmap grid</a> ' +
			'<a href="#" class="worldmap-beautify-control ui-control ' + ((core.get_settings('worldmap_beautify') === true) ? 'on' : 'off') + '">worldmap beautify</a>' +
			'</div>');
		$(handle + ' .tabs').tabs();
		$(handle).on('click', '.do-resume', function () {
			core.ui().hide_loader();
			core.unpause();
			self.destroy();
			return false;
		}).on('click', '.do-pause', function () {
			if (core.is_paused() === true) {
				$(this).removeClass('highlight').html('Pause');
				core.ui().show_loader();
				core.unpause();
			} else {
				$(this).addClass('highlight').html('Resume');
				core.ui().hide_loader();
				core.pause();
			}
			return false;
		}).on('click', '.do-options', function () {
			$(handle + ' .options-game').slideToggle();
			return false;
		}).on('click', '.do-about', function () {
			$(handle + ' .about-game').slideToggle();
			return false;
		}).on('click', '.do-restart', function () {
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
		}).on('click', '.music-control', function () {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').addClass('off');
				$('.music-volume').attr('disabled', true);
				core.set_settings('music', false);
			} else {
				$(this).removeClass('off').addClass('on');
				$('.music-volume').attr('disabled', false);
				core.set_settings('music', true);
			}
			core.save();
			return false;
		}).on('click', '.worldmap-grid-control', function () {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').addClass('off');
				core.set_settings('worldmap_grid', false);
			} else {
				$(this).removeClass('off').addClass('on');
				core.set_settings('worldmap_grid', true);
			}
			core.save();
			return false;
		}).on('click', '.worldmap-beautify-control', function () {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').addClass('off');
				core.set_settings('worldmap_beautify', false);
			} else {
				$(this).removeClass('off').addClass('on');
				core.set_settings('worldmap_beautify', true);
			}
			core.save();
			return false;
		}).on('change', '.music-volume', function () {
			let value = parseInt($(this).val());
			core.music.volume = value;
			core.save();
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
