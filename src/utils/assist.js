export function typeOf(obj) {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}

export function isEmpty(data) {
  const type = typeOf(data)
  switch (type) {
    case 'array':
      return data.length === 0
    case 'object':
      // return JSON.stringify(data) === '{}';
      return Object.keys(data).length === 0
    case 'number':
      return false
    default:
      return !data
  }
}

export function deepClone(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepClone(data[i]))
    }
  } else if (t === 'object') {
    for (const key in data) {
      o[key] = deepClone(data[key])
    }
  }
  return o
}
