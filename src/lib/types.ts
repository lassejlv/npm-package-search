export interface ActionResponse<T extends object> {
  error: boolean;
  message: string;
  data?: Partial<T>;
}

export interface NpmPackage {
  objects: NpmPackageObject[];
}

export interface NpmPackageObject {
  package: NpmPackageDetails;
}

export interface NpmPackageDetails {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  author: {
    name: string;
    email: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: {
    username: string;
    email: string;
  }[];
}

export interface NpmSinglePackage {
  name: string;
  description: string;
  'dist-tags': {
    latest: string;
  };
  versions: {
    [version: string]: NpmPackageVersion;
  };
  time: {
    [version: string]: string;
  };

  maintainers: {
    name: string;
    email: string;
  }[];

  readme: string;
  homepage: string;
  repository: { type: string; url: string };
  bugs: { url: string };
}

interface NpmPackageVersion {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: {
    [key: string]: string;
  };
}
