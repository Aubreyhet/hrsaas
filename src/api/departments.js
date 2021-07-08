import request from '@/utils/request'

/**
 * 封装获取公司解构api
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * 封装删除 添加 或者编辑操作的api
 */

export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`
  })
}
