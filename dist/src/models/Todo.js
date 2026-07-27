"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.todoSchema = new mongoose_1.Schema({
    todo: { type: String, required: true }
});
const Todo = (0, mongoose_1.model)("Todo", exports.todoSchema);
exports.default = Todo;
//# sourceMappingURL=Todo.js.map