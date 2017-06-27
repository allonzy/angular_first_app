"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("fs-extra");
const hbs = require("hbs");
const routing_controllers_1 = require("routing-controllers");
const uniqueValidator = require("mongoose-unique-validator");
const layouts = require("handlebars-layouts");
const nameSpaceHandler_1 = require("./utils/nameSpaceHandler");
const readConfig_1 = require("./utils/readConfig");
exports.config = readConfig_1.recursiveIncludeJson('./config', 'config.json');
exports.app = express();
exports.router = express.Router();
exports.app.use(express.static('/web'));
exports.app.use(bodyParser.urlencoded({ 'extended': 'true' }));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
exports.app.use(methodOverride());
let hbsParam = exports.config.view.view_engine.handlebars;
if (hbsParam.partials_location) {
    var registeredPartials = [];
    for (let i in hbsParam.partials_location) {
        let partial = hbsParam.partials_location[i];
        nameSpaceHandler_1.createNameSpace(partial.directory, partial.moduleNameRegex, '.', function (file, nameSpace) {
            if (registeredPartials.indexOf(nameSpace) === -1) {
                hbs.registerPartial(nameSpace, file);
                registeredPartials.push(nameSpace);
                console.log("register " + file + " as {{>" + nameSpace + "}}");
            }
            else {
                console.error("\x1b[31m%s\x1b[0m", "nameSpace error:fail to register " + file + " as {{>" + nameSpace + "}} \n"
                    + "check your partials directories to resolve conflict");
            }
        });
    }
}
hbs.registerHelper(layouts(hbs.handlebars));
routing_controllers_1.useExpressServer(exports.app, {
    defaultErrorHandler: false,
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
exports.app.use(exports.router);
if (exports.config.view.baseDir) {
    exports.app.set('views', [__dirname + "/" + exports.config.view.directory, __dirname + "/app/"]);
}
exports.app.set('view engine', 'hbs');
fs.remove(exports.config.public + "/app", function (err) {
    if (err)
        throw new Error(err);
    console.log("clear existing symlink to " + exports.config.public + "/app");
    nameSpaceHandler_1.createNameSpace('app/**/' + exports.config.public + '/', "app\/(.*)\/" + exports.config.public + "\/", '/', function (file, nameSpace) {
        fs.ensureSymlink(__dirname + "/" + file, __dirname + "/" + exports.config.public + '/app/' + nameSpace, function (err) {
            if (err)
                throw new Error(err);
            console.log("create symlink: " + file + " -> " + "app/" + nameSpace);
        });
    });
});
switch (exports.config.env) {
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
            contact: exports.config.contact
        });
    }
    else if (req.accepts('json')) {
        res.send({
            status: status,
            error: err,
            contact: exports.config.contact
        });
    }
});
let db = exports.config.database;
let dbConnectUri = db.driver + "://"
    + ((db.username && db.password) ?
        (db.username + ':' + db.password + "@") : '')
    + db.host
    + (db.port ? (':' + db.port) : '')
    + "/" + db.dbname;
