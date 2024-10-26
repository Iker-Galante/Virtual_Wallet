<script setup>
import {computed, ref} from 'vue';
import { useProfileStore } from '@/Stores/ProfileStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { useBalanceStore } from '@/Stores/BalanceStore';
import MovementItemComponent from './MovementItemComponent.vue';

const profileStore = computed(() => useProfileStore())
const movementStore = computed(() => useMovementStore())
const balanceStore = computed(() => useBalanceStore())

const profileId = computed(() => profileStore.value.getCurrentProfileIndex(profileStore.value.getCurrentProfile().email));


 //Test purposes
 function addRandomMovement(userId) {
        // for (let i = 0; i < 2; i++) {
            const isPositive = Math.random() < 0.5; 
            const randomAmount = Math.floor(Math.random() * 1000) + 1; 
            const amount = isPositive ? randomAmount : -randomAmount;

            const randomMovement = {
                date: new Date().toISOString().split('T')[0],
                time: new Date().toISOString().split('T')[1].split('.')[0],
                amount: amount,
                movementType: ['deposit', 'withdrawal', 'transfer', 'payment'][Math.floor(Math.random() * 4)],
                description: ['Salary', 'Rent', 'Groceries', 'Dinner', 'Refund', 'Bill Payment'][Math.floor(Math.random() * 6)]
        }
        movementStore.value.addMovement(userId, randomMovement.date, randomMovement.time, randomMovement.amount, randomMovement.movementType, randomMovement.description)
        balanceStore.value.addFunds(amount)
        // }
}

for (let i = 0; i < 3; i++) {
    addRandomMovement(profileId.value)
}


const movements = computed(() => {
  const userMovements = movementStore.value.getMovementsByUserId(profileId.value);
  return Array.isArray(userMovements) ? userMovements : [];
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
