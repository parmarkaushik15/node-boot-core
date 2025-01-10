import {
  Middleware,
  ErrorMiddleware,
  IMethodMetadata,
  IClassMetadata,
  classMetadataKey,
} from "./types";

/**
 * Middleware anotations is used for configure Middleware filter in Node Boot Application as method level.
 * @param  {middleware}  Middleware | Middleware[]
 */
export function Middleware(
  middleware: Middleware | Middleware[]
): MethodDecorator & PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    addMiddlewareToMetadata(target, propertyKey, middleware);
  };
}

/**
 * ErrorMiddleware anotations is used for configure ErrorMiddleware filter in Node Boot Application as method level error.
 * @param  {errorMiddleware} ErrorMiddleware | ErrorMiddleware[]
 */
export function ErrorMiddleware(
  errorMiddleware: ErrorMiddleware | ErrorMiddleware[]
): MethodDecorator & PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    addErrorMiddlewareToMetadata(target, propertyKey, errorMiddleware);
  };
}

/**
 * ClassMiddleware anotations is used for configure ClassMiddleware filter in Node Boot Application as class level.
 * @param  {middleware} Middleware | Middleware[]
 */
export function ClassMiddleware(
  middleware: Middleware | Middleware[]
): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    addMiddlewareToMetadata(target.prototype, classMetadataKey, middleware);
  };
}

/**
 * ClassErrorMiddleware anotations is used for configure ClassErrorMiddleware filter in Node Boot Application as class level error.
 * @param  {errorMiddleware} ErrorMiddleware | ErrorMiddleware[]
 */
export function ClassErrorMiddleware(
  errorMiddleware: ErrorMiddleware | ErrorMiddleware[]
): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    addErrorMiddlewareToMetadata(
      target.prototype,
      classMetadataKey,
      errorMiddleware
    );
  };
}

export function addMiddlewareToMetadata(
  target: Object,
  metadataKey: any,
  middlewares: Middleware | Middleware[]
): void {
  let metadata: IClassMetadata | IMethodMetadata | undefined =
    Reflect.getOwnMetadata(metadataKey, target);
  if (!metadata) {
    metadata = {};
  }
  if (!metadata.middlewares) {
    metadata.middlewares = [];
  }
  let newArr: Middleware[];
  if (middlewares instanceof Array) {
    newArr = middlewares.slice();
  } else {
    newArr = [middlewares];
  }
  newArr.push(...metadata.middlewares);
  metadata.middlewares = newArr;
  Reflect.defineMetadata(metadataKey, metadata, target);
}

export function addErrorMiddlewareToMetadata(
  target: Object,
  metadataKey: any,
  errorMiddlewares: ErrorMiddleware | ErrorMiddleware[]
): void {
  let metadata: IClassMetadata | IMethodMetadata | undefined =
    Reflect.getOwnMetadata(metadataKey, target);
  if (!metadata) {
    metadata = {};
  }
  if (!metadata.errorMiddlewares) {
    metadata.errorMiddlewares = [];
  }
  let newArr: ErrorMiddleware[];
  if (errorMiddlewares instanceof Array) {
    newArr = errorMiddlewares.slice();
  } else {
    newArr = [errorMiddlewares];
  }
  newArr.push(...metadata.errorMiddlewares);
  metadata.errorMiddlewares = newArr;
  Reflect.defineMetadata(metadataKey, metadata, target);
}
