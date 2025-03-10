"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addErrorMiddlewareToMetadata = exports.addMiddlewareToMetadata = exports.ClassErrorMiddleware = exports.ClassMiddleware = exports.ErrorMiddleware = exports.Middleware = void 0;
var types_1 = require("./types");
function Middleware(middleware) {
    return function (target, propertyKey) {
        addMiddlewareToMetadata(target, propertyKey, middleware);
    };
}
exports.Middleware = Middleware;
function ErrorMiddleware(errorMiddleware) {
    return function (target, propertyKey) {
        addErrorMiddlewareToMetadata(target, propertyKey, errorMiddleware);
    };
}
exports.ErrorMiddleware = ErrorMiddleware;
function ClassMiddleware(middleware) {
    return function (target) {
        addMiddlewareToMetadata(target.prototype, types_1.classMetadataKey, middleware);
    };
}
exports.ClassMiddleware = ClassMiddleware;
function ClassErrorMiddleware(errorMiddleware) {
    return function (target) {
        addErrorMiddlewareToMetadata(target.prototype, types_1.classMetadataKey, errorMiddleware);
    };
}
exports.ClassErrorMiddleware = ClassErrorMiddleware;
function addMiddlewareToMetadata(target, metadataKey, middlewares) {
    var metadata = Reflect.getOwnMetadata(metadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    if (!metadata.middlewares) {
        metadata.middlewares = [];
    }
    var newArr;
    if (middlewares instanceof Array) {
        newArr = middlewares.slice();
    }
    else {
        newArr = [middlewares];
    }
    newArr.push.apply(newArr, metadata.middlewares);
    metadata.middlewares = newArr;
    Reflect.defineMetadata(metadataKey, metadata, target);
}
exports.addMiddlewareToMetadata = addMiddlewareToMetadata;
function addErrorMiddlewareToMetadata(target, metadataKey, errorMiddlewares) {
    var metadata = Reflect.getOwnMetadata(metadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    if (!metadata.errorMiddlewares) {
        metadata.errorMiddlewares = [];
    }
    var newArr;
    if (errorMiddlewares instanceof Array) {
        newArr = errorMiddlewares.slice();
    }
    else {
        newArr = [errorMiddlewares];
    }
    newArr.push.apply(newArr, metadata.errorMiddlewares);
    metadata.errorMiddlewares = newArr;
    Reflect.defineMetadata(metadataKey, metadata, target);
}
exports.addErrorMiddlewareToMetadata = addErrorMiddlewareToMetadata;
//# sourceMappingURL=middleware.js.map