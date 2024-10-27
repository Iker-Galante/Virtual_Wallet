<script setup>
import {computed, ref, onMounted} from 'vue';
import { useProfileStore } from '@/Stores/ProfileStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { useBalanceStore } from '@/Stores/BalanceStore';
import { useCardStore } from '@/Stores/CardStore';
import MovementItemComponent from '@/components/ManageMoney/MovementItemComponent.vue';

const profileStore = computed(() => useProfileStore())
const movementStore = computed(() => useMovementStore())
const balanceStore = computed(() => useBalanceStore())
const cardStore = computed(() => useCardStore())
const profileId = computed(() => profileStore.value.getCurrentProfileIndex(profileStore.value.getCurrentProfile()?profileStore.value.getCurrentProfile().email:null));

const movements = computed(() => {
  return movementStore.value.getMovementsByUserId(profileId.value);
})

const displayLimit = ref(4);
const initialLimit = 4;
const showMoreVisible = computed(() => (movements.value?.length ?? 0) > displayLimit.value);
const showLessVisible = computed(() => displayLimit.value > initialLimit);

const displayedMovements = computed(() => {
  return movements.value?.slice(0, displayLimit.value) ?? [];
});

const noMovementsMessage = computed(() => {
  return (movements.value?.length ?? 0) === 0 ? "No tenes movimientos recientes" : null;
});

function showMore() {
  displayLimit.value += 4;
}

function showLess() {
  displayLimit.value = Math.max(initialLimit, displayLimit.value - 4);
}
</script>

<template>
  <div class="box">
    <div class="title">Movimientos Recientes</div>
    <div v-if="noMovementsMessage" class="no-movements-message">
      {{ noMovementsMessage }}
    </div>
    <v-list v-else-if="displayedMovements.length > 0" class="movement-list">
      <MovementItemComponent 
        v-for="movement in displayedMovements" 
        :key="movement.id"
        :movement="movement"
      />
    </v-list>
    <div class="button-container" v-if="displayedMovements.length > 0">
      <v-btn
        v-if="showMoreVisible"
        @click="showMore"
        class="show-button"
      >
        Mostrar más
      </v-btn>
      <v-btn
        v-if="showLessVisible"
        @click="showLess"
        class="show-button"
      >
        Mostrar menos
      </v-btn>
    </div>
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

.no-movements-message {
  text-align: center;
  color: #FFFFFF;
  font-size: 18px;
  padding: 20px 0;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.show-button {
  background-color: rgba(128, 128, 128, 0.8) !important;
  color: white !important;
  text-transform: none !important;
}
</style>
