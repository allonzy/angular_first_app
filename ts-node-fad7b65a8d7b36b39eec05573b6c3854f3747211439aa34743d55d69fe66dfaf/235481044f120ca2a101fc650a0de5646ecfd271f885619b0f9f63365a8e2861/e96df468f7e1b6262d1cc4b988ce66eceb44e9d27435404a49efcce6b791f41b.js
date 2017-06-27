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
                throw new routing_controllers_1.InternalServerError(err);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL3RvZG9MaXN0L2NvbnRyb2xsZXJzL1RvZG9Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9hcHAvdG9kb0xpc3QvY29udHJvbGxlcnMvVG9kb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFHMUIsNkRBQWdIO0FBQ2hILHdDQUFrQztBQUdsQyxJQUFhLGNBQWMsR0FBM0I7SUFHSSxVQUFVO1FBQ1QsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUM7WUFDcEIsS0FBSyxFQUFDLE9BQU87WUFDYixJQUFJLEVBQUMsUUFBUTtTQUNiLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBUyxHQUFHO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFBQyxNQUFNLElBQUkseUNBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUM7WUFDTixLQUFLLEVBQUMsS0FBSyxDQUFDLEtBQUs7WUFDakIsT0FBTyxFQUFDO2dCQUNQLEtBQUssQ0FBQyxJQUFJO2FBQ1Y7U0FDRCxDQUFDO0lBQ0gsQ0FBQztDQUNKLENBQUE7QUFmRztJQUZDLHlCQUFHLENBQUMsWUFBWSxDQUFDO0lBQ2pCLDRCQUFNLENBQUMsZ0JBQWdCLENBQUM7Ozs7Z0RBZXhCO0FBakJRLGNBQWM7SUFEMUIsZ0NBQVUsRUFBRTtHQUNBLGNBQWMsQ0FrQjFCO0FBbEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuXG5pbXBvcnQge0NvbnRyb2xsZXIsIFBhcmFtLCBCb2R5LCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFJlbmRlcixJbnRlcm5hbFNlcnZlckVycm9yfSAgZnJvbSBcInJvdXRpbmctY29udHJvbGxlcnNcIjtcbmltcG9ydCB7VG9kb30gZnJvbSAnLi4vbW9kZWwvVG9kbydcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIFRvZG9Db250cm9sbGVyIHtcbiAgICBAR2V0KFwiL3RvZG8tbGlzdFwiKVxuICAgIEBSZW5kZXIoXCJyZW5kZXJUb2RvTGlzdFwiKVxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgXHRsZXQgdG9kbzEgPSBuZXcgVG9kbyh7XG4gICAgXHRcdHRpdGxlOlwiaG93ZGlcIixcbiAgICBcdFx0dGV4dDpcIndhcnVkb1wiXG4gICAgXHR9KTtcbiAgICBcdHRvZG8xLnNhdmUoZnVuY3Rpb24oZXJyKXtcbiAgICBcdFx0aWYgKGVycikgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3IoZXJyKTtcbiAgICBcdH0pO1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0dGl0bGU6dG9kbzEudGl0bGUsXG4gICAgXHRcdGNvbnRlbnQ6W1xuXHQgICAgXHRcdHRvZG8xLnRleHRcbiAgICBcdFx0XVxuICAgIFx0fTtcbiAgICB9XG59Il19