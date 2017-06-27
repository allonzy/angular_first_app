import * as fs from 'fs-extra';

export let recursiveIncludeJson = function (rootDir,fileName){
	let includedObject = JSON.parse(fs.readFileSync(rootDir+'/'+fileName));
	let object ={};
	if(includedObject.includes){
		let includes = includedObject.includes
		delete (includedObject.includes);
		for(let i in includes){
			let includedFile = includes[i];
			object = recursiveIncludeJson(rootDir,includedFile);
			includedObject = Object.assign(object,includedObject);
		}
	}
	return includedObject;
};