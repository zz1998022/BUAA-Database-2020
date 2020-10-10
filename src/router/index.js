import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage',
    name: 'Manage',
    redirect: '/manage/manufacturer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage.vue'),
    children: [
      {
        path: 'manufacturer',
        name: 'Manufacturer',
        component: () => import(/* webpackChunkName: "about" */ '../views/manage/Manufacturer.vue'),
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/manage/Role.vue'),
        meta: { title: 'Role'}
      },
      {
        path: 'garagekit',
        name: 'Garagekit',
        component: () => import('../views/manage/Garagekit.vue'),
        meta: { title: 'Garagekit'}
      },
    ]
  },
  {
    path: '/market',
    name: 'Market',
    component: () => import(/* webpackChunkName: "about" */ '../views/Market.vue')
  },
  // {
  //   path: '/manage/role',
  //   name: 'Role',
  //   component: () => import('@/views/manage/Role.vue'),
  // },
]

const router = new VueRouter({
  routes
})

export default router
