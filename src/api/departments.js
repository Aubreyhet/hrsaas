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
 * 封装删除子部门方法api
 */

export function delDepartments(id) {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

/**
 * 封装添加子部门方法api
 */
export function addDepartmants(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 获取部门详情信息接口 根据id
 */
export function getSimpleDepartment(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 更新部门信息接口
 */

export function updateDepartment(data) {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}

