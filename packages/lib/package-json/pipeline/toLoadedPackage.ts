import GeneralError from '@ehwillows/lib.core/GeneralError.js';
import type { PackageFile } from '@ehwillows/lib.package-json/pipeline/types.js';
import { readFile } from 'fs/promises';

export default async (
    unloadedPackage: PackageFile,
): Promise<PackageFile> => {
    if(unloadedPackage.success && unloadedPackage.phase === 'unloaded') {
        try {
            const content = await readFile(unloadedPackage.location, 'utf-8');

            return {
                success : true,
                phase   : 'loaded',
                location: unloadedPackage.location,
                content,
            };
        } catch(error) {
            return {
                success : false,
                phase   : 'loaded',
                location: unloadedPackage.location,
                errors  : [ GeneralError.fromError(error) ],
            };
        }
    } else {
        return unloadedPackage;
    }
};