"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComponentMetadata = exports.Component = void 0;
var dependency_manager_1 = require("../util/dependency-manager");
var types_1 = require("./types");
function Component(key) {
    return function (target) {
        dependency_manager_1.default.set(key, new target());
        addComponentMetadata(target.prototype);
    };
}
exports.Component = Component;
function addComponentMetadata(target) {
    var metadata = Reflect.getOwnMetadata(types_1.componentMetadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    metadata.basePath = "/";
    metadata.type = "component";
    Reflect.defineMetadata(types_1.componentMetadataKey, metadata, target);
}
exports.addComponentMetadata = addComponentMetadata;
//# sourceMappingURL=component.js.map