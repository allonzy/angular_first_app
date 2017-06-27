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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvbmFtZVNwYWNlSGFuZGxlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvbmFtZVNwYWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZCQUE2QjtBQUVsQixRQUFBLGVBQWUsR0FBRyxVQUFVLFVBQVUsRUFBQyxnQkFBZ0IsRUFBQyxTQUFTLEVBQUMsUUFBUTtJQUdwRixJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUs7UUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7WUFDM0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7Z0JBQ1gsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQzdCLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQ1QsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBQyxHQUFHLENBQUMsRUFBQyxHQUFHLENBQUM7cUJBQ3BDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLFFBQVEsQ0FBQyxJQUFJLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBnbG9iIGZyb20gJ2dsb2InO1xuXG5leHBvcnQgbGV0IGNyZWF0ZU5hbWVTcGFjZSA9IGZ1bmN0aW9uIChtb2R1bGVQYXRoLG1vZHVsZU5hbWVSZWdleHAsc2VwYXJhdG9yLGNhbGxCYWNrKXtcbi8vUmVnaXN0ZXIgYSBwYXJ0aWFsIGRpcmVjdG9yeSByZWN1cnNpdmVseSB3aXRoIGEgbmFtZXNwYWNlIChleGFtcGxlLnBhcnRpYWwxLi4uKVxuLy8gcmVnaXN0ZXJQYXJ0aWFsc0Zyb21Sb290KCdhcHAnLCcnKTtcblx0Z2xvYihtb2R1bGVQYXRoLCBmdW5jdGlvbiAoZXIsIGZpbGVzKSB7XG5cdFx0ZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSl7XG5cdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKG1vZHVsZU5hbWVSZWdleHApO1xuXHRcdFx0bGV0IG1hdGNoZXMgPSByZS5leGVjKGZpbGUpO1xuXHRcdFx0aWYobWF0Y2hlcyl7XG5cdFx0XHRcdGxldCBtb2R1bGVOYW1lID0gbWF0Y2hlcy5zcGxpY2UoMSlcblx0XHRcdFx0XHRcdFx0XHQuam9pbignLycpXG5cdFx0XHRcdFx0XHRcdFx0LnJlcGxhY2UobmV3IFJlZ0V4cCgnKFxcLykrJywnZycpLCcvJylcblx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgnLycsc2VwYXJhdG9yKTtcblx0XHRcdFx0Y2FsbEJhY2soZmlsZSxtb2R1bGVOYW1lKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG4iXX0=