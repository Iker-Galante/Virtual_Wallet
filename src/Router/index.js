import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/login', // Redirect from '/' to '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: () => import('../Views/HomeView.vue'),
    },
    {
      path: '/Cards',
      name: 'Cards',
      component: () => import('../Views/CardsView.vue'),
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('../Views/PayView.vue'),
    },
    {
      path: '/movements',
      name: 'movements',
      component: () => import('../Views/MovementsView.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../Views/ContactsView.vue'),
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('../Views/CollectView.vue'),
    },
    {
      path: '/investments',
      name: 'investments',
      component: () => import('../Views/InvestmentsView.vue'),
    },
  ]
})

export default router


import Login from '../Views/LoginView.vue'
