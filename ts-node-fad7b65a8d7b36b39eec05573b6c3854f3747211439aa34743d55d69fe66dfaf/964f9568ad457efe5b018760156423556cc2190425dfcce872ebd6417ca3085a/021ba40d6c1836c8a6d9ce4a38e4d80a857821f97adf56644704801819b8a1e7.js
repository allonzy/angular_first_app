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
                console.error("\x1b[31m%s\x1b[0m", "nameSpace error:try to register " + file + " as {{>" + nameSpace + "}} \n"
                    + "check your partials directories to resolve conflict");
            }
        });
    }
}
routing_controllers_1.useExpressServer(exports.app, {
    defaultErrorHandler: false,
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
exports.app.use(exports.router);
if (exports.config.view.baseDir) {
    exports.app.set('views', [exports.config.view.directory, 'app/**/views/']);
}
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
let serv = exports.config.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening " + serv.host + ":" + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUVsRCwrQkFBK0I7QUFDL0IsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw2REFBcUQ7QUFDckQsNkRBQTREO0FBRTVELDhDQUE4QztBQUM5QywrREFBeUQ7QUFDekQsbURBQXVEO0FBUzVDLFFBQUEsTUFBTSxHQUFHLGlDQUFvQixDQUFDLFVBQVUsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUN4RCxRQUFBLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUd2QyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUcxQixJQUFJLFFBQVEsR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7QUFHbEQsR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUd4QyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQSxDQUFDO0lBQzdCLElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBLENBQUM7UUFDekMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLGtDQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsZUFBZSxFQUFDLEdBQUcsRUFBQyxVQUFTLElBQUksRUFBQyxTQUFTO1lBQ3JGLEVBQUUsQ0FBQSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hELEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFDLElBQUksR0FBQyxTQUFTLEdBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUMvQixrQ0FBa0MsR0FBQyxJQUFJLEdBQUMsU0FBUyxHQUFDLFNBQVMsR0FBQyxPQUFPO3NCQUNsRSxxREFBcUQsQ0FDdEQsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7QUFDRixDQUFDO0FBSUQsc0NBQWdCLENBQUMsV0FBRyxFQUFFO0lBQ3JCLG1CQUFtQixFQUFFLEtBQUs7SUFDdkIsV0FBVyxFQUFDLENBQUMsU0FBUyxHQUFDLCtCQUErQixDQUFDO0lBQ3ZELFdBQVcsRUFBRSxDQUFDLFNBQVMsR0FBRyx5Q0FBeUMsQ0FBQztDQUN2RSxDQUFDLENBQUM7QUFDSCxXQUFHLENBQUMsR0FBRyxDQUFDLGNBQU0sQ0FBQyxDQUFDO0FBRWhCLEVBQUUsQ0FBQSxDQUFDLGNBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztJQUN2QixXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxDQUFDLGNBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUNELFdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBSTlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLEVBQUMsVUFBUyxHQUFHO0lBQzFDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBQyxjQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRS9ELGtDQUFlLENBQUMsU0FBUyxHQUFDLGNBQU0sQ0FBQyxNQUFNLEdBQUMsR0FBRyxFQUFDLGFBQWEsR0FBQyxjQUFNLENBQUMsTUFBTSxHQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsVUFBUyxJQUFJLEVBQUMsU0FBUztRQUN2RyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBQyxHQUFHLEdBQUMsSUFBSSxFQUFDLFNBQVMsR0FBQyxHQUFHLEdBQUMsY0FBTSxDQUFDLE1BQU0sR0FBQyxPQUFPLEdBQUMsU0FBUyxFQUFDLFVBQVMsR0FBRztZQUM3RixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFDLElBQUksR0FBQyxNQUFNLEdBQUMsTUFBTSxHQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQSxDQUFDLGNBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQ2xCLEtBQUssS0FBSztRQUdULFdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkIsS0FBSyxDQUFDO0lBQ1AsS0FBSyxNQUFNO1FBR1YsV0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqSSxLQUFLLENBQUM7QUFDUixDQUFDO0FBRUQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7SUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUMsR0FBRyxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUM7SUFDN0MsR0FBRyxDQUFDLFlBQVksQ0FBQTtJQUNoQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUMsZUFBZSxHQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsR0FBQyxjQUFjLEdBQUMsTUFBTSxHQUFDLE1BQU07VUFDdkcseUJBQXlCLENBQUM7SUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDckIsTUFBTSxFQUFDLE1BQU07WUFDYixLQUFLLEVBQUUsR0FBRztZQUNWLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztZQUNaLE9BQU8sRUFBQyxjQUFNLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUixNQUFNLEVBQUMsTUFBTTtZQUNiLEtBQUssRUFBQyxHQUFHO1lBQ1QsT0FBTyxFQUFDLGNBQU0sQ0FBQyxPQUFPO1NBQ3RCLENBQUMsQ0FBQztJQUNKLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQztBQUdILElBQUksRUFBRSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUM7QUFDekIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBQyxLQUFLO01BQzdCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDMUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsUUFBUSxHQUFDLEdBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FDdkM7TUFDQSxFQUFFLENBQUMsSUFBSTtNQUNQLENBQUMsRUFBRSxDQUFDLElBQUksR0FBQyxDQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDO01BQzFCLEdBQUcsR0FBQyxFQUFFLENBQUMsTUFBTSxDQUNqQjtBQUVELFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBQyxZQUFZLENBQUMsQ0FBQztBQUsxQyxJQUFJLElBQUksR0FBRyxjQUFNLENBQUMsTUFBTSxDQUFDO0FBQ3pCLFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuLy8gaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgaGJzIGZyb20gJ2hicyc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0IHt1c2VFeHByZXNzU2VydmVyfSBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuaW1wb3J0ICogYXMgdW5pcXVlVmFsaWRhdG9yIGZyb20nbW9uZ29vc2UtdW5pcXVlLXZhbGlkYXRvcic7XG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSdleHByZXNzLWVycm9yLWhhbmRsZXInXG5pbXBvcnQgKiBhcyBsYXlvdXRzIGZyb20gJ2hhbmRsZWJhcnMtbGF5b3V0cyc7XG5pbXBvcnQge2NyZWF0ZU5hbWVTcGFjZX0gZnJvbSAnLi91dGlscy9uYW1lU3BhY2VIYW5kbGVyJztcbmltcG9ydCB7cmVjdXJzaXZlSW5jbHVkZUpzb259IGZyb20gJy4vdXRpbHMvcmVhZENvbmZpZydcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcbi8vID09PT09PT09PT09PT09RXhwb3J0IGNvbXBvbmVudCwgKGNhbiBiZSBuZWVkZWQgZnJvbSBjb250cm9sbGVycykgPT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBjb25maWcgPSByZWN1cnNpdmVJbmNsdWRlSnNvbignLi9jb25maWcnLCdjb25maWcuanNvbicpO1xuZXhwb3J0IGxldCBhcHAgPSBleHByZXNzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgb3VyIGFwcCB3LyBleHByZXNzXG5leHBvcnQgY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXBwLnVzZShleHByZXNzLnN0YXRpYygnL3dlYicpKTsgICAgICAgICAgICAgICAgIFx0XHRcdFx0Ly8gc2V0IHRoZSBzdGF0aWMgZmlsZXMgbG9jYXRpb24gL3B1YmxpYy9pbWcgd2lsbCBiZSAvaW1nIGZvciB1c2Vyc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09IEhhbmRsZWJhcnMgKHRlbXBsYXRpbmcgc3lzdGVtKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGhic1BhcmFtID0gY29uZmlnLnZpZXcudmlld19lbmdpbmUuaGFuZGxlYmFycztcblxuLy8gQWRkIHRoZSBsYXlvdXQgc3lzdGVtIHRvIGhhbmRsZWJhcnNcbmhicy5yZWdpc3RlckhlbHBlcihsYXlvdXRzKGhhbmRsZWJhcnMpKTtcblxuLy8gUmVnaXN0ZXIgYWxsIHBhcnRpYWxzIHdpdGggbmFtZXNwYWNlXG5pZihoYnNQYXJhbS5wYXJ0aWFsc19sb2NhdGlvbil7XG5cdFx0dmFyIHJlZ2lzdGVyZWRQYXJ0aWFscyA9IFtdO1xuXHRcdGZvciAobGV0IGkgaW4gaGJzUGFyYW0ucGFydGlhbHNfbG9jYXRpb24pe1xuXHRcdFx0bGV0IHBhcnRpYWwgPSBoYnNQYXJhbS5wYXJ0aWFsc19sb2NhdGlvbltpXTtcblx0XHRcdGNyZWF0ZU5hbWVTcGFjZShwYXJ0aWFsLmRpcmVjdG9yeSxwYXJ0aWFsLm1vZHVsZU5hbWVSZWdleCwnLicsZnVuY3Rpb24oZmlsZSxuYW1lU3BhY2Upe1xuXHRcdFx0aWYocmVnaXN0ZXJlZFBhcnRpYWxzLmluZGV4T2YobmFtZVNwYWNlKSA9PT0gLTEpe1xuXHRcdFx0XHRoYnMucmVnaXN0ZXJQYXJ0aWFsKG5hbWVTcGFjZSxmaWxlKTtcblx0XHRcdFx0cmVnaXN0ZXJlZFBhcnRpYWxzLnB1c2gobmFtZVNwYWNlKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJyZWdpc3RlciBcIitmaWxlK1wiIGFzIHt7PlwiK25hbWVTcGFjZStcIn19XCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJcXHgxYlszMW0lc1xceDFiWzBtXCIsXG5cdFx0XHRcdFx0XHRcIm5hbWVTcGFjZSBlcnJvcjp0cnkgdG8gcmVnaXN0ZXIgXCIrZmlsZStcIiBhcyB7ez5cIituYW1lU3BhY2UrXCJ9fSBcXG5cIiBcblx0XHRcdFx0XHRcdCtcImNoZWNrIHlvdXIgcGFydGlhbHMgZGlyZWN0b3JpZXMgdG8gcmVzb2x2ZSBjb25mbGljdFwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcdFxuXHR9XG59XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PSBDb250cm9sbGVyID09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFJlZ2lzdGVyIGNvbnRyb2xsZXJcbnVzZUV4cHJlc3NTZXJ2ZXIoYXBwLCB7XG5cdGRlZmF1bHRFcnJvckhhbmRsZXI6IGZhbHNlLCAvLyB3ZSB1c2UgY3VzdG9tIGVycm9yIGhhbmRsZXIgXG4gICAgY29udHJvbGxlcnM6W19fZGlybmFtZStcIi9hcHAvKi9jb250cm9sbGVycy8qey5qcywudHN9XCJdLFxuICAgIG1pZGRsZXdhcmVzOiBbX19kaXJuYW1lICsgXCIvbm9kZV9tb2R1bGVzLyoqL21pZGRsZXdhcmVzLyp7LmpzLC50c31cIl1cbn0pO1xuYXBwLnVzZShyb3V0ZXIpO1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gVmlld3MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmlmKGNvbmZpZy52aWV3LmJhc2VEaXIpe1xuXHRhcHAuc2V0KCd2aWV3cycsW2NvbmZpZy52aWV3LmRpcmVjdG9yeSwnYXBwLyoqL3ZpZXdzLyddKTtcbn1cbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hicycpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09UHVibGljIGRpciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9DcmVhdGUgc3ltbGluayBmcm9tIGFwcCB0byBwdWJsaWMgZGlyXG5mcy5yZW1vdmUoY29uZmlnLnB1YmxpYytcIi9hcHBcIixmdW5jdGlvbihlcnIpe1xuXHRpZihlcnIpIHRocm93IG5ldyBFcnJvcihlcnIpO1xuXHRjb25zb2xlLmxvZyhcImNsZWFyIGV4aXN0aW5nIHN5bWxpbmsgdG8gXCIrY29uZmlnLnB1YmxpYytcIi9hcHBcIik7XHRcblx0Ly8gbGluayBhbGwgcHVibGljIGZyb20gYXBwIHRvIHB1YmxpYyBcblx0Y3JlYXRlTmFtZVNwYWNlKCdhcHAvKiovJytjb25maWcucHVibGljKycvJyxcImFwcFxcLyguKilcXC9cIitjb25maWcucHVibGljK1wiXFwvXCIsJy8nLGZ1bmN0aW9uKGZpbGUsbmFtZVNwYWNlKXtcblx0XHRmcy5lbnN1cmVTeW1saW5rKF9fZGlybmFtZStcIi9cIitmaWxlLF9fZGlybmFtZStcIi9cIitjb25maWcucHVibGljKycvYXBwLycrbmFtZVNwYWNlLGZ1bmN0aW9uKGVycil7XG5cdFx0XHRpZihlcnIpIHRocm93IG5ldyBFcnJvcihlcnIpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJjcmVhdGUgc3ltbGluazogXCIrZmlsZStcIiAtPiBcIitcImFwcC9cIituYW1lU3BhY2UpO1xuXHRcdH0pO1xuXHR9KTtcbn0pO1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PUVycm9yIGhhbmRsaW5nID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnN3aXRjaChjb25maWcuZW52KXtcblx0Y2FzZSAnZGV2Jzpcblx0XHQvLyBkZXZlbG9wbWVudCBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gd2lsbCBwcmludCBzdGFja3RyYWNlXG5cdFx0YXBwLnVzZShtb3JnYW4oJ2RldicpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdGJyZWFrO1x0XHRcblx0Y2FzZSAncHJvZCc6XG5cdFx0Ly8gcHJvZHVjdGlvbiBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gbm8gc3RhY2t0cmFjZXMgbGVha2VkIHRvIHVzZXJcblx0XHRhcHAudXNlKG1vcmdhbignY29tbW9uJywgeyBza2lwOiBmdW5jdGlvbihyZXEsIHJlcykgeyByZXR1cm4gcmVzLnN0YXR1c0NvZGUgPCA0MDAgfSwgc3RyZWFtOiBfX2Rpcm5hbWUgKyAndmFyL2xvZ3MvcHJvZC5sb2cnIH0pKTtcblx0XHRicmVhaztcbn1cblxuYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KXtcblx0Y29uc29sZS5sb2coYXBwLmdldCgndmlld3MnKSk7XG5cdGxldCBzdGF0dXMgPSAoZXJyLmh0dHBDb2RlKT9lcnIuaHR0cENvZGU6NTAwO1xuXHRyZXMuc3RhdHVzc3RhdHVzXG5cdGxldCBlcnJvclBhZ2UgPSBmcy5leGlzdHNTeW5jKGFwcC5nZXQoJ3ZpZXdzJykrJy9lcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicycpPydlcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicydcblx0XHRcdDonZXJyb3ItcGFnZXMvZGVmYXVsdC5oYnMnO1xuXHRpZiAocmVxLmFjY2VwdHMoJ2h0bWwnKSkge1xuXHRcdHJlcy5yZW5kZXIoZXJyb3JQYWdlLCB7XG5cdFx0XHRzdGF0dXM6c3RhdHVzLFxuXHRcdFx0ZXJyb3I6IGVycixcblx0XHRcdHVybDogcmVxLnVybCxcblx0XHRcdGNvbnRhY3Q6Y29uZmlnLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxuXHRlbHNlIGlmIChyZXEuYWNjZXB0cygnanNvbicpKSB7XG5cdFx0cmVzLnNlbmQoe1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOmVycixcblx0XHRcdGNvbnRhY3Q6Y29uZmlnLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxufSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09IERhdGFiYXNlIGNvbm5lY3QgKG1vbmdvb3NlKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGRiID0gY29uZmlnLmRhdGFiYXNlO1xubGV0IGRiQ29ubmVjdFVyaSA9IGRiLmRyaXZlcitcIjovL1wiXG4gICAgKygoZGIudXNlcm5hbWUgJiYgZGIucGFzc3dvcmQpP1xuICAgICAgICAoZGIudXNlcm5hbWUrJzonK2RiLnBhc3N3b3JkK1wiQFwiKTonJ1xuICAgIClcbiAgICArZGIuaG9zdFxuICAgICsoZGIucG9ydD8oJzonK2RiLnBvcnQpOicnKVxuICAgICtcIi9cIitkYi5kYm5hbWVcbjtcbi8vQWRkIHBsdWdpbiB0byBtb25nb29zZSBcbm1vbmdvb3NlLnBsdWdpbih1bmlxdWVWYWxpZGF0b3IpO1xuLy9Db25uZWN0IHRvIE1vbmdvIGRiXG5tb25nb29zZS5jb25uZWN0KGRiQ29ubmVjdFVyaSk7XG5jb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBcIitkYkNvbm5lY3RVcmkpO1xuXG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1TdGFydCB0aGUgc2VydmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgc2VydiA9IGNvbmZpZy5zZXJ2ZXI7XG5hcHAubGlzdGVuKHNlcnYucG9ydCxzZXJ2Lmhvc3QpO1xuY29uc29sZS5sb2coXCJBcHAgbGlzdGVuaW5nIFwiK3NlcnYuaG9zdCtcIjpcIitzZXJ2LnBvcnQpOyJdfQ==