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
hbs.registerHelper(layouts(handlebars));
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
                console.error("\x1b[31m%s\x1b[0m", "nameSpace error:try to register " + file + " as {{>" + nameSpace + "}} \n check your views directory to resolve conflict");
            }
        });
    }
}
if (exports.config.view.baseDir) {
    exports.app.set('views', [exports.config.view.directory, 'app/**/views/']);
}
exports.app.set('view engine', 'hbs');
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
routing_controllers_1.useExpressServer(exports.app, {
    defaultErrorHandler: false,
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
exports.app.use(exports.router);
let serv = exports.config.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening " + serv.host + ":" + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw2REFBcUQ7QUFDckQsNkRBQTREO0FBRTVELDhDQUE4QztBQUM5QywrREFBeUQ7QUFDekQsbURBQXVEO0FBUzVDLFFBQUEsTUFBTSxHQUFHLGlDQUFvQixDQUFDLFVBQVUsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUN4RCxRQUFBLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUd2QyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUcxQixJQUFJLFFBQVEsR0FBRyxjQUFNLENBQUMs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Q0FBQyxHQUFHLENBQUMsZUFBZSxHQUFDLFlBQVksQ0FBQyxDQUFDO0FBSTFDLHNDQUFnQixDQUFDLFdBQUcsRUFBRTtJQUNyQixtQkFBbUIsRUFBRSxLQUFLO0lBQ3ZCLFdBQVcsRUFBQyxDQUFDLFNBQVMsR0FBQywrQkFBK0IsQ0FBQztJQUN2RCxXQUFXLEVBQUUsQ0FBQyxTQUFTLEdBQUcseUNBQXlDLENBQUM7Q0FDdkUsQ0FBQyxDQUFDO0FBQ0gsV0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFNLENBQUMsQ0FBQztBQUdoQixJQUFJLElBQUksR0FBRyxjQUFNLENBQUMsTUFBTSxDQUFDO0FBQ3pCLFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgaGJzIGZyb20gJ2hicyc7XG5pbXBvcnQgKiBhcyBoYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0IHt1c2VFeHByZXNzU2VydmVyfSBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuaW1wb3J0ICogYXMgdW5pcXVlVmFsaWRhdG9yIGZyb20nbW9uZ29vc2UtdW5pcXVlLXZhbGlkYXRvcic7XG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSdleHByZXNzLWVycm9yLWhhbmRsZXInXG5pbXBvcnQgKiBhcyBsYXlvdXRzIGZyb20gJ2hhbmRsZWJhcnMtbGF5b3V0cyc7XG5pbXBvcnQge2NyZWF0ZU5hbWVTcGFjZX0gZnJvbSAnLi91dGlscy9uYW1lU3BhY2VIYW5kbGVyJztcbmltcG9ydCB7cmVjdXJzaXZlSW5jbHVkZUpzb259IGZyb20gJy4vdXRpbHMvcmVhZENvbmZpZydcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcbi8vID09PT09PT09PT09PT09RXhwb3J0IGNvbXBvbmVudCwgKGNhbiBiZSBuZWVkZWQgZnJvbSBjb250cm9sbGVycykgPT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBjb25maWcgPSByZWN1cnNpdmVJbmNsdWRlSnNvbignLi9jb25maWcnLCdjb25maWcuanNvbicpO1xuZXhwb3J0IGxldCBhcHAgPSBleHByZXNzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgb3VyIGFwcCB3LyBleHByZXNzXG5leHBvcnQgY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVNldCB1cCBleHByZXNzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXBwLnVzZShleHByZXNzLnN0YXRpYygnL3dlYicpKTsgICAgICAgICAgICAgICAgIFx0XHRcdFx0Ly8gc2V0IHRoZSBzdGF0aWMgZmlsZXMgbG9jYXRpb24gL3B1YmxpYy9pbWcgd2lsbCBiZSAvaW1nIGZvciB1c2Vyc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeydleHRlbmRlZCc6J3RydWUnfSkpOyAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicgfSkpOyAvLyBwYXJzZSBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24gYXMganNvblxuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09IEhhbmRsZWJhcnMgKHRlbXBsYXRpbmcgc3lzdGVtKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGhic1BhcmFtID0gY29uZmlnLnZpZXcudmlld19lbmdpbmUuaGFuZGxlYmFycztcblxuXG4vLyBBZGQgdGhlIGxheW91dCBzeXN0ZW0gdG8gaGFuZGxlYmFyc1xuaGJzLnJlZ2lzdGVySGVscGVyKGxheW91dHMoaGFuZGxlYmFycykpO1xuXG5cblxuLy9UT0RPIHJlYWQgZGlyZWN0b3J5IGZyb20gY29uZmlnc1xuLy8gc2V0IGNvbmZpZyBmcm9tIGNvbmZpZy5qc29uXG5pZihoYnNQYXJhbS5wYXJ0aWFsc19sb2NhdGlvbil7XG5cdFx0dmFyIHJlZ2lzdGVyZWRQYXJ0aWFscyA9IFtdO1xuXHRcdGZvciAobGV0IGkgaW4gaGJzUGFyYW0ucGFydGlhbHNfbG9jYXRpb24pe1xuXHRcdFx0bGV0IHBhcnRpYWwgPSBoYnNQYXJhbS5wYXJ0aWFsc19sb2NhdGlvbltpXTtcblx0XHRcdGNyZWF0ZU5hbWVTcGFjZShwYXJ0aWFsLmRpcmVjdG9yeSxwYXJ0aWFsLm1vZHVsZU5hbWVSZWdleCwnLicsZnVuY3Rpb24oZmlsZSxuYW1lU3BhY2Upe1xuXHRcdFx0aWYocmVnaXN0ZXJlZFBhcnRpYWxzLmluZGV4T2YobmFtZVNwYWNlKSA9PT0gLTEpe1xuXHRcdFx0XHRoYnMucmVnaXN0ZXJQYXJ0aWFsKG5hbWVTcGFjZSxmaWxlKTtcblx0XHRcdFx0cmVnaXN0ZXJlZFBhcnRpYWxzLnB1c2gobmFtZVNwYWNlKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJyZWdpc3RlciBcIitmaWxlK1wiIGFzIHt7PlwiK25hbWVTcGFjZStcIn19XCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJcXHgxYlszMW0lc1xceDFiWzBtXCIsXG5cdFx0XHRcdFx0XHRcIm5hbWVTcGFjZSBlcnJvcjp0cnkgdG8gcmVnaXN0ZXIgXCIrZmlsZStcIiBhcyB7ez5cIituYW1lU3BhY2UrXCJ9fSBcXG4gY2hlY2sgeW91ciB2aWV3cyBkaXJlY3RvcnkgdG8gcmVzb2x2ZSBjb25mbGljdFwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcdFxuXHR9XG59XG5cbmlmKGNvbmZpZy52aWV3LmJhc2VEaXIpe1xuXHRhcHAuc2V0KCd2aWV3cycsW2NvbmZpZy52aWV3LmRpcmVjdG9yeSwnYXBwLyoqL3ZpZXdzLyddKTtcbn1cblxuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaGJzJyk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT1FcnJvciBoYW5kbGluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5zd2l0Y2goY29uZmlnLmVudil7XG5cdGNhc2UgJ2Rldic6XG5cdFx0Ly8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuXHRcdC8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXHRcdGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRicmVhaztcdFx0XG5cdGNhc2UgJ3Byb2QnOlxuXHRcdC8vIHByb2R1Y3Rpb24gZXJyb3IgaGFuZGxlclxuXHRcdC8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5cdFx0YXBwLnVzZShtb3JnYW4oJ2NvbW1vbicsIHsgc2tpcDogZnVuY3Rpb24ocmVxLCByZXMpIHsgcmV0dXJuIHJlcy5zdGF0dXNDb2RlIDwgNDAwIH0sIHN0cmVhbTogX19kaXJuYW1lICsgJ3Zhci9sb2dzL3Byb2QubG9nJyB9KSk7XG5cdFx0YnJlYWs7XG59XG5cbmFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcywgbmV4dCl7XG5cdGNvbnNvbGUubG9nKGFwcC5nZXQoJ3ZpZXdzJykpO1xuXHRsZXQgc3RhdHVzID0gKGVyci5odHRwQ29kZSk/ZXJyLmh0dHBDb2RlOjUwMDtcblx0cmVzLnN0YXR1c3N0YXR1c1xuXHRsZXQgZXJyb3JQYWdlID0gZnMuZXhpc3RzU3luYyhhcHAuZ2V0KCd2aWV3cycpKycvZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnKT8nZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnXG5cdFx0XHQ6J2Vycm9yLXBhZ2VzL2RlZmF1bHQuaGJzJztcblx0aWYgKHJlcS5hY2NlcHRzKCdodG1sJykpIHtcblx0XHRyZXMucmVuZGVyKGVycm9yUGFnZSwge1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOiBlcnIsXG5cdFx0XHR1cmw6IHJlcS51cmwsXG5cdFx0XHRjb250YWN0OmNvbmZpZy5jb250YWN0XG5cdFx0fSk7XG5cdH1cblx0ZWxzZSBpZiAocmVxLmFjY2VwdHMoJ2pzb24nKSkge1xuXHRcdHJlcy5zZW5kKHtcblx0XHRcdHN0YXR1czpzdGF0dXMsXG5cdFx0XHRlcnJvcjplcnIsXG5cdFx0XHRjb250YWN0OmNvbmZpZy5jb250YWN0XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PSBEYXRhYmFzZSBjb25uZWN0IChtb25nb29zZSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBkYiA9IGNvbmZpZy5kYXRhYmFzZTtcbmxldCBkYkNvbm5lY3RVcmkgPSBkYi5kcml2ZXIrXCI6Ly9cIlxuICAgICsoKGRiLnVzZXJuYW1lICYmIGRiLnBhc3N3b3JkKT9cbiAgICAgICAgKGRiLnVzZXJuYW1lKyc6JytkYi5wYXNzd29yZCtcIkBcIik6JydcbiAgICApXG4gICAgK2RiLmhvc3RcbiAgICArKGRiLnBvcnQ/KCc6JytkYi5wb3J0KTonJylcbiAgICArXCIvXCIrZGIuZGJuYW1lXG47XG4vL0FkZCBwbHVnaW4gdG8gbW9uZ29vc2UgXG5tb25nb29zZS5wbHVnaW4odW5pcXVlVmFsaWRhdG9yKTtcbi8vQ29ubmVjdCB0byBNb25nbyBkYlxubW9uZ29vc2UuY29ubmVjdChkYkNvbm5lY3RVcmkpO1xuY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gXCIrZGJDb25uZWN0VXJpKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09IFNldCB1cCB0aGUgcm91dGluZyBvZiB0aGUgYXBwID09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFJlZ2lzdGVyIGNvbnRyb2xsZXJcbnVzZUV4cHJlc3NTZXJ2ZXIoYXBwLCB7XG5cdGRlZmF1bHRFcnJvckhhbmRsZXI6IGZhbHNlLCAvLyB3ZSB1c2UgY3VzdG9tIGVycm9yIGhhbmRsZXIgXG4gICAgY29udHJvbGxlcnM6W19fZGlybmFtZStcIi9hcHAvKi9jb250cm9sbGVycy8qey5qcywudHN9XCJdLFxuICAgIG1pZGRsZXdhcmVzOiBbX19kaXJuYW1lICsgXCIvbm9kZV9tb2R1bGVzLyoqL21pZGRsZXdhcmVzLyp7LmpzLC50c31cIl1cbn0pO1xuYXBwLnVzZShyb3V0ZXIpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVN0YXJ0IHRoZSBzZXJ2ZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBzZXJ2ID0gY29uZmlnLnNlcnZlcjtcbmFwcC5saXN0ZW4oc2Vydi5wb3J0LHNlcnYuaG9zdCk7XG5jb25zb2xlLmxvZyhcIkFwcCBsaXN0ZW5pbmcgXCIrc2Vydi5ob3N0K1wiOlwiK3NlcnYucG9ydCk7XG5cbiJdfQ==