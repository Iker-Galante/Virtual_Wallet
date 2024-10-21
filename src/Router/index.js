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
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../Views/ProfileView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../Views/SettingsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../Views/PageNotFoundView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../Views/RegisterView.vue'),
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('../Views/ForgetPasswordView.vue'),
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../Views/SupportView.vue'),
    }
  ]
})

export default router


import Login from '../Views/LoginView.vue'
