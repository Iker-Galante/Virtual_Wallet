<script setup>
import { ref, computed } from 'vue';
import { useBalanceStore } from '@/Stores/BalanceStore';

const balanceStore = computed(() => useBalanceStore());
const isBalanceHidden = ref(false);

const toggleBalanceVisibility = () => {
  isBalanceHidden.value = !isBalanceHidden.value;
};

const formattedBalance = computed(() => {
  const balance = balanceStore.value.getBalance();
  console.log(balance);
  return typeof balance === 'number' ? balance.toFixed(2) : '0.00';
});
</script>

<template>
  <div class="saldo-display">
    <div class="saldo">Saldo Disponible en Cuenta</div>
    <div class="amount-container">
      <div class="balance-wrapper">
        <span class="saldo-amount" v-if="!isBalanceHidden">$ {{ formattedBalance }}</span>
        <span class="saldo-amount" v-else>$ ****.**</span>
      </div>
      <v-icon class="eye-icon" @click="toggleBalanceVisibility">mdi-eye-outline</v-icon>
    </div>
  </div>
</template>

<style scoped>
.saldo-display {
  background-color: rgba(57, 56, 56, 0.5);
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
}
.saldo {
  font-size: 14px;
  font-weight: 400;
  
}
.amount-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15vw;
}
.balance-wrapper {
  flex-grow: 1;
}
.saldo-amount {
  font-size: 30px;
  font-weight: 700;
}
.eye-icon {
  opacity: 0.7;
  cursor: pointer;
  font-size: 36px;
  margin-bottom: 10px;
}
</style>
