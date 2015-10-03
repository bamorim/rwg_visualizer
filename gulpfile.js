var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');

// Webpack Dev Server
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config.js');
var webpackStatsConfig = {
  colors: true,
  chunks: false
}

gulp.task('webpack-server', function(callback){
  var compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    contentBase: __dirname+"/build",
    stats: webpackStatsConfig,
    hot: true,
    watchDelay: 100
  }).listen(8080, "localhost", function(err){
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html")
  })
});

gulp.task('prepare-dev-server',function(){
  gulp.src("src/index.html")
    .pipe(gulp.dest("build/"));
});

gulp.task('server', ['webpack-server', 'prepare-dev-server']);

// Linting

gulp.task('lint', function(){
  gulp.src("src/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch-lint', function(callback){
  gulp.watch("src/**/*.js", ['lint']);
});
