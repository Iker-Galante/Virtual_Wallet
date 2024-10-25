<script setup>
import { ref, computed } from 'vue';

// import { useProfileStore } from '@/Stores/ProfileStore';
// import { useMovementStore } from '@/Stores/MovementStore';
import { getProfileStore, getMovementStore } from '@/Stores/GlobalStore';
import MovementItemComponent from './MovementItemComponent.vue';

const profileStore = computed(() => getProfileStore())
const movementStore = computed(() => getMovementStore())

const profileId = computed(() => profileStore.value.getCurrentProfileIndex(profileStore.value.getCurrentProfile().email));

// console.log(profileId.value)
 //Test purposes
movementStore.value.addRandomMovements(profileId.value)
//

const movements = computed(() => movementStore.value.getMovementsByUserId(profileId.value))
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
