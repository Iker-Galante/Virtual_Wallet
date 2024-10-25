import { ref } from 'vue'

export const movementStore = ref(null)
export const profileStore = ref(null)
export const balanceStore = ref(null)

// Initialize the stores
export function initializeStores(movement, profile, balance) {
  movementStore.value = movement
  profileStore.value = profile
  balanceStore.value = balance
}

export function getMovementStore() {
  return movementStore.value
}

export function getProfileStore() {
  return profileStore.value
}

export function getBalanceStore() {
  return balanceStore.value
}
