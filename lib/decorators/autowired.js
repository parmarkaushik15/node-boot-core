"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autowired = void 0;
var dependency_manager_1 = require("../util/dependency-manager");
function Autowired(key) {
    return function (classInstance, propertyName) {
        Object.defineProperty(classInstance, propertyName, {
            get: function () { return dependency_manager_1.default.get(key); },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.Autowired = Autowired;
//# sourceMappingURL=autowired.js.map