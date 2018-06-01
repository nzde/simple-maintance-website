var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var minifyJS = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();


// Logs Message
gulp.task('message', function(){
    return console.log('Gulp is running...');
});
  
// Copy All HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Compile Scss => CSS prefixes => minify
gulp.task('sass', function(){
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true,
            grid: true,
            flexbox: true,

        }))
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// JS concat and minify
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('dist/js'));
});

// Optimize Images
gulp.task('imageMin', function(){
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// ## Watch and browsersync ## 
gulp.task('default', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('src/scss/*.scss', ['sass']);
    //gulp.watch('dist/css/*.css').on('change', browserSync.reload); //
    gulp.watch('src/*.html', ['copyHtml']).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', ['scripts']).on('change', browserSync.reload);
    gulp.watch('src/img/*', ['imageMin']).on('change', browserSync.reload);  
});

//Just watch files
gulp.task('watch', function(){
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/img/*', ['imageMin']);    
});

//Rebuild dist folder
gulp.task('rebuild', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);