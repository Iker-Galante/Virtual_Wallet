<script setup>
import { ref } from 'vue'
import BalanceComponent from '@/components/BalanceComponent.vue';
import MovementComponent from '@/components/MovementComponent.vue';
import Card from '../components/CardComponent.vue';
import Navigation from '../components/NavigationComponent.vue';
</script>

<template>
  <v-app>
    <Navigation/>

    <!-- Main Content -->
    <v-main class="main_page">
      <BalanceComponent/>
      <MovementComponent/>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>