import GeneralError from '@ehwillows/lib.core/GeneralError.js';
import type { PackageFile } from '@ehwillows/lib.package-json/pipeline/types.js';

export default async (
    parsedPackage: PackageFile,
): Promise<PackageFile> => {
    if(parsedPackage.success && parsedPackage.phase === 'parsed') {
        try {
            return {
                success : true,
                phase   : 'validated',
                location: parsedPackage.location,
                content : parsedPackage.content,
                data    : parsedPackage.data,
            };

        } catch(error) {
            return {
                success : false,
                phase   : 'validated',
                location: parsedPackage.location,
                content : parsedPackage.content,
                data    : parsedPackage.data,
                errors  : [ GeneralError.fromError(error) ],
            };
        }
    } else {
        return parsedPackage;
    }
};