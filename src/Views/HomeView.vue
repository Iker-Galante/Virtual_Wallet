<script setup>
import { ref } from 'vue'
import Card from '../components/CardComponent.vue';
import Navigation from '../components/NavigationComponent.vue';
</script>

<template>
    <v-app>
    <Navigation></Navigation>
  <!-- Main Content -->
  <v-main class="main_page">
    <v-container fluid>
      <v-row>
        <v-col
          v-for="n in 10"
          :key="n"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
        >
          <Card />
        </v-col>
      </v-row>
    </v-container>
  
    <v-btn class="btn" @click="deleteCard">Borrar tarjeta</v-btn>
  </v-main>
    </v-app>
</template>

<style scoped>
  /* Main content */
  .main_page {
    margin-top: 72px; /* Account for navbar height */
    width:100vw;
    min-height: calc(100vh - 72px); /* Full viewport height minus navbar */
    background-color: #8f9044;
  }
  .btn{
    margin-top: 20px;
    margin-left: 20px;
  }
</style>