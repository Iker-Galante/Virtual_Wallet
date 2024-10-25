<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.options.routes;
const webName = router.options.webName;

function navigate(destination) {
  router.push(destination);
}

const navItems = routes
  .filter(route => ['mainPage', 'Cards', 'pay', 'collect', 'movements', 'contacts'].includes(route.name))
  .sort((a, b) => {
    const order = ['mainPage', 'Cards', 'pay', 'collect', 'movements', 'contacts'];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
</script>

<template>
  <v-navigation-drawer class="navLeftBar" permanent>
    <v-list-item-title class="text-h4 webTitle">{{ webName }}</v-list-item-title>
    <v-divider class="divisor"></v-divider>
    <v-list-item
      v-for="route in navItems"
      :key="route.name" class="routeItems"
      :prepend-icon="route.icon"
      :title="route.name === 'mainPage' ? 'Inicio' : route.spanishName"
      @click="navigate(route.path)"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<style scoped>
.navLeftBar {
  background-color: #1D1D1D !important;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.webTitle {
  font-weight: 600; 
  margin: 10px 16px;
  color: white;
  text-align: center;
}

.routeItems {
  padding: 10px 16px;
  margin: 4px 0;
  font-size: 16px;
  font-weight: 600; 
  color: white;
}

.divisor {
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.1);
}


</style>
