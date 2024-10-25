<script setup>
import { useProfileStore } from '@/Stores/ProfileStore';
import { useMovementStore } from '@/Stores/MovementStore';
import MovementItemComponent from './MovementItemComponent.vue';

import { computed } from 'vue';

const profileStore = useProfileStore()
const movementStore = useMovementStore()

const profileMail = computed(() => profileStore.getCurrentProfile().email)

//test purposes.
// movementStore.addMovement(profileMail, '2024-10-24', '10:00', -100, 'deposit', 'Depósito de prueba')
// movementStore.addMovement(profileMail, '2024-10-24', '10:00', -100, 'deposit', 'Depósito de prueba')
// movementStore.addMovement(profileMail, '2024-10-24', '10:00', -100, 'deposit', 'Depósito de prueba')

movementStore.addRandomMovements(profileMail)

const movements = computed(() => movementStore.getMovementsByUserId(profileMail))
</script>

<template>
  <div class="box">
    <div class="title">Movimientos Recientes</div>
    <v-list class="movement-list">
      <MovementItemComponent 
        v-for="movement in movements" 
        :key="movement.id"
        :movement="movement"
      />
    </v-list>
  </div>
</template>

<style scoped>
.box {
  width: 400px;
  background-color: #1d1d1d;
  border-radius: 15px;
  padding: 16px;
}

.title {
  font-family: "Inter-SemiBold", Helvetica;
  font-weight: 600;
  color: #FFFFFF;
  font-size: 20px;
  letter-spacing: -0.40px;
  line-height: 20px;
  margin-bottom: 16px;
  text-align: left;
}

.movement-list {
  background-color: transparent;
}
</style>
