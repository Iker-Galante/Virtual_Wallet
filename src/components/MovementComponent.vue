<script setup>
import { useProfileStore } from '@/Stores/ProfileStore';
import { useMovementStore } from '@/Stores/MovementStore';
import MovementItemComponent from './MovementItemComponent.vue';

import { computed } from 'vue';

const profileStore = useProfileStore()
const movementStore = useMovementStore()

const profileId = computed(() => profileStore.getCurrentProfile().id)

 //Test purposes
movementStore.addRandomMovements(profileId)
//

const movements = computed(() => movementStore.getMovementsByUserId(profileId))
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
  width: 60vw;
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
