/**
 * It will use to convert the string or object to JSON.
 * @param {object | any} this param either string or object.
 * @returns {JSON} The json object response.
 */
export const toJson = (arg: object | any) => {
    return arg ? JSON.parse(JSON.stringify(arg)) : null;
};

/**
 * It will use to copy the json from one object to other.
 * @param {object | any} this param either string or object.
 * @returns {JSON} A copy json object response.
 */
export const copy = (arg: object | any) => {
    return arg ? JSON.parse(JSON.stringify(arg)) : null;
};