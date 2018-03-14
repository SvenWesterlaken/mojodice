var gulp        = require('gulp'),
    pug         = require('gulp-pug'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    clean       = require('gulp-clean-css'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    babel       = require('gulp-babel'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    autoClose   = require('browser-sync-close-hook'),
    reload      = browserSync.reload;

gulp.task('browser-sync', ['sass', 'js', 'pug'], function(){
  browserSync.use({
    plugin: function() {},
    hooks: {
      'client:js': '(function (bs) {bs.socket.on("disconnect", function (client) { window.close(); });})(___browserSync___);'
    }
  });
  browserSync.init({
    proxy: "localhost/mojodice/",
    port: 8000,
    browser: "chrome"
  });
});

gulp.task('sass', function() {
  return gulp
    .src('resources/assets/css/main.scss')
    .pipe(sass({
      onError: browserSync.notify
    }).on('error', sass.logError))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(clean({keepSpecialComments: 0}))
    .pipe(gulp.dest('resources/assets/css'))
    .pipe(reload({stream:true}));
});

gulp.task('pug-templates', function(){
  return gulp
    .src('resources/pug/templates/*.pug')
    .pipe(pug())
    .pipe(rename({extname: '.twig'}))
    .pipe(gulp.dest('resources/twig/templates'));
});

gulp.task('pug-content', function(){
  return gulp
    .src('resources/pug/pages/*.pug')
    .pipe(pug())
    .pipe(rename({extname: '.twig'}))
    .pipe(gulp.dest('resources/twig/pages'));
});

gulp.task('pug-partials', function(){
  return gulp
    .src('resources/pug/partials/*.pug')
    .pipe(pug())
    .pipe(rename({extname: '.twig'}))
    .pipe(gulp.dest('resources/twig/partials'));
});

gulp.task('pug', ['pug-templates', 'pug-content', 'pug-partials']);

gulp.task('custom-js', function() {
  return gulp.src('resources/assets/js/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('resources/assets/js'));

});

gulp.task('js', ['custom-js'], function() {
  return gulp
    .src([
      'resources/assets/bower/jquery/dist/jquery.js',
      'resources/assets/bower/jquery-ui/jquery-ui.js',
      'resources/assets/bower/particles.js/particles.js',
      'resources/assets/bower/mojs/build/mo.min.js',
      'resources/assets/bower/shufflejs/dist/shuffle.js',
      'resources/assets/js/all.js'
    ])
    .pipe(concat('common.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('resources/assets/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
  gulp.watch('resources/assets/js/src/*.js', ['js']);
  gulp.watch(['resources/assets/css/custom.scss', 'resources/assets/css/**/*.sass'], ['sass']);
  gulp.watch(['resources/twig/**/*.twig', 'app/**/*.php'], reload);
  gulp.watch('resources/pug/**/*.pug', ['pug']);
});

gulp.task('default', ['browser-sync', 'watch']);
