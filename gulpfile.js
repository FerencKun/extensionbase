var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var minimist = require('minimist');
var ts = require('gulp-typescript');
var merge = require('merge-stream');
var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var replace = require('gulp-replace-task');

var cmdOptions = {
    string: ['browser'] ,
    default: { browser: 'chrome' }
};

// minimist creates object from args - key value pairs
var options = minimist(process.argv.slice(2), cmdOptions);

// Clean compiled ts files - as a standalone task it works
gulp.task('clean', function(){
    // "del" is called only after it verifies the paths are correct, and not after the actual delete operation is finished.
    del('dist/' + options.browser);
    // seems async operation - will not remove folders
    return del('dist/js');
});

// Compile ts
gulp.task('compile:ts', ['clean'], function(){
    var src;
    switch (options.browser){
        case 'chrome':
            src = ['src/**/*.ts', 'typings/tsd.d.ts', '!src/**/firefox.ts'];
            break;
        case 'firefox':
            src = ['src/**/*.ts', 'typings/tsd.d.ts', '!src/**/chrome.ts'];
            break;
        default:
            break;
    }

    return gulp.src(src)
        .pipe(ts({
            noLib: options.browser === 'firefox'
        }, {}, ts.reporter.longReporter()))
        .pipe(gulp.dest('dist/js'));
});

// Copy ts and other files to dist
gulp.task('copy', ['compile:ts'], function(){
    var destination = 'dist/' + options.browser;

    var bowerLibFiles;
    var contentScript;
    var otherFiles;
    var manifestFiles;
    var jsFiles;

    // Chrome
    if (options.browser === 'chrome'){

        /*var bowerFileList = bowerFiles();
        bowerLibFiles = gulp.src(bowerFileList)
            .pipe(gulp.dest(destination + '/bower_components'));*/

        otherFiles = gulp.src([
            'src/**/*',
            '!src/**/*.ts',
            '!src/Manifests/**/*'
        ])
            .pipe(gulp.dest(destination));

        var chromeFiles = gulp.src(['dist/js/**/*.js', '!dist/js/ContentScripts/**/*.js'])
            .pipe(gulp.dest(destination));

        manifestFiles = gulp.src(['src/Manifests/chrome/manifest.json'])
            .pipe(gulp.dest(destination));

        contentScript = gulp.src([
            'dist/js/Common/**/*.js',
            'dist/js/ContentScripts/Browsers/**/*.js',
            'dist/js/ContentScripts/**/*.js'])
            .pipe(concat('contentScript.js'))
            .pipe(gulp.dest(destination + '/ContentScripts'));

        jsFiles = merge(chromeFiles, contentScript);

        // Firefox
    } else if (options.browser === 'firefox') {

        /*var bowerFileList = bowerFiles();
        bowerLibFiles = gulp.src(bowerFileList)
            .pipe(gulp.dest(destination + '/bower_components'));*/

        otherFiles = gulp.src([
            'src/**/*',
            '!src/**/*.ts',
            '!src/Manifests/**/*'
        ])
            .pipe(gulp.dest(destination + '/data'));

        var firefoxScripts = gulp.src(['dist/js/**/*.js', '!dist/js/BackgroundScripts/**/*.js', '!dist/js/ContentScripts/**/*.js'])
            .pipe(gulp.dest(destination + '/data'));

        var firefoxMain = gulp.src([
            'dist/js/Common/**/*.js',
            'dist/js/BackgroundScripts/Browsers/**/*.js',
            'dist/js/BackgroundScripts/**/*.js'])
            .pipe(concat('firefoxMain.js'))
            .pipe(gulp.dest(destination + '/Main'));

        contentScript = gulp.src([
            'dist/js/Common/**/*.js',
            'dist/js/ContentScripts/Browsers/**/*.js',
            'dist/js/ContentScripts/**/*.js'])
            .pipe(concat('contentScript.js'))
            .pipe(gulp.dest(destination + '/data/ContentScripts'));

        jsFiles = merge(firefoxScripts, firefoxMain, contentScript);

        manifestFiles = gulp.src(['src/Manifests/firefox/package.json'])
            .pipe(gulp.dest(destination));
    }

    return merge(jsFiles, /*bowerLibFiles, */ otherFiles, manifestFiles);
});

// Replace params
gulp.task('replace', ['copy'], function(){

    var patterns = [];

    var browserPath = "./Browsers/chrome.js";

    if (options.browser == 'firefox') {
        browserPath = "../Common/Browsers/firefox.js";
    }

    patterns.push({match: 'BrowserPath', replacement: browserPath});

    var source = 'dist/' + options.browser + '/**/*';

    var dest = 'dist/' + options.browser;

    return gulp.src(source)
        .pipe(replace({
            prefix: '//@@',
            patterns: patterns
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('default', ['replace']);
