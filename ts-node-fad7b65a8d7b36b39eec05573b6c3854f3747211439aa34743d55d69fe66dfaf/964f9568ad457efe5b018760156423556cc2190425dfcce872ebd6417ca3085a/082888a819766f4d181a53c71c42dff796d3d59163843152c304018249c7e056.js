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
], TodoController.prototype, "renderError", null);
__decorate([
    routing_controllers_1.Get("renderTemplateFromApp"),
    routing_controllers_1.Render("/helloWorld/views/simple_page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "renderFromApp", null);
__decorate([
    routing_controllers_1.Get("renderTemplateFromView"),
    routing_controllers_1.Render("/example/simple_page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "renderfromView", null);
TodoController = __decorate([
    routing_controllers_1.Controller()
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2V4YW1wbGUvY29udHJvbGxlcnMvRXhhbXBsZUNvbnRyb2xsZXIudHMiLCJzb3VyY2VzIjpbIi9ob21lL3NpbW9udml2aWVyL3dvcmtzcGFjZS9hcHBsaV9hbmd1bGFyL215X2ZpcnN0X2FuZ3VsYXJfYXBwL2FwcC9leGFtcGxlL2NvbnRyb2xsZXJzL0V4YW1wbGVDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNEJBQTBCO0FBRTFCLDZEQUF1SDtBQUl2SCxJQUFhLGNBQWMsR0FBM0I7SUFFSSxXQUFXO1FBQ1AsTUFBTSxJQUFJLHlDQUFtQixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUdELGFBQWE7UUFDTixNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsY0FBYztRQUNQLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBQyxDQUFDO0lBQ3ZELENBQUM7Q0FFSixDQUFBO0FBZEc7SUFEQyx5QkFBRyxDQUFDLFFBQVEsQ0FBQzs7OztpREFHYjtBQUdEO0lBRkMseUJBQUcsQ0FBQyx1QkFBdUIsQ0FBQztJQUM1Qiw0QkFBTSxDQUFDLCtCQUErQixDQUFDOzs7O21EQUd2QztBQUdEO0lBRkMseUJBQUcsQ0FBQyx3QkFBd0IsQ0FBQztJQUM3Qiw0QkFBTSxDQUFDLHNCQUFzQixDQUFDOzs7O29EQUc5QjtBQWRRLGNBQWM7SUFEMUIsZ0NBQVUsRUFBRTtHQUNBLGNBQWMsQ0FnQjFCO0FBaEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuXG5pbXBvcnQge0NvbnRyb2xsZXIsIFBhcmFtLCBCb2R5LCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFJlbmRlcixJbnRlcm5hbFNlcnZlckVycm9yLE9uTnVsbH0gIGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5cblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIFRvZG9Db250cm9sbGVyIHtcbiAgICBAR2V0KFwiL2Vycm9yXCIpXG4gICAgcmVuZGVyRXJyb3IoKSB7XG4gICAgXHQgICB0aHJvdyBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvcihcImhlbGxvIHdvcmxkIGVycm9yXCIpOyAgICBcdFxuICAgIH1cbiAgICBAR2V0KFwicmVuZGVyVGVtcGxhdGVGcm9tQXBwXCIpXG4gICAgQFJlbmRlcihcIi9oZWxsb1dvcmxkL3ZpZXdzL3NpbXBsZV9wYWdlXCIpXG4gICAgcmVuZGVyRnJvbUFwcCgpIHtcbiAgICAgICAgICAgcmV0dXJuIHtjb250ZW50OiBcImxvcmVtIGlwc3VtIHNpdCBkb2xvciBhbWV0IFwifTtcbiAgICB9XG4gICAgQEdldChcInJlbmRlclRlbXBsYXRlRnJvbVZpZXdcIilcbiAgICBAUmVuZGVyKFwiL2V4YW1wbGUvc2ltcGxlX3BhZ2VcIilcbiAgICByZW5kZXJmcm9tVmlldygpIHtcbiAgICAgICAgICAgcmV0dXJuIHtjb250ZW50OiBcImxvcmVtIGlwc3VtIHNpdCBkb2xvciBhbWV0IFwifTtcbiAgICB9XG5cbn0iXX0=