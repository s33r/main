import { z } from 'zod';

export type FundingBag = z.infer<typeof Funding.schema>;

/**
 * The package.json Funding object
 * @link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#funding
 */
export default class Funding {
    static get schema() {
        return z.object({
            type: z.string(),
            url : z.string(),
        }).or(z.string());
    }

    readonly #type: string;
    readonly #url : string;

    constructor(data: FundingBag) {
        if (typeof data === 'string') {
            this.#type = '';
            this.#url  = data;
        } else {
            this.#type = data.type;
            this.#url  = data.url;
        }
    }

    get type() { return this.#type; }
    get url() { return this.#url; }
}