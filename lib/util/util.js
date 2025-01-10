"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDependency = exports.createRandomCode = exports.getPropertiesData = exports.readProperties = exports.readConfigurationFiles = exports.readFiles = exports.getRouter = exports.print = exports.wrapErrorMiddleware = exports.dir = exports.listDirectories = void 0;
var tslib_1 = require("tslib");
var fs = require("fs");
var types_1 = require("../decorators/types");
var path = require("path");
var PropertiesReader = require("properties-reader");
function listDirectories(root) {
    return fs.readdirSync(root, { withFileTypes: true }).flatMap(function (file) {
        return file.isDirectory()
            ? listDirectories(path.join(root, file.name))
            : path.join(root, file.name);
    });
}
exports.listDirectories = listDirectories;
exports.dir = process.cwd();
var wrapErrorMiddleware = function (errorMiddleware, requestHandler) {
    return function (req, res, next) {
        try {
            requestHandler(req, res, next);
        }
        catch (error) {
            errorMiddleware(error, req, res, next);
        }
    };
};
exports.wrapErrorMiddleware = wrapErrorMiddleware;
var print = function () {
    console.log("===================================================");
    console.log(" ========       ======       ======     ========== ");
    console.log(" ==      ==   ==      ==   ==      ==       ==     ");
    console.log(" ========     ==      ==   ==      ==       ==     ");
    console.log(" ==      ==   ==      ==   ==      ==       ==     ");
    console.log(" ========       ======       ======         ==     ");
    console.log("===================================================");
};
exports.print = print;
var getRouter = function (routerLibrary, controller) {
    var prototype = Object.getPrototypeOf(controller);
    var classMetadata = Reflect.getOwnMetadata(types_1.classMetadataKey, prototype);
    if (!classMetadata) {
        return null;
    }
    var basePath = classMetadata.basePath, children = classMetadata.childControllers, classErrorMiddleware = classMetadata.errorMiddlewares, classMiddleware = classMetadata.middlewares, options = classMetadata.options, classWrapper = classMetadata.wrapper;
    if (!basePath) {
        return null;
    }
    var router = routerLibrary(options);
    if (classMiddleware) {
        router.use(classMiddleware);
    }
    var members = Object.getOwnPropertyNames(controller);
    members = members.concat(Object.getOwnPropertyNames(prototype));
    members.forEach(function (member) {
        var methodMetadata = Reflect.getOwnMetadata(member, prototype);
        if (methodMetadata) {
            var httpRoutes = methodMetadata.httpRoutes, middlewares_1 = methodMetadata.middlewares, errorMiddlewares = methodMetadata.errorMiddlewares, wrapper = methodMetadata.wrapper;
            var callBack_1 = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return controller[member].apply(controller, args);
            };
            if (classWrapper) {
                callBack_1 = classWrapper(callBack_1);
            }
            if (wrapper) {
                callBack_1 = wrapper(callBack_1);
            }
            if (errorMiddlewares) {
                errorMiddlewares.forEach(function (errorMiddleware) {
                    callBack_1 = (0, exports.wrapErrorMiddleware)(errorMiddleware, callBack_1);
                });
            }
            if (httpRoutes) {
                httpRoutes.forEach(function (route) {
                    var httpDecorator = route.httpDecorator, path = route.path;
                    if (middlewares_1) {
                        router[httpDecorator](path, middlewares_1, callBack_1);
                    }
                    else {
                        router[httpDecorator](path, callBack_1);
                    }
                });
            }
        }
    });
    if (children) {
        children.forEach(function (child) {
            var childRouterAndPath = (0, exports.getRouter)(routerLibrary, child);
            if (childRouterAndPath) {
                router.use(childRouterAndPath.basePath, childRouterAndPath.router);
            }
        });
    }
    if (classErrorMiddleware) {
        router.use(classErrorMiddleware);
    }
    return {
        basePath: basePath,
        router: router,
    };
};
exports.getRouter = getRouter;
function content(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fs.readFileSync(path, 'utf8')];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
var readFiles = function (allFiles) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var controllerInstances, _i, allFiles_1, item, text, fileData, _a, _b, name_1, controller, controllerMetadata, componentMetadata, serviceMetadata, repositoryMetadata;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                controllerInstances = [];
                _i = 0, allFiles_1 = allFiles;
                _c.label = 1;
            case 1:
                if (!(_i < allFiles_1.length)) return [3, 5];
                item = allFiles_1[_i];
                if (!(item.indexOf(".ts") != -1 || item.indexOf(".js") != -1)) return [3, 4];
                if (!(item.indexOf(".js.map") == -1)) return [3, 4];
                return [4, content(item)];
            case 2:
                text = _c.sent();
                if (!(text.indexOf("@Controller") != -1
                    || text.indexOf("@Repository") != -1
                    || text.indexOf("@Service") != -1
                    || text.indexOf("@Component") != -1
                    || text.indexOf(".Controller)") != -1
                    || text.indexOf(".Repository)") != -1
                    || text.indexOf(".Service)") != -1
                    || text.indexOf(".Component)") != -1)) return [3, 4];
                return [4, Promise.resolve("".concat(item)).then(function (s) { return require(s); })];
            case 3:
                fileData = _c.sent();
                for (_a = 0, _b = Object.keys(fileData); _a < _b.length; _a++) {
                    name_1 = _b[_a];
                    controller = fileData[name_1];
                    if (typeof controller === "function") {
                        controllerMetadata = Reflect.getOwnMetadata(types_1.classMetadataKey, Object.getPrototypeOf(new controller()));
                        if (controllerMetadata) {
                            controllerInstances.push({
                                name: name_1,
                                controller: new controller(),
                                file: item,
                            });
                        }
                        componentMetadata = Reflect.getOwnMetadata(types_1.componentMetadataKey, Object.getPrototypeOf(new controller()));
                        if (componentMetadata) {
                            controllerInstances.push({
                                name: name_1,
                                controller: new controller(),
                                file: item,
                            });
                        }
                        serviceMetadata = Reflect.getOwnMetadata(types_1.serviceMetadataKey, Object.getPrototypeOf(new controller()));
                        if (serviceMetadata) {
                            controllerInstances.push({
                                name: name_1,
                                controller: new controller(),
                                file: item,
                            });
                        }
                        repositoryMetadata = Reflect.getOwnMetadata(types_1.repositoryMetadataKey, Object.getPrototypeOf(new controller()));
                        if (repositoryMetadata) {
                            controllerInstances.push({
                                name: name_1,
                                controller: new controller(),
                                file: item,
                            });
                        }
                    }
                }
                _c.label = 4;
            case 4:
                _i++;
                return [3, 1];
            case 5: return [2, controllerInstances];
        }
    });
}); };
exports.readFiles = readFiles;
var readConfigurationFiles = function (allFiles) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var configurationInstances, _i, allFiles_2, item, text, fileData, _a, _b, name_2, file, configurationMetadata;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                configurationInstances = [];
                _i = 0, allFiles_2 = allFiles;
                _c.label = 1;
            case 1:
                if (!(_i < allFiles_2.length)) return [3, 5];
                item = allFiles_2[_i];
                if (!(item.indexOf(".ts") != -1 || item.indexOf(".js") != -1)) return [3, 4];
                if (!(item.indexOf(".js.map") == -1)) return [3, 4];
                return [4, content(item)];
            case 2:
                text = _c.sent();
                if (!(text.indexOf("@Configuration") != -1 || text.indexOf(".Configuration)") != -1)) return [3, 4];
                return [4, Promise.resolve("".concat(item)).then(function (s) { return require(s); })];
            case 3:
                fileData = _c.sent();
                for (_a = 0, _b = Object.keys(fileData); _a < _b.length; _a++) {
                    name_2 = _b[_a];
                    file = fileData[name_2];
                    if (typeof file === "function") {
                        configurationMetadata = Reflect.getOwnMetadata(types_1.congurationMetadataKey, Object.getPrototypeOf(new file()));
                        if (configurationMetadata) {
                            configurationInstances.push({
                                name: name_2,
                                controller: new file(),
                                file: item,
                            });
                        }
                    }
                }
                _c.label = 4;
            case 4:
                _i++;
                return [3, 1];
            case 5: return [2, configurationInstances];
        }
    });
}); };
exports.readConfigurationFiles = readConfigurationFiles;
var readProperties = function () {
    var fileName = "".concat(process.cwd(), "/application.properties");
    if (fs.existsSync(fileName)) {
        return PropertiesReader(fileName, "utf-8").getAllProperties();
    }
};
exports.readProperties = readProperties;
var getPropertiesData = function (properties, key, fix) {
    return properties && properties[key]
        ? properties[key]
        : fix;
};
exports.getPropertiesData = getPropertiesData;
var createRandomCode = function (length) {
    if (length === void 0) { length = 6; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result, characters, charactersLength, i;
        return tslib_1.__generator(this, function (_a) {
            result = "";
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            charactersLength = characters.length;
            for (i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return [2, result];
        });
    });
};
exports.createRandomCode = createRandomCode;
var checkDependency = function (dependencyName, functionName, target) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var path, dependency, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = "".concat(exports.dir, "/node_modules/").concat(dependencyName);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                dependency = require(path);
                if (!(typeof dependency[functionName] === 'function')) return [3, 3];
                return [4, dependency[functionName](target)];
            case 2: return [2, _a.sent()];
            case 3: return [3, 5];
            case 4:
                error_1 = _a.sent();
                return [2, null];
            case 5: return [2];
        }
    });
}); };
exports.checkDependency = checkDependency;
//# sourceMappingURL=util.js.map