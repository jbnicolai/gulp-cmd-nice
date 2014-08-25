/**
 * User: garcia.wul (garcia.wul@alibaba-inc.com)
 * Date: 2014/08/25
 * Time: 13:38
 *
 */

var GulpUtil = require('gulp-util');
var PluginError = GulpUtil.PluginError;

module.exports = function() {
    var Factory = PluginError.bind.apply(PluginError, [].concat(null, "gulp-cmd-nice", Array.prototype.slice.call(arguments)));
    return new Factory();
};