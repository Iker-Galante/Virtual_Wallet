<script setup>
import { ref, computed} from 'vue'
import Card from './components/Card.vue';
import Navegation from './components/Navegation.vue';
import { RouterView } from 'vue-router';

const n= ref(0);
const changedname= ref('Jose_Dominguez');

const name= computed(() =>{
  return changedname.value;
});
const user=ref('@user_name');
</script>

<template>
  <v-app>
    <RouterView/>
  </v-app>
</template>

<style scoped>
  </style>
  