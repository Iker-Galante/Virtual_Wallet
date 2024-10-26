<script setup>
import { computed,ref } from 'vue';
 import { useBalanceStore } from '@/Stores/BalanceStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { useProfileStore } from '@/Stores/ProfileStore';

const profileStore = computed(() => useProfileStore());
const movementStore = computed(() => useMovementStore());
const balanceStore = computed(() => useBalanceStore());
const currentUserMail = computed(() => profileStore.value.getCurrentProfile());
const currentUserId = computed(() => profileStore.value.getCurrentProfileUserId(currentUserMail));

</script>

<template>
  <div class="saldo-display">
    <span class="saldo">Saldo Disponible</span>
    <span class="saldo-amount">${{ balanceStore.getBalance().toFixed(2) }}</span>
  </div>
</template>

<style scoped>
.saldo-display {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: auto;
  color: white;
  line-height: 1.2;
}
.saldo {
  font-size: 10px;
  font-weight: 500;
}
.saldo-amount {
  font-size: 1.5rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>
