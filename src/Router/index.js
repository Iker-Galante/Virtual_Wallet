import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  webName: 'Platan\'t',
  routes: [
    {
      path: '/',
      name: 'root',
      icon: 'mdi-home-outline',
      redirect: '/login', // Redirect from '/' to '/login'
    },
    {
      path: '/login',
      name: 'login',
      icon: 'mdi-login-outline',
      component: Login,
    },
    {
      path: '/MainPage',
      name: 'mainPage',
      icon: 'mdi-home-outline',
      component: () => import('../Views/HomeView.vue'),
    },
    {
      path: '/Cards',
      name: 'Cards',
      icon: 'mdi-credit-card-multiple-outline',
      component: () => import('../Views/CardsView.vue'),
    },
    {
      path: '/pay',
      name: 'pay',
      icon: 'mdi-send-variant-outline',
      component: () => import('../Views/PayView.vue'),
    },
    {
      path: '/movements',
      name: 'movements',
      icon: 'mdi-inbox-multiple-outline',
      component: () => import('../Views/MovementsView.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      icon: 'mdi-account-group-outline',
      component: () => import('../Views/ContactsView.vue'),
    },
    {
      path: '/collect',
      name: 'collect',
      icon: 'mdi-arrow-up',
      component: () => import('../Views/CollectView.vue'),
    },
    {
      path: '/investments',
      name: 'investments',
      icon: 'mdi-trending-up',
      component: () => import('../Views/InvestmentsView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      icon: 'mdi-account-outline',
      component: () => import('../Views/ProfileView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      icon: 'mdi-cog-outline',
      component: () => import('../Views/SettingsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      icon: 'mdi-alert-circle-outline',
      component: () => import('../Views/PageNotFoundView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      icon: 'mdi-account-plus-outline',
      component: () => import('../Views/RegisterView.vue'),
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      icon: 'mdi-lock-outline',
      component: () => import('../Views/ForgetPasswordView.vue'),
    },
    {
      path: '/support',
      name: 'support',
      icon: 'mdi-help-circle-outline',
      component: () => import('../Views/SupportView.vue'),
    }
  ]
})

export default router


import Login from '../Views/LoginView.vue'
