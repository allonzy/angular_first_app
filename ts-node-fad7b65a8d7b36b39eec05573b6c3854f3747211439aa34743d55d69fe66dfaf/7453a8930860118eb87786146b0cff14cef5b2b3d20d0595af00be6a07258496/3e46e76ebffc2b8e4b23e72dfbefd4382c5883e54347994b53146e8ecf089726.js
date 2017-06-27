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
    hbs.registerPartials(__dirname + "app/**/views/partials");
}
if (exports.parameter.view.baseDir) {
    exports.app.set('views', __dirname + "/" + exports.parameter.view.directory);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw2REFBcUQ7QUFDckQsNkRBQTREO0FBRTVELDhDQUE4QztBQUluQyxRQUFBLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0FBQ25FLFFBQUEsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ2QsUUFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBR3ZDLFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBRzFCLElBQUksUUFBUSxHQUFHLGlCQUFTLENBQUMs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RUFBRSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzFCLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBQyxHQUFHLEdBQUMsRUFBRSxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUMsR0FBQyxFQUFFLENBQ3ZDO01BQ0EsRUFBRSxDQUFDLElBQUk7TUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxHQUFHLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQztNQUMxQixHQUFHLEdBQUMsRUFBRSxDQUFDLE1BQU0sQ0FDakI7QUFFRCxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRWpDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUMsWUFBWSxDQUFDLENBQUM7QUFJMUMsc0NBQWdCLENBQUMsV0FBRyxFQUFFO0lBQ3JCLG1CQUFtQixFQUFFLEtBQUs7SUFDdkIsV0FBVyxFQUFDLENBQUMsU0FBUyxHQUFDLCtCQUErQixDQUFDO0lBQ3ZELFdBQVcsRUFBRSxDQUFDLFNBQVMsR0FBRyx5Q0FBeUMsQ0FBQztDQUN2RSxDQUFDLENBQUM7QUFDSCxXQUFHLENBQUMsR0FBRyxDQUFDLGNBQU0sQ0FBQyxDQUFDO0FBR2hCLElBQUksSUFBSSxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDO0FBQzVCLFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbi8vIGltcG9ydCAqIGFzIHBhcmFtZXRlciBmcm9tICcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbic7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcbmltcG9ydCAqIGFzIGhicyBmcm9tICdoYnMnO1xuaW1wb3J0ICogYXMgaGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcbmltcG9ydCB7dXNlRXhwcmVzc1NlcnZlcn0gZnJvbSBcInJvdXRpbmctY29udHJvbGxlcnNcIjtcbmltcG9ydCAqIGFzIHVuaXF1ZVZhbGlkYXRvciBmcm9tJ21vbmdvb3NlLXVuaXF1ZS12YWxpZGF0b3InO1xuaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20nZXhwcmVzcy1lcnJvci1oYW5kbGVyJ1xuaW1wb3J0ICogYXMgbGF5b3V0cyBmcm9tICdoYW5kbGViYXJzLWxheW91dHMnO1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuXG4vLyA9PT09PT09PT09PT09PUV4cG9ydCBjb21wb25lbnQsIChjYW4gYmUgbmVlZGVkIGZyb20gY29udHJvbGxlcnMpID09PT09PT09PT09PT09PT1cbmV4cG9ydCBsZXQgcGFyYW1ldGVyID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJykpO1xuZXhwb3J0IGxldCBhcHAgPSBleHByZXNzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgb3VyIGFwcCB3LyBleHByZXNzXG5leHBvcnQgY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXBwLnVzZShleHByZXNzLnN0YXRpYygnL3dlYicpKTsgICAgICAgICAgICAgICAgIFx0XHRcdFx0Ly8gc2V0IHRoZSBzdGF0aWMgZmlsZXMgbG9jYXRpb24gL3B1YmxpYy9pbWcgd2lsbCBiZSAvaW1nIGZvciB1c2Vyc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09IEhhbmRsZWJhcnMgKHRlbXBsYXRpbmcgc3lzdGVtKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGhic1BhcmFtID0gcGFyYW1ldGVyLnZpZXcudmlld19lbmdpbmUuaGFuZGxlYmFycztcblxuXG4vLyBBZGQgdGhlIGxheW91dCBzeXN0ZW0gdG8gaGFuZGxlYmFyc1xuaGJzLnJlZ2lzdGVySGVscGVyKGxheW91dHMoaGFuZGxlYmFycykpO1xuXG4vLyBzZXQgcGFyYW1ldGVyIGZyb20gcGFyYW1ldGVyLmpzb25cbmlmKGhic1BhcmFtLnBhcnRpYWxzX2Rpcil7XG5cdGhicy5yZWdpc3RlclBhcnRpYWxzKF9fZGlybmFtZSArXCIvXCIrIGhic1BhcmFtLnBhcnRpYWxzX2Rpcik7XG5cdGhicy5yZWdpc3RlclBhcnRpYWxzKF9fZGlybmFtZSArXCJhcHAvKiovdmlld3MvcGFydGlhbHNcIik7XG59XG5cbmlmKHBhcmFtZXRlci52aWV3LmJhc2VEaXIpe1xuXHRhcHAuc2V0KCd2aWV3cycsX19kaXJuYW1lK1wiL1wiK3BhcmFtZXRlci52aWV3LmRpcmVjdG9yeSk7XG59XG5cbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hicycpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09RXJyb3IgaGFuZGxpbmcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuc3dpdGNoKHBhcmFtZXRlci5lbnYpe1xuXHRjYXNlICdkZXYnOlxuXHRcdC8vIGRldmVsb3BtZW50IGVycm9yIGhhbmRsZXJcblx0XHQvLyB3aWxsIHByaW50IHN0YWNrdHJhY2Vcblx0XHRhcHAudXNlKG1vcmdhbignZGV2JykpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0YnJlYWs7XHRcdFxuXHRjYXNlICdwcm9kJzpcblx0XHQvLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcblx0XHQvLyBubyBzdGFja3RyYWNlcyBsZWFrZWQgdG8gdXNlclxuXHRcdGFwcC51c2UobW9yZ2FuKCdjb21tb24nLCB7IHNraXA6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7IHJldHVybiByZXMuc3RhdHVzQ29kZSA8IDQwMCB9LCBzdHJlYW06IF9fZGlybmFtZSArICd2YXIvbG9ncy9wcm9kLmxvZycgfSkpO1xuXHRcdGJyZWFrO1xufVxuXG5hcHAudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpe1xuXHRjb25zb2xlLmxvZyhhcHAuZ2V0KCd2aWV3cycpKTtcblx0bGV0IHN0YXR1cyA9IChlcnIuaHR0cENvZGUpP2Vyci5odHRwQ29kZTo1MDA7XG5cdHJlcy5zdGF0dXNzdGF0dXNcblx0bGV0IGVycm9yUGFnZSA9IGZzLmV4aXN0c1N5bmMoYXBwLmdldCgndmlld3MnKSsnL2Vycm9yLXBhZ2VzLycrc3RhdHVzKycuaGJzJyk/J2Vycm9yLXBhZ2VzLycrc3RhdHVzKycuaGJzJ1xuXHRcdFx0OidlcnJvci1wYWdlcy9kZWZhdWx0Lmhicyc7XG5cdGlmIChyZXEuYWNjZXB0cygnaHRtbCcpKSB7XG5cdFx0cmVzLnJlbmRlcihlcnJvclBhZ2UsIHtcblx0XHRcdHN0YXR1czpzdGF0dXMsXG5cdFx0XHRlcnJvcjogZXJyLFxuXHRcdFx0dXJsOiByZXEudXJsLFxuXHRcdFx0Y29udGFjdDpwYXJhbWV0ZXIuY29udGFjdFxuXHRcdH0pO1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5hY2NlcHRzKCdqc29uJykpIHtcblx0XHRyZXMuc2VuZCh7XG5cdFx0XHRzdGF0dXM6c3RhdHVzLFxuXHRcdFx0ZXJyb3I6ZXJyLFxuXHRcdFx0Y29udGFjdDpwYXJhbWV0ZXIuY29udGFjdFxuXHRcdH0pO1xuXHR9XG59KTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT0gRGF0YWJhc2UgY29ubmVjdCAobW9uZ29vc2UpID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgZGIgPSBwYXJhbWV0ZXIuZGF0YWJhc2U7XG5sZXQgZGJDb25uZWN0VXJpID0gZGIuZHJpdmVyK1wiOi8vXCJcbiAgICArKChkYi51c2VybmFtZSAmJiBkYi5wYXNzd29yZCk/XG4gICAgICAgIChkYi51c2VybmFtZSsnOicrZGIucGFzc3dvcmQrXCJAXCIpOicnXG4gICAgKVxuICAgICtkYi5ob3N0XG4gICAgKyhkYi5wb3J0PygnOicrZGIucG9ydCk6JycpXG4gICAgK1wiL1wiK2RiLmRibmFtZVxuO1xuLy9BZGQgcGx1Z2luIHRvIG1vbmdvb3NlIFxubW9uZ29vc2UucGx1Z2luKHVuaXF1ZVZhbGlkYXRvcik7XG4vL0Nvbm5lY3QgdG8gTW9uZ28gZGJcbm1vbmdvb3NlLmNvbm5lY3QoZGJDb25uZWN0VXJpKTtcbmNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIFwiK2RiQ29ubmVjdFVyaSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PSBTZXQgdXAgdGhlIHJvdXRpbmcgb2YgdGhlIGFwcCA9PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBSZWdpc3RlciBjb250cm9sbGVyXG51c2VFeHByZXNzU2VydmVyKGFwcCwge1xuXHRkZWZhdWx0RXJyb3JIYW5kbGVyOiBmYWxzZSwgLy8gd2UgdXNlIGN1c3RvbSBlcnJvciBoYW5kbGVyIFxuICAgIGNvbnRyb2xsZXJzOltfX2Rpcm5hbWUrXCIvYXBwLyovY29udHJvbGxlcnMvKnsuanMsLnRzfVwiXSxcbiAgICBtaWRkbGV3YXJlczogW19fZGlybmFtZSArIFwiL25vZGVfbW9kdWxlcy8qKi9taWRkbGV3YXJlcy8qey5qcywudHN9XCJdXG59KTtcbmFwcC51c2Uocm91dGVyKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1TdGFydCB0aGUgc2VydmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgc2VydiA9IHBhcmFtZXRlci5zZXJ2ZXI7XG5hcHAubGlzdGVuKHNlcnYucG9ydCxzZXJ2Lmhvc3QpO1xuY29uc29sZS5sb2coXCJBcHAgbGlzdGVuaW5nIFwiK3NlcnYuaG9zdCtcIjpcIitzZXJ2LnBvcnQpO1xuXG4iXX0=