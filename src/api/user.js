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

/**
 * 获取用户信息接口
 * @param {*} token
 * @returns
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 根据用户id获取用户头像/详情 这里拿到了用户的详细信息
 * 默认get请求
 * @returns string
 */
export function getUserAllInfo(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {
  return request({
  })
}
