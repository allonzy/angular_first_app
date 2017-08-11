// server.js
import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as methodOverride from 'method-override';
import * as fs from 'fs-extra';
import {useExpressServer} from "routing-controllers";
import * as uniqueValidator from'mongoose-unique-validator';
import * as glob from 'glob';

import * as hbs_wrapper from 'hbs';
import * as handlebarsHelper from 'handlebars-helpers'
import * as layouts from 'handlebars-layouts';

import {helpersBundle} from "./views/helpers/bundle";
import {createNameSpace} from './utils/NameSpaceHandler';
import {readConfig,tree} from './utils/ReadConfig';
import {errorHandler} from './utils/ErrorHandler';
//================================================
export let color = {
	black:"\x1b[30m%s\x1b[0m",
	red:"\x1b[31m%s\x1b[0m",
	green:"\x1b[32m%s\x1b[0m",
	yellow:"\x1b[33m%s\x1b[0m",
	blue:"\x1b[34m%s\x1b[0m",
	magenta:"\x1b[35m%s\x1b[0m",
	cyan:"\x1b[36m%s\x1b[0m",
	white:"\x1b[36m%s\x1b[0m",		
}
//================================================
let regexQuote = function(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};
declare var __dirname;
// ==============Export component, (can be needed from controllers) ================
export let config = readConfig('./config','config.json');
export let app = express();                                            // create our app w/ express
export const router = express.Router();
export let hbs = hbs_wrapper;
// =========================Set up the logger ================================================
switch(config.env){
	case 'dev':
		// development error handler
		// will print stacktrace
		app.use(morgan('dev'));                                
		break;		
	case 'prod':
		// production error handler
		// no stacktraces leaked to user
		app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + 'var/logs/prod.log' }));
		break;
}// =========================Set up express ================================================

             				// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
//============================= PublicDir ============================================
if(config.public_directories){
	var staticDir = [];
	for (let publicDir of config.public_directories){
		createNameSpace(publicDir.directory,publicDir.moduleNameRegex,'/',(file,nameSpace)=>{
			if(staticDir.indexOf(nameSpace) === -1){
				app.use(config.static_route+'/'+nameSpace, express.static(file))
				staticDir.push(nameSpace);
				console.log("route "+file+" to "+config.static_route+"/"+nameSpace);
			}else{
				console.warn(color.yellow,
					"nameSpace error:fail to register "+file+" as {{>"+nameSpace+"}} \n" 
					+"check your partials directories to resolve conflict"
				);
			}
		});
	}
}
// app.locals = config.locals;
// ============================= Views ===============================================
app.set('views',[__dirname+"/"+config.view.directory+"/",__dirname+"/app/"]);

// ===================== Handlebars (templating system) ===================================

let hbsParam = config.view.view_engine.handlebars;

if(hbsParam.partials_location){
	var registeredPartials = [];
	for (let partial of hbsParam.partials_location){
		createNameSpace(partial.directory,partial.moduleNameRegex,'.',(file,nameSpace)=>{
			if(registeredPartials.indexOf(nameSpace) === -1){
				hbs.handlebars.registerPartial(nameSpace,fs.readFileSync(file).toString());
				registeredPartials.push(nameSpace);
				console.log("register "+file+" as {{> "+nameSpace+" }}");
			}else{
				console.warn(color.yellow,
					"nameSpace error:fail to register "+file+" as {{>"+nameSpace+"}} \n" 
					+"check your partials directories to resolve conflict"
				);
			}
		});
	}
}
/*
if(hbsParam.helper_location){
	var registeredHelpers = [];
	for (let helper of hbsParam.helper_location){
		createNameSpace(partial.directory,partial.moduleNameRegex,'.'()(file,nameSpace)=>{
			if(registeredHelpers.indexOf(nameSpace) === -1){
				module = require('./'+nameSpace);
				hbs.handlebars.registerHelper(nameSpace.helperName,helper);
				registeredHelpers.push(nameSpace);
				console.log("register "+file+" as {{> "+nameSpace+" }}");
			}else{
				console.warn(color.yellow,
					"nameSpace error:fail to register "+file+" as {{>"+nameSpace+"}} \n" 
					+"check your partials directories to resolve conflict"
				);
			}
		});
	}
}*/
let utilsHelper = handlebarsHelper({
		handlebars: hbs.handlebars
	});
hbs.registerHelper(layouts(hbs.handlebars));
hbs.registerHelper(utilsHelper);
hbs.registerHelper(helpersBundle);

app.set('view engine', 'hbs');

// Register controller
useExpressServer(app, {
	defaultErrorHandler: false, // we use custom error handler 
    controllers:[__dirname+"/app/**/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
app.use(router);
//==========================Error handling =================================================
app.use(errorHandler);
app.use(function(req, res, next){
	if(res.statusCode 
		&& res.statusCode === 404
		&& req.originalUrl.startsWith(config.static_route) == false){
			res.status(404).render('error-pages/404', { url: req.originalUrl });

	}else{
		next();
	}
});
//======================== Database connect (mongoose) =============================
let db = config.database;
let dbConnectUri = db.driver+"://"
    +((db.username && db.password)?
        (db.username+':'+db.password+"@"):''
    )
    +db.host
    +(db.port?(':'+db.port):'')
    +"/"+db.dbname
;
//Add plugin to mongoose 
mongoose.plugin(uniqueValidator);
mongoose.Promise = bluebird;

//Connect to Mongo db
mongoose.connect(dbConnectUri);
console.log("Connected to "+dbConnectUri);

//====================================Start the server ======================================
app.get('/', function (req, res) {
  res.render('index');
})

let serv = config.server;
app.listen(serv.port,serv.host);
console.log(color.green,"server started on :"+serv.host+":"+serv.port);
