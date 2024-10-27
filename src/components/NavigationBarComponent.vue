<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
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
    <v-list-item-title class="text-h3 webTitle">{{ webName }}</v-list-item-title>
    <v-divider class="divisor"></v-divider>
    <v-list-item
      v-for="item in navItems"
      :key="item.name"
      class="routeItems"
      :class="{ 'active-route': route.name === item.name }"
      @click="navigate(item.path)"
    >
      <template v-slot:prepend>
        <v-icon :color="route.name === item.name ? 'violet' : 'white'">
          {{ item.icon }}
        </v-icon>
      </template>
      <v-list-item-title :class="{ 'violet-text': route.name === item.name }">
        {{ item.name === 'mainPage' ? 'Inicio' : item.spanishName }}
      </v-list-item-title>
    </v-list-item>
  </v-navigation-drawer>
</template>

<style scoped>
.navLeftBar {
  background-color: #1D1D1D !important;
  width: 200px;
  position: fixed !important;
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
  transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
}

.active-route {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.divisor {
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.1);
}

.violet-text {
  color: #7749F8;
}
</style>
