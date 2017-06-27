"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../model/schema/todo");
const restify = require("express-restify-mongoose");
const server_1 = require("../../../server");
exports.todoRest = restify.serve(server_1.router, todo_1.Todo, {
    version: '/v1'
});
//# sourceMappingURL=RestEndPoint.js.map