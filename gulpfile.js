const gulp = require('gulp');
const less = require('gulp-less');
const notify = require('gulp-notify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('less', () => {
    let stream = gulp
        .src('./less/style.less')
        .pipe(less().on('error', notify.onError(function (error) {
            return 'Error compiling LESS: ' + error.message;
        })));

    stream.pipe(gulp.dest('./public/')).pipe(notify({message: 'Successfully compiled LESS'}));
    return stream
});

gulp.task('account-ui-js', () => {
	gulp.src('./account-ui/app.jsx')
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(gulp.dest('./public/'));
});

gulp.task('default', () => {
    gulp.start('less', 'account-ui-js');
});
