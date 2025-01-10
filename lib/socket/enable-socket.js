"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableSocket = void 0;
var util_1 = require("../util/util");
var EnableSocket = function (target) {
    var properties = (0, util_1.readProperties)();
    if (properties) {
        Object.assign(global, { socketStatus: true });
        return target;
    }
    else {
        throw new Error("application.properties file is required");
    }
};
exports.EnableSocket = EnableSocket;
//# sourceMappingURL=enable-socket.js.map