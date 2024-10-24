<script setup>
import { useProfileStore } from '@/Stores/ProfileStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { computed } from 'vue';

const profileStore = useProfileStore()
const movementStore = useMovementStore()

const profileMail = computed(() => profileStore.getCurrentProfile().email)
movementStore.addMovement(profileMail, '2024-10-24', '10:00', 100, 'deposit', 'Depósito de prueba')
const movements = computed(() => movementStore.getMovementsByUserId(profileMail))

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
    <div class="box">
        <div class="group">
            <div class="overlap">

    <h2 class="text-h5 mb-4">Movimientos Recientes</h2>
    <v-list>
      <v-list-item v-for="movement in movements" :key="movement.id" class="mb-2">
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
    </v-list>

</div>
  </div>
  </div>
</template>

<style scoped>
.box {
  width: 400px;
  height: 413px;
}
.box .group {
  position: fixed;
  width: 402px;
  height: 413px;
}
.box .overlap {
  position: relative;
  width: 400px;
  height: 413px;
  background-color: #1d1d1d;
  border-radius: 15px;
}
.text-green {
  color: green;
}
.text-red {
  color: red;
}
</style>
