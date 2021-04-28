import request from '@/utils/request'

export function getRole() {
  return request({
    url: '/role/getRole',
    method: 'post',
  })
}

export function getRoleById(data) {
  return request({
    url: '/role/getRoleById',
    method: 'post',
    data,
  })
}

export function getRoleList(data) {
  return request({
    url: '/role/getRoleList',
    method: 'post',
    data,
  })
}

export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data,
  })
}

export function updateRole(data) {
  return request({
    url: '/role/updateRole',
    method: 'post',
    data,
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/deleteRole',
    method: 'post',
    data,
  })
}
