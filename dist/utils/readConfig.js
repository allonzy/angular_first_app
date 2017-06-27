"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
exports.recursiveIncludeJson = function (rootDir, fileName) {
    let includedObject = JSON.parse(fs.readFileSync(rootDir + '/' + fileName));
    let object = {};
    if (includedObject.includes) {
        let includes = includedObject.includes;
        delete (includedObject.includes);
        for (let i in includes) {
            let includedFile = includes[i];
            object = exports.recursiveIncludeJson(rootDir, includedFile);
            includedObject = Object.assign(object, includedObject);
        }
    }
    return includedObject;
};
//# sourceMappingURL=readConfig.js.map