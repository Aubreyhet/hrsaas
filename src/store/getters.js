const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  token: state => state.user.token // 将token状态共享出来 使之全局快捷使用
}
export default getters
