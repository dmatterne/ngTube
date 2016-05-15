'use strict';

const Path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const inlineNg2Template = require('gulp-inline-ng2-template');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const Builder = require('systemjs-builder');
const DISTGULP = './dist-gulp';
const TMP  = './tmp-gulp/app';

const SRC = './src/app/**/*.ts';
const TMPSRC = Path.join(TMP, SRC);


const options = {
    base: 'src/app',
    target: 'es5',
    useRelativePaths: true
};
              
const tsProject = ts.createProject('./src/tsconfig.json', {
    noExternalResolve: true
});


gulp.task('copy-vendor-tmp', function () {
    
    return gulp.src('./dist/vendor/**/*').pipe(gulp.dest('./tmp-gulp/vendor'))
});

gulp.task('copy-base-dist', function () {
    
    return gulp.src('./dist/*').pipe(gulp.dest('./tmp-gulp'));
});

gulp.task('copy-base-folder', ['copy-base-dist'], function () {
    
    return gulp.src(
        ['favicon.ico',
         'preloader.css',
         'icon.png',
         'CNAME'])
    
    
        .pipe(gulp.dest('./dist-gulp'));
});

gulp.task('reflect-metadata', ['copy-vendor-tmp'], function () {
    return gulp.src('./tmp-gulp/vendor/reflect-metadata/Reflect.js')
        .pipe(gulp.dest('./dist-gulp/vendor/reflect-metadata'));
});

gulp.task('zone.js', ['copy-vendor-tmp'], function () {
    return gulp.src('./tmp-gulp/vendor/zone.js/dist/zone.js')
        .pipe(gulp.dest('./dist-gulp/vendor/zone.js/dist'));
        
});

gulp.task('copy-vendor-dist', ['reflect-metadata', 'zone.js'], function () {
   
   //
    
});

gulp.task('copy-cname', function () {
    
    return gulp.src('CNAME').pipe(gulp.dest('./dist-gulp'));
});

gulp.task('copy-index', function () {
    
   return gulp.src('./src/index.prod.html')
        .pipe(rename({
            basename: 'index'
        }))
        .pipe(gulp.dest('./dist-gulp'));
})

gulp.task('pre:build', [
                'copy-base-folder',
                'copy-vendor-dist',
                'copy-cname',
                'copy-index'
            ], function () {
   

    return gulp.src('./dist/app/**/*.js')
                        .pipe(inlineNg2Template(options))
                        .pipe(gulp.dest(TMP))
                        
                        
});



gulp.task('clean', function () {
   
   return gulp.src([DISTGULP, 'tmp-gulp']).pipe(clean());

});



gulp.task('build', ['clean', 'pre:build'], function () {
   
    const builder = new Builder('./tmp-gulp', './tmp-gulp/system-config.js');
   
   builder.buildStatic('main.js', 'dist-gulp/build.js',{
       minify: true,
       sourceMaps: true,
       mangle: false
   });
});
