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

/**
 * 保存用户基本信息
 */
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

/**
 * 给员工分配角色
 * @param {Obj} data 用户id 和角色数组
 * @returns 请求状态
 */
export function setRoles(data) {
  return request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data
  })
}

