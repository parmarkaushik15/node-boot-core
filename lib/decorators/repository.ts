import dependencyManager from "../util/dependency-manager";
import {
  IRepositoryMetadata,
  repositoryMetadataKey,
} from "./types";

/**
 * Repository anotations is used for create the Node Boot Repository that will use for create the data connection repository classes.
 * @param {string} key - define the unique component name.
 */
export function Repository(key: string) {
  return function (target: any): any {
    dependencyManager.set(key, new target());
    addRepositoryMetadata(target.prototype);
  };
}

export function addRepositoryMetadata(target: Object): void {
  let metadata: IRepositoryMetadata | undefined = Reflect.getOwnMetadata(
    repositoryMetadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  metadata.basePath = "/";
  metadata.type = "repository";
  Reflect.defineMetadata(repositoryMetadataKey, metadata, target);
}
