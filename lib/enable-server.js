"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableServer = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var express = require("express");
var express_1 = require("express");
var PropertiesReader = require("properties-reader");
var fs = require("fs");
var types_1 = require("./decorators/types");
var util_1 = require("./util/util");
var dependency_manager_1 = require("./util/dependency-manager");
var useragent = require("express-useragent");
var requestIp = require("request-ip");
var http = require("http");
exports.EnableServer = (0, types_1.createClassDecorator)(function (constructor) {
    var CtorArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        CtorArgs[_i - 1] = arguments[_i];
    }
    var instance = new (constructor.bind.apply(constructor, tslib_1.__spreadArray([void 0], CtorArgs, false)))();
    var app = null;
    var properties = null;
    var globalProperties = global;
    var run = function (socket) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var object, actuatorApp, src, urlPrefix, allFiles, controllerInstances, routerLibrary;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Object.assign(global, { app: app });
                    Object.assign(global, { properties: properties });
                    Object.assign(global, { dir: util_1.dir });
                    Object.assign(global, { socketIO: socket });
                    object = { app: app };
                    if (globalProperties && globalProperties.socketStatus) {
                        object.socketIO = socket;
                    }
                    return [4, (0, util_1.checkDependency)('node-boot-actuator', 'enableStatus', { app: app, socket: socket, properties: properties })];
                case 1:
                    actuatorApp = _a.sent();
                    if (actuatorApp) {
                        app = actuatorApp;
                    }
                    app.get('/return-status/:statusCode', function (req, res) {
                        return res.sendStatus(req.params.statusCode);
                    });
                    instance["main"].call(this, object);
                    src = (0, util_1.getPropertiesData)(properties, "source.dir", "src");
                    urlPrefix = (0, util_1.getPropertiesData)(properties, "api.prefix", "");
                    allFiles = (0, util_1.listDirectories)("".concat(util_1.dir, "/").concat(src, "/"));
                    return [4, (0, util_1.readFiles)(allFiles)];
                case 2:
                    controllerInstances = _a.sent();
                    routerLibrary = express_1.Router;
                    controllerInstances.forEach(function (item) {
                        if (item.controller) {
                            var prototype = Object.getPrototypeOf(item.controller);
                            var controllerMetadata = Reflect.getOwnMetadata(types_1.classMetadataKey, prototype);
                            if (controllerMetadata) {
                                var routerAndPath = (0, util_1.getRouter)(routerLibrary, item.controller);
                                if (routerAndPath) {
                                    app.use(urlPrefix + routerAndPath.basePath, routerAndPath.router);
                                }
                                dependency_manager_1.default.set(item.name, item.controller);
                                types_1.DependenciesMapping.push({
                                    key: item.name,
                                    value: item.controller,
                                });
                            }
                        }
                    });
                    return [2];
            }
        });
    }); };
    var init = function () {
        app = express();
        if (app) {
            app.use(useragent.express());
            app.use(requestIp.mw());
            var port_1 = (0, util_1.getPropertiesData)(properties, "server.port", 3000);
            var server = http.createServer(app);
            var socket_1 = null;
            var socketio = require("socket.io");
            socket_1 = socketio(server, {
                pingTimeout: 30000,
                pingInterval: 25000,
                cors: {
                    origin: '*',
                }
            });
            server.listen(port_1, function () {
                console.log("Application is running with port: ", port_1);
                run(socket_1);
            });
        }
    };
    var mainStatus = false;
    Object.getOwnPropertyNames(instance).forEach(function (key) {
        if (key == "main") {
            mainStatus = true;
        }
    });
    if (!mainStatus) {
        throw new Error("Main method is required");
    }
    else {
        var fileName = "".concat(util_1.dir, "/application.properties");
        if (fs.existsSync(fileName)) {
            properties = PropertiesReader(fileName, "utf-8").getAllProperties();
            (0, util_1.print)();
            init();
            return instance;
        }
        else {
            throw new Error("application.properties file is required");
        }
    }
});
//# sourceMappingURL=enable-server.js.map