"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
// import * as parameter from './config/parameter.json';
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var fs = require("file-system");
var Factory_1 = require("controllers.ts/Factory");
// set up express ========================
var parameter = JSON.parse(fs.readFileSync('./config/parameter.json'));
var app = express(); // create our app w/ express
var router = express.Router();
app.use(express.static('/public')); // set the static files location /public/img will be /img for users
app.use(morgan(parameter.env)); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(router);
// db connect =================
var db = parameter.database;
var dbConnectUri = db.driver + "://"
    + ((db.username && db.password) ?
        (db.username + ':' + db.password + "@") : '')
    + db.host
    + (db.port ? (':' + db.port) : '')
    + "/" + db.dbname;
mongoose.connect(dbConnectUri);
console.log("Connected to " + dbConnectUri);
// autoload model
// autoload controllers -------------------------------------------------------------
Factory_1.registerActionsInExpressApp(app, [__dirname + "/app/todo-list"]);
//registerActionsInExpressApp(app, ["./app/todo-list/"]);
// listen (start app with node server.js) ======================================
var serv = parameter.server;
app.listen(serv.port, serv.host);
console.log("App listening on port " + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxZQUFZO0FBQ1osd0RBQXdEO0FBQ3hELGlDQUFtQztBQUNuQywrQkFBaUM7QUFDakMsd0NBQTBDO0FBQzFDLG1DQUFxQztBQUNyQyxnREFBa0Q7QUFFbEQsZ0NBQWtDO0FBQ2xDLGtEQUFtRTtBQUdsRSwwQ0FBMEM7QUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUN2RSxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUE0Qyw0QkFBNEI7QUFDNUYsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQWlCLG1FQUFtRTtBQUN2SCxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFpQyxtQ0FBbUM7QUFDbkcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFZLDBDQUEwQztBQUMxRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQXFDLHlCQUF5QjtBQUN6RixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7QUFDekcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDZiwrQkFBK0I7QUFDL0IsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFDLEtBQUs7TUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLEdBQUMsRUFBRSxDQUN2QztNQUNBLEVBQUUsQ0FBQyxJQUFJO01BQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7TUFDMUIsR0FBRyxHQUFDLEVBQUUsQ0FBQyxNQUFNLENBQ2pCO0FBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBQyxZQUFZLENBQUMsQ0FBQTtBQUV6QyxpQkFBaUI7QUFFakIscUZBQXFGO0FBQ3JGLHFDQUEyQixDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFFakUseURBQXlEO0FBQ3pELGdGQUFnRjtBQUNoRixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbi8vIGltcG9ydCAqIGFzIHBhcmFtZXRlciBmcm9tICcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbic7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbmltcG9ydCAqIGFzIHJlc3RpZnkgZnJvbSAnZXhwcmVzcy1yZXN0aWZ5LW1vbmdvb3NlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcbmltcG9ydCB7cmVnaXN0ZXJBY3Rpb25zSW5FeHByZXNzQXBwfSBmcm9tIFwiY29udHJvbGxlcnMudHMvRmFjdG9yeVwiO1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuXG4gLy8gc2V0IHVwIGV4cHJlc3MgPT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgcGFyYW1ldGVyID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJykpO1xubGV0IGFwcCA9IGV4cHJlc3MoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBvdXIgYXBwIHcvIGV4cHJlc3NcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKClcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy9wdWJsaWMnKSk7ICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHN0YXRpYyBmaWxlcyBsb2NhdGlvbiAvcHVibGljL2ltZyB3aWxsIGJlIC9pbWcgZm9yIHVzZXJzXG5hcHAudXNlKG1vcmdhbihwYXJhbWV0ZXIuZW52KSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9nIGV2ZXJ5IHJlcXVlc3QgdG8gdGhlIGNvbnNvbGVcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsnZXh0ZW5kZWQnOid0cnVlJ30pKTsgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi9qc29uXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IHR5cGU6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nIH0pKTsgLy8gcGFyc2UgYXBwbGljYXRpb24vdm5kLmFwaStqc29uIGFzIGpzb25cbmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5hcHAudXNlKHJvdXRlcilcbi8vIGRiIGNvbm5lY3QgPT09PT09PT09PT09PT09PT1cbmxldCBkYiA9IHBhcmFtZXRlci5kYXRhYmFzZTtcbmxldCBkYkNvbm5lY3RVcmkgPSBkYi5kcml2ZXIrXCI6Ly9cIlxuICAgICsoKGRiLnVzZXJuYW1lICYmIGRiLnBhc3N3b3JkKT9cbiAgICAgICAgKGRiLnVzZXJuYW1lKyc6JytkYi5wYXNzd29yZCtcIkBcIik6JydcbiAgICApXG4gICAgK2RiLmhvc3RcbiAgICArKGRiLnBvcnQ/KCc6JytkYi5wb3J0KTonJylcbiAgICArXCIvXCIrZGIuZGJuYW1lXG47XG5tb25nb29zZS5jb25uZWN0KGRiQ29ubmVjdFVyaSk7XG5jb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBcIitkYkNvbm5lY3RVcmkpIFxuXG4vLyBhdXRvbG9hZCBtb2RlbFxuXG4vLyBhdXRvbG9hZCBjb250cm9sbGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5yZWdpc3RlckFjdGlvbnNJbkV4cHJlc3NBcHAoYXBwLCBbX19kaXJuYW1lICsgXCIvYXBwL3RvZG8tbGlzdFwiXSk7XG5cbi8vcmVnaXN0ZXJBY3Rpb25zSW5FeHByZXNzQXBwKGFwcCwgW1wiLi9hcHAvdG9kby1saXN0L1wiXSk7XG4vLyBsaXN0ZW4gKHN0YXJ0IGFwcCB3aXRoIG5vZGUgc2VydmVyLmpzKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHNlcnYgPSBwYXJhbWV0ZXIuc2VydmVyO1xuYXBwLmxpc3RlbihzZXJ2LnBvcnQsc2Vydi5ob3N0KTtcbmNvbnNvbGUubG9nKFwiQXBwIGxpc3RlbmluZyBvbiBwb3J0IFwiK3NlcnYucG9ydCk7Il19