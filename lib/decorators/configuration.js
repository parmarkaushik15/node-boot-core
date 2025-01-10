"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConfigurationMetadata = exports.Configuration = void 0;
var dependency_manager_1 = require("../util/dependency-manager");
var types_1 = require("./types");
function Configuration(key) {
    return function (target) {
        dependency_manager_1.default.set(key, new target());
        addConfigurationMetadata(target.prototype);
    };
}
exports.Configuration = Configuration;
function addConfigurationMetadata(target) {
    var metadata = Reflect.getOwnMetadata(types_1.congurationMetadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    metadata.basePath = "/";
    metadata.type = "configuration";
    Reflect.defineMetadata(types_1.congurationMetadataKey, metadata, target);
}
exports.addConfigurationMetadata = addConfigurationMetadata;
//# sourceMappingURL=configuration.js.map