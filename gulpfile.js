const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const minifyCss = require('gulp-minify-css')
const sass = require('gulp-sass')
// 压缩javascript文件，减小文件大小
const uglify = require('gulp-uglify');
// es6转es5
const babel = require('gulp-babel');
const changed = require('gulp-changed')

gulp.task('htmlTask', function () {
    var options = {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(changed('dist/html/'))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html/'))
})

gulp.task('sassTask', function() {
    gulp.src('src/sass/*.scss')//打包之前sass路径
        .pipe(sass().on('error',sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('JsTask', function () {
    gulp.src(['src/js/*.js'])
        .pipe(babel({
            presets: ['es2015'] // es5检查机制
        }))
        .pipe(uglify()) // 使用uglify进行压缩，并保留部分注释
        .pipe(gulp.dest('dist/js'));
})

gulp.task('copyTask', function () {
    gulp.src('src/assets/*')
        .pipe(gulp.dest('dist/assets'))
})

// 监听任务
gulp.task('watch', function(){
    // 监听 html
    gulp.watch('src/html/*.html', ['htmlTask'])
    // 监听 js
    gulp.watch('src/js/*.js', ['JsTask'])
    // 监听 css
    gulp.watch('src/css/*.scss', ['sassTask'])
})

gulp.task('default',['copyTask', 'htmlTask', 'sassTask', 'JsTask', 'watch'])