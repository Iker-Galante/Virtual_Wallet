<script setup>
import { computed } from 'vue';

const props = defineProps({
  movement: {
    type: Object,
    required: true
  }
});

// Helper function to get icon based on movement type
function getIcon(type) {
  switch (type) {
    case 'deposit': return 'mdi-arrow-down-circle-outline'
    case 'withdrawal': return 'mdi-arrow-up-circle-outline'
    case 'payment': return 'mdi-cart-outline'
    case 'transfer': return 'mdi-bank-transfer'
    default: return 'mdi-cash'
  }
}
</script>

<template>
  <v-list-item class="mb-2">
    <template v-slot:prepend>
      <v-icon :icon="getIcon(movement.type)" size="large" :color="movement.amount > 0 ? 'green' : 'red'"></v-icon>
    </template>
    <v-list-item-title>{{ movement.description }}</v-list-item-title>
    <v-list-item-subtitle>{{ new Date(movement.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</v-list-item-subtitle>
    <template v-slot:append>
      <span :class="movement.amount > 0 ? 'text-green' : 'text-red'">
        {{ movement.amount > 0 ? '+' : '' }}${{ Math.abs(movement.amount).toFixed(2) }}
      </span>
    </template>
  </v-list-item>
</template>

<style scoped>
.text-green {
  color: green;
}
.text-red {
  color: red;
}
</style>
