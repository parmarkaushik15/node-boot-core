"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
var Ok = function (response, message, body) {
    return response.send({
        status: true,
        message: message ? message : null,
        result: body ? body : null,
    });
};
var BadRequest = function (response, body) {
    return body
        ? response.status(400).send({
            status: false,
            errors: body && Array.isArray(body) ? body : [body],
        })
        : response.status(400).send({ status: false });
};
var ApiUnAuthenticated = function (response, message) {
    if (message === void 0) { message = ""; }
    return response.status(401).send({
        status: false,
        errors: [
            {
                message: message ? message : "Api token is not authenticated",
                detail: "No valid access token provided",
            },
        ],
    });
};
var UnAuthenticated = function (response, message) {
    if (message === void 0) { message = ""; }
    return response.status(401).send({
        status: false,
        errors: [
            {
                message: message ? message : "User is not authenticated",
                detail: "No valid access token provided",
            },
        ],
    });
};
var Forbidden = function (response, message) {
    if (message === void 0) { message = ""; }
    return response.status(403).send({
        status: false,
        errors: [
            {
                message: message ? message : "Access denied",
                detail: "The user is trying to access a resource that he doesn't has the right to access",
            },
        ],
    });
};
var NotFound = function (response, body) {
    return body
        ? response.status(404).send({
            status: false,
            errors: body && Array.isArray(body) ? body : body ? body : [body],
        })
        : response.status(404).send({ status: false });
};
var InternalServer = function (response, error) {
    console.error(error);
    return response.status(500).send({
        status: false,
        errors: [
            {
                message: "Internal server error",
                detail: typeof error === "string" ? error : error.message,
            },
        ],
    });
};
var HandleAllError = function (response, error) {
    var statusCode = 500;
    var errors = [];
    var message = "Internal server error";
    if (error.response && error.response.data && error.response.data.error) {
        error = error.response.data.error;
        statusCode = error.code;
        message = error.message;
        errors = error.errors;
    }
    else {
        statusCode = error.statusCode ? error.statusCode : 500;
        message = error.message;
        errors.push({
            message: message,
            detail: error.statusCode != 500
                ? error.message
                    ? error.message
                    : null
                : error.error,
        });
    }
    var obj = {
        status: false,
        errors: errors,
    };
    return response.status(statusCode).send(obj);
};
var HttpResponse = (function () {
    function HttpResponse() {
    }
    HttpResponse.HandleAllError = HandleAllError;
    HttpResponse.InternalServerError = InternalServer;
    HttpResponse.NotFound = NotFound;
    HttpResponse.Forbidden = Forbidden;
    HttpResponse.UnAuthenticated = UnAuthenticated;
    HttpResponse.ApiUnAuthenticated = ApiUnAuthenticated;
    HttpResponse.BadRequest = BadRequest;
    HttpResponse.Ok = Ok;
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=response-util.js.map