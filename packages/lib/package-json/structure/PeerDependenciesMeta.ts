import { z } from 'zod';

export type PeerDependenciesMetaBag = z.infer<typeof PeerDependenciesMeta.schema>;

/**
 * package.json metadata about peer dependencies.
 * @link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependenciesmeta
 */
export default class PeerDependenciesMeta {
    static get schema() {
        return z.object({
            optional: z.boolean().optional(),
        });
    }

    static fromRecord(
        data?: Record<string, PeerDependenciesMetaBag>,
    ): Map<string, PeerDependenciesMeta> {
        if (data) {
            const result: Record<string, PeerDependenciesMeta> = {};

            Object.entries(data).forEach(([key, value]) => {
                result[key] = new PeerDependenciesMeta(value);
            });

            return new Map(Object.entries(result));
        } else {
            return new Map();
        }

    }

    readonly #optional: boolean;

    constructor(data: PeerDependenciesMetaBag) {
        this.#optional = data.optional ?? false;
    }

    get optional() { return this.#optional; }
}