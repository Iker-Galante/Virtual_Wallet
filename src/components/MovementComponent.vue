<script setup>
import {computed } from 'vue';
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

for (let i = 0; i < 5; i++) {
    addRandomMovement(profileId.value)
}
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
