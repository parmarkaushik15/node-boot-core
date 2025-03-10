import { Middleware, ErrorMiddleware } from "./types";
export declare function Middleware(middleware: Middleware | Middleware[]): MethodDecorator & PropertyDecorator;
export declare function ErrorMiddleware(errorMiddleware: ErrorMiddleware | ErrorMiddleware[]): MethodDecorator & PropertyDecorator;
export declare function ClassMiddleware(middleware: Middleware | Middleware[]): ClassDecorator;
export declare function ClassErrorMiddleware(errorMiddleware: ErrorMiddleware | ErrorMiddleware[]): ClassDecorator;
export declare function addMiddlewareToMetadata(target: Object, metadataKey: any, middlewares: Middleware | Middleware[]): void;
export declare function addErrorMiddlewareToMetadata(target: Object, metadataKey: any, errorMiddlewares: ErrorMiddleware | ErrorMiddleware[]): void;
