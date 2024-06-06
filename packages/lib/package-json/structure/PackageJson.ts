import GeneralError from '@ehwillows/lib.core/GeneralError';
import { ObjectFactoryPrototype } from '@ehwillows/lib.core/ObjectFactory';
import type { ResultContainer } from '@ehwillows/lib.core/ResultContainer';
import FrozenMap from '@ehwillows/lib.core/data-structures/FrozenMap';
import Bugs from '@ehwillows/lib.package-json/structure/Bugs';
import Funding from '@ehwillows/lib.package-json/structure/Funding';
import PeerDependenciesMeta from '@ehwillows/lib.package-json/structure/PeerDependenciesMeta';
import Person from '@ehwillows/lib.package-json/structure/Person';
import Repository from '@ehwillows/lib.package-json/structure/Repository';
import { PackageOverrides, createPackageOverrides } from '@ehwillows/lib.package-json/structure/packageOverridesSchema';
import schema from '@ehwillows/lib.package-json/structure/schema';
import { z } from 'zod';

export type PackageJsonBaseBag = z.infer<typeof PackageJson.schema>;

const fromPossibleArray = <T>(
    data?: T | Array<T>,
): Array<T> => {
    if (Array.isArray(data)) {
        return data;
    } else if (data) {
        return [ data ];
    } else {
        return [];
    }
};

export default class PackageJson<T_Config_Class = unknown> {
    static get schema() {
        return schema;
    }

    static create(data: unknown) {
        return new this(this.schema.parse(data));
    }

