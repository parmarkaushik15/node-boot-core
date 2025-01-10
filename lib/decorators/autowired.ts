import dependencyManager from "../util/dependency-manager";

export function Autowired(key: string) {
    return function (classInstance: any, propertyName: string) {
        Object.defineProperty(classInstance, propertyName, {
            get: () => dependencyManager.get(key), 
            enumerable: true,
            configurable: true,
        });
    };
}
