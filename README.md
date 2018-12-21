# query
基于[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)的查询参数处理类

## 安装
```
npm install wow-query
```

## 构造方法
### new Query(query: [QueryData](src/types.ts#L3) | string, mappingTable?: [Dictionary](src/types.ts#L1)<string>)
```
new Query('a=1&b=2&a=3')
new Query({
  a: ['1', '3'],
  b: '2'
})
```
mappingTable参见[mapping](#mapping-table-dictionarystring)

## API
### toString (): string
转Query字符串
```
// 'a=1&b=2'
new Query({a: '1', b: '2'}).toString()
```
### toObject\<T = [QueryData](src/types.ts#L3)> (): T
转Query对象
```
// {a: '1', b: '2'}
new Query('a=1&b=2')
```
### get\<T extends [QueryValue](src/types.ts#L2)> (name: string): T
获取指定字段值
```
const query = new Query('a=1&b=2&b=3')
// '1'
query.get('a')
// ['2', '3']
query.get('b')
```
### set (name: string, value: [QueryValue](src/types.ts#L2)): Query
修改/添加字段
```
// 'a=2&b=3'
new Query({a: '1'})
  .set('a', '2')
  .set('b', '3')
  .toString()
```
### delete (name: string): Query
删除字段
```
// {b: '3'}
new Query('a=1&a=2&b=3')
  .delete('a')
  .toJson()
```
### has (name: string): boolean
是否包含某字段
```
const query = new Query('a=1')
// true
query.has('a')
// false
query.has('b')
```
### someOf (names: string[]): Query
获取部分字段
```
// 'c=3'
new Query('a=1&b=2&c=3')
  .someOf(['a', 'b'])
  .toString()
```
### toCamelCaseKeys (): Query
将kebab-case风格的Query字段转成CamelCase风格
```
// {userId: 'abc'}
new Query('user-id=abc')
  .toCamelCaseKeys()
  .toJson()
```
### toKebabCaseKeys (): Query
将CamelCase风格的Query字段转成kebab-case风格
```
// 'user-id=abc'
new Query({userId: 'abc'})
  .toKebabCaseKeys()
  .toString()
```
### mapping (table: [Dictionary](src/types.ts#L1)\<string>)
通过传入一个字段映射表来修改Query字段
```
const query = new Query({ a: ['1', '2'], b: '3', c: '4'})
// 'x=1&x=2&y=3&c=4'
query
  .mapping({ a: 'x', b: 'y' })
  .toString()
```
