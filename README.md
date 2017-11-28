# xs-url

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Installation

``` bash
$ npm install --save xs-url

# or

$ yarn add xs-url
```

## Usage

```js
const url = require('xs-url')
const str = url.parse('http://www.example.com:8080/path/subpath?search=test#hs=hash')
/* {
  protocol: 'http',
  host: 'www.example.com',
  port: 8080,
  path: 'path/subpath',
  search: 'search=test',
  hash: 'hs=hash'
} */

url.format(str)
// http://www.example.com:8080/path/subpath?search=test#hs=hash

url.format(str, { search1: 'test1', search2: ['test2', 'test3'] })
// http://www.example.com:8080/path/subpath?search=test&search1=test1&search2=test2&search2=test3#hs=hash
```
