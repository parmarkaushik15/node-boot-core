"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChildControllersToClassMetadata = exports.addClassOptionsToClassMetadata = exports.addBasePathToClassMetadata = exports.ChildControllers = exports.Children = exports.ClassOptions = exports.Controller = void 0;
var types_1 = require("./types");
function Controller(path) {
    return function (target) {
        addBasePathToClassMetadata(target.prototype, "/" + path, "controller");
    };
}
exports.Controller = Controller;
function ClassOptions(options) {
    return function (target) {
        addClassOptionsToClassMetadata(target.prototype, options);
    };
}
exports.ClassOptions = ClassOptions;
function Children(children) {
    return function (target) {
        addChildControllersToClassMetadata(target.prototype, children);
    };
}
exports.Children = Children;
function ChildControllers(children) {
    return function (target) {
        addChildControllersToClassMetadata(target.prototype, children);
    };
}
exports.ChildControllers = ChildControllers;
function addBasePathToClassMetadata(target, basePath, type) {
    var metadata = Reflect.getOwnMetadata(types_1.classMetadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    metadata.basePath = basePath;
    metadata.type = type;
    Reflect.defineMetadata(types_1.classMetadataKey, metadata, target);
}
exports.addBasePathToClassMetadata = addBasePathToClassMetadata;
function addClassOptionsToClassMetadata(target, options) {
    var metadata = Reflect.getOwnMetadata(types_1.classMetadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    metadata.options = options;
    Reflect.defineMetadata(types_1.classMetadataKey, metadata, target);
}
exports.addClassOptionsToClassMetadata = addClassOptionsToClassMetadata;
function addChildControllersToClassMetadata(target, childControllers) {
    var metadata = Reflect.getOwnMetadata(types_1.classMetadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    if (!metadata.childControllers) {
        metadata.childControllers = [];
    }
    var newArr;
    if (childControllers instanceof Array) {
        newArr = childControllers.slice();
    }
    else {
        newArr = [childControllers];
    }
    newArr.push.apply(newArr, metadata.childControllers);
    metadata.childControllers = newArr;
    Reflect.defineMetadata(types_1.classMetadataKey, metadata, target);
}
exports.addChildControllersToClassMetadata = addChildControllersToClassMetadata;
//# sourceMappingURL=class.js.map