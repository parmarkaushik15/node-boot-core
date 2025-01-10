"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = exports.toJson = void 0;
var toJson = function (arg) {
    return arg ? JSON.parse(JSON.stringify(arg)) : null;
};
exports.toJson = toJson;
var copy = function (arg) {
    return arg ? JSON.parse(JSON.stringify(arg)) : null;
};
exports.copy = copy;
//# sourceMappingURL=json-util.js.map