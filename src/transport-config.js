/**
 * User: garcia.wul (garcia.wul@alibaba-inc.com)
 * Date: 2014/10/17
 * Time: 10:12
 *
 */

var CmdNice = require("cmd-nice");

module.exports = {
    useCache: true,
    rootPath: process.cwd(),
    parsers: {
        ".handlebars": CmdNice.HandlebarsTemplate,
        ".json": CmdNice.Json,
        ".less": CmdNice.LessStyle,
        ".scss": CmdNice.SassStyle,
        ".js": CmdNice.Script,
        ".css": CmdNice.Style,
        ".html": CmdNice.Text,
        ".tpl": CmdNice.UnderscoreTemplate
    },
    paths: [],
    alias: {},
    aliasPaths: {},
    handlebars: {
        id: 'alinw/handlebars/1.3.0/runtime',
        knownHelpers: [],
        knownHelpersOnly: false
    },
    sassOptions: {},
    lessOptions: {},
    cssOptions: {}
};