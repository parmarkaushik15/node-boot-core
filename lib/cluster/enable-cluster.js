"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableCluster = void 0;
var util_1 = require("../util/util");
var EnableCluster = function (target) {
    var properties = (0, util_1.readProperties)();
    if (properties) {
        Object.assign(global, { clusterStatus: true });
        return target;
    }
    else {
        throw new Error("application.properties file is required");
    }
};
exports.EnableCluster = EnableCluster;
//# sourceMappingURL=enable-cluster.js.map