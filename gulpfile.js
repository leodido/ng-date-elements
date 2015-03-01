'use strict';

var gulp = require('gulp'),
  debug = require('gulp-debug'),
  comp = require('gulp-closure-compiler'),
  jshint = require('gulp-jshint'),
  minimist = require('minimist'),
  gutil = require('gulp-util'),
  bump = require('gulp-bump'),
  del = require('del'),
  sequence = require('run-sequence'),
  connect = require('gulp-connect'),
  pack = require('./package.json'),
  banner = [
    '/*',
    ' * Copyright (c) ' + new Date().getFullYear() + ', ' + pack.author.name + ' <' + pack.author.email + '>',
    ' * ' + pack.main + ' - ' + pack.description,
    ' * @version '+ pack.version,
    ' * @link ' + pack.homepage,
    ' * @license ' + pack.license,
    ' */'
  ].join('\n');
gulp = gulp = require('gulp-help')(gulp, {
  description: 'Display this help text'
});

var knownFlags = {
    'boolean': ['banner'],
    'string': ['env', 'level'],
    'default': {
      env: 'production',
      banner: false,
      level: 'patch'
    },
    'alias': { e: 'env', b: 'banner', l: 'level' }
  },
  flags = minimist(process.argv.slice(2), knownFlags),
  productionBuild = function(value) {
    switch(value) {
      case 'prod':
      case 'production':
        return true;
      case 'dev':
      case 'development':
        return false;
      default:
        return true;
    }
  },
  getVersionLevel = function() {
    if (['major', 'minor', 'patch', 'prerelease'].indexOf(flags.level) === -1) {
      flags.level = 'patch';
    }
    return flags.level;
  };

var build = {
  compiler: './bower_components/closure-compiler/compiler.jar',
  filename: pack.main,
  externs: [
    './bower_components/closure-angularjs-externs/index.js',
    './bower_components/closure-angularjs-q_templated-externs/index.js',
    './bower_components/closure-angularjs-http-promise_templated-externs/index.js'
  ],
  src: pack.directories.lib + '/*.js',
  deps: [
    'bower_components/closure-library/closure/goog/base.js'
  ]
};

gulp.task('version', 'Print the library version', [], function() {
  return gutil.log('Library', gutil.colors.magenta(pack.name) + ',', gutil.colors.magenta(pack.version));
});

gulp.task('lint', 'Lint JS source files', [], function() {
  return gulp.src(build.src)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('minify', false, [], function() {
  var isProduction = productionBuild(flags.env),
      sourcemap = build.filename + '.map',
      wrapper = (flags.banner ? banner + '\n': '') +
                '(function(){%output%})();' +
                (isProduction ? '' : '\n//# sourceMappingURL=' + sourcemap);

  var compilerFlags = {
    // closure_entry_point: 'leodido.Main',
    // only_closure_dependencies: true,
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    language_in: 'ECMASCRIPT3',
    angular_pass: true,
    formatting: 'SINGLE_QUOTES',
    externs: build.externs,
    generate_exports: true,
    define: [
        'goog.DEBUG=' + (isProduction ? 'false' : 'true')
    ],
    output_wrapper: wrapper,
    warning_level: 'VERBOSE'
  };
  if (!isProduction) {
    compilerFlags.create_source_map = sourcemap;
  }

  return gulp.src(build.deps.concat(build.src))
    .pipe(debug({title: 'File: '}))
    .pipe(comp({
      compilerPath: build.compiler,
      fileName: build.filename,
      compilerFlags: compilerFlags
    }));
});

//gulp.task('prova', false, [], function () {
//  var isProduction = productionBuild(flags.env);
//  var wrapper = (flags.banner ? banner + '\n': '');
//  wrapper += '(function(){';
//  wrapper += '\n';
//  wrapper += '%output%})();'; // +
//  // (isProduction ? '' : '\n//# sourceMappingURL=' + sourcemap);
//
//  var compilerFlags = {
////    closure_entry_point: 'leodido.Main',
//    compilation_level: 'SIMPLE_OPTIMIZATIONS',
//    language_in: 'ECMASCRIPT3',
//    angular_pass: true,
//    formatting: ['SINGLE_QUOTES', 'PRETTY_PRINT'],
//    externs: build.externs,
//    generate_exports: true,
////    manage_closure_dependencies: true,
////    only_closure_dependencies: true,
//    define: [
//        'goog.DEBUG=' + (isProduction ? 'false' : 'true')
//    ],
//    output_wrapper: wrapper
////    warning_level: 'VERBOSE'
//  };
//
//  return gulp.src(build.src) // build.deps.concat(build.src))
//    .pipe(debug({title: 'File: '}))
//    .pipe(comp({
//      compilerPath: build.compiler,
//      fileName: build.directory + '/' + build.filename,
//      compilerFlags: compilerFlags
//    }));
//});

gulp.task('bump', 'Bump version up for a new release', function () {
  return gulp.src(['./bower.json', 'package.json'])
    .pipe(bump({ type: getVersionLevel() }))
    .pipe(gulp.dest('./'));
}, {
  options: {
    'level=major|minor|patch|prerelease': 'Version level to bump'
  }
});

gulp.task('clean', 'Clean build directory', function(cb) {
  return del([build.filename, build.filename + '.map'], cb);
});

gulp.task('build', 'Build the library', [], function(cb) {
  return sequence(
    'clean',
    'lint',
    'minify',
    cb);
}, {
  options: {
    'env=production|development': 'Kind of build to perform, defaults to production',
    'banner': 'Prepend banner to the built file'
  }
});

gulp.task('connect', 'Create a server', function () {
  connect.server({
    port: 8000,
    livereload: true
  });
});

gulp.task('default', false, ['help']);

// TODO
// [ ] - beautified release file
