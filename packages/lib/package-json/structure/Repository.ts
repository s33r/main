import { z } from 'zod';

export type RepositoryBag = z.infer<typeof Repository.schema>;

/**
 * package.json repository data
 * @link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository
 */
export default class Repository {
    static get schema() {
        return z.object({
            type     : z.string().optional(),
            url      : z.string(),
            directory: z.string().optional(),
        }).or(z.string());
    }

    readonly #type     : string;
    readonly #url      : string;
    readonly #directory: string;

    constructor(data: RepositoryBag) {
        if (typeof data === 'string') {
            this.#type      = '';
            this.#url       = data;
            this.#directory = '';
        } else {
            this.#type      = data.type ?? '';
            this.#url       = data.url;
            this.#directory = data.directory ?? '';
        }
    }

    get type() { return this.#type; }
    get url() { return this.#url; }
    get directory() { return this.#directory; }
}