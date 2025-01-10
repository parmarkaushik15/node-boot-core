import {
  RequestHandler,
  ErrorRequestHandler,
  IRouter,
  RouterOptions,
} from "express";

export type Middleware = RequestHandler;
export type ErrorMiddleware = ErrorRequestHandler;
export type WrapperFunction = (methodOrProperty: any) => RequestHandler;
export type Controller = any;
export type RouterLib = (options?: RouterOptions) => IRouter;
export const DependenciesMapping:any[] = [];
export interface IRouterAndPath {
  basePath: any;
  router: RequestHandler;
}
export interface IMethodMetadata {
  httpRoutes?: IHttpRoute[];
  errorMiddlewares?: ErrorMiddleware[];
  middlewares?: Middleware[];
  wrapper?: WrapperFunction;
}

export interface IClassMetadata {
  basePath?: any;
  name?: any;
  childControllers?: Controller[];
  errorMiddlewares?: ErrorMiddleware[];
  middlewares?: Middleware[];
  options?: RouterOptions;
  wrapper?: WrapperFunction;
  type?: any;
}


export interface IServiceMetadata {
  basePath?: any;
  name?: any;
  type?: any;
}

export interface IComponentMetadata {
  basePath?: any;
  name?: any;
  type?: any;
}

export interface IConfigurationMetadata {
  basePath?: any;
  name?: any;
  type?: any;
}

export interface IRepositoryMetadata {
  basePath?: any;
  name?: any;
  type?: any;
}


export const classMetadataKey: symbol = Symbol("Class Metadata Key");
export const serviceMetadataKey: symbol = Symbol("Service Metadata Key");
export const componentMetadataKey: symbol = Symbol("Component Metadata Key");
export const repositoryMetadataKey: symbol = Symbol("Repository Metadata Key");
export const congurationMetadataKey: symbol = Symbol("Configuration Metadata Key");

export type HttpDecorator = HttpVerb | "all";

export interface IHttpRoute {
  httpDecorator: HttpDecorator;
  path: string | RegExp;
}

export enum HttpVerb {
  CHECKOUT = "checkout",
  COPY = "copy",
  DELETE = "delete",
  GET = "get",
  HEAD = "head",
  LOCK = "lock",
  MERGE = "merge",
  MKACTIVITY = "mkactivity",
  MKCOL = "mkcol",
  MOVE = "move",
  MSEARCH = "m-search",
  NOTIFY = "notify",
  OPTIONS = "options",
  PATCH = "patch",
  POST = "post",
  PURGE = "purge",
  PUT = "put",
  REPORT = "report",
  SEARCH = "search",
  SUBSCRIBE = "subscribe",
  TRACE = "trace",
  UNLOCK = "unlock",
  UNSUBSCRIBE = "unsubscribe",
}


export function createClassDecorator<C extends new (...args: any[]) => any>(
  wrapper: (
    constructor: C,
    ...args: ConstructorParameters<C>
  ) => InstanceType<C>
) {
  return ((constructor: C) => {
    wrapper.prototype = constructor.prototype;
    const wrapped = wrapper.bind(null, constructor);
    return wrapped;
  }) as ClassDecorator;
}
