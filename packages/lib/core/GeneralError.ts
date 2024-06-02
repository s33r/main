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
    static fromJsonParseError(error: ParseError): GeneralError;

    /**
     * Transforms a JSONC parse error into a GeneralError
     * @param error The JSONC parse error
     * @param message String to prepend to the error's message.
     * @returns A GeneralError with the data from the parse error.
     */
    static fromJsonParseError(
        error: ParseError,
        message: string = '',
    ): GeneralError  {
        const prefix = typeof message === 'string' ? message : '';

        return new GeneralError({
            message : `${prefix}${printParseErrorCode(error.error)}`,
            location: error.offset.toString(),
            code    : 'json-parse',
        });
    }

    /**
     * Transforms a zod Issue into a GeneralError
     * @param error The Issue to convert
     * @returns A GeneralError with the data from the zod Issue.
     */
    static fromZodIssue(error: z.ZodIssue): GeneralError;

    /**
     * Transforms a zod Issue into a GeneralError
     * @param error The Issue to convert
     * @param message String to prepend to the error's message.
     * @returns A GeneralError with the data from the zod Issue.
     */
    static fromZodIssue(
        error: z.ZodIssue,
        message: string = '',
    ): GeneralError  {
        const prefix = typeof message === 'string' ? message : '';

        return new GeneralError({
            message : `${prefix}${error.message}`,
            location: error.path.join('.'),
            code    : error.code,
        });
    }

    /**
     * Transforms a native Error into a GeneralError
     * @param error The Error to convert. If this is not an error, it is converted to a string and used as the message.
     * @returns A GeneralError with the data from the native Error.
     */
    static fromError(error: unknown): GeneralError;

    /**
     * Transforms a native Error into a GeneralError
     * @param error The Error to convert. If this is not an error, it is converted to a string and used as the message.
     * @param message String to prepend to the error's message.
     * @returns A GeneralError with the data from the native Error.
     */
    static fromError(
        error: unknown,
        message: string = '',
    ): GeneralError {
        const prefix = typeof message === 'string' ? message : '';

        if(error instanceof Error) {
            return new GeneralError({
                message : `${prefix}${error.message}`,
                code    : error.name,
                location: error.stack?.split('\n')[0] ?? '',
            });
        } else {
            return new GeneralError(`${prefix}${error}`);
        }

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
        data: GeneralError | Array<GeneralError>,
    ): string {
        if(Array.isArray(data)) {
            return data.map(this.toString).join('\n');
        } else {
            const location = data.location ? `(${data.location}) ` : '';
            const code     = data.code ? `[${data.code}] ` : '';

            return `${code}${location}${data.#message}`;
        }

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