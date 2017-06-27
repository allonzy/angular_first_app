import * as fs from 'fs-extra';	
import {config} from '../server'
export let errorHandler = function(err, req, res, next){
	let status = (err.httpCode)?err.httpCode:500;
	res.statusstatus
	let errorPage = fs.existsSync(config.view.directory+'/error-pages/'+status+'.hbs')?'error-pages/'+status+'.hbs'
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
};