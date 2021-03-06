var through = require('through2');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var PluginError = gutil.PluginError;


const PLUGIN_NAME = 'gulp-casperjs-options';

function casper(options) {
    options = options || {};

    var args = [];

    if (options.xunit) {
        args.push('--xunit=' + options.xunit);
    }

    if (options.loglevel) {
        args.push('--log-level=' + options.loglevel);
    }

    if (options.engine) {
        args.push('--engine=' + options.engine);
    }

    if (options.includes) {
        args.push('--includes=' + options.includes);
    }

    if (options.pre) {
        args.push('--pre=' + options.pre);
    }

    if (options.post) {
        args.push('--post=' + options.post);
    }

    if (options.failfast) {
        args.push('--fail-fast=');
    }

    if (options.concise) {
        args.push('--concise=');
    }

    if (options.nocolors) {
        args.push('--no-colors');
    }

    var cmd = (typeof options.command === 'undefined') ? 'test' : options.command;

    var files = [];

    var read = function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            this.emit('error', new PluginError({
                plugin: PLUGIN_NAME,
                message: 'Streams are not supported.'
            }));
            return cb(null, file);
        }
        files.push(file.path);

        this.push(file);

        cb(null, file);
    };

    var end = function(cb) {
        cmd = cmd ? (Array.isArray(cmd) ? cmd : cmd.split(' ')) : [];

        var tempArr = cmd.concat(files);

        if (args.length) {
            tempArr = tempArr.concat(args);
        }

        var casperChild = spawn('casperjs', tempArr);

        casperChild.stdout.on('data', function(data) {
            var msg = data.toString().slice(0, -1);
            gutil.log(PLUGIN_NAME + ':', msg);
        });

        var self = this;
        casperChild.on('close', function(code) {
            var success = code === 0;
            if (!success) {
                self.emit('error', new PluginError({
                    plugin: PLUGIN_NAME,
                    message: 'code ' + code
                }));
            }
            cb();
        });
    };

    return through.obj(read, end);
}

module.exports = casper;
