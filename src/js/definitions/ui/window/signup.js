/**
 * Sign Up window data.
 *
 * @type {Object}
 * @mixin
 */
civitas.WINDOW_SIGNUP = {
	/**
	 * Template of the window.
	 *
	 * @type {String}
	 */
	template: '' +
		'<section id="window-{ID}" class="window">' +
			'<div class="logo">Civitas</div>' +
			'<fieldset>' +
				'<div class="new-game">' +
					'<p>Choose your city details well, climate changes and game difficulty affects your building options and resources.</p>' +
					'<dl>' +
						'<dt class="clearfix">Your Name:</dt>' +
						'<dd><input type="text" maxlength="12" title="Maximum of 12 characters." class="tips name text-input" /></dd>' +
						((civitas.ENCRYPTION === true) ?
						'<dt class="clearfix">Password:</dt>' +
						'<dd><input type="password" class="password text-input" /></dd>' +
						'<dt class="clearfix">Confirm Password:</dt>' +
						'<dd><input type="password" class="password2 text-input" /></dd>'
						: '') +
						'<div class="hr"></div>' +
						'<dt class="clearfix">City Name:</dt>' +
						'<dd><input type="text" maxlength="12" title="Maximum of 12 characters." class="tips cityname text-input" /></dd>' +
						'<dt class="clearfix">Nationality:</dt>' +
						'<dd>' +
							'<select class="nation text-input"></select>' +
						'</dd>' +
						'<dt class="clearfix">Climate:</dt>' +
						'<dd>' +
							'<select class="climate text-input"></select>' +
						'</dd>' +
						'<dt class="clearfix">Difficulty:</dt>' +
						'<dd>' +
							'<select class="difficulty text-input">' +
								'<option value="1">Easy</option>' +
								'<option value="2">Medium</option>' +
								'<option value="3">Hard</option>' +
								'<option value="4">Hardcore</option>' +
							'</select>' +
						'</dd>' +
						'<div class="avatar-select"></div>' +
					'</dl>' +
					'<a href="#" class="do-start highlight button">Start Playing</a>' +
				'</div>' +
				civitas.ui.window_about_section() +
			'</fieldset>' +
		'</section>',

	/**
	 * Internal id of the window.
	 *
	 * @type {String}
	 * @constant
	 * @default
	 */
	id: 'signup',

	/**
	 * Callback function for showing the window.
	 *
	 * @type {Function}
	 * @public
	 */
	on_show: function() {
		let self = this;
		let avatar = 1;
		let password = '';
		let password2 = '';
		let core = this.core();
		let handle = this.handle();
		for (let i = 1; i < civitas.CLIMATES.length; i++) {
			$(handle + ' .climate').append('<option value="' + civitas['CLIMATE_' + civitas.CLIMATES[i].toUpperCase()] + '">' + civitas.CLIMATES[i].capitalize() + '</option>');
		}
		for (let i = 1; i < civitas.NATIONS.length; i++) {
			$(handle + ' .nation').append('<option value="' + civitas['NATION_' + civitas.NATIONS[i].toUpperCase()] + '">' + civitas.NATIONS[i].capitalize() + '</option>');
		}
		for (let i = 1; i <= civitas.AVATARS; i++) {
			$(handle + ' .avatar-select').append('<img class="avatar' + (i === avatar ? ' selected' : '') + '" data-avatar="' + i + '" src="' + civitas.ASSETS_URL + 'images/assets/avatars/avatar' + i + '.png" />');
		}
		$(handle).on('click', '.do-start', function () {
			if (civitas.ENCRYPTION === true) {
				password = $(handle + ' .password').val();
				password2 = $(handle + ' .password2').val();
			}
			let name = $(handle + ' .name').val();
			let cityname = $(handle + ' .cityname').val();
			let nation = parseInt($(handle + ' .nation').val());
			let climate = parseInt($(handle + ' .climate').val());
			let difficulty = parseInt($(handle + ' .difficulty').val());
			if (name.length > 12) {
				name = name.substring(0, 12);
			}
			if (cityname.length > 12) {
				cityname = cityname.substring(0, 12);
			}
			if (name === '') {
				core.error('Enter your ruler name, for example <strong>Ramses</strong>.', 'Error', true);
				return false;
			}
			if (cityname === '') {
				core.error('Enter your city name, for example <strong>Alexandria</strong>.', 'Error', true);
				return false;
			}
			if (civitas.ENCRYPTION === true) {
				if (password === '') {
					core.error('Enter a strong password for your city.', 'Error', true);
					return false;
				}
				if (password !== password2) {
					core.error('Your passwords do not match.', 'Error', true);
					return false;
				}
			}
			core.new_game(name, cityname, nation, climate, avatar, difficulty, password);
			self.destroy();
			return false;
		}).on('click', '.avatar', function () {
			$(handle + ' img.avatar').removeClass('selected');
			$(this).addClass('selected');
			let new_avatar = parseInt($(this).data('avatar'));
			if (new_avatar >= 1 && new_avatar <= civitas.AVATARS) {
				avatar = new_avatar;
			}
			return false;
		}).on('click', '.do-about', function () {
			$(handle + ' .about-game').slideToggle();
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
		civitas.ui.hide_loader();
	}
};
