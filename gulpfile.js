const gulp = require('gulp')
// 重新命名
const rename = require('gulp-rename')
// js文件压缩
const uglify = require('gulp-uglify')
// css文件压缩
const cssMin = require('gulp-clean-css')
// js转换
const jsBabel = require('gulp-babel')
// css转换
const cssBabel = require('gulp-sass')
// 启动服务
const connect = require('gulp-connect')

const cssSrc = './src/css/*.css' //定义css文件路径
const jsPath = ['./src/js/*.js'] //定义js文件路径
const htmlPath = ['./src/index.html'] //定义js文件路径


gulp.task('webserver',function(){
    connect.server({
       root: './',
       livereload:true,
       port:8082
    });
});
 
// 处理js文件
gulp.task('js', function () {
    return gulp.src(jsPath)
    // js转码
    .pipe(jsBabel({
        presets: ['@babel/env']
        // plugins:['babel-plugin-transform-es2015-modules-amd']
    }))
      .pipe(uglify({
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true//类型：Boolean 默认：true 是否完全压缩
      } 
      ))
      .pipe(gulp.dest('dist/js'));
});

// 定义html的任务
gulp.task('html',() => {
    return gulp.src(htmlPath)
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
})
  
// 定义看守任务
gulp.task('watch',() => {
    gulp.watch('dist/index.html',['html'])
})



gulp.task('dev',['js','html','webserver','watch']);

gulp.task('build',['js'])
