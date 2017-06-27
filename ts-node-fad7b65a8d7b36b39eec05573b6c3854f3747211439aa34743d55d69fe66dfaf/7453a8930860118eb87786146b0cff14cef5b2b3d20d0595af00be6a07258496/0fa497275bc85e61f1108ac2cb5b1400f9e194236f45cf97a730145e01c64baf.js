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
const Todo_1 = require("../model/Todo");
let TodoController = class TodoController {
    renderView(id) {
        let todo1 = new Todo_1.Todo({
            title: "howdi",
            text: "warudo"
        });
        todo1.save(function (err) {
            if (err)
                throw new routing_controllers_1.InternalServerError(err);
        });
        return {
            todo1
        };
    }
};
__decorate([
    routing_controllers_1.Post("/add-todo"),
    routing_controllers_1.Render("renderTodoList"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "renderView", null);
TodoController = __decorate([
    routing_controllers_1.Controller()
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL3RvZG9MaXN0L2NvbnRyb2xsZXJzL1RvZG9Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9hcHAvdG9kb0xpc3QvY29udHJvbGxlcnMvVG9kb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFHMUIsNkRBQWdIO0FBQ2hILHdDQUFrQztBQUdsQyxJQUFhLGNBQWMsR0FBM0I7SUFHSSxVQUFVLENBQWMsRUFBVTtRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLFdBQUksQ0FBQztZQUNwQixLQUFLLEVBQUMsT0FBTztZQUNiLElBQUksRUFBQyxRQUFRO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFTLEdBQUc7WUFDdEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUFDLE1BQU0sSUFBSSx5Q0FBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQztZQUNOLEtBQUs7U0FDTCxDQUFDO0lBQ0gsQ0FBQztDQUVKLENBQUE7QUFiRztJQUZDLDBCQUFJLENBQUMsV0FBVyxDQUFDO0lBQ2pCLDRCQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDYixXQUFBLDJCQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7Z0RBV3RCO0FBZFEsY0FBYztJQUQxQixnQ0FBVSxFQUFFO0dBQ0EsY0FBYyxDQWdCMUI7QUFoQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5kZWNsYXJlIHZhciBfX2Rpcm5hbWU7XG5cbmltcG9ydCB7Q29udHJvbGxlciwgUGFyYW0sIEJvZHksIEdldCwgUG9zdCwgUHV0LCBEZWxldGUsUmVuZGVyLEludGVybmFsU2VydmVyRXJyb3J9ICBmcm9tIFwicm91dGluZy1jb250cm9sbGVyc1wiO1xuaW1wb3J0IHtUb2RvfSBmcm9tICcuLi9tb2RlbC9Ub2RvJ1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgY2xhc3MgVG9kb0NvbnRyb2xsZXIge1xuICAgIEBQb3N0KFwiL2FkZC10b2RvXCIpXG4gICAgQFJlbmRlcihcInJlbmRlclRvZG9MaXN0XCIpXG4gICAgcmVuZGVyVmlldyhAUGFyYW0oXCJpZFwiKSBpZDogbnVtYmVyKSB7XG4gICAgXHRsZXQgdG9kbzEgPSBuZXcgVG9kbyh7XG4gICAgXHRcdHRpdGxlOlwiaG93ZGlcIixcbiAgICBcdFx0dGV4dDpcIndhcnVkb1wiXG4gICAgXHR9KTtcbiAgICBcdHRvZG8xLnNhdmUoZnVuY3Rpb24oZXJyKXtcbiAgICBcdFx0aWYgKGVycikgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3IoZXJyKTtcbiAgICBcdH0pO1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0dG9kbzFcbiAgICBcdH07XG4gICAgfVxuXG59Il19