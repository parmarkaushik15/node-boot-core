import { ValidationError } from "express-validator";
/**
 * Represents an app http error that should be sent within a failed request's response.
 *
 * @summary All error members are optional but the more details the server sends back to the client the more easy it becomes to fix the error.
 */
export interface HttpResponseError {
    /**
     * Gets or sets the name of the source that causes this error.
     *
     * Usually it's the name of the property that causes the error.
     *
     * The property maybe a nested property,
     * in this case use e.g. if we are validating a `Person` object use `address.postalCode` instead of `postalCode`.
     */
    source?: string;

    /**
     * Gets or sets a generic title of the problem.
     */
    title?: string;

    /**
     * Gets or sets a more descriptive details for the problem, unlike the generic @field title.
     */
    detail?: string;
}

/**
 * Formats a given express-validator validation-error in an `HttpResponseError` form.
 * @param expressValidatorError The express-validator validation-error.
 */
export const validationErrorFormatter = (
    expressValidatorError: ValidationError
): HttpResponseError => {
    /* Create a new app-error from express-validation-error payload's message field. */
    const appErr: HttpResponseError = expressValidatorError.msg
        ? expressValidatorError.msg
        : {};

    /* Set the name of the field that causes the error. */
    appErr.source = expressValidatorError.param;

    return appErr;
};
