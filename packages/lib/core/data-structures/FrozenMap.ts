
/**
 * A ReadonlyMap that is _actually_ Readonly.
 */
export default class FrozenMap<T_Key, T_Value> implements ReadonlyMap<T_Key, T_Value> {
    readonly #map: Map<T_Key, T_Value>;

    constructor(iterable?: Iterable<[T_Key, T_Value]> | null | undefined) {
        this.#map = new Map(iterable);
    }

    get size() { return this.#map.size; }

    forEach(
        callbackfn: (value: T_Value, key: T_Key, map: ReadonlyMap<T_Key, T_Value>) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        thisArg?: any,
    ) {
        return this.#map.forEach(callbackfn, thisArg);
    }

    get(key: T_Key){return this.#map.get(key);}
    has(key: T_Key) {return this.#map.has(key);}
    entries(){return this.#map.entries();}
    keys(){return this.#map.keys();}
    values() {return this.#map.values();}
    [Symbol.iterator]() {return this.#map[Symbol.iterator]();}
}