import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // lazy loading: load the component only when is accessed
    component: () => import('../views/RoomsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/UserProfileView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateRoom.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/update/:id',
    props: true,
    name: 'update',
    component: () => import('../views/UpdateRoom.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view/:id',
    props: true,
    name: 'view',
    component: () => import('../views/ViewRoom.vue'),
    meta: {
      requiresAuth: true
    }
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
    next({ name: "home" });
  } else {
    next();
  }
})

export default router
