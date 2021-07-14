// 导入请求配置
import request from '@/utils/request'

// 获取简单的用户列表
export function getSimpleUserInfo() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工列表
 */
export function getEmployees(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工api定义
 */
export function delEmployeesById(id) {
  return request({
    method: 'DELETE',
    url: `/sys/user${id}`
  })
}

/**
 * 新增员工接口
 */
export function addEmployees(data) {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}

/**
 * 批量导入员工api
 * @param {Array} data 传入要导入员工的数据数组
 */
export function importEmployees(data) {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}

