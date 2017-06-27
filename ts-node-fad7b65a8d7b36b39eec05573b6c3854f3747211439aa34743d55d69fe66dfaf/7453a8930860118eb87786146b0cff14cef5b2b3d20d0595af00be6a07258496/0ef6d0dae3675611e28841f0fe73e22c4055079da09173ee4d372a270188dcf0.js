"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
let TodoController = class TodoController {
    renderError() {
        throw new routing_controllers_1.InternalServerError("hello world error");
    }
    renderHello() {
        return {};
    }
};
__decorate([
    routing_controllers_1.Get("/error"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "renderError", null);
__decorate([
    routing_controllers_1.Get("/helloWorld/views/test_1"),
    routing_controllers_1.Render(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "renderHello", null);
TodoController = __decorate([
    routing_controllers_1.Controller()
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2hlbGxvV29ybGQvY29udHJvbGxlcnMvaGVsbG9Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9hcHAvaGVsbG9Xb3JsZC9jb250cm9sbGVycy9oZWxsb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIsNkRBQXVIO0FBSXZILElBQWEsY0FBYyxHQUEzQjtJQUVJLFdBQVc7UUFDUCxNQUFNLElBQUkseUNBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsV0FBVztRQUNKLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUE7QUFSRztJQURDLHlCQUFHLENBQUMsUUFBUSxDQUFDOzs7O2lEQUdiO0FBR0Q7SUFGQyx5QkFBRyxDQUFDLDBCQUEwQixDQUFDO0lBQy9CLDRCQUFNLENBQUMsRUFBRSxDQUFDOzs7O2lEQUdWO0FBVFEsY0FBYztJQUQxQixnQ0FBVSxFQUFFO0dBQ0EsY0FBYyxDQVUxQjtBQVZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuXG5pbXBvcnQge0NvbnRyb2xsZXIsIFBhcmFtLCBCb2R5LCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFJlbmRlcixJbnRlcm5hbFNlcnZlckVycm9yLE9uTnVsbH0gIGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5cblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIFRvZG9Db250cm9sbGVyIHtcbiAgICBAR2V0KFwiL2Vycm9yXCIpXG4gICAgcmVuZGVyRXJyb3IoKSB7XG4gICAgXHQgICB0aHJvdyBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvcihcImhlbGxvIHdvcmxkIGVycm9yXCIpOyAgICBcdFxuICAgIH1cbiAgICBAR2V0KFwiL2hlbGxvV29ybGQvdmlld3MvdGVzdF8xXCIpXG4gICAgQFJlbmRlcihcIlwiKVxuICAgIHJlbmRlckhlbGxvKCkge1xuICAgICAgICAgICByZXR1cm4ge307XG4gICAgfVxufSJdfQ==