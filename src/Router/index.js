import { computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import { useProfileStore } from '@/Stores/ProfileStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  webName: 'Platan\'t',
  routes: [
    
    {
      path: '/login',
      name: 'login',
      spanishName: 'Iniciar Sesión',
      icon: 'mdi-login-outline',
      component: () => import('../Views/LoginView.vue')
    },
    {
      path: '/',
      name: 'mainPage',
      spanishName: 'Inicio',
      icon: 'mdi-home-outline',
      meta: { RequiresAuth: true },
      component: () => import('../Views/HomeView.vue'),
    },
    {
      path: '/Cards',
      name: 'Cards',
      spanishName: 'Tarjetas',
      icon: 'mdi-credit-card-multiple-outline',
      meta: { RequiresAuth: true },
      component: () => import('../Views/CardsView.vue'),
      
    },
    {
      path: '/pay',
      name: 'pay',
      spanishName: 'Pagar',
      icon: 'mdi-send-variant-outline',
      meta: { RequiresAuth: true },
      component: () => import('../Views/PayView.vue'),
    },
    {
      path: '/movements',
      name: 'movements',
      spanishName: 'Movimientos',
      icon: 'mdi-inbox-multiple-outline',
      meta: { RequiresAuth: true },
      component: () => import('../Views/MovementView.vue'),
      
    },
    {
      path: '/contacts',
      name: 'contacts',
      spanishName: 'Contactos',
      icon: 'mdi-account-group-outline',
      meta: { RequiresAuth: true },
      component: () => import('../Views/ContactsView.vue'),
      
    },
    {
      path: '/collect',
      name: 'collect',
      spanishName: 'Cobrar',
      icon: 'mdi-arrow-up',
      meta: { RequiresAuth: true },
      component: () => import('../Views/CollectView.vue'),
    },
    { 
      path: '/profile',
      name: 'profile',
      spanishName: 'Perfil',
      icon: 'mdi-account-outline',
      meta: { RequiresAuth: true },
      component: () => import('../Views/ProfileView.vue'),
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

router.beforeEach((to, from) => {
  const profileStore = useProfileStore()
  //const currentProfile = computed(() => profileStore.getCurrentProfile())
  console.log(profileStore.getCurrentProfile())
  if(to.matched.some(route => route.meta.RequiresAuth) && !profileStore.getCurrentProfile()){
    return { name: 'login', query: { redirect: to.fullPath } } 
  }
});

export default router