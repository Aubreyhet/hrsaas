const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 将token状态共享出来 使之全局快捷使用
  name: state => state.user.userInfo.username, // 将用户映射出去
  userId: state => state.user.userInfo.userId, // 将用户id映射出去 方便使用
  staffPhoto: state => state.user.userInfo.staffPhoto, // 将用户头像映射出去
  companyId: state => state.user.userInfo.companyId, // 将用户的公司id映射出去
  companyName: state => state.user.userInfo.companyName,
  departmentName: state => state.user.userInfo.departmentName,
  routes: state => state.permission.router // 将路由映射到全局
}
export default getters
