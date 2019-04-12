import { Dictionary, QueryData, QueryValue } from './types'
import { camelCaseToKebabCase, kebabCaseToCamelCase, someOf } from './utils'

const ignoreValues = [undefined, '']
export default class Query {
  private uRLSearchParams: URLSearchParams = new URLSearchParams()

  constructor (query: QueryData | string, mappingTable?: Dictionary<string>) {
    if (typeof query === 'string') {
      this.uRLSearchParams = new URLSearchParams(query)
      if (mappingTable) this.mapping(mappingTable)
    } else {
      for (let key in query) {
        const name = mappingTable ? (mappingTable[key] || key) : key
        const value = query[key]
        if (Array.isArray(value)) for (let val of value) this.uRLSearchParams.append(name, val)
        else if (!ignoreValues.includes(value)) this.uRLSearchParams.append(name, value)
      }
    }
  }

  toString (): string {
    return this.uRLSearchParams.toString()
  }

  toObject<T = QueryData> (): T {
    const obj: any = {}
    for (let [key, val] of this.uRLSearchParams.entries()) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'string') obj[key] = [obj[key], val]
        else obj[key].push(val)
      } else obj[key] = val
    }
    return obj
  }

  get<T extends QueryValue> (name: string): T {
    const val = this.uRLSearchParams.getAll(name)
    return (val.length === 0 ? '' : (val.length === 1 ? val[0] : val)) as T
  }

  set (name: string, value: QueryValue): Query {
    this.uRLSearchParams.delete(name)
    if (typeof value === 'string') value = [value]
    for (let val of value) this.uRLSearchParams.append(name, val)
    return this
  }

  delete (name: string): Query {
    this.uRLSearchParams.delete(name)
    return this
  }

  has (name: string): boolean {
    return this.uRLSearchParams.has(name)
  }

  someOf (names: string[]): Query {
    return new Query(someOf(this.toObject(), names))
  }

  toCamelCaseKeys (): Query {
    return this.format((key, val) => [kebabCaseToCamelCase(key), val])
  }

  toKebabCaseKeys (): Query {
    return this.format((key, val) => [camelCaseToKebabCase(key), val])
  }

  mapping (table: Dictionary<string>) {
    return this.format((key, val) => [table[key] || key, val])
  }

  private format (callback: (key: string, val: string) => [string, string]): Query {
    const uRLSearchParams = new URLSearchParams()
    for (let [key, val] of this.uRLSearchParams.entries()) {
      const [name, value] = callback(key, val)
      uRLSearchParams.append(name, value)
    }
    this.uRLSearchParams = uRLSearchParams
    return this
  }
}
