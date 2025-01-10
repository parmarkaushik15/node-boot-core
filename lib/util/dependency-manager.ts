import { DependenciesMapping } from "../decorators/types";

class DependencyManager {
  private deps: Record<string, any>;
  constructor() {
    this.deps = {};
    DependenciesMapping.forEach(({ key, value }) => {
      this.set(key, value);
    });
  }

  get(key: string) {
    const matches = this.deps[key];
    return matches;
  }

  set(key: string, dep: any) {
    this.deps[key] = dep;
  }
}

export default new DependencyManager();
