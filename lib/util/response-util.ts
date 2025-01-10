import { Response } from "express";
/**
 * Returns a succeeded response with 200 status code.
 * @param response The http-response to be modified.
 * @param message An optional message that will be sent within the response' body.
 * @param body An optional body that will be sent within the response' body.
 */
const Ok = (response: Response, message?: string, body?: any): Response => {
    return response.send({
        status: true,
        message: message ? message : null,
        result: body ? body : null,
    });
};

/**
 * Returns a bad-request response with 200 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
const BadRequest = (response: Response, body?: any): Response => {
    return body
        ? response.status(400).send({
            status: false,
            errors: body && Array.isArray(body) ? body : [body],
        })
        : response.status(400).send({ status: false });
};

/**
 * Returns an un-authenticated response with 401 status code.
 * @param response The http-response to be modified.
 * @param message An optional message that will be sent within the response' body.
 */
const ApiUnAuthenticated = (
    response: Response,
    message: string = ""
): Response => {
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

/**
 * Returns an un-authenticated response with 401 status code.
 * @param response The http-response to be modified.
 * @param message An optional message that will be sent within the response' body.
 */
const UnAuthenticated = (
    response: Response,
    message: string = ""
): Response => {
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

/**
 * Returns a forbidden response with 403 status code.
 * @param response The http-response to be modified.
 * @param message An optional message that will be sent within the response' body.
 */
const Forbidden = (response: Response, message: string = ""): Response => {
    return response.status(403).send({
        status: false,
        errors: [
            {
                message: message ? message : "Access denied",
                detail: `The user is trying to access a resource that he doesn't has the right to access`,
            },
        ],
    });
};

/**
 * Returns a notfound response with 404 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
const NotFound = (response: Response, body?: any): Response => {
    return body
        ? response.status(404).send({
            status: false,
            errors: body && Array.isArray(body) ? body : body ? body : [body],
        })
        : response.status(404).send({ status: false });
};

/**
 * Returns an internal server error response with 500 status code.
 * @param response The http-response to be modified.
 * @param error The error or error-message to be sent within the response' body.
 */
const InternalServer = (
    response: Response,
    error: string | Error
): Response => {
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

/**
 * Returns an by default internal server error response with 500 status code and handle all the error
 * like @NotFound, @Forbidden, @UnAuthenticated, @BadRequest.
 * @param response The http-response to be modified.
 * @param error The error or error-message to be sent within the response' body.
 */
const HandleAllError = (response: Response, error: Error | any): Response => {
    let statusCode = 500;
    let errors = [];
    let message = "Internal server error";
    if (error.response && error.response.data && error.response.data.error) {
        error = error.response.data.error;
        statusCode = error.code;
        message = error.message;
        errors = error.errors;
    } else {
        statusCode = error.statusCode ? error.statusCode : 500;
        message = error.message;
        errors.push({
            message: message,
            detail:
                error.statusCode != 500
                    ? error.message
                        ? error.message
                        : null
                    : error.error,
        });
    }
    let obj = {
        status: false,
        errors: errors,
    };
    return response.status(statusCode).send(obj);
};

/**
 * The response service that includes functionalities to response any error or info.
 */
export class HttpResponse {
    /**
     * Returns an by default internal server error response with 500 status code and handle all the error
     * like @NotFound, @Forbidden, @UnAuthenticated, @BadRequest.
     * @param response The http-response to be modified.
     * @param error The error or error-message to be sent within the response' body.
     */
    public static HandleAllError = HandleAllError;

    /**
     * Returns an internal server error response with 500 status code.
     * @param response The http-response to be modified.
     * @param error The error or error-message to be sent within the response' body.
     */
    public static InternalServerError = InternalServer;

    /**
     * Returns a notfound response with 404 status code.
     * @param response The http-response to be modified.
     * @param body An optional body that will be sent within the response' body.
     */
    public static NotFound = NotFound;

    /**
     * Returns a forbidden response with 403 status code.
     * @param response The http-response to be modified.
     * @param message An optional message that will be sent within the response' body.
     */
    public static Forbidden = Forbidden;

    /**
     * Returns an un-authenticated response with 401 status code.
     * @param response The http-response to be modified.
     * @param message An optional message that will be sent within the response' body.
     */
    public static UnAuthenticated = UnAuthenticated;

    /**
     * Returns an un-authenticated response with 401 status code.
     * @param response The http-response to be modified.
     * @param message An optional message that will be sent within the response' body.
     */
    public static ApiUnAuthenticated = ApiUnAuthenticated;

    /**
     * Returns a bad-request response with 200 status code.
     * @param response The http-response to be modified.
     * @param body An optional body that will be sent within the response' body.
     */
    public static BadRequest = BadRequest;

    /**
     * Returns a succeeded response with 200 status code.
     * @param response The http-response to be modified.
     * @param message An optional message that will be sent within the response' body.
     * @param body An optional body that will be sent within the response' body.
     */
    public static Ok = Ok;
}
