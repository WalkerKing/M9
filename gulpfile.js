const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const DEST = 'dist';
gulp.task('build', () => {
    return gulp
        .src([
            'src/util.js'
        ])
        .pipe(babel())
        .pipe(rename('walker-util.js'))
        .pipe(gulp.dest(DEST))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(DEST))
});

