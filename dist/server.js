"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("fs-extra");
const hbs = require("hbs");
const routing_controllers_1 = require("routing-controllers");
const uniqueValidator = require("mongoose-unique-validator");
const nameSpaceHandler_1 = require("./utils/nameSpaceHandler");
const readConfig_1 = require("./utils/readConfig");
const errorHandler_1 = require("./utils/errorHandler");
exports.config = readConfig_1.recursiveIncludeJson('./config', 'config.json');
exports.app = express();
exports.router = express.Router();
exports.app.use(express.static('/web'));
exports.app.use(bodyParser.urlencoded({ 'extended': 'true' }));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
exports.app.use(methodOverride());
let hbsParam = exports.config.view.view_engine.handlebars;
var blocks = {};
hbs.registerHelper('extend', function (name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this));
});
hbs.registerHelper('block', function (name) {
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
});
if (hbsParam.partials_location) {
    var registeredPartials = [];
    for (let i in hbsParam.partials_location) {
        let partial = hbsParam.partials_location[i];
        nameSpaceHandler_1.createNameSpace(partial.directory, partial.moduleNameRegex, '.', function (file, nameSpace) {
            if (registeredPartials.indexOf(nameSpace) === -1) {
                hbs.registerPartial(nameSpace, file);
                registeredPartials.push(nameSpace);
                console.log("register " + file + " as {{>" + nameSpace + "}}");
            }
            else {
                console.error("\x1b[31m%s\x1b[0m", "nameSpace error:fail to register " + file + " as {{>" + nameSpace + "}} \n"
                    + "check your partials directories to resolve conflict");
            }
        });
    }
}
exports.app.set('views', [__dirname + "/" + exports.config.view.directory + "/", __dirname + "/app/"]);
exports.app.set('view engine', 'hbs');
fs.remove(exports.config.public + "/app", function (err) {
    if (err)
        throw new Error(err);
    console.log("clear existing symlink to " + exports.config.public + "/app");
    nameSpaceHandler_1.createNameSpace('app/**/' + exports.config.public + '/', "app\/(.*)\/" + exports.config.public + "\/", '/', function (file, nameSpace) {
        fs.ensureSymlink(__dirname + "/" + file, __dirname + "/" + exports.config.public + '/app/' + nameSpace, function (err) {
            if (err)
                throw new Error(err);
            console.log("create symlink: " + file + " -> " + "app/" + nameSpace);
        });
    });
});
routing_controllers_1.useExpressServer(exports.app, {
    defaultErrorHandler: false,
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
exports.app.use(exports.router);
switch (exports.config.env) {
    case 'dev':
        exports.app.use(morgan('dev'));
        break;
    case 'prod':
        exports.app.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400; }, stream: __dirname + 'var/logs/prod.log' }));
        break;
}
exports.app.use(errorHandler_1.errorHandler);
let db = exports.config.database;
let dbConnectUri = db.driver + "://"
    + ((db.username && db.password) ?
        (db.username + ':' + db.password + "@") : '')
    + db.host
    + (db.port ? (':' + db.port) : '')
    + "/" + db.dbname;
mongoose.plugin(uniqueValidator);
mongoose.connect(dbConnectUri);
console.log("Connected to " + dbConnectUri);
let serv = exports.config.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening " + serv.host + ":" + serv.port);
//# sourceMappingURL=server.js.map