import * as fs from 'file-system';
import * as glob from 'glob';

export let createNameSpace = function (modulePath,moduleNameRegexp,separator,callBack){
//Register a partial directory recursively with a namespace (example.partial1...)
// registerPartialsFromRoot('app','');
	glob(modulePath, function (er, files) {
		files.forEach(function (file){
			var re = new RegExp(moduleNameRegexp);
			let match = re.exec(file);
			let moduleName = match.splice(1)
								.join('/')
								.replace(new RegExp('(\/)+','g'),'/')
								.replace('/',separator);
			callBack(file,moduleName);
		});
	});
}
