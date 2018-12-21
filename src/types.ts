export type Dictionary<T = any> = { [key: string]: T }
export type QueryValue = string | string[]
export type QueryData = Dictionary<QueryValue>
