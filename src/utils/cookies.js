import Cookies from 'js-cookie'

const cookies = {}

const DEFAULT_KEY = 've-admin-'

cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  const currentCookieSetting = {
    expires: 1,
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`${DEFAULT_KEY}${name}`, value, currentCookieSetting)
}

cookies.get = function (name = 'default') {
  return Cookies.get(`${DEFAULT_KEY}${name}`)
}

cookies.getAll = function () {
  return Cookies.get()
}

cookies.remove = function (name = 'default') {
  return Cookies.remove(`${DEFAULT_KEY}${name}`)
}

cookies.removeAll = function () {
  Object.keys(Cookies.get()).forEach(function (cookie) {
    Cookies.remove(cookie)
  })
}

export default cookies
