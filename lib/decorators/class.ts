import { RouterOptions } from "express";
import { classMetadataKey, Controller, IClassMetadata } from "./types";

/**
 * Controller anotations is used for create the Node Boot Controller
 * @param {string} path - define the route path
 */
export function Controller(path: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    addBasePathToClassMetadata(target.prototype, "/" + path, "controller");
  };
}

export function ClassOptions(options: RouterOptions): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    addClassOptionsToClassMetadata(target.prototype, options);
  };
}

export function Children(children: Controller | Controller[]): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    addChildControllersToClassMetadata(target.prototype, children);
  };
}

export function ChildControllers(
  children: Controller | Controller[]
): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    addChildControllersToClassMetadata(target.prototype, children);
  };
}

export function addBasePathToClassMetadata(
  target: Object,
  basePath: string,
  type: string
): void {
  let metadata: IClassMetadata | undefined = Reflect.getOwnMetadata(
    classMetadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  metadata.basePath = basePath;
  metadata.type = type;
  Reflect.defineMetadata(classMetadataKey, metadata, target);
}

export function addClassOptionsToClassMetadata(
  target: Object,
  options: RouterOptions
): void {
  let metadata: IClassMetadata | undefined = Reflect.getOwnMetadata(
    classMetadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  metadata.options = options;
  Reflect.defineMetadata(classMetadataKey, metadata, target);
}

export function addChildControllersToClassMetadata(
  target: Object,
  childControllers: Controller | Controller[]
): void {
  let metadata: IClassMetadata | undefined = Reflect.getOwnMetadata(
    classMetadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  if (!metadata.childControllers) {
    metadata.childControllers = [];
  }
  let newArr: Controller[];
  if (childControllers instanceof Array) {
    newArr = childControllers.slice();
  } else {
    newArr = [childControllers];
  }
  newArr.push(...metadata.childControllers);
  metadata.childControllers = newArr;
  Reflect.defineMetadata(classMetadataKey, metadata, target);
}
