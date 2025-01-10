import dependencyManager from "../util/dependency-manager";
import {
  componentMetadataKey,
  IComponentMetadata,
} from "./types";

/**
 * Component anotations is used for create the Node Boot Component that will use for loose coupling.
 * @param {string} key - define the unique component name.
 */
export function Component(key: string) {
  return function (target: any): any {
    dependencyManager.set(key, new target());
    addComponentMetadata(target.prototype);
  };
}

export function addComponentMetadata(target: Object): void {
  let metadata: IComponentMetadata | undefined = Reflect.getOwnMetadata(
    componentMetadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  metadata.basePath = "/";
  metadata.type = "component";
  Reflect.defineMetadata(componentMetadataKey, metadata, target);
}
