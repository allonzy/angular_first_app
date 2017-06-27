"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
exports.getNameSpace = function (modulePath, moduleNameRegexp, separator, callBack) {
    glob(modulePath, function (er, files) {
        files.forEach(function (file) {
            var re = new RegExp(moduleNameRegexp);
            let match = re.exec(file);
            let moduleName = match.splice(1)
                .join('/')
                .replace(new RegExp('(\/)+', 'g'), '/')
                .replace('/', separator);
            callBack(file, moduleName);
        });
    });
};
//# sourceMappingURL=NameSpaceHandler.js.map