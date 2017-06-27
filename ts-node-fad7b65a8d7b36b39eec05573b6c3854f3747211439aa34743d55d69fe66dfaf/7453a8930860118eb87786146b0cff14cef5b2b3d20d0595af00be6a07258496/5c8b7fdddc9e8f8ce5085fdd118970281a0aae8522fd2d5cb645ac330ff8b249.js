"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("file-system");
const express_handlebars = require("express-handlebars");
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
var hbs = express_handlebars.create(exports.parameter.view.view_engine.express_handlebars);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMseURBQXlEO0FBQ3pELDZEQUFxRDtBQUNyRCw2REFBNEQ7QUFNakQsUUFBQSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUNuRSxRQUFBLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUd2QyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQU0xQixJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQ2xDLGlCQUFTLENBQUMsSUFB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QyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDO01BQzFCLEdBQUcsR0FBQyxFQUFFLENBQUMsTUFBTSxDQUNqQjtBQUVELFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBQyxZQUFZLENBQUMsQ0FBQztBQUkxQyxzQ0FBZ0IsQ0FBQyxXQUFHLEVBQUU7SUFDckIsbUJBQW1CLEVBQUUsS0FBSztJQUN2QixXQUFXLEVBQUMsQ0FBQyxTQUFTLEdBQUMsK0JBQStCLENBQUM7SUFDdkQsV0FBVyxFQUFFLENBQUMsU0FBUyxHQUFHLHlDQUF5QyxDQUFDO0NBQ3ZFLENBQUMsQ0FBQztBQUNILFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBTSxDQUFDLENBQUM7QUFHaEIsSUFBSSxJQUFJLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUM7QUFDNUIsV0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlcnZlci5qc1xuLy8gaW1wb3J0ICogYXMgcGFyYW1ldGVyIGZyb20gJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJztcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgZXhwcmVzc19oYW5kbGViYXJzIGZyb20gJ2V4cHJlc3MtaGFuZGxlYmFycyc7XG5pbXBvcnQge3VzZUV4cHJlc3NTZXJ2ZXJ9IGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5pbXBvcnQgKiBhcyB1bmlxdWVWYWxpZGF0b3IgZnJvbSdtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tJ2V4cHJlc3MtZXJyb3ItaGFuZGxlcidcbmltcG9ydCAqIGFzIGxheW91dHMgZnJvbSAnaGFuZGxlYmFycy1sYXlvdXRzJztcbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcblxuLy8gPT09PT09PT09PT09PT1FeHBvcnQgY29tcG9uZW50LCAoY2FuIGJlIG5lZWRlZCBmcm9tIGNvbnRyb2xsZXJzKSA9PT09PT09PT09PT09PT09XG5leHBvcnQgbGV0IHBhcmFtZXRlciA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbicpKTtcbmV4cG9ydCBsZXQgYXBwID0gZXhwcmVzcygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIG91ciBhcHAgdy8gZXhwcmVzc1xuZXhwb3J0IGNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT1TZXQgdXAgZXhwcmVzcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy93ZWInKSk7ICAgICAgICAgICAgICAgICBcdFx0XHRcdC8vIHNldCB0aGUgc3RhdGljIGZpbGVzIGxvY2F0aW9uIC9wdWJsaWMvaW1nIHdpbGwgYmUgL2ltZyBmb3IgdXNlcnNcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsnZXh0ZW5kZWQnOid0cnVlJ30pKTsgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi9qc29uXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IHR5cGU6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nIH0pKTsgLy8gcGFyc2UgYXBwbGljYXRpb24vdm5kLmFwaStqc29uIGFzIGpzb25cbmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PSBIYW5kbGViYXJzICh0ZW1wbGF0aW5nIHN5c3RlbSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEFkZCB0aGUgbGF5b3V0IHN5c3RlbSB0byBoYW5kbGViYXJzXG4vLyBsZXQgaGVscGVycyA9IG51bGw7IC8vbGF5b3V0cyhoYW5kbGViYXJzKTtcbi8vIHNldCBwYXJhbWV0ZXIgZnJvbSBwYXJhbWV0ZXIuanNvblxudmFyIGhicyA9IGV4cHJlc3NfaGFuZGxlYmFycy5jcmVhdGUoLy9PYmplY3QuYXNzaWduKHt9LFxuXHRwYXJhbWV0ZXIudmlldy52aWV3X2VuZ2luZS5leHByZXNzX2hhbmRsZWJhcnNcblx0Ly97aGVscGVyczpoZWxwZXJzfVxuXHQvLylcbik7XG5pZihwYXJhbWV0ZXIudmlldy5iYXNlRGlyKXtcblx0YXBwLnNldCgndmlld3MnLF9fZGlybmFtZStwYXJhbWV0ZXIudmlldy5kaXJlY3RvcnkpO1xufVxuXG5hcHAuZW5naW5lKCdoYnMnLCBoYnMuZW5naW5lKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hicycpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09RXJyb3IgaGFuZGxpbmcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuc3dpdGNoKHBhcmFtZXRlci5lbnYpe1xuXHRjYXNlICdkZXYnOlxuXHRcdC8vIGRldmVsb3BtZW50IGVycm9yIGhhbmRsZXJcblx0XHQvLyB3aWxsIHByaW50IHN0YWNrdHJhY2Vcblx0XHRhcHAudXNlKG1vcmdhbignZGV2JykpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0YnJlYWs7XHRcdFxuXHRjYXNlICdwcm9kJzpcblx0XHQvLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcblx0XHQvLyBubyBzdGFja3RyYWNlcyBsZWFrZWQgdG8gdXNlclxuXHRcdGFwcC51c2UobW9yZ2FuKCdjb21tb24nLCB7IHNraXA6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7IHJldHVybiByZXMuc3RhdHVzQ29kZSA8IDQwMCB9LCBzdHJlYW06IF9fZGlybmFtZSArICd2YXIvbG9ncy9wcm9kLmxvZycgfSkpO1xuXHRcdGJyZWFrO1xufVxuXG5hcHAudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpe1xuXHRjb25zb2xlLmxvZyhhcHAuZ2V0KCd2aWV3cycpKTtcblx0bGV0IHN0YXR1cyA9IChlcnIuaHR0cENvZGUpP2Vyci5odHRwQ29kZTo1MDA7XG5cdHJlcy5zdGF0dXNzdGF0dXNcblx0bGV0IGVycm9yUGFnZSA9IGZzLmV4aXN0c1N5bmMoYXBwLmdldCgndmlld3MnKSsnL2Vycm9yLXBhZ2VzLycrc3RhdHVzKycuaGJzJyk/J2Vycm9yLXBhZ2VzLycrc3RhdHVzKycuaGJzJ1xuXHRcdFx0OidlcnJvci1wYWdlcy9kZWZhdWx0Lmhicyc7XG5cdGlmIChyZXEuYWNjZXB0cygnaHRtbCcpKSB7XG5cdFx0cmVzLnJlbmRlcihlcnJvclBhZ2UsIHtcblx0XHRcdHN0YXR1czpzdGF0dXMsXG5cdFx0XHRlcnJvcjogZXJyLFxuXHRcdFx0dXJsOiByZXEudXJsLFxuXHRcdFx0Y29udGFjdDpwYXJhbWV0ZXIuY29udGFjdFxuXHRcdH0pO1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5hY2NlcHRzKCdqc29uJykpIHtcblx0XHRyZXMuc2VuZCh7XG5cdFx0XHRzdGF0dXM6c3RhdHVzLFxuXHRcdFx0ZXJyb3I6ZXJyLFxuXHRcdFx0Y29udGFjdDpwYXJhbWV0ZXIuY29udGFjdFxuXHRcdH0pO1xuXHR9XG59KTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT0gRGF0YWJhc2UgY29ubmVjdCAobW9uZ29vc2UpID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgZGIgPSBwYXJhbWV0ZXIuZGF0YWJhc2U7XG5sZXQgZGJDb25uZWN0VXJpID0gZGIuZHJpdmVyK1wiOi8vXCJcbiAgICArKChkYi51c2VybmFtZSAmJiBkYi5wYXNzd29yZCk/XG4gICAgICAgIChkYi51c2VybmFtZSsnOicrZGIucGFzc3dvcmQrXCJAXCIpOicnXG4gICAgKVxuICAgICtkYi5ob3N0XG4gICAgKyhkYi5wb3J0PygnOicrZGIucG9ydCk6JycpXG4gICAgK1wiL1wiK2RiLmRibmFtZVxuO1xuLy9BZGQgcGx1Z2luIHRvIG1vbmdvb3NlIFxubW9uZ29vc2UucGx1Z2luKHVuaXF1ZVZhbGlkYXRvcik7XG4vL0Nvbm5lY3QgdG8gTW9uZ28gZGJcbm1vbmdvb3NlLmNvbm5lY3QoZGJDb25uZWN0VXJpKTtcbmNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIFwiK2RiQ29ubmVjdFVyaSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PSBTZXQgdXAgdGhlIHJvdXRpbmcgb2YgdGhlIGFwcCA9PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBSZWdpc3RlciBjb250cm9sbGVyXG51c2VFeHByZXNzU2VydmVyKGFwcCwge1xuXHRkZWZhdWx0RXJyb3JIYW5kbGVyOiBmYWxzZSwgLy8gd2UgdXNlIGN1c3RvbSBlcnJvciBoYW5kbGVyIFxuICAgIGNvbnRyb2xsZXJzOltfX2Rpcm5hbWUrXCIvYXBwLyovY29udHJvbGxlcnMvKnsuanMsLnRzfVwiXSxcbiAgICBtaWRkbGV3YXJlczogW19fZGlybmFtZSArIFwiL25vZGVfbW9kdWxlcy8qKi9taWRkbGV3YXJlcy8qey5qcywudHN9XCJdXG59KTtcbmFwcC51c2Uocm91dGVyKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1TdGFydCB0aGUgc2VydmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgc2VydiA9IHBhcmFtZXRlci5zZXJ2ZXI7XG5hcHAubGlzdGVuKHNlcnYucG9ydCxzZXJ2Lmhvc3QpO1xuY29uc29sZS5sb2coXCJBcHAgbGlzdGVuaW5nIFwiK3NlcnYuaG9zdCtcIjpcIitzZXJ2LnBvcnQpO1xuXG4iXX0=