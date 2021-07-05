// 自定义指令
export const imgerror = {
  inserted(dom, options) {
    // 暂时无法处理
    console.log(dom.src, options.value)
  }
}
