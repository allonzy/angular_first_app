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
const http = require("http");
exports.parameter = JSON.parse(fs.readFileSync('./config/parameter.json'));
exports.app = express();
exports.router = express.Router();
var hbs = handlebars.create({
    extname: '.hbs',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/',
    defaultLayout: 'main'
});
exports.app.engine('hbs', hbs.engine);
exports.app.set('view engine', 'hbs');
exports.app.use(bodyParser.urlencoded({ 'extended': 'true' }));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
exports.app.use(methodOverride());
let server = http.createServer(exports.app);
exports.app.use(express.static('/public'));
switch (exports.parameter.env) {
    case 'dev':
        exports.app.use(morgan('dev'));
        break;
    case 'prod':
        exports.app.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400; }, stream: __dirname + 'var/logs/prod.log' }));
        break;
}
let db = exports.parameter.database;
let dbConnectUri = db.driver + "://"
    + ((db.username && db.password) ?
        (db.username + ':' + db.password + "@") : '')
    + db.host
    + (db.port ? (':' + db.port) : '')
    + "/" + db.dbname;
mongoose.plugin(uniqueValidator);
routing_controllers_1.useExpressServer(exports.app, {
    defaultErrorHandler: false,
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
mongoose.connect(dbConnectUri);
console.log("Connected to " + dbConnectUri);
exports.app.use(exports.router);
exports.app.use(function (req, res) {
    console.log(res);
});
exports.app.use(function (err, req, res, next) {
    res.status(500);
    if (req.accepts('html')) {
        res.render('error-pages/500.hbs', { error: err });
    }
    else if (req.accepts('json')) {
        res.send({ error: err });
    }
});
let serv = exports.parameter.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening on port " + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsaURBQWlEO0FBQ2pELDZEQUFxRDtBQUNyRCw2REFBNEQ7QUFDNUQsNkJBQTRCO0FBSWpCLFFBQUEsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7QUFDbkUsUUFBQSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDZCxRQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFJdkMsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQixPQUFPLEVBQUMsTUFBTTtJQUNYLFVBQVUsRUFBTyxnQkFBZ0I7SUFDakMsV0FBVyxFQUFNLGlCQUFpQjtJQUNsQyxhQUFhLEVBQUksTUFBTTtDQUMxQixDQUFDLENBQUM7QUFHSCxXQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNwRCxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUs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RUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQztBQUlILElBQUksSUFBSSxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDO0FBQzVCLFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbi8vIGltcG9ydCAqIGFzIHBhcmFtZXRlciBmcm9tICcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbic7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcbmltcG9ydCAqIGFzIGhhbmRsZWJhcnMgZnJvbSAnZXhwcmVzcy1oYW5kbGViYXJzJztcbmltcG9ydCB7dXNlRXhwcmVzc1NlcnZlcn0gZnJvbSBcInJvdXRpbmctY29udHJvbGxlcnNcIjtcbmltcG9ydCAqIGFzIHVuaXF1ZVZhbGlkYXRvciBmcm9tJ21vbmdvb3NlLXVuaXF1ZS12YWxpZGF0b3InO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiXG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSdleHByZXNzLWVycm9yLWhhbmRsZXInXG5kZWNsYXJlIHZhciBfX2Rpcm5hbWU7XG4gLy8gc2V0IHVwIGV4cHJlc3MgPT09PT09PT09PT09PT09PT09PT09PT09XG5leHBvcnQgbGV0IHBhcmFtZXRlciA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbicpKTtcbmV4cG9ydCBsZXQgYXBwID0gZXhwcmVzcygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIG91ciBhcHAgdy8gZXhwcmVzc1xuZXhwb3J0IGNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cblxuLy8gPT09PSBTZXR1cCBoYW5kbGViYXJzXG52YXIgaGJzID0gaGFuZGxlYmFycy5jcmVhdGUoe1xuXHRleHRuYW1lOicuaGJzJyxcbiAgICBsYXlvdXRzRGlyICAgICA6ICd2aWV3cy9sYXlvdXRzLycsXG4gICAgcGFydGlhbHNEaXIgICAgOiAndmlld3MvcGFydGlhbHMvJyxcbiAgICBkZWZhdWx0TGF5b3V0ICA6ICdtYWluJ1xufSk7XG4vLyBhcHAuc2V0KCd2aWV3cycsX19kaXJuYW1lK1wiL2FwcFwiKTtcbi8vIFJlZ2lzdGVyIGBoYnMuZW5naW5lYCB3aXRoIHRoZSBFeHByZXNzIGFwcC5cbmFwcC5lbmdpbmUoJ2hicycsIGhicy5lbmdpbmUpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaGJzJyk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7J2V4dGVuZGVkJzondHJ1ZSd9KSk7ICAgICAgICAgICAgLy8gcGFyc2UgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyc2UgYXBwbGljYXRpb24vanNvblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyB0eXBlOiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJyB9KSk7IC8vIHBhcnNlIGFwcGxpY2F0aW9uL3ZuZC5hcGkranNvbiBhcyBqc29uXG5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xuXG5sZXQgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuYXBwLnVzZShleHByZXNzLnN0YXRpYygnL3B1YmxpYycpKTsgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgc3RhdGljIGZpbGVzIGxvY2F0aW9uIC9wdWJsaWMvaW1nIHdpbGwgYmUgL2ltZyBmb3IgdXNlcnNcbnN3aXRjaChwYXJhbWV0ZXIuZW52KXtcblx0Y2FzZSAnZGV2Jzpcblx0XHRhcHAudXNlKG1vcmdhbignZGV2JykpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvZyBldmVyeSByZXF1ZXN0IHRvIHRoZSBjb25zb2xlXG5cdFx0Ly8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuXHRcdC8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXHRcdGJyZWFrO1xuXG5cdFx0XG5cdGNhc2UgJ3Byb2QnOlxuXHRcdGFwcC51c2UobW9yZ2FuKCdjb21tb24nLCB7IHNraXA6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7IHJldHVybiByZXMuc3RhdHVzQ29kZSA8IDQwMCB9LCBzdHJlYW06IF9fZGlybmFtZSArICd2YXIvbG9ncy9wcm9kLmxvZycgfSkpO1xuXHRcdGJyZWFrO1xuXG5cdFx0Ly8gcHJvZHVjdGlvbiBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gbm8gc3RhY2t0cmFjZXMgbGVha2VkIHRvIHVzZXJcbn1cblxuXG4vLyBkYiBjb25uZWN0ID09PT09PT09PT09PT09PT09XG5sZXQgZGIgPSBwYXJhbWV0ZXIuZGF0YWJhc2U7XG5sZXQgZGJDb25uZWN0VXJpID0gZGIuZHJpdmVyK1wiOi8vXCJcbiAgICArKChkYi51c2VybmFtZSAmJiBkYi5wYXNzd29yZCk/XG4gICAgICAgIChkYi51c2VybmFtZSsnOicrZGIucGFzc3dvcmQrXCJAXCIpOicnXG4gICAgKVxuICAgICtkYi5ob3N0XG4gICAgKyhkYi5wb3J0PygnOicrZGIucG9ydCk6JycpXG4gICAgK1wiL1wiK2RiLmRibmFtZVxuO1xuLy9BZGQgcGx1Z2luIHRvIG1vbmdvb3NlIFxubW9uZ29vc2UucGx1Z2luKHVuaXF1ZVZhbGlkYXRvcik7XG5cbi8vIGF1dG9sb2FkIGNvbnRyb2xsZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnVzZUV4cHJlc3NTZXJ2ZXIoYXBwLCB7XG5cdGRlZmF1bHRFcnJvckhhbmRsZXI6IGZhbHNlLFxuICAgIGNvbnRyb2xsZXJzOltfX2Rpcm5hbWUrXCIvYXBwLyovY29udHJvbGxlcnMvKnsuanMsLnRzfVwiXSxcbiAgICBtaWRkbGV3YXJlczogW19fZGlybmFtZSArIFwiL25vZGVfbW9kdWxlcy8qKi9taWRkbGV3YXJlcy8qey5qcywudHN9XCJdXG59KTtcbm1vbmdvb3NlLmNvbm5lY3QoZGJDb25uZWN0VXJpKTtcbmNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIFwiK2RiQ29ubmVjdFVyaSk7XG5cbmFwcC51c2Uocm91dGVyKTtcblxuLy8gSGFuZGxlIGVycm9yc1xuYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcyl7XG5cdGNvbnNvbGUubG9nKHJlcyk7XG59KTtcbmFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcyxuZXh0KSB7XG5cdHJlcy5zdGF0dXMoNTAwKTtcblx0aWYgKHJlcS5hY2NlcHRzKCdodG1sJykpIHtcblx0XHRyZXMucmVuZGVyKCdlcnJvci1wYWdlcy81MDAuaGJzJywge2Vycm9yOiBlcnJ9KTtcblx0fVxuXHRlbHNlIGlmIChyZXEuYWNjZXB0cygnanNvbicpKSB7XG5cdFx0cmVzLnNlbmQoe2Vycm9yOmVyciB9KTtcblx0fVxufSk7XG4vLyBsaXN0ZW4gKHN0YXJ0IGFwcCB3aXRoIG5vZGUgc2VydmVyLmpzKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbmxldCBzZXJ2ID0gcGFyYW1ldGVyLnNlcnZlcjtcbmFwcC5saXN0ZW4oc2Vydi5wb3J0LHNlcnYuaG9zdCk7XG5jb25zb2xlLmxvZyhcIkFwcCBsaXN0ZW5pbmcgb24gcG9ydCBcIitzZXJ2LnBvcnQpO1xuXG4iXX0=