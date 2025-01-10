import dependencyManager from "../util/dependency-manager";
import {
  IServiceMetadata,
  serviceMetadataKey,
} from "./types";

/**
 * Service anotations is used for create the Node Boot Service that will use for create the business service classes.
 * @param {string} key - define the unique component name.
 */
export function Service(key: string) {
  return function (target: any): any {
    dependencyManager.set(key, new target());
    addServiceMetadata(target.prototype);
  };
}

export function addServiceMetadata(target: Object): void {
  let metadata: IServiceMetadata | undefined = Reflect.getOwnMetadata(
    serviceMetadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  metadata.basePath = "/";
  metadata.type = "service";
  Reflect.defineMetadata(serviceMetadataKey, metadata, target);
}
