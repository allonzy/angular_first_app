"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("file-system");
const handlebars = require("express-handlebars");
const routing_controllers_1 = require("routing-controllers");
const uniqueValidator = require("mongoose-unique-validator");
exports.parameter = JSON.parse(fs.readFileSync('./config/parameter.json'));
exports.app = express();
exports.router = express.Router();
exports.app.use(express.static('/web'));
exports.app.use(bodyParser.urlencoded({ 'extended': 'true' }));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
exports.app.use(methodOverride());
var hbs = handlebars.create(exports.parameter.view.view_engine.handlebars);
if (exports.parameter.view.baseDir) {
    exports.app.set('views', __dirname + exports.parameter.view.directory);
}
exports.app.engine('hbs', hbs.engine);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsaURBQWlEO0FBQ2pELDZEQUFxRDtBQUNyRCw2REFBNEQ7QUFNakQsUUFBQSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUNuRSxRQUFBLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUd2QyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQU0xQixJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGlCQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRSxFQUFFLENBQUEsQ0FBQyxpQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO0lBQzFCLFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLFNBQVMsR0FBQyxpQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsV0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLFdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRzlCLE1BQU0sQ0FBQSxDQUFDLGlCQUFTLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUNyQixLQUFLLEtBQUs7UUFHVCxXQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQztJQUNQLEtBQUssTUFBTTtRQUdWLFdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakksS0FBSyxDQUFDO0FBQ1IsQ0FBQztBQUVELFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlCLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDO0lBQzdDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBQyxlQUFlLEdBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxHQUFDLGNBQWMsR0FBQyxNQUFNLEdBQUMsTUFBTTtVQUN2Ryx5QkFBeUIsQ0FBQztJQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUNyQixNQUFNLEVBQUMsTUFBTTtZQUNiLEtBQUssRUFBRSxHQUFHO1lBQ1YsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO1lBQ1osT0FBTyxFQUFDLGlCQUFTLENBQUMsT0FBTztTQUN6QixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUixNQUFNLEVBQUMsTUFBTTtZQUNiLEtBQUssRUFBQyxHQUFHO1lBQ1QsT0FBTyxFQUFDLGlCQUFTLENBQUMsT0FBTztTQUN6QixDQUFDLENBQUM7SUFDSixDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFHSCxJQUFJLEVBQUUsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFDLEtBQUs7TUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLEdBQUMsRUFBRSxDQUN2QztNQUNBLEVBQUUsQ0FBQyxJQUFJO01BQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7TUFDMUIsR0FBRyxHQUFDLEVBQUUsQ0FBQyxNQUFNLENBQ2pCO0FBRUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVqQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFDLFlBQVksQ0FBQyxDQUFDO0FBSTFDLHNDQUFnQixDQUFDLFdBQUcsRUFBRTtJQUNyQixtQkFBbUIsRUFBRSxLQUFLO0lBQ3ZCLFdBQVcsRUFBQyxDQUFDLFNBQVMsR0FBQywrQkFBK0IsQ0FBQztJQUN2RCxXQUFXLEVBQUUsQ0FBQyxTQUFTLEdBQUcseUNBQXlDLENBQUM7Q0FDdkUsQ0FBQyxDQUFDO0FBQ0gsV0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFNLENBQUMsQ0FBQztBQUdoQixJQUFJLElBQUksR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQztBQUM1QixXQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2VydmVyLmpzXG4vLyBpbXBvcnQgKiBhcyBwYXJhbWV0ZXIgZnJvbSAnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2V4cHJlc3MtaGFuZGxlYmFycyc7XG5pbXBvcnQge3VzZUV4cHJlc3NTZXJ2ZXJ9IGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5pbXBvcnQgKiBhcyB1bmlxdWVWYWxpZGF0b3IgZnJvbSdtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tJ2V4cHJlc3MtZXJyb3ItaGFuZGxlcidcblxuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuXG4vLyA9PT09PT09PT09PT09PUV4cG9ydCBjb21wb25lbnQsIChjYW4gYmUgbmVlZGVkIGZyb20gY29udHJvbGxlcnMpID09PT09PT09PT09PT09PT1cbmV4cG9ydCBsZXQgcGFyYW1ldGVyID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJykpO1xuZXhwb3J0IGxldCBhcHAgPSBleHByZXNzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgb3VyIGFwcCB3LyBleHByZXNzXG5leHBvcnQgY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXBwLnVzZShleHByZXNzLnN0YXRpYygnL3dlYicpKTsgICAgICAgICAgICAgICAgIFx0XHRcdFx0Ly8gc2V0IHRoZSBzdGF0aWMgZmlsZXMgbG9jYXRpb24gL3B1YmxpYy9pbWcgd2lsbCBiZSAvaW1nIGZvciB1c2Vyc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09IEhhbmRsZWJhcnMgKHRlbXBsYXRpbmcgc3lzdGVtKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQWRkIHRoZSBsYXlvdXQgc3lzdGVtIHRvIGhhbmRsZWJhcnNcblxuLy8gc2V0IHBhcmFtZXRlciBmcm9tIHBhcmFtZXRlci5qc29uXG52YXIgaGJzID0gaGFuZGxlYmFycy5jcmVhdGUocGFyYW1ldGVyLnZpZXcudmlld19lbmdpbmUuaGFuZGxlYmFycyk7XG5pZihwYXJhbWV0ZXIudmlldy5iYXNlRGlyKXtcblx0YXBwLnNldCgndmlld3MnLF9fZGlybmFtZStwYXJhbWV0ZXIudmlldy5kaXJlY3RvcnkpO1xufVxuXG5hcHAuZW5naW5lKCdoYnMnLCBoYnMuZW5naW5lKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hicycpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09RXJyb3IgaGFuZGxpbmcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuc3dpdGNoKHBhcmFtZXRlci5lbnYpe1xuXHRjYXNlICdkZXYnOlxuXHRcdC8vIGRldmVsb3BtZW50IGVycm9yIGhhbmRsZXJcblx0XHQvLyB3aWxsIHByaW50IHN0YWNrdHJhY2Vcblx0XHRhcHAudXNlKG1vcmdhbignZGV2JykpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0YnJlYWs7XHRcdFxuXHRjYXNlICdwcm9kJzpcblx0XHQvLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcblx0XHQvLyBubyBzdGFja3RyYWNlcyBsZWFrZWQgdG8gdXNlclxuXHRcdGFwcC51c2UobW9yZ2FuKCdjb21tb24nLCB7IHNraXA6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7IHJldHVybiByZXMuc3RhdHVzQ29kZSA8IDQwMCB9LCBzdHJlYW06IF9fZGlybmFtZSArICd2YXIvbG9ncy9wcm9kLmxvZycgfSkpO1xuXHRcdGJyZWFrO1xufVxuXG5hcHAudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpe1xuXHRjb25zb2xlLmxvZyhhcHAuZ2V0KCd2aWV3cycpKTtcblx0bGV0IHN0YXR1cyA9IChlcnIuaHR0cENvZGUpP2Vyci5odHRwQ29kZTo1MDA7XG5cdGxldCBlcnJvclBhZ2UgPSBmcy5leGlzdHNTeW5jKGFwcC5nZXQoJ3ZpZXdzJykrJy9lcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicycpPydlcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicydcblx0XHRcdDonZXJyb3ItcGFnZXMvZGVmYXVsdC5oYnMnO1xuXHRpZiAocmVxLmFjY2VwdHMoJ2h0bWwnKSkge1xuXHRcdHJlcy5yZW5kZXIoZXJyb3JQYWdlLCB7XG5cdFx0XHRzdGF0dXM6c3RhdHVzLFxuXHRcdFx0ZXJyb3I6IGVycixcblx0XHRcdHVybDogcmVxLnVybCxcblx0XHRcdGNvbnRhY3Q6cGFyYW1ldGVyLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxuXHRlbHNlIGlmIChyZXEuYWNjZXB0cygnanNvbicpKSB7XG5cdFx0cmVzLnNlbmQoe1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOmVycixcblx0XHRcdGNvbnRhY3Q6cGFyYW1ldGVyLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxufSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09IERhdGFiYXNlIGNvbm5lY3QgKG1vbmdvb3NlKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGRiID0gcGFyYW1ldGVyLmRhdGFiYXNlO1xubGV0IGRiQ29ubmVjdFVyaSA9IGRiLmRyaXZlcitcIjovL1wiXG4gICAgKygoZGIudXNlcm5hbWUgJiYgZGIucGFzc3dvcmQpP1xuICAgICAgICAoZGIudXNlcm5hbWUrJzonK2RiLnBhc3N3b3JkK1wiQFwiKTonJ1xuICAgIClcbiAgICArZGIuaG9zdFxuICAgICsoZGIucG9ydD8oJzonK2RiLnBvcnQpOicnKVxuICAgICtcIi9cIitkYi5kYm5hbWVcbjtcbi8vQWRkIHBsdWdpbiB0byBtb25nb29zZSBcbm1vbmdvb3NlLnBsdWdpbih1bmlxdWVWYWxpZGF0b3IpO1xuLy9Db25uZWN0IHRvIE1vbmdvIGRiXG5tb25nb29zZS5jb25uZWN0KGRiQ29ubmVjdFVyaSk7XG5jb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBcIitkYkNvbm5lY3RVcmkpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT0gU2V0IHVwIHRoZSByb3V0aW5nIG9mIHRoZSBhcHAgPT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUmVnaXN0ZXIgY29udHJvbGxlclxudXNlRXhwcmVzc1NlcnZlcihhcHAsIHtcblx0ZGVmYXVsdEVycm9ySGFuZGxlcjogZmFsc2UsIC8vIHdlIHVzZSBjdXN0b20gZXJyb3IgaGFuZGxlciBcbiAgICBjb250cm9sbGVyczpbX19kaXJuYW1lK1wiL2FwcC8qL2NvbnRyb2xsZXJzLyp7LmpzLC50c31cIl0sXG4gICAgbWlkZGxld2FyZXM6IFtfX2Rpcm5hbWUgKyBcIi9ub2RlX21vZHVsZXMvKiovbWlkZGxld2FyZXMvKnsuanMsLnRzfVwiXVxufSk7XG5hcHAudXNlKHJvdXRlcik7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09U3RhcnQgdGhlIHNlcnZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHNlcnYgPSBwYXJhbWV0ZXIuc2VydmVyO1xuYXBwLmxpc3RlbihzZXJ2LnBvcnQsc2Vydi5ob3N0KTtcbmNvbnNvbGUubG9nKFwiQXBwIGxpc3RlbmluZyBcIitzZXJ2Lmhvc3QrXCI6XCIrc2Vydi5wb3J0KTtcblxuIl19