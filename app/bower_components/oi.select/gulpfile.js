var path          = require('path');
var del           = require('del');
var series        = require('stream-series');
var gulp          = require('gulp');
var rename        = require('gulp-rename');
var concat        = require('gulp-concat');
var webserver     = require('gulp-webserver');
var templateCache = require('gulp-angular-templatecache');
var minifyCss     = require('gulp-minify-css');
var minifyHtml    = require('gulp-minify-html');
var uglify        = require('gulp-uglify');
var stylus        = require('gulp-stylus');
var KarmaServer   = require('karma').Server;
var autoprefixer  = require('autoprefixer-stylus')({
    browsers: ["ff >= 20", "chrome >= 35", "safari >= 7", "ios >= 7", "android >= 4", "opera >= 12.1", "ie >= 10"]
});

var paths = {
    root:     __dirname,
    src:      path.join(__dirname, '/src'),
    dist:     path.join(__dirname, '/dist')
};

gulp.task('webserver', function() {
    return gulp.src(paths.root)
        .pipe(webserver({
            host: 'localhost',
            port: 3000,
            fallback: 'index.html',
            livereload: true
        }));
});

gulp.task('clean', function() {
    del.sync(paths.dist);
});

gulp.task('compileStyles', function() {
    return gulp.src(path.join(paths.src, 'style.styl'))
        .pipe(stylus({
            use: autoprefixer
        }))
        .pipe(concat('select.css'))
        .pipe(gulp.dest(paths.dist))
        .pipe(minifyCss())
        .pipe(rename('select.min.css'))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('compileScripts', function() {
    var templateStream = gulp.src(path.join(paths.src, 'template.html'))
        .pipe(minifyHtml())
        .pipe(templateCache({
            module: 'oi.select',
            root: 'src/'
        }));

    var scriptStream = gulp.src([
        path.join(paths.src, 'module.js'),
        path.join(paths.src, 'services.js'),
        path.join(paths.src, 'directives.js'),
        path.join(paths.src, 'filters.js')
    ]);

    scriptStream
        .pipe(concat('select.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(uglify())
        .pipe(rename('select.min.js'))
        .pipe(gulp.dest(paths.dist));

    series(scriptStream, templateStream)
        .pipe(concat('select-tpls.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(uglify())
        .pipe(rename('select-tpls.min.js'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
    gulp.watch(path.join(paths.src, '**/*.styl'), ['compileStyles']);
});

gulp.task('test', function(done) {
    new KarmaServer({
        configFile: path.join(paths.root, 'karma.conf.js')
    }, done).start();
});

gulp.task('build', ['clean', 'compileScripts', 'compileStyles']);
gulp.task('default', ['webserver', 'watch']);

