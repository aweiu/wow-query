export function someOf(obj, keys) {
    const rs = {};
    for (let key of keys) {
        if (obj.hasOwnProperty(key))
            rs[key] = obj[key];
    }
    return rs;
}
export function kebabCaseToCamelCase(str) {
    return str.replace(/-(.)/g, (match, target) => target.toUpperCase());
}
export function camelCaseToKebabCase(str) {
    return str.replace(/[A-Z]/g, target => '-' + target.toLowerCase());
}
