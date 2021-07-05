import request from '@/utils/request'

/**
 * 封装用户登录接口
 * @param {obj} data
 * @returns 返回登录状态和token
 */
export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

export function getInfo(token) {
  return request({
  })
}

export function logout() {
  return request({
  })
}
