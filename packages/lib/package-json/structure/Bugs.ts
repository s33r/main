import { z } from 'zod';

export type BugsArgs = z.infer<typeof Bugs.schema>;

/**
 * package.json Bugs object.
 * @link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bugs
 */
export default class Bugs {
    static get schema() {
        return z.string().or(z.object({
            url  : z.string(),
            email: z.string(),
        })).or(z.object({
            url  : z.string(),
            email: z.string().optional(),
        })).or(z.object({
            url  : z.string().optional(),
            email: z.string(),
        }));
    }

    readonly #url  : string;
    readonly #email: string;

    constructor(data: BugsArgs) {
        if (typeof data === 'string') {
            this.#url   = data;
            this.#email = '';
        } else {
            this.#url   = data.url ?? '';
            this.#email = data.email ?? '';
        }
    }

    get url() { return this.#url; }
    get email() { return this.#email; }
}