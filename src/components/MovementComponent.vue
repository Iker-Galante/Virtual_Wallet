<script setup>
import { useProfileStore } from '@/Stores/ProfileStore';
import { useMovementStore } from '@/Stores/MovementStore';
import MovementItemComponent from './MovementItemComponent.vue';

import { computed } from 'vue';

const profileStore = useProfileStore()
const movementStore = useMovementStore()

const profileMail = computed(() => profileStore.getCurrentProfile().email)
movementStore.addMovement(profileMail, '2024-10-24', '10:00', 100, 'deposit', 'Depósito de prueba')
const movements = computed(() => movementStore.getMovementsByUserId(profileMail))
</script>

<template>
    <div class="box">
        <div class="group">
            <div class="overlap">
                <div class="title">Movimientos Recientes</div>
                <v-list class="movement-list">
                    <MovementItemComponent 
                        v-for="movement in movements" 
                        :key="movement.id"
                        :movement="movement"
                    />
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
  width: 402px;
  height: 413px;
}
.box .overlap {
  width: 400px;
  height: 413px;
  background-color: #1d1d1d;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 12px;
}
.box .title {
  font-family: "Inter-SemiBold", Helvetica;
  font-weight: 600;
  color: #d7d7d7;
  font-size: 20px;
  letter-spacing: -0.40px;
  line-height: 20px;
  margin-bottom: 16px;
  text-align: center;
}
.movement-list {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
