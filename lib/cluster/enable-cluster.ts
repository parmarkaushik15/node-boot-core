import { readProperties } from "../util/util";

export const EnableCluster = (target: any) => {
    const properties: any = readProperties();
    if (properties) {
        Object.assign(global, { clusterStatus: true });
        return target;
    } else {
        throw new Error("application.properties file is required");
    }
}
