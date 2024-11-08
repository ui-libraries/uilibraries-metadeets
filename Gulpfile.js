const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const dependents = require('gulp-dependents');
// const size = require('gulp-size');
const browsersync = require('browser-sync').create();

function stylesTask() {
  const stylesSource = './src/sass/**/*.scss';
  const stylesDest1 = './dist/css/';
  // const stylesDest2 = '/Volumes/htdocs/events/css';

  // const sizefull = size({ showFiles: true, uncompressed: true });
  // const sizegzip = size({ showFiles: true, gzip: true });

  return src(stylesSource)
    .pipe(cache('sasscache'))
    .pipe(dependents())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoPrefixer({ grid: false }))
    .pipe(cleanCSS({ format: 'compress' }))
    // .pipe(sizefull)
    // .pipe(sizegzip)
    .pipe(sourcemaps.write())
    .pipe(dest(stylesDest1));
    // .pipe(dest(stylesDest2));
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: 'dist/'
    }    
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch('./dist/*.html', browsersyncReload);
  watch(['./src/sass/**/*.scss'], series(stylesTask, browsersyncReload))
}

exports.default = series(
  stylesTask, 
  browsersyncServe, 
  watchTask
);