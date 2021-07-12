// 导入请求配置
import request from '@/utils/request'

// 获取简单的用户列表
export function getSimpleUserInfo() {
  return request({
    url: '/sys/user/simple'
  })
}
