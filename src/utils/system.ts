// 初始化加载  数字字典 等功能
import store from '@/store'
export const initSystem = async function(handler) {
  await store.dispatch('app/generateRoutes')
  await store.dispatch('component/initTargetSelectData')// 获取选人组件数据 - 用户体系
  if (handler) { handler() }
}
