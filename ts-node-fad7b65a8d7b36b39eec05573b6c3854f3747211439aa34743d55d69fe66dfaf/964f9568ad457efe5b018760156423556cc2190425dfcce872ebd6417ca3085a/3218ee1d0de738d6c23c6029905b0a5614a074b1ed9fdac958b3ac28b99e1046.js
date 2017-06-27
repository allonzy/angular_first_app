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
let ExampleController = class ExampleController {
    renderError() {
        throw new routing_controllers_1.InternalServerError("hello world error");
    }
    renderFromApp() {
        return { content: "lorem ipsum sit dolor amet " };
    }
    renderfromView() {
        return { content: "lorem ipsum sit dolor amet " };
    }
};
__decorate([
    routing_controllers_1.Get("/error"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "renderError", null);
__decorate([
    routing_controllers_1.Get("renderPageFromApp"),
    routing_controllers_1.Render("/helloWorld/views/simple_page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "renderFromApp", null);
__decorate([
    routing_controllers_1.Get("renderPageFromApp"),
    routing_controllers_1.Render("/example/simple_page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "renderfromView", null);
ExampleController = __decorate([
    routing_controllers_1.Controller()
], ExampleController);
exports.ExampleController = ExampleController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2V4YW1wbGUvY29udHJvbGxlcnMvRXhhbXBsZUNvbnRyb2xsZXIudHMiLCJzb3VyY2VzIjpbIi9ob21lL3NpbW9udml2aWVyL3dvcmtzcGFjZS9hcHBsaV9hbmd1bGFyL215X2ZpcnN0X2FuZ3VsYXJfYXBwL2FwcC9leGFtcGxlL2NvbnRyb2xsZXJzL0V4YW1wbGVDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNEJBQTBCO0FBRTFCLDZEQUF1SDtBQUl2SCxJQUFhLGlCQUFpQixHQUE5QjtJQUVJLFdBQVc7UUFDUCxNQUFNLElBQUkseUNBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsYUFBYTtRQUNOLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBQyxDQUFDO0lBQ3ZELENBQUM7SUFHRCxjQUFjO1FBQ1AsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLDZCQUE2QixFQUFDLENBQUM7SUFDdkQsQ0FBQztDQUVKLENBQUE7QUFkRztJQURDLHlCQUFHLENBQUMsUUFBUSxDQUFDOzs7O29EQUdiO0FBR0Q7SUFGQyx5QkFBRyxDQUFDLG1CQUFtQixDQUFDO0lBQ3hCLDRCQUFNLENBQUMsK0JBQStCLENBQUM7Ozs7c0RBR3ZDO0FBR0Q7SUFGQyx5QkFBRyxDQUFDLG1CQUFtQixDQUFDO0lBQ3hCLDRCQUFNLENBQUMsc0JBQXNCLENBQUM7Ozs7dURBRzlCO0FBZFEsaUJBQWlCO0lBRDdCLGdDQUFVLEVBQUU7R0FDQSxpQkFBaUIsQ0FnQjdCO0FBaEJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcblxuaW1wb3J0IHtDb250cm9sbGVyLCBQYXJhbSwgQm9keSwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSxSZW5kZXIsSW50ZXJuYWxTZXJ2ZXJFcnJvcixPbk51bGx9ICBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuXG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBFeGFtcGxlQ29udHJvbGxlciB7XG4gICAgQEdldChcIi9lcnJvclwiKVxuICAgIHJlbmRlckVycm9yKCkge1xuICAgIFx0ICAgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3IoXCJoZWxsbyB3b3JsZCBlcnJvclwiKTsgICAgXHRcbiAgICB9XG4gICAgQEdldChcInJlbmRlclBhZ2VGcm9tQXBwXCIpXG4gICAgQFJlbmRlcihcIi9oZWxsb1dvcmxkL3ZpZXdzL3NpbXBsZV9wYWdlXCIpXG4gICAgcmVuZGVyRnJvbUFwcCgpIHtcbiAgICAgICAgICAgcmV0dXJuIHtjb250ZW50OiBcImxvcmVtIGlwc3VtIHNpdCBkb2xvciBhbWV0IFwifTtcbiAgICB9XG4gICAgQEdldChcInJlbmRlclBhZ2VGcm9tQXBwXCIpXG4gICAgQFJlbmRlcihcIi9leGFtcGxlL3NpbXBsZV9wYWdlXCIpXG4gICAgcmVuZGVyZnJvbVZpZXcoKSB7XG4gICAgICAgICAgIHJldHVybiB7Y29udGVudDogXCJsb3JlbSBpcHN1bSBzaXQgZG9sb3IgYW1ldCBcIn07XG4gICAgfVxuXG59Il19