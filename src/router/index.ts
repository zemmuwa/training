import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { StoreInterface } from '../store'
import routes from './routes'
import { auth } from 'boot/firestore'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<StoreInterface>(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    const isLogin = await new Promise(resolve => {
      auth.onAuthStateChanged(user => {
        resolve(user)
      })
    })
    console.log(isLogin)
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isLogin) {
        next({ path: '/login' })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      if (isLogin) {
        next({ path: '/training' })
      } else {
        next()
      }
    }
    // Now you need to add your authentication logic here, like calling an API endpoint
  })

  return Router
})
