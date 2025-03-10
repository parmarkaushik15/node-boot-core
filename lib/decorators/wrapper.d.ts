import { WrapperFunction } from "./types";
export declare function Wrapper(wrapper: WrapperFunction): MethodDecorator & PropertyDecorator;
export declare function ClassWrapper(wrapper: WrapperFunction): ClassDecorator;
export declare function addWrapperToMetadata(target: Object, metadataKey: any, wrapper: WrapperFunction): void;
