declare class DependencyManager {
    private deps;
    constructor();
    get(key: string): any;
    set(key: string, dep: any): void;
}
declare const _default: DependencyManager;
export default _default;
