export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population: number;
  capital?: string[];
  region: string;
  subregion?: string;
  timezones: string[];
  languages?: {
    [key: string]: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}
