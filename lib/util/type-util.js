"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBoolean = exports.isEmptyString = exports.isBlankOrNull = exports.isArray = exports.isObject = exports.isExist = exports.isBoolean = exports.isString = exports.isNumber = exports.isDate = exports.isValidDateString = exports.isValidDateObject = exports.isEmptyArray = exports.isEmptyObject = void 0;
var isEmptyObject = function (obj) {
    if (obj === undefined || obj === null) {
        return false;
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};
exports.isEmptyObject = isEmptyObject;
var isEmptyArray = function (arr) {
    if (arr === undefined || arr === null) {
        return false;
    }
    return Array.isArray(arr) && !arr.length;
};
exports.isEmptyArray = isEmptyArray;
var isValidDateObject = function (date) {
    if (date === undefined || date === null) {
        return false;
    }
    return new Date(date).toString() !== "Invalid Date";
};
exports.isValidDateObject = isValidDateObject;
var isValidDateString = function (date) {
    if (date === undefined || date === null || date === "") {
        return false;
    }
    return !isNaN(Date.parse(date));
};
exports.isValidDateString = isValidDateString;
var isDate = function (date) {
    if (date === undefined || date === null || date === "") {
        return false;
    }
    if (typeof date === "string") {
        return !isNaN(Date.parse(date));
    }
    else {
        return new Date(date).toString() !== "Invalid Date";
    }
};
exports.isDate = isDate;
var isNumber = function (num) {
    if (num === undefined || num === null || num === "") {
        return false;
    }
    return /^-?[\d.]+(?:e-?\d+)?$/.test(num);
};
exports.isNumber = isNumber;
var isString = function (str) {
    if (str === undefined || str === null) {
        return false;
    }
    return typeof str === "string" ? true : false;
};
exports.isString = isString;
var isBoolean = function (bool) {
    if (bool === undefined || bool === null) {
        return false;
    }
    return typeof bool === "boolean" ? true : false;
};
exports.isBoolean = isBoolean;
var isExist = function (variable) {
    if (variable === undefined || variable === null) {
        return false;
    }
    return true;
};
exports.isExist = isExist;
var isObject = function (obj) {
    if (obj === undefined || obj === null) {
        return false;
    }
    return typeof obj === "object" && !Array.isArray(obj) && obj !== null
        ? true
        : false;
};
exports.isObject = isObject;
var isArray = function (arr) {
    if (arr === undefined || arr === null) {
        return false;
    }
    return typeof arr === "object" && Array.isArray(arr) && arr !== null
        ? true
        : false;
};
exports.isArray = isArray;
var isBlankOrNull = function (args) {
    if (args === undefined || args === null || args === "" || args === "null") {
        return true;
    }
    return false;
};
exports.isBlankOrNull = isBlankOrNull;
var isEmptyString = function (args) {
    if (args === undefined || args === null || args === "" || args === "null") {
        return true;
    }
    return false;
};
exports.isEmptyString = isEmptyString;
var toBoolean = function (args) {
    var _a;
    if (args === undefined || args === null || args === "" || args === "null") {
        return false;
    }
    switch ((_a = args === null || args === void 0 ? void 0 : args.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim()) {
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
exports.toBoolean = toBoolean;
//# sourceMappingURL=type-util.js.map