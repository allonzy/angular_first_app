"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("file-system");
const handlebars = require("express-handlebars");
const routing_controllers_1 = require("routing-controllers");
const uniqueValidator = require("mongoose-unique-validator");
const http = require("http");
const errorHandler = require("express-error-handler");
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
let db = exports.parameter.database;
let dbConnectUri = db.driver + "://"
    + ((db.username && db.password) ?
        (db.username + ':' + db.password + "@") : '')
    + db.host
    + (db.port ? (':' + db.port) : '')
    + "/" + db.dbname;
mongoose.plugin(uniqueValidator);
routing_controllers_1.useExpressServer(exports.app, {
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/modules/**/middlewares/*{.js,.ts}"]
});
mongoose.connect(dbConnectUri);
console.log("Connected to " + dbConnectUri);
exports.app.get('/hello', function (req, res) {
    res.render('renderTodoList');
});
exports.app.use(function (req, res) {
    res.render('error-pages/error404', {
        url: req.url,
        contactMail: exports.parameter.contact.mail
    });
});
exports.app.use(function (err, req, res, next) {
    console.log(err);
    res.render('error-pages/error500', {
        error: err,
        contactMail: exports.parameter.contact.mail
    });
});
exports.app.use(exports.router);
exports.app.use(errorHandler({ server: server }));
let serv = exports.parameter.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening on port " + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBRW5DLDBDQUEwQztBQUMxQyxxQ0FBcUM7QUFDckMsa0RBQWtEO0FBQ2xELGtDQUFrQztBQUNsQyxpREFBaUQ7QUFDakQsNkRBQXFEO0FBQ3JELDZEQUE0RDtBQUM1RCw2QkFBNEI7QUFDNUIsc0RBQW9EO0FBR3pDLFFBQUEsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7QUFDbkUsUUFBQSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDZCxRQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFJdkMsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQixPQUFPLEVBQUMsTUFBTTtJQUNYLFVBQVUsRUFBTyxnQkFBZ0I7SUFDakMsV0FBVyxFQUFNLGlCQUFpQjtJQUNsQyxhQUFhLEVBQUksTUFBTTtDQUMxQixDQUFDLENBQUM7QUFHSCxXQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNwRCxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUs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ZnJvbSAnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2V4cHJlc3MtaGFuZGxlYmFycyc7XG5pbXBvcnQge3VzZUV4cHJlc3NTZXJ2ZXJ9IGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5pbXBvcnQgKiBhcyB1bmlxdWVWYWxpZGF0b3IgZnJvbSdtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIlxuaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20nZXhwcmVzcy1lcnJvci1oYW5kbGVyJ1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuIC8vIHNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBwYXJhbWV0ZXIgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nKSk7XG5leHBvcnQgbGV0IGFwcCA9IGV4cHJlc3MoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBvdXIgYXBwIHcvIGV4cHJlc3NcbmV4cG9ydCBjb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbi8vID09PT0gU2V0dXAgaGFuZGxlYmFyc1xudmFyIGhicyA9IGhhbmRsZWJhcnMuY3JlYXRlKHtcblx0ZXh0bmFtZTonLmhicycsXG4gICAgbGF5b3V0c0RpciAgICAgOiAndmlld3MvbGF5b3V0cy8nLFxuICAgIHBhcnRpYWxzRGlyICAgIDogJ3ZpZXdzL3BhcnRpYWxzLycsXG4gICAgZGVmYXVsdExheW91dCAgOiAnbWFpbidcbn0pO1xuLy8gYXBwLnNldCgndmlld3MnLF9fZGlybmFtZStcIi9hcHBcIik7XG4vLyBSZWdpc3RlciBgaGJzLmVuZ2luZWAgd2l0aCB0aGUgRXhwcmVzcyBhcHAuXG5hcHAuZW5naW5lKCdoYnMnLCBoYnMuZW5naW5lKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hicycpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxubGV0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy9wdWJsaWMnKSk7ICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHN0YXRpYyBmaWxlcyBsb2NhdGlvbiAvcHVibGljL2ltZyB3aWxsIGJlIC9pbWcgZm9yIHVzZXJzXG4vKnN3aXRjaChwYXJhbWV0ZXIuZW52KXtcblx0Y2FzZSAnZGV2Jzpcblx0XHRhcHAudXNlKG1vcmdhbignZGV2JykpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvZyBldmVyeSByZXF1ZXN0IHRvIHRoZSBjb25zb2xlXG5cdFx0Ly8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuXHRcdC8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXHRcdGJyZWFrO1xuXG5cdFx0XG5cdGNhc2UgJ3Byb2QnOlxuXHRcdGFwcC51c2UobW9yZ2FuKCdjb21tb24nLCB7IHNraXA6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7IHJldHVybiByZXMuc3RhdHVzQ29kZSA8IDQwMCB9LCBzdHJlYW06IF9fZGlybmFtZSArICd2YXIvbG9ncy9wcm9kLmxvZycgfSkpO1xuXHRcdGJyZWFrO1xuXG5cdFx0Ly8gcHJvZHVjdGlvbiBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gbm8gc3RhY2t0cmFjZXMgbGVha2VkIHRvIHVzZXJcbn1cbiovXG4vKlxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdOb3QgRm91bmQnKTtcbiAgICByZXMuc3RhdHVzID0gNDA0O1xuICAgIG5leHQoZXJyKTtcbn0pO1xuKi9cblxuXG5cbi8vIGRiIGNvbm5lY3QgPT09PT09PT09PT09PT09PT1cbmxldCBkYiA9IHBhcmFtZXRlci5kYXRhYmFzZTtcbmxldCBkYkNvbm5lY3RVcmkgPSBkYi5kcml2ZXIrXCI6Ly9cIlxuICAgICsoKGRiLnVzZXJuYW1lICYmIGRiLnBhc3N3b3JkKT9cbiAgICAgICAgKGRiLnVzZXJuYW1lKyc6JytkYi5wYXNzd29yZCtcIkBcIik6JydcbiAgICApXG4gICAgK2RiLmhvc3RcbiAgICArKGRiLnBvcnQ/KCc6JytkYi5wb3J0KTonJylcbiAgICArXCIvXCIrZGIuZGJuYW1lXG47XG4vL0FkZCBwbHVnaW4gdG8gbW9uZ29vc2UgXG5tb25nb29zZS5wbHVnaW4odW5pcXVlVmFsaWRhdG9yKTtcblxuLy8gYXV0b2xvYWQgY29udHJvbGxlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudXNlRXhwcmVzc1NlcnZlcihhcHAsIHtcbiAgICBjb250cm9sbGVyczpbX19kaXJuYW1lK1wiL2FwcC8qL2NvbnRyb2xsZXJzLyp7LmpzLC50c31cIl0sXG4gICAgbWlkZGxld2FyZXM6IFtfX2Rpcm5hbWUgKyBcIi9tb2R1bGVzLyoqL21pZGRsZXdhcmVzLyp7LmpzLC50c31cIl1cbn0pO1xubW9uZ29vc2UuY29ubmVjdChkYkNvbm5lY3RVcmkpO1xuY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gXCIrZGJDb25uZWN0VXJpKTtcbi8vdGVzdGluZyBwdXJwb3NlXG5hcHAuZ2V0KCcvaGVsbG8nLCBmdW5jdGlvbihyZXEsIHJlcyl7XG4gIFx0cmVzLnJlbmRlcigncmVuZGVyVG9kb0xpc3QnKTtcbn0pO1xuXG4vLyBsaXN0ZW4gKHN0YXJ0IGFwcCB3aXRoIG5vZGUgc2VydmVyLmpzKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcykge1xuXHRyZXMucmVuZGVyKCdlcnJvci1wYWdlcy9lcnJvcjQwNCcse1xuXHRcdHVybDpyZXEudXJsLFxuXHRcdGNvbnRhY3RNYWlsOnBhcmFtZXRlci5jb250YWN0Lm1haWxcblx0fSlcbn0pO1xuYXBwLnVzZShmdW5jdGlvbiAoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuXHRjb25zb2xlLmxvZyhlcnIpO1xuXHRyZXMucmVuZGVyKCdlcnJvci1wYWdlcy9lcnJvcjUwMCcse1xuXHRcdGVycm9yOmVycixcblx0XHRjb250YWN0TWFpbDpwYXJhbWV0ZXIuY29udGFjdC5tYWlsXG5cdH0pO1xufSk7XG5hcHAudXNlKHJvdXRlcik7XG5cbmFwcC51c2UoIGVycm9ySGFuZGxlcih7c2VydmVyOiBzZXJ2ZXJ9KSApO1xubGV0IHNlcnYgPSBwYXJhbWV0ZXIuc2VydmVyO1xuYXBwLmxpc3RlbihzZXJ2LnBvcnQsc2Vydi5ob3N0KTtcbmNvbnNvbGUubG9nKFwiQXBwIGxpc3RlbmluZyBvbiBwb3J0IFwiK3NlcnYucG9ydCk7Il19