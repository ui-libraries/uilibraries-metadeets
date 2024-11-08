const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const dependents = require('gulp-dependents');
// const size = require('gulp-size');
const browsersync = require('browser-sync').create();
const terser = require('gulp-terser');

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

function scriptsTask(){
  const scriptsSource = './src/js/*.js';
  const scriptsDest1 = './dist/js/';

  return src(scriptsSource, { sourcemaps: true })
    .pipe(terser())
    .pipe(dest(scriptsDest1, { sourcemaps: '.' }));
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
  watch(['./src/js/*.js', './src/js/*.js'], series(stylesTask, scriptsTask, browsersyncReload))
}

exports.default = series(
  stylesTask, 
  scriptsTask,
  browsersyncServe, 
  watchTask
);