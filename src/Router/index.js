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
      spanishName: 'Iniciar Sesión',
      icon: 'mdi-login-outline',
      component: Login,
    },
    {
      path: '/MainPage',
      name: 'mainPage',
      spanishName: 'Inicio',
      icon: 'mdi-home-outline',
      component: () => import('../Views/HomeView.vue'),
      meta: { RequiresAuth: true },
    },
    {
      path: '/Cards',
      name: 'Cards',
      spanishName: 'Tarjetas',
      icon: 'mdi-credit-card-multiple-outline',
      component: () => import('../Views/CardsView.vue'),
      meta: { RequiresAuth: true },
    },
    {
      path: '/pay',
      name: 'pay',
      spanishName: 'Pagar',
      icon: 'mdi-send-variant-outline',
      component: () => import('../Views/PayView.vue'),
      meta: { RequiresAuth: true },
    },
    {
      path: '/movements',
      name: 'movements',
      spanishName: 'Movimientos',
      icon: 'mdi-inbox-multiple-outline',
      component: () => import('../Views/MovementView.vue'),
      meta: { RequiresAuth: true },
    },
    {
      path: '/contacts',
      name: 'contacts',
      spanishName: 'Contactos',
      icon: 'mdi-account-group-outline',
      component: () => import('../Views/ContactsView.vue'),
      meta: { RequiresAuth: true },
    },
    {
      path: '/collect',
      name: 'collect',
      spanishName: 'Cobrar',
      icon: 'mdi-arrow-up',
      component: () => import('../Views/CollectView.vue'),
      meta: { RequiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      spanishName: 'Perfil',
      icon: 'mdi-account-outline',
      component: () => import('../Views/ProfileView.vue'),
      meta: { RequiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      spanishName: 'Configuración',
      icon: 'mdi-cog-outline',
      component: () => import('../Views/SettingsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      spanishName: 'Página no encontrada',
      icon: 'mdi-alert-circle-outline',
      component: () => import('../Views/PageNotFoundView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      spanishName: 'Registrarse',
      icon: 'mdi-account-plus-outline',
      component: () => import('../Views/RegisterView.vue'),
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      spanishName: 'Recuperar contraseña',
      icon: 'mdi-lock-outline',
      component: () => import('../Views/ForgetPasswordView.vue'),
    },
    {
      path: '/support',
      name: 'support',
      spanishName: 'Soporte',
      icon: 'mdi-help-circle-outline',
      component: () => import('../Views/SupportView.vue'),
    }
  ]
})

router.beforeEach((to, from,next) => {
  if(to.meta.RequiresAuth){

  }
  next()
});

export default router


import Login from '../Views/LoginView.vue'
