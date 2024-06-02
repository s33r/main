import GeneralError from '@ehwillows/lib.core/GeneralError.js';
import { parseFile } from '@ehwillows/lib.package-json/index.js';
import { executePipeline } from '@ehwillows/lib.package-json/pipeline/index.js';
import type { PackageFile } from '@ehwillows/lib.package-json/pipeline/types.js';
import { join, resolve } from 'path';

console.log('Not a container for sand.');

(async () => {
    const root = resolve(__dirname, '../../..');

    console.log(root);

    const results = await executePipeline([
        join(root, 'package.json'),
        join(root, 'packages/app/sandbox/package.json'),
        join(root, 'packages/lib/core/package.json'),
        join(root, 'packages/lib/package-json/package.json'),
    ]);

    results.forEach(result => {
        console.log(`\n----\n${result.location}`);
        if(result.success) {
            console.log(`    ${result.phase}`);
            if(result.phase === 'validated') {
                const p = result.data;

                console.log(`    ${p.name}`);
            } else if(result.phase === 'parsed') {
                const p = result.data;

                console.log(`    ${p.name}`);
            }
        } else {
            console.log(GeneralError.toString(result.errors));
        }
    });


})();