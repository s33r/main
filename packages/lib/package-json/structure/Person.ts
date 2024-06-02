import { z } from 'zod';

export type PersonBag = z.infer<typeof Person.schema>;

/**
 * package.json person - used by author, authors and contributors fields.
 * @link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#people-fields-author-contributors
 */
export default class Person {
    static get schema() {
        return z.object({
            name : z.string(),
            email: z.string().optional(),
            url  : z.string().optional(),
        }).or(z.string());
    }

    readonly #name : string;
    readonly #email: string;
    readonly #url  : string;

    constructor(data: PersonBag) {
        if (typeof data === 'string') { //TODO: parse name string
            this.#name  = data;
            this.#email = '';
            this.#url   = '';
        } else {
            this.#name  = data.name;
            this.#email = data.email ?? '';
            this.#url   = data.url ?? '';
        }
    }

    get name() { return this.#name; }
    get email() { return this.#email; }
    get url() { return this.#url; }
}