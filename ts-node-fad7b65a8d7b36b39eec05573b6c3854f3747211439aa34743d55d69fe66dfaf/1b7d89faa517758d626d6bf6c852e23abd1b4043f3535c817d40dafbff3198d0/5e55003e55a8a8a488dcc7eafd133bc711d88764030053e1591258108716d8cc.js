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
Factory_1.registerActionsInExpressApp(app, ["./app/todo-list/*{.js,.ts}"]);
//registerActionsInExpressApp(app, ["./app/todo-list/"]);
// listen (start app with node server.js) ======================================
var serv = parameter.server;
app.listen(serv.port, serv.host);
console.log("App listening on port " + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxZQUFZO0FBQ1osd0RBQXdEO0FBQ3hELGlDQUFtQztBQUNuQywrQkFBaUM7QUFDakMsd0NBQTBDO0FBQzFDLG1DQUFxQztBQUNyQyxnREFBa0Q7QUFFbEQsZ0NBQWtDO0FBQ2xDLGtEQUFtRTtBQUlsRSwwQ0FBMEM7QUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUN2RSxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUE0Qyw0QkFBNEI7QUFDNUYsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQWlCLG1FQUFtRTtBQUN2SCxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFpQyxtQ0FBbUM7QUFDbkcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFZLDBDQUEwQztBQUMxRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQXFDLHlCQUF5QjtBQUN6RixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7QUFDekcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDZiwrQkFBK0I7QUFDL0IsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFDLEtBQUs7TUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLEdBQUMsRUFBRSxDQUN2QztNQUNBLEVBQUUsQ0FBQyxJQUFJO01BQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7TUFDMUIsR0FBRyxHQUFDLEVBQUUsQ0FBQyxNQUFNLENBQ2pCO0FBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBQyxZQUFZLENBQUMsQ0FBQTtBQUV6QyxpQkFBaUI7QUFFakIscUZBQXFGO0FBQ3JGLHFDQUEyQixDQUFDLEdBQUcsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztBQUVqRSx5REFBeUQ7QUFDekQsZ0ZBQWdGO0FBQ2hGLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlcnZlci5qc1xuLy8gaW1wb3J0ICogYXMgcGFyYW1ldGVyIGZyb20gJy4vY29uZmlnL3BhcmFtZXRlci5qc29uJztcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0ICogYXMgcmVzdGlmeSBmcm9tICdleHByZXNzLXJlc3RpZnktbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0IHtyZWdpc3RlckFjdGlvbnNJbkV4cHJlc3NBcHB9IGZyb20gXCJjb250cm9sbGVycy50cy9GYWN0b3J5XCI7XG5cbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcblxuIC8vIHNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHBhcmFtZXRlciA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbicpKTtcbmxldCBhcHAgPSBleHByZXNzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgb3VyIGFwcCB3LyBleHByZXNzXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCcvcHVibGljJykpOyAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBzdGF0aWMgZmlsZXMgbG9jYXRpb24gL3B1YmxpYy9pbWcgd2lsbCBiZSAvaW1nIGZvciB1c2Vyc1xuYXBwLnVzZShtb3JnYW4ocGFyYW1ldGVyLmVudikpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvZyBldmVyeSByZXF1ZXN0IHRvIHRoZSBjb25zb2xlXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7J2V4dGVuZGVkJzondHJ1ZSd9KSk7ICAgICAgICAgICAgLy8gcGFyc2UgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyc2UgYXBwbGljYXRpb24vanNvblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyB0eXBlOiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJyB9KSk7IC8vIHBhcnNlIGFwcGxpY2F0aW9uL3ZuZC5hcGkranNvbiBhcyBqc29uXG5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xuYXBwLnVzZShyb3V0ZXIpXG4vLyBkYiBjb25uZWN0ID09PT09PT09PT09PT09PT09XG5sZXQgZGIgPSBwYXJhbWV0ZXIuZGF0YWJhc2U7XG5sZXQgZGJDb25uZWN0VXJpID0gZGIuZHJpdmVyK1wiOi8vXCJcbiAgICArKChkYi51c2VybmFtZSAmJiBkYi5wYXNzd29yZCk/XG4gICAgICAgIChkYi51c2VybmFtZSsnOicrZGIucGFzc3dvcmQrXCJAXCIpOicnXG4gICAgKVxuICAgICtkYi5ob3N0XG4gICAgKyhkYi5wb3J0PygnOicrZGIucG9ydCk6JycpXG4gICAgK1wiL1wiK2RiLmRibmFtZVxuO1xubW9uZ29vc2UuY29ubmVjdChkYkNvbm5lY3RVcmkpO1xuY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gXCIrZGJDb25uZWN0VXJpKSBcblxuLy8gYXV0b2xvYWQgbW9kZWxcblxuLy8gYXV0b2xvYWQgY29udHJvbGxlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxucmVnaXN0ZXJBY3Rpb25zSW5FeHByZXNzQXBwKGFwcCwgW1wiLi9hcHAvdG9kby1saXN0Lyp7LmpzLC50c31cIl0pO1xuXG4vL3JlZ2lzdGVyQWN0aW9uc0luRXhwcmVzc0FwcChhcHAsIFtcIi4vYXBwL3RvZG8tbGlzdC9cIl0pO1xuLy8gbGlzdGVuIChzdGFydCBhcHAgd2l0aCBub2RlIHNlcnZlci5qcykgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBzZXJ2ID0gcGFyYW1ldGVyLnNlcnZlcjtcbmFwcC5saXN0ZW4oc2Vydi5wb3J0LHNlcnYuaG9zdCk7XG5jb25zb2xlLmxvZyhcIkFwcCBsaXN0ZW5pbmcgb24gcG9ydCBcIitzZXJ2LnBvcnQpOyJdfQ==