"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWrapperToMetadata = exports.ClassWrapper = exports.Wrapper = void 0;
var types_1 = require("./types");
function Wrapper(wrapper) {
    return function (target, propertyKey) {
        addWrapperToMetadata(target, propertyKey, wrapper);
    };
}
exports.Wrapper = Wrapper;
function ClassWrapper(wrapper) {
    return function (target) {
        addWrapperToMetadata(target.prototype, types_1.classMetadataKey, wrapper);
    };
}
exports.ClassWrapper = ClassWrapper;
function addWrapperToMetadata(target, metadataKey, wrapper) {
    var metadata = Reflect.getOwnMetadata(metadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    metadata.wrapper = wrapper;
    Reflect.defineMetadata(metadataKey, metadata, target);
}
exports.addWrapperToMetadata = addWrapperToMetadata;
//# sourceMappingURL=wrapper.js.map