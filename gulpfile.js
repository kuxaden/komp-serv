const gulp = require('gulp')
const del = require('del')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const size = require('gulp-size')
const newer = require('gulp-newer');
const browsersync = require('browser-sync').create()
const paths = {
    html: {
        src: './*.html',
        dest: './'
    },
    styles: {
        src: ['scss/styles/**/*.sass', 'scss/**/*.scss'],
        dest: 'css/'
    },
    scripts: {
        src: 'scripts/**/*.js',
        dest: 'js/'
    },
    images: {
        src: 'images/**',
        dest: 'img/'
    }
    
}
// Очистка каталога dist;
function clean(){
    return del(['css/*','js/*', '!img', '!css/font-awesome.min.css'])
}
// Сжатие HTML
function html() {
    return gulp.src(paths.html.src)
      .pipe(browsersync.stream())
} 
// Обработка файла стилей;
function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) 
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe (rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream())
}
// обработка скриптов;
function scripts(){
    return gulp.src([
        paths.scripts.src,
        'node_modules/jquery/dist/jquery.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(size())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}
// images-minimaize
function img(){
    return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 85, progressive: true }),
          imagemin.optipng({ optimizationLevel: 7 }),
          imagemin.svgo({
            plugins: [
              { removeViewBox: true },
              { cleanupIDs: false }
            ]
          })
        ]
      ))
    .pipe(size())
    .pipe(gulp.dest(paths.images.dest))
}
// отслеживает изменений
function watch(){
    browsersync.init({
        server: {
            baseDir: "."
        }
    });
    gulp.watch(paths.html.src).on('change', browsersync.reload)
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, img)
}
const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch)
exports.clean = clean
exports.img = img
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build