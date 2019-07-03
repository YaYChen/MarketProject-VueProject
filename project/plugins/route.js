export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (store.state.user.user.token !== undefined) {
      const token = store.state.user.user.token
      if (token == '' && to.path !== '/login' && to.path !== '/') {
        next('/login')
      } else if (to.path == '/login' || to.path == '/') {
        next()
      } else {
        next()
      }
    } else {
      next('/')
    }
  })
}
