// server.js
// import * as parameter from './config/parameter.json';
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
import {registerPartialsFromRoot} from '../utils/registerPartialsFromRoot'
//================================================

//Register a partial directory recursively with a namespace (test.bite...)
registerPartialsFromRoot('app','');

//================================================

declare var __dirname;

// ==============Export component, (can be needed from controllers) ================
export let parameter = JSON.parse(fs.readFileSync('./config/parameter.json'));
export let app = express();                                            // create our app w/ express
export const router = express.Router();

// =========================Set up express ================================================
app.use(express.static('/web'));                 				// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// ===================== Handlebars (templating system) ===================================
let hbsParam = parameter.view.view_engine.handlebars;


// Add the layout system to handlebars
hbs.registerHelper(layouts(handlebars));

// set parameter from parameter.json
if(hbsParam.partials_dir){
	hbs.registerPartials(__dirname +"/"+ hbsParam.partials_dir);
	hbs.registerPartials(__dirname +"app/");
}

if(parameter.view.baseDir){
	app.set('views',[parameter.view.directory,'app/**/views/']);
}

app.set('view engine', 'hbs');

//==========================Error handling =================================================
switch(parameter.env){
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
			contact:parameter.contact
		});
	}
	else if (req.accepts('json')) {
		res.send({
			status:status,
			error:err,
			contact:parameter.contact
		});
	}
});

//======================== Database connect (mongoose) =============================
let db = parameter.database;
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
let serv = parameter.server;
app.listen(serv.port,serv.host);
console.log("App listening "+serv.host+":"+serv.port);

