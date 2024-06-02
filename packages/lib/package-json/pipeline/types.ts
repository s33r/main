import GeneralError from '@ehwillows/lib.core/GeneralError.js';
import type PackageJson from '@ehwillows/lib.package-json/structure/PackageJson.js';


export type UnloadedPackage = {
    success: true;
    phase  : 'unloaded';

    location: string;
};

export type LoadedPackageFailure = {
    success: false;
    phase  : 'loaded';
    errors : Array<GeneralError>;

    location: string;
};

export type LoadedPackageSuccess = {
    success: true;
    phase  : 'loaded';

    location: string;
    content : string;
};

export type LoadedPackage = LoadedPackageFailure | LoadedPackageSuccess;




export type ParsedPackageFailure = {
    success: false;
    phase  : 'parsed'
    errors : Array<GeneralError>;

    location: string;
    content : string;
};

export type ParsedPackageSuccess = {
    success: true;
    phase  : 'parsed'

    location: string;
    content : string;
    data    : PackageJson;
};

export type ParsedPackage = ParsedPackageFailure | ParsedPackageSuccess;

export type ValidatedPackageFailure = {
    success: false;
    phase  : 'validated'
    errors : Array<GeneralError>;

    location: string;
    content : string;
    data    : PackageJson;
};

export type ValidatedPackageSuccess = {
    success: true;
    phase  : 'validated'

    location: string;
    content : string;
    data    : PackageJson;
};

export type ValidatedPackage = ValidatedPackageFailure | ValidatedPackageSuccess;

export type PackageFile =
| UnloadedPackage
| LoadedPackage
| ParsedPackage
| ValidatedPackage;

export type PackagePipelineStep = (value: PackageFile) => Promise<PackageFile>;