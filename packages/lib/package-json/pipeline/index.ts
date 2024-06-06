import toLoadedPackage from '@ehwillows/lib.package-json/pipeline/toLoadedPackage.js';
import toParsedPackage from '@ehwillows/lib.package-json/pipeline/toParsedPackage.js';
import toUnloadedPackage from '@ehwillows/lib.package-json/pipeline/toUnloadedPackage.js';
import toValidatedPackage from '@ehwillows/lib.package-json/pipeline/toValidatedPackage.js';
import type { PackageFile, PackagePipelineStep } from '@ehwillows/lib.package-json/pipeline/types.js';

const pipeline: Array<PackagePipelineStep> = [
    toLoadedPackage,
    toParsedPackage,
    toValidatedPackage,
];


export const executePipeline = async (
    data: string | ReadonlyArray<string>,
): Promise<Array<PackageFile>> => {
    if(typeof data === 'string') {
        return await executePipeline([ data ]);
    } else {
        let buffer: Array<PackageFile> = data.map(toUnloadedPackage);

        for(const step of pipeline) {
            buffer = await Promise.all(buffer.map(step));
        }

        return buffer;
    }
};