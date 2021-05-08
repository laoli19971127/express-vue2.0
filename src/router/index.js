import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/home-page',
    name: 'Layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Layout.vue'),
    children:[
      {
          path: '/user',
          name: 'User',
          component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "about" */ '../views/Role.vue'),
       },
       {
        path: '/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "about" */ '../views/Menu.vue'),
       },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
