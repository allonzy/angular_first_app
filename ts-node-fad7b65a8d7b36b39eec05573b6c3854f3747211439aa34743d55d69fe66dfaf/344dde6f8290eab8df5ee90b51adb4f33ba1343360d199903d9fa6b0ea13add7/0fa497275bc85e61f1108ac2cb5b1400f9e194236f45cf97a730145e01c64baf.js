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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2V4YW1wbGUvY29udHJvbGxlcnMvVG9kb0NvbnRyb2xsZXIudHMiLCJzb3VyY2VzIjpbIi9ob21lL3NpbW9udml2aWVyL3dvcmtzcGFjZS9hcHBsaV9hbmd1bGFyL215X2ZpcnN0X2FuZ3VsYXJfYXBwL2FwcC9leGFtcGxlL2NvbnRyb2xsZXJzL1RvZG9Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEJBQTBCO0FBRzFCLDZEQUFnSDtBQUNoSCx3Q0FBa0M7QUFHbEMsSUFBYSxjQUFjLEdBQTNCO0lBR0ksVUFBVSxDQUFjLEVBQVU7UUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUM7WUFDcEIsS0FBSyxFQUFDLE9BQU87WUFDYixJQUFJLEVBQUMsUUFBUTtTQUNiLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBUyxHQUFHO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFBQyxNQUFNLElBQUkseUNBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUM7WUFDTixLQUFLO1NBQ0wsQ0FBQztJQUNILENBQUM7Q0FFSixDQUFBO0FBYkc7SUFGQywwQkFBSSxDQUFDLFdBQVcsQ0FBQztJQUNqQiw0QkFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQ2IsV0FBQSwyQkFBSyxDQUFDLElBQUksQ0FBQyxDQUFBOzs7O2dEQVd0QjtBQWRRLGNBQWM7SUFEMUIsZ0NBQVUsRUFBRTtHQUNBLGNBQWMsQ0FnQjFCO0FBaEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xuXG5pbXBvcnQge0NvbnRyb2xsZXIsIFBhcmFtLCBCb2R5LCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFJlbmRlcixJbnRlcm5hbFNlcnZlckVycm9yfSAgZnJvbSBcInJvdXRpbmctY29udHJvbGxlcnNcIjtcbmltcG9ydCB7VG9kb30gZnJvbSAnLi4vbW9kZWwvVG9kbydcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIFRvZG9Db250cm9sbGVyIHtcbiAgICBAUG9zdChcIi9hZGQtdG9kb1wiKVxuICAgIEBSZW5kZXIoXCJyZW5kZXJUb2RvTGlzdFwiKVxuICAgIHJlbmRlclZpZXcoQFBhcmFtKFwiaWRcIikgaWQ6IG51bWJlcikge1xuICAgIFx0bGV0IHRvZG8xID0gbmV3IFRvZG8oe1xuICAgIFx0XHR0aXRsZTpcImhvd2RpXCIsXG4gICAgXHRcdHRleHQ6XCJ3YXJ1ZG9cIlxuICAgIFx0fSk7XG4gICAgXHR0b2RvMS5zYXZlKGZ1bmN0aW9uKGVycil7XG4gICAgXHRcdGlmIChlcnIpIHRocm93IG5ldyBJbnRlcm5hbFNlcnZlckVycm9yKGVycik7XG4gICAgXHR9KTtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdHRvZG8xXG4gICAgXHR9O1xuICAgIH1cblxufSJdfQ==