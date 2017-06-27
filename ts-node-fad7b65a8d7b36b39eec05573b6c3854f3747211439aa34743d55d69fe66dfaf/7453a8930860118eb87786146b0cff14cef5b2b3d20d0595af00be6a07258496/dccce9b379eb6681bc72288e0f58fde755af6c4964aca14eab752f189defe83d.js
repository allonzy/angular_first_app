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
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
mongoose.connect(dbConnectUri);
console.log("Connected to " + dbConnectUri);
exports.app.use(exports.router);
exports.app.use(function (err, req, res, next) {
    console.log(err);
    switch (err.code) {
        case 404:
            res.render('error-pages/404.hbs', { url: res.url });
            break;
        case 500:
            res.render('error-pages/500.hbs', { error: err });
            break;
    }
});
let serv = exports.parameter.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening on port " + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsaURBQWlEO0FBQ2pELDZEQUFxRDtBQUNyRCw2REFBNEQ7QUFDNUQsNkJBQTRCO0FBSWpCLFFBQUEsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7QUFDbkUsUUFBQSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDZCxRQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFJdkMsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQixPQUFPLEVBQUMsTUFBTTtJQUNYLFVBQVUsRUFBTyxnQkFBZ0I7SUFDakMsV0FBVyxFQUFNLGlCQUFpQjtJQUNsQyxhQUFhLEVBQUksTUFBTTtDQUMxQixDQUFDLENBQUM7QUFHSCxXQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNwRCxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvRCxXQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFFMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFHLENBQUMsQ0FBQztBQUlwQyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNuQyxNQUFNLENBQUEsQ0FBQyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7SUFDckIsS0FBSyxLQUFLO1FBQ1QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUd2QixLQUFLLENBQUM7SUFHUCxLQUFLLE1BQU07UUFDVixXQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxHQUFHLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pJLEtBQUssQ0FBQztBQUlSLENBQUM7QUFJRCxJQUFJLEVBQUUsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFDLEtBQUs7TUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLEdBQUMsRUFBRSxDQUN2QztNQUNBLEVBQUUsQ0FBQyxJQUFJO01BQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7TUFDMUIsR0FBRyxHQUFDLEVBQUUsQ0FBQyxNQUFNLENBQ2pCO0FBRUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUdqQyxzQ0FBZ0IsQ0FBQyxXQUFHLEVBQUU7SUFDbEIsV0FBVyxFQUFDLENBQUMsU0FBUyxHQUFDLCtCQUErQixDQUFDO0lBQ3ZELFdBQVcsRUFBRSxDQUFDLFNBQVMsR0FBRyx5Q0FBeUMsQ0FBQztDQUN2RSxDQUFDLENBQUM7QUFDSCxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFDLFlBQVksQ0FBQyxDQUFDO0FBRTFDLFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBTSxDQUFDLENBQUM7QUFHaEIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7SUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQixLQUFLLEdBQUc7WUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQztRQUNQLEtBQUssR0FBRztZQUNQLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUNoRCxLQUFLLENBQUM7SUFDUCxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFJSCxJQUFJLElBQUksR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQztBQUM1QixXQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2VydmVyLmpzXG4vLyBpbXBvcnQgKiBhcyBwYXJhbWV0ZXIgZnJvbSAnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2V4cHJlc3MtaGFuZGxlYmFycyc7XG5pbXBvcnQge3VzZUV4cHJlc3NTZXJ2ZXJ9IGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5pbXBvcnQgKiBhcyB1bmlxdWVWYWxpZGF0b3IgZnJvbSdtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIlxuaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20nZXhwcmVzcy1lcnJvci1oYW5kbGVyJ1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuIC8vIHNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBwYXJhbWV0ZXIgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nKSk7XG5leHBvcnQgbGV0IGFwcCA9IGV4cHJlc3MoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBvdXIgYXBwIHcvIGV4cHJlc3NcbmV4cG9ydCBjb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbi8vID09PT0gU2V0dXAgaGFuZGxlYmFyc1xudmFyIGhicyA9IGhhbmRsZWJhcnMuY3JlYXRlKHtcblx0ZXh0bmFtZTonLmhicycsXG4gICAgbGF5b3V0c0RpciAgICAgOiAndmlld3MvbGF5b3V0cy8nLFxuICAgIHBhcnRpYWxzRGlyICAgIDogJ3ZpZXdzL3BhcnRpYWxzLycsXG4gICAgZGVmYXVsdExheW91dCAgOiAnbWFpbidcbn0pO1xuLy8gYXBwLnNldCgndmlld3MnLF9fZGlybmFtZStcIi9hcHBcIik7XG4vLyBSZWdpc3RlciBgaGJzLmVuZ2luZWAgd2l0aCB0aGUgRXhwcmVzcyBhcHAuXG5hcHAuZW5naW5lKCdoYnMnLCBoYnMuZW5naW5lKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hicycpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxubGV0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy9wdWJsaWMnKSk7ICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHN0YXRpYyBmaWxlcyBsb2NhdGlvbiAvcHVibGljL2ltZyB3aWxsIGJlIC9pbWcgZm9yIHVzZXJzXG5zd2l0Y2gocGFyYW1ldGVyLmVudil7XG5cdGNhc2UgJ2Rldic6XG5cdFx0YXBwLnVzZShtb3JnYW4oJ2RldicpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2cgZXZlcnkgcmVxdWVzdCB0byB0aGUgY29uc29sZVxuXHRcdC8vIGRldmVsb3BtZW50IGVycm9yIGhhbmRsZXJcblx0XHQvLyB3aWxsIHByaW50IHN0YWNrdHJhY2Vcblx0XHRicmVhaztcblxuXHRcdFxuXHRjYXNlICdwcm9kJzpcblx0XHRhcHAudXNlKG1vcmdhbignY29tbW9uJywgeyBza2lwOiBmdW5jdGlvbihyZXEsIHJlcykgeyByZXR1cm4gcmVzLnN0YXR1c0NvZGUgPCA0MDAgfSwgc3RyZWFtOiBfX2Rpcm5hbWUgKyAndmFyL2xvZ3MvcHJvZC5sb2cnIH0pKTtcblx0XHRicmVhaztcblxuXHRcdC8vIHByb2R1Y3Rpb24gZXJyb3IgaGFuZGxlclxuXHRcdC8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG59XG5cblxuLy8gZGIgY29ubmVjdCA9PT09PT09PT09PT09PT09PVxubGV0IGRiID0gcGFyYW1ldGVyLmRhdGFiYXNlO1xubGV0IGRiQ29ubmVjdFVyaSA9IGRiLmRyaXZlcitcIjovL1wiXG4gICAgKygoZGIudXNlcm5hbWUgJiYgZGIucGFzc3dvcmQpP1xuICAgICAgICAoZGIudXNlcm5hbWUrJzonK2RiLnBhc3N3b3JkK1wiQFwiKTonJ1xuICAgIClcbiAgICArZGIuaG9zdFxuICAgICsoZGIucG9ydD8oJzonK2RiLnBvcnQpOicnKVxuICAgICtcIi9cIitkYi5kYm5hbWVcbjtcbi8vQWRkIHBsdWdpbiB0byBtb25nb29zZSBcbm1vbmdvb3NlLnBsdWdpbih1bmlxdWVWYWxpZGF0b3IpO1xuXG4vLyBhdXRvbG9hZCBjb250cm9sbGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG51c2VFeHByZXNzU2VydmVyKGFwcCwge1xuICAgIGNvbnRyb2xsZXJzOltfX2Rpcm5hbWUrXCIvYXBwLyovY29udHJvbGxlcnMvKnsuanMsLnRzfVwiXSxcbiAgICBtaWRkbGV3YXJlczogW19fZGlybmFtZSArIFwiL25vZGVfbW9kdWxlcy8qKi9taWRkbGV3YXJlcy8qey5qcywudHN9XCJdXG59KTtcbm1vbmdvb3NlLmNvbm5lY3QoZGJDb25uZWN0VXJpKTtcbmNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIFwiK2RiQ29ubmVjdFVyaSk7XG5cbmFwcC51c2Uocm91dGVyKTtcblxuLy8gSGFuZGxlIGVycm9yc1xuYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG5cdGNvbnNvbGUubG9nKGVycik7XG5cdHN3aXRjaCAoZXJyLmNvZGUpIHtcblx0Y2FzZSA0MDQ6XG5cdFx0cmVzLnJlbmRlcignZXJyb3ItcGFnZXMvNDA0LmhicycsIHt1cmw6IHJlcy51cmx9KTtcblx0XHRicmVhaztcblx0Y2FzZSA1MDA6XG5cdFx0cmVzLnJlbmRlcignZXJyb3ItcGFnZXMvNTAwLmhicycsIHtlcnJvcjogZXJyfSk7XG5cdFx0YnJlYWs7XG5cdH1cbn0pO1xuLy8gbGlzdGVuIChzdGFydCBhcHAgd2l0aCBub2RlIHNlcnZlci5qcykgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5sZXQgc2VydiA9IHBhcmFtZXRlci5zZXJ2ZXI7XG5hcHAubGlzdGVuKHNlcnYucG9ydCxzZXJ2Lmhvc3QpO1xuY29uc29sZS5sb2coXCJBcHAgbGlzdGVuaW5nIG9uIHBvcnQgXCIrc2Vydi5wb3J0KTtcblxuIl19