export function someOf<T> (obj: any, keys: string[]): T {
  const rs: any = {}
  for (let key of keys) {
    if (obj.hasOwnProperty(key)) rs[key] = obj[key]
  }
  return rs
}

export function kebabCaseToCamelCase (str: string): string {
  return str.replace(/-(.)/g, (match, target) => target.toUpperCase())
}

export function camelCaseToKebabCase (str: string): string {
  return str.replace(/[A-Z]/g, target => '-' + target.toLowerCase())
}
