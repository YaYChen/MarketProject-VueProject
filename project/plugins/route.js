import Cookies from 'js-cookie'
export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    let user = JSON.parse(Cookies.get('user') || null)
    if (user !== null) {
      store.dispatch('user/addUser', user)
    }
    if(user.userInfo.userName === 'root'){
      next('/admin')
    }
    if (store.state.user.userInfo !== undefined) {
      next()
    } else {
      if (to.path == '/login') {
        next()
      } else {
        next('/login')
      }
    }
  })
}
