// server.js
import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as methodOverride from 'method-override';
import * as fs from 'file-system';
import * as hbs from 'hbs';
import * as handlebars from 'handlebars';
import {useExpressServer} from "routing-controllers";
import * as uniqueValidator from'mongoose-unique-validator';
import * as errorHandler from'express-error-handler'
import * as layouts from 'handlebars-layouts';
import {createNameSpace} from './utils/nameSpaceHandler';
import {recursiveIncludeJson} from './utils/readConfig'
import * as glob from 'glob';

//================================================

//================================================

declare var __dirname;
// ==============Export component, (can be needed from controllers) ================
export let config = recursiveIncludeJson('./config','config.json');
export let app = express();                                            // create our app w/ express
export const router = express.Router();

// =========================Set up express ================================================
app.use(express.static('/web'));                 				// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// ===================== Handlebars (templating system) ===================================
let hbsParam = config.view.view_engine.handlebars;


// Add the layout system to handlebars
hbs.registerHelper(layouts(handlebars));



//TODO read directory from configs
// set config from config.json
if(hbsParam.partials_location){
		var registeredPartials = [];
		for (let i in hbsParam.partials_location){
			let partial = hbsParam.partials_location[i];
			createNameSpace(partial.directory,partial.moduleNameRegex,'.',function(file,nameSpace){
			if(registeredPartials.indexOf(nameSpace) === -1){
				hbs.registerPartial(nameSpace,file);
				registeredPartials.push(nameSpace);
				console.log("register "+file+" as {{>"+nameSpace+"}}");
			}else{
				console.error("\x1b[31m%s\x1b[0m",
						"nameSpace error:try to register "+file+" as {{>"+nameSpace+"}} \n" 
						+"check your views directory to resolve conflict"
					);
			}
		});	
	}
}
if(config.view.baseDir){
	app.set('views',[config.view.directory,'app/**/views/']);
}

app.set('view engine', 'hbs');

//==========================Error handling =================================================
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
}

app.use(function(err, req, res, next){
	console.log(app.get('views'));
	let status = (err.httpCode)?err.httpCode:500;
	res.statusstatus
	let errorPage = fs.existsSync(app.get('views')+'/error-pages/'+status+'.hbs')?'error-pages/'+status+'.hbs'
			:'error-pages/default.hbs';
	if (req.accepts('html')) {
		res.render(errorPage, {
			status:status,
			error: err,
			url: req.url,
			contact:config.contact
		});
	}
	else if (req.accepts('json')) {
		res.send({
			status:status,
			error:err,
			contact:config.contact
		});
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
//Connect to Mongo db
mongoose.connect(dbConnectUri);
console.log("Connected to "+dbConnectUri);

//====================== Set up the routing of the app =========================
// Register controller
useExpressServer(app, {
	defaultErrorHandler: false, // we use custom error handler 
    controllers:[__dirname+"/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
app.use(router);

//====================================Start the server ======================================
let serv = config.server;
app.listen(serv.port,serv.host);
console.log("App listening "+serv.host+":"+serv.port);

