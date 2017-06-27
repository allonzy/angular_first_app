// server.js
import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as methodOverride from 'method-override';
// import * as fs from 'file-system';
import * as fs from 'fs-extra';
import * as hbs from 'hbs';
import * as handlebars from 'handlebars';
import {useExpressServer} from "routing-controllers";
import * as uniqueValidator from'mongoose-unique-validator';
import * as layouts from 'handlebars-layouts';
import * as glob from 'glob';

import {createNameSpace} from './utils/nameSpaceHandler';
import {recursiveIncludeJson} from './utils/readConfig';
import {errorHandler} from './utils/errorHandler';
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
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
});
// Register all partials with namespace
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
						"nameSpace error:fail to register "+file+" as {{>"+nameSpace+"}} \n" 
						+"check your partials directories to resolve conflict"
					);
			}
		});	
	}
}


// ============================= Views ===============================================

app.set('views',[__dirname+"/"+config.view.directory+"/",__dirname+"/app/"]);
app.set('view engine', 'hbs');

//=============================Public dir ==================================================
//Create symlink from app to public dir
fs.remove(config.public+"/app",function(err){
	if(err) throw new Error(err);
	console.log("clear existing symlink to "+config.public+"/app");	
	// link all public from app to public 
	createNameSpace('app/**/'+config.public+'/',"app\/(.*)\/"+config.public+"\/",'/',function(file,nameSpace){
		fs.ensureSymlink(__dirname+"/"+file,__dirname+"/"+config.public+'/app/'+nameSpace,function(err){
			if(err) throw new Error(err);
			console.log("create symlink: "+file+" -> "+"app/"+nameSpace);
		});
	});
});
//====================== Controller/Routing =========================
// Register controller
useExpressServer(app, {
	defaultErrorHandler: false, // we use custom error handler 
    controllers:[__dirname+"/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
app.use(router);
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

app.use(errorHandler);

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



//====================================Start the server ======================================
let serv = config.server;
app.listen(serv.port,serv.host);
console.log("App listening "+serv.host+":"+serv.port);