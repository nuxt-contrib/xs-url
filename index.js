exports.parse = function (url) {
  const output = {}

  let protocolIndex = url.indexOf('://')
  if (protocolIndex !== -1) {
    output.protocol = url.substring(0, protocolIndex)
    url = url.substring(protocolIndex + 3)
  } else if (url.indexOf('//') === 0) {
    url = url.substring(2)
  }

  let parts = url.split('/')

  output.host = parts.shift()
  let host = output.host.split(':')
  if (host.length === 2) {
    output.host = host[0]
    output.port = parseInt(host[1])
  }

  // Remove empty elements
  parts = parts.filter(Boolean)

  output.path = parts.join('/')

  const hash = output.path.split('#')
  if (hash.length === 2) {
    output.path = hash[0]
    output.hash = hash[1]
  }

  const search = output.path.split('?')
  if (search.length === 2) {
    output.path = search[0]
    output.search = search[1]
  }
  return output
}

exports.format = function (obj, query) {
  let url = obj.protocol ? obj.protocol + ':' : ''
  url += '//' + obj.host
  url += obj.port ? ':' + obj.port : ''
  url += '/' + obj.path
  url += obj.search ? '?' + obj.search : ''

  if (query) {
    const search = formatQuery(query)
    if (search) {
      url += (obj.search ? '&' : '?') + search
    }
  }

  url += obj.hash ? '#' + obj.hash : ''
  return url
}

function formatQuery (query) {
  return Object.keys(query).sort().map(key => {
    var val = query[key]
    if (val == null) {
      return ''
    }
    if (Array.isArray(val)) {
      return val.slice().map(val2 => [key, '=', val2].join('')).join('&')
    }
    return key + '=' + val
  }).filter(Boolean).join('&')
}
