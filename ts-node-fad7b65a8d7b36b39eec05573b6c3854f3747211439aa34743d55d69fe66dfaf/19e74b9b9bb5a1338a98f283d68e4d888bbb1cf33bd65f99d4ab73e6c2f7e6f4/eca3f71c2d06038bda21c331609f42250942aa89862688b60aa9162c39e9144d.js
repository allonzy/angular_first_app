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
    renderView() {
        return {
            title: "howdi",
            content: [
                "warudo"
            ]
        };
    }
};
__decorate([
    routing_controllers_1.Get("/todo-list"),
    routing_controllers_1.Render("renderTodoList"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "renderView", null);
TodoController = __decorate([
    routing_controllers_1.Controller()
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL3RvZG9MaXN0L2NvbnRyb2xsZXJzL1RvZG9Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9hcHAvdG9kb0xpc3QvY29udHJvbGxlcnMvVG9kb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFHMUIsNkRBQTRGO0FBSTVGLElBQWEsY0FBYyxHQUEzQjtJQUdJLFVBQVU7UUFVVCxNQUFNLENBQUM7WUFDTixLQUFLLEVBQUMsT0FBTztZQUNiLE9BQU8sRUFBQztnQkFDUCxRQUFRO2FBQ1I7U0FDRCxDQUFDO0lBQ0gsQ0FBQztDQUNKLENBQUE7QUFqQkc7SUFGQyx5QkFBRyxDQUFDLFlBQVksQ0FBQztJQUNqQiw0QkFBTSxDQUFDLGdCQUFnQixDQUFDOzs7O2dEQWlCeEI7QUFuQlEsY0FBYztJQUQxQixnQ0FBVSxFQUFFO0dBQ0EsY0FBYyxDQW9CMUI7QUFwQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5kZWNsYXJlIHZhciBfX2Rpcm5hbWU7XG5cbmltcG9ydCB7Q29udHJvbGxlciwgUGFyYW0sIEJvZHksIEdldCwgUG9zdCwgUHV0LCBEZWxldGUsUmVuZGVyfSAgZnJvbSBcInJvdXRpbmctY29udHJvbGxlcnNcIjtcbmltcG9ydCB7VG9kb30gZnJvbSAnLi4vbW9kZWwvVG9kbydcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIFRvZG9Db250cm9sbGVyIHtcbiAgICBAR2V0KFwiL3RvZG8tbGlzdFwiKVxuICAgIEBSZW5kZXIoXCJyZW5kZXJUb2RvTGlzdFwiKVxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgXHQvKlxuICAgIFx0bGV0IHRvZG8xID0gbmV3IFRvZG8oe1xuICAgIFx0XHR0aXRsZTpcImhvd2RpXCIsXG4gICAgXHRcdHRleHQ6XCJ3YXJ1ZG9cIlxuICAgIFx0fSk7XG4gICAgXHR0b2RvMS5zYXZlKGZ1bmN0aW9uKGVycil7XG4gICAgXHRcdGlmIChlcnIpIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgIFx0fSk7XG4gICAgXHQqL1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0dGl0bGU6XCJob3dkaVwiLFxuICAgIFx0XHRjb250ZW50Oltcblx0ICAgIFx0XHRcIndhcnVkb1wiXG4gICAgXHRcdF1cbiAgICBcdH07XG4gICAgfVxufSJdfQ==