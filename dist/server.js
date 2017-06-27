"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("file-system");
const hbs = require("hbs");
const handlebars = require("handlebars");
const routing_controllers_1 = require("routing-controllers");
const uniqueValidator = require("mongoose-unique-validator");
const layouts = require("handlebars-layouts");
const nameSpaceHandler_1 = require("./utils/nameSpaceHandler");
const readConfig_1 = require("./utils/readConfig");
exports.config = readConfig_1.recursiveIncludeJson('./config', 'config.json');
exports.app = express();
exports.router = express.Router();
exports.app.use(express.static('/web'));
exports.app.use(bodyParser.urlencoded({ 'extended': 'true' }));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
exports.app.use(methodOverride());
let hbsParam = exports.config.view.view_engine.handlebars;
hbs.registerHelper(layouts(handlebars));
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
                console.error("\x1b[31m%s\x1b[0m", "nameSpace error:try to register " + file + " as {{>" + nameSpace + "}} \n check your views directory to resolve conflict");
                console.log('hello');
            }
        });
    }
}
if (exports.config.view.baseDir) {
    exports.app.set('views', [exports.config.view.directory, 'app/**/views/']);
}
exports.app.set('view engine', 'hbs');
switch (exports.config.env) {
    case 'dev':
        exports.app.use(morgan('dev'));
        break;
    case 'prod':
        exports.app.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400; }, stream: __dirname + 'var/logs/prod.log' }));
        break;
}
exports.app.use(function (err, req, res, next) {
    console.log(exports.app.get('views'));
    let status = (err.httpCode) ? err.httpCode : 500;
    res.statusstatus;
    let errorPage = fs.existsSync(exports.app.get('views') + '/error-pages/' + status + '.hbs') ? 'error-pages/' + status + '.hbs'
        : 'error-pages/default.hbs';
    if (req.accepts('html')) {
        res.render(errorPage, {
            status: status,
            error: err,
            url: req.url,
            contact: exports.config.contact
        });
    }
    else if (req.accepts('json')) {
        res.send({
            status: status,
            error: err,
            contact: exports.config.contact
        });
    }
});
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
routing_controllers_1.useExpressServer(exports.app, {
    defaultErrorHandler: false,
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
exports.app.use(exports.router);
let serv = exports.config.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening " + serv.host + ":" + serv.port);
//# sourceMappingURL=server.js.map