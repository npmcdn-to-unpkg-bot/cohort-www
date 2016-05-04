var g   = require('gulp'),
    cc  = require('gulp-concat'),
    ug  = require('gulp-uglify'),
    im  = require('gulp-imagemin'),
    cn  = require('connect'),
    ss  = require('serve-static'),
    ap  = require('gulp-autoprefixer'),
    cm  = require('gulp-cssmin'),
    r   = require('gulp-rename');

var root = 'process/',
    dest = '_static/',
    compressed = '_static/compressed';

var options = {
      browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
      ],
      cascade: false
    };

g.task('styles', function() {
  return g.src(root + 'styles.css')
    .pipe(ap(options))
    // .pipe(cm({ showLog: true }))
    // .pipe(r({ suffix: '.min' }))
    .pipe(g.dest(compressed));
});

g.task('scripts', function() {
  return g.src(root + 'scripts.js')
    // .pipe(cc('r.min.js'))
    // .pipe(ug())
    .pipe(g.dest(compressed));
});

g.task('images', function() {
  return g.src(root + 'images/**/*')
    .pipe(im({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(g.dest(dest + 'images/'));
});

g.task('serve', function() {
  return cn().use(ss(__dirname))
    .listen(1339)
    .on('listening', function() {
      console.log('Stuff happening: at http://localhost:1339 ¯\\_(ツ)_/¯');
    });
});

g.task('watch', function() {
  g.watch('process/*.css', ['styles']);
  g.watch('process/*.js', ['scripts']);
  g.watch('process/images/**/*', ['images']);
});

g.task('default', ['styles', 'scripts', 'images', 'serve', 'watch']);
