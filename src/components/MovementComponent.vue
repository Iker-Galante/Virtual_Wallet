<template>
  <div>
    <h2>Movements:</h2>
    <ul>
      <li v-for="movement in movements" :key="movement.id">
        {{ movement.type === 'credit' ? '+' : '-' }} {{ movement.amount }}
      </li>
    </ul>
    <button @click="addRandomMovement">Add Random Movement</button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMovementStore } from '@/Stores/MovementStore'
import { useBalanceStore } from '@/Stores/BalanceStore'

const movementStore = useMovementStore()
const balanceStore = useBalanceStore()
const { movements } = storeToRefs(movementStore)

function addRandomMovement() {
  const amount = Math.floor(Math.random() * 100)
  balanceStore.addFunds(amount)  // This will now also create a movement
}
</script>

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
