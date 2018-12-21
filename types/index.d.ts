import { Dictionary, QueryData, QueryValue } from './types';
export default class Query {
    private uRLSearchParams;
    constructor(query: QueryData | string, mappingTable?: Dictionary<string>);
    toString(): string;
    toObject<T = QueryData>(): T;
    get<T extends QueryValue>(name: string): T;
    set(name: string, value: QueryValue): Query;
    delete(name: string): Query;
    has(name: string): boolean;
    someOf(names: string[]): Query;
    toCamelCaseKeys(): Query;
    toKebabCaseKeys(): Query;
    mapping(table: Dictionary<string>): Query;
    private format;
}
