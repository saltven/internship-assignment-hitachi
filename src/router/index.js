// import { createRouter, createWebHistory } from 'vue-router'
import Vue from 'vue'
import Router from 'vue-router'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'

Vue.use(Router)

// const routes = [
//   {
//     path: '/',
//     name: 'PageOne',
//     component: PageOne
//   },
//   {
//     path: '/PageTwo',
//     name: 'PageTwo',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: PageTwo
//     // 
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageOne',
      component: PageOne
    },
    {
      path: '/PageTwo',
      name: 'PageTwo',
      component: PageTwo
    }
  ]
})