/**
 * User: garcia.wul (garcia.wul@alibaba-inc.com)
 * Date: 2014/08/25
 * Time: 15:09
 *
 */

var fs = require('graceful-fs');
var path = require("path");
var util = require("util");

var _ = require("underscore");
var StringUtils = require("underscore.string");
var extend = require("extend");
var GulpUtil = require("gulp-util");
var through = require('through2');
var chalk = require("chalk");

var CmdNice = require("cmd-nice");
var Handlebars = require("handlebars");
var verboseTemplate = Handlebars.compile(
    "concat: {{{src}}}"
);
var shutils = require("shutils");
var filesystem = shutils.filesystem;
var error = require("./error");

var options = {
    separator: ";",
    useCache: false,
    paths: [],
    transportConfig: require("./transport-config"),
    total: function(){},
    success: function() {},
    fail: function() {}
};

var concat = null;
var doConcat = function(file, encoding, callback) {
    var self = this;
    if (file.isNull()) {
        self.push(file);
        return callback();
    }
    if (file.isStream()) {
        return callback(error("Streaming not supported", {
            fileName: file.path,
            showStack: false
        }));
    }
    var content = file.contents.toString();
    GulpUtil.log(verboseTemplate({
        src: file.path
    }));
    concat.execute({
        src: path.normalize(file.path),
        content: content
    }).then(function(code) {
        file.contents = new Buffer(code);
        if (_.isFunction(options.success)) {
            options.success({
                path: file.path
            });
        }
    }).fail(function(errorCode) {
        if (_.isObject(errorCode) && _.isString(errorCode.message)) {
            GulpUtil.log(chalk.red(errorCode.message));
        }
        if (_.isFunction(options.fail)) {
            options.fail({
                path: file.path,
                error: errorCode
            });
        }
    }).finally(function() {
        if (_.isFunction(options.total)) {
            options.total();
        }

        self.push(file);
        callback();
    });
};

module.exports = function(opt) {
    if (_.isObject(opt)) {
        extend(true, options, opt);
    }
    concat = new CmdNice.Concat(options);
    return through.obj(doConcat);
};