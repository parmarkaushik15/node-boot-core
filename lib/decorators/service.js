"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addServiceMetadata = exports.Service = void 0;
var dependency_manager_1 = require("../util/dependency-manager");
var types_1 = require("./types");
function Service(key) {
    return function (target) {
        dependency_manager_1.default.set(key, new target());
        addServiceMetadata(target.prototype);
    };
}
exports.Service = Service;
function addServiceMetadata(target) {
    var metadata = Reflect.getOwnMetadata(types_1.serviceMetadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    metadata.basePath = "/";
    metadata.type = "service";
    Reflect.defineMetadata(types_1.serviceMetadataKey, metadata, target);
}
exports.addServiceMetadata = addServiceMetadata;
//# sourceMappingURL=service.js.map