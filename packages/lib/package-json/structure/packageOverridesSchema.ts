import { z } from 'zod';

export type PackageOverrides = ReadonlyMap<string, string | PackageOverrides>;

export type PackageOverridesBag = {
    [key: string]: string | PackageOverridesBag;
};

const packageOverridesSchema: z.ZodType<PackageOverridesBag> = z.record(z.string().or(z.lazy(() => packageOverridesSchema)));

/**
 * package.json overrides object.
 * @link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides
 */
export default packageOverridesSchema;

export const createPackageOverrides = (
    data?: PackageOverridesBag,
): PackageOverrides => {
    const result = new Map<string, string | PackageOverrides>();

    Object.entries(data ?? {}).forEach(([ key, value ]) => {
        const newValue = typeof value === 'string' ? value : createPackageOverrides(value);

        result.set(key, newValue);
    });

    return result;
};