import { ParseError, printParseErrorCode } from 'jsonc-parser';
import { z } from 'zod';

export interface GeneralErrorBag {
    message  : string;
    location?: string;
    code    ?: string;
}

/**
 * An error that can come from a variety of sources.
 */
export default class GeneralError {

    /**
     * Transforms a JSONC parse error into a GeneralError
     * @param error The JSONC parse error
     * @returns A GeneralError with the data from the parse error.
     */
    static fromJsonParseError(
        error: ParseError,
    ): GeneralError  {
        return new GeneralError({
            message : printParseErrorCode(error.error),
            location: error.offset.toString(),
            code    : 'json-parse',
        });
    }

    static fromZodIssue(
        error: z.ZodIssue,
    ): GeneralError  {
        return new GeneralError({
            message : error.message,
            location: error.path.join('.'),
            code    : error.code,
        });
    }

    /**
     * Transforms a zod Issue into a GeneralError
     * @param error The Issue to convert
     * @returns A GeneralError with the data from the zod Issue.
     */
    static fromError(
        error:Error,
    ): GeneralError {
        return new GeneralError({
            message : error.message,
            code    : error.name,
            location: error.stack?.split('\n')[0] ?? '',
        });
    }

    /**
     *Converts a GeneralError into a property bag
    * @param data The GeneralError to convert
    * @returns The property bag that contains the GeneralError's data
    */
    static toBag(
        data: GeneralError,
    ): Required<GeneralErrorBag> {
        return {
            message : data.message,
            location: data.location,
            code    : data.code,
        };
    }

    /**
     * Transforms a native Error into a GeneralError
     * @param error The Error to convert
     * @returns A GeneralError with the data from the native Error.
     */
    static toError(
        data: GeneralError,
    ): Error {
        return new Error(this.toString(data));
    }

    /**
     * Converts a GeneralError into a string.
     * @param data The GeneralError to convert to a string
     * @returns Returns data about this GeneralError in string form.
     */
    static toString(
        data: GeneralError,
    ) {
        const location = data.location ? `(${data.location}) ` : '';
        const code     = data.code ? `[${data.code}] ` : '';

        return `${code}${location}${data.#message}`;
    }

    readonly #message : string;
    readonly #location: string;
    readonly #code    : string;

    /**
     * Creates a new GeneralError object.
     * @param data The error data. If this is a string the data will be used as the GeneralError's message.
     */
    constructor(data: GeneralErrorBag | string) {
        if (typeof data === 'string') {
            this.#message  = data;
            this.#location = '';
            this.#code     = '';
        } else {
            this.#message  = data.message;
            this.#location = data.location ?? '';
            this.#code     = data.code ?? '';
        }
    }

    get message() { return this.#message; }
    get location() { return this.#location; }
    get code() { return this.#code; }

    toBag() { return GeneralError.toBag(this); }
    toString() { return GeneralError.toString(this); }
}