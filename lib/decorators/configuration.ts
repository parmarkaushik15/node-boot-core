import dependencyManager from "../util/dependency-manager";
import {
  congurationMetadataKey,
  IConfigurationMetadata,
} from "./types";

/**
 * Configuration anotations is used for configure the Node Boot Configuration.
 * @param {string} key - define the unique configuration.
 */
export function Configuration(key: string) {
  return function (target: any): any {
    dependencyManager.set(key, new target());
    addConfigurationMetadata(target.prototype);
  };
}

export function addConfigurationMetadata(target: Object): void {
  let metadata: IConfigurationMetadata | undefined = Reflect.getOwnMetadata(
    congurationMetadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  metadata.basePath = "/";
  metadata.type = "configuration";
  Reflect.defineMetadata(congurationMetadataKey, metadata, target);
}
