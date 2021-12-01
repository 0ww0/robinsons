/* File: gulpfile.js */

// Use localhost:8080

'use strict';

var gulp			= require('gulp'),
	browserSync		= require('browser-sync').create(),
	reload			= browserSync.reload,
	del				= require('del'),
	runSequence 	= require('run-sequence'),
	rename			= require('gulp-rename'),
	pug				= require('gulp-pug'),
	prettify		= require('gulp-prettify'),
	sass			= require('gulp-sass'),
	autoprefixer	 = require('gulp-autoprefixer'),
	cssnano 		= require('gulp-cssnano'),
	imagemin 		= require('gulp-imagemin'),
	newer 			= require('gulp-newer'),
	concat			= require('gulp-concat'),

	portDestination = '8080',

	folder = {
		srcAssets: 'src/assets/',
		src: 'src/',
		buildAssets: 'build/assets/',
		build: 'build/'
	};

console.log('Running Task...');

gulp.task('browserSync', function(){
	return browserSync.init({
		server: {
			baseDir: folder.build
		},
		port: portDestination,
	});
});

gulp.task('clean', function() {
	console.log('Deleting build folder.....');
	return del([
		folder.build
	]);
});

gulp.task('html', function(){
	return gulp.src([folder.src + '/templates/**/*.+(pug|html)', '!src/templates/include/**/*.+(pug|html)'])
		.pipe(pug({ defaults: { cache: false }, basedir: folder.buildDest } ))
		.pipe(prettify({
				indent_inner_html: true,
				indent_size: 4,
				unformatted: []
			}))
		.pipe(gulp.dest(folder.build))
		.on("end", browserSync.reload);
});

gulp.task('css', function(){
	return gulp.src(folder.srcAssets + 'scss/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(folder.buildAssets + 'css/'))
		.pipe(cssnano({zindex: false}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(folder.buildAssets + 'css/'))
		.pipe(browserSync.stream());
});

gulp.task('img', function(){
	return gulp.src([folder.srcAssets + 'images/**/*.+(jpg|png|svg|gif)','!'+ folder.srcAssets + 'images/favicon/**/*'])
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 4})
		]))
		.pipe(gulp.dest(folder.buildAssets + 'images/'))
		.on("end", browserSync.reload);
});

gulp.task('img-reload', function(){
	return gulp.src([folder.srcAssets + 'images/**/*.+(jpg|png|svg|gif)', '!'+ folder.srcAssets + 'images/favicon/**/*'])
		.pipe(newer(folder.buildAssets + 'images/'))
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
          	imagemin.optipng({optimizationLevel: 4})
		]))
		.pipe(gulp.dest(folder.buildAssets + 'images/'))
		.on("end", browserSync.reload);
});

gulp.task('favicon', function(){
	gulp.src(folder.srcAssets + 'images/favicon/**/*')
		.pipe(gulp.dest(folder.build))
});

gulp.task('js-include', function(){
	gulp.src([
				folder.srcAssets + 'js/include/components/accordion.js',
				folder.srcAssets + 'js/include/components/attribute.js',
				folder.srcAssets + 'js/include/components/flatpickr.js',
				folder.srcAssets + 'js/include/components/maps.js',
				folder.srcAssets + 'js/include/components/navbar.js',
				folder.srcAssets + 'js/include/components/popup.js',
				folder.srcAssets + 'js/include/components/row-equalizer.js',
				folder.srcAssets + 'js/include/components/slick.js',
				folder.srcAssets + 'js/include/components/store.js',
				folder.srcAssets + 'js/include/components/tabs.js',
				folder.srcAssets + 'js/include/components/validate.js'
			])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(folder.buildAssets + 'js/'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(folder.buildAssets + 'js/'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){
	gulp.src([folder.srcAssets + 'js/**/*.js', '!src/assets/js/include/components/*.js'])
		.pipe(gulp.dest(folder.buildAssets + 'js/'))
});

gulp.task('fonts', function(){
	gulp.src(folder.srcAssets + 'fonts/**/*')
		.pipe(gulp.dest(folder.buildAssets + 'fonts/'))
});

gulp.task('build', function(callback) {
	console.log('Building asset....');
	runSequence('clean', ['img','favicon'],['html', 'css'],['js', 'js-include'], 'fonts', 'browserSync',callback);
});

gulp.task('serve',['build'], function() {
	console.log('Running Localhost:' + portDestination);
	gulp.watch(folder.src + '/**/*.+(pug|html)',['html']);
	gulp.watch(folder.srcAssets + 'scss/**/*.scss',['css']);
	gulp.watch(folder.srcAssets + 'images/**/*.+(jpg|png|svg|gif)',['img-reload']);
	gulp.watch(folder.srcAssets + 'js/**/*.js',['js-include']);
	gulp.watch(folder.srcAssets + 'js/**/*.js',['js']);
});
