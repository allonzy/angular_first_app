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
    routing_controllers_1.Get("/hello"),
    routing_controllers_1.Render("hello_world"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "renderHello", null);
TodoController = __decorate([
    routing_controllers_1.Controller()
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2hlbGxvV29ybGQvY29udHJvbGxlcnMvaGVsbG9Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9hcHAvaGVsbG9Xb3JsZC9jb250cm9sbGVycy9oZWxsb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFHMUIsNkRBQWdIO0FBR2hILElBQWEsY0FBYyxHQUEzQjtJQUVJLFdBQVc7UUFDUCxNQUFNLElBQUkseUNBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsV0FBVztRQUNKLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUE7QUFSRztJQURDLHlCQUFHLENBQUMsUUFBUSxDQUFDOzs7O2lEQUdiO0FBR0Q7SUFGQyx5QkFBRyxDQUFDLFFBQVEsQ0FBQztJQUNiLDRCQUFNLENBQUMsYUFBYSxDQUFDOzs7O2lEQUdyQjtBQVRRLGNBQWM7SUFEMUIsZ0NBQVUsRUFBRTtHQUNBLGNBQWMsQ0FVMUI7QUFWWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcblxuaW1wb3J0IHtDb250cm9sbGVyLCBQYXJhbSwgQm9keSwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSxSZW5kZXIsSW50ZXJuYWxTZXJ2ZXJFcnJvcn0gIGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBUb2RvQ29udHJvbGxlciB7XG4gICAgQEdldChcIi9lcnJvclwiKVxuICAgIHJlbmRlckVycm9yKCkge1xuICAgIFx0ICAgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3IoXCJoZWxsbyB3b3JsZCBlcnJvclwiKTsgICAgXHRcbiAgICB9XG4gICAgQEdldChcIi9oZWxsb1wiKVxuICAgIEBSZW5kZXIoXCJoZWxsb193b3JsZFwiKVxuICAgIHJlbmRlckhlbGxvKCkge1xuICAgICAgICAgICByZXR1cm4ge307ICAgICBcbiAgICB9XG59Il19