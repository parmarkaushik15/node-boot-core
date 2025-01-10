import { Request, Response, NextFunction } from "express";
export declare const errorHandler: (error: any, req: Request, res: Response, next: NextFunction) => void;
declare class BaseError extends Error {
    statusCode: number;
    errorMessage: string;
    errorMessageDetail: string;
    error: Error | any;
    constructor(statusCode: number, errorMessage: string, errorMessageDetail?: string, error?: Error | any);
}
export declare class NotFoundError extends BaseError {
    constructor(errorMessage: string, errorMessageDetail?: string);
}
export declare class BadRequestError extends BaseError {
    constructor(errorMessage: string, errorMessageDetail?: string);
}
export declare class InternalServerError extends BaseError {
    constructor(error: Error | any);
}
export declare class UnAuthenticatedError extends BaseError {
    constructor(errorMessage: string, errorMessageDetail?: string);
}
export {};
