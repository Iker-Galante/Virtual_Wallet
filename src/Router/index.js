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
      component: () => import('../pages/Home.vue'),
}]
})

export default router


import Login from '../pages/Inicio_Sesion.vue'