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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvbmFtZVNwYWNlSGFuZGxlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvbmFtZVNwYWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZCQUE2QjtBQUVsQixRQUFBLFlBQVksR0FBRyxVQUFVLFVBQVUsRUFBQyxnQkFBZ0IsRUFBQyxTQUFTLEVBQUMsUUFBUTtJQUdqRixJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUs7UUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7WUFDM0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2lCQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLEVBQUMsR0FBRyxDQUFDO2lCQUNwQyxPQUFPLENBQUMsR0FBRyxFQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5cbmV4cG9ydCBsZXQgZ2V0TmFtZVNwYWNlID0gZnVuY3Rpb24gKG1vZHVsZVBhdGgsbW9kdWxlTmFtZVJlZ2V4cCxzZXBhcmF0b3IsY2FsbEJhY2spe1xuLy9SZWdpc3RlciBhIHBhcnRpYWwgZGlyZWN0b3J5IHJlY3Vyc2l2ZWx5IHdpdGggYSBuYW1lc3BhY2UgKGV4YW1wbGUucGFydGlhbDEuLi4pXG4vLyByZWdpc3RlclBhcnRpYWxzRnJvbVJvb3QoJ2FwcCcsJycpO1xuXHRnbG9iKG1vZHVsZVBhdGgsIGZ1bmN0aW9uIChlciwgZmlsZXMpIHtcblx0XHRmaWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdHZhciByZSA9IG5ldyBSZWdFeHAobW9kdWxlTmFtZVJlZ2V4cCk7XG5cdFx0XHRsZXQgbWF0Y2ggPSByZS5leGVjKGZpbGUpO1xuXHRcdFx0bGV0IG1vZHVsZU5hbWUgPSBtYXRjaC5zcGxpY2UoMSlcblx0XHRcdFx0XHRcdFx0XHQuam9pbignLycpXG5cdFx0XHRcdFx0XHRcdFx0LnJlcGxhY2UobmV3IFJlZ0V4cCgnKFxcLykrJywnZycpLCcvJylcblx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgnLycsc2VwYXJhdG9yKTtcblx0XHRcdGNhbGxCYWNrKGZpbGUsbW9kdWxlTmFtZSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuIl19