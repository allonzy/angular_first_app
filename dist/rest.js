"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("express-restify-mongoose");
const server_1 = require("./server");
const todo_1 = require("./app/todoList/model/schema/todo");
restify.serve(server_1.router, todo_1.Todo, {
    version: '/v1'
});
//# sourceMappingURL=rest.js.map