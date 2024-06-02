import type GeneralError from '@ehwillows/lib.core/GeneralError';

/**
 * A failure result. 😭
 */
export type ResultFailure = {
    success: false;
    errors : Array<GeneralError>;
};

/**
 * A success result 🥰
 */
export type ResultSuccess<T> = {
    success: true;
    data   : T;
};

/**
 * A result if success is true, then the operation was successful, otherwise it was... not.
 */
export type ResultContainer<T> = ResultSuccess<T> | ResultFailure;

/**
 *
 * @param result The result to unwrap
 * @returns If the result is successful, returns the data object, otherwise undefined.
 */
export const unwrap = <T>(
    result: ResultContainer<T>,
): T | undefined => result.success ? result.data : undefined;