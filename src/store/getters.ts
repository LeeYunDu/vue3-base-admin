
const getters = {
  testData: state => state.index.data,
  userInfo: state => state.user.userInfo,
  permissions: state => state.user.permissions,
  router: state => state.app.router,
  allowVisitRoute: state => state.app.allowVisitRoute,
  freeLogin: state => state.app.freeLogin

}
export default getters
