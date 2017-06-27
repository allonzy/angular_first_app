"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restify = require("express-restify-mongoose");
exports.UserSchema = new mongoose_1.Schema({
    title: String,
    text: String
});
exports.UserSchema.methods.fullName = function () {
    return ("<h1>" + this.title.trim() + "</h1>" + +this.text.trim());
};
exports.Todo = mongoose_1.model("Todo", exports.UserSchema);
const server_1 = require("../../../../server");
restify.serve(server_1.router, exports.Todo, {
    version: '/v1'
});
//# sourceMappingURL=todos.js.map