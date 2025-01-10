import { readProperties } from "../util/util";

/**
 * EnableSocket anotations is used for enable the socket connectivity at application level.
 */
export const EnableSocket = (target: any) => {
    const properties: any = readProperties();
    if (properties) {
        Object.assign(global, { socketStatus: true });
        return target;
    } else {
        throw new Error("application.properties file is required");
    }
}
