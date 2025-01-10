export const isEmptyObject = (obj: object) => {
    if (obj === undefined || obj === null) {
        return false;
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmptyArray = (arr: Array<any>) => {
    if (arr === undefined || arr === null) {
        return false;
    }
    return Array.isArray(arr) && !arr.length;
};

export const isValidDateObject = (date: Date) => {
    if (date === undefined || date === null) {
        return false;
    }
    return new Date(date).toString() !== "Invalid Date";
};

export const isValidDateString = (date: string) => {
    if (date === undefined || date === null || date === "") {
        return false;
    }
    return !isNaN(Date.parse(date));
};

export const isDate = (date: Date | string) => {
    if (date === undefined || date === null || date === "") {
        return false;
    }
    if (typeof date === "string") {
        return !isNaN(Date.parse(date));
    } else {
        return new Date(date).toString() !== "Invalid Date";
    }
};

export const isNumber = (num: number | string | any) => {
    if (num === undefined || num === null || num === "") {
        return false;
    }
    return /^-?[\d.]+(?:e-?\d+)?$/.test(num);
};

export const isString = (str: string | any) => {
    if (str === undefined || str === null) {
        return false;
    }
    return typeof str === "string" ? true : false;
};

export const isBoolean = (bool: string | any) => {
    if (bool === undefined || bool === null) {
        return false;
    }
    return typeof bool === "boolean" ? true : false;
};

export const isExist = (variable: string | any) => {
    if (variable === undefined || variable === null) {
        return false;
    }
    return true;
};

export const isObject = (obj: object) => {
    if (obj === undefined || obj === null) {
        return false;
    }
    return typeof obj === "object" && !Array.isArray(obj) && obj !== null
        ? true
        : false;
};

export const isArray = (arr: Array<any>) => {
    if (arr === undefined || arr === null) {
        return false;
    }
    return typeof arr === "object" && Array.isArray(arr) && arr !== null
        ? true
        : false;
};

export const isBlankOrNull = (
    args: string | number | object | Array<any> | any
) => {
    if (args === undefined || args === null || args === "" || args === "null") {
        return true;
    }
    return false;
};

export const isEmptyString = (args: string) => {
    if (args === undefined || args === null || args === "" || args === "null") {
        return true;
    }
    return false;
};

export const toBoolean = (args: string) => {
    if (args === undefined || args === null || args === "" || args === "null") {
        return false;
    }
    switch (args?.toLowerCase()?.trim()) {
        case "true":
        case "yes":
        case "1":
            return true;

        case "false":
        case "no":
        case "0":
        case "":
        case "null":
        case null:
        case undefined:
            return false;

        default:
            return false;
    }
};