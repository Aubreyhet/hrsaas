import Cookies from 'js-cookie'

const TokenKey = 'Hrsaas-Token' // 设置唯一的token key
const TimeKey = 'Time-Stamp' // 设置一个唯一的时间戳 key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置时间戳
export const setTimeStamp = () => {
  Cookies.set(TimeKey, Date.now())
}
// 获取时间戳
export const getTimeStamp = () => {
  return Cookies.get(TimeKey)
}
