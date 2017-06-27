"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
exports.createNameSpace = function (modulePath, moduleNameRegexp, separator, callBack) {
    glob(modulePath, function (er, files) {
        files.forEach(function (file) {
            var re = new RegExp(moduleNameRegexp);
            let matches = re.exec(file);
            if (matches) {
                let moduleName = matches.splice(1)
                    .join('/')
                    .replace(new RegExp('(\/)+', 'g'), '/')
                    .replace('/', separator);
                callBack(file, moduleName);
            }
        });
    });
};
//# sourceMappingURL=nameSpaceHandler.js.map