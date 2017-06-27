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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
    undefined(id) {
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
__decorate([
    routing_controllers_1.Get("/notFound"),
    routing_controllers_1.OnNull(404),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "undefined", null);
TodoController = __decorate([
    routing_controllers_1.Controller()
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2hlbGxvV29ybGQvY29udHJvbGxlcnMvaGVsbG9Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9hcHAvaGVsbG9Xb3JsZC9jb250cm9sbGVycy9oZWxsb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFHMUIsNkRBQXVIO0FBR3ZILElBQWEsY0FBYyxHQUEzQjtJQUVJLFdBQVc7UUFDUCxNQUFNLElBQUkseUNBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsV0FBVztRQUNKLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUdELFNBQVMsQ0FBYyxFQUFVO1FBQzFCLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUE7QUFiRztJQURDLHlCQUFHLENBQUMsUUFBUSxDQUFDOzs7O2lEQUdiO0FBR0Q7SUFGQyx5QkFBRyxDQUFDLFFBQVEsQ0FBQztJQUNiLDRCQUFNLENBQUMsYUFBYSxDQUFDOzs7O2lEQUdyQjtBQUdEO0lBRkMseUJBQUcsQ0FBQyxXQUFXLENBQUM7SUFDaEIsNEJBQU0sQ0FBQyxHQUFHLENBQUM7SUFDRCxXQUFBLDJCQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7K0NBRXJCO0FBZFEsY0FBYztJQUQxQixnQ0FBVSxFQUFFO0dBQ0EsY0FBYyxDQWUxQjtBQWZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuXG5pbXBvcnQge0NvbnRyb2xsZXIsIFBhcmFtLCBCb2R5LCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFJlbmRlcixJbnRlcm5hbFNlcnZlckVycm9yLE9uTnVsbH0gIGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBUb2RvQ29udHJvbGxlciB7XG4gICAgQEdldChcIi9lcnJvclwiKVxuICAgIHJlbmRlckVycm9yKCkge1xuICAgIFx0ICAgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3IoXCJoZWxsbyB3b3JsZCBlcnJvclwiKTsgICAgXHRcbiAgICB9XG4gICAgQEdldChcIi9oZWxsb1wiKVxuICAgIEBSZW5kZXIoXCJoZWxsb193b3JsZFwiKVxuICAgIHJlbmRlckhlbGxvKCkge1xuICAgICAgICAgICByZXR1cm4ge307ICAgICBcbiAgICB9XG4gICAgQEdldChcIi9ub3RGb3VuZFwiKVxuICAgIEBPbk51bGwoNDA0KVxuICAgIHVuZGVmaW5lZChAUGFyYW0oXCJpZFwiKSBpZDogbnVtYmVyKSB7XG4gICAgICAgICAgIHJldHVybiB7fTsgICAgIFxuICAgIH1cbn0iXX0=