"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../decorators/types");
var DependencyManager = (function () {
    function DependencyManager() {
        var _this = this;
        this.deps = {};
        types_1.DependenciesMapping.forEach(function (_a) {
            var key = _a.key, value = _a.value;
            _this.set(key, value);
        });
    }
    DependencyManager.prototype.get = function (key) {
        var matches = this.deps[key];
        return matches;
    };
    DependencyManager.prototype.set = function (key, dep) {
        this.deps[key] = dep;
    };
    return DependencyManager;
}());
exports.default = new DependencyManager();
//# sourceMappingURL=dependency-manager.js.map