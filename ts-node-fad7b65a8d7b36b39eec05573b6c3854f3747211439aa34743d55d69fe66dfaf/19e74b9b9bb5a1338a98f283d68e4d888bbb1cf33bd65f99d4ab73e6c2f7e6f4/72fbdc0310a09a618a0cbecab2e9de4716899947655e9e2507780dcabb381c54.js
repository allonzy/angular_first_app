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
const Todo_1 = require("../model/Todo");
let TodoController = class TodoController {
    renderView() {
        let todo1 = new Todo_1.Todo({
            title: "howdi",
            text: "warudo"
        });
        todo1.save(function (err) {
            if (err)
                throw new Error(err);
        });
        return {
            title: todo1.title,
            content: [
                todo1.text
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL3RvZG9MaXN0L2NvbnRyb2xsZXJzL1RvZG9Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9hcHAvdG9kb0xpc3QvY29udHJvbGxlcnMvVG9kb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFHMUIsNkRBQTRGO0FBQzVGLHdDQUFrQztBQUdsQyxJQUFhLGNBQWMsR0FBM0I7SUFHSSxVQUFVO1FBQ1QsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUM7WUFDcEIsS0FBSyxFQUFDLE9BQU87WUFDYixJQUFJLEVBQUMsUUFBUTtTQUNiLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBUyxHQUFHO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDO1lBQ04sS0FBSyxFQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sRUFBQztnQkFDUCxLQUFLLENBQUMsSUFBSTthQUNWO1NBQ0QsQ0FBQztJQUNILENBQUM7Q0FDSixDQUFBO0FBZkc7SUFGQyx5QkFBRyxDQUFDLFlBQVksQ0FBQztJQUNqQiw0QkFBTSxDQUFDLGdCQUFnQixDQUFDOzs7O2dEQWV4QjtBQWpCUSxjQUFjO0lBRDFCLGdDQUFVLEVBQUU7R0FDQSxjQUFjLENBa0IxQjtBQWxCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcblxuaW1wb3J0IHtDb250cm9sbGVyLCBQYXJhbSwgQm9keSwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSxSZW5kZXJ9ICBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuaW1wb3J0IHtUb2RvfSBmcm9tICcuLi9tb2RlbC9Ub2RvJ1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgY2xhc3MgVG9kb0NvbnRyb2xsZXIge1xuICAgIEBHZXQoXCIvdG9kby1saXN0XCIpXG4gICAgQFJlbmRlcihcInJlbmRlclRvZG9MaXN0XCIpXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICBcdGxldCB0b2RvMSA9IG5ldyBUb2RvKHtcbiAgICBcdFx0dGl0bGU6XCJob3dkaVwiLFxuICAgIFx0XHR0ZXh0Olwid2FydWRvXCJcbiAgICBcdH0pO1xuICAgIFx0dG9kbzEuc2F2ZShmdW5jdGlvbihlcnIpe1xuICAgIFx0XHRpZiAoZXJyKSB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICBcdH0pO1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0dGl0bGU6dG9kbzEudGl0bGUsXG4gICAgXHRcdGNvbnRlbnQ6W1xuXHQgICAgXHRcdHRvZG8xLnRleHRcbiAgICBcdFx0XVxuICAgIFx0fTtcbiAgICB9XG59Il19