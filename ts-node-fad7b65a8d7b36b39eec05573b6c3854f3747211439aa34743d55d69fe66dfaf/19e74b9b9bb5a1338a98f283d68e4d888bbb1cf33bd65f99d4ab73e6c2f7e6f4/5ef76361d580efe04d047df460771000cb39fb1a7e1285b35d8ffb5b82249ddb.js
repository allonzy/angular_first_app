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
exports.app.use(exports.router);
exports.app.use(function (req, res) {
    if (req.accepts('html') && res.status(404)) {
        res.render('error-pages/error404', {
            url: req.url,
            contactMail: exports.parameter.contact.mail
        });
    }
});
let serv = exports.parameter.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening on port " + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBRW5DLDBDQUEwQztBQUMxQyxxQ0FBcUM7QUFDckMsa0RBQWtEO0FBQ2xELGtDQUFrQztBQUNsQyxpREFBaUQ7QUFDakQsNkRBQXFEO0FBQ3JELDZEQUE0RDtBQUM1RCw2QkFBNEI7QUFJakIsUUFBQSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUNuRSxRQUFBLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUl2QyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQzNCLE9BQU8sRUFBQyxNQUFNO0lBQ1gsVUFBVSxFQUFPLGdCQUFnQjtJQUNqQyxXQUFXLEVBQU0saUJBQWlCO0lBQ2xDLGFBQWEsRUFBSSxNQUFNO0NBQzFCLENBQUMsQ0FBQztBQUdILFdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixXQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUUxQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQUcsQ0FBQyxDQUFDO0FBSXBDLFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBOEJuQyxJQUFJLEVBQUUsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFDLEtBQUs7TUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLEdBQUMsRUFBRSxDQUN2QztNQUNBLEVBQUUsQ0FBQyxJQUFJO01BQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7TUFDMUIsR0FBRyxHQUFDLEVBQUUsQ0FBQyxNQUFNLENBQ2pCO0FBRUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUdqQyxzQ0FBZ0IsQ0FBQyxXQUFHLEVBQUU7SUFDbEIsV0FBVyxFQUFDLENBQUMsU0FBUyxHQUFDLCtCQUErQixDQUFDO0lBQ3ZELFdBQVcsRUFBRSxDQUFDLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztDQUNsRSxDQUFDLENBQUM7QUFDSCxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBTSxDQUFDLENBQUM7QUFHaEIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ3hCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBQztZQUNqQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUc7WUFDWCxXQUFXLEVBQUMsaUJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSTtTQUNsQyxDQUFDLENBQUE7SUFDSCxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFZSCxJQUFJLElBQUksR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQztBQUM1QixXQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2VydmVyLmpzXG4vLyBpbXBvcnQgKiBhcyBwYXJhbWV0ZXIgZnJvbSAnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2V4cHJlc3MtaGFuZGxlYmFycyc7XG5pbXBvcnQge3VzZUV4cHJlc3NTZXJ2ZXJ9IGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5pbXBvcnQgKiBhcyB1bmlxdWVWYWxpZGF0b3IgZnJvbSdtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIlxuaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20nZXhwcmVzcy1lcnJvci1oYW5kbGVyJ1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuIC8vIHNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBwYXJhbWV0ZXIgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nKSk7XG5leHBvcnQgbGV0IGFwcCA9IGV4cHJlc3MoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBvdXIgYXBwIHcvIGV4cHJlc3NcbmV4cG9ydCBjb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbi8vID09PT0gU2V0dXAgaGFuZGxlYmFyc1xudmFyIGhicyA9IGhhbmRsZWJhcnMuY3JlYXRlKHtcblx0ZXh0bmFtZTonLmhicycsXG4gICAgbGF5b3V0c0RpciAgICAgOiAndmlld3MvbGF5b3V0cy8nLFxuICAgIHBhcnRpYWxzRGlyICAgIDogJ3ZpZXdzL3BhcnRpYWxzLycsXG4gICAgZGVmYXVsdExheW91dCAgOiAnbWFpbidcbn0pO1xuLy8gYXBwLnNldCgndmlld3MnLF9fZGlybmFtZStcIi9hcHBcIik7XG4vLyBSZWdpc3RlciBgaGJzLmVuZ2luZWAgd2l0aCB0aGUgRXhwcmVzcyBhcHAuXG5hcHAuZW5naW5lKCdoYnMnLCBoYnMuZW5naW5lKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hicycpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxubGV0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy9wdWJsaWMnKSk7ICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHN0YXRpYyBmaWxlcyBsb2NhdGlvbiAvcHVibGljL2ltZyB3aWxsIGJlIC9pbWcgZm9yIHVzZXJzXG4vKnN3aXRjaChwYXJhbWV0ZXIuZW52KXtcblx0Y2FzZSAnZGV2Jzpcblx0XHRhcHAudXNlKG1vcmdhbignZGV2JykpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvZyBldmVyeSByZXF1ZXN0IHRvIHRoZSBjb25zb2xlXG5cdFx0Ly8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuXHRcdC8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXHRcdGJyZWFrO1xuXG5cdFx0XG5cdGNhc2UgJ3Byb2QnOlxuXHRcdGFwcC51c2UobW9yZ2FuKCdjb21tb24nLCB7IHNraXA6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7IHJldHVybiByZXMuc3RhdHVzQ29kZSA8IDQwMCB9LCBzdHJlYW06IF9fZGlybmFtZSArICd2YXIvbG9ncy9wcm9kLmxvZycgfSkpO1xuXHRcdGJyZWFrO1xuXG5cdFx0Ly8gcHJvZHVjdGlvbiBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gbm8gc3RhY2t0cmFjZXMgbGVha2VkIHRvIHVzZXJcbn1cbiovXG4vKlxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdOb3QgRm91bmQnKTtcbiAgICByZXMuc3RhdHVzID0gNDA0O1xuICAgIG5leHQoZXJyKTtcbn0pO1xuYXBwLnVzZSggZXJyb3JIYW5kbGVyKHtzZXJ2ZXI6IHNlcnZlcn0pICk7XG5cbiovXG5cblxuXG4vLyBkYiBjb25uZWN0ID09PT09PT09PT09PT09PT09XG5sZXQgZGIgPSBwYXJhbWV0ZXIuZGF0YWJhc2U7XG5sZXQgZGJDb25uZWN0VXJpID0gZGIuZHJpdmVyK1wiOi8vXCJcbiAgICArKChkYi51c2VybmFtZSAmJiBkYi5wYXNzd29yZCk/XG4gICAgICAgIChkYi51c2VybmFtZSsnOicrZGIucGFzc3dvcmQrXCJAXCIpOicnXG4gICAgKVxuICAgICtkYi5ob3N0XG4gICAgKyhkYi5wb3J0PygnOicrZGIucG9ydCk6JycpXG4gICAgK1wiL1wiK2RiLmRibmFtZVxuO1xuLy9BZGQgcGx1Z2luIHRvIG1vbmdvb3NlIFxubW9uZ29vc2UucGx1Z2luKHVuaXF1ZVZhbGlkYXRvcik7XG5cbi8vIGF1dG9sb2FkIGNvbnRyb2xsZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnVzZUV4cHJlc3NTZXJ2ZXIoYXBwLCB7XG4gICAgY29udHJvbGxlcnM6W19fZGlybmFtZStcIi9hcHAvKi9jb250cm9sbGVycy8qey5qcywudHN9XCJdLFxuICAgIG1pZGRsZXdhcmVzOiBbX19kaXJuYW1lICsgXCIvbW9kdWxlcy8qKi9taWRkbGV3YXJlcy8qey5qcywudHN9XCJdXG59KTtcbm1vbmdvb3NlLmNvbm5lY3QoZGJDb25uZWN0VXJpKTtcbmNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIFwiK2RiQ29ubmVjdFVyaSk7XG5hcHAudXNlKHJvdXRlcik7XG5cbi8vIGxpc3RlbiAoc3RhcnQgYXBwIHdpdGggbm9kZSBzZXJ2ZXIuanMpID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hcHAudXNlKGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG5cdGlmKHJlcS5hY2NlcHRzKCdodG1sJykgJiYgcmVzLnN0YXR1cyg0MDQpKSB7XG5cdFx0cmVzLnJlbmRlcignZXJyb3ItcGFnZXMvZXJyb3I0MDQnLHtcblx0XHRcdHVybDpyZXEudXJsLFxuXHRcdFx0Y29udGFjdE1haWw6cGFyYW1ldGVyLmNvbnRhY3QubWFpbFxuXHRcdH0pXG5cdH1cbn0pO1xuLypcbmFwcC51c2UoZnVuY3Rpb24gKGVyciwgcmVxLCByZXMsIG5leHQpIHtcblx0aWYgKHJlcS5hY2NlcHRzKCdodG1sJykgJiYgZXJyKXtcblx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdHJlcy5yZW5kZXIoJ2Vycm9yLXBhZ2VzL2Vycm9yNTAwJyx7XG5cdFx0XHRlcnJvcjplcnIsXG5cdFx0XHRjb250YWN0TWFpbDpwYXJhbWV0ZXIuY29udGFjdC5tYWlsXG5cdFx0fSk7XG5cdH1cbn0pO1xuKi9cbmxldCBzZXJ2ID0gcGFyYW1ldGVyLnNlcnZlcjtcbmFwcC5saXN0ZW4oc2Vydi5wb3J0LHNlcnYuaG9zdCk7XG5jb25zb2xlLmxvZyhcIkFwcCBsaXN0ZW5pbmcgb24gcG9ydCBcIitzZXJ2LnBvcnQpOyJdfQ==