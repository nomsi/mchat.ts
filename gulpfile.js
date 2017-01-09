var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');

/** TS Paths **/
var paths = {
  tscripts : {
    src : ['src/**/*.ts'],
    dest : 'dist'
  }
};

/** TS Linter **/
gulp.task("compile:lint", () => {
  return gulp.src(paths.tscripts.src)
    .pipe(tslint({
      formatter: "verbose",
      emitError: false
    }))
    .pipe(tslint.report());
});

/** TS Compiler **/
gulp.task("compile:ts", ["compile:lint"], () => {
  return gulp.src(paths.tscripts.src)
    .pipe(tsc({
      module: "commonjs",
      emitError: false
    }))
    .pipe(gulp.dest(paths.tscripts.dest));
});

/** TS Runner **/
gulp.task("run", () => {
  gulp.watch(paths.tscripts.src,
    runseq("compile:ts", "watch:runner")
  );
});
gulp.task("watch:runner", () => { shell.task(["node dist/Chat.js"]); });

/** defaults **/
gulp.task("default", ["compile:ts"]);
