/**
 * A ReadonlySet that is _actually_ readonly
 */
export default class FrozenSet<T> implements ReadonlySet<T> {
    readonly #set: Set<T>;

    constructor(iterable?: Iterable<T> | null | undefined) {
        this.#set = new Set(iterable);
    }

    get size() { return this.#set.size; }

    forEach(
        callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        thisArg?: any,
    ) {
        this.#set.forEach(callbackfn, thisArg);
    }

    has(value: T) { return this.#set.has(value); }
    entries() { return this.#set.entries(); }
    keys() { return this.#set.keys(); }
    values() { return this.#set.values(); }
    [Symbol.iterator]() { return this.#set[Symbol.iterator](); }
}