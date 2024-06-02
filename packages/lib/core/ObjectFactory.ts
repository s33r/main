import GeneralError from '@ehwillows/lib.core/GeneralError';
import { z } from 'zod';

export interface ObjectFactoryPrototype<T_Bag, T_Class> {
    create         : (data: unknown) => T_Class;
    safeCreate     : (data: unknown) => ResultContainer<T_Class>;
    readonly schema: z.ZodSchema<T_Bag>;
    new(data: T_Bag):T_Class;
}

export type ResultContainer<T> = {
    success: true;
    data   : T;
} | {
    success: false;
    errors : Array<GeneralError>;
};

/**
 * Creates a new object using the provided constructor, if the creation fails, a list of errors are returned.
 * @param data The data used to construct the object.
 * @param Constructor The ObjectFactory used to construct the object.
 * @returns A result that either contains the created object or a list of errors.
 */
export const safeCreate = <T_Bag, T_Class> (
    data: unknown,
    Constructor: ObjectFactoryPrototype<T_Bag, T_Class>,
): ResultContainer<T_Class> => {
    try {
        return Constructor.safeCreate(data);
    } catch(error) {
        return {
            success: false,
            errors : [GeneralError.fromError(error)],
        };
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