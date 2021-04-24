import request from '@/utils/request'

export function register (data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo (data) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    data
  })
}

export function test (data) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    data,
    // showLoading: true,
    // retryTimes: 5
    cache: true
  })
}
