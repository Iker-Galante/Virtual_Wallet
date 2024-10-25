import { defineStore } from 'pinia'
import { useMovementStore } from '@/Stores/MovementStore'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balance: 0
  }),
  actions: {
    addFunds(amount) {
      this.balance += amount
      // Create a movement when adding funds
      const movementStore = useMovementStore()
      movementStore.addMovement({
        id: Date.now(),
        amount: amount,
        type: 'credit'
      })
    }
  },
  getters: {
    getBalance: (state) => state.balance
  }
})
