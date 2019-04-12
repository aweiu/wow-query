import { camelCaseToKebabCase, kebabCaseToCamelCase, someOf } from './utils';
const ignoreValues = [undefined, ''];
export default class Query {
    constructor(query, mappingTable) {
        this.uRLSearchParams = new URLSearchParams();
        if (typeof query === 'string') {
            this.uRLSearchParams = new URLSearchParams(query);
            if (mappingTable)
                this.mapping(mappingTable);
        }
        else {
            for (let key in query) {
                const name = mappingTable ? (mappingTable[key] || key) : key;
                const value = query[key];
                if (Array.isArray(value))
                    for (let val of value)
                        this.uRLSearchParams.append(name, val);
                else if (!ignoreValues.includes(value))
                    this.uRLSearchParams.append(name, value);
            }
        }
    }
    toString() {
        return this.uRLSearchParams.toString();
    }
    toObject() {
        const obj = {};
        for (let [key, val] of this.uRLSearchParams.entries()) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'string')
                    obj[key] = [obj[key], val];
                else
                    obj[key].push(val);
            }
            else
                obj[key] = val;
        }
        return obj;
    }
    get(name) {
        const val = this.uRLSearchParams.getAll(name);
        return (val.length === 0 ? '' : (val.length === 1 ? val[0] : val));
    }
    set(name, value) {
        this.uRLSearchParams.delete(name);
        if (typeof value === 'string')
            value = [value];
        for (let val of value)
            this.uRLSearchParams.append(name, val);
        return this;
    }
    delete(name) {
        this.uRLSearchParams.delete(name);
        return this;
    }
    has(name) {
        return this.uRLSearchParams.has(name);
    }
    someOf(names) {
        return new Query(someOf(this.toObject(), names));
    }
    toCamelCaseKeys() {
        return this.format((key, val) => [kebabCaseToCamelCase(key), val]);
    }
    toKebabCaseKeys() {
        return this.format((key, val) => [camelCaseToKebabCase(key), val]);
    }
    mapping(table) {
        return this.format((key, val) => [table[key] || key, val]);
    }
    format(callback) {
        const uRLSearchParams = new URLSearchParams();
        for (let [key, val] of this.uRLSearchParams.entries()) {
            const [name, value] = callback(key, val);
            uRLSearchParams.append(name, value);
        }
        this.uRLSearchParams = uRLSearchParams;
        return this;
    }
}
