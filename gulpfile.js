const gulp = require('gulp');
const sass = require('gulp-sass');
const minifycss = require('gulp-uglifycss');
const autoprefixer = require('gulp-autoprefixer');
const mmq = require('gulp-merge-media-queries');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const sort = require('gulp-sort');
const cache = require('gulp-cache');
const remember = require('gulp-remember');
const plumber = require('gulp-plumber');
const beep = require('beepbeep');
const pkg = require('./package.json');
const imagemin = require('gulp-imagemin');
const header = require('gulp-header');
const fs = require('fs');
const jsdoc = require('gulp-jsdoc3');
const replace = require('gulp-replace');
const jsdoc_config = require('./jsdoc');

const BROWSERS_LIST = [
	'last 2 versions',
	'> 0.5%',
	'ie >= 11'
];

const errorHandler = r => {
	notify.onError('\n\n----- ERROR: <%= error.message %> -----\n')(r);
	beep();
};

const browsersync = done => {
	browserSync.init({
		proxy: 'http://civitas.test',
		open: true,
		injectChanges: true,
		watchEvents: [
			'change',
			'add',
			'unlink',
			'addDir',
			'unlinkDir'
		]
	});
	done();
};

const reload = done => {
	browserSync.reload();
	done();
};

gulp.task('css', () => {
	return gulp
		.src('./src/scss/app.scss', {
			allowEmpty: true
		})
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'expanded',
				precision: 10
			})
		)
		.on('error', sass.logError)
		.pipe(sourcemaps.write({
			includeContent: false
		}))
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(autoprefixer(BROWSERS_LIST))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/'))
		.pipe(filter('**/*.css'))
		.pipe(mmq({
			log: true
		}))
		.pipe(browserSync.stream())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss({
			maxLineLen: 10
		}))
		.pipe(header(fs.readFileSync('HEADER', 'utf8'), {
			pkg
		}))
		.pipe(replace('__VERSION_NUMBER__', pkg.version + '.' + ((new Date()).getMonth() + 1) + '' + (new Date()).getDate() + '' + (new Date()).getFullYear()))
		.pipe(gulp.dest('./dist/'))
		.pipe(filter('**/*.css'))
		.pipe(browserSync.stream())
		.pipe(notify({
			message: '\n\n----- CSS compiled -----\n',
			onLast: true
		}));
});

gulp.task('lib', () => {
	return gulp
		.src([
			'vendor/js/jquery.js',
			'vendor/js/jquery.ui.js',
			'vendor/js/jquery.scrollto.js',
			'vendor/js/jquery.tipsy.js',
			'vendor/js/crypto.js',
			'vendor/js/pmprng.js',
			'vendor/js/simplexnoise.js',
		], {
			since: gulp.lastRun('lib')
		})
		.pipe(plumber(errorHandler))
		.pipe(
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								browsers: BROWSERS_LIST
							}
						}
					]
				]
			})
		)
		.pipe(remember('./vendor/js/**/*.js'))
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(
			rename({
				basename: 'lib',
				suffix: '.min'
			})
		)
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'))
		.pipe(notify({
			message: '\n\n----- External libraries compiled -----\n',
			onLast: true
		}));
});

gulp.task('app', () => {
	return gulp
		.src([
			'src/js/others/functions.js',
			'src/js/bootstrap.js',
			'src/js/objects/**/*.js',
			'src/js/constants/**/*.js',
			'src/js/definitions/**/*.js'
		], {
			since: gulp.lastRun('app')
		})
		.pipe(plumber(errorHandler))
		.pipe(
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								browsers: BROWSERS_LIST
							}
						}
					]
				]
			})
		)
		.pipe(remember('./src/js/**/*.js'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(
			rename({
				basename: 'app',
				suffix: '.min'
			})
		)
		.pipe(uglify())
		.pipe(header(fs.readFileSync('HEADER', 'utf8'), {
			pkg
		}))
		.pipe(replace('__VERSION_NUMBER__', pkg.version + '.' + ((new Date()).getMonth() + 1) + '' + (new Date()).getDate() + '' + (new Date()).getFullYear()))
		.pipe(gulp.dest('./dist/'))
		.pipe(notify({
			message: '\n\n----- Application libraries compiled -----\n',
			onLast: true
		}));
});

gulp.task('images', () => {
	return gulp
		.src('./images/**/*')
		.pipe(
			cache(
				imagemin([
					imagemin.gifsicle({
						interlaced: true
						}),
					imagemin.jpegtran({
						progressive: true
						}),
					imagemin.optipng({
						optimizationLevel: 3
					}),
					imagemin.svgo({
						plugins: [{
							removeViewBox: true
						}, {
							cleanupIDs: false
						}]
					})
				])
			)
		)
		.pipe(gulp.dest('./dist/images/'))
		.pipe(notify({
			message: '\n\n----- Images compressed -----\n',
			onLast: true
		}));
});

gulp.task('doc', () => {
	return gulp
		.src([
			'README.md',
			'./src/**/*.js'
		], {
			read: false
		})
		.pipe(jsdoc(jsdoc_config))
		.pipe(notify({
				message: '\n\n----- Documentation generated -----\n',
				onLast: true
		}));
});

gulp.task('default',
	gulp.parallel('css', 'lib', 'app', 'doc', browsersync, () => {
		gulp.watch('./src/scss/**/*.scss', gulp.parallel('css'));
		gulp.watch('./vendor/js/**/*.js', gulp.series('lib', reload));
		gulp.watch('./src/js/**/*.js', gulp.series('app', reload));
	})
);
