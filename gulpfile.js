var {series, src, dest, watch} = require("gulp");

var minifyCss = require("gulp-cssmin");
var minifyHtml = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var clean = require("gulp-clean");
const GulpClient = require("gulp");

function doCss() {
    return src("./origin/sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(dest("./publish/css"));
}

function doJS() {
    return src("./origin/js/**/*.js")
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(uglify())
    .pipe(dest("./publish/js"));
}


function doHTML() {
    return src("./origin/**/*.html")
    .pipe(minifyHtml({
        collapseWhitespace: true
    }))
    .pipe(dest("./publish/"))
}

function doPHP() {
    return src("./origin/php/*.php")
    .pipe(dest("./publish/php"))
}

function doResource() {
    return src("./origin/resource/**/*.*")
    .pipe(dest("./publish/resource/"))
}


function doClean() {
    return src("./publish/", {read: false, allowEmpty: true})
    .pipe(clean())
}

function webServer() {
        // 定位资源 
        return src('publish')
        .pipe(webserver({
          host: '127.0.0.1',
          port: 8888,
          livereload: true,
          open: 'index.html',
          proxies: [
            {
                source: '/php', 
                target: 'http://10.3.144.81:80/php'
            }
          ]
        }))
  
}

function refresh() {
    return watch("./origin", series(doClean, [doCss, doHTML, doJS, doResource]))
}


module.exports.default = series(doClean, doCss, doHTML, doJS, doPHP, doResource, webServer, refresh);
