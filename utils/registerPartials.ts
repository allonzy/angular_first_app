import * as fs from 'file-system';
export module registerPartialsFromRoot{
export let registerPartialsFromRoot = function (rootDir,namespace){
	fs.readdir(rootDir, function (err, rootItems) {
		if (err){
			throw new Error(err);
		}
		// For every file in the list
		rootItems.forEach(function (file) {
			// Full path of that file
			let path = rootDir + "/" + file;
			// Get the file's stats
			fs.stat(path, function (err, stat) {
				// If the file is a directory
				if (stat && stat.isDirectory()){
					let namespace = file;
					let viewsDir = path+"/views/partials";
					if (fs.existsSync(viewsDir)) {
						registerPartialsDir(viewsDir,namespace);
					}else{
						registerPartialsFromRoot(path,namespace+'.'+file);
					}
				}
			});
		});
	});
}

//Register a partial directory recursively with a namespace (test.bite...)
function registerPartialsDir(rootDir,namespace){
	fs.stat(rootDir, function (err, stat) {
		if (stat && stat.isDirectory()){
			fs.readdir(rootDir, function (err, items) {
				if (err){
					throw new Error(err);
				}
				items.forEach(function (file) {
					registerPartialsDir(rootDir+"/"+file,namespace+"."+file);
				});
			});
		}
		else {
			console.log(rootDir+" : "+namespace);
			return;
		}
	});

}
}
