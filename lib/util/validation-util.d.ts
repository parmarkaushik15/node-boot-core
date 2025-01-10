import { ValidationError } from "express-validator";
export interface HttpResponseError {
    source?: string;
    title?: string;
    detail?: string;
}
export declare const validationErrorFormatter: (expressValidatorError: ValidationError) => HttpResponseError;
