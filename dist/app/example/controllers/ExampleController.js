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
    routing_controllers_1.Get("/renderPageFromApp"),
    routing_controllers_1.Render("example/views/simple_page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "renderFromApp", null);
__decorate([
    routing_controllers_1.Get("/renderPageFromViews"),
    routing_controllers_1.Render("example/simple_page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "renderfromView", null);
ExampleController = __decorate([
    routing_controllers_1.Controller()
], ExampleController);
exports.ExampleController = ExampleController;
//# sourceMappingURL=ExampleController.js.map