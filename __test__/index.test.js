const url = require('../')

const protocol = 'http://'
const domain = 'www.example.com'
const port = ':8080'
const path = '/path/subpath'
const search = '?search=test'
const hash = '#hs=hash'
const fullUrl = `${protocol}${domain}${port}${path}${search}${hash}`
const urlEntity = url.parse(fullUrl)

test('parse url', () => {
  expect(urlEntity).toEqual({
    'hash': 'hs=hash',
    'host': 'www.example.com',
    'path': 'path/subpath',
    'port': 8080,
    'protocol': 'http',
    'search': 'search=test'
  })
})

test('parse url with relative protocol', () => {
  expect(url.parse(`//${domain}${port}${path}${search}${hash}`)).toEqual({
    'hash': 'hs=hash',
    'host': 'www.example.com',
    'path': 'path/subpath',
    'port': 8080,
    'search': 'search=test'
  })
})
test('format url', () => {
  expect(url.format(urlEntity)).toBe(fullUrl)
})

test('format url with query', () => {
  expect(url.format(urlEntity, { search1: 'test1', search2: ['test2', 'test3'] }))
    .toBe(`${protocol}${domain}${port}${path}${search}&search1=test1&search2=test2&search2=test3${hash}`)
})

test('format url with empty query', () => {
  expect(url.format(urlEntity, {}))
    .toBe(`${protocol}${domain}${port}${path}${search}${hash}`)
})

test('format url with empty query item', () => {
  expect(url.format(urlEntity, { search1: null }))
    .toBe(`${protocol}${domain}${port}${path}${search}${hash}`)
})

test('parse and format url without protocol', () => {
  const partialUrl = `${domain}${port}${path}${search}${hash}`
  const urlEntity = url.parse(partialUrl)
  expect(urlEntity).toEqual({
    'hash': 'hs=hash',
    'host': 'www.example.com',
    'path': 'path/subpath',
    'port': 8080,
    'search': 'search=test'
  })
  expect(url.format(urlEntity)).toBe(`//${partialUrl}`)
})

test('parse and format url without port', () => {
  const partialUrl = `${protocol}${domain}${path}${search}${hash}`
  const urlEntity = url.parse(partialUrl)
  expect(urlEntity).toEqual({
    'hash': 'hs=hash',
    'host': 'www.example.com',
    'path': 'path/subpath',
    'protocol': 'http',
    'search': 'search=test'
  })
  expect(url.format(urlEntity)).toBe(`${partialUrl}`)
})

test('parse and format url without search', () => {
  const partialUrl = `${protocol}${domain}${port}${path}${hash}`
  const urlEntity = url.parse(partialUrl)
  expect(urlEntity).toEqual({
    'hash': 'hs=hash',
    'host': 'www.example.com',
    'path': 'path/subpath',
    'protocol': 'http',
    'port': 8080
  })
  expect(url.format(urlEntity, { search1: 'test1', search2: ['test2', 'test3'] }))
    .toBe(`${protocol}${domain}${port}${path}?search1=test1&search2=test2&search2=test3${hash}`)
})

test('parse and format url without hash', () => {
  const partialUrl = `${protocol}${domain}${port}${path}${search}`
  const urlEntity = url.parse(partialUrl)
  expect(urlEntity).toEqual({
    'host': 'www.example.com',
    'path': 'path/subpath',
    'protocol': 'http',
    'port': 8080,
    'search': 'search=test'
  })
  expect(url.format(urlEntity)).toBe(`${partialUrl}`)
})