    static safeCreate<T_Config_Bag = unknown, T_Config_Class = unknown>(
        data: unknown,
        ConfigConstructor?: ObjectFactoryPrototype<T_Config_Bag, T_Config_Class>,
    ): ResultContainer<PackageJson<T_Config_Class>> {
        const parsed = this.schema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                errors : parsed.error.issues.map(GeneralError.fromZodIssue),
            };
        }

        const parsedData = parsed.data;

        if (ConfigConstructor) {
            const parsedConfig = ConfigConstructor.safeCreate(parsed.data.config);

            if (parsedConfig.success) {
                parsedData.config = parsedConfig.data;
            } else {
                return {
                    success: false,
                    errors : parsedConfig.errors,
                };
            }
        }

        return {
            success: true,
            data   : new this<T_Config_Class>(parsedData),
        };
    }

    readonly #name                : string;
    readonly #description         : string;
    readonly #version             : string;
    readonly #homepage            : string;
    readonly #keywords            : ReadonlyArray<string>;
    readonly #bugs                : Bugs | null;
    readonly #license             : string;
    readonly #author              : Person | null;
    readonly #contributors        : ReadonlyArray<Person>;
    readonly #funding             : ReadonlyArray<Funding>;
    readonly #files               : ReadonlyArray<string>;
    readonly #main                : string;
    readonly #browser             : string;
    readonly #bin                 : ReadonlyMap<string, string>;
    readonly #man                 : ReadonlyArray<string>;
    readonly #directories         : unknown;
    readonly #repository          : Repository | null;
    readonly #scripts             : ReadonlyMap<string, string>;
    readonly #config              : T_Config_Class | null;
    readonly #dependencies        : ReadonlyMap<string, string>;
    readonly #devDependencies     : ReadonlyMap<string, string>;
    readonly #peerDependencies    : ReadonlyMap<string, string>;
    readonly #peerDependenciesMeta: ReadonlyMap<string, PeerDependenciesMeta>;
    readonly #bundleDependencies  : ReadonlyMap<string, string>;
    readonly #optionalDependencies: ReadonlyMap<string, string>;
    readonly #overrides           : PackageOverrides;
    readonly #engines             : ReadonlyMap<string, string>;
    readonly #os                  : ReadonlyArray<string>;
    readonly #cpu                 : ReadonlyArray<string>;
    readonly #private             : boolean;
    readonly #publishConfig       : unknown;
    readonly #workspaces          : ReadonlyArray<string>;

    constructor(data: PackageJsonBaseBag) {
        this.#name                 = data.name ?? '';
        this.#description          = data.description ?? '';
        this.#version              = data.version ?? '';
        this.#homepage             = data.homepage ?? '';
        this.#keywords             = data.keywords ?? Object.freeze([]);
        this.#bugs                 = data.bugs ? new Bugs(data.bugs) : null;
        this.#license              = data.license ?? 'UNLICENSED';
        this.#author               = data.author ? new Person(data.author) : null;
        this.#contributors         = Object.freeze(data.contributors?.map(c => new Person(c)) ?? []);
        this.#funding              = Object.freeze(fromPossibleArray(data.funding).map(c => new Funding(c)));
        this.#files                = Object.freeze(Array.from(data.files ?? []));
        this.#main                 = data.main ?? 'index.js';
        this.#browser              = data.browser ?? '';
        this.#bin                  = new FrozenMap(Object.entries(data.bin ?? {}));
        this.#man                  = Object.freeze(Array.from(fromPossibleArray(data.man)));
        this.#directories          = data.directories;
        this.#repository           = data.repository ? new Repository(data.repository) : null;
        this.#scripts              = new FrozenMap(Object.entries(data.scripts ?? {}));
        this.#config               = data.config ? data.config as T_Config_Class : null;
        this.#dependencies         = new FrozenMap(Object.entries(data.dependencies ?? {}));
        this.#devDependencies      = new FrozenMap(Object.entries(data.devDependencies ?? {}));
        this.#peerDependencies     = new FrozenMap(Object.entries(data.peerDependencies ?? {}));
        this.#peerDependenciesMeta = PeerDependenciesMeta.fromRecord(data.peerDependenciesMeta);
        this.#bundleDependencies   = new FrozenMap(Object.entries(data.bundleDependencies ?? {}));
        this.#optionalDependencies = new FrozenMap(Object.entries(data.optionalDependencies ?? {}));
        this.#overrides            = createPackageOverrides(data.overrides);
        this.#engines              = new FrozenMap(Object.entries(data.engines ?? {}));
        this.#os                   = Object.freeze(Array.from(data.man ?? []));
        this.#cpu                  = Object.freeze(Array.from(data.cpu ?? []));
        this.#private              = data.private ?? false;
        this.#publishConfig        = data.publishConfig;
        this.#workspaces           = Object.freeze(Array.from(data.workspaces ?? []));
    }

    get name() { return this.#name; }
    get description() { return this.#description; }
    get version() { return this.#version; }
    get homepage() { return this.#homepage; }
    get keywords() { return this.#keywords; }
    get bugs() { return this.#bugs; }
    get license() { return this.#license; }
    get author() { return this.#author; }
    get contributors() { return this.#contributors; }
    get funding() { return this.#funding; }
    get files() { return this.#files; }
    get main() { return this.#main; }
    get browser() { return this.#browser; }
    get bin() { return this.#bin; }
    get man() { return this.#man; }
    get directories() { return this.#directories; }
    get repository() { return this.#repository; }
    get scripts() { return this.#scripts; }
    get config() { return this.#config; }
    get dependencies() { return this.#dependencies; }
    get devDependencies() { return this.#devDependencies; }
    get peerDependencies() { return this.#peerDependencies; }
    get peerDependenciesMeta() { return this.#peerDependenciesMeta; }
    get bundleDependencies() { return this.#bundleDependencies; }
    get optionalDependencies() { return this.#optionalDependencies; }
    get overrides() { return this.#overrides; }
    get engines() { return this.#engines; }
    get os() { return this.#os; }
    get cpu() { return this.#cpu; }
    get private() { return this.#private; }
    get publishConfig() { return this.#publishConfig; }
    get workspaces() { return this.#workspaces; }
}