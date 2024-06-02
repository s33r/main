import Bugs from '@ehwillows/lib.package-json/structure/Bugs';
import Funding from '@ehwillows/lib.package-json/structure/Funding';
import PeerDependenciesMeta from '@ehwillows/lib.package-json/structure/PeerDependenciesMeta';
import Person from '@ehwillows/lib.package-json/structure/Person';
import Repository from '@ehwillows/lib.package-json/structure/Repository';
import packageOverridesSchema from '@ehwillows/lib.package-json/structure/packageOverridesSchema';
import { z } from 'zod';

const name                 = z.string();
const description          = z.string();
const version              = z.string();
const homepage             = z.string();
const keywords             = z.string().array();
const bugs                 = Bugs.schema;
const license              = z.string();
const author               = Person.schema;
const contributors         = Person.schema.array();
const funding              = Funding.schema.or(Funding.schema.array());
const files                = z.string().array();
const main                 = z.string();
const browser              = z.string();
const bin                  = z.record(z.string()).or(z.string());
const man                  = z.string().array().or(z.string());
const directories          = z.unknown();
const repository           = Repository.schema;
const scripts              = z.record(z.string());
const config               = z.unknown();
const dependencies         = z.record(z.string());
const devDependencies      = z.record(z.string());
const peerDependencies     = z.record(z.string());
const peerDependenciesMeta = z.record(PeerDependenciesMeta.schema);
const bundleDependencies   = z.string().array();
const optionalDependencies = z.record(z.string());
const overrides            = packageOverridesSchema;
const engines              = z.record(z.string());
const os                   = z.string().array();
const cpu                  = z.string().array();
const _private             = z.boolean();
const publishConfig        = z.unknown();
const workspaces           = z.string().array();

export const raw = {
    name,
    description,
    version,
    homepage,
    keywords,
    bugs,
    license,
    author,
    contributors,
    funding,
    files,
    main,
    browser,
    bin,
    man,
    directories,
    repository,
    scripts,
    config,
    dependencies,
    devDependencies,
    peerDependencies,
    peerDependenciesMeta,
    bundleDependencies,
    optionalDependencies,
    overrides,
    engines,
    os,
    cpu,
    private: _private,
    publishConfig,
    workspaces,
};

export default z.object({
    ...raw,
}).partial();