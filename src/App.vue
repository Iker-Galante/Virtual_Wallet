<script setup>
import { ref, computed} from 'vue'
import Card from './components/CardComponent.vue';
import Navigation from './components/NavigationComponent.vue';
import { RouterView } from 'vue-router';
import BalanceComponent from './components/BalanceComponent.vue'
import MovementComponent from './components/MovementComponent.vue'

const n= ref(0);
const changedname= ref('Jose_Dominguez');

const name= computed(() =>{
  return changedname.value;
});
const user=ref('@user_name');
</script>

<template>
  <div>
    <BalanceComponent />
    <MovementComponent />
  </div>
</template>

<style scoped>
  </style>
  
