"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassDecorator = exports.HttpVerb = exports.congurationMetadataKey = exports.repositoryMetadataKey = exports.componentMetadataKey = exports.serviceMetadataKey = exports.classMetadataKey = exports.DependenciesMapping = void 0;
exports.DependenciesMapping = [];
exports.classMetadataKey = Symbol("Class Metadata Key");
exports.serviceMetadataKey = Symbol("Service Metadata Key");
exports.componentMetadataKey = Symbol("Component Metadata Key");
exports.repositoryMetadataKey = Symbol("Repository Metadata Key");
exports.congurationMetadataKey = Symbol("Configuration Metadata Key");
var HttpVerb;
(function (HttpVerb) {
    HttpVerb["CHECKOUT"] = "checkout";
    HttpVerb["COPY"] = "copy";
    HttpVerb["DELETE"] = "delete";
    HttpVerb["GET"] = "get";
    HttpVerb["HEAD"] = "head";
    HttpVerb["LOCK"] = "lock";
    HttpVerb["MERGE"] = "merge";
    HttpVerb["MKACTIVITY"] = "mkactivity";
    HttpVerb["MKCOL"] = "mkcol";
    HttpVerb["MOVE"] = "move";
    HttpVerb["MSEARCH"] = "m-search";
    HttpVerb["NOTIFY"] = "notify";
    HttpVerb["OPTIONS"] = "options";
    HttpVerb["PATCH"] = "patch";
    HttpVerb["POST"] = "post";
    HttpVerb["PURGE"] = "purge";
    HttpVerb["PUT"] = "put";
    HttpVerb["REPORT"] = "report";
    HttpVerb["SEARCH"] = "search";
    HttpVerb["SUBSCRIBE"] = "subscribe";
    HttpVerb["TRACE"] = "trace";
    HttpVerb["UNLOCK"] = "unlock";
    HttpVerb["UNSUBSCRIBE"] = "unsubscribe";
})(HttpVerb || (exports.HttpVerb = HttpVerb = {}));
function createClassDecorator(wrapper) {
    return (function (constructor) {
        wrapper.prototype = constructor.prototype;
        var wrapped = wrapper.bind(null, constructor);
        return wrapped;
    });
}
exports.createClassDecorator = createClassDecorator;
//# sourceMappingURL=types.js.map