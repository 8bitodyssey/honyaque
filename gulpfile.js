var gulp = require('gulp');
var runSequence = require('run-sequence');
var $    = require('gulp-load-plugins')();
var pkg  = require('./package.json');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// javascript
gulp.task('js', function() {
  return gulp.src('js/honyaque.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.notify(function (file) {
      if (file.jshint.success) {
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }))
    .pipe(gulp.dest('js'))
});

// compass(sass)
gulp.task('compass-dev', function() {
  return gulp.src('sass/*.scss')
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>")
    }))
    .pipe($.compass({
      import_path: sassPaths,
      sass:      'sass',
      css:       'css',
      image:     'images',
      style:     'expanded',
      relative:  true,
      sourcemap: true,
      comments:  true
    }))
    .pipe($.replace(/<%= pkg.version %>/g, pkg.version))
    .pipe(gulp.dest('css'))
});
gulp.task('compass-dist', function() {
  return gulp.src('sass/*.scss')
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>")
    }))
    .pipe($.compass({
      import_path: sassPaths,
      sass:      'sass',
      css:       './',
      image:     'images',
      style:     'expanded',
      relative:  true,
      sourcemap: false,
      comments:  false
    }))
    .pipe($.replace(/<%= pkg.version %>/g, pkg.version))
    .pipe(gulp.dest('./'))
});

gulp.task('compass', function(callback) {
  return runSequence(
    'compass-dev',
    'compass-dist',
    callback
  );
});

// watch
gulp.task('watch', function () {
  gulp.watch('js/honyaque.js', ['js']);
  gulp.watch('sass/{,*/}{,*/}*.scss', ['compass']);
});

// default task
gulp.task('default',['js','compass']);
