import { Request, Response, NextFunction } from "express";

/**
 * A middleware that handles the errors that may occurs in express routes callbacks.
 *
 * This middleware MUST come at the very end of express application middleware pipeline.
 * @param error The error object.
 * @param req The express request instance.
 * @param res The express response instance.
 * @param next The next middleware but actually this should be the last middleware in the pipeline, don't remove this parameter it's important.
 */
export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let obj = {
        status: false,
        errors: [
            {
                message: error.message,
                detail:
                    error.statusCode != 500
                        ? error.errorMessageDetail
                            ? error.errorMessageDetail
                            : null
                        : error.error,
            },
        ],
    };
    res.status(error.statusCode).send(obj);
};

class BaseError extends Error {
    statusCode: number;
    errorMessage: string;
    errorMessageDetail: string;
    error: Error | any;
    constructor(
        statusCode: number,
        errorMessage: string,
        errorMessageDetail: string = "",
        error: Error | any = null
    ) {
        super(errorMessage);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.errorMessageDetail = errorMessageDetail;
        this.error = error;
    }
}

export class NotFoundError extends BaseError {
    constructor(errorMessage: string, errorMessageDetail: string = "") {
        super(404, errorMessage, errorMessageDetail);
    }
}

export class BadRequestError extends BaseError {
    constructor(errorMessage: string, errorMessageDetail: string = "") {
        super(400, errorMessage, errorMessageDetail);
    }
}

export class InternalServerError extends BaseError {
    constructor(error: Error | any) {
        super(500, "Internal server error", "", error);
    }
}

export class UnAuthenticatedError extends BaseError {
    constructor(errorMessage: string, errorMessageDetail: string = "") {
        super(401, errorMessage, errorMessageDetail);
    }
}
