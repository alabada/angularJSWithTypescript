/**
 * Created by wenhui.gao
 * less 编译
 */
var gulp           = require("gulp"),
    less           = require('gulp-less'), //编译less
    browserSync    = require('browser-sync').create(), //gulp控制,自动刷新的服务器
    reload         = browserSync.reload, 
    notify         = require('gulp-notify'), //发生错误时的错误提示
    sourcemaps     = require('gulp-sourcemaps'), //为文件添加sourcemaps 
    // concat      = require('gulp-concat') //文件合并
    plumber        = require("gulp-plumber"),//发生错误时不停止任务
    runSequence    = require('run-sequence'), //使任务按序执行
    LessAutoprefix = require('less-plugin-autoprefix'),//为css添加私有前缀
    autoprefix     = new LessAutoprefix({ browsers: ['last 4 versions',"android >= 4", "ie >= 8"] }),
    jsonServer     = require('json-server'),

    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    del = require('del'),
    tsProject = tsc.createProject('tsconfig.json'),
    superstatic = require( 'superstatic' );

var PATH = {
    appRoot:"./app/",
    less:'./app/less/',
    ts:'./app/js/',
    css:'./app/css/',
    data:'./app/data',
    reload:[ //这个目录和less目录下的内容变化时会刷新游览器
        "./app/views/**/*.html",
        "./app/js/**/*.js",
        "./app/router/**/*.js",
        "./app/*.js",
        "./app/config/**/*.json",
    ],
    jsonPath :{
        "grids":require("./app/data/grid.json").grids,
        "demo2goods":require('./app/data/fbi/demo2/demo2.json').demo2goods,
        "brand": require("./app/data/fbi/tree-grid.json").brand,
        "orders":require("./app/data/fbi/order.json").orders,
        "goods":require("./app/data/goods/db.json").goods,
        "brand":require("./app/data/goods/db.json").brand

    }
};


//start browserSync server
//body 不能用 ui-view
gulp.task('browserSync',function(){
    browserSync.init({
        // proxy: "localhost:8001", //代理模式
        server: {baseDir: PATH.appRoot},//服务器模式
        port:"4050",
        ui: {
          port: 4051
        }
    })
});
//json-server 
gulp.task('jsonServer', function () {
    //grid
    var server      = jsonServer.create()
    var router      = jsonServer.router(PATH.jsonPath)
    var middlewares = jsonServer.defaults()

    server.use(middlewares)
    server.use(router)
    server.listen(3000, function () {
      console.log('grid 的 json服务器正在运行')
    })
});


//编译less文件
gulp.task('less',function(){
    console.log("less编译中")
    return gulp.src(PATH.less+ "**/qs-theme.less")
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(PATH.css))
        .pipe(reload({stream:true}))
});


// 编译ts文件
gulp.task('compile-ts', function () {
    var sourceTsFiles = [PATH.ts + '**/*.ts',
        './typings/main/**/*.ts']; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest('./app/js'));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/js'));
});


gulp.task('watch',function(){
    gulp.watch([PATH.less + "**/*.less"],['less']); //监听less变化
    gulp.watch(PATH.reload,function () { //保存刷新
        reload()
    });
});

gulp.task('default',function(callback){
    runSequence(['browserSync','jsonServer','less','watch'],callback);        //默认的开发任务，编译css
    // runSequence(['browserSync','less','watch'],callback);        //默认的开发任务，编译css
});