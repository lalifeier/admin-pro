export function formatDate(date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
    }
  }
  return fmt
}

export function uuid(length = 32) {
  const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += num.charAt(Math.floor(Math.random() * num.length))
  }
  return str
}

export function random(m, n) {
  return Math.floor(Math.random() * (m - n) + n)
}

export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

export function getRandomFileName() {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '')
  const random = `${Math.random()}`.substring(2, 8)
  const random_number = timestamp + random
  return random_number
}

export function paddingNumber(num, length) {
  return (Array(length).join('0') + num).slice(-length)
}

export function hexColor() {
  let str = '#'
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
  for (let i = 0; i < 6; i++) {
    const index = Number.parseInt(Math.random() * 16)
    str += arr[index]
  }
  return str
}

export function escapeString(str) {
  if (!str) return ''
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\0\n\r\b\t\\'"\x1a]/g, (s) => {
    switch (s) {
      case '\0':
        return '\\0'
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\b':
        return '\\b'
      case '\t':
        return '\\t'
      case '\x1a':
        return '\\Z'
      default:
        return `\\${s}`
    }
  })
}
