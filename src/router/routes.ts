import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/training',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/training.vue') }],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('layouts/flat.vue'),
    children: [{ path: '', component: () => import('pages/login.vue') }],
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/kedua',
    component: () => import('layouts/flat.vue'),
    children: [
      { path: '', component: () => import('pages/kedua.vue') },
      {
        path: ':id',
        component: () => import('pages/ketiga.vue'),
        props: route => ({
          urlID: route.params.id
        })
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
