import { RouterOptions } from "express";
import { Controller } from "./types";
export declare function Controller(path: string): ClassDecorator;
export declare function ClassOptions(options: RouterOptions): ClassDecorator;
export declare function Children(children: Controller | Controller[]): ClassDecorator;
export declare function ChildControllers(children: Controller | Controller[]): ClassDecorator;
export declare function addBasePathToClassMetadata(target: Object, basePath: string, type: string): void;
export declare function addClassOptionsToClassMetadata(target: Object, options: RouterOptions): void;
export declare function addChildControllersToClassMetadata(target: Object, childControllers: Controller | Controller[]): void;
