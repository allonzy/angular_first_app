"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("file-system");
var registerPartialsFromRoot;
(function (registerPartialsFromRoot_1) {
    registerPartialsFromRoot_1.registerPartialsFromRoot = function (rootDir, namespace) {
        fs.readdir(rootDir, function (err, rootItems) {
            if (err) {
                throw new Error(err);
            }
            rootItems.forEach(function (file) {
                let path = rootDir + "/" + file;
                fs.stat(path, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        let namespace = file;
                        let viewsDir = path + "/views/partials";
                        if (fs.existsSync(viewsDir)) {
                            registerPartialsDir(viewsDir, namespace);
                        }
                        else {
                            registerPartialsFromRoot_1.registerPartialsFromRoot(path, namespace + '.' + file);
                        }
                    }
                });
            });
        });
    };
    function registerPartialsDir(rootDir, namespace) {
        fs.stat(rootDir, function (err, stat) {
            if (stat && stat.isDirectory()) {
                fs.readdir(rootDir, function (err, items) {
                    if (err) {
                        throw new Error(err);
                    }
                    items.forEach(function (file) {
                        registerPartialsDir(rootDir + "/" + file, namespace + "." + file);
                    });
                });
            }
            else {
                console.log(rootDir + " : " + namespace);
                return;
            }
        });
    }
})(registerPartialsFromRoot = exports.registerPartialsFromRoot || (exports.registerPartialsFromRoot = {}));
//# sourceMappingURL=registerPartials.js.map