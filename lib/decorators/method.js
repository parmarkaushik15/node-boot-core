"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHttpVerbToMethodMetadata = exports.Unsubscribe = exports.Unlock = exports.Trace = exports.Subscribe = exports.Search = exports.Report = exports.Put = exports.Purge = exports.Post = exports.Patch = exports.Options = exports.Notify = exports.MSearch = exports.Move = exports.Mkcol = exports.Mkactivity = exports.Merge = exports.Lock = exports.Head = exports.Get = exports.Delete = exports.Copy = exports.Checkout = exports.All = void 0;
var types_1 = require("./types");
function All(path) {
    return helperForRoutes("all", path);
}
exports.All = All;
function Checkout(path) {
    return helperForRoutes(types_1.HttpVerb.CHECKOUT, path);
}
exports.Checkout = Checkout;
function Copy(path) {
    return helperForRoutes(types_1.HttpVerb.COPY, path);
}
exports.Copy = Copy;
function Delete(path) {
    return helperForRoutes(types_1.HttpVerb.DELETE, path);
}
exports.Delete = Delete;
function Get(path) {
    return helperForRoutes(types_1.HttpVerb.GET, path);
}
exports.Get = Get;
function Head(path) {
    return helperForRoutes(types_1.HttpVerb.HEAD, path);
}
exports.Head = Head;
function Lock(path) {
    return helperForRoutes(types_1.HttpVerb.LOCK, path);
}
exports.Lock = Lock;
function Merge(path) {
    return helperForRoutes(types_1.HttpVerb.MERGE, path);
}
exports.Merge = Merge;
function Mkactivity(path) {
    return helperForRoutes(types_1.HttpVerb.MKACTIVITY, path);
}
exports.Mkactivity = Mkactivity;
function Mkcol(path) {
    return helperForRoutes(types_1.HttpVerb.MKCOL, path);
}
exports.Mkcol = Mkcol;
function Move(path) {
    return helperForRoutes(types_1.HttpVerb.MOVE, path);
}
exports.Move = Move;
function MSearch(path) {
    return helperForRoutes(types_1.HttpVerb.MSEARCH, path);
}
exports.MSearch = MSearch;
function Notify(path) {
    return helperForRoutes(types_1.HttpVerb.NOTIFY, path);
}
exports.Notify = Notify;
function Options(path) {
    return helperForRoutes(types_1.HttpVerb.OPTIONS, path);
}
exports.Options = Options;
function Patch(path) {
    return helperForRoutes(types_1.HttpVerb.PATCH, path);
}
exports.Patch = Patch;
function Post(path) {
    return helperForRoutes(types_1.HttpVerb.POST, path);
}
exports.Post = Post;
function Purge(path) {
    return helperForRoutes(types_1.HttpVerb.PURGE, path);
}
exports.Purge = Purge;
function Put(path) {
    return helperForRoutes(types_1.HttpVerb.PUT, path);
}
exports.Put = Put;
function Report(path) {
    return helperForRoutes(types_1.HttpVerb.REPORT, path);
}
exports.Report = Report;
function Search(path) {
    return helperForRoutes(types_1.HttpVerb.SEARCH, path);
}
exports.Search = Search;
function Subscribe(path) {
    return helperForRoutes(types_1.HttpVerb.SUBSCRIBE, path);
}
exports.Subscribe = Subscribe;
function Trace(path) {
    return helperForRoutes(types_1.HttpVerb.TRACE, path);
}
exports.Trace = Trace;
function Unlock(path) {
    return helperForRoutes(types_1.HttpVerb.UNLOCK, path);
}
exports.Unlock = Unlock;
function Unsubscribe(path) {
    return helperForRoutes(types_1.HttpVerb.UNSUBSCRIBE, path);
}
exports.Unsubscribe = Unsubscribe;
function helperForRoutes(httpVerb, path) {
    return function (target, propertyKey) {
        var newPath;
        if (path === undefined) {
            newPath = "";
        }
        else if (path instanceof RegExp) {
            newPath = addForwardSlashToFrontOfRegex(path);
        }
        else {
            newPath = "/" + path;
        }
        addHttpVerbToMethodMetadata(target, propertyKey, httpVerb, newPath);
    };
}
function addForwardSlashToFrontOfRegex(regex) {
    if (regex.toString().charAt(1) === "^") {
        return RegExp("/" + regex.toString().slice(2).replace(/\/$/, ""));
    }
    else {
        return new RegExp("/.*" + regex.toString().slice(1).replace(/\/$/, ""));
    }
}
function addHttpVerbToMethodMetadata(target, metadataKey, httpDecorator, path) {
    var metadata = Reflect.getOwnMetadata(metadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    if (!metadata.httpRoutes) {
        metadata.httpRoutes = [];
    }
    var newArr = [
        {
            httpDecorator: httpDecorator,
            path: path,
        },
    ];
    newArr.push.apply(newArr, metadata.httpRoutes);
    metadata.httpRoutes = newArr;
    Reflect.defineMetadata(metadataKey, metadata, target);
}
exports.addHttpVerbToMethodMetadata = addHttpVerbToMethodMetadata;
//# sourceMappingURL=method.js.map