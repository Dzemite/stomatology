let gulp = require("gulp");
let ts = require("gulp-typescript");
let clean = require("gulp-clean");
let tsProject = ts.createProject("tsconfig.json");
let runSequence = require('run-sequence');

gulp.task('clean', () => gulp.src('app', { read: false }).pipe(clean()));
gulp.task('build', () => gulp.src("src/**/*.ts").pipe(tsProject()).js.pipe(gulp.dest('app')));
gulp.task('default', (callback) => {
    runSequence('clean', 'build', callback);
})