mongoose.plugin(uniqueValidator);
mongoose.connect(dbConnectUri);
console.log("Connected to " + dbConnectUri);
let serv = exports.config.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening " + serv.host + ":" + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUVsRCwrQkFBK0I7QUFDL0IsMkJBQTJCO0FBRTNCLDZEQUFxRDtBQUNyRCw2REFBNEQ7QUFFNUQsOENBQThDO0FBQzlDLCtEQUF5RDtBQUN6RCxtREFBdUQ7QUFTNUMsUUFBQSxNQUFNLEdBQUcsaUNBQW9CLENBQUMsVUFBVSxFQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3hELFFBQUEsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ2QsUUFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBR3ZDLFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBRzFCLElBQUksUUFBUSxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsV0FB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QUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBQyxZQUFZLENBQUMsQ0FBQztBQUsxQyxJQUFJLElBQUksR0FBRyxjQUFNLENBQUMsTUFBTSxDQUFDO0FBQ3pCLFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuLy8gaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgaGJzIGZyb20gJ2hicyc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0IHt1c2VFeHByZXNzU2VydmVyfSBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuaW1wb3J0ICogYXMgdW5pcXVlVmFsaWRhdG9yIGZyb20nbW9uZ29vc2UtdW5pcXVlLXZhbGlkYXRvcic7XG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSdleHByZXNzLWVycm9yLWhhbmRsZXInXG5pbXBvcnQgKiBhcyBsYXlvdXRzIGZyb20gJ2hhbmRsZWJhcnMtbGF5b3V0cyc7XG5pbXBvcnQge2NyZWF0ZU5hbWVTcGFjZX0gZnJvbSAnLi91dGlscy9uYW1lU3BhY2VIYW5kbGVyJztcbmltcG9ydCB7cmVjdXJzaXZlSW5jbHVkZUpzb259IGZyb20gJy4vdXRpbHMvcmVhZENvbmZpZydcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcbi8vID09PT09PT09PT09PT09RXhwb3J0IGNvbXBvbmVudCwgKGNhbiBiZSBuZWVkZWQgZnJvbSBjb250cm9sbGVycykgPT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBjb25maWcgPSByZWN1cnNpdmVJbmNsdWRlSnNvbignLi9jb25maWcnLCdjb25maWcuanNvbicpO1xuZXhwb3J0IGxldCBhcHAgPSBleHByZXNzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgb3VyIGFwcCB3LyBleHByZXNzXG5leHBvcnQgY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXBwLnVzZShleHByZXNzLnN0YXRpYygnL3dlYicpKTsgICAgICAgICAgICAgICAgIFx0XHRcdFx0Ly8gc2V0IHRoZSBzdGF0aWMgZmlsZXMgbG9jYXRpb24gL3B1YmxpYy9pbWcgd2lsbCBiZSAvaW1nIGZvciB1c2Vyc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09IEhhbmRsZWJhcnMgKHRlbXBsYXRpbmcgc3lzdGVtKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGhic1BhcmFtID0gY29uZmlnLnZpZXcudmlld19lbmdpbmUuaGFuZGxlYmFycztcblxuLy8gQWRkIHRoZSBsYXlvdXQgc3lzdGVtIHRvIGhhbmRsZWJhcnNcblxuLy8gUmVnaXN0ZXIgYWxsIHBhcnRpYWxzIHdpdGggbmFtZXNwYWNlXG5pZihoYnNQYXJhbS5wYXJ0aWFsc19sb2NhdGlvbil7XG5cdFx0dmFyIHJlZ2lzdGVyZWRQYXJ0aWFscyA9IFtdO1xuXHRcdGZvciAobGV0IGkgaW4gaGJzUGFyYW0ucGFydGlhbHNfbG9jYXRpb24pe1xuXHRcdFx0bGV0IHBhcnRpYWwgPSBoYnNQYXJhbS5wYXJ0aWFsc19sb2NhdGlvbltpXTtcblx0XHRcdGNyZWF0ZU5hbWVTcGFjZShwYXJ0aWFsLmRpcmVjdG9yeSxwYXJ0aWFsLm1vZHVsZU5hbWVSZWdleCwnLicsZnVuY3Rpb24oZmlsZSxuYW1lU3BhY2Upe1xuXHRcdFx0aWYocmVnaXN0ZXJlZFBhcnRpYWxzLmluZGV4T2YobmFtZVNwYWNlKSA9PT0gLTEpe1xuXHRcdFx0XHRoYnMucmVnaXN0ZXJQYXJ0aWFsKG5hbWVTcGFjZSxmaWxlKTtcblx0XHRcdFx0cmVnaXN0ZXJlZFBhcnRpYWxzLnB1c2gobmFtZVNwYWNlKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJyZWdpc3RlciBcIitmaWxlK1wiIGFzIHt7PlwiK25hbWVTcGFjZStcIn19XCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJcXHgxYlszMW0lc1xceDFiWzBtXCIsXG5cdFx0XHRcdFx0XHRcIm5hbWVTcGFjZSBlcnJvcjpmYWlsIHRvIHJlZ2lzdGVyIFwiK2ZpbGUrXCIgYXMge3s+XCIrbmFtZVNwYWNlK1wifX0gXFxuXCIgXG5cdFx0XHRcdFx0XHQrXCJjaGVjayB5b3VyIHBhcnRpYWxzIGRpcmVjdG9yaWVzIHRvIHJlc29sdmUgY29uZmxpY3RcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XHRcblx0fVxufVxuaGJzLnJlZ2lzdGVySGVscGVyKGxheW91dHMoaGJzLmhhbmRsZWJhcnMpKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09IENvbnRyb2xsZXIgPT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUmVnaXN0ZXIgY29udHJvbGxlclxudXNlRXhwcmVzc1NlcnZlcihhcHAsIHtcblx0ZGVmYXVsdEVycm9ySGFuZGxlcjogZmFsc2UsIC8vIHdlIHVzZSBjdXN0b20gZXJyb3IgaGFuZGxlciBcbiAgICBjb250cm9sbGVyczpbX19kaXJuYW1lK1wiL2FwcC8qL2NvbnRyb2xsZXJzLyp7LmpzLC50c31cIl0sXG4gICAgbWlkZGxld2FyZXM6IFtfX2Rpcm5hbWUgKyBcIi9ub2RlX21vZHVsZXMvKiovbWlkZGxld2FyZXMvKnsuanMsLnRzfVwiXVxufSk7XG5hcHAudXNlKHJvdXRlcik7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBWaWV3cyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaWYoY29uZmlnLnZpZXcuYmFzZURpcil7XG5cdGFwcC5zZXQoJ3ZpZXdzJyxbX19kaXJuYW1lK1wiL1wiK2NvbmZpZy52aWV3LmRpcmVjdG9yeSxfX2Rpcm5hbWUrXCIvYXBwL1wiXSk7XG59XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYnMnKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PVB1YmxpYyBkaXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vQ3JlYXRlIHN5bWxpbmsgZnJvbSBhcHAgdG8gcHVibGljIGRpclxuZnMucmVtb3ZlKGNvbmZpZy5wdWJsaWMrXCIvYXBwXCIsZnVuY3Rpb24oZXJyKXtcblx0aWYoZXJyKSB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcblx0Y29uc29sZS5sb2coXCJjbGVhciBleGlzdGluZyBzeW1saW5rIHRvIFwiK2NvbmZpZy5wdWJsaWMrXCIvYXBwXCIpO1x0XG5cdC8vIGxpbmsgYWxsIHB1YmxpYyBmcm9tIGFwcCB0byBwdWJsaWMgXG5cdGNyZWF0ZU5hbWVTcGFjZSgnYXBwLyoqLycrY29uZmlnLnB1YmxpYysnLycsXCJhcHBcXC8oLiopXFwvXCIrY29uZmlnLnB1YmxpYytcIlxcL1wiLCcvJyxmdW5jdGlvbihmaWxlLG5hbWVTcGFjZSl7XG5cdFx0ZnMuZW5zdXJlU3ltbGluayhfX2Rpcm5hbWUrXCIvXCIrZmlsZSxfX2Rpcm5hbWUrXCIvXCIrY29uZmlnLnB1YmxpYysnL2FwcC8nK25hbWVTcGFjZSxmdW5jdGlvbihlcnIpe1xuXHRcdFx0aWYoZXJyKSB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcblx0XHRcdGNvbnNvbGUubG9nKFwiY3JlYXRlIHN5bWxpbms6IFwiK2ZpbGUrXCIgLT4gXCIrXCJhcHAvXCIrbmFtZVNwYWNlKTtcblx0XHR9KTtcblx0fSk7XG59KTtcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT1FcnJvciBoYW5kbGluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5zd2l0Y2goY29uZmlnLmVudil7XG5cdGNhc2UgJ2Rldic6XG5cdFx0Ly8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuXHRcdC8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXHRcdGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRicmVhaztcdFx0XG5cdGNhc2UgJ3Byb2QnOlxuXHRcdC8vIHByb2R1Y3Rpb24gZXJyb3IgaGFuZGxlclxuXHRcdC8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5cdFx0YXBwLnVzZShtb3JnYW4oJ2NvbW1vbicsIHsgc2tpcDogZnVuY3Rpb24ocmVxLCByZXMpIHsgcmV0dXJuIHJlcy5zdGF0dXNDb2RlIDwgNDAwIH0sIHN0cmVhbTogX19kaXJuYW1lICsgJ3Zhci9sb2dzL3Byb2QubG9nJyB9KSk7XG5cdFx0YnJlYWs7XG59XG5cbmFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcywgbmV4dCl7XG5cdGNvbnNvbGUubG9nKGFwcC5nZXQoJ3ZpZXdzJykpO1xuXHRsZXQgc3RhdHVzID0gKGVyci5odHRwQ29kZSk/ZXJyLmh0dHBDb2RlOjUwMDtcblx0cmVzLnN0YXR1c3N0YXR1c1xuXHRsZXQgZXJyb3JQYWdlID0gZnMuZXhpc3RzU3luYyhhcHAuZ2V0KCd2aWV3cycpKycvZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnKT8nZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnXG5cdFx0XHQ6J2Vycm9yLXBhZ2VzL2RlZmF1bHQuaGJzJztcblx0aWYgKHJlcS5hY2NlcHRzKCdodG1sJykpIHtcblx0XHRyZXMucmVuZGVyKGVycm9yUGFnZSwge1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOiBlcnIsXG5cdFx0XHR1cmw6IHJlcS51cmwsXG5cdFx0XHRjb250YWN0OmNvbmZpZy5jb250YWN0XG5cdFx0fSk7XG5cdH1cblx0ZWxzZSBpZiAocmVxLmFjY2VwdHMoJ2pzb24nKSkge1xuXHRcdHJlcy5zZW5kKHtcblx0XHRcdHN0YXR1czpzdGF0dXMsXG5cdFx0XHRlcnJvcjplcnIsXG5cdFx0XHRjb250YWN0OmNvbmZpZy5jb250YWN0XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PSBEYXRhYmFzZSBjb25uZWN0IChtb25nb29zZSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBkYiA9IGNvbmZpZy5kYXRhYmFzZTtcbmxldCBkYkNvbm5lY3RVcmkgPSBkYi5kcml2ZXIrXCI6Ly9cIlxuICAgICsoKGRiLnVzZXJuYW1lICYmIGRiLnBhc3N3b3JkKT9cbiAgICAgICAgKGRiLnVzZXJuYW1lKyc6JytkYi5wYXNzd29yZCtcIkBcIik6JydcbiAgICApXG4gICAgK2RiLmhvc3RcbiAgICArKGRiLnBvcnQ/KCc6JytkYi5wb3J0KTonJylcbiAgICArXCIvXCIrZGIuZGJuYW1lXG47XG4vL0FkZCBwbHVnaW4gdG8gbW9uZ29vc2UgXG5tb25nb29zZS5wbHVnaW4odW5pcXVlVmFsaWRhdG9yKTtcbi8vQ29ubmVjdCB0byBNb25nbyBkYlxubW9uZ29vc2UuY29ubmVjdChkYkNvbm5lY3RVcmkpO1xuY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gXCIrZGJDb25uZWN0VXJpKTtcblxuXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09U3RhcnQgdGhlIHNlcnZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHNlcnYgPSBjb25maWcuc2VydmVyO1xuYXBwLmxpc3RlbihzZXJ2LnBvcnQsc2Vydi5ob3N0KTtcbmNvbnNvbGUubG9nKFwiQXBwIGxpc3RlbmluZyBcIitzZXJ2Lmhvc3QrXCI6XCIrc2Vydi5wb3J0KTsiXX0=