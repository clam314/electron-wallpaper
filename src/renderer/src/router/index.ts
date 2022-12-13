import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayoutVue from '@renderer/components/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayoutVue,
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@renderer/views/home-page/index.vue'),
      },
      {
        path: 'download',
        name: '下载',
        component: () => import('@renderer/views/download-page/index.vue'),
      },
      {
        path: 'setting',
        name: '设置',
        component: () => import('@renderer/views/setting-page/index.vue'),
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
