export interface OptionsBag {
    cwd?      : string;
    recursive?: boolean;
    include?  : string | Array<string>;
}

export default class Options {
    readonly #cwd      : string;
    readonly #recursive: boolean;
    readonly #include  : ReadonlyArray<string>;

    constructor(data?: OptionsBag) {
        this.#cwd       = data?.cwd ?? '';
        this.#recursive = data?.recursive ?? false;
        this.#include   = Object.freeze(Array.from(data?.include ?? ['package.json']));
    }

    get cwd() { return this.#cwd; }
    get recursive() { return this.#recursive; }
    get include() { return this.#include; }
}