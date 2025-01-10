import { RequestHandler } from "express";
import { Controller, ErrorMiddleware, IRouterAndPath, RouterLib } from "../decorators/types";
import PropertiesReader = require("properties-reader");
export declare function listDirectories(root: any): any;
export declare const dir: string;
export declare const wrapErrorMiddleware: (errorMiddleware: ErrorMiddleware, requestHandler: RequestHandler) => RequestHandler;
export declare const print: () => void;
export declare const getRouter: (routerLibrary: RouterLib, controller: Controller) => IRouterAndPath | null;
export declare const readFiles: (allFiles: any[]) => Promise<any>;
export declare const readConfigurationFiles: (allFiles: any[]) => Promise<any>;
export declare const readProperties: () => {
    [key: string]: PropertiesReader.Value;
} | undefined;
export declare const getPropertiesData: (properties: any, key: any, fix: any) => any;
export declare const createRandomCode: (length?: number) => Promise<string>;
export declare const checkDependency: (dependencyName: any, functionName: any, target: any) => Promise<any>;
