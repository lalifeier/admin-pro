import request from '@/utils/request'

export function getMenu () {
  return request({
    url: '/menu/getMenu',
    method: 'post'
  })
}

export function getMenuById (data) {
  return request({
    url: '/menu/getMenuById',
    method: 'post',
    data
  })
}

export function getMenuList (data) {
  return request({
    url: '/menu/getMenuList',
    method: 'post',
    data
  })
}

export function addMenu (data) {
  return request({
    url: '/menu/addMenu',
    method: 'post',
    data
  })
}

export function updateMenu (data) {
  return request({
    url: '/menu/updateMenu',
    method: 'post',
    data
  })
}

export function deleteMenu (data) {
  return request({
    url: '/menu/deleteMenu',
    method: 'post',
    data
  })
}
