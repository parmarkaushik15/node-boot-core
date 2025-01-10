"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRepositoryMetadata = exports.Repository = void 0;
var dependency_manager_1 = require("../util/dependency-manager");
var types_1 = require("./types");
function Repository(key) {
    return function (target) {
        dependency_manager_1.default.set(key, new target());
        addRepositoryMetadata(target.prototype);
    };
}
exports.Repository = Repository;
function addRepositoryMetadata(target) {
    var metadata = Reflect.getOwnMetadata(types_1.repositoryMetadataKey, target);
    if (!metadata) {
        metadata = {};
    }
    metadata.basePath = "/";
    metadata.type = "repository";
    Reflect.defineMetadata(types_1.repositoryMetadataKey, metadata, target);
}
exports.addRepositoryMetadata = addRepositoryMetadata;
//# sourceMappingURL=repository.js.map