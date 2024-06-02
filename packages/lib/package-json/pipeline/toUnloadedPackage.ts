import type { UnloadedPackage } from '@ehwillows/lib.package-json/pipeline/types.js';

export default (
    location: string,
): UnloadedPackage => ({
    success: true,
    phase  : 'unloaded',
    location,
});