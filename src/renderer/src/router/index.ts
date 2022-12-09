import { createRouter, createWebHashHistory } from 'vue-router'
import HomePageVue from '@renderer/views/home-page/HomePage.vue'

const routes = [
  {
    path: '/',
    component: HomePageVue
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
