# gulp-casperjs

A [gulp](https://github.com/gulpjs/gulp) plugin for running [CasperJS](https://github.com/n1k0/casperjs) scripts

## Install

```
npm install --save-dev gulp-casperjs
```

## Usages

```js
var casperJs = require('gulp-casperjs');
gulp.task('test', function () {
  gulp.src('Globs of test files')
    .pipe(casperJs()); //run casperjs test
});
```

To change the command (default: `test`) use parameter `command`:

```js
var casperJs = require('gulp-casperjs');
gulp.task('casperCmd', function () {
  gulp.src('test.js')
    .pipe(casperJs({command:''})); //run casperjs test.js
});
```

Command can be `array` or `string`.
If command has value which cast to `false`, this parameter will be ignored.

To set custom path to CasperJS use parameter `binPath`:

```js
var casperJs = require('gulp-casperjs');
gulp.task('test', function () {
  gulp.src('test.js')
    .pipe(casperJs({binPath: './node_modules/casperjs/bin/casperjs'})); //custom path to CasperJs
});
```

Default is `casperjs` (global)


## LICENSE

The MIT License (MIT)
