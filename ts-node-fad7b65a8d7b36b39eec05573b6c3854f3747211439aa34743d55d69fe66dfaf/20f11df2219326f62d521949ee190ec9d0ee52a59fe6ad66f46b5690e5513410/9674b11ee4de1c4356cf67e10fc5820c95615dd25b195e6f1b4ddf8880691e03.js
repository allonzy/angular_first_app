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
const glob = require("glob");
let moduleRegex = "app\/(.*\/)views\/partials\/(.*)\.hbs";
let moduleSeparator = '.';
glob("app/**/views/partials/**.hbs", function (er, files) {
    files.forEach(function (file) {
        var re = new RegExp(moduleRegex);
        let match = re.exec(file);
        let moduleName = match.splice(1)
            .join('/')
            .replace(new RegExp('(/)*', 'g'), '/')
            .replace('/', moduleSeparator);
        console.log(moduleName);
    });
    ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw2REFBcUQ7QUFDckQsNkRBQTREO0FBRTVELDhDQUE4QztBQUU5Qyw2QkFBNkI7QUFHN0IsSUFBSSxXQUFXLEdBQUcsdUNBQXVDLENBQUM7QUFDMUQsSUFBSSxlQUFlLEdBQUcsR0FBRyxDQUFDO0FBRzFCLElBQUksQ0FBQyw4QkFBOEIsRUFBTSxVQUFVLEVBQUUsRUFBRSxLQUFLO0lBQzNELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1FBQzNCLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNULE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLEVBQUMsR0FBRyxDQUFDO2FBQ25DLE9BQU8sQ0FBQyxHQUFHLEVBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUNILENBQUM7QUFHRixDQUFDLENBQUMs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LEdBQUcsQ0FBQyxlQUFlLEdBQUMsWUFBWSxDQUFDLENBQUM7QUFJMUMsc0NBQWdCLENBQUMsV0FBRyxFQUFFO0lBQ3JCLG1CQUFtQixFQUFFLEtBQUs7SUFDdkIsV0FBVyxFQUFDLENBQUMsU0FBUyxHQUFDLCtCQUErQixDQUFDO0lBQ3ZELFdBQVcsRUFBRSxDQUFDLFNBQVMsR0FBRyx5Q0FBeUMsQ0FBQztDQUN2RSxDQUFDLENBQUM7QUFDSCxXQUFHLENBQUMsR0FBRyxDQUFDLGNBQU0sQ0FBQyxDQUFDO0FBR2hCLElBQUksSUFBSSxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDO0FBQzVCLFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbi8vIGltcG9ydCAqIGFzIHBhcmFtZXRlciBmcm9tICcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbic7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcbmltcG9ydCAqIGFzIGhicyBmcm9tICdoYnMnO1xuaW1wb3J0ICogYXMgaGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcbmltcG9ydCB7dXNlRXhwcmVzc1NlcnZlcn0gZnJvbSBcInJvdXRpbmctY29udHJvbGxlcnNcIjtcbmltcG9ydCAqIGFzIHVuaXF1ZVZhbGlkYXRvciBmcm9tJ21vbmdvb3NlLXVuaXF1ZS12YWxpZGF0b3InO1xuaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20nZXhwcmVzcy1lcnJvci1oYW5kbGVyJ1xuaW1wb3J0ICogYXMgbGF5b3V0cyBmcm9tICdoYW5kbGViYXJzLWxheW91dHMnO1xuLy8gaW1wb3J0IHtyZWdpc3RlclBhcnRpYWxzRnJvbVJvb3R9IGZyb20gJy4uL3V0aWxzL3JlZ2lzdGVyUGFydGlhbHNGcm9tUm9vdCdcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgbW9kdWxlUmVnZXggPSBcImFwcFxcLyguKlxcLyl2aWV3c1xcL3BhcnRpYWxzXFwvKC4qKVxcLmhic1wiO1xubGV0IG1vZHVsZVNlcGFyYXRvciA9ICcuJztcbi8vUmVnaXN0ZXIgYSBwYXJ0aWFsIGRpcmVjdG9yeSByZWN1cnNpdmVseSB3aXRoIGEgbmFtZXNwYWNlIChleGFtcGxlLnBhcnRpYWwxLi4uKVxuLy8gcmVnaXN0ZXJQYXJ0aWFsc0Zyb21Sb290KCdhcHAnLCcnKTtcbmdsb2IoXCJhcHAvKiovdmlld3MvcGFydGlhbHMvKiouaGJzXCIvKiovLCBmdW5jdGlvbiAoZXIsIGZpbGVzKSB7XG5cdGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKGZpbGUpe1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAobW9kdWxlUmVnZXgpO1xuXHRcdGxldCBtYXRjaCA9IHJlLmV4ZWMoZmlsZSk7XG5cdFx0bGV0IG1vZHVsZU5hbWUgPSBtYXRjaC5zcGxpY2UoMSlcblx0XHRcdFx0XHRcdFx0LmpvaW4oJy8nKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZShuZXcgUmVnRXhwKCcoLykqJywnZycpLCcvJylcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoJy8nLG1vZHVsZVNlcGFyYXRvcik7XG5cdFx0Y29uc29sZS5sb2cobW9kdWxlTmFtZSk7XG5cdH0pO1xuXHQ7XG5cdC8vXCIoYXBwXFwvKC4qXFwvKXZpZXdzXFwvcGFydGlhbHNcXC8oLiopXFwuaGJzXCI7XG5cdC8vY29uc29sZS5sb2coZmlsZXMpO1xufSk7XG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5kZWNsYXJlIHZhciBfX2Rpcm5hbWU7XG5cbi8vID09PT09PT09PT09PT09RXhwb3J0IGNvbXBvbmVudCwgKGNhbiBiZSBuZWVkZWQgZnJvbSBjb250cm9sbGVycykgPT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBwYXJhbWV0ZXIgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nKSk7XG5leHBvcnQgbGV0IGFwcCA9IGV4cHJlc3MoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBvdXIgYXBwIHcvIGV4cHJlc3NcbmV4cG9ydCBjb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09U2V0IHVwIGV4cHJlc3MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCcvd2ViJykpOyAgICAgICAgICAgICAgICAgXHRcdFx0XHQvLyBzZXQgdGhlIHN0YXRpYyBmaWxlcyBsb2NhdGlvbiAvcHVibGljL2ltZyB3aWxsIGJlIC9pbWcgZm9yIHVzZXJzXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7J2V4dGVuZGVkJzondHJ1ZSd9KSk7ICAgICAgICAgICAgLy8gcGFyc2UgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyc2UgYXBwbGljYXRpb24vanNvblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyB0eXBlOiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJyB9KSk7IC8vIHBhcnNlIGFwcGxpY2F0aW9uL3ZuZC5hcGkranNvbiBhcyBqc29uXG5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT0gSGFuZGxlYmFycyAodGVtcGxhdGluZyBzeXN0ZW0pID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgaGJzUGFyYW0gPSBwYXJhbWV0ZXIudmlldy52aWV3X2VuZ2luZS5oYW5kbGViYXJzO1xuXG5cbi8vIEFkZCB0aGUgbGF5b3V0IHN5c3RlbSB0byBoYW5kbGViYXJzXG5oYnMucmVnaXN0ZXJIZWxwZXIobGF5b3V0cyhoYW5kbGViYXJzKSk7XG5cbi8vIHNldCBwYXJhbWV0ZXIgZnJvbSBwYXJhbWV0ZXIuanNvblxuaWYoaGJzUGFyYW0ucGFydGlhbHNfZGlyKXtcblx0aGJzLnJlZ2lzdGVyUGFydGlhbHMoX19kaXJuYW1lICtcIi9cIisgaGJzUGFyYW0ucGFydGlhbHNfZGlyKTtcblx0aGJzLnJlZ2lzdGVyUGFydGlhbHMoX19kaXJuYW1lICtcImFwcC9cIik7XG59XG5cbmlmKHBhcmFtZXRlci52aWV3LmJhc2VEaXIpe1xuXHRhcHAuc2V0KCd2aWV3cycsW3BhcmFtZXRlci52aWV3LmRpcmVjdG9yeSwnYXBwLyoqL3ZpZXdzLyddKTtcbn1cblxuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaGJzJyk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT1FcnJvciBoYW5kbGluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5zd2l0Y2gocGFyYW1ldGVyLmVudil7XG5cdGNhc2UgJ2Rldic6XG5cdFx0Ly8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuXHRcdC8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXHRcdGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRicmVhaztcdFx0XG5cdGNhc2UgJ3Byb2QnOlxuXHRcdC8vIHByb2R1Y3Rpb24gZXJyb3IgaGFuZGxlclxuXHRcdC8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5cdFx0YXBwLnVzZShtb3JnYW4oJ2NvbW1vbicsIHsgc2tpcDogZnVuY3Rpb24ocmVxLCByZXMpIHsgcmV0dXJuIHJlcy5zdGF0dXNDb2RlIDwgNDAwIH0sIHN0cmVhbTogX19kaXJuYW1lICsgJ3Zhci9sb2dzL3Byb2QubG9nJyB9KSk7XG5cdFx0YnJlYWs7XG59XG5cbmFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcywgbmV4dCl7XG5cdGNvbnNvbGUubG9nKGFwcC5nZXQoJ3ZpZXdzJykpO1xuXHRsZXQgc3RhdHVzID0gKGVyci5odHRwQ29kZSk/ZXJyLmh0dHBDb2RlOjUwMDtcblx0cmVzLnN0YXR1c3N0YXR1c1xuXHRsZXQgZXJyb3JQYWdlID0gZnMuZXhpc3RzU3luYyhhcHAuZ2V0KCd2aWV3cycpKycvZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnKT8nZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnXG5cdFx0XHQ6J2Vycm9yLXBhZ2VzL2RlZmF1bHQuaGJzJztcblx0aWYgKHJlcS5hY2NlcHRzKCdodG1sJykpIHtcblx0XHRyZXMucmVuZGVyKGVycm9yUGFnZSwge1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOiBlcnIsXG5cdFx0XHR1cmw6IHJlcS51cmwsXG5cdFx0XHRjb250YWN0OnBhcmFtZXRlci5jb250YWN0XG5cdFx0fSk7XG5cdH1cblx0ZWxzZSBpZiAocmVxLmFjY2VwdHMoJ2pzb24nKSkge1xuXHRcdHJlcy5zZW5kKHtcblx0XHRcdHN0YXR1czpzdGF0dXMsXG5cdFx0XHRlcnJvcjplcnIsXG5cdFx0XHRjb250YWN0OnBhcmFtZXRlci5jb250YWN0XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PSBEYXRhYmFzZSBjb25uZWN0IChtb25nb29zZSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBkYiA9IHBhcmFtZXRlci5kYXRhYmFzZTtcbmxldCBkYkNvbm5lY3RVcmkgPSBkYi5kcml2ZXIrXCI6Ly9cIlxuICAgICsoKGRiLnVzZXJuYW1lICYmIGRiLnBhc3N3b3JkKT9cbiAgICAgICAgKGRiLnVzZXJuYW1lKyc6JytkYi5wYXNzd29yZCtcIkBcIik6JydcbiAgICApXG4gICAgK2RiLmhvc3RcbiAgICArKGRiLnBvcnQ/KCc6JytkYi5wb3J0KTonJylcbiAgICArXCIvXCIrZGIuZGJuYW1lXG47XG4vL0FkZCBwbHVnaW4gdG8gbW9uZ29vc2UgXG5tb25nb29zZS5wbHVnaW4odW5pcXVlVmFsaWRhdG9yKTtcbi8vQ29ubmVjdCB0byBNb25nbyBkYlxubW9uZ29vc2UuY29ubmVjdChkYkNvbm5lY3RVcmkpO1xuY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gXCIrZGJDb25uZWN0VXJpKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09IFNldCB1cCB0aGUgcm91dGluZyBvZiB0aGUgYXBwID09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFJlZ2lzdGVyIGNvbnRyb2xsZXJcbnVzZUV4cHJlc3NTZXJ2ZXIoYXBwLCB7XG5cdGRlZmF1bHRFcnJvckhhbmRsZXI6IGZhbHNlLCAvLyB3ZSB1c2UgY3VzdG9tIGVycm9yIGhhbmRsZXIgXG4gICAgY29udHJvbGxlcnM6W19fZGlybmFtZStcIi9hcHAvKi9jb250cm9sbGVycy8qey5qcywudHN9XCJdLFxuICAgIG1pZGRsZXdhcmVzOiBbX19kaXJuYW1lICsgXCIvbm9kZV9tb2R1bGVzLyoqL21pZGRsZXdhcmVzLyp7LmpzLC50c31cIl1cbn0pO1xuYXBwLnVzZShyb3V0ZXIpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVN0YXJ0IHRoZSBzZXJ2ZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBzZXJ2ID0gcGFyYW1ldGVyLnNlcnZlcjtcbmFwcC5saXN0ZW4oc2Vydi5wb3J0LHNlcnYuaG9zdCk7XG5jb25zb2xlLmxvZyhcIkFwcCBsaXN0ZW5pbmcgXCIrc2Vydi5ob3N0K1wiOlwiK3NlcnYucG9ydCk7XG5cbiJdfQ==