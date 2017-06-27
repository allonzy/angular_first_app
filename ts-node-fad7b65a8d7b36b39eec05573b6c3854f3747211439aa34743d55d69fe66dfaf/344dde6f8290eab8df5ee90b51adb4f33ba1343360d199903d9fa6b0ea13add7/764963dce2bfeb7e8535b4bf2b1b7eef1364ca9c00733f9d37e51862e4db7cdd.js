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
var dir = 'app';
fs.readdir(dir, function (err, rootItems) {
    if (err) {
        throw new Error(err);
    }
    rootItems.forEach(function (file) {
        let path = dir + "/" + file;
        fs.stat(path, function (err, stat) {
            if (stat && stat.isDirectory()) {
                let rootDirName = file;
                let viewsDir = path + "/views/partials";
                if (fs.existsSync(viewsDir)) {
                    fs.readdir(viewsDir, function (err, viewsItems) {
                        if (err)
                            throw new Error(err);
                        viewsItems.forEach(function (file) {
                            console.log(file);
                        });
                    });
                }
            }
        });
    });
});
exports.parameter = JSON.parse(fs.readFileSync('./config/parameter.json'));
exports.app = express();
exports.router = express.Router();
exports.app.use(express.static('/web'));
exports.app.use(bodyParser.urlencoded({ 'extended': 'true' }));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
exports.app.use(methodOverride());
let hbsParam = exports.parameter.view.view_engine.handlebars;
hbs.registerHelper(layouts(handlebars));
if (hbsParam.partials_dir) {
    hbs.registerPartials(__dirname + "/" + hbsParam.partials_dir);
    hbs.registerPartials(__dirname + "app/");
}
if (exports.parameter.view.baseDir) {
    exports.app.set('views', [exports.parameter.view.directory, 'app/**/views/']);
}
exports.app.set('view engine', 'hbs');
switch (exports.parameter.env) {
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
            contact: exports.parameter.contact
        });
    }
    else if (req.accepts('json')) {
        res.send({
            status: status,
            error: err,
            contact: exports.parameter.contact
        });
    }
});
let db = exports.parameter.database;
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
let serv = exports.parameter.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening " + serv.host + ":" + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw2REFBcUQ7QUFDckQsNkRBQTREO0FBRTVELDhDQUE4QztBQUk5QyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDaEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFHLEVBQUUsU0FBUztJQUN2QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO1FBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7UUFFL0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFFNUIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSTtZQUVoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUEsQ0FBQztnQkFDL0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUMsaUJBQWlCLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUMzQixFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLEdBQUcsRUFBRSxVQUFVO3dCQUM3QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7NEJBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7NEJBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUNKLENBQUM7WUFDRixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBT1EsUUFBQSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUNuRSxRQUFBLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUd2QyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUcxQixJQUFJLFFBQVEsR0FBRyxpQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO0FBSXJELEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFHeEMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUM7SUFDekIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRSxHQUFHLEdBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUUsTUFBTSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELEVBQUUsQ0FBQSxDQUFDLGlCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7SUFDMUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxpQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRUQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFHOUIsTUFBTSxDQUFBLENBQUMsaUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQ3JCLEtBQUssS0FBSztRQUdULFdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkIsS0FBSyxDQUFDO0lBQ1AsS0FBSyxNQUFNO1FBR1YsV0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqSSxLQUFLLENBQUM7QUFDUixDQUFDO0FBRUQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7SUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUMsR0FBRyxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUM7SUFDN0MsR0FBRyxDQUFDLFlBQVksQ0FBQTtJQUNoQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUMsZUFBZSxHQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsR0FBQyxjQUFjLEdBQUMsTUFBTSxHQUFDLE1BQU07VUFDdkcseUJBQXlCLENBQUM7SUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDckIsTUFBTSxFQUFDLE1BQU07WUFDYixLQUFLLEVBQUUsR0FBRztZQUNWLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztZQUNaLE9BQU8sRUFBQyxpQkFBUyxDQUFDLE9BQU87U0FDekIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1IsTUFBTSxFQUFDLE1BQU07WUFDYixLQUFLLEVBQUMsR0FBRztZQUNULE9BQU8sRUFBQyxpQkFBUyxDQUFDLE9BQU87U0FDekIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxFQUFFLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLENBQUM7QUFDNUIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBQyxLQUFLO01BQzdCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDMUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsUUFBUSxHQUFDLEdBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FDdkM7TUFDQSxFQUFFLENBQUMsSUFBSTtNQUNQLENBQUMsRUFBRSxDQUFDLElBQUksR0FBQyxDQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDO01BQzFCLEdBQUcsR0FBQyxFQUFFLENBQUMsTUFBTSxDQUNqQjtBQUVELFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBQyxZQUFZLENBQUMsQ0FBQztBQUkxQyxzQ0FBZ0IsQ0FBQyxXQUFHLEVBQUU7SUFDckIsbUJBQW1CLEVBQUUsS0FBSztJQUN2QixXQUFXLEVBQUMsQ0FBQyxTQUFTLEdBQUMsK0JBQStCLENBQUM7SUFDdkQsV0FBVyxFQUFFLENBQUMsU0FBUyxHQUFHLHlDQUF5QyxDQUFDO0NBQ3ZFLENBQUMsQ0FBQztBQUNILFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBTSxDQUFDLENBQUM7QUFHaEIsSUFBSSxJQUFJLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUM7QUFDNUIsV0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlcnZlci5qc1xuLy8gaW1wb3J0ICogYXMgcGFyYW1ldGVyIGZyb20gJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJztcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgaGJzIGZyb20gJ2hicyc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0IHt1c2VFeHByZXNzU2VydmVyfSBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuaW1wb3J0ICogYXMgdW5pcXVlVmFsaWRhdG9yIGZyb20nbW9uZ29vc2UtdW5pcXVlLXZhbGlkYXRvcic7XG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSdleHByZXNzLWVycm9yLWhhbmRsZXInXG5pbXBvcnQgKiBhcyBsYXlvdXRzIGZyb20gJ2hhbmRsZWJhcnMtbGF5b3V0cyc7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBkaXIgPSAnYXBwJztcbmZzLnJlYWRkaXIoZGlyLCBmdW5jdGlvbiAoZXJyLCByb290SXRlbXMpIHtcblx0aWYgKGVycil7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGVycik7XG5cdH1cblx0Ly8gRm9yIGV2ZXJ5IGZpbGUgaW4gdGhlIGxpc3Rcblx0cm9vdEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcblx0XHQvLyBGdWxsIHBhdGggb2YgdGhhdCBmaWxlXG5cdFx0bGV0IHBhdGggPSBkaXIgKyBcIi9cIiArIGZpbGU7XG5cdFx0Ly8gR2V0IHRoZSBmaWxlJ3Mgc3RhdHNcblx0XHRmcy5zdGF0KHBhdGgsIGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcblx0XHRcdC8vIElmIHRoZSBmaWxlIGlzIGEgZGlyZWN0b3J5XG5cdFx0XHRpZiAoc3RhdCAmJiBzdGF0LmlzRGlyZWN0b3J5KCkpe1xuXHRcdFx0XHRsZXQgcm9vdERpck5hbWUgPSBmaWxlO1xuXHRcdFx0XHRsZXQgdmlld3NEaXIgPSBwYXRoK1wiL3ZpZXdzL3BhcnRpYWxzXCI7XG5cdFx0XHRcdGlmKGZzLmV4aXN0c1N5bmModmlld3NEaXIpKXtcblx0XHRcdFx0XHRmcy5yZWFkZGlyKHZpZXdzRGlyLCBmdW5jdGlvbiAoZXJyLCB2aWV3c0l0ZW1zKSB7XG5cdFx0XHRcdFx0XHRpZiAoZXJyKVxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdHZpZXdzSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhmaWxlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcblxuLy8gPT09PT09PT09PT09PT1FeHBvcnQgY29tcG9uZW50LCAoY2FuIGJlIG5lZWRlZCBmcm9tIGNvbnRyb2xsZXJzKSA9PT09PT09PT09PT09PT09XG5leHBvcnQgbGV0IHBhcmFtZXRlciA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbicpKTtcbmV4cG9ydCBsZXQgYXBwID0gZXhwcmVzcygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIG91ciBhcHAgdy8gZXhwcmVzc1xuZXhwb3J0IGNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT1TZXQgdXAgZXhwcmVzcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy93ZWInKSk7ICAgICAgICAgICAgICAgICBcdFx0XHRcdC8vIHNldCB0aGUgc3RhdGljIGZpbGVzIGxvY2F0aW9uIC9wdWJsaWMvaW1nIHdpbGwgYmUgL2ltZyBmb3IgdXNlcnNcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsnZXh0ZW5kZWQnOid0cnVlJ30pKTsgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi9qc29uXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IHR5cGU6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nIH0pKTsgLy8gcGFyc2UgYXBwbGljYXRpb24vdm5kLmFwaStqc29uIGFzIGpzb25cbmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PSBIYW5kbGViYXJzICh0ZW1wbGF0aW5nIHN5c3RlbSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBoYnNQYXJhbSA9IHBhcmFtZXRlci52aWV3LnZpZXdfZW5naW5lLmhhbmRsZWJhcnM7XG5cblxuLy8gQWRkIHRoZSBsYXlvdXQgc3lzdGVtIHRvIGhhbmRsZWJhcnNcbmhicy5yZWdpc3RlckhlbHBlcihsYXlvdXRzKGhhbmRsZWJhcnMpKTtcblxuLy8gc2V0IHBhcmFtZXRlciBmcm9tIHBhcmFtZXRlci5qc29uXG5pZihoYnNQYXJhbS5wYXJ0aWFsc19kaXIpe1xuXHRoYnMucmVnaXN0ZXJQYXJ0aWFscyhfX2Rpcm5hbWUgK1wiL1wiKyBoYnNQYXJhbS5wYXJ0aWFsc19kaXIpO1xuXHRoYnMucmVnaXN0ZXJQYXJ0aWFscyhfX2Rpcm5hbWUgK1wiYXBwL1wiKTtcbn1cblxuaWYocGFyYW1ldGVyLnZpZXcuYmFzZURpcil7XG5cdGFwcC5zZXQoJ3ZpZXdzJyxbcGFyYW1ldGVyLnZpZXcuZGlyZWN0b3J5LCdhcHAvKiovdmlld3MvJ10pO1xufVxuXG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYnMnKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PUVycm9yIGhhbmRsaW5nID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnN3aXRjaChwYXJhbWV0ZXIuZW52KXtcblx0Y2FzZSAnZGV2Jzpcblx0XHQvLyBkZXZlbG9wbWVudCBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gd2lsbCBwcmludCBzdGFja3RyYWNlXG5cdFx0YXBwLnVzZShtb3JnYW4oJ2RldicpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdGJyZWFrO1x0XHRcblx0Y2FzZSAncHJvZCc6XG5cdFx0Ly8gcHJvZHVjdGlvbiBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gbm8gc3RhY2t0cmFjZXMgbGVha2VkIHRvIHVzZXJcblx0XHRhcHAudXNlKG1vcmdhbignY29tbW9uJywgeyBza2lwOiBmdW5jdGlvbihyZXEsIHJlcykgeyByZXR1cm4gcmVzLnN0YXR1c0NvZGUgPCA0MDAgfSwgc3RyZWFtOiBfX2Rpcm5hbWUgKyAndmFyL2xvZ3MvcHJvZC5sb2cnIH0pKTtcblx0XHRicmVhaztcbn1cblxuYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KXtcblx0Y29uc29sZS5sb2coYXBwLmdldCgndmlld3MnKSk7XG5cdGxldCBzdGF0dXMgPSAoZXJyLmh0dHBDb2RlKT9lcnIuaHR0cENvZGU6NTAwO1xuXHRyZXMuc3RhdHVzc3RhdHVzXG5cdGxldCBlcnJvclBhZ2UgPSBmcy5leGlzdHNTeW5jKGFwcC5nZXQoJ3ZpZXdzJykrJy9lcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicycpPydlcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicydcblx0XHRcdDonZXJyb3ItcGFnZXMvZGVmYXVsdC5oYnMnO1xuXHRpZiAocmVxLmFjY2VwdHMoJ2h0bWwnKSkge1xuXHRcdHJlcy5yZW5kZXIoZXJyb3JQYWdlLCB7XG5cdFx0XHRzdGF0dXM6c3RhdHVzLFxuXHRcdFx0ZXJyb3I6IGVycixcblx0XHRcdHVybDogcmVxLnVybCxcblx0XHRcdGNvbnRhY3Q6cGFyYW1ldGVyLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxuXHRlbHNlIGlmIChyZXEuYWNjZXB0cygnanNvbicpKSB7XG5cdFx0cmVzLnNlbmQoe1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOmVycixcblx0XHRcdGNvbnRhY3Q6cGFyYW1ldGVyLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxufSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09IERhdGFiYXNlIGNvbm5lY3QgKG1vbmdvb3NlKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGRiID0gcGFyYW1ldGVyLmRhdGFiYXNlO1xubGV0IGRiQ29ubmVjdFVyaSA9IGRiLmRyaXZlcitcIjovL1wiXG4gICAgKygoZGIudXNlcm5hbWUgJiYgZGIucGFzc3dvcmQpP1xuICAgICAgICAoZGIudXNlcm5hbWUrJzonK2RiLnBhc3N3b3JkK1wiQFwiKTonJ1xuICAgIClcbiAgICArZGIuaG9zdFxuICAgICsoZGIucG9ydD8oJzonK2RiLnBvcnQpOicnKVxuICAgICtcIi9cIitkYi5kYm5hbWVcbjtcbi8vQWRkIHBsdWdpbiB0byBtb25nb29zZSBcbm1vbmdvb3NlLnBsdWdpbih1bmlxdWVWYWxpZGF0b3IpO1xuLy9Db25uZWN0IHRvIE1vbmdvIGRiXG5tb25nb29zZS5jb25uZWN0KGRiQ29ubmVjdFVyaSk7XG5jb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBcIitkYkNvbm5lY3RVcmkpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT0gU2V0IHVwIHRoZSByb3V0aW5nIG9mIHRoZSBhcHAgPT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUmVnaXN0ZXIgY29udHJvbGxlclxudXNlRXhwcmVzc1NlcnZlcihhcHAsIHtcblx0ZGVmYXVsdEVycm9ySGFuZGxlcjogZmFsc2UsIC8vIHdlIHVzZSBjdXN0b20gZXJyb3IgaGFuZGxlciBcbiAgICBjb250cm9sbGVyczpbX19kaXJuYW1lK1wiL2FwcC8qL2NvbnRyb2xsZXJzLyp7LmpzLC50c31cIl0sXG4gICAgbWlkZGxld2FyZXM6IFtfX2Rpcm5hbWUgKyBcIi9ub2RlX21vZHVsZXMvKiovbWlkZGxld2FyZXMvKnsuanMsLnRzfVwiXVxufSk7XG5hcHAudXNlKHJvdXRlcik7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09U3RhcnQgdGhlIHNlcnZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHNlcnYgPSBwYXJhbWV0ZXIuc2VydmVyO1xuYXBwLmxpc3RlbihzZXJ2LnBvcnQsc2Vydi5ob3N0KTtcbmNvbnNvbGUubG9nKFwiQXBwIGxpc3RlbmluZyBcIitzZXJ2Lmhvc3QrXCI6XCIrc2Vydi5wb3J0KTtcblxuIl19