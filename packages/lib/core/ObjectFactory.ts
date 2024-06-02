import GeneralError from '@ehwillows/lib.core/GeneralError';
import type { ResultContainer } from '@ehwillows/lib.core/ResultContainer';
import { parseJson } from '@ehwillows/lib.core/parsers';
import { z } from 'zod';

export interface ObjectFactoryPrototype<T_Bag, T_Class> {
    create         : (data: unknown) => T_Class;
    safeCreate     : (data: unknown) => ResultContainer<T_Class>;
    readonly schema: z.ZodSchema<T_Bag>;
    new(data: T_Bag):T_Class;
}

/**
 * Creates a new object using the provided constructor, if the creation fails, a list of errors are returned.
 * @param data The data used to construct the object.
 * @param Constructor The ObjectFactory used to construct the object.
 * @returns A result that either contains the created object or a list of errors.
 */
export const safeCreate = <T_Bag, T_Class> (
    data: unknown,
    Constructor: ObjectFactoryPrototype<T_Bag, T_Class>,
    json: boolean = false,
): ResultContainer<T_Class> => {
    try {
        if(json) {
            const parsedToJson = parseJson(data);

            if(parsedToJson.success) {
                return Constructor.safeCreate(parsedToJson.data);
            } else {
                return parsedToJson;
            }

        } else {
            return Constructor.safeCreate(data);
        }
    } catch(error) {
        if(error instanceof Error) {
            return {
                success: false,
                errors : [GeneralError.fromError(error)],
            };
        } else {
            return {
                success: false,
                errors : [new GeneralError(`safeCreate failed: ${error}`)],
            };
        }

    }
};

/**
 * Creates a new object using the provided constructor, if the creation fails an error will be thrown
 * @param data The data used to construct the object.
 * @param Constructor The ObjectFactory used to construct the object.
 * @returns The created object.
 */
export const create = <T_Bag, T_Class> (
    data: unknown,
    Constructor: ObjectFactoryPrototype<T_Bag, T_Class>,
): T_Class => Constructor.create(data);