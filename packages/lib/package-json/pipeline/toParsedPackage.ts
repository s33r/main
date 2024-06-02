import GeneralError from '@ehwillows/lib.core/GeneralError.js';
import { safeCreate } from '@ehwillows/lib.core/ObjectFactory.js';
import type {  PackageFile } from '@ehwillows/lib.package-json/pipeline/types.js';
import PackageJson from '@ehwillows/lib.package-json/structure/PackageJson.js';

export default async (
    loadedPackage: PackageFile,
): Promise<PackageFile> => {
    if(loadedPackage.success && loadedPackage.phase === 'loaded') {
        try {
            const parseResult = safeCreate(loadedPackage.content, PackageJson, true);

            if(parseResult.success) {
                return {
                    success : true,
                    phase   : 'parsed',
                    location: loadedPackage.location,
                    content : loadedPackage.content,
                    data    : parseResult.data,
                };
            } else {
                return {
                    success : false,
                    phase   : 'parsed',
                    location: loadedPackage.location,
                    content : loadedPackage.content,
                    errors  : parseResult.errors,
                };
            }

        } catch(error) {
            return {
                success : false,
                phase   : 'parsed',
                location: loadedPackage.location,
                content : loadedPackage.content,
                errors  : [GeneralError.fromError(error)],
            };
        }
    } else {
        return loadedPackage;
    }
};