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
exports.app.use(function (err, req, res, next) {
    res.status(err.httpCode);
    let errorPage = fs.existsSync(exports.app.get('views') + err.httpCode + '.hbs') ? 'error-pages/' + err.httpCode + '.hbs'
        : 'error-pages/default.hbs';
    if (req.accepts('html')) {
        res.render(errorPage, {
            error: err,
            url: req.url,
            contact: exports.parameter.contact
        });
    }
    else if (req.accepts('json')) {
        res.send({
            error: err,
            contact: exports.parameter.contact
        });
    }
});
let serv = exports.parameter.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening on port " + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsaURBQWlEO0FBQ2pELDZEQUFxRDtBQUNyRCw2REFBNEQ7QUFDNUQsNkJBQTRCO0FBSWpCLFFBQUEsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7QUFDbkUsUUFBQSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDZCxRQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFJdkMsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQixPQUFPLEVBQUMsTUFBTTtJQUNYLFVBQVUsRUFBTyxnQkFBZ0I7SUFDakMsV0FBVyxFQUFNLGlCQUFpQjtJQUNsQyxhQUFhLEVBQUksTUFBTTtDQUMxQixDQUFDLENBQUM7QUFHSCxXQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNwRCxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUs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LENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUixLQUFLLEVBQUMsR0FBRztZQUNULE9BQU8sRUFBQyxpQkFBUyxDQUFDLE9BQU87U0FDekIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxJQUFJLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUM7QUFDNUIsV0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlcnZlci5qc1xuLy8gaW1wb3J0ICogYXMgcGFyYW1ldGVyIGZyb20gJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJztcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgaGFuZGxlYmFycyBmcm9tICdleHByZXNzLWhhbmRsZWJhcnMnO1xuaW1wb3J0IHt1c2VFeHByZXNzU2VydmVyfSBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuaW1wb3J0ICogYXMgdW5pcXVlVmFsaWRhdG9yIGZyb20nbW9uZ29vc2UtdW5pcXVlLXZhbGlkYXRvcic7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCJcbmltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tJ2V4cHJlc3MtZXJyb3ItaGFuZGxlcidcbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcbiAvLyBzZXQgdXAgZXhwcmVzcyA9PT09PT09PT09PT09PT09PT09PT09PT1cbmV4cG9ydCBsZXQgcGFyYW1ldGVyID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJykpO1xuZXhwb3J0IGxldCBhcHAgPSBleHByZXNzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgb3VyIGFwcCB3LyBleHByZXNzXG5leHBvcnQgY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuXG4vLyA9PT09IFNldHVwIGhhbmRsZWJhcnNcbnZhciBoYnMgPSBoYW5kbGViYXJzLmNyZWF0ZSh7XG5cdGV4dG5hbWU6Jy5oYnMnLFxuICAgIGxheW91dHNEaXIgICAgIDogJ3ZpZXdzL2xheW91dHMvJyxcbiAgICBwYXJ0aWFsc0RpciAgICA6ICd2aWV3cy9wYXJ0aWFscy8nLFxuICAgIGRlZmF1bHRMYXlvdXQgIDogJ21haW4nXG59KTtcbi8vIGFwcC5zZXQoJ3ZpZXdzJyxfX2Rpcm5hbWUrXCIvYXBwXCIpO1xuLy8gUmVnaXN0ZXIgYGhicy5lbmdpbmVgIHdpdGggdGhlIEV4cHJlc3MgYXBwLlxuYXBwLmVuZ2luZSgnaGJzJywgaGJzLmVuZ2luZSk7XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYnMnKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsnZXh0ZW5kZWQnOid0cnVlJ30pKTsgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi9qc29uXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IHR5cGU6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nIH0pKTsgLy8gcGFyc2UgYXBwbGljYXRpb24vdm5kLmFwaStqc29uIGFzIGpzb25cbmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbmxldCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCcvcHVibGljJykpOyAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBzdGF0aWMgZmlsZXMgbG9jYXRpb24gL3B1YmxpYy9pbWcgd2lsbCBiZSAvaW1nIGZvciB1c2Vyc1xuc3dpdGNoKHBhcmFtZXRlci5lbnYpe1xuXHRjYXNlICdkZXYnOlxuXHRcdGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9nIGV2ZXJ5IHJlcXVlc3QgdG8gdGhlIGNvbnNvbGVcblx0XHQvLyBkZXZlbG9wbWVudCBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gd2lsbCBwcmludCBzdGFja3RyYWNlXG5cdFx0YnJlYWs7XG5cblx0XHRcblx0Y2FzZSAncHJvZCc6XG5cdFx0YXBwLnVzZShtb3JnYW4oJ2NvbW1vbicsIHsgc2tpcDogZnVuY3Rpb24ocmVxLCByZXMpIHsgcmV0dXJuIHJlcy5zdGF0dXNDb2RlIDwgNDAwIH0sIHN0cmVhbTogX19kaXJuYW1lICsgJ3Zhci9sb2dzL3Byb2QubG9nJyB9KSk7XG5cdFx0YnJlYWs7XG5cblx0XHQvLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcblx0XHQvLyBubyBzdGFja3RyYWNlcyBsZWFrZWQgdG8gdXNlclxufVxuXG5cbi8vIGRiIGNvbm5lY3QgPT09PT09PT09PT09PT09PT1cbmxldCBkYiA9IHBhcmFtZXRlci5kYXRhYmFzZTtcbmxldCBkYkNvbm5lY3RVcmkgPSBkYi5kcml2ZXIrXCI6Ly9cIlxuICAgICsoKGRiLnVzZXJuYW1lICYmIGRiLnBhc3N3b3JkKT9cbiAgICAgICAgKGRiLnVzZXJuYW1lKyc6JytkYi5wYXNzd29yZCtcIkBcIik6JydcbiAgICApXG4gICAgK2RiLmhvc3RcbiAgICArKGRiLnBvcnQ/KCc6JytkYi5wb3J0KTonJylcbiAgICArXCIvXCIrZGIuZGJuYW1lXG47XG4vL0FkZCBwbHVnaW4gdG8gbW9uZ29vc2UgXG5tb25nb29zZS5wbHVnaW4odW5pcXVlVmFsaWRhdG9yKTtcblxuLy8gYXV0b2xvYWQgY29udHJvbGxlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudXNlRXhwcmVzc1NlcnZlcihhcHAsIHtcblx0ZGVmYXVsdEVycm9ySGFuZGxlcjogZmFsc2UsXG4gICAgY29udHJvbGxlcnM6W19fZGlybmFtZStcIi9hcHAvKi9jb250cm9sbGVycy8qey5qcywudHN9XCJdLFxuICAgIG1pZGRsZXdhcmVzOiBbX19kaXJuYW1lICsgXCIvbm9kZV9tb2R1bGVzLyoqL21pZGRsZXdhcmVzLyp7LmpzLC50c31cIl1cbn0pO1xubW9uZ29vc2UuY29ubmVjdChkYkNvbm5lY3RVcmkpO1xuY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gXCIrZGJDb25uZWN0VXJpKTtcblxuYXBwLnVzZShyb3V0ZXIpO1xuXG5hcHAudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpe1xuXHRyZXMuc3RhdHVzKGVyci5odHRwQ29kZSk7XG5cdGxldCBlcnJvclBhZ2UgPSBmcy5leGlzdHNTeW5jKGFwcC5nZXQoJ3ZpZXdzJykrZXJyLmh0dHBDb2RlKycuaGJzJyk/J2Vycm9yLXBhZ2VzLycrZXJyLmh0dHBDb2RlKycuaGJzJ1xuXHRcdFx0OidlcnJvci1wYWdlcy9kZWZhdWx0Lmhicyc7XG5cdGlmIChyZXEuYWNjZXB0cygnaHRtbCcpKSB7XG5cdFx0cmVzLnJlbmRlcihlcnJvclBhZ2UsIHtcblx0XHRcdGVycm9yOiBlcnIsXG5cdFx0XHR1cmw6IHJlcS51cmwsXG5cdFx0XHRjb250YWN0OnBhcmFtZXRlci5jb250YWN0XG5cdFx0fSk7XG5cdH1cblx0ZWxzZSBpZiAocmVxLmFjY2VwdHMoJ2pzb24nKSkge1xuXHRcdHJlcy5zZW5kKHtcblx0XHRcdGVycm9yOmVycixcblx0XHRcdGNvbnRhY3Q6cGFyYW1ldGVyLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxufSk7XG4vLyBsaXN0ZW4gKHN0YXJ0IGFwcCB3aXRoIG5vZGUgc2VydmVyLmpzKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHNlcnYgPSBwYXJhbWV0ZXIuc2VydmVyO1xuYXBwLmxpc3RlbihzZXJ2LnBvcnQsc2Vydi5ob3N0KTtcbmNvbnNvbGUubG9nKFwiQXBwIGxpc3RlbmluZyBvbiBwb3J0IFwiK3NlcnYucG9ydCk7XG5cbiJdfQ==