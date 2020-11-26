import Vue from 'vue'
import VueRouter from 'vue-router'
import RoomsView from '../views/RoomsView.vue'
import AuthView from '../views/AuthView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: RoomsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // requires auth and no user
  if (requiresAuth && !(await store.dispatch("user/getCurrentUser"))) {
    next({ name: "auth" });
  // no requires auth and user is auth
  } else if (!requiresAuth && (await store.dispatch("user/getCurrentUser"))) {
    next({ name: "Home" });
  } else {
    next();
  }
})

export default router
