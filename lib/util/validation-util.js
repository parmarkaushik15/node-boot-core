"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorFormatter = void 0;
var validationErrorFormatter = function (expressValidatorError) {
    var appErr = expressValidatorError.msg
        ? expressValidatorError.msg
        : {};
    appErr.source = expressValidatorError.param;
    return appErr;
};
exports.validationErrorFormatter = validationErrorFormatter;
//# sourceMappingURL=validation-util.js.map