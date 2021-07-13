import request from '@/utils/request'

/**
 * 获取 角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

/**
 * 根据id获取公司信息
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * 删除角色api
 */
export function delRoleById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 * 根据id获取单个角色的数据
 */
export function getRoleById(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 根据id编辑角色的数据
 */
export function editRoleById(data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

/**
 * 新增角色接口
 */
export function addRole(data) {
  return request({
    method: 'POST',
    url: '/sys/role',
    data
  })
}
