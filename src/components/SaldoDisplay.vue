<script setup>
import { computed,ref } from 'vue';
// import { useBalanceStore } from '@/Stores/BalanceStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { useProfileStore } from '@/Stores/ProfileStore';

// const balanceStore = useBalanceStore();
const initialBalance = ref(0.00);
const profileStore = computed(() => useProfileStore());
const movementStore = computed(() => useMovementStore());

const currentUserMail = computed(() => profileStore.value.getCurrentProfile());
const currentUserId = computed(() => profileStore.value.getCurrentProfileUserId(currentUserMail));
movementStore.value.addRandomMovements(currentUserId);
const movements = computed(() => movementStore.value.getMovementsByUserId(currentUserId));

const totalBalance = computed(() => {
    return (movements.value != undefined) ? initialBalance.value + movements.value.reduce((acc, curr) => acc + curr.amount, 0) : initialBalance.value;
});

</script>

<template>
  <div class="saldo-display">
    <span class="saldo">Saldo Disponible</span>
    <span class="saldo-amount">${{ totalBalance.toFixed(2) }}</span>
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
