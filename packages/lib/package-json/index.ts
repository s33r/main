import GeneralError from '@ehwillows/lib.core/GeneralError';
import { safeCreate } from '@ehwillows/lib.core/ObjectFactory';
import type { ResultContainer } from '@ehwillows/lib.core/ResultContainer';
import PackageJson from '@ehwillows/lib.package-json/structure/PackageJson';
import { readFile } from 'fs/promises';

export const parseFile = async (
    fileLocation: string,
): Promise<ResultContainer<PackageJson<unknown>>> => {
    try {
        const content = await readFile(fileLocation, 'utf-8');

        return parse(content);
    } catch(error) {
        return {
            success: false,
            errors : [ GeneralError.fromError(error)],
        };
    }

};

export const parse = (
    content: string,
): ResultContainer<PackageJson> => safeCreate(content, PackageJson);