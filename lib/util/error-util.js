"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthenticatedError = exports.InternalServerError = exports.BadRequestError = exports.NotFoundError = exports.errorHandler = void 0;
var tslib_1 = require("tslib");
var errorHandler = function (error, req, res, next) {
    var obj = {
        status: false,
        errors: [
            {
                message: error.message,
                detail: error.statusCode != 500
                    ? error.errorMessageDetail
                        ? error.errorMessageDetail
                        : null
                    : error.error,
            },
        ],
    };
    res.status(error.statusCode).send(obj);
};
exports.errorHandler = errorHandler;
var BaseError = (function (_super) {
    tslib_1.__extends(BaseError, _super);
    function BaseError(statusCode, errorMessage, errorMessageDetail, error) {
        if (errorMessageDetail === void 0) { errorMessageDetail = ""; }
        if (error === void 0) { error = null; }
        var _newTarget = this.constructor;
        var _this = _super.call(this, errorMessage) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = Error.name;
        _this.statusCode = statusCode;
        _this.errorMessage = errorMessage;
        _this.errorMessageDetail = errorMessageDetail;
        _this.error = error;
        return _this;
    }
    return BaseError;
}(Error));
var NotFoundError = (function (_super) {
    tslib_1.__extends(NotFoundError, _super);
    function NotFoundError(errorMessage, errorMessageDetail) {
        if (errorMessageDetail === void 0) { errorMessageDetail = ""; }
        return _super.call(this, 404, errorMessage, errorMessageDetail) || this;
    }
    return NotFoundError;
}(BaseError));
exports.NotFoundError = NotFoundError;
var BadRequestError = (function (_super) {
    tslib_1.__extends(BadRequestError, _super);
    function BadRequestError(errorMessage, errorMessageDetail) {
        if (errorMessageDetail === void 0) { errorMessageDetail = ""; }
        return _super.call(this, 400, errorMessage, errorMessageDetail) || this;
    }
    return BadRequestError;
}(BaseError));
exports.BadRequestError = BadRequestError;
var InternalServerError = (function (_super) {
    tslib_1.__extends(InternalServerError, _super);
    function InternalServerError(error) {
        return _super.call(this, 500, "Internal server error", "", error) || this;
    }
    return InternalServerError;
}(BaseError));
exports.InternalServerError = InternalServerError;
var UnAuthenticatedError = (function (_super) {
    tslib_1.__extends(UnAuthenticatedError, _super);
    function UnAuthenticatedError(errorMessage, errorMessageDetail) {
        if (errorMessageDetail === void 0) { errorMessageDetail = ""; }
        return _super.call(this, 401, errorMessage, errorMessageDetail) || this;
    }
    return UnAuthenticatedError;
}(BaseError));
exports.UnAuthenticatedError = UnAuthenticatedError;
//# sourceMappingURL=error-util.js.map