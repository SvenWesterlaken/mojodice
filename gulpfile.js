var gulp        = require('gulp'),
    pug         = require('gulp-pug'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    clean       = require('gulp-clean-css'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    autoClose   = require('browser-sync-close-hook'),
    reload      = browserSync.reload;


var messages = {
  pug: '<span style="color: white">Pug files updated</span>',
  js: '<span style="color: white">Javascript injected</span>'
};


gulp.task('browser-sync', ['sass', 'js', 'pug'], function(){
  browserSync.use({
    plugin() {},
    hooks: {
      'client:js': autoClose,
    },
  });
  browserSync.init({
    proxy: "localhost/mojodice/",
    port: 8000,
    browser: "chrome",
    notify: 'false'
  });
});

gulp.task('sass', function() {
  return gulp.src('resources/assets/css/scss/0-src/*.scss')
        .pipe(sass({
          onError: browserSync.notify
        }).on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(clean())
        .pipe(gulp.dest('resources/assets/css/min'))
        .pipe(reload({stream:true}));
});

gulp.task('pug-templates', function(){
  return gulp.src('resources/pug/templates/*.pug')
  .pipe(pug())
  .pipe(rename({extname: '.twig'}))
  .pipe(gulp.dest('resources/twig/templates'));
});

gulp.task('pug-content', function(){
  return gulp.src('resources/pug/pages/*.pug')
        .pipe(pug())
        .pipe(rename({extname: '.twig'}))
        .pipe(gulp.dest('resources/twig/pages'));
});

gulp.task('pug-partials', function(){
  return gulp.src('resources/pug/partials/*.pug')
        .pipe(pug())
        .pipe(rename({extname: '.twig'}))
        .pipe(gulp.dest('resources/twig/partials'));
});

gulp.task('pug', ['pug-templates', 'pug-content', 'pug-partials'], function() {
  browserSync.notify(messages.pug);
});

gulp.task('js', function() {
  return gulp.src('resources/assets/js/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('resources/assets/js/src'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('resources/assets/js'))
        .pipe(browserSync.reload({stream:true}));
  browserSync.notify(messages.js);
});

gulp.task('watch', function() {
  gulp.watch('resources/assets/js/src/*.js', ['js']);
  gulp.watch('resources/assets/css/**', ['sass']);
  gulp.watch(['resources/twig/**/*.twig', 'app/**/*.php'], reload);
  gulp.watch('resources/pug/**/*.pug', ['pug']);
});

gulp.task('default', ['browser-sync', 'watch']);
